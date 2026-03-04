import { useEffect, useRef } from 'react';
import { Award, Star } from 'lucide-react';

const certs = [
  {
    icon: '☁',
    title: 'AWS Certified',
    subtitle: 'Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    color: 'cyan',
  },
  {
    icon: '⚡',
    title: 'AWS Certified',
    subtitle: 'Cloud Practitioner',
    issuer: 'Amazon Web Services',
    color: 'cyan',
  },
  {
    icon: '★',
    title: 'Level 1 Seller',
    subtitle: '5-Star Rating · 20+ Orders',
    issuer: 'Fiverr',
    color: 'lime',
  },
];

export default function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('revealed'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal px-6 md:px-12 py-24 border-t border-border">
      <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">Recognition</p>
      <h2 className="font-display text-4xl md:text-6xl text-foreground mb-16">CERTIFICATIONS</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certs.map((cert, i) => (
          <div
            key={i}
            className={`relative border p-8 overflow-hidden group ${cert.color === 'cyan' ? 'border-border hover:border-cyan/50 animate-glow-pulse' : 'border-border hover:border-lime/50'} transition-all duration-500`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                cert.color === 'cyan' ? 'bg-cyan/[0.03]' : 'bg-lime/[0.03]'
              }`}
            />
            <div className="relative z-10">
              <span className={`text-4xl mb-4 block ${cert.color === 'cyan' ? 'text-cyan' : 'text-lime'}`}>
                {cert.icon}
              </span>
              <h3 className="font-display text-2xl text-foreground mb-1">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cert.subtitle}</p>
              <p className={`text-xs tracking-widest uppercase ${cert.color === 'cyan' ? 'text-cyan/60' : 'text-lime/60'}`}>
                {cert.issuer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
