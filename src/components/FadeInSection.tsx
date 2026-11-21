import {useEffect, useRef, useState, type ReactNode} from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function FadeInSection({
  children,
  className = '',
  delayMs = 0,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      {threshold: 0.1, rootMargin: '0px 0px -32px 0px'}
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? {transitionDelay: `${delayMs}ms`} : undefined}
      className={`fade-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
