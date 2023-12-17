import { forwardRef } from "react";

const HoverOpacityButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`hover:opacity-50 transition-opacity duration-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

HoverOpacityButton.displayName = "HoverOpacityButton";

export default HoverOpacityButton;
