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
  children?: React.ReactNode;
}

export default function FieldCheckbox<T extends FieldValues = FieldValues>({
  children,
  ...props
}: FormProps<T>) {
  const { field } = useController({ ...props });

  return (
    <div className="px-2 py-2">
      <input type="checkbox" {...field} id={props.name} className="ml-4 mr-4" />

      <label htmlFor={props.name}>
          {children}
      </label>
    </div>
  );
}
