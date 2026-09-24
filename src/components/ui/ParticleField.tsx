import React, { useEffect, useRef } from 'react';

interface Particle {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: string;
  a: number;
}

interface ParticleFieldProps {
  className?: string;
  densityScale?: number; // 1 for full density, 0.5 for lighter games/subsections
  interactive?: boolean;
}

// 0 -> 0.5 blends #ff6b1a -> #ff3d7f, 0.5 -> 1 blends #ff3d7f -> #2997ff
function gradAt(ratio: number): string {
  const t = Math.max(0, Math.min(1, ratio));
  let r: number, g: number, b: number;
  if (t <= 0.5) {
    const u = t / 0.5;
    r = 255;
    g = Math.round(107 + (61 - 107) * u);
    b = Math.round(26 + (127 - 26) * u);
  } else {
    const u = (t - 0.5) / 0.5;
    r = Math.round(255 + (41 - 255) * u);
    g = Math.round(61 + (151 - 61) * u);
    b = Math.round(127 + (255 - 127) * u);
  }
  return `rgb(${r},${g},${b})`;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  className = '',
  densityScale = 1.0,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let particles: Particle[] = [];
    let isVisible = true;
    let isSettled = false;

    // Mouse tracking state relative to canvas CSS coordinates
    const m = { x: -9999, y: -9999, in: false };

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect light mode for base alpha boost
    const isLightMode = () => {
      return (
        document.documentElement.getAttribute('data-theme') === 'light' ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: light)').matches &&
          document.documentElement.getAttribute('data-theme') !== 'dark')
      );
    };

    const alphaMultiplier = isLightMode() ? 1.3 : 1.0;

    const initParticles = (width: number, height: number) => {
      particles = [];
      if (width <= 0 || height <= 0) return;

      // Base grid spacing of 22px
      let g = Math.round(22 / Math.sqrt(densityScale));

      // Calculate approximate particle count and cap at ~1,800
      const approxCount = (width / g) * (height / g);
      if (approxCount > 1800) {
        g = Math.ceil(Math.sqrt((width * height) / 1800));
      }

      for (let y = g / 2; y < height; y += g) {
        for (let x = g / 2; x < width; x += g) {
          const hx = x + (Math.random() - 0.5) * 10;
          const hy = y + (Math.random() - 0.5) * 10;
          const col = gradAt(hx / Math.max(1, width));
          const baseAlpha = (0.15 + Math.random() * 0.35) * alphaMultiplier;

          particles.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            c: col,
            a: Math.min(0.9, baseAlpha)
          });
        }
      }
    };

    const drawFrame = (W: number, H: number) => {
      ctx.clearRect(0, 0, W, H);
      let totalMotion = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (interactive && m.in) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          const R = 110;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 2.2;
            p.vx += (dx / d) * f - (dy / d) * f * 0.6; // repel + swirl
            p.vy += (dy / d) * f + (dx / d) * f * 0.6;
          }
        }

        p.vx += (p.hx - p.x) * 0.04; // spring home
        p.vy += (p.hy - p.y) * 0.04;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        const sp = Math.hypot(p.vx, p.vy);
        totalMotion += sp;

        const ang = sp > 0.05 ? Math.atan2(p.vy, p.vx) : 0.6;
        const len = 3 + Math.min(sp * 2.5, 9);

        ctx.strokeStyle = p.c;
        ctx.globalAlpha = Math.min(1, p.a + sp * 0.15);
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(p.x - Math.cos(ang) * len * 0.5, p.y - Math.sin(ang) * len * 0.5);
        ctx.lineTo(p.x + Math.cos(ang) * len * 0.5, p.y + Math.sin(ang) * len * 0.5);
        ctx.stroke();
      }

      return totalMotion;
    };

    let cssWidth = 0;
    let cssHeight = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = rect.width;
      cssHeight = rect.height;

      if (cssWidth <= 0 || cssHeight <= 0) return;

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(cssWidth, cssHeight);

      if (prefersReducedMotion) {
        drawFrame(cssWidth, cssHeight);
      } else {
        startLoop();
      }
    };

    const loop = () => {
      if (!isVisible || document.hidden) {
        animId = null;
        return;
      }

      const motion = drawFrame(cssWidth, cssHeight);

      // Once particles settle and mouse is not in canvas, stop animation to conserve resources
      if (!m.in && motion < 0.01 && particles.length > 0) {
        isSettled = true;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (prefersReducedMotion) return;
      isSettled = false;
      if (animId === null && isVisible && !document.hidden) {
        animId = requestAnimationFrame(loop);
      }
    };

    // Mouse handlers with exact bounding coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;
      m.in = true;
      if (isSettled) {
        startLoop();
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;
      m.in = true;
      startLoop();
    };

    const handleMouseLeave = () => {
      m.in = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          m.x = e.clientX - rect.left;
          m.y = e.clientY - rect.top;
          m.in = true;
          if (isSettled) startLoop();
        } else if (m.in) {
          m.in = false;
        }
      });
    }

    // Visibility and Intersection Observers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startLoop();
          } else if (animId !== null) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId !== null) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    resizeCanvas();

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [densityScale, interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
