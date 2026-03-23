"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up and set up your personalized account with multi-factor authentication for maximum security.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    number: "02",
    title: "Fund wallet",
    description: "Easily deposit funds using bank transfer, credit card, or cryptocurrency from external wallets.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  },
  {
    number: "03",
    title: "Buy sell & Swap",
    description: "Start trading instantly with low fees, real-time pricing, and a seamless one-click swap experience.",
    icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4",
  },
];

export default function HowItWorks() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="relative w-full py-28 bg-black-light">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        {/* Heading - slides up */}
        <div
          className={`text-center mb-20 scroll-reveal-base reveal-slide-up${visible ? " is-visible" : ""}`}
          style={{ animationDelay: "0ms" }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">How it works</span>
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] font-semibold leading-[110%] tracking-[-2px] text-white mb-4">
            3 Simple Steps
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[600px] mx-auto">
            Start your crypto journey in just three easy steps. Simple, fast, and secure.
          </p>
        </div>

        {/* 3 Step Cards - slide up with spring stagger + orange glow top borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-8 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] overflow-hidden group hover:border-[rgba(232,86,0,0.25)] transition-colors duration-500 scroll-reveal-base reveal-slide-up${visible ? " is-visible" : ""}`}
              style={{ animationDelay: `${250 + i * 200}ms` }}
            >
              {/* Orange glow top border - animated pulse */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #E85600 30%, #E85600 70%, transparent 100%)",
                  animation: visible ? "glowTopBorder 2.5s ease-in-out infinite" : "none",
                  animationDelay: `${i * 300}ms`,
                }}
              />
              {/* Orange glow effect above card */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-[60%] h-16 rounded-full transition-all duration-700"
                style={{
                  background: visible ? "rgba(232,86,0,0.12)" : "rgba(232,86,0,0)",
                  filter: "blur(16px)",
                  transitionDelay: `${400 + i * 200}ms`,
                }}
              />

              {/* Step icon */}
              <div className="w-14 h-14 rounded-2xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center mb-6 group-hover:bg-accent-orange/20 group-hover:scale-110 transition-all duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={step.icon} />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">
                {step.description}
              </p>

              {/* Step number watermark */}
              <span className="absolute top-4 right-6 text-[60px] font-bold text-[rgba(255,255,255,0.03)] leading-none group-hover:text-[rgba(232,86,0,0.06)] transition-colors duration-500">
                {step.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
