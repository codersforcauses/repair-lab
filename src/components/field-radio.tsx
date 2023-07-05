import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/box-label";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
}

/*
This is a component for the HTML `<radio>' tag
Will display 2 radio buttons asking displaying 'Yes' or 'No'
Input:
  label: The label displayed on the text box
Output:
  A input radio option box for a 'yes' or 'no' question that is compatible w/ React-hook-forms 
*/
export default function Field_Radio<T extends FieldValues = FieldValues>({
  label,
  ...props
}: FormProps<T>) {
  const { field } = useController(props);

  !label ? (label = props.name) : "";

  return (
    <div className="relative mb-2 flex h-12 w-64 flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow">
      <Label label={label} {...props} />
      <div className="m-auto flex flex-row items-start gap-1 text-xs">
        <label htmlFor={`${props.name}-y`} className="mr-8 flex gap-1">
          <input {...field} type="radio" value="yes" id={`${props.name}-y`} />
          Yes
        </label>

        <label htmlFor={`${props.name}-n`} className="flex gap-1">
          <input {...field} type="radio" value="no" id={`${props.name}-n`} />
          No
        </label>
      </div>
    </div>
  );
}
