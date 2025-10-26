'use client';

import { useState } from 'react';
import { Menu, X, Home, User, Briefcase, Users, Mail } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: User, label: 'About', href: '/about' },
  { icon: Briefcase, label: 'Services', href: '/services' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Mail, label: 'Contact', href: '/contact' },
];

export default function BubbleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Menu items */}
      <div className="relative">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const angle = (index / menuItems.length) * Math.PI * 1.5 + Math.PI;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`absolute transition-all duration-500 ease-out ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
              }`}
              style={{
                transform: isOpen
                  ? `translate(${x}px, ${y}px)`
                  : 'translate(0, 0)',
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              }}
              onClick={() => setIsOpen(false)}
            >
              <div className="group relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all">
                  <Icon size={24} className="text-white" />
                </div>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-muted text-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl hover:shadow-primary/50 hover:scale-110 transition-all ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
      >
        {isOpen ? (
          <X size={28} className="text-white" />
        ) : (
          <Menu size={28} className="text-white" />
        )}
      </button>
    </div>
  );
}
