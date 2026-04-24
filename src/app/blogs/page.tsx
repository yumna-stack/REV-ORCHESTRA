"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageWrapper";
import { Reveal, popIn } from "@/components/motion";

const blogs = [
  {
    slug: "outbound-2026-gtm-systems-problem",
    title: "Outbound in 2026 Is Not a Channel Problem. It Is a GTM Systems Problem.",
    excerpt:
      "The real shift in 2026: outbound is no longer judged one message at a time. It is being judged as a system — timing, signal arbitration, deliverability, and AI all working as one decision layer.",
    tag: "GTM Strategy",
    date: "Apr 24, 2026",
    readTime: "8 min read",
  },
];

export default function BlogsPage() {
  return (
    <main className="w-full bg-black">
      <Navigation />

      {/* Hero */}
      <PageHero
        badge="Blog"
        title="GTM Reads"
        subtitle="Deep dives into AI-orchestrated GTM, signal-led outbound, agent architecture, and founder strategy. No fluff, no SEO filler."
      />

      {/* Vertical card grid — centered when fewer than 3 posts */}
      <section className="pb-28 pt-4">
        <div className="max-w-[1200px] mx-auto px-5">
          <div
            className={`grid gap-6 ${
              blogs.length === 1
                ? "grid-cols-1 max-w-[420px] mx-auto"
                : blogs.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-[880px] mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {blogs.map((blog, i) => (
              <Reveal key={blog.slug} variants={popIn} delay={0.1 + i * 0.08}>
                <a href={`/blogs/${blog.slug}`} className="block group h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] overflow-hidden hover:border-[rgba(232,86,0,0.25)] transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Card image/placeholder */}
                    <div
                      className="w-full aspect-[4/3] relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(232,86,0,0.18) 0%, rgba(152,151,255,0.12) 55%, rgba(14,15,17,1) 100%)",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="w-28 h-28 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.12, 1] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3,
                              }}
                              className="w-16 h-16 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.6,
                                }}
                                className="w-6 h-6 rounded-full bg-accent-orange/30"
                              />
                            </motion.div>
                          </motion.div>
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute -top-3 -right-3 w-2.5 h-2.5 rounded-full bg-[#9897FF]/40"
                          />
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.5,
                            }}
                            className="absolute -bottom-4 -left-2 w-2 h-2 rounded-full bg-accent-orange/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-[rgba(232,86,0,0.08)] border border-[rgba(232,86,0,0.2)] text-[11px] text-accent-orange uppercase tracking-wider mb-4 font-medium">
                        {blog.tag}
                      </span>
                      <h3 className="text-lg font-semibold text-white mb-3 leading-[130%] group-hover:text-accent-orange transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] mb-5 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
                        <div className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.4)]">
                          <span>{blog.date}</span>
                          <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.3)]" />
                          <span>{blog.readTime}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-orange">
                          Read
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
