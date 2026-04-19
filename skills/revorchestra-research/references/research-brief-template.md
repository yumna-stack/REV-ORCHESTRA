# Research Brief Template

Use this template when producing account research briefs. Fill in all fields you can. Leave empty (do not fabricate) any field you cannot verify.

```yaml
account_brief:
  account_name: "{company name}"
  website: "{company website URL}"
  industry: "{primary industry}"
  employee_count: "{approximate employee count or range}"
  revenue_estimate: "{revenue range if discoverable, e.g. $20M-50M ARR}"
  funding_stage: "{e.g. Series B, Public, Bootstrapped}"
  headquarters: "{city, state/country}"

  icp_fit:
    matches_primary_icp: true/false
    firmographic_match:
      - "{criterion 1 that matches}"
      - "{criterion 2 that matches}"
    behavioral_signals:
      - "{signal 1 detected}"
      - "{signal 2 detected}"
    fit_score: "strong/moderate/weak"

  key_personnel:
    - name: "{full name}"
      title: "{current title}"
      persona_match: "vp_finance / head_of_tax / controller"
      linkedin_url: "{URL if found}"

  trigger_events:
    - event: "{what happened}"
      date: "{YYYY-MM or YYYY-MM-DD}"
      source: "{where you found this}"
      relevance: "{why this matters for Taxxa outreach}"

  pain_points:
    - pain: "{the pain point}"
      evidence: "{what suggests this is real}"
      taxxa_angle: "{how Taxxa helps with this}"

  competitive_context:
    current_tools:
      - "{tool/vendor name}"
    gaps:
      - "{where current setup falls short}"

  research_notes: "{any additional context, caveats, or observations}"
  confidence_level: "high/medium/low"
  recommended_approach: "{suggested outreach strategy and channel}"
```

## Completion Checklist

Before submitting your brief, verify:
- [ ] Account name and website are correct
- [ ] ICP fit score is assessed with rationale
- [ ] At least one trigger event OR two pain points identified
- [ ] Key personnel verified (not guessed)
- [ ] Confidence level honestly assessed
- [ ] No fabricated data anywhere in the brief
