"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";

/* ─────────────────────────────────────────────────────────────
 * DashboardPreview — "This is what you get"
 * A visual mockup of the operations dashboard clients receive.
 * Panels:
 *   - Agent roster (roles, status, current task)
 *   - Issue pipeline (backlog → todo → in progress → review → done)
 *   - Channel routing (HubSpot / Slack / LinkedIn / X / Instantly)
 *   - Approvals queue (what needs client sign-off)
 *   - Live activity feed
 * No budget/cost details shown — that's handled behind the scenes.
 * ─────────────────────────────────────────────────────────── */

type AgentStatus = "running" | "active" | "idle" | "paused" | "waiting";

const agents: {
  name: string;
  role: string;
  status: AgentStatus;
  task: string;
}[] = [
  { name: "Orchestrator", role: "Pipeline supervisor",    status: "running", task: "Coordinating active workflow" },
  { name: "Research",     role: "Prospect enrichment",    status: "running", task: "Enriching 17 leads from signal hits" },
  { name: "Messaging",    role: "Outreach drafter",       status: "active",  task: "Drafting Q3 sequence, 6 touches" },
  { name: "Review",       role: "Quality control",        status: "waiting", task: "Awaiting drafts from Messaging" },
  { name: "Finalize",     role: "Channel formatter",      status: "idle",    task: "Ready, no work queued" },
  { name: "Outbound",     role: "Multichannel sender",    status: "running", task: "Batch 2/4 → Instantly · LinkedIn" },
  { name: "Sync",         role: "CRM maintainer",         status: "active",  task: "Reconciling 3 HubSpot duplicates" },
];

/* Channel icons — real brand logos */
type Channel = "hubspot" | "instantly" | "linkedin" | "slack" | "x" | "clay";

const issues = {
  todo: [
    { title: "Enrich 24 founders from signal watch list",  agent: "Research",  age: "12m", channels: ["clay"] as Channel[] },
    { title: "Draft 6 touch sequence, Figma power users", agent: "Messaging", age: "1h",  channels: ["instantly"] as Channel[] },
    { title: "Reconcile 3 duplicate HubSpot records",      agent: "Sync",      age: "3h",  channels: ["hubspot"] as Channel[] },
  ],
  inProgress: [
    { title: "Enrich 17 leads from LinkedIn signals", agent: "Research", age: "live",    channels: ["linkedin", "clay"] as Channel[] },
    { title: "Send Tuesday batch → 41 prospects",     agent: "Outbound", age: "running", channels: ["instantly", "linkedin"] as Channel[] },
  ],
  review: [
    { title: "Propose: expand to mid market segment", agent: "Orchestrator", age: "needs approval", channels: [] as Channel[] },
  ],
};

const approvals = [
  { title: "Hire: Research Specialist agent",       reason: "Orchestrator is requesting expansion for enterprise track",  type: "Hire" },
  { title: "Strategy: expand to mid market segment", reason: "New segment, mid market SaaS, 50 to 200 headcount",            type: "Strategy" },
];

const activity = [
  { actor: "Research",  verb: "enriched", target: "17 leads from LinkedIn signals",    ts: "2m ago" },
  { actor: "Messaging", verb: "drafted",  target: "4 sequence A/B variants",            ts: "9m ago" },
  { actor: "Outbound",  verb: "sent",     target: "batch 118/250 via Instantly",        ts: "14m ago" },
  { actor: "Sync",      verb: "updated",  target: "42 records in HubSpot",              ts: "38m ago" },
  { actor: "Research",  verb: "flagged",  target: "2 leads, missing enrichment data", ts: "1h ago"  },
];

const throughput = [
  { label: "Prospects researched", value: "124", period: "this week" },
  { label: "Sequences sent",       value: "86",  period: "this week" },
  { label: "Replies captured",     value: "19",  period: "this week" },
  { label: "Meetings booked",      value: "7",   period: "this week" },
];

const statusDot = (s: AgentStatus) => {
  switch (s) {
    case "running": return "bg-green-500";
    case "active":  return "bg-emerald-400";
    case "idle":    return "bg-white/25";
    case "paused":  return "bg-amber-500";
    case "waiting": return "bg-sky-400";
  }
};

function ChannelBadge({ c }: { c: Channel }) {
  /* "x" maps to twitter in the BrandLogo domain map */
  const name = c === "x" ? "twitter" : c;
  return (
    <span
      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded flex-shrink-0 bg-[rgb(14,14,16)] border border-[rgba(255,255,255,0.08)] p-[2px]"
      title={c}
    >
      <BrandLogo name={name} size={12} />
    </span>
  );
}

export default function DashboardPreview() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "rgb(14,15,17)" }}>
      {/* Ambient grid + orange glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        mask: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.9) 70%, transparent)",
        WebkitMask: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.9) 70%, transparent)",
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,101,10,0.10) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5">
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
              fontWeight: 500,
              lineHeight: "120%",
              letterSpacing: "-1.2px",
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

        {/* Dashboard chrome */}
        <Reveal variants={fadeUp}>
          <div className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgb(8,8,10)] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgb(14,15,17)]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-4 text-[11px] text-[rgba(255,255,255,0.4)] tracking-wider">ops.yourdomain.com</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[rgba(255,255,255,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Live · all systems nominal</span>
              </div>
            </div>

            {/* Grid body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* ─── LEFT: Agent roster ─── */}
              <div className="lg:col-span-4 p-5 md:p-6 border-r border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">Agent Roster</span>
                  <span className="text-[10px] text-[rgba(255,255,255,0.35)]">{agents.length} deployed</span>
                </div>
                <div className="space-y-2">
                  {agents.map((a, i) => (
                    <motion.div
                      key={a.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgb(8,8,10)] p-3 hover:border-[rgba(255,255,255,0.12)] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(a.status)} ${a.status === "running" ? "animate-pulse" : ""}`} />
                          <span className="text-sm text-white font-medium">{a.name}</span>
                        </div>
                        <span className="text-[10px] text-[rgba(255,255,255,0.4)] capitalize">{a.status}</span>
                      </div>
                      <div className="text-[11px] text-[rgba(255,255,255,0.45)] mt-0.5 ml-[14px]">{a.role}</div>
                      <div className="text-[11px] text-[rgba(255,255,255,0.6)] mt-1.5 ml-[14px] leading-[140%]">{a.task}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ─── MIDDLE: Task board ─── */}
              <div className="lg:col-span-5 p-5 md:p-6 border-r border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">Active Pipeline</span>
                  <span className="text-[10px] text-[rgba(255,255,255,0.35)]">goal → task flow</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { title: "To do",       items: issues.todo,       count: issues.todo.length },
                    { title: "In progress", items: issues.inProgress, count: issues.inProgress.length, live: true },
                    { title: "In review",   items: issues.review,     count: issues.review.length, review: true },
                  ].map((col, ci) => (
                    <div key={col.title} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between px-0.5">
                        <span className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-wider">{col.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${col.review ? "bg-amber-500/15 text-amber-300" : "bg-[rgb(14,14,16)] text-[rgba(255,255,255,0.5)]"}`}>{col.count}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {col.items.map((it, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.1 + i * 0.05, duration: 0.4 }}
                            className="rounded-md border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] p-3"
                          >
                            <p className="text-[12px] text-[rgba(255,255,255,0.85)] leading-[140%] mb-2">{it.title}</p>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] text-[rgba(255,255,255,0.4)] truncate">{it.agent}</span>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                {it.channels.map((c) => <ChannelBadge key={c} c={c} />)}
                                <span className={`text-[10px] ${col.live ? "text-green-400" : col.review ? "text-amber-300" : "text-[rgba(255,255,255,0.4)]"}`}>
                                  {col.live && "● "}{it.age}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── RIGHT: Throughput + Approvals + Activity ─── */}
              <div className="lg:col-span-3 p-5 md:p-6 space-y-6">
                {/* Throughput */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">Throughput</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.35)]">this week</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {throughput.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] p-3"
                      >
                        <div className="text-[22px] font-medium text-white leading-none" style={{ fontFamily: "var(--font-family-heading)" }}>
                          {m.value}
                        </div>
                        <div className="text-[10px] text-[rgba(255,255,255,0.45)] mt-1 leading-[140%]">{m.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Approvals */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">Your Approvals</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300">{approvals.length} pending</span>
                  </div>
                  <div className="space-y-2">
                    {approvals.map((a, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase tracking-wider">{a.type}</span>
                        </div>
                        <p className="text-[12px] text-white/85 leading-[140%]">{a.title}</p>
                        <p className="text-[11px] text-[rgba(255,255,255,0.45)] mt-1 leading-[140%]">{a.reason}</p>
                        <div className="flex gap-2 mt-2.5">
                          <button className="flex-1 text-[10px] font-medium text-white bg-accent-orange rounded px-2 py-1.5 uppercase tracking-wider">Approve</button>
                          <button className="text-[10px] text-[rgba(255,255,255,0.6)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1.5 uppercase tracking-wider">Review</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">Live Activity</span>
                  </div>
                  <div className="space-y-1.5">
                    {activity.map((e, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="text-white/70 font-medium">{e.actor}</span>
                        <span className="text-[rgba(255,255,255,0.4)]">{e.verb}</span>
                        <span className="text-[rgba(255,255,255,0.6)] flex-1 truncate">{e.target}</span>
                        <span className="text-[rgba(255,255,255,0.3)] text-[10px] whitespace-nowrap">{e.ts}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sub-labels under the dashboard */}
        <Reveal variants={fadeUp}>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
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
