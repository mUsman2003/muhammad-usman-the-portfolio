import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'DevOps & Cloud Engineering',
    description: 'CI/CD pipelines, Dockerized microservices, Kubernetes orchestration, and AWS infrastructure with full observability. From infrastructure-as-code to production monitoring.',
    tools: ['Docker', 'Kubernetes', 'Jenkins', 'ArgoCD', 'AWS', 'Grafana', 'Prometheus', 'Terraform', 'GitHub Actions'],
  },
  {
    number: '02',
    title: 'AI / ML / Deep Learning',
    description: 'Custom machine learning pipelines, NLP systems, computer vision, and LLM integrations built for production. From model training and benchmarking to real-time deployment.',
    tools: ['Python', 'TensorFlow', 'PyTorch', 'YOLOv8', 'Hugging Face', 'Keras', 'LangChain', 'OpenCV'],
  },
  {
    number: '03',
    title: 'Full-Stack Development',
    description: 'End-to-end web applications with React frontends, FastAPI/Express backends, and PostgreSQL databases. Microservices architecture, event-driven systems, and clean UI.',
    tools: ['React', 'TypeScript', 'FastAPI', 'Express.js', 'PostgreSQL', 'MongoDB', 'RabbitMQ', 'Docker'],
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('revealed'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="section-reveal px-6 md:px-12 py-24 md:py-36 border-t border-border">
      <div className="flex items-end justify-between mb-16">
        <p className="font-display text-[10vw] text-foreground/[0.10] leading-none select-none">
          WHAT I DO
        </p>
      </div>

      <div className="space-y-0">
        {services.map((service, i) => (
          <div
            key={i}
            className="border-t border-border group cursor-pointer"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-center justify-between py-8 gap-6">
              <span className="font-display text-2xl text-cyan/50 group-hover:text-cyan transition-colors">{service.number}</span>
              <h3 className="flex-1 font-display text-3xl md:text-5xl text-foreground group-hover:text-cyan transition-colors duration-300">
                {service.title.toUpperCase()}
              </h3>
              <Plus
                size={24}
                className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${expanded === i ? 'rotate-45 text-cyan' : ''}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${expanded === i ? 'max-h-60 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-muted-foreground leading-relaxed mb-6 md:max-w-2xl">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map(tool => (
                  <span key={tool} className="px-3 py-1 text-xs tracking-widest uppercase border border-border text-muted-foreground hover:border-cyan/50 hover:text-cyan transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
