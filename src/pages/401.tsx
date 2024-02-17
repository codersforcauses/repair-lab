import { useRef } from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import NavBar from "@/components/NavBar";

const UnauthorisedPage = () => {
  const lockRef = useRef<HTMLDivElement>(null); 
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full h-[100vh] justify-center items-center absolute top-0 left-0">
        <div className="text-[10rem] text-primary-600 h-fit font-bold select-none">
          4
          <div ref={lockRef} className="inline"> 
            <FaLock 
              className="inline -mt-6"
            />
          </div>
          <span className ="mr-8">1</span>
        </div>

        <div>
          Sorry, you are not authorized to access this page.
        </div>
        <HoverOpacityButton className="mt-4 p-3 bg-primary-600 text-white justify-center items-center rounded-md font-bold">
          <Link href="/">Back Home</Link>
        </HoverOpacityButton>
      </div>
    </>
  );
}

export default UnauthorisedPage;
