"use client";

import { useEffect, useRef, useState } from "react";

const blogPosts = [
  {
    category: "Blockchain",
    readTime: "5 min read",
    title: "The Future of Decentralized Finance in 2025",
    description: "Explore how DeFi protocols are reshaping the financial landscape and what it means for crypto investors.",
    gradient: "from-[rgba(232,86,0,0.15)] to-[rgba(152,151,255,0.05)]",
  },
  {
    category: "AI & Crypto",
    readTime: "4 min read",
    title: "How AI is Revolutionizing Crypto Trading",
    description: "Discover how artificial intelligence is being used to analyze market patterns and generate trading insights.",
    gradient: "from-[rgba(152,151,255,0.15)] to-[rgba(232,86,0,0.05)]",
  },
];

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" className="relative w-full py-24 bg-black-light">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Blog</span>
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] font-semibold leading-[110%] tracking-[-2px] text-white mb-4">
            Latest Insights
          </h2>
        </div>

        {/* 2 Blog Cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${300 + i * 150}ms`,
                transitionDuration: "700ms",
              }}
            >
              {/* Image placeholder */}
              <div className={`w-full aspect-[16/9] bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-2xl bg-[rgba(232,86,0,0.15)] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M4 16l4-4 4 4 4-8 4 4" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-accent-orange">{post.category}</span>
                  <span className="text-xs text-[rgba(255,255,255,0.3)]">&bull;</span>
                  <span className="text-xs text-[rgba(255,255,255,0.3)]">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[160%] mb-6">
                  {post.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-orange hover:text-white transition-colors"
                >
                  Read More
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
