'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = Math.min(Math.max((currentScroll / totalScroll) * 100, 0), 100);
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
      className="fixed top-0 left-8 pointer-events-none z-[1]"
      style={{ 
        width: '80px',
        height: '100vh'
      }}
    >
      <svg
        width="80"
        height="100%"
        viewBox="0 0 80 1000"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradient for the line */}
          <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9966" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF8547" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Soft glow */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background track - very subtle */}
        <path
          d="M 40,0 Q 55,125 40,250 Q 25,375 40,500 Q 55,625 40,750 Q 25,875 40,1000"
          fill="none"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Main thick wavy progress line */}
        <path
          d="M 40,0 Q 55,125 40,250 Q 25,375 40,500 Q 55,625 40,750 Q 25,875 40,1000"
          fill="none"
          stroke="url(#scrollGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#softGlow)"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: 1000 - (scrollProgress * 10),
            transition: 'stroke-dashoffset 0.15s ease-out',
          }}
        />
      </svg>

      {/* Glowing dot at scroll position */}
      <div
        className="absolute transition-all duration-150 ease-out"
        style={{
          left: `${40 + (scrollProgress % 50 < 25 ? (scrollProgress % 50) * 0.6 : (50 - scrollProgress % 50) * 0.6)}px`,
          top: `${scrollProgress}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer glow */}
        <div 
          className="absolute w-6 h-6 rounded-full -left-3 -top-3"
          style={{
            background: 'radial-gradient(circle, rgba(255, 153, 102, 0.4) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
        
        {/* Core dot */}
        <div 
          className="w-3 h-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #FF9966, #FF6B35)',
            boxShadow: '0 0 12px rgba(255, 153, 102, 0.8), 0 0 24px rgba(255, 107, 53, 0.4)',
          }}
        />
      </div>
    </div>
  );
}