import { useEffect, useRef, createElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Heading/element tag to render. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
}

/**
 * Reveals text word-by-word with a soft blur + lift as it scrolls into view —
 * the kind of motion you see in polished iOS / Apple product pages. Each word
 * animates independently so the line "assembles" itself.
 */
export function AnimatedText({
  text,
  className,
  as = "span",
  stagger = 0.06,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-word]");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 48, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, stagger, delay]);

  return createElement(
    as,
    { ref, className },
    words.map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block whitespace-pre">
        <span
          data-word
          className="inline-block will-change-transform"
          style={{ opacity: 0 }}
        >
          {word}
        </span>
        {i < words.length - 1 ? " " : ""}
      </span>
    )),
  );
}
