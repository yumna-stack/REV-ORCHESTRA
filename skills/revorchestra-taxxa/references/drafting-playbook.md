# Revorchestra Drafting Playbook

How the Messaging Agent constructs outbound from a research brief.

## The Formula

Every Revorchestra outbound email follows one formula:

```
PERSONALIZED HOOK (their situation)
  + PROBLEM (what's costing them)
  + BRIDGE (how Taxxa fixes it)
  + SOFT CTA (low-friction ask)
```

That's it. No product dumps. No feature lists. No "synergy" words.

## Sequence Structure

The orchestrator requests one email at a time. The position in the sequence changes the approach:

| Position | Day | Approach | Hook Type |
|---|---|---|---|
| Email 1: Hook | Day 1 | Insight-led, open with their situation | Trigger or pain point |
| Email 2: Value | Day 4 | Proof point, differentiation | "2 hours → 20 minutes" |
| Email 3: Insight | Day 8 | Industry trend, thought leadership | "Multiplying experts, not replacing" |
| Email 4: Social proof | Day 14 | Named client story (matched by Research Agent) | Rantalainen/Win-Win/etc. |
| Email 5: Breakup | Day 22 | Graceful exit, low pressure | "Should I close the loop?" |

## Construction Rules

### Opening Line (MANDATORY personalization)
Pick the highest-impact option from the research brief:

1. **Best:** Reference a specific trigger ("I saw Revideco just expanded the team and is pushing into digital advisory")
2. **Good:** Reference firm specialty ("Great to see what you're building in audit and advisory")
3. **Acceptable:** Reference team size + challenge ("Firms your size often tell us...")
4. **Never:** Generic opener ("I hope this finds you well", "I came across your profile")

### Body
- **50–120 words total.** Count them. Shorter is better.
- **One value prop** tied to their firm type (from qualification-rules.md mapping)
- **Plain text.** No HTML, no images, one link maximum.
- **Their world, not ours.** "Your consultants" not "our users". "Your team's time" not "our platform".

### CTA
- **Always soft.** "Would it make sense to..." / "Open to a quick look?" / "Worth a 15-minute conversation?"
- **Never hard.** No "Book a demo NOW" / "Sign up free" / "Click here"
- **Single ask.** One CTA per email. Never two.

### Spintax
Add natural variation for volume sending:
- Greetings: `{Hi|Hey|Hello} {{firstName}}`
- Transitions: `{One thing I keep hearing|A challenge we see across}`
- CTAs: `{Would it make sense to show you|Open to a quick look}`

### Merge Tags (Instantly format)
`{{firstName}}`, `{{lastName}}`, `{{companyName}}`, `{{title}}`, `{{city}}`
Custom: `{{custom1}}` (firmSpecialty), `{{custom2}}` (teamSize), `{{custom3}}` (trigger)

## Hard Rules (violate any = automatic review failure)

1. **No pricing.** Ever. Not €40, not "affordable", not "competitive rates".
2. **No MRR/revenue numbers.** Internal only.
3. **No spam triggers.** Words: free, guarantee, act now, limited time, click here.
4. **No competitor bashing.** Position Taxxa's strengths, never name competitors negatively.
5. **Anonymize social proof.** "A Nordic accounting leader" not "Rantalainen" — unless Email 4 with approved names.
6. **No sending Mon/Fri/weekends.** Tue-Thu, 8-11am prospect local time only.

## Handoff Format

The Messaging Agent passes output to the Review Agent as:

```yaml
outbound_draft:
  channel: email
  sequence_position: hook
  target: { name, title, company, firm_type }
  subject_line: "..."
  subject_line_variant: "..."
  body: |
    [the email]
  cta: "..."
  word_count: 89
  personalization_used: { type, content, source_from_brief }
```
