import { useState } from "react";

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
    setTimeout(() => setIsButtonDisabled(false), 500);
  }

  return (
    <div className="mx-5 mt-4 rounded-lg bg-slate-200 shadow-lg">
      <div className={`flex justify-between flex-row text-lg rounded-lg transition-colors duration-300 ease-in-out ${!expanded ? "bg-slate-200" : "bg-slate-300"} `}
        role='button'
        tabIndex={0}
        onKeyDown={handleClick}
        onClick={handleClick}>
        {/* <span className="flex-none">
          <Image
            src={imagePath}
            alt="event image"
            width={500}
            height={500}
            className="w-20 h-20 ml-1 rounded-full scale-95"
          />
        </span> */}
        <div className="flex flex-col ml-2 mr-2">
          <span className="font-bold pt-2">
            {eventTitle}
          </span>
          <div className="pt-1 italic border-spacing-2">
            {startDate} - {endDate}
          </div>
        </div>

        <div className="justify-right mr-2 -mt-1">
          <svg fill="None" viewBox="0 0 30 30" strokeWidth={2}
            stroke="black" className="flex w-7 h-7 mt-8 justify-right">;
            <path
              // Used icons from https://heroicons.com/
              // Open source, MIT license. 
              d={expanded ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                : "M19.5 8.25l-7.5 7.5-7.5-7.5"
              }
            />
          </svg>
        </div>
      </div>

      <div className={`pt-1 relative mb-2 mx-2 overflow-hidden 
      transition-[max-height] duration-500 ease-in-out ${expanded ? "max-h-40" : "max-h-0"}`}>
        {description}
          
        <div role='button'
            tabIndex={0}
            className="bg-primary-800 px-2000 opacity-50 rounded-lg text-white h-6 text-md hover:bg-primary-800 text-center"
        >
          See Repair Requests {">"}
        </div>

      </div>

    
    </div>
  );
};

export default Box;