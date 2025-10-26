'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

export default function GooeyNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <nav className="relative flex items-center gap-2 p-2 rounded-full bg-muted/30 backdrop-blur-md border border-primary/20">
      {/* Gooey blob background */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: 'url(#gooey)' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>

        {/* Active indicator blob */}
        <circle
          cx={`${((hoveredIndex ?? activeIndex) + 0.5) * (100 / navItems.length)}%`}
          cy="50%"
          r="20"
          fill="url(#navGradient)"
          className="transition-all duration-500 ease-out"
        />

        <defs>
          <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9966" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nav items */}
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredIndex === index;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative z-10 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
              isActive || isHovered
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
