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
    Omit<React.HTMLAttributes<HTMLInputElement>, "defaultValue"> {
  id?: string;
  label?: string;
  size?: string;
}

/** 
An all-in-one component for the HTML '<radio>' tag
@param id The ID for the radio box
@param label The label displayed on the text box
@returns An input radio option box for a 'yes' or 'no' question that is compatible w/ React-hook-forms 
*/
export default function FieldRadio<T extends FieldValues = FieldValues>({
  id,
  label,
  size = "w-full h-10",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  const radioStyle = `my-auto flex flex-row items-start gap-4 text-xs`;

  return (
    <FieldWrapper fieldState={fieldState} size={size}>
      <Label label={!label ? props.name : label} {...props} />
      <div className={radioStyle}>
        <label htmlFor={`${props.name}-y`} className="flex gap-1">
          <input
            {...field}
            type="radio"
            value="true"
            id={!id ? `${props.name}-y` : `${id}-y`}
            checked={field.value == "true" ? true : false}
          />
          Yes
        </label>

        <label htmlFor={`${props.name}-n`} className="flex gap-1">
          <input
            {...field}
            type="radio"
            value="false"
            id={!id ? `${props.name}-n` : `${id}-n`}
            checked={field.value == "false" ? true : false}
          />
          No
        </label>
      </div>
      {fieldState.invalid && <Error {...props} />}
    </FieldWrapper>
  );
}
