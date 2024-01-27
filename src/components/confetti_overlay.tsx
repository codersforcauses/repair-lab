import { useEffect, useRef } from "react";

import ConfettiParticle from "@/lib/confetti-particle";

const COLOURS = ["#f50f26", "#e310a7", "#1744e6", "#20e36e", "#e2fa2f"];
const getRandomColor = () =>
  COLOURS[Math.floor(Math.random() * COLOURS.length)];

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let particles: ConfettiParticle[] = [];

  function createParticles() {
    if (!canvasRef || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    particles = [];

    let total = 100;
    if (window.innerWidth > 1080) total = 400;
    else if (window.innerWidth > 760) total = 300;
    else if (window.innerWidth > 520) total = 200;

    for (let i = 0; i < total; ++i) {
      particles.push(
        new ConfettiParticle(
          context,
          randBetween(10, 15),
          randBetween(4, 15),
          randBetween(0, 360),
          randBetween(0, window.innerWidth),
          randBetween(-300, 0),
          randBetween(2, 3),
          getRandomColor()
        )
      );
    }
  }

  function animateCanvas() {
    const context = canvasRef.current?.getContext("2d");
    if (!context || !canvasRef.current) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    particles.forEach((p) => p.draw());

    requestAnimationFrame(animateCanvas);
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    const handleResize = () => {
      if (!canvasRef.current) return;

      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    handleResize();
    createParticles();
    animateCanvas();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      className="absolute top-0 left-0 z-50 pointer-events-none"
      ref={canvasRef}
    />
  );
}

function randBetween(min: number, max: number): number {
  if (min >= max) throw new Error("Min value must be less than max value");
  return Math.random() * (max - min) + min;
}
