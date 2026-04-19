# Revorchestra Qualification Rules

How the Research Agent decides if an account is worth pursuing.

## Scoring Model

Every account gets scored on 5 criteria. Each is YES/NO.

| Criteria | YES = 1 point | NO = 0 |
|---|---|---|
| **Industry match** | Accounting, auditing, tax advisory, payroll, bookkeeping | Anything else |
| **Size match** | 5–50 employees | Outside range |
| **Decision-maker findable** | CEO, Managing Partner, Founder, Managing Director, Head of Tax, CFO | No decision-maker identified |
| **Location match** | Capital city or major metro in Nordics/Europe | Rural or outside target geography |
| **Trigger present** | At least one: hiring, expansion, AI mention, conference, regulatory change | No signals found |

### Routing

| Score | Fit | Action |
|---|---|---|
| 5/5 | **Strong** | Proceed to drafting immediately |
| 3-4/5 | **Moderate** | Proceed with a flag — note which criteria missed |
| 0-2/5 | **Weak** | Stop. Tell the orchestrator. Human decides. |

## Firm Type → Angle Mapping

Once qualified, the Research Agent tags the firm type. This determines the messaging angle downstream.

| Firm Type | Primary Pain | Taxxa Angle | Lead Use Case |
|---|---|---|---|
| Audit | Compliance complexity | Audit-safe AI with governance | Compliance research |
| Tax advisory | Research time drain | 2 hours → 20 minutes | Tax research |
| Payroll | Volume + bilingual needs | Scale without headcount | Employment law lookup |
| Accounting | Document processing | Reduce low-value work | Client comms drafting |
| Multi-office | Knowledge silos | Single source of truth | Cross-team research |

## Social Proof Matching

The Research Agent also selects which named client to reference (for the Messaging Agent to use in Email 4):

| If firm is... | Reference... | Because... |
|---|---|---|
| Large Nordic firm | Rantalainen | Scale proof — ~1,000 employees, daily use |
| Compliance-focused | Win-Win | Trust proof — AI safely with clients |
| International/multi-country | Leinonen Norway | Expansion proof — multi-jurisdiction |
| Legal-adjacent | Ellex | Professional services proof |
| Small team rollout | Maneki Revision | Adoption proof — 11-seat company-wide |

**Rule:** Never use the same client in consecutive emails. Rotate.

## What Counts as a Trigger Event

Research Agent must find at least one from the last 6 months:

- New hires (especially finance, accounting, tax leadership)
- Office expansion or new locations
- Awards, certifications, industry recognition
- Conference attendance (accounting/tax/tech events)
- Technology adoption signals (AI mentions, digital transformation)
- Regulatory changes affecting their market
- Funding or revenue growth signals

Each trigger must have: **what happened**, **when**, **source URL or name**.
