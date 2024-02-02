import { useRef } from "react";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import ConfettiCanvas from "@/components/confetti_overlay";
import NavBar from "@/components/NavBar";
import { useMouseRotation } from "@/hooks/mouse-rotation";

const triggerDistance = 50;

export default function NotFound() {
  const gearRef = useRef<HTMLDivElement>(null);
  const [rotation, totalDistance] = useMouseRotation(gearRef);

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full h-[100vh] justify-center  items-center absolute top-0 left-0">
        <div className="text-[10rem] text-primary-600 h-fit font-bold select-none">
          4
          <div ref={gearRef} className="inline">
            <FaGear
              className="inline cursor-grab"
              style={{ transform: `rotate(${rotation}rad)` }}
            />
          </div>
          4
        </div>

        <div>
          {totalDistance > triggerDistance
            ? "Here's some confetti to cheer you up!"
            : "Sorry, the page you are looking for doesn't exist."}
        </div>
        <HoverOpacityButton className="mt-4 p-3 bg-primary-600 text-white rounded-md font-bold">
          <Link href="/">Back Home</Link>
        </HoverOpacityButton>
      </div>
      {totalDistance > triggerDistance && <ConfettiCanvas />}
    </>
  );
}
