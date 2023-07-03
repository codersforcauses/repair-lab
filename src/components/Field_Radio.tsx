import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

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
  placeholder: The placeholder message displayed on the text box
  icon: An optional Image path to display an .svg file
Output:
  A input text box that is compatible w/ React-hook-forms
*/
export default function Field_Radio<T extends FieldValues = FieldValues>({
  label,
  ...props
}: FormProps<T>) {
  const { field } = useController(props);

  return (
    <div className="relative mb-2 flex h-12 w-64 flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow">
      <div className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-[#FFF] px-1">
        <label className="text-black text-xs font-semibold">
          {label ?? props.name}
        </label>
        {props.rules?.required ? (
          <span className="text-xs font-semibold text-[#FF0000]">*</span>
        ) : (
          ""
        )}
      </div>
      <div className="m-auto flex flex-row items-start gap-1 text-xs">
        <label htmlFor={`${props.name}-y`} className="mr-8">
          <input {...field} type="radio" value="yes" id={`${props.name}-y`} />
          Yes
        </label>

        <label htmlFor={`${props.name}-n`}>
          <input {...field} type="radio" value="no" id={`${props.name}-n`} />
          No
        </label>
      </div>
    </div>
  );
}
