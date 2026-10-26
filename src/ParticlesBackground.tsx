
import { useEffect, useRef } from "react";
import "./ParticlesBackground.css";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let scrollOpacity = 1;

    const particleCount = 85;
    const connectionDistance = 130;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resizeCanvas() {
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    }

    function updateScrollOpacity() {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const fadeDistance = Math.max(height * 0.7, 1);

      scrollOpacity = Math.max(
        0,
        Math.min(1, rect.bottom / fadeDistance)
      );

      container.style.setProperty(
        "--particle-opacity",
        String(scrollOpacity)
      );
    }

    function drawParticles() {
      ctx!.clearRect(0, 0, width, height);

      if (scrollOpacity > 0.01) {
        for (const particle of particles) {
          if (!reducedMotion) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > width) {
              particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > height) {
              particle.speedY *= -1;
            }

            particle.x = Math.max(0, Math.min(width, particle.x));
            particle.y = Math.max(0, Math.min(height, particle.y));
          }

          ctx!.beginPath();
          ctx!.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
          );

          ctx!.fillStyle = `rgba(190, 215, 255, ${particle.opacity})`;
          ctx!.fill();
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity =
                (1 - distance / connectionDistance) * 0.22;

              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.strokeStyle = `rgba(145, 180, 255, ${opacity})`;
              ctx!.lineWidth = 0.7;
              ctx!.stroke();
            }
          }
        }
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(drawParticles);
      }
    }

    resizeCanvas();
    updateScrollOpacity();
    drawParticles();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateScrollOpacity, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateScrollOpacity);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="particles-background"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="particles-canvas"
      />
    </div>
  );
}
