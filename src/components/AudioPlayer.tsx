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
  const [started, setStarted] = useState(false);
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
  const pillRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef<boolean>(false);
  const wasPlayingBeforeScrub = useRef<boolean>(false);

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

  const pausePlayback = () => {
    if (!playingRef.current) return;
    elapsedRef.current =
      elapsedRef.current + (performance.now() - startRef.current);
    window.speechSynthesis.cancel();
    playingRef.current = false;
    setPlaying(false);
    stopRaf();
  };

  const handlePlayPause = () => {
    if (!supported) return;
    if (playingRef.current) {
      pausePlayback();
      return;
    }
    if (elapsedRef.current >= totalMs()) elapsedRef.current = 0;
    setStarted(true);
    speakFromElapsed(false);
  };

  const handleSkip = (deltaSec: number) => {
    const wasPlaying = playingRef.current;
    if (wasPlaying) pausePlayback();
    elapsedRef.current = Math.max(
      0,
      Math.min(totalMs(), elapsedRef.current + deltaSec * 1000)
    );
    setElapsedMs(elapsedRef.current);
    if (wasPlaying) speakFromElapsed(true);
  };

  const seekToFraction = (frac: number) => {
    const clamped = Math.max(0, Math.min(1, frac));
    elapsedRef.current = clamped * totalMs();
    setElapsedMs(elapsedRef.current);
  };

  const getFractionFromEvent = (clientX: number): number => {
    const el = pillRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  };

  const handleScrubStart = (e: React.PointerEvent) => {
    if (!started) return;
    // Don't scrub if the user clicked a control button
    const target = e.target as HTMLElement;
    if (target.closest("[data-control]")) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    scrubbingRef.current = true;
    wasPlayingBeforeScrub.current = playingRef.current;
    if (playingRef.current) pausePlayback();
    seekToFraction(getFractionFromEvent(e.clientX));
  };

  const handleScrubMove = (e: React.PointerEvent) => {
    if (!scrubbingRef.current) return;
    seekToFraction(getFractionFromEvent(e.clientX));
  };

  const handleScrubEnd = (e: React.PointerEvent) => {
    if (!scrubbingRef.current) return;
    scrubbingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    if (wasPlayingBeforeScrub.current) speakFromElapsed(true);
  };

  const handleSpeed = (next: number) => {
    setSpeedOpen(false);
    const wasPlaying = playingRef.current;
    if (wasPlaying) pausePlayback();
    const oldTotal = totalMs();
    const frac = oldTotal > 0 ? elapsedRef.current / oldTotal : 0;
    setRate(next);
    queueMicrotask(() => {
      elapsedRef.current = frac * (baseDurationRef.current / next);
      setElapsedMs(elapsedRef.current);
      if (wasPlaying) speakFromElapsed(true);
    });
  };

  const handleMute = () => {
    const wasPlaying = playingRef.current;
    const nextMuted = !muted;
    if (wasPlaying) pausePlayback();
    setMuted(nextMuted);
    if (wasPlaying) {
      queueMicrotask(() => speakFromElapsed(true));
    }
  };

  useEffect(() => {
    if (!speedOpen) return;
    const onDocClick = (ev: MouseEvent) => {
      if (!rootRef.current?.contains(ev.target as Node)) setSpeedOpen(false);
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

  // IDLE state — simple pill (play + title + sparkle + duration)
  if (!started) {
    return (
      <div
        ref={rootRef}
        className="relative w-full my-6"
        aria-label={`Audio narration: ${title}`}
      >
        <motion.button
          type="button"
          suppressHydrationWarning
          onClick={handlePlayPause}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.99 }}
          className="relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full overflow-hidden"
          style={{
            backgroundColor: "#0B1544",
            maxWidth: "620px",
            width: "100%",
          }}
          aria-label="Play narration"
        >
          <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 shrink-0">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <path d="M1 1 L11 7 L1 13 Z" />
            </svg>
          </span>
          <span className="relative z-10 text-white text-sm font-medium truncate flex-1 text-left">
            {title}
          </span>
          <span className="relative z-10 flex items-center gap-2 text-white/80 text-xs shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z" />
            </svg>
            {durationLabel ?? formatTime(totalMs())}
          </span>
        </motion.button>
      </div>
    );
  }

  // PLAYING / PAUSED state — full controls (scrub-enabled)
  return (
    <div
      ref={rootRef}
      className="relative w-full my-6"
      aria-label={`Audio narration: ${title}`}
    >
      <motion.div
        ref={pillRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onPointerDown={handleScrubStart}
        onPointerMove={handleScrubMove}
        onPointerUp={handleScrubEnd}
        onPointerCancel={handleScrubEnd}
        className="relative flex items-center gap-1 px-4 py-2 rounded-full overflow-hidden cursor-pointer select-none"
        style={{
          backgroundColor: "#0B1544",
          width: "100%",
          maxWidth: "720px",
          touchAction: "none",
        }}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPct)}
      >
        {/* Progress fill */}
        <span
          className="absolute left-0 top-0 bottom-0 bg-white/10 pointer-events-none"
          style={{ width: `${progressPct}%`, transition: scrubbingRef.current ? "none" : "width 120ms linear" }}
        />
        {/* Scrub handle */}
        <span
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white pointer-events-none shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
          style={{
            left: `calc(${progressPct}% - 6px)`,
            transition: scrubbingRef.current ? "none" : "left 120ms linear",
          }}
        />

        {/* Skip back 15s */}
        <IconButton
          dataControl
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
          dataControl
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
          dataControl
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
        <span className="relative z-10 text-white text-sm font-medium tabular-nums ml-2 mr-1 pointer-events-none">
          {elapsedDisplay} / {totalDisplay}
        </span>

        {/* Spacer */}
        <span className="relative z-10 flex-1 pointer-events-none" />

        {/* Volume / Mute */}
        <IconButton
          dataControl
          onClick={handleMute}
          ariaLabel={muted ? "Unmute" : "Mute"}
        >
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
          data-control
          suppressHydrationWarning
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
                suppressHydrationWarning
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
  dataControl,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  dataControl?: boolean;
}) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={ariaLabel}
      {...(dataControl ? { "data-control": "" } : {})}
      className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/10 transition-colors shrink-0"
    >
      {children}
    </button>
  );
}
