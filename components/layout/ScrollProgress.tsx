'use client';

import { useEffect, useState, useRef } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    // Calculate path length
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const documentHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
          const totalScrollable = documentHeight - windowHeight;

          // Calculate smooth progress from 0 to 100
          const progress = Math.min(Math.max((scrollTop / totalScrollable) * 100, 0), 100);
          setScrollProgress(progress);

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[1]"
      style={{
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'visible'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          {/* Orange gradient for the line */}
          <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9966" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#FF8547" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.7" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Doodle-style path with large loops going from left to right across the full width and height */}
        <path
          ref={pathRef}
          d="M 100,400
             C 200,200 300,100 450,300
             C 550,450 650,600 750,550
             C 850,500 800,350 700,400
             C 600,450 650,600 800,700
             C 950,800 1100,850 1250,700
             C 1400,550 1450,400 1350,500
             C 1250,600 1200,750 1350,850
             C 1500,950 1650,900 1800,750"
          fill="none"
          stroke="url(#scrollGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#softGlow)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength - (scrollProgress / 100) * pathLength,
            transition: 'stroke-dashoffset 0.15s linear',
            opacity: scrollProgress > 0 ? 1 : 0,
          }}
        />
      </svg>
    </div>
  );
}