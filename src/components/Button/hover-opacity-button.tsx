import { forwardRef } from "react";

const HoverOpacityButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`hover:opacity-50 transition-all duration-150 hover:scale-110 active:scale-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

HoverOpacityButton.displayName = "HoverOpacityButton";

export default HoverOpacityButton;
