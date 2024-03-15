import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";
import FieldWrapper from "@/components/FormFields/field-wrapper";
import { FormFieldContext } from "@/hooks/form-field-context";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T>,
    Omit<React.HTMLAttributes<HTMLInputElement>, "defaultValue"> {
  id?: string;
  label?: string;
  size?: string;
}

/**
 * An all-in-one component for the HTML 'radio' tag
 * @param {UseControllerProps} controllerProps The controller props for the radio field, such as `control` and `rules`
 * @param {string} label The label displayed on the text box
 * @returns An input radio option box for a 'yes' or 'no' question that is compatible w/ React-hook-forms
 */
export default function FieldRadio<T extends FieldValues = FieldValues>({
  id,
  label,
  size = "w-full h-10",
  ...controllerProps
}: FormProps<T>) {
  const { field, fieldState } = useController(controllerProps);

  const radioStyle = `my-auto flex flex-row items-start gap-4 text-xs`;

  return (
    <FormFieldContext.Provider
      value={{
        fieldName: field.name,
        fieldLabel: label,
        fieldState: fieldState,
        required: controllerProps.rules?.required
      }}
    >
      <FieldWrapper fieldState={fieldState} size={size}>
        <Label />
        <div className={radioStyle}>
          <label htmlFor={`${controllerProps.name}-y`} className="flex gap-1">
            <input
              {...field}
              type="radio"
              value="true"
              id={!id ? `${controllerProps.name}-y` : `${id}-y`}
              checked={field.value == "true" ? true : false}
            />
            Yes
          </label>

          <label htmlFor={`${controllerProps.name}-n`} className="flex gap-1">
            <input
              {...field}
              type="radio"
              value="false"
              id={!id ? `${controllerProps.name}-n` : `${id}-n`}
              checked={field.value == "false" ? true : false}
            />
            No
          </label>
        </div>
        {fieldState.invalid && <Error {...controllerProps} />}
      </FieldWrapper>
    </FormFieldContext.Provider>
  );
}
