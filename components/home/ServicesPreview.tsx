'use client';

import { SERVICES } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServicesPreview() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 gradient-text">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;

            return (
              <div
                key={idx}
                className="bg-background p-8 rounded-3xl border-2 transition-all hover:border-opacity-100 card-hover liquid-float"
                style={{
                  borderColor: `${service.color}30`,
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, hsl(var(--secondary)))`,
                  }}
                >
                  <Icon size={32} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-center">{service.title}</h3>

                {/* Short Description */}
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {service.short}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-primary hover:text-white hover:scale-105"
          >
            View All Services
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
