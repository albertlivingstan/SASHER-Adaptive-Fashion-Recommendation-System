import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  value: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  durationMs = 900,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const startTimestampRef = useRef<number | null>(null);
  const startValRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    startValRef.current = displayValue;
    startTimestampRef.current = null;
    let animId: number;

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const step = (timestamp: number) => {
      if (!startTimestampRef.current) startTimestampRef.current = timestamp;
      const progress = Math.min((timestamp - startTimestampRef.current) / durationMs, 1);
      const easedProgress = easeOutCubic(progress);

      const current = startValRef.current + (value - startValRef.current) * easedProgress;
      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, durationMs]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString();

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
