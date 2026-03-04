import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterHoverable = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '50px';
        ringRef.current.style.height = '50px';
        ringRef.current.style.borderColor = 'hsl(183, 100%, 50%)';
        ringRef.current.style.opacity = '0.8';
      }
      if (dotRef.current) {
        dotRef.current.style.backgroundColor = 'hsl(183, 100%, 50%)';
        dotRef.current.style.transform += ' scale(1.5)';
      }
    };

    const onMouseLeaveHoverable = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.borderColor = 'hsl(183, 100%, 50%)';
        ringRef.current.style.opacity = '0.5';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    const updateHoverables = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    };

    updateHoverables();
    const observer = new MutationObserver(updateHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan/50 z-[9996] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity,border-color] duration-300"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
