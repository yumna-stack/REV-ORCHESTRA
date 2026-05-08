"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

export default function DashboardPreview() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "rgb(0, 0, 0)" }}>
      {/* Ambient grid + orange glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        mask: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.9) 70%, transparent)",
        WebkitMask: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.9) 70%, transparent)",
      }} />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(232,101,10,0.10) 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 75%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 75%, transparent 100%)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-[0.15em] uppercase">Your Command Center</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 600,
              lineHeight: "120%",
              letterSpacing: "-0.02em",
              color: "white",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            This is what you get,{" "}
            <span className="text-accent-orange">Day 90, handed to you</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-[rgba(255,255,255,0.5)] leading-[160%] max-w-[640px] mx-auto">
            Not a SaaS login. Not a retainer. A live operating system for your AI ops,
            every agent, every task, every approval, every action. You own the keys.
          </p>
        </Reveal>

        {/* Arcade interactive demo — wrapped in a MacBook frame */}
        <Reveal variants={fadeUp}>
          <div className="relative max-w-[1280px] mx-auto">
            {/* MacBook display body */}
            <div
              className="relative rounded-[20px] p-[14px]"
              style={{
                background:
                  "linear-gradient(180deg, rgb(38,38,42) 0%, rgb(22,22,25) 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top camera dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  top: 5,
                  width: 5,
                  height: 5,
                  background: "rgb(58,58,62)",
                  boxShadow: "0 0 1px rgba(255,255,255,0.2) inset",
                }}
              />

              {/* Screen content */}
              <div
                className="rounded-[8px] overflow-hidden"
                style={{ background: "rgb(8,8,10)" }}
              >
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "calc(45.2778% + 41px)",
                    height: 0,
                    width: "100%",
                  }}
                >
                  <iframe
                    src="https://demo.arcade.software/W5nkodVnGp2lNy8vH8u9?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                    title="Assign and Diagnose Tasks for GTM Lead Agent"
                    frameBorder="0"
                    loading="lazy"
                    allow="clipboard-write"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ colorScheme: "light" }}
                  />
                </div>
              </div>
            </div>

            {/* MacBook hinge / base — slightly wider than the lid, with a notch */}
            <div
              className="relative mx-auto"
              style={{ width: "calc(100% + 70px)", marginLeft: -35 }}
            >
              <div
                className="relative h-[14px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgb(40,40,44) 0%, rgb(18,18,21) 60%, rgb(10,10,12) 100%)",
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Notch (recessed lip where you'd open the lid) */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-0"
                  style={{
                    width: 140,
                    height: 6,
                    background: "rgb(6,6,8)",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    boxShadow: "0 1px 1px rgba(0,0,0,0.5) inset",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sub-labels under the dashboard */}
        <Reveal variants={fadeUp}>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Your stack",       desc: "Runs inside HubSpot, Slack, LinkedIn, X, Instantly." },
              { label: "Custom agents",    desc: "Built for your workflow. Not a template." },
              { label: "Human approved",   desc: "Hires and strategy gates you control." },
              { label: "Audit clean",      desc: "Every action logged. Company scoped." },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-3 py-4 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgb(8,8,10)]"
              >
                <p className="text-[13px] font-medium text-white tracking-wide">{f.label}</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.4)] mt-1 leading-[150%]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
