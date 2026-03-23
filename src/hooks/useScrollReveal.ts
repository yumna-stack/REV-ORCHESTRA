"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // default true - only trigger once
}

/**
 * Reusable scroll-triggered reveal hook.
 * Returns a ref to attach to the container and a `visible` boolean.
 * When the element enters the viewport, `visible` flips to true.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}

/**
 * Returns a style object for a scroll-reveal child element.
 * Use with CSS classes `.scroll-reveal-*` for the actual keyframe animations.
 */
export function revealStyle(
  visible: boolean,
  delay: number = 0
): React.CSSProperties {
  return {
    animationDelay: `${delay}ms`,
    animationPlayState: visible ? "running" : "paused",
  };
}
