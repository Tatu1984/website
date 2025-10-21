import { Target, Eye, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To empower businesses with cutting-edge technology solutions that drive growth, innovation, and digital transformation across industries.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To be the most trusted technology partner globally, known for excellence, innovation, and unwavering commitment to client success.',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description:
        'Integrity, Innovation, Excellence, and Customer-Centricity guide everything we do. We believe in building lasting relationships through trust and results.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 gradient-text fade-in-up">
            About Infinititech Partners
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
            Founded with a vision to bridge the gap between innovative technology and real-world
            business needs, Infinititech Partners has grown into a trusted technology partner for
            businesses across industries.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed fade-in-up" style={{ animationDelay: '0.4s' }}>
            We combine technical expertise with business acumen to deliver solutions that not only
            meet today's challenges but also prepare our clients for tomorrow's opportunities.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-muted/30 p-10 rounded-3xl border-2 border-primary/30 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/20 card-hover"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-muted/30">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '30+', label: 'Happy Clients' },
              { number: '4', label: 'Team Members' },
              { number: '6', label: 'Services Offered' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-background">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center gradient-text">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Technical Excellence',
                description:
                  'Our team comprises skilled professionals with expertise across the latest technologies and industry best practices.',
              },
              {
                title: 'Client-Centric Approach',
                description:
                  'We prioritize understanding your unique needs and delivering solutions that align with your business goals.',
              },
              {
                title: 'End-to-End Solutions',
                description:
                  'From discovery to deployment, we handle every aspect of your project with professionalism and care.',
              },
              {
                title: 'Proven Track Record',
                description:
                  'Our portfolio of successful projects speaks to our ability to deliver results that exceed expectations.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-muted/20 p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
