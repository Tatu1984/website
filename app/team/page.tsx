import { TEAM } from '@/lib/constants';
import { Linkedin, Mail } from 'lucide-react';

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 gradient-text fade-in-up">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
            The experts driving innovation and excellence at Infinititech Partners
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="text-center p-8 bg-muted/20 rounded-3xl border-2 transition-all hover:shadow-2xl card-hover"
                style={{
                  borderColor: `${member.color}30`,
                }}
              >
                {/* Avatar */}
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-extrabold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${member.color}, hsl(var(--secondary)))`,
                    boxShadow: `0 10px 40px ${member.color}40`,
                  }}
                >
                  {member.initial}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>

                {/* Role */}
                <p className="font-semibold mb-4" style={{ color: member.color }}>
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 justify-center">
                  <button
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className="text-foreground hover:text-primary transition-colors" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail size={18} className="text-foreground hover:text-primary transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            We're always looking for talented individuals who share our passion for innovation
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
