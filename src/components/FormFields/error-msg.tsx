import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  className?: string;
}

/*
This is a component to display the error messages for an input field
Output:
  A <div> that contains the error message for a specific input field
*/
export default function Error<T extends FieldValues = FieldValues>({
  className,
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  return (
    <div>
      {/* Display error message */}
      <p
        className={
          !className
            ? "absolute -bottom-2 right-2 gap-0.5 self-start rounded-full bg-white px-1 text-xs italic text-red-500"
            : className
        }
      >
        {!fieldState.error?.message
          ? `${field.name} is invalid`
          : fieldState.error.message}
      </p>
    </div>
  );
}
