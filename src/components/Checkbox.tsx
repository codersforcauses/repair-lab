import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

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
  sampleText,
  ...props
}: FormProps<T>) {
  const { field } = useController({ ...props });

  return (
    <div className="order-3 flex h-12 w-96 flex-none items-center self-stretch">
      <input type="checkbox" {...field} className="mr-4" />

      {label && (
        <label htmlFor={props.name}>
          {sampleText}
          {href ? (
            <a href={href} className="ml-2 font-bold underline">
              {label}
            </a>
          ) : (
            label
          )}
        </label>
      )}
    </div>
  );
}
