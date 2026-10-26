
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let scrollOpacity = 1;

    const createParticles = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(
        Math.floor((width * height) / 11000),
        90
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.55 + 0.2,
      }));
    };

    const handleScroll = () => {
      // Fade particles as the visitor scrolls away from the hero.
      scrollOpacity = Math.max(
        0,
        1 - window.scrollY / 350
      );
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      if (scrollOpacity > 0) {
        particles.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
          );

          context.fillStyle = `rgba(120, 180, 255, ${
            particle.opacity * scrollOpacity
          })`;

          context.fill();
        });
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    createParticles();
    handleScroll();

    window.addEventListener("resize", createParticles);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", createParticles);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="particles-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
