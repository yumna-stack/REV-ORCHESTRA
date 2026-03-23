"use client";

import { useEffect, useRef, useState } from "react";

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full py-24 bg-black-light">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div
          className="flex flex-col gap-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(255,255,255,0.5)] tracking-wider uppercase w-fit">
            THE REAL PROBLEM
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white max-w-[800px]">
            Most Founders Don&apos;t Have a Lead Problem. They Have a Stack Problem.
          </h2>
          <p className="text-lg text-[rgba(255,255,255,0.5)] leading-[150%] max-w-[700px]">
            Your outbound tool says one thing. Your CRM says another. Content lives somewhere else entirely. And somehow your team is expected to piece it all together and hit their number.
          </p>
          <p className="text-base text-[rgba(255,255,255,0.4)] leading-[160%] max-w-[700px]">
            A target account clicks a LinkedIn ad, browses your pricing page, and engages with a chatbot — but your SDR enrolls them into a generic cold email sequence that ignores all that high-intent activity. Your tech stack literally forgets the account&apos;s history. We call this Stack Amnesia, and it&apos;s the reason your pipeline feels random.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-fit mt-4"
          >
            BOOK A CALL WITH DANNY
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
