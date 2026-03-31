"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
  style,
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => {
    if (decimals > 0) return v.toFixed(decimals);
    if (value >= 1000000) return `${(v / 1000000).toFixed(0)}`;
    if (value >= 1000) return v.toLocaleString("en-US", { maximumFractionDigits: 0 });
    return Math.round(v).toString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
