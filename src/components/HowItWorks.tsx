"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { number: "01", title: "Create Account", description: "Sign up easily & secure profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { number: "02", title: "Fund wallet", description: "Deposit your cryptos", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { number: "03", title: "Buy, sell & Swap", description: "Enjoy the simplicity of platform", icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" },
];

export default function HowItWorks() {
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
    <section id="how-it-works" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-20" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">How it works</span>
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mb-4">3 Simple Steps</h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[600px] mx-auto">
            Your crypto journey, simplified. Create, fund, and trade in just three effortless steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
              filter: visible ? "blur(0px)" : "blur(4px)",
              transition: `all 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${0.25 + i * 0.2}s`,
            }}>
              {/* Outer border */}
              <div className="rounded-[42px] p-[8px]" style={{ border: "0.93px solid rgba(255,255,255,0.03)" }}>
                {/* Inner card */}
                <div className="relative rounded-[36px] overflow-hidden group" style={{ border: "1px solid rgba(41,42,43,1)", background: "rgb(14,15,17)" }}>
                  {/* Orange glow top border - pulses */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent 0%, #E85600 30%, #E85600 70%, transparent 100%)",
                    animation: visible ? "glowTopBorder 2s ease-in-out infinite" : "none",
                  }} />
                  {/* Orange glow effect above */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-accent-orange/10 blur-2xl rounded-full" />

                  {/* Visual area */}
                  <div className="h-[180px] relative flex items-center justify-center overflow-hidden">
                    {/* Decorative gradient glow */}
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full opacity-30" style={{
                      background: "radial-gradient(circle, rgba(232,86,0,0.2) 0%, transparent 70%)",
                      animation: visible ? `float${(i % 3) + 1} ${5 + i}s ease-in-out infinite` : "none",
                    }} />
                    {/* Step icon */}
                    <div className="w-16 h-16 rounded-2xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center group-hover:bg-accent-orange/20 group-hover:scale-110 transition-all duration-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon} /></svg>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
