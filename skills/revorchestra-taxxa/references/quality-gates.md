# Revorchestra Quality Gates

How the Review Agent scores, catches errors, and routes decisions.

## Gate 1: Compliance Check (Pass/Fail — instant reject on any failure)

These 8 gates run first. Any single failure = draft goes back to Messaging Agent. No score needed.

| # | Gate | Fail Condition |
|---|---|---|
| 1 | Pricing | Any mention of price, cost, €40, discounts |
| 2 | MRR/Revenue | Any exact revenue or customer count shared externally |
| 3 | ROI Claims | Unvalidated "save exactly X%" without source |
| 4 | Competitor Attacks | Naming a competitor negatively |
| 5 | Social Proof | Non-anonymized client name (unless Email 4 with approved rotation) |
| 6 | Spam Triggers | Contains: free, guarantee, act now, limited time, click here |
| 7 | Schedule | Targeting outside Tue-Thu 8-11am |
| 8 | Word Count | Outside 50-120 words |

**If all 8 pass → proceed to scoring.**

## Gate 2: Hallucination Check

Line by line, compare the draft against the research brief:

- Every company name, title, detail → must be in the brief
- Every trigger event → must have date + source in the brief
- Every metric or stat → must be sourced
- No invented case studies, quotes, or customer names

**If any hallucination found → instant reject with specific flag.**

## Gate 3: Quality Scoring (5 dimensions, 1-5 each)

| Dimension | Weight | What to check |
|---|---|---|
| **Factual Accuracy** | 30% | Does every claim trace to the research brief? |
| **Personalization** | 25% | Could this only be sent to THIS person at THIS company? |
| **Tone** | 20% | Smart colleague, not marketing bot? Insight-led? Direct? |
| **Clarity** | 15% | Scannable in 5 seconds? Single CTA? Plain text? |
| **Risk** | 10% | Would sending this embarrass Taxxa? Any edge cases? |

### Scoring Guide

**Score 5:** Exceptional. Nothing to improve.
**Score 4:** Strong. Minor polish possible but send-ready.
**Score 3:** Adequate. Specific issues to fix but salvageable.
**Score 2:** Weak. Multiple issues, needs significant rework.
**Score 1:** Bad. Violates core rules or is fundamentally wrong.

### Weighted Total

```
total = (accuracy × 0.30) + (personalization × 0.25) + (tone × 0.20) + (clarity × 0.15) + (risk × 0.10)
```

## Routing Decision

| Score | Route | What happens |
|---|---|---|
| **4.0 – 5.0** | → Human approval | Orchestrator presents draft to user |
| **3.0 – 3.9** | → Messaging Agent (revision) | Review Agent writes specific fix instructions |
| **Below 3.0** | → Orchestrator (reject) | Human decides whether to retry or abandon |

## Revision Feedback Rules

When routing back for revision, the Review Agent must:

1. **Be specific.** Not "opening needs work" → "Opening references Series B but brief says Series C"
2. **Be actionable.** Not "more personalized" → "Use the multi-office expansion trigger from the brief"
3. **Prioritize.** List the highest-impact fix first.
4. **Reference the rule.** "Violates drafting-playbook.md rule: no pricing in cold email"

**Max 1 revision cycle.** If it fails review twice → auto-reject to human.

## Review Agent Output Format

```yaml
review_report:
  compliance_gates: { pricing: pass, mrr: pass, ... }
  hallucination_flags: []
  scores:
    factual_accuracy: { score: 5, notes: "..." }
    personalization: { score: 4, notes: "..." }
    tone_and_style: { score: 5, notes: "..." }
    clarity: { score: 5, notes: "..." }
    risk: { score: 5, notes: "..." }
  weighted_total: 4.7
  decision: approve
  revision_feedback: ""
  risk_flags: []
```
