import { FaGear } from "react-icons/fa6";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="relative w-12 h-12 text-sm">
        <div className="absolute w-1 h-1">
          <FaGear className="animate-spin text-primary-500 text-[1.5rem]" />
        </div>
        <div className="absolute top-[15px] left-[15px] transform w-1 h-1">
          <FaGear className="animate-reverse-spin text-primary-500 text-[2rem]" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
