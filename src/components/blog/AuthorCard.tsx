"use client";

import { motion } from "framer-motion";

export default function AuthorCard({
  name,
  initial,
  bio,
  url,
}: {
  name: string;
  initial: string;
  bio?: string;
  url?: string;
}) {
  return (
    <div className="mt-16 w-full rounded-2xl border border-[rgba(232,86,0,0.35)] bg-[rgb(248,248,250)] p-8 relative overflow-hidden">
      {/* Subtle orange ambient accent (kept for warmth on white) */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(232,86,0,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div
          className="w-16 h-16 shrink-0 flex items-center justify-center text-white text-xl font-bold bg-[#E85600] rounded-xl"
        >
          {initial}
        </div>

        <div className="flex flex-col flex-grow">
          <h4 className="text-lg font-bold text-[rgb(14,15,17)] tracking-[-0.02em]">
            {name}
          </h4>
          <p className="text-sm text-[rgba(14,15,17,0.7)] mt-2 max-w-[500px] leading-[170%]">
            {bio}
          </p>
        </div>

        {url && (
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[rgb(14,15,17)] rounded-full hover:bg-[rgb(36,37,40)] transition-colors"
          >
            Follow
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        )}
      </div>
    </div>
  );
}
