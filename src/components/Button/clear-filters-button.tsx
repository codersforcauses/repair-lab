import { FaFilterCircleXmark } from "react-icons/fa6";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import cn from "@/lib/classnames";

interface ClearFiltersButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function ClearFiltersButton({
  className,
  onClick
}: ClearFiltersButtonProps) {
  return (
    <HoverOpacityButton
      className={cn(
        "flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 text-gray-500",
        className
      )}
      title="Clear Filters"
      onClick={onClick}
    >
      <FaFilterCircleXmark className="text-[1rem] transform translate-y-[2px] h-5 w-5" />
    </HoverOpacityButton>
  );
}
