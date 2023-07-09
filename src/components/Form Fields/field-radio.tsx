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
}

/*
This is a component for the HTML `<radio>' tag
Will display 2 radio buttons asking displaying 'Yes' or 'No'
Input:
  ID : The ID for the radio box
  label: The label displayed on the text box
Output:
  A input radio option box for a 'yes' or 'no' question that is compatible w/ React-hook-forms 
*/
export default function FieldRadio<T extends FieldValues = FieldValues>({
  id,
  label,
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  const errorStyle = !fieldState.invalid
    ? "relative mb-2 flex h-10 w-full flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow"
    : "relative mb-2 flex h-10 w-full flex-row items-center justify-between rounded-lg border border-red-500 px-3 shadow";

  return (
    <div className={errorStyle}>
      <Label label={!label ? props.name : label} {...props} />
      <div className="my-auto flex flex-row items-start gap-4 text-xs">
        <label htmlFor={`${props.name}-y`} className="flex gap-1">
          <input
            {...field}
            type="radio"
            value="true"
            id={!id ? `${props.name}-y` : `${id}-y`}
          />
          Yes
        </label>

        <label htmlFor={`${props.name}-n`} className="flex gap-1">
          <input
            {...field}
            type="radio"
            value="false"
            id={!id ? `${props.name}-n` : `${id}-n`}
          />
          No
        </label>
      </div>
      {fieldState.invalid && <Error {...props} />}
    </div>
  );
}
