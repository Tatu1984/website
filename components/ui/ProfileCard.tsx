'use client';

import { useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  initial: string;
  color: string;
  email?: string;
  linkedin?: string;
}

export default function ProfileCard({ name, role, bio, initial, color, email, linkedin }: ProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group perspective-1000 h-80 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center border-2 transition-all"
          style={{
            borderColor: `${color}40`,
            background: `linear-gradient(135deg, ${color}15, transparent)`,
          }}
        >
          {/* Avatar */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mb-6 text-4xl font-bold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            {initial}
          </div>

          {/* Info */}
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-primary text-sm font-semibold mb-4" style={{ color }}>{role}</p>
          <p className="text-muted-foreground text-center text-sm leading-relaxed">{bio}</p>

          {/* Flip indicator */}
          <div className="mt-auto pt-4">
            <span className="text-xs text-muted-foreground">Click to flip</span>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-3xl p-8 flex flex-col items-center justify-center border-2"
          style={{
            borderColor: `${color}40`,
            background: `linear-gradient(135deg, ${color}25, ${color}10)`,
          }}
        >
          <h3 className="text-xl font-bold mb-6">Get in Touch</h3>

          {/* Contact Info */}
          <div className="space-y-4 w-full">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group/item"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail size={20} className="text-primary" style={{ color }} />
                <span className="text-sm group-hover/item:text-primary transition-colors">Email</span>
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group/item"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin size={20} className="text-primary" style={{ color }} />
                <span className="text-sm group-hover/item:text-primary transition-colors">LinkedIn</span>
              </a>
            )}
          </div>

          {/* Flip back indicator */}
          <div className="mt-auto pt-4">
            <span className="text-xs text-muted-foreground">Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
