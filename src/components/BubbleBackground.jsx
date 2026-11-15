import { useEffect, useRef } from "react";

// Интерактивный фон — плавающие пузырьки, реагируют на мышь
export default function BubbleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "rgba(26,165,159,0.12)",
      "rgba(185,212,241,0.15)",
      "rgba(255,208,47,0.10)",
      "rgba(255,107,107,0.08)",
      "rgba(166,220,210,0.13)",
      "rgba(200,180,240,0.10)",
    ];

    class Bubble {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.r = 6 + Math.random() * 30;
        this.speed = 0.3 + Math.random() * 0.7;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.008 + Math.random() * 0.015;
        this.wobbleRange = 20 + Math.random() * 30;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity = 0.3 + Math.random() * 0.5;
      }
      update() {
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;
        this.y -= this.speed;

        // мышь отталкивает пузырьки
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }

        if (this.y + this.r < -20) this.reset();
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        // блик
        ctx.beginPath();
        ctx.arc(this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const count = Math.min(35, Math.floor(window.innerWidth / 30));
    const bubbles = Array.from({ length: count }, () => {
      const b = new Bubble();
      b.y = Math.random() * canvas.height; // рассыпаем по высоте сразу
      return b;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        b.update();
        b.draw(ctx);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches) {
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      } else {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
