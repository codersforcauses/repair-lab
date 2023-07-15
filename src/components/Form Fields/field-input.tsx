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
  type?: string;
  width?: string;
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
  type,
  width = "w-full",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  const baseStyle = `relative mb-2 flex h-10 ${width} flex-row items-center justify-between rounded-lg border px-3 shadow hover:shadow-grey-300`;
  const errorBorderStyle = `border-red-500`;
  const normalBorderStyle = `border-grey-300`;
  const inputStyle = `mr-1 w-full text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0`;

  return (
    <div
      className={`${baseStyle} ${
        fieldState.invalid ? `${errorBorderStyle}` : `${normalBorderStyle}`
      }`}
    >
      <Label label={!label ? props.name : label} {...props} />
      <input
        type={!type ? "text" : `${type}`}
        className={inputStyle}
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
