import { useEffect, useRef } from "react";

import ConfettiParticle from "@/lib/confetti-particle";

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<ConfettiParticle[]>([]);

  function createParticles() {
    if (!canvasRef || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    particles.current = [];

    let total = 100;
    if (window.innerWidth > 1080) total = 400;
    else if (window.innerWidth > 760) total = 300;
    else if (window.innerWidth > 520) total = 200;

    for (let i = 0; i < total; ++i) {
      particles.current.push(new ConfettiParticle(context));
    }
  }

  function animateCanvas() {
    const context = canvasRef.current?.getContext("2d");
    if (!context || !canvasRef.current) return;

    const height = canvasRef.current.height;

    context.clearRect(0, 0, canvasRef.current.width, height);
    // Simulate & delete particles out of bounds
    particles.current.forEach((p) => p.draw());
    particles.current = particles.current.filter((p) => p.y < height + 20);

    if (particles.current.length <= 0) return;
    const animationHandle = requestAnimationFrame(animateCanvas);

    return () => {
      cancelAnimationFrame(animationHandle);
    };
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
    const cancelAnimation = animateCanvas();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimation?.();
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
