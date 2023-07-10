import Image from "next/image";
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
  display?: string;
}

/*
This is a component for the HTML `<input>' tag
Input:
  id: The ID for the the input
  label: The label displayed on the text box
  placeholder: The placeholder message displayed on the text box
  icon: An optional Image path to display an .svg file
Output:
  A input text box that is compatible w/ React-hook-forms
*/
export default function FieldInput<T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  icon,
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  const errorStyle = !fieldState.invalid
    ? "relative mb-2 flex h-10 w-full flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow"
    : "relative mb-2 flex h-10 w-full flex-row items-center justify-between rounded-lg border border-red-500 px-3 shadow";
  return (
    <div className={`${errorStyle} ${props.display}`}>
      <Label label={!label ? props.name : label} {...props} />
      <input
        className="mr-1 w-full text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
        placeholder={!placeholder ? `Enter ${props.name}` : `${placeholder}`}
        id={!id ? `${props.name}` : `${id}`}
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
          className="relative min-h-0 w-4 min-w-0 shrink-0"
        />
      )}
      {fieldState.invalid && <Error {...props} />}
    </div>
  );
}
