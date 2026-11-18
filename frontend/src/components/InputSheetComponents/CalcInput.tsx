import type { BudgetFormValues } from '../../types/inputsheet';
import type { FormikProps } from 'formik';

interface props{
 checkManualInput:(e: React.KeyboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>) => void
 checkCopyPaste:(e: React.ClipboardEvent<HTMLInputElement>, formik: FormikProps<BudgetFormValues>, name: string) => void
 name:keyof BudgetFormValues
 formik:FormikProps<BudgetFormValues>
 readOnly:boolean
 prefix:string
}

const CalcInput = ({
  name,
  formik,
  readOnly,
  prefix,
  checkManualInput,
  checkCopyPaste
}: props) => (
  <div className="flex items-center w-full gap-1">
    {prefix && <span className="whitespace-nowrap">{prefix}</span>}
    <input
      name={name}
      type="text"
      autoComplete="off"
      onChange={formik.handleChange}
      value={formik.values[name]}
      readOnly={readOnly}
      className={`flex-1 min-w-0 text-right bg-transparent outline-none border-b ${readOnly
        ? "border-transparent opacity-70 pointer-events-none"
        : "border-slate-400"
        }`}
      inputMode="decimal"
      onKeyDown={(e) => checkManualInput(e, formik)}
      onPaste={(e) => {
        checkCopyPaste(e, formik, name)
      }}
    />
  </div>
);

export default CalcInput