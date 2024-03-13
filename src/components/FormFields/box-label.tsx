import { FieldValues, UseControllerProps } from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
}

/*
This is a component for the labels for each text box
Output:
  A <div> that contains the label for an input field
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
