import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center relative w-12 h-12 text-sm">
      <div className="absolute top-[0] left-[0] transform w-1 h-1">
        <FontAwesomeIcon
          icon={faGear}
          className="animate-spin text-primary-500 text-[1.5rem]"
        />
      </div>
      <div className="absolute top-[15px] left-[15px] transform w-1 h-1 bol">
        <FontAwesomeIcon
          icon={faGear}
          className="animate-reverse-spin text-primary-500 text-[2rem]"
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
