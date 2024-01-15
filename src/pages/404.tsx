import React, { useEffect, useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";

import NavBar from "@/components/NavBar";

export default function NotFound() {
  const [rotation, setRotation] = useState(0);
  const isMousePressed = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const gearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = () => (isMousePressed.current = true);

    const handleMouseUp = () => (isMousePressed.current = false);

    const handleMouseMove = (e: MouseEvent) => {
      const gear = gearRef.current;
      if (gear && isMousePressed.current) {
        const rect = gear.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const currentMousePos = { x: e.clientX, y: e.clientY };
        const dotProduct =
          (currentMousePos.x - centerX) * (prevMousePos.current.x - centerX) +
          (currentMousePos.y - centerY) * (prevMousePos.current.y - centerY);
        console.log(dotProduct);

        if (dotProduct < 0) return;

        const deltaX = currentMousePos.x - prevMousePos.current.x;
        const deltaY = currentMousePos.y - prevMousePos.current.y;

        const degrees = (deltaX + deltaY) * -1;

        setRotation((rotation) => rotation + degrees);
        prevMousePos.current = currentMousePos;
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex w-full h-[100vh] justify-center  items-center absolute top-0 left-0">
        <div className="text-[10rem] text-primary-600 h-fit font-bold">
          4
          <div ref={gearRef} className="inline">
            <FaGear
              className="inline"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>
          4
        </div>
      </div>
    </>
  );
}
