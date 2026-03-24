"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, fadeLeft, fadeRight, popIn } from "@/components/motion";

const tools = [
  { name: "CRM", emoji: "\ud83d\udcca", color: "#E85600" },
  { name: "Email", emoji: "\ud83d\udce7", color: "#9897FF" },
  { name: "LinkedIn", emoji: "\ud83d\udcbc", color: "#0A66C2" },
  { name: "Slack", emoji: "\ud83d\udcac", color: "#4A154B" },
  { name: "Signals", emoji: "\ud83d\udce1", color: "#B7E932" },
  { name: "Content", emoji: "\ud83d\udcdd", color: "#E85600" },
];

const outputs = [
  "Pipeline +47%",
  "Response 3x faster",
  "Handoffs automated",
  "Signals connected",
];

export default function GTMFlowVisual() {
  const [activeSignal, setActiveSignal] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal((p) => (p + 1) % tools.length);
      setPulsePhase((p) => (p + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Reveal variants={fadeUp}>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden font-[Inter,system-ui,sans-serif]">
        {/* Left - Tools */}
        <div className="absolute left-0 top-0 w-[35%] h-full flex flex-col justify-center gap-2 p-5">
          <Reveal variants={fadeLeft}>
            <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-1">
              Your Tools
            </div>
          </Reveal>
          <StaggerContainer className="flex flex-col gap-2" staggerDelay={0.08}>
            {tools.map((tool, i) => (
              <StaggerItem key={i} variants={fadeLeft}>
                <motion.div
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-600"
                  style={{
                    background: i === activeSignal ? "rgba(232,86,0,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === activeSignal ? "rgba(232,86,0,0.3)" : "rgba(255,255,255,0.06)"}`,
                    transform: i === activeSignal ? "translateX(4px)" : "translateX(0)",
                  }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm">{tool.emoji}</span>
                  <span
                    className="text-[11px] font-medium transition-colors duration-400"
                    style={{ color: i === activeSignal ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)" }}
                  >
                    {tool.name}
                  </span>
                  {i === activeSignal && (
                    <motion.div
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-orange"
                      style={{ animation: "pulse-glow 1.5s infinite" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Center - AI Engine */}
        <Reveal variants={popIn}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
            <div className="absolute w-[100px] h-[100px] rounded-full border border-dashed border-[rgba(232,86,0,0.2)]" style={{ animation: "orbit 12s linear infinite" }}>
              <div className="absolute -top-[3px] left-1/2 w-1.5 h-1.5 rounded-full bg-accent-orange -translate-x-1/2" />
            </div>
            <div className="absolute w-[130px] h-[130px] rounded-full border border-dashed border-[rgba(152,151,255,0.15)]" style={{ animation: "orbit 20s linear infinite reverse" }}>
              <div className="absolute -top-[3px] left-1/2 w-1 h-1 rounded-full bg-accent-purple -translate-x-1/2" />
            </div>
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center z-10"
              style={{
                background: "linear-gradient(135deg, #E85600, #9897FF)",
                boxShadow: "0 0 30px rgba(232,86,0,0.3)",
                animation: "pulse-glow 3s infinite",
              }}
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[10px] font-bold text-white text-center leading-tight">
                AI<br />Engine
              </span>
            </motion.div>
            <span className="text-[9px] font-semibold text-[rgba(255,255,255,0.5)] uppercase tracking-[0.08em] z-10">
              Orchestrating
            </span>
          </div>
        </Reveal>

        {/* Flow lines */}
        <svg className="absolute w-full h-full pointer-events-none">
          <line x1="35%" y1="30%" x2="47%" y2="48%" stroke="#E85600" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="35%" y1="50%" x2="47%" y2="50%" stroke="#E85600" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="35%" y1="70%" x2="47%" y2="52%" stroke="#E85600" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2.5s" repeatCount="indefinite" />
          </line>
          <line x1="53%" y1="48%" x2="65%" y2="30%" stroke="#9897FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="53%" y1="50%" x2="65%" y2="50%" stroke="#9897FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="53%" y1="52%" x2="65%" y2="70%" stroke="#9897FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.5s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Right - Results */}
        <div className="absolute right-0 top-0 w-[32%] h-full flex flex-col justify-center gap-2 p-5">
          <Reveal variants={fadeRight}>
            <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-1">
              Results
            </div>
          </Reveal>
          <StaggerContainer className="flex flex-col gap-2" staggerDelay={0.1}>
            {outputs.map((out, i) => (
              <StaggerItem key={i} variants={fadeRight}>
                <motion.div
                  className="px-3 py-2 rounded-lg transition-all duration-600"
                  style={{
                    background: i === pulsePhase ? "rgba(152,151,255,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === pulsePhase ? "rgba(152,151,255,0.25)" : "rgba(255,255,255,0.06)"}`,
                  }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span
                    className="text-xs font-semibold transition-colors duration-400"
                    style={{ color: i === pulsePhase ? "#9897FF" : "rgba(255,255,255,0.5)" }}
                  >
                    {out}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </Reveal>
  );
}
