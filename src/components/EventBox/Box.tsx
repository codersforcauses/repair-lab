import { useState } from "react";
import Image from "next/image";

// Contains type of info stored in our event box.
type BoxProps = {
  eventTitle: string;
  startDate: string; // Wanted to use the Date type, but had issues, will alter based off what the backend is
  endDate: string;
  description: string;
  imagePath: string;
  handleClick?: () => void;
  // Add other data as required
  // Add image stuff later once figure it out / if theres even an image that will be returned
}



const Box = ({
  eventTitle,
  startDate,
  endDate,
  description,
  imagePath,
}: BoxProps) => {

  const [expanded, setExpanded] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    if (isButtonDisabled) return;
    setExpanded(!expanded);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 200);
  }

  return (
    <div className="flex mx-10 flex-row mt-5 items-left text-xs rounded-lg
     bg-slate-200 hover:bg-primary-500 shadow-sm"
      role='button'
      tabIndex={0}
      onKeyDown={handleClick}
      onClick={handleClick}>

      <div>
        <Image
          src={imagePath}
          alt="Person holding jeans"
          width={500}
          height={500}
          className="object-fill w-20 h-20 ml-1 custom-position rounded-full scale-75"
        />
      </div>

      <div className="flex flex-col ml-2">
        <span className="font-bold text-sm pt-2">
          {eventTitle}
        </span>
        <div className="pt-1 italic">
          {startDate} - {endDate}
        </div>

        <div className={`pt-1 ${!expanded && "line-clamp-1"}`}>
          {description}
        </div>

  
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">;
          {expanded} <path strokeLinecap="round" strokeLinejoin="round" d = {expanded ? "M19.5 8.25l-7.5 7.5-7.5-7.5": "M4.5 15.75l7.5-7.5 7.5 7.5" }/>;
        </svg>
        


      </div>

    </div>
  );
};

export default Box;