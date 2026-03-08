import { useEffect, useRef, useState } from 'react';

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'letters' | 'exit' | 'done'>('letters');
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const name = "MUHAMMAD USMAN";
  const letters = name.split('');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('exit');
      if (topRef.current) topRef.current.style.transform = 'translateY(-100%)';
      if (bottomRef.current) bottomRef.current.style.transform = 'translateY(100%)';
    }, 2200);

    const timer2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      <div
        ref={topRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-background flex items-end justify-center pb-4 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        <div className="flex overflow-hidden">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="font-display text-5xl md:text-8xl tracking-widest text-foreground inline-block"
              style={{
                animation: `letter-in 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s forwards`,
                opacity: 0,
                color: letter === ' ' ? 'transparent' : undefined,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-background flex items-start justify-center pt-4 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        <span
          className="font-display text-lg tracking-[0.5em] text-cyan opacity-0"
          style={{ animation: 'letter-in 0.6s ease 0.8s forwards' }}
        >
          PORTFOLIO
        </span>
      </div>
    </div>
  );
}
