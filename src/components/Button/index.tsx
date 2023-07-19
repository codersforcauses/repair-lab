import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  border?: string;
  height?: string;
  radius?: string;
  width?: string;
  textColor?: string;
  textSize?: string;
  hover?: string;
  position?: string;
}

export default function Button({
  color = "bg-primary-600",
  border = "border-1",
  height = "h-12",
  radius = "rounded-lg",
  width = "w-full",
  textColor = "text-white",
  textSize = "text-lg",
  hover = "hover:bg-primary-800",
  position = "mx-auto",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${color} ${border} ${radius} ${height} ${width} ${textColor} ${textSize} ${hover} ${position}`}
    >
      {children}
    </button>
  );
}
