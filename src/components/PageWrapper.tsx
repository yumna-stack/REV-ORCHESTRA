"use client";

import { useEffect, useRef, useState } from "react";

export function Section({ children, className = "", id, delay = 0 }: { children: React.ReactNode; className?: string; id?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(35px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)]">
      <span className="w-2 h-2 rounded-full bg-accent-orange" />
      <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">{text}</span>
    </div>
  );
}

export function PageHero({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <section className="relative w-full pt-[140px] pb-20 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center flex flex-col items-center gap-6">
        <Badge text={badge} />
        <h1 className="text-[clamp(32px,5vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white">
          {title}
        </h1>
        <p className="text-lg text-[rgba(255,255,255,0.5)] leading-[160%] max-w-[600px]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export function CTAButton({ text, href = "#contact", variant = "primary" }: { text: string; href?: string; variant?: "primary" | "secondary" }) {
  return variant === "primary" ? (
    <a href={href} className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
      {text}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  ) : (
    <a href={href} className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-medium uppercase tracking-wider rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] transition-all">
      {text}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  );
}
