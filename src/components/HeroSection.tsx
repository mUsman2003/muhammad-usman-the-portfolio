import ParticleCanvas from './ParticleCanvas';
import Marquee from './Marquee';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      <ParticleCanvas />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display text-[20vw] text-foreground/[0.02] select-none leading-none">
          MU
        </span>
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-20 pb-4">
        <p className="text-xs tracking-[0.4em] uppercase text-cyan mb-4">
          Available for work · 2026
        </p>

        <h1 className="font-display leading-[0.85] mb-6">
          <span className="block text-[11vw] md:text-[7vw] text-foreground hover:text-cyan transition-colors duration-500">
            AI ENGINEER.
          </span>
          <span className="block text-[11vw] md:text-[7vw] text-foreground/80 hover:text-foreground transition-colors duration-500">
            BUILDER.
          </span>
          <span className="block text-[11vw] md:text-[7vw] text-foreground/60 hover:text-foreground transition-colors duration-500">
            PROBLEM SOLVER.
          </span>
        </h1>

        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">
          CS Student @ FAST NUCES · Islamabad, PK
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection('#projects')}
            className="group relative px-8 py-4 border border-foreground text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-background"
          >
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">View Work ↓</span>
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="group relative px-8 py-4 border border-cyan text-cyan text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-background"
          >
            <span className="absolute inset-0 bg-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Contact Me</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <Marquee />
      </div>
    </section>
  );
}
