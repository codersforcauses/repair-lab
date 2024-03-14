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
  size?: string;
}

/**
 This is a all-in-one component for the HTML `<input>' tag
  @param {string} id: The ID for the the input
  @param {string} label: The label displayed on the text box
  @param {string} placeholder: The placeholder message displayed on the text box
  @param {string | ReactElement} icon: An optional Image path to display an .svg file
  @param {string} size: The size of the input box, specify the height and width
  @returns A input text box that is compatible w/ React-hook-forms
 */

export default function FieldInput<T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  icon,
  type,
  size = "h-10 w-full",
  ...controllerProps
}: FormProps<T>) {
  const { field, fieldState } = useController(controllerProps);

  const inputStyle = `w-full h-full text-base placeholder:text-gray-500 text-grey-900 focus:outline-none focus:ring-0 rounded-lg px-3`;

  const focusOnField = () => {
    const input = document.getElementById(id ?? `${controllerProps.name}`);
    input?.focus();
  };

  const displayIcon = (icon: string | ReactElement) => {
    if (typeof icon == "string") {
      return (
        <Image
          src={icon}
          alt="icon"
          width={16}
          height={16}
          className="w-4 shrink-0 h-full mr-4 cursor-text"
          onClick={focusOnField}
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
    <FieldWrapper fieldState={fieldState} size={size}>
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

      {fieldState.invalid && <Error {...controllerProps} />}
      {icon && displayIcon(icon)}
    </FieldWrapper>
  );
}
