"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PILL_BG = "rgb(245, 245, 247)";
const PILL_LAYOUT_ID = "audio-player-pill";
const PILL_TRANSITION = {
  layout: { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const },
};

type Props = {
  title: string;
  text: string;
  durationLabel?: string;
  /**
   * Optional URL to a pre-generated MP3 (e.g. ElevenLabs narration at
   * /audio/{slug}.mp3). When provided and reachable, the player uses
   * <audio> playback. When missing or unreachable, falls back to the
   * browser's speechSynthesis API.
   */
  src?: string;
};

const SPEEDS = [1, 1.25, 1.5, 2, 0.75] as const;

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ title, text, durationLabel, src }: Props) {
  // Mode resolution: "checking" → "file" (real MP3) | "speech" (fallback) | "none"
  const [mode, setMode] = useState<"checking" | "file" | "speech" | "none">(
    src ? "checking" : "speech"
  );

  useEffect(() => {
    if (!src) {
      setMode(typeof window !== "undefined" && "speechSynthesis" in window ? "speech" : "none");
      return;
    }
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setMode("file");
        } else if (typeof window !== "undefined" && "speechSynthesis" in window) {
          setMode("speech");
        } else {
          setMode("none");
        }
      })
      .catch(() => {
        if (cancelled) return;
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          setMode("speech");
        } else {
          setMode("none");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (mode === "none") return null;
  if (mode === "checking") {
    return (
      <PlayerShell title={title} durationLabel={durationLabel} progressPct={0} />
    );
  }
  if (mode === "file") {
    return <FilePlayer title={title} src={src!} durationLabel={durationLabel} />;
  }
  return <SpeechPlayer title={title} text={text} durationLabel={durationLabel} />;
}

// ---------------------------------------------------------------------------
// Idle skeleton (used while we HEAD-probe the MP3)
// ---------------------------------------------------------------------------
function PlayerShell({
  title,
  durationLabel,
  progressPct,
}: {
  title: string;
  durationLabel?: string;
  progressPct: number;
}) {
  return (
    <div className="relative w-full my-6" aria-label={`Audio narration: ${title}`}>
      <div
        className="relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full overflow-hidden border border-[rgba(0,0,0,0.12)]"
        style={{ backgroundColor: "rgb(245, 245, 247)", maxWidth: "620px", width: "100%" }}
      >
        <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(0,0,0,0.06)] shrink-0">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="rgb(14,15,17)">
            <path d="M1 1 L11 7 L1 13 Z" />
          </svg>
        </span>
        <span className="relative z-10 text-[rgb(14,15,17)] text-sm font-medium truncate flex-1 text-left">
          {title}
        </span>
        <span className="relative z-10 flex items-center gap-2 text-[rgba(14,15,17,0.65)] text-xs shrink-0">
          {durationLabel ?? "0:00"}
        </span>
        <span
          className="absolute left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.18)] pointer-events-none"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// IdleButton: title-only pill the user clicks to start playback. Shares
// `layoutId` with the playing-state pill so framer-motion smoothly morphs the
// shape when transitioning between idle and playing.
// ---------------------------------------------------------------------------
function IdleButton({
  title,
  durationLabel,
  onClick,
}: {
  title: string;
  durationLabel: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      suppressHydrationWarning
      onClick={onClick}
      layoutId={PILL_LAYOUT_ID}
      transition={PILL_TRANSITION}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.99 }}
      className="relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full overflow-hidden border border-[rgba(0,0,0,0.12)]"
      style={{ backgroundColor: PILL_BG, maxWidth: "620px", width: "100%" }}
      aria-label="Play narration"
    >
      <motion.span
        layout="position"
        className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(0,0,0,0.06)] shrink-0"
      >
        <svg width="12" height="14" viewBox="0 0 12 14" fill="rgb(14,15,17)">
          <path d="M1 1 L11 7 L1 13 Z" />
        </svg>
      </motion.span>
      <motion.span
        layout="position"
        className="relative z-10 text-[rgb(14,15,17)] text-sm font-medium truncate flex-1 text-left"
      >
        {title}
      </motion.span>
      <motion.span
        layout="position"
        className="relative z-10 flex items-center gap-2 text-[rgba(14,15,17,0.65)] text-xs shrink-0"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z" />
        </svg>
        {durationLabel}
      </motion.span>
    </motion.button>
  );
}

// ===========================================================================
// File player — uses HTMLAudioElement, plays the ElevenLabs MP3
// ===========================================================================
function FilePlayer({
  title,
  src,
  durationLabel,
}: {
  title: string;
  src: string;
  durationLabel?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [totalMsState, setTotalMsState] = useState(0);
  const [rate, setRate] = useState<number>(1);
  const [muted, setMuted] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef<boolean>(false);
  const wasPlayingBeforeScrub = useRef<boolean>(false);

  // Lazy-create the audio element so SSR is clean.
  useEffect(() => {
    const a = new Audio(src);
    a.preload = "metadata";
    audioRef.current = a;

    const onLoaded = () => setTotalMsState(a.duration * 1000);
    const onTime = () => setElapsedMs(a.currentTime * 1000);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setElapsedMs(a.duration * 1000);
    };

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);

    return () => {
      a.pause();
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [src]);

  const handlePlayPause = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      setStarted(true);
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  const handleSkip = (deltaSec: number) => {
    const a = audioRef.current;
    if (!a) return;
    const next = Math.max(0, Math.min((a.duration || 0), a.currentTime + deltaSec));
    a.currentTime = next;
  };

  const seekToFraction = (frac: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const clamped = Math.max(0, Math.min(1, frac));
    a.currentTime = clamped * a.duration;
  };

  const getFractionFromEvent = (clientX: number): number => {
    const el = pillRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  };

  const handleScrubStart = (e: React.PointerEvent) => {
    if (!started) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-control]")) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    scrubbingRef.current = true;
    const a = audioRef.current;
    wasPlayingBeforeScrub.current = a ? !a.paused : false;
    if (a && !a.paused) a.pause();
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
    if (wasPlayingBeforeScrub.current && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSpeed = (next: number) => {
    setSpeedOpen(false);
    setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const handleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (audioRef.current) audioRef.current.muted = nextMuted;
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

  const totalDisplay = durationLabel ?? formatTime(totalMsState);
  const elapsedDisplay = formatTime(elapsedMs);
  const progressPct = totalMsState > 0 ? Math.min(100, (elapsedMs / totalMsState) * 100) : 0;

  return (
    <div ref={rootRef} className="relative w-full my-6" aria-label={`Audio narration: ${title}`}>
      <AnimatePresence mode="wait" initial={false}>
        {!started ? (
          <IdleButton
            key="idle"
            title={title}
            durationLabel={totalDisplay}
            onClick={handlePlayPause}
          />
        ) : (
          <PlayerControls
            key="playing"
            pillRef={pillRef}
            title={title}
            playing={playing}
            muted={muted}
            rate={rate}
            speedOpen={speedOpen}
            progressPct={progressPct}
            elapsedDisplay={elapsedDisplay}
            totalDisplay={totalDisplay}
            formatRate={formatRate}
            onPlayPause={handlePlayPause}
            onSkip={handleSkip}
            onMute={handleMute}
            onSpeedToggle={() => setSpeedOpen((v) => !v)}
            onSpeedSelect={handleSpeed}
            onScrubStart={handleScrubStart}
            onScrubMove={handleScrubMove}
            onScrubEnd={handleScrubEnd}
            scrubbing={scrubbingRef.current}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===========================================================================
// Speech player — fallback when no MP3 is available
// ===========================================================================
function SpeechPlayer({ title, text, durationLabel }: { title: string; text: string; durationLabel?: string }) {
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
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stopTimeoutsRef = useRef<number[]>([]);

  // Hard stop: detach callbacks first so any flush of the queue cannot
  // re-trigger state, then pause + cancel. Chrome's cancel() is flaky, so we
  // hammer it: synchronous pause+cancel, then again at 0/50/200ms. We track
  // timeout ids so a subsequent play() can clear them and avoid killing a new
  // utterance.
  const hardStop = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (utterRef.current) {
      utterRef.current.onend = null;
      utterRef.current.onerror = null;
      utterRef.current.onpause = null as unknown as typeof utterRef.current.onpause;
      utterRef.current = null;
    }
    const synth = window.speechSynthesis;
    const kill = () => {
      try { synth.pause(); } catch {}
      try { synth.cancel(); } catch {}
    };
    kill();
    // Clear any prior pending kills before scheduling new ones.
    for (const id of stopTimeoutsRef.current) clearTimeout(id);
    stopTimeoutsRef.current = [];
    stopTimeoutsRef.current.push(window.setTimeout(kill, 0));
    stopTimeoutsRef.current.push(window.setTimeout(kill, 50));
    stopTimeoutsRef.current.push(window.setTimeout(kill, 200));
  };

  // When starting/resuming, drop any pending kills first.
  const clearPendingKills = () => {
    for (const id of stopTimeoutsRef.current) clearTimeout(id);
    stopTimeoutsRef.current = [];
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    wordsRef.current = text.trim().split(/\s+/);
    baseDurationRef.current = Math.max(60_000, (wordsRef.current.length / 170) * 60_000);
    const onPageHide = () => hardStop();
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onPageHide);
      hardStop();
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
    hardStop();
    // hardStop scheduled timeouts that would call cancel() after we speak.
    // Clear them now so the new utterance can actually play.
    clearPendingKills();
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
      // ignore stale callbacks (e.g. from a cancelled utterance whose
      // onend fires anyway in some browsers)
      if (utterRef.current !== utter) return;
      playingRef.current = false;
      setPlaying(false);
      setElapsedMs(totalMs());
      elapsedRef.current = 0;
      stopRaf();
    };
    utter.onerror = () => {
      if (utterRef.current !== utter) return;
      playingRef.current = false;
      setPlaying(false);
      stopRaf();
    };
    utterRef.current = utter;

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
    // Stop the rAF tick FIRST so it cannot resurrect state after cancel.
    playingRef.current = false;
    stopRaf();
    elapsedRef.current = elapsedRef.current + (performance.now() - startRef.current);
    hardStop();
    setPlaying(false);
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
    elapsedRef.current = Math.max(0, Math.min(totalMs(), elapsedRef.current + deltaSec * 1000));
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
  const progressPct = totalMs() > 0 ? Math.min(100, (elapsedMs / totalMs()) * 100) : 0;

  return (
    <div ref={rootRef} className="relative w-full my-6" aria-label={`Audio narration: ${title}`}>
      <AnimatePresence mode="wait" initial={false}>
        {!started ? (
          <IdleButton
            key="idle"
            title={title}
            durationLabel={totalDisplay}
            onClick={handlePlayPause}
          />
        ) : (
          <PlayerControls
            key="playing"
            pillRef={pillRef}
            title={title}
            playing={playing}
            muted={muted}
            rate={rate}
            speedOpen={speedOpen}
            progressPct={progressPct}
            elapsedDisplay={elapsedDisplay}
            totalDisplay={totalDisplay}
            formatRate={formatRate}
            onPlayPause={handlePlayPause}
            onSkip={handleSkip}
            onMute={handleMute}
            onSpeedToggle={() => setSpeedOpen((v) => !v)}
            onSpeedSelect={handleSpeed}
            onScrubStart={handleScrubStart}
            onScrubMove={handleScrubMove}
            onScrubEnd={handleScrubEnd}
            scrubbing={scrubbingRef.current}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===========================================================================
// Shared playing-state UI shell
// ===========================================================================
type ControlsProps = {
  pillRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  playing: boolean;
  muted: boolean;
  rate: number;
  speedOpen: boolean;
  progressPct: number;
  elapsedDisplay: string;
  totalDisplay: string;
  formatRate: (r: number) => string;
  onPlayPause: () => void;
  onSkip: (deltaSec: number) => void;
  onMute: () => void;
  onSpeedToggle: () => void;
  onSpeedSelect: (r: number) => void;
  onScrubStart: (e: React.PointerEvent) => void;
  onScrubMove: (e: React.PointerEvent) => void;
  onScrubEnd: (e: React.PointerEvent) => void;
  scrubbing: boolean;
};

function PlayerControls(props: ControlsProps) {
  const {
    pillRef,
    title,
    playing,
    muted,
    rate,
    speedOpen,
    progressPct,
    elapsedDisplay,
    totalDisplay,
    formatRate,
    onPlayPause,
    onSkip,
    onMute,
    onSpeedToggle,
    onSpeedSelect,
    onScrubStart,
    onScrubMove,
    onScrubEnd,
    scrubbing,
  } = props;

  return (
    <>
      <motion.div
        layoutId={PILL_LAYOUT_ID}
        transition={PILL_TRANSITION}
        className="relative flex items-center gap-1 px-3 py-2 rounded-full select-none border border-[rgba(0,0,0,0.12)]"
        style={{ backgroundColor: PILL_BG, width: "100%", maxWidth: "720px" }}
        aria-label={`Audio narration: ${title}`}
      >
        <IconButton dataControl onClick={() => onSkip(-15)} ariaLabel="Skip back 15 seconds">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(14,15,17)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <text x="12" y="15.8" textAnchor="middle" fontSize="9" fontWeight="800" fill="rgb(14,15,17)" strokeWidth="0" fontFamily="Inter, system-ui, sans-serif">15</text>
          </svg>
        </IconButton>

        <IconButton dataControl onClick={onPlayPause} ariaLabel={playing ? "Pause" : "Play"}>
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="rgb(14,15,17)">
              <rect x="3" y="2" width="4" height="14" rx="1" />
              <rect x="11" y="2" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="rgb(14,15,17)">
              <path d="M4 2 L15 9 L4 16 Z" />
            </svg>
          )}
        </IconButton>

        <IconButton dataControl onClick={() => onSkip(15)} ariaLabel="Skip forward 15 seconds">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(14,15,17)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <text x="12" y="15.8" textAnchor="middle" fontSize="9" fontWeight="800" fill="rgb(14,15,17)" strokeWidth="0" fontFamily="Inter, system-ui, sans-serif">15</text>
          </svg>
        </IconButton>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="relative z-10 text-[rgb(14,15,17)] text-sm font-medium tabular-nums ml-2 mr-3 pointer-events-none shrink-0"
        >
          {elapsedDisplay} / {totalDisplay}
        </motion.span>

        {/* Slim slider track */}
        <motion.div
          ref={pillRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.2 }}
          onPointerDown={onScrubStart}
          onPointerMove={onScrubMove}
          onPointerUp={onScrubEnd}
          onPointerCancel={onScrubEnd}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
          className="relative flex-1 h-1.5 bg-[rgba(0,0,0,0.1)] rounded-full cursor-pointer mr-3"
          style={{ touchAction: "none" }}
        >
          <span
            className="absolute left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] rounded-full pointer-events-none"
            style={{ width: `${progressPct}%`, transition: scrubbing ? "none" : "width 120ms linear" }}
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 h-2.5 rounded-full bg-[rgb(14,15,17)] pointer-events-none shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
            style={{
              width: 28,
              left: `calc(${progressPct}% - 14px)`,
              transition: scrubbing ? "none" : "left 120ms linear",
            }}
          />
        </motion.div>

        <IconButton dataControl onClick={onMute} ariaLabel={muted ? "Unmute" : "Mute"}>
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(14,15,17)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgb(14,15,17)" stroke="rgb(14,15,17)" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(14,15,17)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgb(14,15,17)" stroke="rgb(14,15,17)" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </IconButton>

        <button
          type="button"
          data-control
          suppressHydrationWarning
          onClick={onSpeedToggle}
          aria-label="Playback speed"
          aria-haspopup="menu"
          aria-expanded={speedOpen}
          className="relative z-10 flex items-center justify-center min-w-[38px] h-9 px-2 text-[rgb(14,15,17)] text-sm font-semibold shrink-0 hover:text-[rgba(14,15,17,0.7)] transition-colors"
        >
          {formatRate(rate)}
        </button>
      </motion.div>

      {speedOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-20 flex flex-col rounded-xl border border-[rgba(0,0,0,0.1)] bg-white overflow-hidden shadow-xl"
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
                onClick={() => onSpeedSelect(s)}
                className={`flex items-center justify-between gap-4 px-4 py-2 text-sm transition-colors ${
                  active ? "text-accent-orange bg-[rgba(232,86,0,0.08)]" : "text-[rgba(14,15,17,0.7)] hover:text-[rgb(14,15,17)] hover:bg-[rgba(0,0,0,0.04)]"
                }`}
              >
                <span>{formatRate(s)}</span>
                {active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </>
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
      className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full text-[rgb(14,15,17)] hover:bg-[rgba(0,0,0,0.08)] transition-colors shrink-0"
    >
      {children}
    </button>
  );
}
