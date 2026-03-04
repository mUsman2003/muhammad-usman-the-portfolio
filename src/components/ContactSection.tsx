import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Send } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('revealed'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="section-reveal px-6 md:px-12 py-24 md:py-36 border-t border-border">
      <h2 className="font-display text-[8vw] md:text-[7vw] text-foreground leading-none mb-4">
        LET'S BUILD<br />
        <span className="text-cyan">SOMETHING.</span>
      </h2>

      <div className="mt-12 grid md:grid-cols-2 gap-16">
        <div>
          <a
            href="mailto:usman2003.fb@gmail.com"
            className="group inline-block text-lg md:text-2xl text-foreground relative"
          >
            usman2003.fb@gmail.com
            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan transition-all duration-500 group-hover:w-full" />
          </a>

          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Open to freelance projects, collaborations, and full-time opportunities.
          </p>

          <div className="flex gap-4 mt-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-border text-sm tracking-widest uppercase text-muted-foreground hover:border-cyan hover:text-cyan transition-all duration-300 group"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-border text-sm tracking-widest uppercase text-muted-foreground hover:border-cyan hover:text-cyan transition-all duration-300"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-transparent border border-border px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan transition-colors duration-300"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-transparent border border-border px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan transition-colors duration-300"
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full bg-transparent border border-border px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan transition-colors duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="group relative flex items-center gap-3 px-8 py-4 border border-cyan text-cyan text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-background w-full justify-center"
          >
            <span className="absolute inset-0 bg-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              {sent ? 'Message Sent ✓' : (
                <>Send Message <Send size={14} /></>
              )}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
