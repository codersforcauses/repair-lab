import { forwardRef } from "react";

import cn from "@/lib/classnames";

interface HoverOpacityButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scaleOnHover?: boolean;
}

const HoverOpacityButton = forwardRef<
  HTMLButtonElement,
  HoverOpacityButtonProps
>(({ children, className, scaleOnHover = true, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        `hover:enabled:opacity-50 transition-all duration-150 disabled:opacity-50`,
        scaleOnHover ? "hover:enabled:scale-110 active:enabled:scale-90" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

HoverOpacityButton.displayName = "HoverOpacityButton";

export default HoverOpacityButton;
