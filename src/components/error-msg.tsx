import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

export type FormProps<T extends FieldValues = FieldValues> =
  UseControllerProps<T>;

/*
This is a component to display the error messages for an input field
Output:
  A <div> that contains the error message for a specific input field
*/
export default function Error<T extends FieldValues = FieldValues>({
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  return (
    <div>
      {/* Display error message */}
      <p className="absolute right-2 top-6 self-start rounded bg-white px-2 py-1 text-xs italic text-red-500">
        {!fieldState.error?.message
          ? `${field.name} is invalid`
          : fieldState.error.message}
      </p>
    </div>
  );
}
