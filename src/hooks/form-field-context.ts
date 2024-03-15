import { createContext, useContext } from "react";
import { ControllerFieldState, ValidationRule } from "react-hook-form";

export type FormFieldContextProps = {
  fieldName: string;
  fieldLabel?: string;
  fieldState: ControllerFieldState;
  required?: boolean | string | ValidationRule<boolean> | undefined;
};

export const FormFieldContext = createContext<
  FormFieldContextProps | undefined
>(undefined);

/**
 *
 * @returns a custom hook for retrieving the form field context
 */
export function useFieldContext() {
  const context = useContext(FormFieldContext);
  if (context === undefined) {
    throw new Error(
      "useFieldContext must be used within a FormFieldContextProvider"
    );
  }
  return context;
}
