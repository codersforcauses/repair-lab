import Image from "next/image";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/box-label";
import Error from "@/components/error-msg";
export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  icon?: string;
}

/*
This is a component for the HTML `<textarea>' tag
Input:
  label: The label displayed on the text box
  placeholder: The placeholder message displayed on the text box
  icon: An optional Image path to display an .svg file
Output:
  A large text box that is compatible w/ React-hook-forms
*/
export default function FieldTextArea<T extends FieldValues = FieldValues>({
  label,
  placeholder,
  icon,
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  !placeholder ? (placeholder = `Enter ${props.name}`) : "";
  !label ? (label = props.name) : "";

  return (
    <div className="relative mb-2 flex h-36 w-96 flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow">
      <Label label={label} {...props} />
      <textarea
        className="overflow-wrap:break-text h-4/5 w-full resize-none overflow-y-auto text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        id={label}
        {...field}
      />
      {!icon ? (
        ""
      ) : (
        <Image
          src={icon}
          alt="icon"
          width={16}
          height={16}
          className="min-h-4 relative w-4 min-w-0 shrink-0"
        />
      )}
      {fieldState.error?.message && <Error {...props} />}
    </div>
  );
}
