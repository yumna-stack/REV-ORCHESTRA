"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const agents = [
  { name: "Signal Agent", icon: "S", color: "#E8650A", status: "Scanning" },
  { name: "Research Agent", icon: "R", color: "#6366F1", status: "Compiling" },
  { name: "Copy Agent", icon: "C", color: "#22C55E", status: "Writing" },
  { name: "Outbound Agent", icon: "O", color: "#3B82F6", status: "Sending" },
  { name: "CRM Agent", icon: "CR", color: "#F59E0B", status: "Syncing" },
  { name: "Monitor Agent", icon: "M", color: "#9897FF", status: "Watching" },
];

const liveEvents = [
  { agent: "Signal", action: "Detected hiring signal", target: "Acme Corp", color: "#E8650A" },
  { agent: "Research", action: "Account brief compiled", target: "TechFlow Inc", color: "#6366F1" },
  { agent: "Copy", action: "Personalised email written", target: "DataSync AI", color: "#22C55E" },
  { agent: "Outbound", action: "LinkedIn sequence started", target: "CloudScale", color: "#3B82F6" },
  { agent: "CRM", action: "Deal moved to Stage 2", target: "Acme Corp", color: "#F59E0B" },
  { agent: "Monitor", action: "Reply rate alert: 12.4%", target: "Q2 Campaign", color: "#9897FF" },
  { agent: "Signal", action: "Funding round detected", target: "NovaPay", color: "#E8650A" },
  { agent: "Copy", action: "Follow-up generated", target: "TechFlow Inc", color: "#22C55E" },
  { agent: "Outbound", action: "Email delivered", target: "DataSync AI", color: "#3B82F6" },
  { agent: "CRM", action: "Contact created in HubSpot", target: "NovaPay", color: "#F59E0B" },
  { agent: "Monitor", action: "Pipeline health: strong", target: "All campaigns", color: "#9897FF" },
  { agent: "Research", action: "Tech stack identified", target: "CloudScale", color: "#6366F1" },
];

const metrics = [
  { label: "Signals Today", value: 47, suffix: "" },
  { label: "Emails Sent", value: 312, suffix: "" },
  { label: "Reply Rate", value: 11.2, suffix: "%" },
  { label: "Meetings", value: 8, suffix: "" },
];

export default function CommandCenter() {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([0]);
  const [time, setTime] = useState("09:41");

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % liveEvents.length;
      setVisibleEvents((ve) => [idx, ...ve].slice(0, 5));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgb(10,11,13)]" style={{ aspectRatio: "16/9" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Rev Orchestra Command Center</span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-green-500">LIVE</span>
        </div>
        <span className="text-[10px] text-[rgba(255,255,255,0.3)] font-mono">{time}</span>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] h-[calc(100%-44px)]">
        {/* LEFT — Agents + Metrics */}
        <div className="border-r border-[rgba(255,255,255,0.06)] p-4 flex flex-col gap-4 overflow-hidden">
          {/* Agent status grid */}
          <div>
            <p className="text-[9px] text-[rgba(255,255,255,0.25)] uppercase tracking-wider mb-2">Active Agents</p>
            <div className="grid grid-cols-3 gap-2">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  className="rounded-lg p-2 border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] flex flex-col items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-bold"
                    style={{ background: `${agent.color}20`, border: `1px solid ${agent.color}30`, color: agent.color }}
                  >
                    {agent.icon}
                  </div>
                  <span className="text-[8px] text-[rgba(255,255,255,0.4)] text-center leading-tight">{agent.name.split(" ")[0]}</span>
                  <motion.div
                    className="w-1 h-1 rounded-full"
                    style={{ background: agent.color }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <p className="text-[9px] text-[rgba(255,255,255,0.25)] uppercase tracking-wider mb-2">Today&apos;s Metrics</p>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="rounded-lg p-2.5 border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <p className="text-[8px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">{m.label}</p>
                  <motion.p
                    className="text-lg font-bold text-white leading-tight mt-0.5"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {m.value}{m.suffix}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mini pipeline bar */}
          <div>
            <p className="text-[9px] text-[rgba(255,255,255,0.25)] uppercase tracking-wider mb-2">Pipeline Flow</p>
            <div className="flex items-center gap-1">
              {["Signal", "Research", "Copy", "Send", "CRM"].map((stage, i) => (
                <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full h-1.5 rounded-full"
                    style={{ background: agents[i]?.color || "#666" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <span className="text-[7px] text-[rgba(255,255,255,0.25)]">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Live event feed */}
        <div className="p-4 flex flex-col overflow-hidden">
          <p className="text-[9px] text-[rgba(255,255,255,0.25)] uppercase tracking-wider mb-3">Live Activity Feed</p>

          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {visibleEvents.map((idx, pos) => {
                const event = liveEvents[idx];
                return (
                  <motion.div
                    key={`${idx}-${pos}-${visibleEvents.length}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]"
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: pos === 0 ? 1 : Math.max(0.15, 0.5 - pos * 0.1), x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease }}
                    layout
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: event.color }}
                      animate={pos === 0 ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: event.color }}>{event.agent}</span>
                        <span className="text-[10px] text-[rgba(255,255,255,0.5)]">{event.action}</span>
                      </div>
                      <span className="text-[9px] text-[rgba(255,255,255,0.25)]">{event.target}</span>
                    </div>
                    <span className="text-[8px] text-[rgba(255,255,255,0.2)] shrink-0">just now</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom bar — connected tools */}
          <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-[rgba(255,255,255,0.2)] uppercase tracking-wider">Connected:</span>
                {["HubSpot", "Clay", "Instantly", "Slack", "n8n"].map((tool) => (
                  <span key={tool} className="text-[8px] text-[rgba(255,255,255,0.35)] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]">{tool}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-[8px] text-green-500">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
