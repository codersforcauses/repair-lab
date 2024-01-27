import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import ConfettiCanvas from "@/components/confetti_overlay";
import NavBar from "@/components/NavBar";

export default function NotFound() {
  const [rotation, setRotation] = useState(0);
  const isMousePressed = useRef(false);
  const rotationalVel = useRef(0);
  const initialAngle = useRef(0);
  const gearRef = useRef<HTMLDivElement>(null);
  const movementStore = useRef<number[]>([]);
  const totalDist = useRef(0);

  function signedAngleDistance(theta1: number, theta2: number) {
    const rawDifference = theta2 - theta1;

    // Normalize to the range [-180, 180)
    const normalizedDifference =
      ((((rawDifference + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) %
        (2 * Math.PI)) -
      Math.PI;
    return normalizedDifference;
  }

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!gearRef.current) return;
      const rect = gearRef.current.getBoundingClientRect();

      // Only allow dragging if initial click is in bounds
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      )
        return;

      isMousePressed.current = true;
      movementStore.current = [];
      rotationalVel.current = 0;
      initialAngle.current = Math.atan2(
        e.clientY - window.innerHeight / 2,
        e.clientX - window.innerWidth / 2
      );
    };

    const handleMouseUp = () => (isMousePressed.current = false);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMousePressed.current) {
        const angle = Math.atan2(
          e.clientY - window.innerHeight / 2,
          e.clientX - window.innerWidth / 2
        );
        const deltaAngle = angle - initialAngle.current;

        const distance = signedAngleDistance(initialAngle.current, angle);

        setRotation((currentAngle) => currentAngle + deltaAngle);
        totalDist.current += Math.abs(distance);

        if (movementStore.current.length > 5) movementStore.current.shift();
        movementStore.current.push(distance);
        rotationalVel.current =
          movementStore.current.reduce((sum, v) => sum + v, 0) /
          movementStore.current.length;

        initialAngle.current = angle;
      }
    };

    const updateInterval = setInterval(() => {
      if (!isMousePressed.current) {
        setRotation((currentAngle) => currentAngle + rotationalVel.current);
        rotationalVel.current *= 0.95;
      }
    }, 1);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(updateInterval);

      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full h-[100vh] justify-center  items-center absolute top-0 left-0">
        <div className="text-[10rem] text-primary-600 h-fit font-bold">
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
          {totalDist.current > 100
            ? "Here's some confetti to cheer you up!"
            : "Sorry, the page you are looking for doesn't exist."}
        </div>
        <HoverOpacityButton className="mt-4 p-3 bg-primary-600 text-white rounded-md font-bold">
          <Link href="/"> Back Home</Link>
        </HoverOpacityButton>
      </div>
      {totalDist.current > 100 && <ConfettiCanvas />}
    </>
  );
}
