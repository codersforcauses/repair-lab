import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";
import FieldWrapper from "@/components/FormFields/field-wrapper";
export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T>,
    Omit<React.HTMLAttributes<HTMLTextAreaElement>, "defaultValue"> {
  id?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  width?: string;
  height?: string;
}

/**
This is an all-in one component for the HTML `<textarea>' tag.
  @param label: The label displayed on the text box
  @param laceholder: The placeholder message displayed on the text box
  @returns A large text box that is compatible w/ React-hook-forms
*/
export default function FieldTextArea<T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  width = "w-full",
  height = "h-36",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  const textAreaStyle = `overflow-wrap:break-word p-3 h-full w-full resize-none overflow-y-auto text-base placeholder:text-gray-500 placeholder:font-normal rounded-lg active:border-grey-500 focus:outline-none focus:ring-0`;

  return (
    <FieldWrapper fieldState={fieldState} size="h-36">
      <Label label={label ?? props.name} {...props} />
      <textarea
        className={textAreaStyle}
        placeholder={placeholder ?? `Enter ${props.name}`}
        id={id ?? props.name}
        {...field}
      />
      {fieldState.invalid && <Error {...props} />}
    </FieldWrapper>
  );
}
