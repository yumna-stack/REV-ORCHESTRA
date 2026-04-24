"use client";

import { motion } from "framer-motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

export default function BlogCTA({
  tag = "GTM Systems",
  title = "Want us to make you a",
  titleAccent = "Custom Built GTM System?",
}: {
  tag?: string;
  title?: string;
  titleAccent?: string;
}) {
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
        className="relative w-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)]"
        style={{
          background:
            "linear-gradient(135deg, rgb(14,14,18) 0%, rgb(18,18,24) 55%, rgba(232,86,0,0.08) 100%)",
        }}
      >
        {/* Decorative orbit */}
        <div className="absolute right-[-40px] top-[-40px] w-[260px] h-[260px] pointer-events-none opacity-80 hidden md:block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 rounded-full border border-[rgba(232,86,0,0.18)]" />
            <div className="absolute inset-6 rounded-full border border-[rgba(152,151,255,0.15)]" />
            <div className="absolute inset-12 rounded-full border border-[rgba(255,255,255,0.06)]" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-orange" />
            <div className="absolute top-[26px] left-[calc(100%-30px)] w-2 h-2 rounded-full bg-[#9897FF]" />
          </motion.div>
        </div>
        <div className="absolute -right-24 -bottom-24 w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,86,0,0.18), transparent 60%)" }}
        />

        <div className="relative z-10 p-8 md:p-12 flex flex-col gap-6 max-w-[560px]">
          <h3 className="text-white font-semibold leading-[115%] tracking-[-0.8px]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
            {title}{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #E85600",
              }}
            >
              {titleAccent}
            </span>
          </h3>
          <p className="text-sm text-[rgba(255,255,255,0.55)] leading-[170%] max-w-[440px]">
            We audit your stack, map your signals, and hand over a working control layer in 30–90 days. No retainer lock-in. You own it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
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
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium uppercase tracking-wider rounded-full transition-all"
              style={{
                backgroundColor: "rgb(14,14,16)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              How It Works
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
