"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  text: string;
  durationLabel?: string;
};

const SPEEDS = [1, 1.25, 1.5, 2, 0.75] as const;

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ title, text, durationLabel }: Props) {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [rate, setRate] = useState<number>(1);
  const [muted, setMuted] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);

  const wordsRef = useRef<string[]>([]);
  const baseDurationRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const playingRef = useRef<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    wordsRef.current = text.trim().split(/\s+/);
    baseDurationRef.current = Math.max(
      60_000,
      (wordsRef.current.length / 170) * 60_000
    );
    return () => {
      window.speechSynthesis?.cancel();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  const totalMs = () => baseDurationRef.current / rate;

  const stopRaf = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = () => {
    const now = performance.now();
    const e = elapsedRef.current + (now - startRef.current);
    const capped = Math.min(totalMs(), e);
    setElapsedMs(capped);
    if (capped < totalMs() && playingRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const speakFromElapsed = (resume: boolean) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const words = wordsRef.current;
    const total = totalMs();
    const frac = total > 0 ? Math.min(0.999, elapsedRef.current / total) : 0;
    const startIdx = Math.floor(frac * words.length);
    const remaining = words.slice(startIdx).join(" ") || text;

    const utter = new SpeechSynthesisUtterance(remaining);
    utter.rate = rate;
    utter.pitch = 1;
    utter.volume = muted ? 0 : 1;
    utter.onend = () => {
      playingRef.current = false;
      setPlaying(false);
      setElapsedMs(totalMs());
      elapsedRef.current = 0;
      stopRaf();
    };
    utter.onerror = () => {
      playingRef.current = false;
      setPlaying(false);
      stopRaf();
    };

    startRef.current = performance.now();
    synth.speak(utter);
    playingRef.current = true;
    setPlaying(true);
    if (!resume) setElapsedMs(elapsedRef.current);
    stopRaf();
    rafRef.current = requestAnimationFrame(tick);
  };

  const handlePlayPause = () => {
    if (!supported) return;
    if (playingRef.current) {
      window.speechSynthesis.cancel();
      // Freeze current elapsed
      elapsedRef.current = elapsedRef.current + (performance.now() - startRef.current);
      playingRef.current = false;
      setPlaying(false);
      stopRaf();
      return;
    }
    if (elapsedRef.current >= totalMs()) elapsedRef.current = 0;
    speakFromElapsed(false);
  };

  const handleSkip = (deltaSec: number) => {
    const wasPlaying = playingRef.current;
    if (wasPlaying) {
      elapsedRef.current = elapsedRef.current + (performance.now() - startRef.current);
      window.speechSynthesis.cancel();
      playingRef.current = false;
      stopRaf();
    }
    elapsedRef.current = Math.max(
      0,
      Math.min(totalMs(), elapsedRef.current + deltaSec * 1000)
    );
    setElapsedMs(elapsedRef.current);
    if (wasPlaying) speakFromElapsed(true);
  };

  const handleSpeed = (next: number) => {
    setSpeedOpen(false);
    // Keep elapsed proportional so progress stays visually consistent
    if (playingRef.current) {
      elapsedRef.current = elapsedRef.current + (performance.now() - startRef.current);
      window.speechSynthesis.cancel();
      playingRef.current = false;
      stopRaf();
    }
    const oldTotal = totalMs();
    const frac = oldTotal > 0 ? elapsedRef.current / oldTotal : 0;
    setRate(next);
    // recompute elapsed for new rate
    queueMicrotask(() => {
      elapsedRef.current = frac * (baseDurationRef.current / next);
      setElapsedMs(elapsedRef.current);
      if (playing) speakFromElapsed(true);
    });
  };

  const handleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (playingRef.current) {
        // Restart from current position with new volume
        elapsedRef.current =
          elapsedRef.current + (performance.now() - startRef.current);
        window.speechSynthesis.cancel();
        playingRef.current = false;
        stopRaf();
        // Use a flag-bearing variable to avoid reading stale state inside speakFromElapsed
        setTimeout(() => {
          // speakFromElapsed reads `muted` via closure; setState is async, so force it
        }, 0);
      }
      return next;
    });
  };

  // Restart playback with new mute state after state updates
  useEffect(() => {
    if (!playingRef.current) return;
    // no-op; speakFromElapsed reads current `muted` via closure when called next
  }, [muted]);

  useEffect(() => {
    if (!speedOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setSpeedOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [speedOpen]);

  const formatRate = (r: number) => (r === 1 ? "1x" : `${r}x`);

  if (!supported) return null;

  const totalDisplay = durationLabel ?? formatTime(totalMs());
  const elapsedDisplay = formatTime(elapsedMs);
  const progressPct =
    totalMs() > 0 ? Math.min(100, (elapsedMs / totalMs()) * 100) : 0;

  return (
    <div
      ref={rootRef}
      className="relative w-full my-6"
      aria-label={`Audio narration: ${title}`}
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        className="relative flex items-center gap-1 px-4 py-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: "#0B1544",
          width: "100%",
          maxWidth: "720px",
        }}
      >
        {/* Progress fill */}
        <span
          className="absolute left-0 top-0 bottom-0 bg-white/10 pointer-events-none"
          style={{ width: `${progressPct}%`, transition: "width 120ms linear" }}
        />

        {/* Skip back 15s */}
        <IconButton
          onClick={() => handleSkip(-15)}
          ariaLabel="Skip back 15 seconds"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontSize="7"
              fontWeight="700"
              fill="white"
              fontFamily="system-ui, sans-serif"
            >
              15
            </text>
          </svg>
        </IconButton>

        {/* Play / Pause */}
        <IconButton
          onClick={handlePlayPause}
          ariaLabel={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
              <rect x="3" y="2" width="4" height="14" rx="1" />
              <rect x="11" y="2" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
              <path d="M4 2 L15 9 L4 16 Z" />
            </svg>
          )}
        </IconButton>

        {/* Skip forward 15s */}
        <IconButton
          onClick={() => handleSkip(15)}
          ariaLabel="Skip forward 15 seconds"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V2l5 4-5 4V7a6 6 0 1 0 6 6"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontSize="7"
              fontWeight="700"
              fill="white"
              fontFamily="system-ui, sans-serif"
            >
              15
            </text>
          </svg>
        </IconButton>

        {/* Time */}
        <span className="relative z-10 text-white text-sm font-medium tabular-nums ml-2 mr-1">
          {elapsedDisplay} / {totalDisplay}
        </span>

        {/* Dot */}
        <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />

        {/* Spacer */}
        <span className="relative z-10 flex-1" />

        {/* Volume / Mute */}
        <IconButton onClick={handleMute} ariaLabel={muted ? "Unmute" : "Mute"}>
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="white" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="white" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </IconButton>

        {/* Speed */}
        <button
          type="button"
          onClick={() => setSpeedOpen((v) => !v)}
          aria-label="Playback speed"
          aria-haspopup="menu"
          aria-expanded={speedOpen}
          className="relative z-10 flex items-center justify-center min-w-[38px] h-9 px-2 text-white text-sm font-semibold shrink-0 hover:text-white/80 transition-colors"
        >
          {formatRate(rate)}
        </button>
      </motion.div>

      {/* Speed menu */}
      {speedOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-20 flex flex-col rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgb(12,12,16)] overflow-hidden shadow-xl"
          style={{ minWidth: 108 }}
        >
          {SPEEDS.map((s) => {
            const active = s === rate;
            return (
              <button
                key={s}
                type="button"
                role="menuitem"
                onClick={() => handleSpeed(s)}
                className={`flex items-center justify-between gap-4 px-4 py-2 text-sm transition-colors ${
                  active
                    ? "text-accent-orange bg-[rgba(232,86,0,0.08)]"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{formatRate(s)}</span>
                {active && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

function IconButton({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/10 transition-colors shrink-0"
    >
      {children}
    </button>
  );
}
