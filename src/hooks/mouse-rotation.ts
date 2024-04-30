import { RefObject, useEffect, useRef, useState } from "react";

/**
 * Used to update the rotation around a central div based on mouse click and drag movement
 * @param clickableRef The div ref that the user can click and drag
 * @returns
 */
export const useMouseRotation = (clickableRef: RefObject<HTMLDivElement>) => {
  const [rotation, setRotation] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  const isMousePressed = useRef(false);
  const rotationalVel = useRef(0);
  const initialAngle = useRef(0);
  const movementStore = useRef<number[]>([]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!clickableRef.current) return;
      const rect = clickableRef.current.getBoundingClientRect();

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
      if (!isMousePressed.current) return;

      const angle = Math.atan2(
        e.clientY - window.innerHeight / 2,
        e.clientX - window.innerWidth / 2
      );
      const deltaAngle = angle - initialAngle.current;

      const distance = signedAngleDistance(initialAngle.current, angle);

      setRotation((currentAngle) => currentAngle + deltaAngle);
      setTotalDistance((currentDist) => currentDist + Math.abs(distance));

      if (movementStore.current.length > 5) movementStore.current.shift();
      movementStore.current.push(distance);
      rotationalVel.current =
        movementStore.current.reduce((sum, v) => sum + v, 0) /
        movementStore.current.length;

      initialAngle.current = angle;
    };

    const velocityInterval = setInterval(() => {
      if (isMousePressed.current || rotationalVel.current == 0) return;

      setRotation((currentAngle) => currentAngle + rotationalVel.current);
      rotationalVel.current *= 0.95;
      if (Math.abs(rotationalVel.current) < 0.0005) rotationalVel.current = 0;
    }, 1);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(velocityInterval);

      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [rotation, totalDistance] as const;
};

function signedAngleDistance(theta1: number, theta2: number) {
  const rawDifference = theta2 - theta1;

  // Normalize to the range [-180, 180)
  const normalizedDifference =
    ((((rawDifference + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) %
      (2 * Math.PI)) -
    Math.PI;
  return normalizedDifference;
}
