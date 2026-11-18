import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik, type FormikProps } from "formik";
import { useCharacter } from "../hooks/useCharacter";
import type {
  BudgetFormValues,
  TopTableValues,
  FlowStep,
} from "../types/inputsheet";
import axios from "axios";
import PartnerWheelOverlay from "./PartnerWheelOverlay";
import ChildrenWheelOverlay from "./ChildrenWheelOverlay";
import RevenuesAndExpensesSheet from "./InputSheetComponents/RevenuesAndExpensesSheet";
import CalcOneSheet from "./InputSheetComponents/CalcOneSheet";
import CalcTwoSheet from "./InputSheetComponents/CalcTwoSheet";
import SettingsButton from "./SettingsButton";

const prepInputs = (data: TopTableValues|TopTableValues)=>{
    const roomCode = localStorage.getItem("roomCode");
  const playerId = localStorage.getItem("playerId");

  if (!roomCode || !playerId) return null;

  const payload = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ]),
  );
  return {roomCode,playerId,payload}

}

// API 1: Controleert invoer van de bovenste tabellen
const apiCheckInputs = async (
  phase: 1 | 2,
  data: TopTableValues,
): Promise<boolean> => {
  const prepared = prepInputs(data)
  if(prepared===null)return false;
 const {roomCode,playerId,payload}= prepared

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/game/${roomCode}/player/${playerId}/check-dossier-monthly`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error(`Fout bij checken inputs fase ${phase}:`, error);
    return false;
  }
};
const checkCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>, name: string) => {
  e.preventDefault();

  const pastedText = e.clipboardData.getData("text");
  let cleanedValue = pastedText.replaceAll(",", ".").replace(/[^0-9.-]/g, "");

  const lastDot = cleanedValue.lastIndexOf(".");

  if (lastDot !== -1) {
    const digitsAfterDot = cleanedValue.length - lastDot - 1;

    cleanedValue =
      cleanedValue.slice(0, lastDot).replaceAll(".", "") +
      (digitsAfterDot == 3 ? "" : ".") +
      cleanedValue.slice(lastDot + 1);
  }
  formik.setFieldValue(name, cleanedValue);
}

const checkManualInput = (e: React.KeyboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "Enter",
  ];

  if (e.key === ",") {
    e.preventDefault();

    const input = e.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? start;

    input.setRangeText(".", start, end, "end");

    formik.setFieldValue(input.name, input.value);
    return;
  }

  if (
    !/^[0-9.-]$/.test(e.key) &&
    !allowedKeys.includes(e.key) &&
    !e.ctrlKey &&
    !e.metaKey
  ) {
    e.preventDefault();
  }
}

const apiCompleteFirstWorkPhase = async (): Promise<void> => {
  const roomCode = localStorage.getItem("roomCode");
  const playerId = localStorage.getItem("playerId");
  if (!roomCode || !playerId) return;
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/game/${roomCode}/player/${playerId}/first-work-phase`,
    );
  } catch (err) {
    console.error("Fout bij melden eerste werkfase voltooid:", err);
  }
};

// API 2: Controleert berekeningen van de onderste tabellen
const apiCheckCalculations = async (
  phase: 1 | 2,
  data: BudgetFormValues,
): Promise<boolean> => {
  const prepared = prepInputs(data)
  if(prepared===null)return false;
 const {roomCode,playerId,payload}= prepared

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/game/${roomCode}/player/${playerId}/check-dossier-total`,
      payload,
    );

    return response.data;
  } catch (error) {
    console.error(`Fout bij checken calculaties fase ${phase}:`, error);
    return false;
  }
};








const InputSheet = ({
  onPhase2Complete,
}: {
  onPhase2Complete?: () => void;
}) => {
  const { t } = useTranslation("input_sheet");

  const [step, setStep] = useState<FlowStep>("PHASE1_INPUT");
  const [hasError, setHasError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [phase1Collapsed, setPhase1Collapsed] = useState(false);

  const [showPartnerWheel, setShowPartnerWheel] = useState(false);
  const [showChildrenWheel, setShowChildrenWheel] = useState(false);

  const formik = useFormik<
    BudgetFormValues & {
      remaining_budget_phase1: string;
      remaining_budget_phase2: string;
    }
  >({
    initialValues: {
      net_salary_phase1: "",
      net_salary_phase2: "",
      partner_salary_phase1: "",
      partner_salary_phase2: "",
      monthly_rent_phase1: "",
      monthly_rent_phase2: "",
      living_costs_phase1: "",
      living_costs_phase2: "",
      purchase_monthly_phase1: "",
      purchase_monthly_phase2: "",
      monthly_cost_phase1: "",
      monthly_cost_phase2: "",
      car_insurance_phase1: "",
      car_insurance_phase2: "",
      fire_insurance_phase1: "",
      fire_insurance_phase2: "",
      family_insurance_phase1: "",
      family_insurance_phase2: "",
      hospital_insurance_phase1: "",
      hospital_insurance_phase2: "",
      accident_insurance_phase1: "",
      accident_insurance_phase2: "",
      remaining_budget_phase1: "",
      remaining_budget_phase2: "",

      // fase 1 Berekeningen
      calc_p1_remaining: "",
      calc_p1_student: "",
      calc_p1_parental: "",
      calc_p1_housing: "",
      calc_p1_factor: "",
      calc_p1_total1: "",

      // fase 2 Berekeningen
      calc_p2_total1_carry: "",
      calc_p2_partner_savings: "",
      calc_p2_total2: "",
      calc_p2_housing: "",
      calc_p2_total3: "",
      calc_p2_checking: "",
      calc_p2_savings: "",
      calc_p2_investment: "",
      calc_p2_total3_age50: "",
      calc_p2_remaining: "",
      calc_p2_event1: "",
      calc_p2_event2: "",
      calc_p2_event3: "",
      calc_p2_total4: "",
      calc_p2_return_savings: "",
      calc_p2_return_investment: "",
      calc_p2_inflation: "",
      calc_p2_total5: "",
    },
    onSubmit: async (values) => {
      console.log("Submit getriggerd. Actieve stap:", step);
      setHasError(false);
      setIsChecking(true);

      try {
        if (step === "PHASE1_INPUT") {
          const isValid = await apiCheckInputs(1, values);
          if (isValid) setStep("PHASE1_CALC");
          else setHasError(true);
        } else if (step === "PHASE1_CALC") {
          const isValid = await apiCheckCalculations(1, values);
          if (isValid) {
            await apiCompleteFirstWorkPhase();
            setShowPartnerWheel(true);
            // setStep("PHASE2_INPUT");
            // setPhase1Collapsed(true);
          } else {
            setHasError(true);
          }
        } else if (step === "PHASE2_INPUT") {
          const isValid = await apiCheckInputs(2, values);
          if (isValid) {
            setStep("PHASE2_CALC");
            if (onPhase2Complete) onPhase2Complete();
          } else setHasError(true);
        } else if (step === "PHASE2_CALC") {
          const isValid = await apiCheckCalculations(2, values);
          if (isValid) {
            setStep("DONE");
          } else {
            setHasError(true);
          }
        }
      } catch (error) {
        console.error("Fout tijdens validatie:", error);
        setHasError(true);
      } finally {
        setIsChecking(false);
      }
    },
  });


  // klaarzetten children en partner
  const { character } = useCharacter();
  if (!character)
    return <div className="p-10 text-center">{t("general.no_role")}</div>;
  const partnerIndex =
    character.livingSituation.allPartners.findIndex(
      (p) => p.id === character.livingSituation.partner?.id,
    ) ?? 0;
  const chosenPartnerIndex = partnerIndex >= 0 ? partnerIndex : 0;
  const chosenChildrenIndex = character?.livingSituation.children ?? 0;

  const handlePartnerAssigned = () => {
    setShowPartnerWheel(false);
    setShowChildrenWheel(true);
  };

  const handleChildrenAssigned = () => {
    setShowChildrenWheel(false);
    character.livingSituation.isShown = true;
    setStep("PHASE2_INPUT");
    setPhase1Collapsed(true);
  };

  // bepalen of berekeningsvelden readonly zijn








  return (
    <div className="flex">
      <div className="flex-1">
        <form onSubmit={formik.handleSubmit} className="h-full overflow-y-auto">
          <div className="flex justify-start mb-1">
            <img
              src="/Logo_Langwerpig.svg"
              alt="Live Your Life"
              className="w-60 opacity-60"
            />
            <SettingsButton/>
          </div>

          <RevenuesAndExpensesSheet
            step={step}
            formik={formik}
            t={t}
            isChecking={isChecking}
            hasError={hasError}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />


          <CalcOneSheet
            step={step}
            formik={formik}
            t={t}
            isChecking={isChecking}
            hasError={hasError}
            phase1Collapsed={phase1Collapsed}
            setPhase1Collapsed={setPhase1Collapsed}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />

          <CalcTwoSheet
            step={step}
            formik={formik}
            t={t}
            isChecking={isChecking}
            hasError={hasError}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
        </form>
      </div>
      <PartnerWheelOverlay
        isOpen={showPartnerWheel}
        partners={character.livingSituation.allPartners}
        predeterminedPartnerIndex={chosenPartnerIndex}
        onPartnerAssigned={handlePartnerAssigned}
      />

      <ChildrenWheelOverlay
        isOpen={showChildrenWheel}
        predeterminedChildrenIndex={chosenChildrenIndex}
        onChildrenAssigned={handleChildrenAssigned}
      />
    </div>
  );
};

export default InputSheet;
