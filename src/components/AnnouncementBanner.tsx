"use client";

import { motion } from "framer-motion";

const items = [
  "4 seats available for Q2 2026",
  "90-day AI GTM system build",
  "You own it permanently",
  "Applications closing soon",
];

const content = items.join("  \u00B7  ") + "  \u2192";

export default function AnnouncementBanner() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ backgroundColor: "rgb(232,101,10)", height: 36 }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap h-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-sm font-medium text-white px-12 inline-block"
          >
            {content}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
