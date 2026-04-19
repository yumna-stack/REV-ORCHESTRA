import { Router } from "express";
import { z } from "zod";
import type { Db } from "@paperclipai/db";
import { validate } from "../middleware/validate.js";
import { revorchestraWorkflowService } from "../services/revorchestra-workflow.js";
import { assertBoard, assertCompanyAccess, getActorInfo } from "./authz.js";

const startOutboundWorkflowSchema = z.object({
  accountName: z.string().min(1, "accountName is required"),
  prospectName: z.string().nullish(),
  prospectTitle: z.string().nullish(),
  campaignGoal: z.string().nullish(),
});

export function revorchestraRoutes(db: Db) {
  const router = Router();
  const svc = revorchestraWorkflowService(db);

  // -----------------------------------------------------------------------
  // POST /companies/:companyId/revorchestra/setup
  // One-time setup: creates the Revorchestra company and agents if needed.
  // -----------------------------------------------------------------------
  router.post("/companies/:companyId/revorchestra/setup", async (req, res) => {
    assertBoard(req);
    const actor = getActorInfo(req);
    const result = await svc.setupCompany({ userId: actor.actorId });
    res.json(result);
  });

  // -----------------------------------------------------------------------
  // POST /revorchestra/setup
  // Bootstrap: creates the company from scratch (no companyId needed).
  // -----------------------------------------------------------------------
  router.post("/revorchestra/setup", async (req, res) => {
    assertBoard(req);
    const actor = getActorInfo(req);
    const result = await svc.setupCompany({ userId: actor.actorId });
    res.json(result);
  });

  // -----------------------------------------------------------------------
  // POST /companies/:companyId/revorchestra/workflows/outbound
  // Start a new outbound workflow for the given account.
  // -----------------------------------------------------------------------
  router.post(
    "/companies/:companyId/revorchestra/workflows/outbound",
    validate(startOutboundWorkflowSchema),
    async (req, res) => {
      const companyId = req.params.companyId as string;
      assertCompanyAccess(req, companyId);
      const actor = getActorInfo(req);

      const result = await svc.runOutboundWorkflow(companyId, req.body, {
        userId: actor.actorType === "user" ? actor.actorId : undefined,
        agentId: actor.agentId ?? undefined,
      });

      res.status(201).json(result);
    },
  );

  // -----------------------------------------------------------------------
  // GET /companies/:companyId/revorchestra/workflows
  // List all outbound workflows for the company.
  // -----------------------------------------------------------------------
  router.get("/companies/:companyId/revorchestra/workflows", async (req, res) => {
    const companyId = req.params.companyId as string;
    assertCompanyAccess(req, companyId);
    const workflows = await svc.listWorkflows(companyId);
    res.json(workflows);
  });

  // -----------------------------------------------------------------------
  // GET /companies/:companyId/revorchestra/workflows/:workflowId
  // Get detailed status of a specific workflow.
  // -----------------------------------------------------------------------
  router.get("/companies/:companyId/revorchestra/workflows/:workflowId", async (req, res) => {
    const companyId = req.params.companyId as string;
    assertCompanyAccess(req, companyId);
    const workflowId = req.params.workflowId as string;
    const status = await svc.getWorkflowStatus(companyId, workflowId);
    if (!status) {
      res.status(404).json({ error: "Workflow not found" });
      return;
    }
    res.json(status);
  });

  return router;
}
