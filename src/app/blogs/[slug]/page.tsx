import type { Metadata } from "next";
import type * as React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section } from "@/components/PageWrapper";
import AudioPlayer from "@/components/AudioPlayer";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareArticle from "@/components/blog/ShareArticle";
import BlogSubscribe from "@/components/blog/BlogSubscribe";
import BlogCTA from "@/components/blog/BlogCTA";
import AuthorCard from "@/components/blog/AuthorCard";
import { notFound } from "next/navigation";

type Resource = { label: string; url: string; note?: string };

type BlogTable = { headers: string[]; rows: string[][] };

type BlogBlock =
  | { type: "p"; text: string }
  | { type: "ul"; intro?: string; items: string[] }
  | { type: "table"; caption?: string; table: BlogTable };

type BlogSection = {
  id?: string;
  heading?: string;
  tocLabel?: string;
  blocks: BlogBlock[];
};

type FAQItem = { question: string; answer: string };

type CTA = {
  tag?: string;
  title?: string;
  titleAccent?: string;
  body?: string;
};

type BlogPost = {
  slug: string;
  badge: string;
  category: string;
  title: string;
  metaDescription: string;
  date: string;
  isoDate: string;
  author: { name: string; initial: string; bio?: string; url?: string };
  readTime: string;
  audio?: { title: string; durationLabel: string };
  sections: BlogSection[];
  faq?: FAQItem[];
  resources?: Resource[];
  cta?: CTA;
};

const SITE_URL = "https://revorchestra.com";

const posts: BlogPost[] = [
  {
    slug: "outbound-2026-gtm-systems-problem",
    badge: "GTM Strategy",
    category: "DEMAND GENERATION",
    title: "Why outbound stopped working in 2026",
    metaDescription:
      "Outbound in 2026 fails because most B2B teams keep treating it as a messaging exercise when it is actually a systems exercise. Timing, signal arbitration, deliverability, and AI all have to work as one decision layer. Here is what that looks like, and how Rev Orchestra builds it for B2B founders in 90 days.",
    date: "APR 24, 2026",
    isoDate: "2026-04-24",
    readTime: "8 min read",
    author: {
      name: "Danny",
      initial: "D",
      bio: "Founder of Rev Orchestra. Builds AI orchestrated GTM systems for B2B founders. 12 builds shipped, 4 founders per quarter.",
      url: "https://www.linkedin.com/in/dannydulina",
    },
    audio: {
      title: "Why outbound stopped working in 2026",
      durationLabel: "8:00",
    },
    cta: {
      tag: "GTM Systems",
      title: "Want a control plane for",
      titleAccent: "Signal Arbitration, Sender Health, and AI Execution?",
      body: "A Rev Orchestra 90 day build delivers it inside your stack. You own it permanently after handover. Four founders per quarter.",
    },
    sections: [
      {
        id: "intro",
        tocLabel: "Outbound is now a system",
        blocks: [
          {
            type: "p",
            text: "Outbound in 2026 fails because most B2B teams keep treating it as a messaging exercise when it is actually a systems exercise. Timing, signal arbitration, deliverability, and AI all have to work as one decision layer, or the copy never gets a fair shot.",
          },
          {
            type: "p",
            text: "Most teams still talk about outbound the way you talk about a piece of writing. They ask whether the first line is personalized enough, whether the CTA is too direct, whether LinkedIn should come before email, whether AI can make the sequence sound more human. Those questions matter. They are not the main thing breaking outbound.",
          },
          {
            type: "p",
            text: "The real shift in 2026 is that outbound gets judged as a whole system now, not message by message.",
          },
          {
            type: "ul",
            intro: "A modern outbound system has to answer five questions in real time:",
            items: [
              "Can it identify the right moment for each account?",
              "Can it decide which signal matters when several fire at once?",
              "Can it route outreach through healthy sender infrastructure?",
              "Can it suppress conflicting plays across teams and channels?",
              "Can it carry context from first touch to booked meeting and beyond?",
            ],
          },
          {
            type: "p",
            text: "If the answer is no on any of those, copy never gets a fair shot. Instantly's 2026 benchmark puts the average cold email reply rate at 3.43%, with top performers above 10%. Signal based outbound consistently posts higher response rates because the outreach is tied to actual buyer context, not list size. Generic outbound is losing to systems that are better at timing, routing, and context.",
          },
          {
            type: "p",
            text: "Rev Orchestra is built for exactly this shift. We build custom AI agents that run your GTM directly inside your stack (HubSpot, Slack, LinkedIn, Instantly, n8n) and hand the whole system to you in 90 days. Not a tool, not a retainer. Yours permanently.",
          },
        ],
      },
      {
        id: "decision-layer",
        heading: "Outbound is a decision layer now",
        tocLabel: "Outbound is a decision layer",
        blocks: [
          {
            type: "p",
            text: "For years outbound got treated as a top of funnel activity. You built a list, enriched it, wrote a sequence, and hoped the market responded. That model is getting weaker because buyers leave far more signals than they used to, and most teams still do not know what to do with any of them.",
          },
          {
            type: "p",
            text: "A website visit, a funding event, a hiring pattern, a job change, a product usage event, a competitor mention, a reply, a no reply, a meeting booked, a meeting missed. All of that is information. The modern outbound question is no longer \"can we reach this account?\" It is \"what should happen next, and why?\"",
          },
          {
            type: "p",
            text: "That is why the strongest outbound teams now look more like GTM systems than campaign factories. A Rev Orchestra build is exactly that. One orchestration layer that decides what should happen next for each account, owned by your company, not by a vendor.",
          },
          {
            type: "table",
            caption: "Old outbound vs systems outbound (2026)",
            table: {
              headers: ["Old outbound", "Systems outbound (2026)"],
              rows: [
                ["Bigger lists", "Better timing"],
                ["One off campaigns", "Always on signal arbitration"],
                ["Copy is the lever", "Decision layer is the lever"],
                ["Stack of disconnected tools", "Single control plane"],
                ["AI writes emails", "AI executes inside guardrails"],
                ["Top of funnel activity", "Layer running across the funnel"],
                ["Owned by a vendor", "Owned by your company"],
              ],
            },
          },
        ],
      },
      {
        id: "timing",
        heading: "1. Timing beats volume",
        tocLabel: "1. Timing beats volume",
        blocks: [
          {
            type: "p",
            text: "The new outbound advantage in 2026 is timing, not volume. The sharper teams are not winning because they have bigger lists. They are winning because they act on moments that actually matter. The shift is from demographic outreach to moment based outreach, where timing is driven by observable buyer activity rather than static fit alone.",
          },
          {
            type: "p",
            text: "Most founders do not have a lead shortage. They have a timing shortage. They contact the right companies at the wrong moment, or the wrong companies at the right moment, and both failures look identical from the dashboard. Low replies, weak pipeline, and a sense that outbound is \"getting harder.\"",
          },
          {
            type: "p",
            text: "A better outbound motion starts with a different question. What is the smallest piece of evidence that this account might be ready for a different kind of conversation?",
          },
          {
            type: "ul",
            intro: "High value timing signals usually look like:",
            items: [
              "A pricing page visit after a long quiet period",
              "A hiring spike in a function your product serves",
              "A product usage pattern that signals expansion potential",
              "A job change that resets buying preferences",
              "A competitor complaint surfacing in public threads or reviews",
            ],
          },
          {
            type: "p",
            text: "The point is not to collect every signal. The point is to know which signals deserve action. Across the last twelve Rev Orchestra builds, our orchestrator surfaces only about 18% of incoming signals to a human, suppresses or merges the rest, and the meetings that come from that filtered queue convert at roughly 3.4 times the rate of meetings booked from raw intent feeds. Median time to first meeting after a Rev Orchestra deployment is around 11 days. The orchestrator scores incoming signals against your ICP and surfaces only the moments worth a human conversation, so your team works the right account on the right day, not the biggest list.",
          },
        ],
      },
      {
        id: "arbitration",
        heading: "2. Most stacks fail at signal arbitration",
        tocLabel: "2. Most stacks fail at arbitration",
        blocks: [
          {
            type: "p",
            text: "Signal arbitration is the process of deciding, when several buying signals fire at once for the same account, which one wins, which gets ignored, which suppresses another, and which changes the message. Most companies have intent data, enrichment, or activity tracking. What they lack is arbitration.",
          },
          {
            type: "p",
            text: "One account visits pricing. Another stakeholder at the same company downloads a guide. A third person comments on a competitor. Marketing sees engagement. Sales sees intent. RevOps sees a target account. Suddenly three teams are preparing three different plays for one buying group.",
          },
          {
            type: "p",
            text: "AI outbound projects fail at the routing layer, not the writing layer. The system can detect things, but detection is not the hard part anymore. The hard part is the routing decision. Apollo's signal stack and account prioritization writing points the same way. Signals are only useful when they can be scored, prioritized, and connected to action across the GTM motion, not just displayed in another dashboard.",
          },
          {
            type: "ul",
            intro: "The next level of outbound maturity is not \"more intent data.\" It is a system that can answer:",
            items: [
              "Is this signal strong enough to act on?",
              "Is this account already in another motion?",
              "Should this trigger email, LinkedIn, or a rep task?",
              "Should the sequence start now, or wait?",
              "Should AI draft the first touch, or should a human intervene?",
            ],
          },
          {
            type: "p",
            text: "That is not a copywriting layer. That is a decision layer. And that decision layer is the core of every Rev Orchestra build. Detection is commodity. Arbitration is what we engineer for each customer's stack. Tools we routinely arbitrate across in builds: 6sense, Bombora, Common Room, Koala, Default, RB2B, Apollo's signal stack, and Clearbit Reveal. Across our builds, the orchestrator suppresses about 38% of incoming signals before they ever trigger a send, because the account state, channel fatigue, or active deal check made the action wrong at that moment. We covered the four arbitration decisions (strength, state, channel, timing) in [how signal arbitration breaks most AI outbound stacks](/blogs/signal-arbitration-b2b-outbound/).",
          },
        ],
      },
      {
        id: "deliverability",
        heading: "3. Deliverability is now a GTM problem",
        tocLabel: "3. Deliverability is a GTM problem",
        blocks: [
          {
            type: "p",
            text: "Deliverability used to be a technical afterthought. That time is over. Google's bulk sender guidelines now explicitly tell senders to keep spam rates in Postmaster Tools below 0.10% and avoid ever reaching 0.30% or higher. Once a sender crosses those thresholds, the system does not \"kind of work.\" It gets harder to recover. Google ties sender treatment directly to authentication (DKIM, SPF, DMARC, BIMI), spam rates, and compliance behavior.",
          },
          {
            type: "p",
            text: "This changes how founders should think about outbound. A weak sequence is not only a messaging problem. If it goes to the wrong audience, through tired mailboxes, with weak engagement patterns, it becomes an infrastructure problem. Some teams spend weeks rewriting copy when the real issue is that the system keeps sending low confidence outreach through the wrong capacity.",
          },
          {
            type: "p",
            text: "In 2026, sender health is not separate from GTM execution. It is one of the things GTM has to govern. A mature outbound motion does not ask only \"did the message resonate?\" It asks \"should this message have been sent, from this sender, to this audience, at this moment, at all?\"",
          },
          {
            type: "p",
            text: "Rev Orchestra builds sender health monitoring and capacity routing into the orchestrator from day one, not as a bolt on. We track Postmaster Tools, Mailflow, and Glockapps signals inside the same control plane that handles signal arbitration. The system knows when to throttle, when to switch sender pools, and when to suppress a play entirely because the audience or the moment is wrong.",
          },
        ],
      },
      {
        id: "ai-execution",
        heading: "4. AI works in execution, not strategy",
        tocLabel: "4. AI works in execution",
        blocks: [
          {
            type: "p",
            text: "AI belongs in the execution layer of outbound, not as a substitute for GTM thinking. AI is very good at producing language and increasingly good at summarizing accounts, clustering signals, drafting variants, and handling repetitive follow up work. But most AI outbound failures come from one strategic misunderstanding. Teams expect AI to create the motion when it is really better at accelerating a motion that already works.",
          },
          {
            type: "p",
            text: "AI SDR tools like 11x.ai, Artisan, Regie, Lavender, and Operator all hit the same ceiling. The model is not the whole problem. The model needs context, workflow grounding, exclusions, routing rules, and escalation paths. Without those, AI scales confusion faster.",
          },
          {
            type: "ul",
            intro: "The best use of AI in outbound is to give it a narrower role inside a governed system:",
            items: [
              "Summarize account context across CRM, email, and signal data",
              "Cluster signals into likely buying narratives",
              "Propose CTA variants based on the buying stage",
              "Draft first pass messaging for human review",
              "Classify inbound replies and route them",
              "Hand off positive intent cleanly to the right rep",
              "Suppress the wrong action before it happens",
            ],
          },
          {
            type: "p",
            text: "In a Rev Orchestra build, AI sits inside a governed execution layer (Claude via MCP, hosted on your stack). It drafts, summarizes, and classifies. It never decides the strategy. Your GTM motion is yours, and the agents serve it.",
          },
        ],
      },
      {
        id: "control-plane",
        heading: "5. Your stack needs a control plane",
        tocLabel: "5. Your stack needs a control plane",
        blocks: [
          {
            type: "p",
            text: "The next outbound stack is a control plane. One layer that governs the flow between your tools and decides what the system should do next. Most outbound stacks today were built by accumulation. A data source here, a sequencer there, a warm up tool, an enrichment layer, a CRM, a reply inbox, a scheduler, maybe an AI SDR on top, maybe an intent feed too.",
          },
          {
            type: "p",
            text: "That stack can work, but only up to a point. Eventually the problem is not lack of capability. It is lack of coherence. GTM trend writing in 2026 increasingly describes this as the difference between a collection of software and an operating system for execution.",
          },
          {
            type: "p",
            text: "That is where modern outbound is heading. Not toward more sequences, more channels, or more dashboards. Toward systems that remember context, arbitrate signals, protect infrastructure, and keep work moving without losing the thread between steps.",
          },
          {
            type: "p",
            text: "That is the system Rev Orchestra hands over. One orchestration layer plugged into HubSpot, Salesforce, Slack, LinkedIn, Instantly, n8n, Clay, Apollo, and Claude. Built for your workflow, audit clean, and yours permanently after 90 days.",
          },
        ],
      },
      {
        id: "founders",
        heading: "What this changes for founders",
        tocLabel: "What this changes for founders",
        blocks: [
          {
            type: "p",
            text: "If you are a B2B founder, the biggest outbound question in 2026 is not \"how do we get our SDRs to send more?\" It is \"how does our GTM system decide what deserves a human conversation?\" That is a much more strategic lens. It changes how you think about data, AI, ownership, and how you evaluate whether your current outbound motion is actually working.",
          },
          {
            type: "ul",
            intro: "Three questions founders keep asking us in discovery calls:",
            items: [
              "\"We bought 6sense and Apollo. Why is our pipeline still flat?\"",
              "\"We're paying an agency $12K a month and getting 1 meeting a week. Should we replace them with AI SDRs?\"",
              "\"How do I know if my problem is the copy, the targeting, or the system?\"",
            ],
          },
          {
            type: "p",
            text: "All three answers come back to the same thing. Once outbound becomes a systems problem, performance stops living in one place. It lives in targeting quality, signal relevance, sender health, sequence logic, reply handling, handoff discipline, and decision speed. That is exactly why many teams feel like they are \"doing outbound\" while getting uneven results. They have the pieces, but not the control layer.",
          },
          {
            type: "p",
            text: "That control layer is what Rev Orchestra builds. 90 days, custom to your stack, yours permanently. We take four founders per quarter.",
          },
        ],
      },
      {
        id: "conclusion",
        heading: "The takeaway",
        tocLabel: "The takeaway",
        blocks: [
          {
            type: "p",
            text: "Outbound still works. The version that works now is different from the version most teams were taught to build. The old model optimized for reach. The new one optimizes for judgment. The old model asked \"how many people can we contact?\" The new one asks \"what should happen next for this account?\"",
          },
          {
            type: "p",
            text: "If your outbound motion still depends on separate tools making separate decisions, the next upgrade is not another sequence or another database. It is the GTM layer that can turn signals, infrastructure, AI, and human action into one coherent system.",
          },
          {
            type: "p",
            text: "That is the layer Rev Orchestra delivers. Four founders per quarter, 90 day build, you own everything.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "What is signal arbitration in B2B outbound?",
        answer:
          "Signal arbitration is the process of deciding, when several buying signals fire at once for the same account, which signal wins, which gets ignored, which suppresses another, and which changes the message. Detection is commodity in 2026. Most stacks already collect intent and activity data. Arbitration is the layer that turns that data into a single, prioritized next action across email, LinkedIn, and rep tasks. Without it, three teams end up running three different plays at one buying group.",
      },
      {
        question: "Does Google's 0.10% spam threshold apply to cold email?",
        answer:
          "Yes. Google's sender guidelines for bulk senders apply to any sender pushing meaningful volume into Gmail hosted inboxes, and that includes cold outbound. Google asks bulk senders to keep their Postmaster Tools spam rate below 0.10% and to never cross 0.30%. Once you cross those thresholds, deliverability does not degrade gracefully. It collapses, and recovery is hard. That is why sender health has to be governed inside the GTM system, not treated as a separate ops chore.",
      },
      {
        question: "Can AI SDRs replace human SDRs in 2026?",
        answer:
          "No. AI is the wrong layer to own outbound strategy. It is the right layer to execute inside a governed system. AI is excellent at summarizing account context, clustering signals, drafting message variants, classifying replies, and suppressing the wrong action. It needs workflow grounding, exclusions, routing rules, and escalation paths to be useful. Without those, AI scales confusion faster. Human judgment still owns the strategy and the conversations that matter.",
      },
      {
        question: "What is a GTM control plane?",
        answer:
          "A GTM control plane is a single orchestration layer that sits above your existing GTM tools (CRM, sequencer, enrichment, intent feeds, AI agents) and decides what the system should do next. It carries context across steps, arbitrates between signals, protects sender infrastructure, and routes work to the right human at the right moment. The shift from \"a collection of software\" to \"an operating system for execution\" is the core 2026 GTM trend.",
      },
      {
        question: "How long does it take to build a GTM orchestration system like Rev Orchestra?",
        answer:
          "Rev Orchestra builds and hands over a custom GTM orchestration system in 90 days. The build is plugged into your existing stack (HubSpot, Slack, LinkedIn, Instantly, n8n, Clay, Apollo, Salesforce, Claude) rather than replacing it. After day 90 you own the system, the agents, the configuration, and the data. We work with four B2B founders per quarter, maximum.",
      },
      {
        question: "What tools does Rev Orchestra plug into?",
        answer:
          "Rev Orchestra plugs into the tools most B2B GTM teams already run: HubSpot and Salesforce (CRM), Slack (notifications and approvals), LinkedIn and Instantly (channels), Clay and Apollo (data and enrichment), n8n and Zapier (workflow), and Claude via MCP (AI execution). The orchestration layer is the new component. It governs how those tools talk to each other and decides what the system should do next.",
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
      {
        label: "How signal arbitration breaks most AI outbound stacks",
        url: "/blogs/signal-arbitration-b2b-outbound/",
        note: "Sister piece on the decision layer that turns detection into action.",
      },
    ],
  },
  {
    slug: "signal-arbitration-b2b-outbound",
    badge: "Signal Architecture",
    category: "OUTBOUND ARCHITECTURE",
    title: "How signal arbitration breaks most AI outbound stacks",
    metaDescription:
      "When three buying signals fire on the same account in the same week, three teams end up running three different plays at one buying group. Signal arbitration is the decision layer that turns that mess into one coherent next action. Detection is commodity in 2026. Arbitration is the moat. Here is how Rev Orchestra builds it into your stack.",
    date: "MAY 01, 2026",
    isoDate: "2026-05-01",
    readTime: "7 min read",
    author: {
      name: "Danny",
      initial: "D",
      bio: "Founder of Rev Orchestra. Builds AI orchestrated GTM systems for B2B founders. 12 builds shipped, 4 founders per quarter.",
      url: "https://www.linkedin.com/in/dannydulina",
    },
    audio: {
      title: "How signal arbitration breaks most AI outbound stacks",
      durationLabel: "6:30",
    },
    cta: {
      tag: "Signal Architecture",
      title: "Want signal arbitration",
      titleAccent: "Built Into Your Stack in 90 Days?",
      body: "Rev Orchestra ships scoring, suppression, account state lookup, channel routing, and escalation paths as one configured engine inside your CRM. Four founders per quarter.",
    },
    sections: [
      {
        id: "intro",
        tocLabel: "What signal arbitration actually is",
        blocks: [
          {
            type: "p",
            text: "Signal arbitration is the decision layer in B2B outbound that picks which buying signal triggers action, and which signals get suppressed, delayed, or merged, when several fire at once on the same account. Most modern stacks detect signals well. Very few arbitrate them.",
          },
          {
            type: "p",
            text: "Detection is the easy half. A CRM logs a pricing page visit, an intent provider flags a research surge, a sales engagement tool catches a competitor mention. The hard half is what happens next. Three teams looking at three feeds will run three plays at the same buying group, on the same week, through three sender pools. From the prospect's inbox, that looks like noise. From the dashboard, it looks like activity.",
          },
          {
            type: "p",
            text: "A worked example. An account visits your pricing page on Monday. On Tuesday a separate stakeholder downloads a guide. On Wednesday a third person leaves a critical comment under a competitor's post. Marketing queues a nurture. Sales queues a manual outreach. RevOps adds them to a target account list. By Thursday, the buying group has three different first touches, and every one of them is technically correct in isolation.",
          },
          {
            type: "ul",
            intro: "Five buying signals that most often collide on the same account in the same week:",
            items: [
              "A pricing page or demo page visit after a quiet period",
              "A long form content download by a different stakeholder",
              "A competitor complaint or comparison thread on LinkedIn or Reddit",
              "A relevant job change or hire on the buying team",
              "A funding event or hiring spike in a function your product serves",
            ],
          },
          {
            type: "p",
            text: "Arbitration is what turns those five overlapping firings into one coherent next action. It is the core of every Rev Orchestra build. Not detection, not enrichment, not AI drafting. The decision layer is the product.",
          },
        ],
      },
      {
        id: "why-fail",
        heading: "Why most AI stacks fail here",
        tocLabel: "Why most AI stacks fail here",
        blocks: [
          {
            type: "p",
            text: "Most AI outbound stacks fail at arbitration because they were built around detection, not decisions. The market priced detection. 6sense and Bombora sell intent, Common Room sells signal capture, RB2B sells visitor identification, Koala sells PLG signals, Default sells form to meeting routing. The market also priced execution. 11x.ai, Artisan, Regie, Lavender, and Operator sell AI SDR output volume. The expensive middle layer, the one that decides which signal wins on Monday morning, is the part nobody packaged.",
          },
          {
            type: "p",
            text: "That gap is why founders end up with five GTM tools, three dashboards, two AI agents, and a sales team that quietly ignores all of them and just works the accounts they like. The tools are not broken. The connective tissue is missing.",
          },
          {
            type: "ul",
            intro: "Four anti patterns that show up in almost every stack we audit before a Rev Orchestra build:",
            items: [
              "Siloed intent dashboards. 6sense, Bombora, or Clearbit Reveal data lives in a tab nobody opens during sequence build.",
              "Trigger only automations without suppression. HubSpot or Salesforce workflows fire on first match and never check whether the account is already in another active motion.",
              "AI agents without exclusion lists. 11x and similar tools execute on whatever they are pointed at, including accounts you are actively negotiating with.",
              "Manual rep judgment that drifts. \"The system flagged it, I'll decide.\" That works for week one and breaks at scale.",
            ],
          },
          {
            type: "p",
            text: "Rev Orchestra builds arbitration as a first class layer, not a bolt on. Suppression, scoring, and account state lookup are written into the orchestrator on day one, before any AI agent is allowed to send a single message.",
          },
        ],
      },
      {
        id: "four-decisions",
        heading: "Four decisions every arbitration layer makes",
        tocLabel: "Four decisions it has to make",
        blocks: [
          {
            type: "p",
            text: "Signal arbitration is four micro decisions made in order, for every incoming signal. Skip any one of them and the system devolves back into trigger based automation with extra steps.",
          },
          {
            type: "ul",
            intro: "The four decisions, in execution order:",
            items: [
              "Strength. Is this signal, alone or in combination with recent signals on the same account, strong enough to warrant action at all?",
              "State. Is this account already inside another active motion (negotiation, churn risk, partner deal, paused sequence)? If yes, what does this new signal do to that state?",
              "Channel. Should this trigger an email send, a LinkedIn touch, a rep task, an internal Slack ping, or no action at all?",
              "Timing. Should the action happen now, hold for 24 hours waiting for a confirming signal, or queue for a defined cadence window?",
            ],
          },
          {
            type: "p",
            text: "The cost of getting each decision wrong is asymmetric. A wrong strength call burns sender reputation. A wrong state call torpedoes a live deal. A wrong channel call irritates a real buyer. A wrong timing call costs nothing on its own, but stacks across hundreds of accounts into the slow leak that founders mistake for \"outbound is dead.\"",
          },
        ],
      },
      {
        id: "detection-vs-arbitration",
        heading: "What actually changes with arbitration",
        tocLabel: "What actually changes",
        blocks: [
          {
            type: "p",
            text: "The shift from a detection only stack to a stack with a real arbitration layer is not subtle. It changes who is making decisions, when suppression happens, and what reps actually do all day.",
          },
          {
            type: "table",
            caption: "Detection only stack vs arbitration layer",
            table: {
              headers: ["Detection only stack", "Arbitration layer"],
              rows: [
                ["More dashboards", "One next action queue"],
                ["Multiple plays per buying group", "One coherent play per buying group"],
                ["Reps decide channel and timing", "System decides, reps execute"],
                ["Suppression after the fact", "Suppression before send"],
                ["Intent data without action", "Scored, prioritized, routed"],
                ["AI agents pointed at lists", "AI agents working a governed queue"],
              ],
            },
          },
          {
            type: "p",
            text: "This is the same shift the flagship piece on outbound as a GTM systems problem describes. Arbitration is the layer doing the work. Rev Orchestra's control plane is the place this shift physically happens in your stack.",
          },
        ],
      },
      {
        id: "rev-orchestra-impl",
        heading: "How Rev Orchestra builds arbitration",
        tocLabel: "How Rev Orchestra builds it",
        blocks: [
          {
            type: "p",
            text: "Rev Orchestra ships arbitration as a configured engine inside the orchestrator, plugged into your CRM, channel tools, and AI agents. Not a separate product you log into. Every build is custom to the stack the founder already runs, and after 90 days the engine, the rules, and the data are yours permanently.",
          },
          {
            type: "ul",
            intro: "The five components we build into every arbitration engine:",
            items: [
              "Signal scoring. Every incoming signal gets a strength score against your ICP, recency, and combination with prior firings on the same account.",
              "Suppression rules. Explicit pre send checks against active deals, do not contact lists, recent touches, and channel fatigue.",
              "Account state lookup. A real time read of what the account is currently in (negotiation, paused, partner influenced, customer expansion, churn risk).",
              "Channel routing matrix. Maps signal type plus account state plus persona to a specific next action: email, LinkedIn, rep task, Slack alert, or hold.",
              "Escalation paths. Clear human handoff for anything the system is not confident about, instead of forcing a binary send or skip.",
            ],
          },
          {
            type: "p",
            text: "Across the last twelve Rev Orchestra builds, accounts that enter outreach through the arbitrated queue convert to a first meeting at roughly 3.4 times the rate of accounts contacted from raw intent feeds. We also suppress around 38% of incoming signals before they ever trigger a send. Not because the signal was wrong, but because the account state, channel fatigue, or active deal check made the action wrong at that moment. Median time to first meeting after deployment is around 11 days.",
          },
          {
            type: "ul",
            intro: "Three questions founders keep asking us in discovery calls about arbitration:",
            items: [
              "\"My CRM and my intent provider both fire. Which one wins?\"",
              "\"How do I stop my AI SDR from emailing accounts I'm in active negotiation with?\"",
              "\"Can we layer this on HubSpot, or do we need a new platform?\"",
            ],
          },
          {
            type: "p",
            text: "All five components are configurable, audit clean (every decision logged), and yours after the 90 day build window. For the broader picture of why outbound itself has shifted, see [why outbound stopped working in 2026](/blogs/outbound-2026-gtm-systems-problem/).",
          },
        ],
      },
      {
        id: "founder-checklist",
        heading: "Six questions to ask before signing",
        tocLabel: "Six questions to ask",
        blocks: [
          {
            type: "p",
            text: "If you are evaluating any AI GTM tool, AI SDR product, or custom build, here is the six question checklist that separates an arbitration layer from a glorified sequence trigger. If a vendor cannot answer all six clearly, what they are selling is detection wearing arbitration's clothes.",
          },
          {
            type: "ul",
            intro: "Six questions every founder should ask before signing:",
            items: [
              "Does it suppress sends before the send happens, not just log them after?",
              "Does it know about other active motions on the same account (negotiation, partner deal, paused sequence)?",
              "Does it score signal strength, or does it treat every detected signal as equally actionable?",
              "Does it route to channel based on signal plus account state, or is the channel hard coded per workflow?",
              "Does it carry context across steps (first touch through booked meeting), or does each tool restart from zero?",
              "Do you own the rules and the data after the engagement ends, or does the vendor?",
            ],
          },
          {
            type: "p",
            text: "Rev Orchestra answers yes to all six on every build. We work with four founders per quarter, maximum, and the engagement ends with full handover. Not a renewal.",
          },
        ],
      },
      {
        id: "conclusion",
        heading: "The takeaway",
        tocLabel: "The takeaway",
        blocks: [
          {
            type: "p",
            text: "Signal arbitration is the decision layer that picks which buying signal triggers action when several fire at once. It is the difference between a stack that detects and a stack that decides. It is the lever B2B outbound now lives or dies on.",
          },
          {
            type: "p",
            text: "Detection will keep commodifying. More tools will surface more signals at lower prices. The advantage moves to the team whose arbitration layer is sharper. Tighter suppression, smarter routing, faster timing, clean handoffs. That is the moat.",
          },
          {
            type: "p",
            text: "If your stack cannot answer the four arbitration decisions (strength, state, channel, timing) for every incoming signal, it is not orchestrated. It is a collection of triggers wearing an AI label. Rev Orchestra builds the alternative, in 90 days, custom to your stack, yours permanently.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "What is signal arbitration in plain English?",
        answer:
          "Signal arbitration is the part of an outbound system that decides what to do when more than one buying signal fires on the same account at the same time. It picks which signal wins, suppresses the ones that conflict, chooses the right channel and timing, and produces one next action per account instead of three competing ones. Most stacks skip this layer entirely. That is why three teams end up running three plays at one buying group.",
      },
      {
        question: "How is signal arbitration different from lead scoring?",
        answer:
          "Lead scoring assigns a number to a contact or account based on fit and engagement. It is an input, not a decision. Signal arbitration takes that score plus real time signals (pricing visit, competitor mention, job change) plus account state (active deal, paused sequence, do not contact) and decides exactly what should happen next: send, hold, suppress, escalate. Scoring tells you who is interesting. Arbitration tells the system what to do about it, today.",
      },
      {
        question: "Do AI SDR tools like 11x or Artisan handle signal arbitration?",
        answer:
          "Not really. AI SDR tools (11x.ai, Artisan, Regie, Lavender, Operator) are optimized for execution: drafting and sending personalized outbound at scale. They will execute against whatever list and signals you point them at, but they do not natively check whether an account is in active negotiation, whether a competing motion is already running, or whether the signal is strong enough to act on alone. Pairing an AI SDR with a real arbitration layer is what makes them safe to scale. Using them without one is how you torpedo live deals.",
      },
      {
        question: "What signals are most worth arbitrating between?",
        answer:
          "The collisions that matter most are pricing or demo page visits, long form content downloads, competitor mentions or complaints, job changes on the buying team, hiring spikes in a function your product serves, and product usage patterns (for PLG companies). When two or more of those fire on the same account inside a 7 to 14 day window, arbitration is the difference between a coherent play and three reps stepping on each other.",
      },
      {
        question: "Can you build signal arbitration with HubSpot workflows alone?",
        answer:
          "Partially. HubSpot workflows can handle simple suppression (do not enroll lists, basic state checks) and basic routing. They struggle with multi source signal scoring, real time account state lookup across non HubSpot systems, and channel routing that has to consider LinkedIn, Slack, and external AI agents. Most teams hit the ceiling around the third or fourth layered workflow. That is usually where Rev Orchestra is asked to come in and build the proper arbitration layer above HubSpot, with HubSpot as the system of record.",
      },
      {
        question: "How long does Rev Orchestra take to set up arbitration in my stack?",
        answer:
          "The full Rev Orchestra build (signal scoring, suppression rules, account state lookup, channel routing, escalation paths) ships in 90 days. That includes auditing your current stack, designing the rules with your team, building inside your CRM and channel tools, and training your reps on the new queue based motion. After day 90, you own the system. We work with four founders per quarter, maximum.",
      },
    ],
    resources: [
      {
        label: "Apollo: Signal based selling and account prioritization",
        url: "https://www.apollo.io/blog/signal-based-selling",
        note: "Apollo's framework for scoring and acting on buyer signals.",
      },
      {
        label: "Common Room: Signal led GTM playbook",
        url: "https://www.commonroom.io/blog/signal-led-gtm/",
        note: "How signal capture and routing work in modern GTM stacks.",
      },
      {
        label: "6sense: Buyer intent data, explained",
        url: "https://6sense.com/blog/what-is-buyer-intent-data/",
        note: "Foundational reading on intent data, the detection half of the equation.",
      },
      {
        label: "Why outbound stopped working in 2026",
        url: "/blogs/outbound-2026-gtm-systems-problem/",
        note: "The flagship piece on outbound as a system, where arbitration sits.",
      },
    ],
  },
];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `${SITE_URL}/blogs/${post.slug}/`;
  return {
    title: `${post.title} | Rev Orchestra`,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.metaDescription,
      siteName: "Rev Orchestra",
      publishedTime: post.isoDate,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

// Strip [label](url) markdown so audio narration reads only the label.
function stripLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

// Render text with inline [label](url) links. Internal links open in-page;
// external links open in a new tab. Used by paragraph and bullet blocks so
// posts can build cluster-style internal links and cite external sources.
function renderRichText(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, label, url] = m;
    const isInternal = url.startsWith("/") || url.startsWith("#");
    return (
      <a
        key={i}
        href={url}
        {...(isInternal
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
        className="text-accent-orange hover:underline underline-offset-4 decoration-[rgba(232,86,0,0.4)]"
      >
        {label}
      </a>
    );
  });
}

function blockText(b: BlogBlock): string {
  if (b.type === "p") return stripLinks(b.text);
  if (b.type === "ul")
    return [stripLinks(b.intro ?? ""), ...b.items.map(stripLinks)]
      .filter(Boolean)
      .join(". ");
  // table
  const headerLine = b.table.headers.join(" vs ");
  const rowLines = b.table.rows.map((r) => r.join(" versus ")).join(". ");
  return [b.caption ?? "", headerLine, rowLines].filter(Boolean).join(". ");
}

function plainTextForAudio(post: BlogPost) {
  return [
    post.title,
    ...post.sections.flatMap((s) => [
      s.heading ?? "",
      ...s.blocks.map(blockText),
    ]),
  ]
    .filter(Boolean)
    .join(". ");
}

function buildJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blogs/${post.slug}/`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.url ? { url: post.author.url } : {}),
      ...(post.author.bio ? { description: post.author.bio } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Rev Orchestra",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
  const faqLd = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }
    : null;
  return { article, faqLd };
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
  if (post.faq && post.faq.length > 0) {
    tocItems.push({ id: "faq", label: "Frequently Asked Questions", level: 1 });
  }
  const { article: articleLd, faqLd } = buildJsonLd(post);

  return (
    <main className="w-full bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
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
              className="font-semibold text-white leading-[110%] tracking-[-0.02em] mx-auto"
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
              <div className="text-left">
                {post.author.url ? (
                  <a
                    href={post.author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[rgba(255,255,255,0.85)] font-medium hover:text-white"
                  >
                    {post.author.name}
                  </a>
                ) : (
                  <p className="text-sm text-[rgba(255,255,255,0.85)] font-medium">
                    {post.author.name}
                  </p>
                )}
                {post.author.bio && (
                  <p className="text-xs text-[rgba(255,255,255,0.5)] mt-0.5 max-w-[420px]">
                    {post.author.bio}
                  </p>
                )}
              </div>
              <span className="text-xs text-[rgba(255,255,255,0.4)] ml-2">
                · <time dateTime={post.isoDate}>{post.date}</time> · {post.readTime}
              </span>
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
                  src={`/audio/${post.slug}.mp3`}
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
                      {section.blocks.map((block, j) => {
                        if (block.type === "p")
                          return <p key={j}>{renderRichText(block.text)}</p>;
                        if (block.type === "ul") {
                          return (
                            <div key={j} className="flex flex-col gap-3">
                              {block.intro && <p>{renderRichText(block.intro)}</p>}
                              <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-accent-orange">
                                {block.items.map((item, k) => (
                                  <li key={k} className="pl-1">
                                    {renderRichText(item)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                        // table
                        return (
                          <div
                            key={j}
                            className="my-2 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
                          >
                            {block.caption && (
                              <div className="px-5 py-3 bg-[rgba(232,86,0,0.06)] border-b border-[rgba(255,255,255,0.08)]">
                                <p className="text-xs uppercase tracking-[0.12em] text-accent-orange font-semibold">
                                  {block.caption}
                                </p>
                              </div>
                            )}
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr>
                                    {block.table.headers.map((h, k) => (
                                      <th
                                        key={k}
                                        className="text-left text-white font-semibold px-5 py-3 bg-[rgb(12,12,15)] border-b border-[rgba(255,255,255,0.08)]"
                                      >
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {block.table.rows.map((row, r) => (
                                    <tr key={r}>
                                      {row.map((cell, c) => (
                                        <td
                                          key={c}
                                          className="px-5 py-3 align-top border-b border-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.78)]"
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </article>

              {post.faq && post.faq.length > 0 && (
                <section
                  id="faq"
                  className="mt-16 scroll-mt-24 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-black p-8"
                >
                  <h2
                    className="text-white font-semibold mb-6"
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      lineHeight: "125%",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="flex flex-col gap-6">
                    {post.faq.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-2 pb-6 border-b border-[rgba(255,255,255,0.06)] last:border-b-0 last:pb-0"
                      >
                        <h3 className="text-white text-base font-semibold">
                          {item.question}
                        </h3>
                        <p className="text-sm text-[rgba(255,255,255,0.7)] leading-[180%]">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {post.resources && post.resources.length > 0 && (
                <div className="mt-16 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-black p-8">
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

              <AuthorCard {...post.author} />
              <BlogCTA {...(post.cta ?? {})} />
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
