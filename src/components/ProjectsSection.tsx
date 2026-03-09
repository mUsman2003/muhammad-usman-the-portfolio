import { useEffect, useRef, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'FORTIS Platform',
    category: 'Featured — Final Year Project',
    description: 'Architecting an AI-powered SOAR platform with containerized microservices using Docker and Kubernetes, a React dashboard, and a Python orchestration engine for unified SIEM, threat intelligence, and automated incident response. Integrated LLM agents for adaptive playbook generation, real-time IOC correlation, and automated response workflows with CI/CD pipelines.',
    tags: ['React.js', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Wazuh', 'Suricata', 'Cortex', 'TheHive', 'OpenCTI', 'LLMs'],
    featured: true,
  },
  {
    id: '02',
    title: 'Waste Object Detection & Segmentation',
    category: 'AI / Machine Learning',
    description: 'Developed a dual-model waste detection system using YOLOv8 for real-time object detection and U-Net for pixel-level segmentation on a 12,000-image dataset across four waste categories. Improved model performance using a custom Albumentations augmentation pipeline, boosting mAP@50 by 26.7% (0.602 → 0.763) and Precision by 58.6% (0.512 → 0.812).',
    tags: ['Python', 'YOLOv8', 'U-Net', 'Albumentations', 'OpenCV'],
  },
  {
    id: '03',
    title: 'Urdu Poetry Generation',
    category: 'AI / Machine Learning',
    description: 'Implemented and benchmarked RNN, LSTM, and Transformer architectures from scratch on a 10,504-word Urdu corpus. Best results achieved with LSTM + RMSprop (7.45% accuracy) and RNN + SGD (LP: 6.58). Conducted 9 optimizer experiments and deployed real-time poetry generation through a Streamlit web app.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Streamlit'],
  },
  {
    id: '04',
    title: 'TORCS Autonomous Racing',
    category: 'AI / Machine Learning',
    description: 'Built an autonomous racing controller using a Multi-Task Neural Network trained via supervised learning on human gameplay data. Predicted steering, acceleration, and gear shifts in real time. Engineered feature pipelines from live telemetry including track sensors, speed/RPM, steering angle, and opponent positions.',
    tags: ['Python', 'TensorFlow', 'PyTorch'],
  },
  {
    id: '05',
    title: 'DevSecOps Netflix Pipeline',
    category: 'DevOps / Cloud',
    description: 'Built an end-to-end CI/CD pipeline on AWS with Jenkins multi-stage automation and integrated security scanning using SonarQube, Trivy, and OWASP. Deployed application to Amazon EKS using ArgoCD GitOps workflow and Helm charts. Implemented monitoring using Prometheus and Grafana for Node Exporter and Jenkins metrics.',
    tags: ['Jenkins', 'Docker', 'Kubernetes (EKS)', 'ArgoCD', 'Prometheus', 'Grafana', 'SonarQube', 'Trivy', 'OWASP', 'EC2'],
  },
  {
    id: '06',
    title: 'Music Streaming Platform',
    category: 'Full-Stack',
    description: 'Built a DJ music streaming web application with React frontend, Express.js REST API backend, and PostgreSQL database. Containerized with Docker and deployed on Kubernetes clusters with auto-scaling. Implemented CI/CD pipelines via GitHub Actions with automated testing achieving 95% code coverage.',
    tags: ['React', 'Express.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions', 'JWT'],
  },
  {
    id: '07',
    title: 'Enterprise Microservices Architecture',
    category: 'Full-Stack',
    description: 'Designed an event booking platform using microservices architecture with FastAPI and Express.js services. Implemented asynchronous communication using RabbitMQ message queues. Used polyglot persistence with PostgreSQL and MongoDB. Containerized services with Docker and orchestrated using Kubernetes with custom Ingress controllers.',
    tags: ['FastAPI', 'Express.js', 'React', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'Jira'],
  },
  {
    id: '08',
    title: 'Gym Database System',
    category: 'Full-Stack',
    description: 'Developed a gym management system with SQL database and C#/.NET frontend. Implemented workout and diet plan management, progress tracking, and session scheduling. Designed normalized database schema with optimized queries for efficient data retrieval.',
    tags: ['C#', '.NET', 'SQL', 'Microsoft SQL Server'],
  },
];

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
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
      <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/[0.03] transition-colors duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-display text-6xl text-foreground/[0.06] group-hover:text-cyan/10 transition-colors">
            {project.id}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-cyan/70 border border-cyan/20 px-2 py-0.5 rounded-sm">
            {project.category}
          </span>
        </div>

        <h3 className={`font-display text-foreground group-hover:text-cyan transition-colors duration-300 leading-none mb-4 ${large ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>
          {project.title.toUpperCase()}
        </h3>

        <p className={`text-muted-foreground text-sm leading-relaxed mb-6 ${large ? 'max-w-3xl' : 'max-w-xl'}`}>
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
      <p className="font-display text-[10vw] text-foreground/[0.18] leading-none select-none mb-12">
        SELECTED WORK
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Featured: FORTIS full-width */}
        <ProjectCard project={projects[0]} large />

        {/* AI/ML projects: 2-col grid */}
        {projects.slice(1, 4).map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}

        {/* DevSecOps: full-width feature */}
        <ProjectCard project={projects[4]} large />

        {/* Full-Stack projects: 2-col grid */}
        {projects.slice(5).map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
