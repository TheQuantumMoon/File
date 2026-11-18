import type { FormikProps } from 'formik'
import React from 'react'
import type { BudgetFormValues, FlowStep } from '../../types/inputsheet'
import type { TFunction } from 'i18next'
import CalcInput from './CalcInput'
import CalcRow from './CalcRow'
import PhaseButton from './PhaseButton'
interface props{
   
     checkManualInput:(e: React.KeyboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>) => void
 checkCopyPaste:(e: React.ClipboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>, name: string) => void
    step:FlowStep
    formik:FormikProps<BudgetFormValues>
    t:TFunction<"input_sheet", undefined>
    isChecking:boolean
    hasError:boolean
}

const CalcTwoSheet = ({step,formik,t,isChecking,hasError,checkCopyPaste,checkManualInput}:props) => {
   const p2CalcReadOnly = step !== "PHASE2_CALC";
    return (
   <>
   {(step === "PHASE2_CALC" || step === "DONE") && (
            <div className="mt-4 rounded overflow-hidden">
              <div
                className="flex px-2 py-2"
                style={{ backgroundColor: "#11B0A5" }}
              >
                <span className="flex-1 text-xs font-black text-white uppercase">
                  {t("calculation_phase2")}
                </span>
                <span className="text-xs font-black text-white uppercase">
                  {t("calculation")}
                </span>
              </div>
              <div style={{ backgroundColor: "#D8F1EF" }}>
                <CalcRow label={t("total1_carry")}>
                  <CalcInput
                    name="calc_p2_total1_carry"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="●"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("partner_savings")}>
                  <CalcInput
                    name="calc_p2_partner_savings"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="+"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("total2")} sub={t("total2_sub")}>
                  <CalcInput
                    name="calc_p2_total2"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="="
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow
                  label={t("housing_purchase_cost")}
                  sub={t("housing_purchase_cost_phase2_sub")}
                >
                  <CalcInput
                    name="calc_p2_housing"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="-"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("total3")} sub={t("total3_sub")}>
                  <CalcInput
                    name="calc_p2_total3"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="★ ="
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>

                <div className="grid grid-cols-3 border-b border-white text-xs">
                  {[
                    { label: t("checking_account") },
                    {
                      label: t("savings_account"),
                      sub: t("savings_account_sub"),
                    },
                    { label: t("investment"), sub: t("investment_sub") },
                  ].map(({ label, sub }) => (
                    <div
                      key={label}
                      className="p-2 border-r border-white font-bold text-center flex flex-col items-center justify-center last:border-r-0"
                      style={{ backgroundColor: "#11B0A5", color: "white" }}
                    >
                      <p>{label}</p>
                      {sub && (
                        <p className="font-normal text-[10px] text-center">
                          {sub}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 border-b border-white text-xs">
                  {[
                    "calc_p2_checking",
                    "calc_p2_savings",
                    "calc_p2_investment",
                  ].map((name) => (
                    <div
                      key={name}
                      className="p-2 border-r border-white flex justify-center last:border-r-0"
                      style={{ backgroundColor: "#E8F7F5" }}
                    >
                      <input
                        name={name}
                        type="text"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values[name as keyof BudgetFormValues]}
                        readOnly={p2CalcReadOnly}
                        className={`w-full text-center bg-transparent outline-none border-b ${p2CalcReadOnly ? "border-transparent opacity-70 pointer-events-none" : "border-slate-400"}`}
                        inputMode="decimal"
                        onKeyDown={(e) => checkManualInput(e, formik)}
                        onPaste={(e) => {
                          checkCopyPaste(e, formik, name)

                        }}
                      />
                    </div>
                  ))}
                </div>

                <CalcRow label={t("total3_age50")}>
                  <CalcInput
                    name="calc_p2_total3_age50"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="★"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow
                  label={t("remaining_budget_phase2")}
                  sub={t("remaining_budget_phase2_sub")}
                >
                  <CalcInput
                    name="calc_p2_remaining"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="■"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("event_cards_impact")}>
                  <CalcInput
                    name="calc_p2_event1"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="±"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("event_cards_impact")}>
                  <CalcInput
                    name="calc_p2_event2"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="±"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("event_cards_impact")}>
                  <CalcInput
                    name="calc_p2_event3"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="±"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("total4")}>
                  <CalcInput
                    name="calc_p2_total4"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="="
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("return_savings")}>
                  <CalcInput
                    name="calc_p2_return_savings"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="+"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("return_investment")}>
                  <CalcInput
                    name="calc_p2_return_investment"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="+"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>
                <CalcRow label={t("impact_inflation")}>
                  <CalcInput
                    name="calc_p2_inflation"
                    formik={formik}
                    readOnly={p2CalcReadOnly}
                    prefix="-"
                    checkManualInput={checkManualInput}
                    checkCopyPaste={checkCopyPaste} />
                </CalcRow>

                <div
                  className="flex gap-0 text-xs font-black items-center"
                  style={{ backgroundColor: "#11B0A5" }}
                >
                  <div className="flex-1 px-2 py-2 pr-2">
                    <span className="text-white uppercase">{t("total5")}</span>
                  </div>
                  <div className="w-1/3 px-2 py-2 flex items-center gap-1">
                    <span className="text-white whitespace-nowrap">=</span>
                    <input
                      name="calc_p2_total5"
                      type="text"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      value={formik.values.calc_p2_total5}
                      readOnly={p2CalcReadOnly}
                      className={`flex-1 min-w-0 text-right bg-transparent outline-none border-b ${p2CalcReadOnly ? "border-transparent opacity-70 pointer-events-none text-white" : "border-white text-white"}`}
                      inputMode="decimal"
                      onKeyDown={(e) => checkManualInput(e, formik)}
                      onPaste={(e) => {
                        checkCopyPaste(e, formik, "calc_p2_total5")

                      }}
                    />
                  </div>
                </div>

                <div className="bg-white pt-2">
                  <PhaseButton
                    type={step === "DONE" ? "button" : "submit"}
                    label={
                      step === "DONE"
                        ? t("done")
                        : isChecking
                          ? t("checking")
                          : hasError
                            ? t("error_calc")
                            : t("check_calc_phase2")
                    }
                    color={
                      step === "DONE"
                        ? "#11B0A5"
                        : hasError
                          ? "#991a00"
                          : "#076b67"
                    }
                    disabled={step === "DONE" || isChecking}
                  />
                </div>
              </div>
            </div>
          )}
   </>
  )
}

export default CalcTwoSheet