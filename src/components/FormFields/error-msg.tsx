import { FieldValues } from "react-hook-form";

import { useFieldContext } from "@/hooks/form-field-context";

export interface FormErrorLabelProps {
  className?: string;
}

/**
 * This is a component for displaying error messages for form fields
 * @param {string} className  custom CSS if needed
 * @param {useControllerProps} props props from useController
 * @returns {JSX.Element} A error message that is compatible w/ React-hook-forms
 */
export default function Error<T extends FieldValues = FieldValues>({
  className
}: FormErrorLabelProps) {
  const { fieldName, fieldState } = useFieldContext();
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
          ? `${fieldName} is invalid`
          : fieldState.error.message}
      </p>
    </div>
  );
}
