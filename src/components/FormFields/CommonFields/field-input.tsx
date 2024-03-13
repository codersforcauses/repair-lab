import { ReactElement } from "react";
import Image from "next/image";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";
import FieldWrapper from "@/components/FormFields/field-wrapper";
import { isoToDatePickerValue } from "@/lib/datetime";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T>,
    Omit<React.HTMLAttributes<HTMLInputElement>, "defaultValue"> {
  id?: string;
  label?: string;
  placeholder?: string;
  icon?: string | ReactElement;
  type?: string;
  width?: string;
}

/**
 This is a all-in-one component for the HTML `<input>' tag
  @param id: The ID for the the input
  @param label: The label displayed on the text box
  @param placeholder: The placeholder message displayed on the text box
  @param icon: An optional Image path to display an .svg file
  @returns A input text box that is compatible w/ React-hook-forms
 */

export default function FieldInput<T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  icon,
  type,
  width = "w-full",
  ...controllerProps
}: FormProps<T>) {
  const { field, fieldState } = useController(controllerProps);

  const inputStyle = `w-full h-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-0 rounded-lg px-3`;
  // format it like YYYY-MM-DDThh:mm

  const displayIcon = (icon: string | ReactElement) => {
    if (typeof icon == "string") {
      return (
        <Image
          src={icon}
          alt="icon"
          width={16}
          height={16}
          className="relative min-h-0 w-4 min-w-0 shrink-0 mr-3"
        />
      );
    } else {
      return icon;
    }
  };

  const convertedValue =
    field.value && type === "datetime-local"
      ? isoToDatePickerValue(new Date(field.value))
      : field.value;

  return (
    <FieldWrapper fieldState={fieldState}>
      <Label label={label ?? controllerProps.name} {...controllerProps} />
      <input
        type={type ?? "text"}
        className={inputStyle}
        placeholder={placeholder ?? `Enter ${controllerProps.name}`}
        id={id ?? `${controllerProps.name}`}
        {...field}
        value={convertedValue}
        onChange={(e) => {
          const value =
            type === "datetime-local"
              ? new Date(e.target.value).toISOString()
              : e.target.value;
          field.onChange(value);
        }}
      />
      {icon && displayIcon(icon)}
      {fieldState.invalid && <Error {...controllerProps} />}
    </FieldWrapper>
  );
}
