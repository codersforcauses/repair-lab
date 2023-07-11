import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/Form Fields/box-label";
import Error from "@/components/Form Fields/error-msg";
export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  id?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
}

/*
This is a component for the HTML `<textarea>' tag
Input:
  label: The label displayed on the text box
  placeholder: The placeholder message displayed on the text box
Output:
  A large text box that is compatible w/ React-hook-forms
*/
export default function FieldTextArea<T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  const errorStyle = !fieldState.invalid
    ? "relative mb-2 flex h-36 w-full flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow hover:shadow-grey-300"
    : "relative mb-2 flex h-36 w-full flex-row items-center justify-between rounded-lg border border-red-500 px-3 shadow hover:shadow-grey-300";

  !placeholder ? (placeholder = `Enter ${props.name}`) : "";
  !label ? (label = props.name) : "";

  return (
    <div className={errorStyle}>
      <Label label={!label ? props.name : label} {...props} />
      <textarea
        className="overflow-wrap:break-text h-4/5 w-full resize-none overflow-y-auto text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
        placeholder={!placeholder ? `Enter ${props.name}` : placeholder}
        id={!id ? props.name : id}
        {...field}
      />
      {fieldState.invalid && <Error {...props} />}
    </div>
  );
}
