import Link from "next/link";
import { Disclosure, Transition } from '@headlessui/react';

// Contains type of info stored in our event box.
type BoxProps = {
  eventTitle: string;
  startDate: string; // Wanted to use the Date type, but had issues, will alter based off what the backend is
  endDate: string;
  description: string;
  handleClick?: () => void;
  // Add other data as required
  // Add image stuff later once figure it out / if theres even an image that will be returned
}

const Box = ({
  eventTitle,
  startDate,
  endDate,
  description
}: BoxProps) => {


  return (
    <div className="mx-5 mt-4 rounded-lg bg-slate-200 shadow-lg">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button as="div" className={`flex justify-between flex-row text-lg rounded-lg transition-colors duration-300 ease-in-out  ${!open ? "bg-slate-200" : "bg-slate-300"} `}>
              {/* transition-colors duration-300 ease-in-out ${!expanded ? "bg-slate-200" : "bg-slate-300"}*/}
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

              <div className="justify-right mr-2 -mt-2">
                <svg fill="None" viewBox="0 0 30 30" strokeWidth={2}
                  stroke="black" className="flex w-7 h-7 mt-8 justify-right">;
                  <path
                    // Used icons from https://heroicons.com/
                    // Open source, MIT license. 
                    d={open ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                      : "M19.5 8.25l-7.5 7.5-7.5-7.5"
                    }
                  />
                </svg>
              </div>

            </Disclosure.Button>

            <Transition
              className="overflow-hidden"
              enter="transition-all ease-in-out duration-500"
              enterFrom="transform  max-h-0"
              enterTo="transform  max-h-[800px]"
              leave="transition-all ease-in-out duration-500"
              leaveFrom="transform  max-h-[800px]"
              leaveTo="transform  max-h-0"
            >

              <Disclosure.Panel className="pt-1 relative mb-2 mx-2">
                {description}
                  <div className="p-2 pt-4 relative flex justify-center">
                  <Link href="/my-events/[id].tsx">
                    <div role='button'
                      tabIndex={0}
                      className="bg-primary-800 px-1000 w-48 opacity-50 rounded-lg text-white h-6 text-md hover:bg-primary-800 text-center"
                    >
                      See Repair Requests {">"}
                    </div>
                  </Link>
                </div>

              </Disclosure.Panel>

            </Transition>
          </>
        )}
      </Disclosure>

    </div>
  );
};

export default Box;