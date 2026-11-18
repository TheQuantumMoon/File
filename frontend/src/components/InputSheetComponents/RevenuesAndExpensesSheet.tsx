import SectionLabel from './SectionLabel'
import CategoryHeader from './CategoryHeader'
import InputRow from './InputRow'
import type { BudgetFormValues, FlowStep } from '../../types/inputsheet'
import type { FormikProps } from 'formik'
import type { TFunction } from 'i18next'
import PhaseButton from './PhaseButton'

interface props{
    step:FlowStep
    formik:FormikProps<BudgetFormValues>
    t:TFunction<"input_sheet", undefined>
    isChecking:boolean
    hasError:boolean
     checkManualInput:(e: React.KeyboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>) => void
 checkCopyPaste:(e: React.ClipboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>, name: string) => void

}

const RevenuesAndExpensesSheet = ({step,formik,t,isChecking,hasError,checkCopyPaste,checkManualInput}:props) => {
     const col1ReadOnly = step !== "PHASE1_INPUT";
  const col2ReadOnly = step !== "PHASE2_INPUT";
  const col2Blurred = step === "PHASE1_INPUT" || step === "PHASE1_CALC";

 const getTopButtonProps = () => {
    if (step === "PHASE1_INPUT") {
      return {
        label: isChecking
          ? t("checking")
          : hasError
            ? t("error_retry")
            : t("check_phase1_input"),
        color: hasError ? "#991a00" : "#076b67",
        disabled: isChecking,
      };
    }
    if (step === "PHASE1_CALC") {
      return {
        label: t("phase1_saved"),
        color: "#DE7862",
        disabled: true,
      };
    }
    if (step === "PHASE2_INPUT") {
      return {
        label: isChecking
          ? t("checking")
          : hasError
            ? t("error_retry")
            : t("check_phase2_input"),
        color: hasError ? "#991a00" : "#076b67",
        disabled: isChecking,
      };
    }
    return {
      label: t("phase2_saved"),
      color: "#11B0A5",
      disabled: true,
    };
  };

const topBtn=getTopButtonProps();


  return (
    <>
             <div className="flex mb-2 sticky top-0 bg-white pb-1 border-b border-slate-100 z-10">
            <div className="flex-1" />
            <div
              className={`w-32 text-center text-xs font-black text-white py-1 ${col1ReadOnly ? "opacity-70 pointer-events-none" : ""}`}
              style={{ backgroundColor: "#DE7862" }}
            >
              {t("work_phase_1")}
            </div>
            <div
              className={`w-32 text-center text-xs font-black text-white py-1 ${col2Blurred ? "blur-[1px] pointer-events-none" : ""}`}
              style={{ backgroundColor: "#11B0A5" }}
            >
              {t("work_phase_2")}
            </div>
          </div>

          {/* Inkomsten */}
          <SectionLabel label={t("income_label")} />
          <CategoryHeader icon="/Loon.svg" label={t("salary")} />
          <InputRow
            label={t("net_salary")}
            namePhase1="net_salary_phase1"
            namePhase2="net_salary_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
          <InputRow
            label={t("partner_salary")}
            namePhase1="partner_salary_phase1"
            namePhase2="partner_salary_phase2"
            formik={formik}
            col1ReadOnly={true}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            placeholder="XXX"
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />

          {/* Uitgaven */}
          <SectionLabel label={t("expenses_label")} />
          <CategoryHeader icon="/huisvestiging.svg" label={t("housing")} />
          <InputRow
            label={t("monthly_rent")}
            namePhase1="monthly_rent_phase1"
            namePhase2="monthly_rent_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />

          <CategoryHeader icon="/leefkosten.svg" label={t("living_costs")} />
          <InputRow
            label={t("living_costs")}
            namePhase1="living_costs_phase1"
            namePhase2="living_costs_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />

          <CategoryHeader icon="/mobiliteit.svg" label={t("mobility")} />
          <InputRow
            label={t("purchase_monthly")}
            namePhase1="purchase_monthly_phase1"
            namePhase2="purchase_monthly_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
          <InputRow
            label={t("monthly_cost")}
            namePhase1="monthly_cost_phase1"
            namePhase2="monthly_cost_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
          <InputRow
            label={t("car_insurance")}
            namePhase1="car_insurance_phase1"
            namePhase2="car_insurance_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />

          <CategoryHeader icon="/verzekering.svg" label={t("insurance")} />
          <InputRow
            label={t("fire_insurance")}
            namePhase1="fire_insurance_phase1"
            namePhase2="fire_insurance_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
          <InputRow
            label={t("family_insurance")}
            namePhase1="family_insurance_phase1"
            namePhase2="family_insurance_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
          <InputRow
            label={t("hospital_insurance")}
            namePhase1="hospital_insurance_phase1"
            namePhase2="hospital_insurance_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />
          <InputRow
            label={t("accident_insurance")}
            namePhase1="accident_insurance_phase1"
            namePhase2="accident_insurance_phase2"
            formik={formik}
            col1ReadOnly={col1ReadOnly}
            col2ReadOnly={col2ReadOnly}
            col2Blurred={col2Blurred}
            checkManualInput={checkManualInput}
            checkCopyPaste={checkCopyPaste} />

          <div
            className="flex gap-0 mt-4 text-xs font-black uppercase items-stretch"
            style={{ backgroundColor: "#F9BC2F" }}
          >
            <span className="flex-1 text-slate-600 px-2 py-2 flex items-center">
              {t("remaining_budget")}
            </span>
            <div
              className="w-32 flex items-center justify-between px-2 py-1"
              style={{ backgroundColor: "#FDE8DF" }}
            >
              <span>=</span>
              <input
                name="remaining_budget_phase1"
                type="text"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.remaining_budget_phase1}
                readOnly={col1ReadOnly}
                className={`w-full mx-1 bg-transparent text-center outline-none font-black ${col1ReadOnly ? "opacity-70 pointer-events-none" : ""
                  }`}
                inputMode="decimal"
                onKeyDown={(e) => checkManualInput(e, formik)}
                onPaste={(e) => {
                  checkCopyPaste(e, formik, "remaining_budget_phase1")
                }}
              />
              <span>▲</span>
            </div>
            <div
              className="w-32 flex items-center justify-between px-2 py-1"
              style={{ backgroundColor: "#E8F7F5" }}
            >
              <span>=</span>
              <input
                name="remaining_budget_phase2"
                type="text"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.remaining_budget_phase2}
                readOnly={col2ReadOnly}
                className={`w-full mx-1 bg-transparent text-center outline-none font-black ${col2Blurred
                  ? "blur-[1px] pointer-events-none"
                  : col2ReadOnly
                    ? "opacity-70 pointer-events-none"
                    : ""
                  }`}
                inputMode="decimal"
                onKeyDown={(e) => checkManualInput(e, formik)}
                onPaste={(e) => {
                  checkCopyPaste(e, formik, "remaining_budget_phase2")
                }}
              />
              <span>■</span>
            </div>
          </div>

          <PhaseButton
            type="submit"
            label={topBtn.label}
            color={topBtn.color}
            disabled={topBtn.disabled}
          />
          </>
  )
}

export default RevenuesAndExpensesSheet