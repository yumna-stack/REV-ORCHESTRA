import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section } from "@/components/PageWrapper";
import AudioPlayer from "@/components/AudioPlayer";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareArticle from "@/components/blog/ShareArticle";
import BlogSubscribe from "@/components/blog/BlogSubscribe";
import BlogCTA from "@/components/blog/BlogCTA";
import { notFound } from "next/navigation";

type Resource = { label: string; url: string; note?: string };

type BlogSection = {
  id?: string;
  heading?: string;
  tocLabel?: string;
  paragraphs: string[];
};

type BlogPost = {
  slug: string;
  badge: string;
  category: string;
  title: string;
  date: string;
  author: { name: string; initial: string };
  readTime: string;
  audio?: { title: string; durationLabel: string };
  sections: BlogSection[];
  resources?: Resource[];
};

const posts: BlogPost[] = [
  {
    slug: "outbound-2026-gtm-systems-problem",
    badge: "GTM Strategy",
    category: "DEMAND GENERATION",
    title:
      "Outbound in 2026 Is Not a Channel Problem. It Is a GTM Systems Problem.",
    date: "APR 24, 2026",
    readTime: "8 min read",
    author: { name: "Danny", initial: "D" },
    audio: {
      title: "Outbound in 2026: A GTM Systems Problem",
      durationLabel: "8:00",
    },
    sections: [
      {
        id: "intro",
        tocLabel: "The Shift: Outbound Is Now a System",
        paragraphs: [
          "Let's be honest: most B2B teams are still talking about outbound like it is a writing exercise.",
          "They ask whether the first line is personalized enough. Whether the call to action is too direct. Whether LinkedIn should come before email. Whether AI can make the sequence sound more human.",
          "Those questions matter, but they are not the main thing breaking outbound.",
          "The real shift in 2026 is that outbound is no longer being judged one message at a time. It is being judged as a system.",
          "Can the system identify the right moment? Can it decide which signal matters? Can it route outreach through healthy infrastructure? Can it suppress conflicting plays? Can it carry context from first touch to booked meeting and beyond?",
          "If the answer is no, the copy barely gets a chance.",
          "Recent benchmark data shows the average cold email reply rate is still just 3.43%, while top performers exceed 10%. At the same time, signal-based outbound sources are reporting much stronger response rates when the outreach is tied to real buyer context rather than static list blasting. That gap is the story. It suggests the problem is not that outbound stopped working. It is that generic outbound is losing to systems that are better at timing, routing, and context.",
        ],
      },
      {
        id: "decision-layer",
        heading: "The Core Concept: Outbound as a Decision Layer Inside GTM",
        tocLabel: "The Core Concept: Outbound as a Decision Layer",
        paragraphs: [
          "For years, outbound was mostly treated as a top-of-funnel activity.",
          "You built a list, enriched it, wrote a sequence, and hoped the market responded.",
          "That model still exists, but it is getting weaker for one simple reason: buyers leave more signals than before, but most teams still do not know what to do with them.",
          "A website visit, a funding event, a hiring pattern, a job change, a product usage event, a competitor mention, a reply, a no-reply, a meeting booked, a meeting missed. All of that is information. The modern outbound question is no longer \"Can we reach this account?\" It is \"What should happen next, and why?\"",
          "That is why the strongest outbound teams now look more like GTM systems than campaign factories.",
        ],
      },
      {
        id: "timing",
        heading: "1. The New Outbound Advantage Is Not Volume. It Is Timing.",
        tocLabel: "1. The New Advantage Is Timing",
        paragraphs: [
          "One of the easiest mistakes to make in outbound is assuming more data means more opportunity.",
          "In practice, more data often just means more noise.",
          "The sharper teams are not winning because they have bigger lists. They are winning because they are acting on moments that actually matter. Signal-based selling guides increasingly frame the category this way: the shift is from demographic outreach to moment-based outreach, where timing is driven by observable buyer activity rather than static fit alone.",
          "This matters because most founders do not actually have a lead shortage. They have a timing shortage.",
          "They are contacting the right companies at the wrong moment, or the wrong companies at the right moment, and both failures look the same from the dashboard: low replies, weak pipeline, and a sense that outbound is \"getting harder.\"",
          "A better GTM outbound motion starts with a different question: What is the smallest piece of evidence that this account might be ready for a different kind of conversation?",
          "That might be a pricing-page visit after a long quiet period, a hiring spike in a function your product serves, a product usage pattern that signals expansion potential, a job change that resets buying preferences, or a competitor complaint surfacing in public.",
          "The point is not to collect every signal. The point is to know which signals deserve action.",
        ],
      },
      {
        id: "arbitration",
        heading: "2. The Hidden Failure: Poor Signal Arbitration",
        tocLabel: "2. The Hidden Failure: Signal Arbitration",
        paragraphs: [
          "Most companies now have some form of intent data, enrichment, or activity tracking.",
          "What they often lack is arbitration.",
          "One account visits pricing. Another stakeholder at the same company downloads a guide. A third person comments on a competitor. Marketing sees engagement. Sales sees intent. RevOps sees a target account. Suddenly three teams are preparing three different plays for one buying group.",
          "This is where a lot of \"AI outbound\" falls apart. The system can detect things, but detection is not the hard part anymore. The hard part is deciding which signal wins, which gets ignored, which suppresses another, and which changes the message.",
          "That is why outbound is increasingly a routing problem.",
          "Apollo's more recent signal-stack and account-prioritization content points in this direction: signals are only useful when they can be scored, prioritized, and connected to action across the GTM motion, not just displayed in another dashboard.",
          "So the next level of outbound maturity is not \"more intent data.\" It is a system that can answer: Is this signal strong enough to act on? Is this account already in another motion? Should this trigger email, LinkedIn, or a rep task? Should the sequence start now, or wait? Should AI draft the first touch, or should a human intervene?",
          "That is not a copywriting layer. That is a decision layer.",
        ],
      },
      {
        id: "deliverability",
        heading: "3. Deliverability Is Part of GTM Design",
        tocLabel: "3. Deliverability Is Part of GTM Design",
        paragraphs: [
          "There was a time when deliverability could be treated as a technical afterthought. That time is over.",
          "Google's sender guidelines now explicitly tell bulk senders to keep spam rates in Postmaster Tools below 0.10% and avoid ever reaching 0.30% or higher. Once a sender crosses certain thresholds, the system does not \"kind of work.\" It gets harder to recover. Google also ties sender treatment directly to authentication, spam rates, and compliance behavior.",
          "This changes how founders should think about outbound. A weak sequence is not only a messaging problem. If it goes to the wrong audience, through tired mailboxes, with weak engagement patterns, it becomes an infrastructure problem.",
          "That is why some teams spend weeks rewriting copy when the real issue is that the system keeps sending low-confidence outreach through the wrong capacity.",
          "In 2026, sender health is not separate from GTM execution. It is one of the things GTM needs to govern.",
          "A mature outbound motion therefore does not ask only: \"Did the message resonate?\" It also asks: \"Should this message have been sent from this sender, to this audience, at this moment, at all?\" That is a much smarter question.",
        ],
      },
      {
        id: "ai-execution",
        heading: "4. AI Belongs in Execution, Not in Strategy",
        tocLabel: "4. AI Belongs in Execution",
        paragraphs: [
          "This is where the market still gets distracted.",
          "AI is very good at producing language. It is becoming better at summarizing accounts, clustering signals, drafting variants, and handling repetitive follow-up work.",
          "But most AI outbound failures come from a strategic misunderstanding. Teams expect AI to create the outbound motion when it is really better at accelerating a motion that already works.",
          "Recent commentary on AI SDR deployment keeps pointing to the same limitation: the model is not the whole problem. The model needs context, workflow grounding, exclusions, routing rules, and escalation paths. Without those things, AI simply scales confusion faster.",
          "The best use of AI in outbound is not to ask it, \"Write me a cold email.\" It is to give it a narrower role inside a governed system: summarize account context, cluster signals into likely narratives, propose CTA variants based on stage, draft first-pass messaging for review, classify replies, hand off positive intent cleanly, and suppress the wrong action before it happens.",
          "In other words, AI should be part of the execution layer, not the substitute for GTM thinking.",
        ],
      },
      {
        id: "control-plane",
        heading: "5. The Next Outbound Stack Is a Control Plane",
        tocLabel: "5. The Stack Becomes a Control Plane",
        paragraphs: [
          "This is the bigger strategic shift.",
          "Most outbound stacks were built by accumulation. A data source here. A sequencer there. A warm-up tool. An enrichment layer. A CRM. A reply inbox. A scheduler. Maybe an AI SDR on top. Maybe an intent feed too.",
          "That stack can work, but only up to a point. Eventually, the problem is not lack of capability. It is lack of coherence.",
          "That is why newer GTM thinking is moving toward a control-plane model. Not \"one tool to replace everything,\" but one layer that governs the flow between tools and decides what the system should do next. GTM trend writing in 2026 increasingly describes this as the difference between a collection of software and an operating system for execution.",
          "That is where modern outbound is heading. Not toward more sequences. Not toward more channels. Not toward more dashboards. Toward systems that remember context, arbitrate signals, protect infrastructure, and keep work moving without losing the thread between steps.",
        ],
      },
      {
        id: "founders",
        heading: "What This Means for B2B Founders",
        tocLabel: "What This Means for Founders",
        paragraphs: [
          "If you are a founder, the biggest outbound question in 2026 is not: \"How do we get our SDRs to send more?\" It is: \"How does our GTM system decide what deserves a human conversation?\"",
          "That is a much more strategic lens. It changes how you think about data. It changes how you think about AI. It changes how you think about ownership. And it changes how you evaluate whether your current outbound motion is actually working.",
          "Because once outbound becomes a systems problem, performance stops living in one place. It lives in targeting quality, signal relevance, sender health, sequence logic, reply handling, handoff discipline, and decision speed.",
          "And that is exactly why many teams feel like they are \"doing outbound\" while getting uneven results. They have the pieces, but not the control layer.",
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        tocLabel: "Conclusion",
        paragraphs: [
          "Outbound still works. But the version that works now is different from the version most teams were taught to build.",
          "The old model optimized for reach. The new one optimizes for judgment.",
          "The old model asked, \"How many people can we contact?\" The new one asks, \"What should happen next for this account?\"",
          "That is the real change. And for B2B companies that want more predictable pipeline, that change is not small. It is foundational.",
          "If your outbound motion still depends on separate tools making separate decisions, the next upgrade is not another sequence or another database. It is the GTM layer that can turn signals, infrastructure, AI, and human action into one coherent system.",
        ],
      },
    ],
    resources: [
      {
        label: "Cold Email Benchmark Report: Reply Rates, Deliverability",
        url: "https://instantly.ai/cold-email-benchmark-report-2026",
        note: "Instantly, 2026 benchmark data on cold email reply rates.",
      },
      {
        label: "Cold Email Templates & Outreach Playbook (2026)",
        url: "https://www.autobound.ai/blog/cold-email-templates-guide",
        note: "Autobound guide on signal-based vs demographic outreach.",
      },
      {
        label: "Email sender guidelines",
        url: "https://support.google.com/a/answer/81126?hl=en",
        note: "Google Workspace Admin Help on spam rate thresholds and sender treatment.",
      },
      {
        label: "SaaStr 825: How the AI Era Has Directly Impacted Marketing",
        url: "https://podtail.com/fr/podcast/the-official-saastr-podcast-saas-founders-investor/saastr-825-how-the-ai-era-has-directly-impacted-ma/",
        note: "SaaStr podcast on AI SDR deployment limits and workflow grounding.",
      },
    ],
  },
];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function plainTextForAudio(post: BlogPost) {
  return [
    post.title,
    ...post.sections.flatMap((s) => [s.heading ?? "", ...s.paragraphs]),
  ]
    .filter(Boolean)
    .join(". ");
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const audioText = plainTextForAudio(post);
  const tocItems = post.sections
    .filter((s) => s.id && (s.tocLabel || s.heading))
    .map((s) => ({
      id: s.id as string,
      label: s.tocLabel || (s.heading as string),
      level: (s.heading ? 2 : 1) as 1 | 2,
    }));

  return (
    <main className="w-full bg-black">
      <Navigation />

      {/* HERO */}
      <section className="relative w-full pt-[140px] pb-20 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Decorative gradient shapes */}
        <div
          className="absolute -left-20 top-16 w-[260px] h-[260px] rounded-full pointer-events-none blur-[80px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(232,86,0,0.45), transparent 60%)",
          }}
        />
        <div
          className="absolute right-[-80px] top-[40px] w-[280px] h-[280px] rounded-full pointer-events-none blur-[80px] opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(152,151,255,0.5), transparent 60%)",
          }}
        />
        {/* Decorative geometric shapes (like Kalungi) */}
        <div className="absolute top-[100px] right-[4%] pointer-events-none hidden md:block">
          <div className="w-14 h-14 rounded-full bg-[rgba(152,151,255,0.25)]" />
        </div>
        <div className="absolute top-[220px] right-[15%] pointer-events-none hidden md:block">
          <div
            className="w-20 h-20"
            style={{
              background: "rgba(152,151,255,0.18)",
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />
        </div>
        <div className="absolute top-[140px] left-[4%] pointer-events-none hidden md:block">
          <div
            className="w-24 h-24"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,86,0,0.3), rgba(232,86,0,0.05))",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-5 text-center flex flex-col items-center">
          <Section>
            <p className="text-sm font-semibold tracking-[0.15em] text-accent-orange mb-6">
              {post.date}
            </p>
            <h1
              className="font-semibold text-white leading-[110%] tracking-[-1.5px] mx-auto"
              style={{ fontSize: "clamp(32px, 5.2vw, 60px)", maxWidth: 900 }}
            >
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #E85600 0%, #9897FF 100%)",
                }}
              >
                {post.author.initial}
              </div>
              <p className="text-sm text-[rgba(255,255,255,0.7)] font-medium">
                {post.author.name}
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* ARTICLE BODY: 3-column layout */}
      <section className="relative w-full pb-24">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_260px] gap-10">
            {/* LEFT: TOC */}
            <div className="hidden lg:block">
              <div className="sticky top-[120px]">
                <TableOfContents items={tocItems} />
              </div>
            </div>

            {/* CENTER: Audio + Article + CTA */}
            <div className="min-w-0">
              {post.audio && (
                <AudioPlayer
                  title={post.audio.title}
                  durationLabel={post.audio.durationLabel}
                  text={audioText}
                />
              )}

              <article className="prose prose-invert max-w-none mt-2">
                <div className="flex flex-col gap-8 text-[15px] text-[rgba(255,255,255,0.72)] leading-[185%]">
                  {post.sections.map((section, i) => (
                    <div
                      key={i}
                      id={section.id}
                      className="flex flex-col gap-4 scroll-mt-24"
                    >
                      {section.heading && (
                        <h2
                          className="text-white font-semibold mt-4"
                          style={{
                            fontSize: "clamp(22px, 2.4vw, 30px)",
                            lineHeight: "125%",
                            letterSpacing: "-0.5px",
                          }}
                        >
                          {section.heading}
                        </h2>
                      )}
                      {section.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </article>

              {post.resources && post.resources.length > 0 && (
                <div className="mt-16 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgb(8,8,10)] p-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                    Resources & Further Reading
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {post.resources.map((r, i) => (
                      <li key={i} className="flex flex-col gap-1">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-orange hover:underline text-sm font-medium break-words"
                        >
                          {r.label}
                        </a>
                        {r.note && (
                          <span className="text-xs text-[rgba(255,255,255,0.45)] leading-[160%]">
                            {r.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <BlogCTA />
            </div>

            {/* RIGHT: Share + Subscribe */}
            <div className="hidden lg:block">
              <div className="sticky top-[120px] flex flex-col gap-8">
                <ShareArticle title={post.title} />
                <div className="h-px bg-[rgba(255,255,255,0.08)]" />
                <BlogSubscribe />
              </div>
            </div>

            {/* Mobile: share + subscribe stacked below article */}
            <div className="lg:hidden flex flex-col gap-8 mt-4">
              <div className="h-px bg-[rgba(255,255,255,0.08)]" />
              <ShareArticle title={post.title} />
              <div className="h-px bg-[rgba(255,255,255,0.08)]" />
              <BlogSubscribe />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
