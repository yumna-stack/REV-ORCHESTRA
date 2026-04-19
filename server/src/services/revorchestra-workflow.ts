import { and, eq } from "drizzle-orm";
import type { Db } from "@paperclipai/db";
import { agents, approvals, companies, issueApprovals, issueComments, issues } from "@paperclipai/db";
import { issueService } from "./issues.js";
import { approvalService } from "./approvals.js";
import { logActivity, type LogActivityInput } from "./activity-log.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OutboundWorkflowInput {
  accountName: string;
  prospectName?: string | null;
  prospectTitle?: string | null;
  campaignGoal?: string | null;
}

export interface WorkflowStepResult {
  issueId: string;
  identifier: string;
  status: string;
  output: string | null;
}

export interface OutboundWorkflowResult {
  workflowId: string;
  parentIssueId: string;
  parentIdentifier: string;
  steps: {
    research: WorkflowStepResult;
    messaging: WorkflowStepResult;
    review: WorkflowStepResult;
    ops: WorkflowStepResult;
  };
  approvalId: string;
  status: "pending_approval";
}

// ---------------------------------------------------------------------------
// Agent name constants — matched by agent `name` field in the agents table.
// These are resolved at runtime per-company so the service is not coupled to
// hardcoded UUIDs.
// ---------------------------------------------------------------------------

const AGENT_NAMES = {
  gtmLead: "GTM Lead",
  research: "Research Agent",
  messaging: "Messaging Agent",
  review: "Review Agent",
  ops: "Ops Agent",
} as const;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export function revorchestraWorkflowService(db: Db) {
  const issueSvc = issueService(db);
  const approvalSvc = approvalService(db);

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  async function resolveAgentByName(companyId: string, name: string) {
    const [agent] = await db
      .select({ id: agents.id, name: agents.name })
      .from(agents)
      .where(and(eq(agents.companyId, companyId), eq(agents.name, name)));
    return agent ?? null;
  }

  async function resolveAgentMap(companyId: string) {
    const map: Record<string, string> = {};
    for (const [key, name] of Object.entries(AGENT_NAMES)) {
      const agent = await resolveAgentByName(companyId, name);
      if (!agent) {
        throw new Error(`Revorchestra agent "${name}" not found in company ${companyId}. Run the setup first.`);
      }
      map[key] = agent.id;
    }
    return map as Record<keyof typeof AGENT_NAMES, string>;
  }

  async function postComment(
    issueId: string,
    body: string,
    actor: { agentId?: string; userId?: string },
  ) {
    return issueSvc.addComment(issueId, body, actor);
  }

  // -----------------------------------------------------------------------
  // Core: run outbound workflow
  // -----------------------------------------------------------------------

  async function runOutboundWorkflow(
    companyId: string,
    input: OutboundWorkflowInput,
    actor: { userId?: string; agentId?: string },
  ): Promise<OutboundWorkflowResult> {
    const agentMap = await resolveAgentMap(companyId);

    // Build workflow description
    const descriptionParts = [
      `## Outbound Workflow: ${input.accountName}`,
      "",
      `**Account:** ${input.accountName}`,
    ];
    if (input.prospectName) descriptionParts.push(`**Prospect:** ${input.prospectName}`);
    if (input.prospectTitle) descriptionParts.push(`**Title:** ${input.prospectTitle}`);
    if (input.campaignGoal) descriptionParts.push(`**Campaign Goal:** ${input.campaignGoal}`);
    descriptionParts.push("", "---", "", "Workflow managed by GTM Lead Agent.");
    const parentDescription = descriptionParts.join("\n");

    // 1. Create parent issue (assigned to GTM Lead)
    const parentIssue = await issueSvc.create(companyId, {
      title: `Outbound: ${input.accountName}`,
      description: parentDescription,
      status: "in_progress",
      priority: "high",
      assigneeAgentId: agentMap.gtmLead,
      originKind: "revorchestra_workflow",
    });

    await log(db, companyId, actor, "workflow.started", "issue", parentIssue.id, {
      workflowType: "outbound_v1",
      accountName: input.accountName,
    });

    // 2. Create research subtask
    const researchDescription = [
      `## Research: ${input.accountName}`,
      "",
      `Produce a structured account brief for **${input.accountName}**.`,
      "",
      "Follow the research methodology in `revorchestra-research` skill.",
      "Output must follow the Research Brief Format in `revorchestra-taxxa/references/output-formats.md`.",
      "",
      input.prospectName ? `**Target Prospect:** ${input.prospectName} — ${input.prospectTitle ?? "unknown title"}` : "",
      input.campaignGoal ? `**Campaign Goal:** ${input.campaignGoal}` : "",
      "",
      `**Parent workflow:** ${parentIssue.identifier}`,
    ].filter(Boolean).join("\n");

    const researchIssue = await issueSvc.create(companyId, {
      title: `Research: ${input.accountName}`,
      description: researchDescription,
      status: "todo",
      priority: "high",
      assigneeAgentId: agentMap.research,
      parentId: parentIssue.id,
      originKind: "revorchestra_workflow",
    });

    // 3. Create messaging subtask
    const messagingDescription = [
      `## Draft Outbound: ${input.accountName}`,
      "",
      `Create a personalized outbound message for **${input.accountName}**.`,
      "",
      "Use the research brief from the Research subtask as your input.",
      "Follow `revorchestra-messaging` skill and Taxxa messaging rules.",
      "Output must follow the Outbound Draft Format in `revorchestra-taxxa/references/output-formats.md`.",
      "",
      input.prospectName ? `**Target:** ${input.prospectName} — ${input.prospectTitle ?? "unknown title"}` : "",
      input.campaignGoal ? `**Campaign Goal:** ${input.campaignGoal}` : "",
      "",
      `**Depends on:** ${researchIssue.identifier} (Research)`,
      `**Parent workflow:** ${parentIssue.identifier}`,
    ].filter(Boolean).join("\n");

    const messagingIssue = await issueSvc.create(companyId, {
      title: `Draft: ${input.accountName}`,
      description: messagingDescription,
      status: "todo",
      priority: "high",
      assigneeAgentId: agentMap.messaging,
      parentId: parentIssue.id,
      originKind: "revorchestra_workflow",
    });

    // 4. Create review subtask
    const reviewDescription = [
      `## Review: ${input.accountName}`,
      "",
      `Review the outbound draft for **${input.accountName}** against Taxxa quality standards.`,
      "",
      "Cross-reference the draft against the research brief.",
      "Follow `revorchestra-review` skill and the review criteria in `revorchestra-taxxa/references/review-criteria.md`.",
      "Output must follow the Review Report Format in `revorchestra-taxxa/references/output-formats.md`.",
      "",
      `**Depends on:** ${messagingIssue.identifier} (Draft)`,
      `**Research brief:** ${researchIssue.identifier}`,
      `**Parent workflow:** ${parentIssue.identifier}`,
    ].join("\n");

    const reviewIssue = await issueSvc.create(companyId, {
      title: `Review: ${input.accountName}`,
      description: reviewDescription,
      status: "todo",
      priority: "high",
      assigneeAgentId: agentMap.review,
      parentId: parentIssue.id,
      originKind: "revorchestra_workflow",
    });

    // 5. Create ops/finalize subtask
    const opsDescription = [
      `## Finalize: ${input.accountName}`,
      "",
      `Compile the workflow completion record for **${input.accountName}**.`,
      "",
      "Gather all outputs (research brief, draft, review report, approval decision).",
      "Follow `revorchestra-ops` skill.",
      "Output must follow the Workflow Completion Record format.",
      "",
      `**Depends on:** Approval of ${reviewIssue.identifier}`,
      `**Parent workflow:** ${parentIssue.identifier}`,
    ].join("\n");

    const opsIssue = await issueSvc.create(companyId, {
      title: `Finalize: ${input.accountName}`,
      description: opsDescription,
      status: "todo",
      priority: "medium",
      assigneeAgentId: agentMap.ops,
      parentId: parentIssue.id,
      originKind: "revorchestra_workflow",
    });

    // 6. Create approval gate
    const approval = await approvalSvc.create(companyId, {
      type: "outbound_review",
      requestedByAgentId: agentMap.gtmLead,
      status: "pending",
      payload: {
        workflowType: "outbound_v1",
        accountName: input.accountName,
        prospectName: input.prospectName ?? null,
        prospectTitle: input.prospectTitle ?? null,
        campaignGoal: input.campaignGoal ?? null,
        parentIssueId: parentIssue.id,
        parentIdentifier: parentIssue.identifier,
        researchIssueId: researchIssue.id,
        researchIdentifier: researchIssue.identifier,
        messagingIssueId: messagingIssue.id,
        messagingIdentifier: messagingIssue.identifier,
        reviewIssueId: reviewIssue.id,
        reviewIdentifier: reviewIssue.identifier,
        opsIssueId: opsIssue.id,
        opsIdentifier: opsIssue.identifier,
        instructions: "Review the research brief, outbound draft, and review report. Approve if quality meets standards.",
      },
      decisionNote: null,
      decidedByUserId: null,
      decidedAt: null,
      updatedAt: new Date(),
    });

    // Link approval to the parent issue and review issue
    await db.insert(issueApprovals).values([
      { companyId, issueId: parentIssue.id, approvalId: approval.id },
      { companyId, issueId: reviewIssue.id, approvalId: approval.id },
    ]);

    // Update parent issue to in_review status (waiting for approval)
    await issueSvc.update(parentIssue.id, { status: "in_review" });

    // Post a summary comment on the parent issue
    const summaryComment = [
      `## Workflow Initialized`,
      "",
      `| Step | Task | Agent | Status |`,
      `|---|---|---|---|`,
      `| 1. Research | ${researchIssue.identifier} | Research Agent | todo |`,
      `| 2. Draft | ${messagingIssue.identifier} | Messaging Agent | todo |`,
      `| 3. Review | ${reviewIssue.identifier} | Review Agent | todo |`,
      `| 4. Finalize | ${opsIssue.identifier} | Ops Agent | todo |`,
      "",
      `**Approval:** Pending (ID: ${approval.id})`,
      "",
      `Agents will execute via heartbeats. Approve the workflow after reviewing outputs.`,
    ].join("\n");

    await postComment(parentIssue.id, summaryComment, { agentId: agentMap.gtmLead });

    await log(db, companyId, actor, "workflow.initialized", "issue", parentIssue.id, {
      workflowType: "outbound_v1",
      approvalId: approval.id,
      subtaskIds: [researchIssue.id, messagingIssue.id, reviewIssue.id, opsIssue.id],
    });

    return {
      workflowId: parentIssue.id,
      parentIssueId: parentIssue.id,
      parentIdentifier: parentIssue.identifier!,
      steps: {
        research: {
          issueId: researchIssue.id,
          identifier: researchIssue.identifier!,
          status: "todo",
          output: null,
        },
        messaging: {
          issueId: messagingIssue.id,
          identifier: messagingIssue.identifier!,
          status: "todo",
          output: null,
        },
        review: {
          issueId: reviewIssue.id,
          identifier: reviewIssue.identifier!,
          status: "todo",
          output: null,
        },
        ops: {
          issueId: opsIssue.id,
          identifier: opsIssue.identifier!,
          status: "todo",
          output: null,
        },
      },
      approvalId: approval.id,
      status: "pending_approval",
    };
  }

  // -----------------------------------------------------------------------
  // Query: get workflow status
  // -----------------------------------------------------------------------

  async function getWorkflowStatus(companyId: string, parentIssueId: string) {
    const parent = await db
      .select()
      .from(issues)
      .where(and(eq(issues.id, parentIssueId), eq(issues.companyId, companyId)))
      .then((rows) => rows[0] ?? null);

    if (!parent) return null;

    const subtasks = await db
      .select()
      .from(issues)
      .where(and(eq(issues.parentId, parentIssueId), eq(issues.companyId, companyId)));

    const linkedApprovals = await db
      .select({ approvalId: issueApprovals.approvalId })
      .from(issueApprovals)
      .where(eq(issueApprovals.issueId, parentIssueId));

    let approval = null;
    if (linkedApprovals.length > 0) {
      approval = await db
        .select()
        .from(approvals)
        .where(eq(approvals.id, linkedApprovals[0].approvalId))
        .then((rows) => rows[0] ?? null);
    }

    const commentRows = await db
      .select()
      .from(issueComments)
      .where(eq(issueComments.issueId, parentIssueId));

    return {
      workflowId: parent.id,
      identifier: parent.identifier,
      title: parent.title,
      status: parent.status,
      description: parent.description,
      createdAt: parent.createdAt,
      updatedAt: parent.updatedAt,
      subtasks: subtasks.map((t) => ({
        id: t.id,
        identifier: t.identifier,
        title: t.title,
        status: t.status,
        assigneeAgentId: t.assigneeAgentId,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      })),
      approval: approval
        ? {
            id: approval.id,
            status: approval.status,
            type: approval.type,
            decisionNote: approval.decisionNote,
            decidedAt: approval.decidedAt,
          }
        : null,
      commentCount: commentRows.length,
    };
  }

  // -----------------------------------------------------------------------
  // Query: list workflows for a company
  // -----------------------------------------------------------------------

  async function listWorkflows(companyId: string) {
    const allWorkflowIssues = await db
      .select({
        id: issues.id,
        identifier: issues.identifier,
        title: issues.title,
        status: issues.status,
        priority: issues.priority,
        parentId: issues.parentId,
        createdAt: issues.createdAt,
        updatedAt: issues.updatedAt,
      })
      .from(issues)
      .where(
        and(
          eq(issues.companyId, companyId),
          eq(issues.originKind, "revorchestra_workflow"),
        ),
      );

    // Filter to parent issues only (parentId is null = root workflow issues)
    return allWorkflowIssues
      .filter((w) => w.parentId === null)
      .map(({ parentId: _, ...rest }) => rest);
  }

  // -----------------------------------------------------------------------
  // Setup: create Revorchestra company and agents
  // -----------------------------------------------------------------------

  async function setupCompany(actor: { userId?: string }) {
    // Check if Revorchestra company already exists
    const existing = await db
      .select()
      .from(companies)
      .where(eq(companies.name, "Revorchestra"))
      .then((rows) => rows[0] ?? null);

    if (existing) {
      // Verify agents exist
      const existingAgents = await db
        .select({ name: agents.name })
        .from(agents)
        .where(eq(agents.companyId, existing.id));

      const agentNames = new Set(existingAgents.map((a) => a.name));
      const missing = Object.values(AGENT_NAMES).filter((n) => !agentNames.has(n));

      if (missing.length === 0) {
        return { companyId: existing.id, created: false, message: "Revorchestra already set up." };
      }

      // Create missing agents
      for (const name of missing) {
        await createAgent(existing.id, name);
      }

      return {
        companyId: existing.id,
        created: false,
        message: `Revorchestra exists. Created ${missing.length} missing agent(s): ${missing.join(", ")}.`,
      };
    }

    // Create company
    const [company] = await db
      .insert(companies)
      .values({
        name: "Revorchestra",
        description: "GTM intelligence, outbound execution, and agent workflows powered by Taxxa knowledge.",
        issuePrefix: "REV",
        brandColor: "#6366f1",
        budgetMonthlyCents: 100_00, // $100 default
      })
      .returning();

    await log(db, company.id, { userId: actor.userId }, "company.created", "company", company.id, {
      name: "Revorchestra",
    });

    // Create all agents
    const createdAgents: string[] = [];
    for (const name of Object.values(AGENT_NAMES)) {
      await createAgent(company.id, name);
      createdAgents.push(name);
    }

    return {
      companyId: company.id,
      created: true,
      message: `Revorchestra created with ${createdAgents.length} agents: ${createdAgents.join(", ")}.`,
    };
  }

  async function createAgent(companyId: string, name: string) {
    const config = AGENT_CONFIGS[name];
    if (!config) throw new Error(`Unknown agent name: ${name}`);

    const [agent] = await db
      .insert(agents)
      .values({
        companyId,
        name: config.name,
        role: config.role,
        title: config.title,
        icon: config.icon,
        status: "idle",
        capabilities: config.capabilities,
        adapterType: "process",
        adapterConfig: {},
        runtimeConfig: {},
        budgetMonthlyCents: 20_00, // $20 per agent default
      })
      .returning();

    return agent;
  }

  return {
    runOutboundWorkflow,
    getWorkflowStatus,
    listWorkflows,
    setupCompany,
  };
}

// ---------------------------------------------------------------------------
// Agent configuration definitions
// ---------------------------------------------------------------------------

const AGENT_CONFIGS: Record<string, {
  name: string;
  role: string;
  title: string;
  icon: string;
  capabilities: string;
}> = {
  [AGENT_NAMES.gtmLead]: {
    name: AGENT_NAMES.gtmLead,
    role: "lead",
    title: "GTM Lead Agent",
    icon: "🎯",
    capabilities: "workflow orchestration, task decomposition, agent coordination, approval management",
  },
  [AGENT_NAMES.research]: {
    name: AGENT_NAMES.research,
    role: "research",
    title: "Research Agent",
    icon: "🔍",
    capabilities: "account research, ICP scoring, trigger identification, pain point analysis",
  },
  [AGENT_NAMES.messaging]: {
    name: AGENT_NAMES.messaging,
    role: "writer",
    title: "Messaging Agent",
    icon: "✍️",
    capabilities: "outbound copywriting, email drafting, LinkedIn messaging, personalization",
  },
  [AGENT_NAMES.review]: {
    name: AGENT_NAMES.review,
    role: "reviewer",
    title: "Review Agent",
    icon: "🔎",
    capabilities: "quality review, hallucination detection, tone checking, risk assessment",
  },
  [AGENT_NAMES.ops]: {
    name: AGENT_NAMES.ops,
    role: "ops",
    title: "Operations Agent",
    icon: "⚙️",
    capabilities: "output storage, status management, workflow finalization, export preparation",
  },
};

// ---------------------------------------------------------------------------
// Logging helper
// ---------------------------------------------------------------------------

async function log(
  db: Db,
  companyId: string,
  actor: { userId?: string; agentId?: string },
  action: string,
  entityType: string,
  entityId: string,
  details: Record<string, unknown>,
) {
  await logActivity(db, {
    companyId,
    actorType: actor.agentId ? "agent" : "user",
    actorId: actor.agentId ?? actor.userId ?? "system",
    agentId: actor.agentId ?? null,
    action,
    entityType,
    entityId,
    details,
  } as LogActivityInput);
}
