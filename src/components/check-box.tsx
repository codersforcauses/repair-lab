/*
This is a component for a checkbox with accompanying text.
It is a wrapper around the react-hook-form useController hook.
How to use:
    <FieldCheckbox name="myCheckbox" control={control}>
      Some text <a href="https://www.google.com">with a link</a>
    </FieldCheckbox>
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

      <label htmlFor={props.name}>{children}</label>
    </div>
  );
}
