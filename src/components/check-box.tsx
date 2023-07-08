/*
This is a component for a checkbox with accompanying text.
Input:
  label: The text displayed next to the checkbox
  href: The URL for the hyperlink
  hrefLabel: The text displayed for the hyperlink
Output:
  A checkbox input with associated text that is compatible with react-hook-form
*/

import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  href?: string;
  hrefLabel?: string;
}

export default function Field_Checkbox<T extends FieldValues = FieldValues>({
  label,
  href,
  hrefLabel,
  ...props
}: FormProps<T>) {
  const { field } = useController({ ...props });

  return (
    <div className="order-3 flex h-12 w-96 flex-none items-center self-stretch">
      <input type="checkbox" {...field} className="ml-4 mr-4" />

      {label && (
        <label htmlFor={props.name}>
          {label}
          {href ? (
            <a href={href} className="ml-2 font-bold underline">
              {hrefLabel}
            </a>
          ) : (
            hrefLabel
          )}
        </label>
      )}
    </div>
  );
}
