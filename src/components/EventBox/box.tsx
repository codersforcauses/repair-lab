import { useRouter } from "next/router";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";

// Contains type of info stored in our event box.
type BoxProps = {
  eventId: string;
  eventTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  handleClick?: () => void;
};

const Box = ({
  eventId,
  eventTitle,
  startDate,
  endDate,
  description,
  location
}: BoxProps) => {
  const router = useRouter();

  return (
    <div className="mx-5 mt-4 rounded-lg bg-slate-200 shadow-lg">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex justify-between text-lg items-center w-full pl-2 pr-3 rounded-lg transition-colors duration-300 ease-in-out  ${
                !open ? "bg-slate-200" : "bg-slate-300"
              } `}
            >
              <div className=" flex flex-col text-left py-2">
                <span className="font-bold">{eventTitle}</span>
                <div className="italic border-spacing-2 text-sm">
                  {startDate} - {endDate}
                </div>
              </div>
              <FaChevronDown
                className={`transition duration-300 ease-in-out ${
                  open ? "-rotate-180" : ""
                }`}
              />
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
                <p className="space-x-1">
                  <span className="font-semibold">Location:</span>
                  <span>{location}</span>
                </p>
                <p className="space-x-1">
                  <span className="font-semibold">Details:</span>
                  <span>{description}</span>
                </p>
                <div className="p-2 pt-4 relative flex justify-center">
                  <button
                    className="bg-primary-800 px-1000 w-48 opacity-50 rounded-lg text-white h-10 text-md text-center hover:bg-primary-700"
                    onClick={() =>
                      // For future use when linking to issue 118
                      router.push("/repairer/events/" + eventId)
                    }
                  >
                    See Repair Requests {">"}
                  </button>
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
