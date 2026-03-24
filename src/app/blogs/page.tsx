"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, fadeLeft, fadeRight, popIn, scaleUp } from "@/components/motion";
import { StaggerGrid, GridItem } from "@/components/PageWrapper";

const featuredBlog = {
  slug: "we-can-build-for-you",
  title: "We Can Build For You",
  excerpt:
    "Experts from CRYPS Network can understand your crypto requirements and build custom blockchain solutions that scale with your business.",
  image:
    "linear-gradient(135deg, rgba(232,86,0,0.2) 0%, rgba(152,151,255,0.15) 50%, rgba(14,15,17,1) 100%)",
};

const blogs = [
  {
    slug: "understanding-defi-protocols",
    title: "Understanding DeFi Protocols",
    excerpt:
      "A deep dive into how decentralized finance protocols work and what they mean for the future of banking.",
    tag: "DeFi",
  },
  {
    slug: "cross-chain-bridges-explained",
    title: "Cross-Chain Bridges Explained",
    excerpt:
      "How cross-chain bridges enable seamless asset transfers between different blockchain networks.",
    tag: "Infrastructure",
  },
  {
    slug: "nft-marketplaces-2026",
    title: "NFT Marketplaces in 2026",
    excerpt:
      "The evolution of NFT marketplaces and new trends shaping digital asset ownership this year.",
    tag: "NFTs",
  },
  {
    slug: "smart-contract-security",
    title: "Smart Contract Security",
    excerpt:
      "Best practices and common vulnerabilities every developer should know when building smart contracts.",
    tag: "Security",
  },
  {
    slug: "ethereum-layer2-landscape",
    title: "Ethereum Layer 2 Landscape",
    excerpt:
      "Comparing rollups, sidechains, and state channels in the Ethereum scaling ecosystem.",
    tag: "Ethereum",
  },
  {
    slug: "ai-meets-blockchain",
    title: "AI Meets Blockchain",
    excerpt:
      "How artificial intelligence is transforming on-chain analytics, trading strategies, and protocol governance.",
    tag: "AI",
  },
];

export default function BlogsPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      {/* Hero */}
      <PageHero
        badge="Blog"
        title="Crypto Reads"
        subtitle="Learn about every update from the crypto world. Insights, tutorials, and deep dives into blockchain technology."
      />

      {/* Featured Blog Card */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <Reveal variants={popIn} delay={0.2}>
            <a href={`/blogs/${featuredBlog.slug}`} className="block group">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image area */}
                  <div
                    className="w-full aspect-[16/10] lg:aspect-auto lg:min-h-[360px] relative overflow-hidden"
                    style={{ background: featuredBlog.image }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-40 h-40 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 duration-700"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                            className="w-24 h-24 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                              className="w-10 h-10 rounded-full bg-accent-orange/20"
                            />
                          </motion.div>
                        </motion.div>
                        {/* Floating dots */}
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-[#9897FF]/30"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          className="absolute -bottom-6 -left-2 w-2 h-2 rounded-full bg-accent-orange/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-2 text-xs text-accent-orange uppercase tracking-wider font-medium mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                      Featured
                    </span>
                    <h2 className="text-[clamp(24px,3vw,36px)] font-semibold text-white mb-4 leading-[120%] group-hover:text-accent-orange transition-colors">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%] mb-8 max-w-[440px]">
                      {featuredBlog.excerpt}
                    </p>
                    <div>
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full group-hover:brightness-110 transition-all">
                        Learn More
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Blog Grid - 3x2 */}
      <section className="pb-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <GridItem key={blog.slug}>
                <a href={`/blogs/${blog.slug}`} className="block group h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Card image/placeholder */}
                    <div
                      className="w-full aspect-[16/10] relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${
                          i % 2 === 0
                            ? "rgba(232,86,0,0.1) 0%, rgba(14,15,17,0.8) 100%"
                            : "rgba(152,151,255,0.1) 0%, rgba(14,15,17,0.8) 100%"
                        })`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                          <div className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.08)]" />
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Tag */}
                      <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-wider mb-4">
                        {blog.tag}
                      </span>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-orange transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[170%] mb-5 flex-1">
                        {blog.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-orange">
                        Read More
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </motion.div>
                </a>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <Footer />
    </main>
  );
}
