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
    setTimeout(() => setIsButtonDisabled(false), 1);
  }

  return (
    <div className="flex mx-10 flex-row mt-5 items-right text-xs rounded-lg
     bg-slate-200 shadow-sm">
      <span className="flex-none">
        <Image
          src={imagePath}
          alt="event image"
          width={500}
          height={500}
          className="w-20 h-20 ml-1 rounded-full scale-75"
        />
      </span>
      <div className="flex flex-col ml-2 mr-2">
        <span className="font-bold text-sm pt-2">
          {eventTitle}
        </span>
        <div className="pt-1 italic border-spacing-2">
          {startDate} - {endDate}
        </div>

        <div className={`pt-1 ${!expanded && "line-clamp-1"} relative`}>
          {description}
        </div>
      
      </div>

      <div className="items-right mr-2 -mt-1">
        <svg fill="None" viewBox="0 0 30 30" strokeWidth={1.5} 
            stroke="black" className="w-8 h-8 mt-8">;
            <path  

                // Used icons from https://heroicons.com/
                // Open source, MIT license. 
                d = {expanded ? "M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                                :"M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" 
                    }
                role='button'
                tabIndex={0}
                onKeyDown={handleClick}
                onClick={handleClick}
            />
          </svg>
      </div>
      
    </div>
  );
};

export default Box;