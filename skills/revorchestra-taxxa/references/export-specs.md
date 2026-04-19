# Revorchestra Export Specifications

How the Ops Agent formats approved outputs for downstream systems.

## Instantly Export (email sending)

After human approval, the Ops Agent reformats the draft for direct paste into an Instantly campaign:

```
Subject: {subject with spintax variants}

{body with merge tags ({{firstName}}, {{companyName}}, etc.) and spintax}
```

### Instantly Requirements
- Plain text only
- Merge tags: `{{firstName}}`, `{{lastName}}`, `{{companyName}}`, `{{title}}`, `{{city}}`, `{{custom1}}`-`{{custom5}}`
- Spintax format: `{Option A|Option B|Option C}`
- No HTML
- Max one link (calendar link for CTA)

## HubSpot CRM Export

For logging the outreach in HubSpot:

```yaml
hubspot_contact:
  firstname: ""
  lastname: ""
  email: ""
  company: ""
  jobtitle: ""
  city: ""

hubspot_deal:
  dealname: "Outbound: {company name}"
  pipeline: "default"
  dealstage: "cold_outreach"
  amount: ""                    # based on headcount × €40 minus 30% capacity
  country: ""
  description: "Revorchestra outbound — {campaign goal}"
  close_date: ""                # from qualification-rules.md closing timeline

hubspot_activity:
  type: "email"
  subject: ""
  body: ""
  timestamp: ""
```

### Closing Timeline (for deal close_date)
- 5–15 employees: +2 months from first touch
- 15–35 employees: +4 months
- 35–50 employees: +7 months

## Workflow Completion Record

The full audit trail saved to the parent issue:

```yaml
workflow_record:
  workflow_type: "outbound_v1"
  account_name: ""
  target: { name, title, company }
  market: ""
  icp_fit_score: ""
  
  steps:
    research: { completed_at, confidence, agent }
    drafting: { completed_at, word_count, revision_count, agent }
    review: { completed_at, score, gates_passed, agent }
    approval: { completed_at, decision, approved_by }
    export: { completed_at, instantly_ready, hubspot_logged, agent }

  final_output:
    channel: ""
    subject: ""
    body: ""
    cta: ""

  audit_trail:
    - { timestamp, step, event, details }
```

## What the Ops Agent Does NOT Do

- Does not modify the approved draft text
- Does not send emails (human pushes to Instantly)
- Does not create HubSpot records directly (exports the data for human to import)
- Does not make quality judgments — that's the Review Agent's job
