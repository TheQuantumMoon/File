import type { BudgetFormValues, TopTableValues } from '../../types/inputsheet';
import type { FormikProps } from 'formik';
interface props{
  label: string;
  namePhase1: keyof TopTableValues;
  namePhase2: keyof TopTableValues;
  formik: FormikProps<BudgetFormValues>;
  col1ReadOnly: boolean;
  col2ReadOnly: boolean;
  col2Blurred: boolean;
  placeholder?: string;
  checkManualInput:(e: React.KeyboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>) => void
 checkCopyPaste:(e: React.ClipboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>, name: string) => void

}

const InputRow = ({
  label,
  namePhase1,
  namePhase2,
  formik,
  col1ReadOnly,
  col2ReadOnly,
  col2Blurred,
  placeholder,
  checkManualInput,
  checkCopyPaste
}: props) => (
  <div
    className="flex gap-0 mb-1 text-xs"
    style={{ backgroundColor: "#FEF9E7" }}
  >
    <span className="flex-1 text-slate-600 py-1 pl-2">{label}</span>

    <input
      name={namePhase1}
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      onChange={formik.handleChange}
      value={formik.values[namePhase1]}
      readOnly={col1ReadOnly}
      className={`w-32 text-center py-1 outline-none ${col1ReadOnly ? "opacity-70 pointer-events-none" : ""
        }`}
      style={{ backgroundColor: "#FDE8DF" }}
      inputMode="decimal"
      onKeyDown={(e) => checkManualInput(e, formik)}
      onPaste={(e) => {
        checkCopyPaste(e, formik, namePhase1)
      }}
    />

    <input
      name={namePhase2}
      type="text"
      autoComplete="off"
      onChange={formik.handleChange}
      value={formik.values[namePhase2]}
      readOnly={col2ReadOnly}
      className={`w-32 text-center py-1 outline-none ${col2Blurred
        ? "blur-[1px] pointer-events-none"
        : col2ReadOnly
          ? "opacity-70 pointer-events-none"
          : ""
        }`}
      style={{ backgroundColor: "#E8F7F5" }}
      inputMode="decimal"
      onKeyDown={(e) => checkManualInput(e, formik)}
      onPaste={(e) => {
        checkCopyPaste(e, formik, namePhase2)
      }}
    />
  </div>
);

export default InputRow