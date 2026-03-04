const aiRow = [
  'Python', 'TensorFlow', 'PyTorch', 'YOLOv8', 'Hugging Face', 'OpenCV', 'Keras', 'Scikit-Learn',
  'LangChain', 'Streamlit', 'Pandas', 'NumPy', 'NLTK', 'SpaCy', 'FastAPI', 'Jupyter',
];

const devopsRow = [
  'Docker', 'Kubernetes', 'AWS', 'Jenkins', 'ArgoCD', 'Prometheus', 'Grafana', 'Terraform',
  'GitHub Actions', 'SonarQube', 'Wazuh', 'Linux', 'Nginx', 'Redis', 'PostgreSQL', 'MongoDB',
];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3 border-b border-border">
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-6 text-xs tracking-widest uppercase text-muted-foreground font-medium hover:text-cyan transition-colors">
            <span className={`w-1 h-1 rounded-full mr-4 flex-shrink-0 ${reverse ? 'bg-lime' : 'bg-cyan'}`} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsStrip() {
  return (
    <section className="py-16 border-t border-border">
      <div className="px-6 md:px-12 mb-8">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
          <span className="text-cyan mr-4">●</span>AI / ML Stack
          <span className="ml-8 text-lime mr-4">●</span>DevOps / Cloud Stack
        </p>
      </div>
      <MarqueeRow items={aiRow} />
      <MarqueeRow items={devopsRow} reverse />
    </section>
  );
}
