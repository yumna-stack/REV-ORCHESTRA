---
name: revorchestra-taxxa
description: >
  Revorchestra's orchestration knowledge layer. Defines how the multi-agent
  system qualifies accounts, constructs outbound, scores quality, and routes
  decisions for Taxxa AI's GTM operation. This is the operating logic that
  all Revorchestra agents follow — not a copy of Taxxa docs, but the
  orchestration rules built on top of them.
---

# Revorchestra Operating Knowledge

Revorchestra is the multi-agent GTM orchestration system for Taxxa AI. This skill defines how agents think, decide, and hand off work to each other.

## What Revorchestra Does

Revorchestra takes a target account and runs it through a 5-step agent pipeline:
1. **Qualify** — Is this account worth pursuing?
2. **Research** — What do we know and what triggers exist?
3. **Draft** — Write personalized outbound that earns a meeting
4. **Review** — Score quality, catch errors, enforce compliance
5. **Approve + Export** — Human signs off, output goes to Instantly/HubSpot

## How Agents Use This Knowledge

Each agent reads the reference files relevant to their step:

| Agent | Reads | Decides |
|---|---|---|
| Research Agent | `qualification-rules.md` | Is this account ICP-fit? What angles work? |
| Messaging Agent | `drafting-playbook.md` | How to construct the message for this firm type |
| Review Agent | `quality-gates.md` | Does this pass? What needs fixing? |
| Ops Agent | `export-specs.md` | How to format for Instantly and HubSpot |

## Operating Principles

1. **Every claim must trace to research.** No agent invents facts.
2. **Agents don't overlap.** Research doesn't draft. Messaging doesn't review.
3. **Quality gates are non-negotiable.** Failing a compliance gate = automatic reject.
4. **Human approves everything.** No outbound leaves without a person saying yes.
5. **Agents talk through structured handoffs.** YAML briefs, not freeform text.

## Taxxa Business Context

Revorchestra operates for Taxxa AI — an AI workspace for accounting, auditing, and payroll firms. Agents must understand:
- Taxxa sells to Nordic/European professional services firms (5-50 employees)
- The value prop is "multiply experts, don't replace them"
- Compliance, audit safety, and source citations are the key differentiators vs generic AI
- Pricing is never mentioned in cold outbound
- Social proof is always anonymized unless explicitly approved

For the full Taxxa business context, agents should reference the source files at:
`Taxxa Outbound Agents/context 🧠/` (company-product.md, icp-and-market.md, etc.)
