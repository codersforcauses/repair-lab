import { FieldValues, UseControllerProps } from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
}

/**
 * A label component for displaying form fields
 * @param {string} label  The label to be displayed
 * @returns {JSX.Element} A label that is compatible w/ React-hook-forms
 */
export default function Label<T extends FieldValues = FieldValues>({
  label,
  ...controllerProps
}: FormProps<T>) {
  return (
    <label
      htmlFor={controllerProps.name}
      className="absolute -top-3 left-3 gap-0.5 rounded-full max-w-max bg-white px-2 text-sm font-semibold text-black"
    >
      {label}
      {controllerProps.rules?.required ? (
        <span className="text-sm font-semibold text-red-500"> *</span>
      ) : (
        ""
      )}
    </label>
  );
}
