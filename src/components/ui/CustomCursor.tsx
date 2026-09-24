import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    // Check for touch / coarse pointer devices or reduced motion
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reducedMotion) {
      setIsCoarsePointer(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let activeMagneticEl: HTMLElement | null = null;
    let animId: number | null = null;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Fast update for exact dot pointer
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }

      // Fast update for cursor glow
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(255,107,26,0.16), rgba(41,151,255,0.10) 45%, transparent 70%)`;
        glowRef.current.style.opacity = '1';
      }

      // Check magnetic button hover
      const target = e.target as HTMLElement | null;
      const magneticBtn = target?.closest('[data-magnetic]') as HTMLElement | null;

      if (magneticBtn) {
        activeMagneticEl = magneticBtn;
        setIsMagnetic(true);

        const rect = magneticBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const offsetX = (mouseX - btnCenterX) * 0.25;
        const offsetY = (mouseY - btnCenterY) * 0.35;

        magneticBtn.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        magneticBtn.style.transition = 'transform 0.1s ease-out';
      } else {
        if (activeMagneticEl) {
          activeMagneticEl.style.transform = 'translate3d(0, 0, 0)';
          activeMagneticEl.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          activeMagneticEl = null;
        }
        setIsMagnetic(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = 'translate3d(0, 0, 0)';
        activeMagneticEl = null;
      }
      setIsMagnetic(false);
    };

    const render = () => {
      // Lerp ring position with 0.18 factor
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      if (ringRef.current) {
        const radius = isMagnetic ? 32 : 17; // 64px vs 34px diameter
        ringRef.current.style.transform = `translate3d(${ringX - radius}px, ${ringY - radius}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animId) cancelAnimationFrame(animId);
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = 'translate3d(0, 0, 0)';
      }
    };
  }, [isMagnetic]);

  if (isCoarsePointer) return null;

  return (
    <>
      {/* Dynamic Cursor Glow Layer following mouse across canvas/hero */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* 6px Brand Accent Dot exactly at pointer */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: '#ff6b1a',
          boxShadow: '0 0 8px rgba(255, 107, 26, 0.6)'
        }}
        aria-hidden="true"
      />

      {/* 34px / 64px Following Ring with 0.18 Lerp */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-[width,height,background-color,border-color,opacity] duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isMagnetic
            ? 'w-16 h-16 border-[1.5px] border-[#ff6b1a] bg-[#ff6b1a]/12 shadow-lg shadow-[#ff6b1a]/20 backdrop-blur-[1px]'
            : 'w-[34px] h-[34px] border-[1.5px] border-[#ff6b1a]/85 bg-transparent'
        }`}
        aria-hidden="true"
      />
    </>
  );
};
