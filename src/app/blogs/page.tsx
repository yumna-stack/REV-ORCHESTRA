"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";

const blogs = [
  {
    slug: "building-gtm-engine",
    title: "We Can Build For You",
    excerpt: "Experts from REVORCHESTRA Network can understand your GTM requirements and build a system that scales.",
    image: "linear-gradient(135deg, rgba(232,86,0,0.15) 0%, rgba(100,40,10,0.1) 100%)",
  },
  {
    slug: "crafting-pipeline-solution",
    title: "We Craft Your Pipeline Solution",
    excerpt: "Our REVORCHESTRA experts analyze your unique GTM challenges and design tailored orchestration systems.",
    image: "linear-gradient(135deg, rgba(152,151,255,0.1) 0%, rgba(60,60,100,0.1) 100%)",
  },
];

export default function BlogsPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <PageHero
        badge="Blog"
        title="Learn with REVORCHESTRA AI"
        subtitle="Insights, playbooks, and case studies on building signal-led GTM systems."
      />

      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, i) => (
              <Section key={i} delay={i * 150}>
                <a href={`/blogs/${blog.slug}`} className="block group">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-all duration-300">
                    <div className="w-full aspect-[16/10] relative overflow-hidden" style={{ background: blog.image }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 duration-500">
                          <div className="w-20 h-20 rounded-full border border-[rgba(255,255,255,0.08)]" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-orange transition-colors">{blog.title}</h3>
                      <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] mb-6">{blog.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-orange">
                        Learn More
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </div>
                  </div>
                </a>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
