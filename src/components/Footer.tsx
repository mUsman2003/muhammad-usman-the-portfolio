import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-border px-6 md:px-12 py-10 overflow-hidden grain-overlay">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <p className="text-sm text-muted-foreground">
          © 2025 Muhammad Usman
        </p>
        <p className="text-sm text-muted-foreground text-center">
          FAST NUCES · Islamabad, PK
        </p>
        <div className="flex gap-4 md:justify-end">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:usman2003.fb@gmail.com" className="text-muted-foreground hover:text-cyan transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
