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
  size?: string;
}

/**
 * An all-in one component for text area fields
 * @param {string} id  The id of the text area
 * @param {string} label  The label of the text area
 * @param {string} placeholder  The placeholder of the text area
 * @param {string} size  The size of the text area, specify width and height
 * @returns {JSX.Element} A text area that is compatible w/ React-hook-forms
 */
export default function FieldTextArea<T extends FieldValues = FieldValues>({
  id,
  label,
  placeholder,
  size = "h-36 w-full",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  const textAreaStyle = `overflow-wrap:break-word p-3 h-full w-full resize-none overflow-y-auto text-grey-900 text-base placeholder:text-gray-500 placeholder:font-normal rounded-lg active:border-grey-500 focus:outline-none focus:ring-0`;

  return (
    <FieldWrapper fieldState={fieldState} size={size}>
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
