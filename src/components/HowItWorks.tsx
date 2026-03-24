"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";

const steps = [
  { number: "01", title: "Create Account", description: "Sign up easily & secure profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { number: "02", title: "Fund wallet", description: "Deposit your cryptos", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { number: "03", title: "Buy, sell & Swap", description: "Enjoy the simplicity of platform", icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-20">
          <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">How it works</span>
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mb-4">3 Simple Steps</h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[600px] mx-auto">Your crypto journey, simplified. Create, fund, and trade in just three effortless steps.</p>
        </Reveal>

        {/* 3 Step Cards - staggered */}
        <StaggerContainer staggerDelay={0.2} initialDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="rounded-[42px] p-[8px]" style={{ border: "0.93px solid rgba(255,255,255,0.03)" }}>
                <div className="relative rounded-[36px] overflow-hidden group" style={{ border: "1px solid rgba(41,42,43,1)", background: "rgb(14,15,17)" }}>
                  {/* Orange glow top border */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, transparent 0%, #E85600 30%, #E85600 70%, transparent 100%)" }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-accent-orange/10 blur-2xl rounded-full" />

                  {/* Icon area */}
                  <div className="h-[180px] relative flex items-center justify-center overflow-hidden">
                    <motion.div
                      className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full opacity-30"
                      style={{ background: "radial-gradient(circle, rgba(232,86,0,0.2) 0%, transparent 70%)" }}
                      animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                      transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center"
                      whileHover={{ scale: 1.15, backgroundColor: "rgba(232,86,0,0.2)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon} /></svg>
                    </motion.div>
                  </div>

                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{step.description}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
