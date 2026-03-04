import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'FORTIS Platform',
    description: 'AI-powered cybersecurity SOAR platform. LLM agents + Docker/K8s microservices + React dashboard.',
    tags: ['React', 'Python', 'Docker', 'Kubernetes', 'LLMs', 'Wazuh'],
    featured: true,
    href: '#',
  },
  {
    id: '02',
    title: 'Waste Detection System',
    description: 'Dual YOLOv8 + U-Net model with 76.3% mAP on 12,000 images. 58.6% precision boost.',
    tags: ['Python', 'YOLOv8', 'U-Net', 'OpenCV'],
    featured: false,
    href: '#',
  },
  {
    id: '03',
    title: 'DevSecOps Netflix Pipeline',
    description: 'Full CI/CD on AWS EKS with Jenkins, ArgoCD, SonarQube, and Grafana monitoring.',
    tags: ['Jenkins', 'AWS EKS', 'ArgoCD', 'Prometheus'],
    featured: false,
    href: '#',
  },
  {
    id: '04',
    title: 'Urdu Poetry Generator',
    description: 'LSTM/Transformer benchmarking on Urdu corpus. Deployed as real-time Streamlit app.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Streamlit'],
    featured: false,
    href: '#',
  },
];

function ProjectCard({ project, large = false }: { project: typeof projects[0]; large?: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`group relative border border-border p-8 md:p-12 overflow-hidden transition-all duration-300 hover:border-cyan/30 ${large ? 'col-span-full' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Hover bg glow */}
      <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/[0.03] transition-colors duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="font-display text-6xl text-foreground/[0.06] group-hover:text-cyan/10 transition-colors">
            {project.id}
          </span>
          <a
            href={project.href}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-cyan transition-colors group/link"
          >
            View Project
            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <h3 className={`font-display text-foreground group-hover:text-cyan transition-colors duration-300 leading-none mb-4 ${large ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>
          {project.title.toUpperCase()}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs tracking-widest uppercase border border-border text-muted-foreground group-hover:border-cyan/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('revealed'); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="section-reveal px-6 md:px-12 py-24 md:py-36 border-t border-border">
      <p className="font-display text-[10vw] text-foreground/[0.04] leading-none select-none mb-12">
        SELECTED WORK
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard project={projects[0]} large />
        {projects.slice(1).map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
