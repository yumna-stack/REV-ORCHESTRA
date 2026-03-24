"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/* ── Shared easing ── */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Variants ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
};

/* ── Stagger container ── */
export const stagger = (staggerChildren = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/* ── Reusable wrapper: reveals on scroll ── */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container that reveals children one by one ── */
export function StaggerContainer({
  children,
  staggerDelay = 0.15,
  initialDelay = 0,
  className = "",
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={stagger(staggerDelay, initialDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Individual stagger item ── */
export function StaggerItem({
  children,
  variants = popIn,
  duration = 0.7,
  className = "",
}: {
  children: ReactNode;
  variants?: Variants;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div variants={variants} transition={{ duration, ease }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Continuous float animation ── */
export function Float({
  children,
  duration = 3,
  y = 8,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  duration?: number;
  y?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      animate={{ y: [-y, y, -y] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Continuous pulse animation ── */
export function Pulse({
  children,
  duration = 2,
  scale = 1.05,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ scale: [1, scale, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Re-export motion for direct use */
export { motion };
