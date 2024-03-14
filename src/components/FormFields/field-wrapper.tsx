import { DOMAttributes, ReactNode } from "react";
import { ControllerFieldState } from "react-hook-form";

export interface FieldWrapperProps extends DOMAttributes<HTMLDivElement> {
  children?: ReactNode;
  fieldState?: ControllerFieldState;
  size?: string;
  divProps?: DOMAttributes<HTMLDivElement>;
}
/**
 * A generic wrapper for form fields
 * @param {ReactNode} children - The children to be wrapped
 * @param {ControllerFieldState} fieldState - The state of the field
 * @param {string} size - The size of the field
 * @param {DOMAttributes<HTMLDivElement>} divProps - Usual HTML div props
 * @returns A wrapper for form fields
 */
export default function FieldWrapper({
  children,
  fieldState,
  size = "h-10",
  ...divProps
}: FieldWrapperProps) {
  const baseStyle = `relative flex ${size} w-full flex-row items-center justify-end rounded-lg border shadow hover:shadow-grey-500 active:shadow-grey-500 focus-within:shadow-grey-500 transition-all duration-300 ease-in-out min-w-80 text-ellipsis `;
  const errorBorderStyle = `border-red-600 border-2`;
  const normalBorderStyle = `border-grey-300`;

  const isInvalid = fieldState?.invalid;

  return (
    <div
      className={`${baseStyle} ${
        isInvalid ? `${errorBorderStyle}` : `${normalBorderStyle}`
      }`}
      {...divProps}
    >
      {children}
    </div>
  );
}
