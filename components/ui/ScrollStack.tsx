'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollStackProps {
  children: ReactNode[];
  stackOffset?: number;
}

export default function ScrollStack({ children, stackOffset = 20 }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress for the container
      const start = windowHeight;
      const end = -containerHeight;
      const totalDistance = start - end;
      const currentPosition = containerTop;
      const progress = Math.min(Math.max((start - currentPosition) / totalDistance, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: `${children.length * 100}vh` }}>
      <div className="sticky top-24">
        {children.map((child, index) => {
          const cardProgress = Math.min(
            Math.max((scrollProgress - index / children.length) * children.length, 0),
            1
          );
          const scale = 1 - (1 - cardProgress) * 0.1;
          const y = (1 - cardProgress) * stackOffset * index;
          const opacity = 0.5 + cardProgress * 0.5;

          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-200"
              style={{
                transform: `translateY(${y}px) scale(${scale})`,
                opacity,
                zIndex: index,
                transformOrigin: 'center top',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
