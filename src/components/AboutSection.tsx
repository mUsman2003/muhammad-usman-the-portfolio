import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="border border-border p-6 hover:border-cyan/50 transition-colors duration-300 group">
      <div className="font-display text-5xl md:text-6xl text-cyan group-hover:glow-cyan-text transition-all">
        {count}{suffix}
      </div>
      <p className="text-sm tracking-widest uppercase text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export default function AboutSection() {
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
    <section id="about" ref={ref} className="section-reveal px-6 md:px-12 py-24 md:py-36">
      <p className="font-display text-[15vw] text-foreground/[0.04] leading-none select-none mb-0 -mb-8">
        ABOUT
      </p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-4">
        <div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            "I build things that{' '}
            <span className="text-cyan">think</span>,{' '}
            <span className="text-lime">scale</span>, and{' '}
            <span className="text-foreground">ship</span>."
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Computer Science student at FAST NUCES Islamabad, passionate about AI systems, cloud infrastructure, and cybersecurity. Currently building <span className="text-cyan font-medium">FORTIS</span> — an AI-driven SecOps platform — as my Final Year Project.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Fiverr Level 1 Seller with 5-star ratings across <span className="text-foreground">20+ international clients</span>. Certified in AWS with hands-on experience shipping production-grade systems.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        <StatCard value={20} suffix="+" label="Projects" />
        <StatCard value={5} suffix="★" label="Fiverr Rating" />
        <StatCard value={2} suffix="" label="AWS Certs" />
        <StatCard value={3} suffix="+" label="Years Exp" />
      </div>
    </section>
  );
}
