"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "STARTER",
    price: "$25",
    period: "/MONTH",
    description: "Powerful & Simple Solution",
    featured: false,
    accentColor: "rgba(183,233,50,0.8)",
    borderColor: "rgba(255,255,255,0.03)",
    iconBg: "rgba(183,233,50,0.15)",
    points: [
      { text: "API suite", included: true },
      { text: "1M requests/month", included: true },
      { text: "24/7 support", included: false },
      { text: "Crypto Buying & Selling", included: false },
      { text: "P2P Payments", included: true },
      { text: "Full Dashboard Access", included: false },
    ],
  },
  {
    name: "PRO",
    price: "$30",
    period: "/MONTH",
    description: "Powerful & Simple Solution",
    featured: true,
    accentColor: "rgba(232,86,0,1)",
    borderColor: "rgba(232,85,0,0.22)",
    iconBg: "rgba(232,86,0,0.2)",
    points: [
      { text: "API suite", included: true },
      { text: "1M requests/month", included: true },
      { text: "24/7 support", included: true },
      { text: "Crypto Buying & Selling", included: false },
      { text: "P2P Payments", included: true },
      { text: "Full Dashboard Access", included: false },
    ],
  },
  {
    name: "ENTERPRISE",
    price: "$50",
    period: "/MONTH",
    description: "Powerful & Simple Solution",
    featured: false,
    accentColor: "rgba(152,151,255,0.8)",
    borderColor: "rgba(152,150,255,0.24)",
    iconBg: "rgba(152,151,255,0.15)",
    points: [
      { text: "API suite", included: true },
      { text: "1M requests/month", included: true },
      { text: "24/7 support", included: true },
      { text: "Crypto Buying & Selling", included: true },
      { text: "P2P Payments", included: true },
      { text: "Full Dashboard Access", included: true },
    ],
  },
];

export default function Pricing() {
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
    <section id="pricing" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Pricing</span>
          </div>
          <h2 className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white">
            Simplest Membership
          </h2>
        </div>

        {/* Pricing Cards - Cryps double-border style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${200 + i * 150}ms`,
              }}
            >
              {/* Outer border container */}
              <div
                className="rounded-[44px] p-[8px]"
                style={{ border: `0.93px solid rgba(255,255,255,0.03)` }}
              >
                {/* Inner card */}
                <div
                  className="relative rounded-[36px] p-6 overflow-hidden"
                  style={{ border: `1px solid ${plan.borderColor}`, background: "rgb(14,15,17)" }}
                >
                  {/* Glow effects for featured (Pro) card */}
                  {plan.featured && (
                    <>
                      <div className="absolute top-0 left-0 w-[120px] h-[130px] pointer-events-none" style={{
                        background: "radial-gradient(ellipse at top left, rgba(232,86,0,0.15) 0%, transparent 70%)",
                      }} />
                      <div className="absolute bottom-0 right-0 w-[130px] h-[150px] pointer-events-none" style={{
                        background: "radial-gradient(ellipse at bottom right, rgba(232,86,0,0.12) 0%, transparent 70%)",
                      }} />
                    </>
                  )}

                  {/* Purple glow for Enterprise */}
                  {i === 2 && (
                    <div className="absolute top-0 right-0 w-[120px] h-[130px] pointer-events-none" style={{
                      background: "radial-gradient(ellipse at top right, rgba(152,151,255,0.1) 0%, transparent 70%)",
                    }} />
                  )}

                  {/* Plan name with colored dot */}
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="w-3 h-3 rounded-full" style={{ background: plan.accentColor }} />
                    <span className="text-sm font-medium text-white uppercase tracking-wider">{plan.name}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3 relative z-10">
                    <span className="text-[clamp(36px,4vw,48px)] font-medium text-white tracking-[-1px]">{plan.price}</span>
                    <span className="text-sm text-[rgba(255,255,255,0.35)] uppercase">{plan.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[rgba(255,255,255,0.5)] mb-6 relative z-10">{plan.description}</p>

                  {/* CTA Button */}
                  <a
                    href="#contact"
                    className={`w-full py-3.5 rounded-full text-sm font-medium text-center transition-all mb-8 flex items-center justify-center gap-2 relative z-10 uppercase tracking-wider ${
                      plan.featured
                        ? "bg-accent-orange text-white hover:brightness-110"
                        : "bg-transparent text-white border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)]"
                    }`}
                  >
                    GET STARTED
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>

                  {/* Feature points */}
                  <div className="flex flex-col gap-4 relative z-10">
                    {plan.points.map((point, j) => (
                      <div key={j} className="flex items-center gap-3">
                        {point.included ? (
                          <div className="w-5 h-5 rounded-full bg-accent-orange/15 flex items-center justify-center shrink-0">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" /></svg>
                          </div>
                        )}
                        <span className={`text-sm ${point.included ? "text-white" : "text-[rgba(255,255,255,0.3)]"}`}>
                          {point.text}
                        </span>
                      </div>
                    ))}
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
