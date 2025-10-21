'use client';

import { ChevronDown, ArrowRight } from 'lucide-react';
import ParticleLogo from '@/components/effects/ParticleLogo';
import { COMPANY_INFO } from '@/lib/constants';
import Link from 'next/link';

export default function HeroSection() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    delay: `${Math.random() * 3}s`,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Animated Stars Background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <div
        className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #FF9966 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl px-8">
        {/* Particle Logo */}
        <div className="mb-12 fade-in-up">
          <ParticleLogo />
        </div>

        {/* Tagline */}
        <div
          className="text-sm md:text-base tracking-[0.2em] text-primary mb-6 font-medium uppercase fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Transform Your Digital Future
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="gradient-text">
            {COMPANY_INFO.tagline.split(', ')[0]},
            <br />
            {COMPANY_INFO.tagline.split(', ')[1]}
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          {COMPANY_INFO.description}
        </p>

        {/* CTA Buttons - FIXED HOVER */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden bg-gradient-to-r from-[#FF9966] to-[#FF6B35] text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,153,102,0.6)]"
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFB088] to-[#FF8547] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link
            href="/services"
            className="group relative overflow-hidden border-2 border-[#FF9966] text-[#FF9966] bg-transparent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:text-white hover:border-[#FF8547]"
          >
            <span className="relative z-10">Explore Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9966] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bounce">
          <ChevronDown size={32} className="text-primary" />
        </div>
      </div>
    </section>
  );
}