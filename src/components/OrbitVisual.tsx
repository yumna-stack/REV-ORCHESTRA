"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Orbiting tool nodes ── */
const orbitNodes = [
  { label: "Signal", icon: "⚡", angle: 0, ring: 1, color: "#E8650A" },
  { label: "Research", icon: "🔍", angle: 60, ring: 1, color: "#6366F1" },
  { label: "Copy", icon: "✍️", angle: 120, ring: 1, color: "#22C55E" },
  { label: "Outbound", icon: "📤", angle: 180, ring: 1, color: "#3B82F6" },
  { label: "CRM", icon: "💼", angle: 240, ring: 1, color: "#F59E0B" },
  { label: "Monitor", icon: "📊", angle: 300, ring: 1, color: "#9897FF" },
  { label: "HubSpot", icon: "🟠", angle: 30, ring: 2, color: "#FF7A59" },
  { label: "Clay", icon: "🔵", angle: 90, ring: 2, color: "#3B82F6" },
  { label: "Instantly", icon: "⚡", angle: 150, ring: 2, color: "#6366F1" },
  { label: "n8n", icon: "🔴", angle: 210, ring: 2, color: "#EA4B71" },
  { label: "Slack", icon: "💬", angle: 270, ring: 2, color: "#E01E5A" },
  { label: "LinkedIn", icon: "🔗", angle: 330, ring: 2, color: "#0A66C2" },
];

/* ── Single orbiting node ── */
function OrbitNode({
  node,
  ringRadius,
  duration,
  delay,
}: {
  node: (typeof orbitNodes)[number];
  ringRadius: number;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: 0,
        height: 0,
        left: "50%",
        top: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <motion.div
        className="absolute flex flex-col items-center gap-1"
        style={{
          left: -20,
          top: -ringRadius - 20,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm backdrop-blur-sm"
          style={{
            background: `${node.color}18`,
            border: `1px solid ${node.color}35`,
            boxShadow: `0 0 20px ${node.color}15`,
          }}
        >
          {node.icon}
        </div>
        <span className="text-[7px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider font-medium whitespace-nowrap">
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function OrbitVisual() {
  const ring1Nodes = orbitNodes.filter((n) => n.ring === 1);
  const ring2Nodes = orbitNodes.filter((n) => n.ring === 2);

  return (
    <section className="relative w-full py-24 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section heading */}
        <Reveal variants={fadeUp} className="text-center mb-16">
          <p className="text-xs text-accent-orange uppercase tracking-[0.2em] mb-4">
            The System
          </p>
          <h2
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            Six AI agents.{" "}
            <span className="text-accent-orange italic">One orchestrated system.</span>
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.4)] mt-3 max-w-[520px] mx-auto">
            Every agent talks to every other. Signals trigger research, research
            triggers copy, copy triggers outbound, automatically.
          </p>
        </Reveal>

        {/* Orbit container */}
        <div className="relative w-full max-w-[600px] mx-auto" style={{ aspectRatio: "1/1" }}>
          {/* Ambient glow behind center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(circle, rgba(232,101,10,0.25) 0%, rgba(232,101,10,0.08) 35%, transparent 65%)",
            }}
          />

          {/* Orbit ring 1 — dashed */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 320,
              height: 320,
              border: "1px dashed rgba(255,255,255,0.08)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbit ring 2 — dashed, larger */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 480,
              height: 480,
              border: "1px dashed rgba(255,255,255,0.05)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbit ring 3 — outermost, very faint */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 560,
              height: 560,
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          />

          {/* ── Center element — pulsing core ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 100,
                height: 100,
                border: "1px solid rgba(232,101,10,0.3)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Second pulse ring — offset timing */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 100,
                height: 100,
                border: "1px solid rgba(232,101,10,0.2)",
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />

            {/* Core orb — pulses big/small */}
            <motion.div
              className="relative w-[80px] h-[80px] rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, rgba(232,101,10,0.9) 0%, rgba(232,101,10,0.6) 40%, rgba(200,80,10,0.3) 70%, transparent 100%)",
                boxShadow:
                  "0 0 40px rgba(232,101,10,0.4), 0 0 80px rgba(232,101,10,0.15), inset 0 0 20px rgba(255,255,255,0.1)",
              }}
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Inner icon — stacked layers like Cryps */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </motion.div>
          </div>

          {/* ── Ring 1 nodes — inner orbit ── */}
          {ring1Nodes.map((node, i) => (
            <OrbitNode
              key={node.label}
              node={node}
              ringRadius={160}
              duration={45 + i * 2}
              delay={i * 1.5}
            />
          ))}

          {/* ── Ring 2 nodes — outer orbit ── */}
          {ring2Nodes.map((node, i) => (
            <OrbitNode
              key={node.label}
              node={node}
              ringRadius={240}
              duration={60 + i * 2}
              delay={i * 1.2}
            />
          ))}
        </div>

        {/* Bottom tagline */}
        <Reveal variants={fadeUp} className="text-center mt-14">
          <p className="text-sm text-[rgba(255,255,255,0.3)] max-w-[450px] mx-auto italic">
            Every connection is automated. Every handoff is instant.
            Your pipeline runs while you sleep.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
