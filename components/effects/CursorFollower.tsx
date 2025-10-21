'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      setCursorPosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;

        // Smooth easing factor (lower = smoother/slower)
        const ease = 0.15;

        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[10000] mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[#FF9966]" />
      </div>

      {/* Trailing line effect */}
      <svg
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'normal' }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9966" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF9966" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF8547" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line
          x1={mousePosition.x}
          y1={mousePosition.y}
          x2={cursorPosition.x}
          y2={cursorPosition.y}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-200"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-8 h-8 rounded-full border border-[#FF9966]/40" />
      </div>
    </>
  );
}
