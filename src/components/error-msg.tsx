import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  errormsg?: string;
}

/*
This is a component to display the error messages for an input field
Output:
  A <div> that contains the error message for a specific input field
*/
export default function Error<T extends FieldValues = FieldValues>({
  ...props
}: FormProps<T>) {
  const { fieldState } = useController(props);
  return (
    <div>
      {/* Display error message */}
      <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
        {fieldState.error?.message}
      </p>
    </div>
  );
}
