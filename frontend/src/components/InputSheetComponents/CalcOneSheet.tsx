import React from 'react'
import PhaseButton from './PhaseButton'
import { type TFunction } from 'i18next'
import type { FormikProps } from 'formik'
import type { BudgetFormValues, FlowStep } from '../../types/inputsheet'
import CalcRow from './CalcRow'
import CalcInput from './CalcInput'

interface props{
    step:FlowStep
    formik:FormikProps<BudgetFormValues>
    t:TFunction<"input_sheet", undefined>
    isChecking:boolean
    hasError:boolean
    phase1Collapsed:boolean
    setPhase1Collapsed: React.Dispatch<React.SetStateAction<boolean>>
     checkManualInput:(e: React.KeyboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>) => void
 checkCopyPaste:(e: React.ClipboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>, name: string) => void

}
const CalcOneSheet = ({step,formik,t,isChecking,hasError,phase1Collapsed,setPhase1Collapsed,checkCopyPaste,checkManualInput}:props) => {
    const col1ReadOnly = step !== "PHASE1_INPUT";
    const p1CalcReadOnly = step !== "PHASE1_CALC";

  return (
    <>
     {(step === "PHASE1_CALC" ||
            step === "PHASE2_INPUT" ||
            step === "PHASE2_CALC" ||
            step === "DONE") && (
              <div className="mt-4 rounded overflow-hidden">
                <div
                  className="flex px-2 py-2 cursor-pointer"
                  style={{ backgroundColor: "#DE7862" }}
                  onClick={() =>
                    col1ReadOnly && setPhase1Collapsed(!phase1Collapsed)
                  }
                >
                  <span className="flex-1 text-xs font-black text-white uppercase">
                    {t("calculation_phase1")}
                  </span>
                  <span className="text-xs font-black text-white uppercase">
                    {col1ReadOnly
                      ? phase1Collapsed
                        ? "▶"
                        : "▼"
                      : t("calculation")}
                  </span>
                </div>

                {!phase1Collapsed && (
                  <div style={{ backgroundColor: "#FBE2D5" }}>
                    <CalcRow
                      label={t("remaining_budget_phase1")}
                      sub={t("remaining_budget_phase1_sub")}
                    >
                      <CalcInput
                        name="calc_p1_remaining"
                        formik={formik}
                        readOnly={p1CalcReadOnly}
                        prefix="▲"
                        checkManualInput={checkManualInput}
                        checkCopyPaste={checkCopyPaste} />
                    </CalcRow>
                    <CalcRow
                      label={t("student_job_income")}
                      sub={t("student_job_income_sub")}
                    >
                      <CalcInput
                        name="calc_p1_student"
                        formik={formik}
                        readOnly={p1CalcReadOnly}
                        prefix="+"
                        checkManualInput={checkManualInput}
                        checkCopyPaste={checkCopyPaste} />
                    </CalcRow>
                    <CalcRow label={t("factor")} sub={t("factor_sub")}>
                      <CalcInput
                        name="calc_p1_factor"
                        formik={formik}
                        readOnly={p1CalcReadOnly}
                        prefix="/2 ="
                        checkManualInput={checkManualInput}
                        checkCopyPaste={checkCopyPaste} />
                    </CalcRow>
                    <CalcRow
                      label={t("parental_support")}
                      sub={t("parental_support_sub")}
                    >
                      <CalcInput
                        name="calc_p1_parental"
                        formik={formik}
                        readOnly={p1CalcReadOnly}
                        prefix="+"
                        checkManualInput={checkManualInput}
                        checkCopyPaste={checkCopyPaste} />
                    </CalcRow>
                    <CalcRow
                      label={t("housing_purchase_cost")}
                      sub={t("housing_purchase_cost_sub")}
                    >
                      <CalcInput
                        name="calc_p1_housing"
                        formik={formik}
                        readOnly={true}
                        prefix=""
                        checkManualInput={checkManualInput}
                        checkCopyPaste={checkCopyPaste} />
                    </CalcRow>

                    <div
                      className="flex gap-0 text-xs font-black items-center"
                      style={{ backgroundColor: "#DE7862" }}
                    >
                      <div className="flex-1 px-2 py-2 pr-2">
                        <span className="text-white uppercase">
                          {t("total1")}
                        </span>
                      </div>
                      <div className="w-1/3 px-2 py-2 flex items-center gap-1">
                        <span className="text-white whitespace-nowrap">= ●</span>
                        <input
                          name="calc_p1_total1"
                          type="text"
                          autoComplete="off"
                          onChange={formik.handleChange}
                          value={formik.values.calc_p1_total1}
                          readOnly={p1CalcReadOnly}
                          className={`flex-1 min-w-0 text-right bg-transparent outline-none border-b ${p1CalcReadOnly ? "border-transparent opacity-70 pointer-events-none text-white" : "border-white text-white"}`}
                          inputMode="decimal"
                          onKeyDown={(e) => checkManualInput(e, formik)}
                          onPaste={(e) => {
                            checkCopyPaste(e, formik, "calc_p1_total1")

                          }}
                        />
                      </div>
                    </div>

                    {step === "PHASE1_CALC" && (
                      <div className="bg-white pt-2">
                        <PhaseButton
                          type="submit"
                          label={
                            isChecking
                              ? t("checking")
                              : hasError
                                ? t("error_calc")
                                : t("check_calc_phase1")
                          }
                          color={hasError ? "#991a00" : "#076b67"}
                          disabled={isChecking}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
    </>
  )
}

export default CalcOneSheet