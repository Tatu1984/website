'use client';

import { useEffect, useState } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function SplashCursor() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Splash ripples on click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-primary/60 animate-ping"
            style={{
              animationDuration: '1s',
              animationIterationCount: '1',
            }}
          />
          <div
            className="absolute inset-0 w-8 h-8 rounded-full bg-primary/30 animate-ping"
            style={{
              animationDuration: '0.8s',
              animationIterationCount: '1',
            }}
          />
        </div>
      ))}
    </>
  );
}
