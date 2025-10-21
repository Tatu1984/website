import { PORTFOLIO_ITEMS } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-[1400px] mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 gradient-text fade-in-up">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
            Explore our diverse range of successful projects across industries
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden bg-muted/20 border border-primary/20 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 card-hover"
              >
                {/* Project Image/Gradient */}
                <div
                  className="h-64 flex items-center justify-center text-6xl relative overflow-hidden"
                  style={{ background: item.image }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                  <span className="relative z-10 transform group-hover:scale-110 transition-transform">
                    💼
                  </span>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <button className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    View Project
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
            Want to See Your Project Here?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Let's collaborate and create something amazing together
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
}
