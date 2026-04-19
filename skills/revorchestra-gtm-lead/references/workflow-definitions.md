# Workflow Definitions

## Outbound V1 Workflow

### Trigger
- API call with `account_name` (required), `prospect_name`, `prospect_title`, `campaign_goal` (optional)

### Steps

| Step | Agent | Input | Output | Success Criteria |
|---|---|---|---|---|
| 1. Research | Research Agent | account_name, prospect info | account_brief (YAML) | confidence_level != "low" |
| 2. Draft | Messaging Agent | account_brief + messaging rules | outbound_draft (YAML) | follows all messaging rules |
| 3. Review | Review Agent | outbound_draft + research_brief | review_report (YAML) | weighted_total >= 4.0 |
| 4. Approve | Human | review_report + draft | approval decision | human approves |
| 5. Finalize | Ops Agent | approved draft + full record | workflow_record (YAML) | all fields populated |

### Error Handling

| Condition | Action |
|---|---|
| Research returns low confidence | GTM Lead flags to human, pauses workflow |
| Draft fails review (score < 4.0) | Return to Messaging Agent with feedback, retry once |
| Draft fails review twice | Escalate to human with both drafts |
| Human rejects at approval | Mark workflow as rejected, log reason |
| Any agent times out | GTM Lead marks subtask blocked, alerts human |

### Issue Hierarchy

```
REV-100: Outbound: Acme Corp (parent, assigned to GTM Lead)
├── REV-101: Research: Acme Corp (assigned to Research Agent)
├── REV-102: Draft: Acme Corp (assigned to Messaging Agent)
├── REV-103: Review: Acme Corp (assigned to Review Agent)
└── REV-104: Finalize: Acme Corp (assigned to Ops Agent)
```

### Status Flow

```
parent: backlog → in_progress → in_review (at approval) → done
research: todo → in_progress → done
draft: todo → in_progress → done (or → in_progress again if revision)
review: todo → in_progress → done
finalize: todo → in_progress → done
```
