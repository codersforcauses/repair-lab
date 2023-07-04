import { FieldValues, useController, UseControllerProps } from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  href?: string;
}

/*
This is a component for a checkbox with accompanying text.
Input:
  label: The text displayed next to the checkbox
Output:
  A checkbox input with associated text that is compatible with react-hook-form
*/
export default function Field_Checkbox<T extends FieldValues = FieldValues>({
  label,
  href,
  ...props
}: FormProps<T>) {
  const { field } = useController({ ...props });

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...field}
      />

      {label && (
        <label htmlFor={props.name}>
          {href ? (
            <a href={href}>{label}</a>
          ) : (
            label
          )}
        </label>
      )}
    </div>
  );
}
