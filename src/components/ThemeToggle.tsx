import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] group"
    >
      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border border-r-0 rounded-l-lg px-3 py-3 shadow-lg transition-all duration-300 hover:px-4 hover:bg-card group-hover:border-[hsl(var(--cyan))]/50">
        <div className="relative w-5 h-5 overflow-hidden">
          <Sun
            size={20}
            className={`absolute inset-0 text-amber-500 transition-all duration-500 ${
              isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Moon
            size={20}
            className={`absolute inset-0 text-cyan transition-all duration-500 ${
              isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </div>
        <span className="text-xs tracking-widest uppercase text-muted-foreground max-w-0 overflow-hidden group-hover:max-w-[60px] transition-all duration-300 whitespace-nowrap">
          {isDark ? 'Light' : 'Dark'}
        </span>
      </div>
    </button>
  );
}
