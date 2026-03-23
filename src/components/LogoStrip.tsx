"use client";

import { useEffect, useRef, useState } from "react";

const logos = [
  { name: "HubSpot", src: "https://cdn.simpleicons.org/hubspot/white" },
  { name: "Slack", src: "https://cdn.simpleicons.org/slack/white" },
  { name: "Apollo", src: "https://files.catbox.moe/ihhymf.png" },
  { name: "Clay", src: "https://files.catbox.moe/nsms2p.png" },
  { name: "n8n", src: "https://cdn.simpleicons.org/n8n/white" },
  { name: "Instantly", src: "https://files.catbox.moe/ye3df6.png" },
  { name: "LinkedIn", src: "https://cdn.simpleicons.org/linkedin/white" },
  { name: "Smartlead", src: "https://files.catbox.moe/wrn4vd.png" },
  { name: "HeyReach", src: "https://files.catbox.moe/4lqxzu.png" },
  { name: "Calendly", src: "https://cdn.simpleicons.org/calendly/white" },
  { name: "Notion", src: "https://cdn.simpleicons.org/notion/white" },
  { name: "Google Sheets", src: "https://cdn.simpleicons.org/googlesheets/white" },
];

export default function LogoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const items = [...logos, ...logos, ...logos];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="logos"
      className="relative w-full pt-0 pb-20 bg-black-light overflow-hidden"
    >
      {/* Small spacer - title is in the AnimatedText transition above */}
      <div className="h-4" />

      {/* Scrolling logos */}
      <div
        className="relative w-full overflow-hidden transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: "600ms",
        }}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />

        <div
          className="flex items-center gap-[70px] w-max"
          style={{ animation: "logoScroll 35s linear infinite" }}
        >
          {items.map((logo, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 shrink-0 h-7">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee text */}
      <div
        className="mt-14 flex gap-8 overflow-hidden transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: "800ms",
        }}
      >
        <div
          className="flex gap-12 shrink-0 w-max"
          style={{ animation: "logoScroll 25s linear infinite" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-sm font-medium text-[rgba(255,255,255,0.08)] tracking-wider uppercase whitespace-nowrap"
            >
              Stop Renting Your Pipeline. Start Owning It.
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
