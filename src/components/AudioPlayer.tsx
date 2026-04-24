"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  text: string;
  durationLabel?: string;
};

export default function AudioPlayer({ title, text, durationLabel }: Props) {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const estimatedMsRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const wordCount = text.trim().split(/\s+/).length;
    estimatedMsRef.current = Math.max(60_000, (wordCount / 170) * 60_000);
    return () => {
      window.speechSynthesis?.cancel();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  const tick = () => {
    const now = performance.now();
    const elapsed = elapsedRef.current + (now - startRef.current);
    const pct = Math.min(100, (elapsed / estimatedMsRef.current) * 100);
    setProgress(pct);
    if (pct < 100 && playing) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const handlePlay = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    if (playing) {
      synth.pause();
      elapsedRef.current += performance.now() - startRef.current;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setPlaying(false);
      return;
    }

    if (synth.paused && utteranceRef.current) {
      synth.resume();
      startRef.current = performance.now();
      setPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => {
      setPlaying(false);
      setProgress(100);
      elapsedRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    utter.onerror = () => {
      setPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    utteranceRef.current = utter;
    elapsedRef.current = 0;
    startRef.current = performance.now();
    synth.cancel();
    synth.speak(utter);
    setPlaying(true);
    setProgress(0);
    rafRef.current = requestAnimationFrame(tick);
  };

  if (!supported) return null;

  return (
    <div className="w-full flex justify-start my-6">
      <motion.button
        type="button"
        onClick={handlePlay}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: "#0B1544",
          maxWidth: "560px",
          width: "100%",
        }}
        aria-label={playing ? "Pause narration" : "Play narration"}
      >
        <span
          className="absolute left-0 top-0 bottom-0 bg-white/10 pointer-events-none"
          style={{ width: `${progress}%`, transition: "width 120ms linear" }}
        />
        <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 shrink-0">
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <rect x="1" y="1" width="3" height="12" rx="1" />
              <rect x="8" y="1" width="3" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <path d="M1 1 L11 7 L1 13 Z" />
            </svg>
          )}
        </span>
        <span className="relative z-10 text-white text-sm font-medium truncate flex-1 text-left">
          {title}
        </span>
        <span className="relative z-10 flex items-center gap-2 text-white/80 text-xs shrink-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z" />
          </svg>
          {durationLabel ?? "Listen"}
        </span>
      </motion.button>
    </div>
  );
}
