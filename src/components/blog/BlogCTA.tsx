"use client";

import { motion } from "framer-motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Real brand SVG paths (Simple Icons) ── */
const TECH_TOOLS = [
  {
    name: "HubSpot",
    path: (
      <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.84h-.067a2.2 2.2 0 0 0-2.193 2.2v.067a2.196 2.196 0 0 0 1.252 1.973l.013.005V7.93a6.225 6.225 0 0 0-2.969 1.31L5.482 3.151A2.487 2.487 0 1 0 1.96 4.587a2.49 2.49 0 0 0 1.04 1.46l-.011-.007 7.683 5.98a6.262 6.262 0 0 0-1.054 3.493 6.241 6.241 0 0 0 .92 3.265L8.198 21.092a2.034 2.034 0 0 0-.595-.092A2.027 2.027 0 1 0 9.6 23.018l-.001-.018v-.024a2.025 2.025 0 0 0-.179-.756l.005.012 2.314-2.317a6.213 6.213 0 0 0 4.05 1.5h.001a6.21 6.21 0 1 0 0-12.422l-.003-.001v-.001a6.22 6.22 0 0 0-1.733.249l.041-.011zm-1.054 9.32a3.187 3.187 0 1 1 0-6.376l.011.001a3.186 3.186 0 0 1-.001 6.373h-.012z" />
    ),
  },
  {
    name: "Slack",
    path: (
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    ),
  },
  {
    name: "n8n",
    path: (
      <g>
        <circle cx="5" cy="12" r="2.6" />
        <circle cx="12" cy="12" r="2.6" />
        <circle cx="19" cy="12" r="2.6" />
        <path
          d="M7.6 12 L9.4 12 M14.6 12 L16.4 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    name: "GitHub",
    path: (
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
];

/* ── Logos that orbit around the rings, staying upright ── */
function OrbitingLogos({
  size,
  radius,
  duration = 32,
}: {
  size: number;
  radius: number;
  duration?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: size / 2,
        top: size / 2,
        width: 0,
        height: 0,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {TECH_TOOLS.map((tool, i) => {
        const angle = (i * 360) / TECH_TOOLS.length - 90;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={tool.name}
            className="absolute pointer-events-auto"
            style={{ left: x, top: y, width: 0, height: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: 0.4 + i * 0.1,
                duration: 0.7,
                ease: EASE,
              }}
              whileHover={{ scale: 1.18 }}
              className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#161619] border border-[#2a2a30] flex items-center justify-center text-white/65 hover:text-[#E8650A] hover:border-[#E8650A] transition-colors duration-300"
              aria-label={tool.name}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                {tool.path}
              </svg>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function BlogCTA({
  tag = "GTM Systems",
  title = "Want us to make you a",
  titleAccent = "Custom Built GTM System?",
  body = "We audit your stack, map your signals, and hand over a working control layer in 90 days. No retainer lock in. You own it.",
}: {
  tag?: string;
  title?: string;
  titleAccent?: string;
  body?: string;
}) {
  const ORBIT_SIZE = 320;
  const ORBIT_RADIUS = 110;

  return (
    <div className="flex flex-col gap-5 items-start mt-10">
      <span
        className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider"
        style={{
          backgroundColor: "rgba(232,86,0,0.1)",
          border: "1px solid rgba(232,86,0,0.25)",
          color: "#E85600",
        }}
      >
        {tag}
      </span>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="relative w-full overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: "rgb(0, 0, 0)",
          borderColor: "rgba(232, 86, 0, 0.25)",
        }}
      >
        {/* Right-side orbit + orbiting tech logos + orbiting glow ball */}
        <div
          className="absolute right-[-50px] top-[-50px] hidden md:block pointer-events-none"
          style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }}
        >
          {/* Static concentric rings (visual base) */}
          <div className="absolute inset-0 rounded-full border border-[rgba(232,86,0,0.14)]" />
          <div className="absolute inset-10 rounded-full border border-[rgba(232,86,0,0.1)]" />
          <div className="absolute inset-20 rounded-full border border-[rgba(255,255,255,0.05)]" />

          {/* Logos that orbit around the outer ring */}
          <OrbitingLogos size={ORBIT_SIZE} radius={ORBIT_RADIUS} />
        </div>

        {/* Soft ambient orange glow bottom-right */}
        <div
          className="absolute -right-24 -bottom-24 w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(232,86,0,0.12), transparent 60%)",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="relative z-10 p-8 md:p-12 flex flex-col gap-6 max-w-[560px]"
        >
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="text-white font-semibold leading-[115%] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            {title}{" "}
            <span className="text-accent-orange">{titleAccent}</span>
          </motion.h3>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="text-sm text-[rgba(255,255,255,0.55)] leading-[170%] max-w-[440px]"
          >
            {body}
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium uppercase tracking-wider rounded-full transition-[filter] duration-200 hover:brightness-110"
              style={{ backgroundColor: "#E85600" }}
            >
              Apply Now
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
            <motion.a
              href="/how-it-works"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium uppercase tracking-wider rounded-full transition-colors"
              style={{
                backgroundColor: "rgb(14,14,16)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              How It Works
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
