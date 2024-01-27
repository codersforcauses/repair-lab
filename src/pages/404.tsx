import { useEffect, useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
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

      // if not in bounds
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
        // if (distance < 0) return;
        setRotation((currentAngle) => currentAngle + deltaAngle);
        totalDist.current += distance;

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
            ? "Here's some confetti to make you feel better!"
            : "Sorry, the page you are looking for doesn't exist."}
        </div>
        <HoverOpacityButton className="mt-4 p-3 bg-primary-600 text-white rounded-md font-bold">
          Back Home
        </HoverOpacityButton>
      </div>
      {totalDist.current > 100 && <ConfettiCanvas />}
    </>
  );
}

// memes
const COLOURS = ["#f50f26", "#e310a7", "#1744e6", "#20e36e", "#e2fa2f"];
const getRandomColor = () =>
  COLOURS[Math.floor(Math.random() * COLOURS.length)];
class Particle {
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  rotation: number;
  x: number;
  y: number;
  velocity: number;
  color: string;

  constructor(
    context: CanvasRenderingContext2D | null,
    width: number,
    height: number,
    rotation: number,
    x: number,
    y: number,
    velocity: number,
    color: string
  ) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.color = color;
  }

  update() {
    this.rotation += 0.01;
    this.y += this.velocity;
  }
  draw() {
    if (!this.ctx) return;

    const rotate = (x: number, y: number) => ({
      x:
        (x - this.x) * Math.cos(this.rotation) -
        (y - this.y) * Math.sin(this.rotation) +
        this.x,
      y:
        (x - this.x) * Math.sin(this.rotation) +
        (y - this.y) * Math.cos(this.rotation) +
        this.y
    });

    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    const tl = rotate(this.x - this.width / 2, this.y - this.height / 2);
    const tr = rotate(this.x + this.width / 2, this.y - this.height / 2);
    const br = rotate(this.x + this.width / 2, this.y + this.height / 2);
    const bl = rotate(this.x - this.width / 2, this.y + this.height / 2);

    this.ctx.moveTo(tl.x, tl.y);
    this.ctx.lineTo(tr.x, tr.y);
    this.ctx.lineTo(br.x, br.y);
    this.ctx.lineTo(bl.x, bl.y);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

const ConfettiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let particles: Particle[] = [];

  function createParticles() {
    if (!canvasRef || !canvasRef.current) {
      return;
    }
    const width = window.innerWidth;

    const context = canvasRef.current.getContext("2d");
    particles = [];
    let total = 100;

    if (width > 1080) {
      total = 400;
    } else if (width > 760) {
      total = 300;
    } else if (width > 520) {
      total = 200;
    }
    for (let i = 0; i < total; ++i) {
      particles.push(
        new Particle(
          context,
          randBetween(10, 15),
          randBetween(4, 15),
          randBetween(0, 360),
          randBetween(0, width),
          randBetween(-300, 0),
          randBetween(2, 3),
          getRandomColor()
        )
      );
    }
  }

  function animationFunc() {
    if (!canvasRef || !canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    requestAnimationFrame(animationFunc);
    context.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.update();
      p.draw();
    }
  }

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    createParticles();
    animationFunc();

    // if (stopAfterMs) {
    //   setTimeout(() => {
    //     setRunning(false);
    //   }, stopAfterMs - 1000);
    //   setTimeout(() => {
    //     setHide(true);
    //   }, stopAfterMs);
    // }
  }, []);

  return (
    <canvas
      className="absolute top-0 left-0 z-50 pointer-events-none"
      ref={canvasRef}
    />
  );
};

function randBetween(min: number, max: number): number {
  if (min >= max) throw new Error("Min value must be less than max value");
  return Math.random() * (max - min) + min;
}
