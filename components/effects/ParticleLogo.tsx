'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  returnSpeed: number;
}

export default function ParticleLogo() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Generate particles in the shape of infinity symbol
  useEffect(() => {
    const newParticles: Particle[] = [];
    const centerX = 0;
    const centerY = 0;
    const scale = 80;

    // Create infinity symbol using parametric equations
    for (let t = 0; t < Math.PI * 2; t += 0.03) {
      const x = centerX + scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
      const y = centerY + scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
      
      // Create multiple particles at each point for thickness
      for (let i = 0; i < 4; i++) {
        newParticles.push({
          id: newParticles.length,
          homeX: x + (Math.random() - 0.5) * 8,
          homeY: y + (Math.random() - 0.5) * 8,
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: 0,
          vy: 0,
          size: Math.random() * 3 + 2,
          returnSpeed: 0.06 + Math.random() * 0.04
        });
      }
    }

    setParticles(newParticles);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150;

          let newX = particle.x;
          let newY = particle.y;
          let newVx = particle.vx;
          let newVy = particle.vy;

          if (distance < forceRadius && distance > 0) {
            // Explode away from mouse with stronger force
            const force = (forceRadius - distance) / forceRadius;
            const angle = Math.atan2(dy, dx);
            newVx -= Math.cos(angle) * force * 8;
            newVy -= Math.sin(angle) * force * 8;
          }

          // Return to home position
          const homeDx = particle.homeX - particle.x;
          const homeDy = particle.homeY - particle.y;
          newVx += homeDx * particle.returnSpeed;
          newVy += homeDy * particle.returnSpeed;

          // Apply friction
          newVx *= 0.85;
          newVy *= 0.85;

          // Update position
          newX += newVx;
          newY += newVy;

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setMousePosition({
        x: e.clientX - rect.left - centerX,
        y: e.clientY - rect.top - centerY
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 999999, y: 999999 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      style={{ minHeight: '300px' }}
    >
      {/* Particle-based logo */}
      <div className="relative" style={{ width: '250px', height: '250px' }}>
        {particles.map(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const glow = Math.max(0, 1 - distance / 150);

          return (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, #FF9966, #FF6B35)`,
                boxShadow: `0 0 ${8 + glow * 20}px #FF9966, 0 0 ${4 + glow * 10}px #FF6B35`,
                transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
                opacity: 0.9 + glow * 0.1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}