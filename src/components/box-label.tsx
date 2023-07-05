import { FieldValues, UseControllerProps } from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
}

export default function Label<T extends FieldValues = FieldValues>({
  label,
  ...props
}: FormProps<T>) {
  return (
    <div className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-white px-1">
      <label className="text-xs font-semibold text-black">{label}</label>
      {props.rules?.required ? (
        <span className="text-xs font-semibold text-red-500">*</span>
      ) : (
        ""
      )}
    </div>
  );
}
