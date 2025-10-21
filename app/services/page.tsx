import { SERVICES } from '@/lib/constants';
import { CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-[1400px] mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 gradient-text fade-in-up">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
            Comprehensive technology solutions designed to transform your business and drive
            sustainable growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;

              return (
                <div
                  key={idx}
                  className="bg-muted/20 p-10 rounded-3xl border-2 transition-all hover:shadow-2xl card-hover"
                  style={{
                    borderColor: `${service.color}50`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}, hsl(var(--secondary)))`,
                    }}
                  >
                    <Icon size={36} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide mb-3">
                      Key Features
                    </h4>
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" style={{ color: service.color }} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            We specialize in creating tailored solutions for unique business challenges.
            Let's discuss your requirements.
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
