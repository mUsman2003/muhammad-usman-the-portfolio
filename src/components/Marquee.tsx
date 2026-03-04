const techStack = [
  'Python', 'React', 'Docker', 'Kubernetes', 'TensorFlow', 'AWS', 'PyTorch', 'FastAPI',
  'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Nginx', 'Linux', 'Git', 'CI/CD',
];

export default function Marquee() {
  const doubled = [...techStack, ...techStack];

  return (
    <div className="w-full overflow-hidden border-t border-b border-border py-4">
      <div className="flex animate-marquee-left whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-8 text-sm tracking-widest uppercase text-muted-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan mr-4 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
