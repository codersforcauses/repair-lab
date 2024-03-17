import { FieldValues } from "react-hook-form";

import { useFieldContext } from "@/hooks/form-field-context";

export interface FormLabelProps {
  label?: string;
}

/**
 * A label component for displaying form fields
 * @param {string} label  The label to be displayed
 * @returns {JSX.Element} A label that is compatible w/ React-hook-forms
 */
export default function Label<T extends FieldValues = FieldValues>({
  label
}: FormLabelProps) {
  const { fieldLabel, fieldName, required } = useFieldContext();

  return (
    <label
      htmlFor={fieldName}
      className="absolute -top-3 left-3 gap-0.5 rounded-full max-w-max bg-white px-2 text-sm font-semibold text-black"
    >
      {fieldLabel ?? fieldName}
      {required ? (
        <span className="text-sm font-semibold text-red-500"> *</span>
      ) : (
        ""
      )}
    </label>
  );
}
