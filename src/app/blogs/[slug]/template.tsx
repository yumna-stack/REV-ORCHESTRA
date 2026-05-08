"use client";

import { motion } from "framer-motion";

/**
 * SPA fallback fade-in for browsers that don't support cross-document
 * View Transitions (Firefox/Safari). Chrome/Edge 126+ uses the native
 * `@view-transition { navigation: auto }` rule from globals.css and
 * cross-fades the entire page automatically — no JS needed there.
 */
export default function BlogPostTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
