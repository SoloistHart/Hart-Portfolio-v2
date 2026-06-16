import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds for sequencing siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

/**
 * Reveals content as it enters the viewport using GSAP ScrollTrigger, keeping
 * the whole page feeling like one continuous, scroll-driven journey. Respects
 * reduced-motion by rendering content immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
