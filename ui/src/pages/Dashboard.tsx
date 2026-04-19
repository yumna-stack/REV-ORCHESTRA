import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard";
import { activityApi } from "../api/activity";
import { issuesApi } from "../api/issues";
import { agentsApi } from "../api/agents";
import { projectsApi } from "../api/projects";
import { heartbeatsApi } from "../api/heartbeats";
import { useCompany } from "../context/CompanyContext";
import { useDialog } from "../context/DialogContext";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { queryKeys } from "../lib/queryKeys";
import { EmptyState } from "../components/EmptyState";
import { StatusIcon } from "../components/StatusIcon";
import { ActivityRow } from "../components/ActivityRow";
import { Identity } from "../components/Identity";
import { timeAgo } from "../lib/timeAgo";
import { formatCents } from "../lib/utils";
import {
  Bot,
  CircleDot,
  DollarSign,
  ShieldCheck,
  LayoutDashboard,
  PauseCircle,
  Activity,
  TrendingUp,
  Target,
  Send,
  MessageSquare,
  CalendarCheck,
  ArrowUpRight,
} from "lucide-react";
import { ActiveAgentsPanel } from "../components/ActiveAgentsPanel";
import {
  RunActivityChart,
  PriorityChart,
  IssueStatusChart,
  SuccessRateChart,
} from "../components/ActivityCharts";
import { PageSkeleton } from "../components/PageSkeleton";
import type { Agent, Issue } from "@paperclipai/shared";
import type { LucideIcon } from "lucide-react";
import { PluginSlotOutlet } from "@/plugins/slots";

function getRecentIssues(issues: Issue[]): Issue[] {
  return [...issues].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

/* ─── Primitives: orange + neutrals ────────────────────────────── */

function SectionLabel({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {children}
      </h2>
      {right}
    </div>
  );
}

/** A tiny random-but-stable sparkline (7 bars) seeded by value — gives
 *  the KPI tiles a visual rhythm without relying on real time-series. */
function MiniBars({
  seed,
  color,
}: {
  seed: number | string;
  color: string;
}) {
  const s = String(seed);
  const bars = Array.from({ length: 7 }, (_, i) => {
    const char = s.charCodeAt(i % s.length) + i * 7;
    return 20 + (char % 75);
  });
  return (
    <div className="flex h-8 items-end gap-[3px]">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            backgroundColor: color,
            opacity: 0.35 + (i / bars.length) * 0.65,
          }}
        />
      ))}
    </div>
  );
}

function KpiTile({
  icon: Icon,
  value,
  label,
  description,
  to,
  accent,
  showSpark,
}: {
  icon: LucideIcon;
  value: React.ReactNode;
  label: string;
  description?: React.ReactNode;
  to?: string;
  accent?: boolean;
  showSpark?: boolean;
}) {
  const inner = (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border px-5 py-5 transition-all hover:-translate-y-0.5 ${
        accent
          ? "border-orange-500/40 bg-gradient-to-br from-orange-500/[0.12] via-orange-500/[0.04] to-neutral-900 hover:border-orange-400/60"
          : "border-white/10 bg-neutral-900 hover:border-orange-500/40"
      }`}
    >
      <div
        className="absolute left-0 top-0 h-[2px] w-full"
        style={{
          background: accent
            ? "linear-gradient(90deg,#fb923c,#f97316 60%,transparent)"
            : "linear-gradient(90deg,rgba(249,115,22,0.5),transparent 70%)",
        }}
      />
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          {label}
        </p>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
            accent
              ? "bg-orange-500/20 text-orange-300"
              : "bg-white/5 text-neutral-400"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <p
        className={`mt-3 text-3xl font-semibold tracking-tight tabular-nums ${accent ? "text-orange-300" : "text-neutral-50"}`}
      >
        {value}
      </p>
      {description && (
        <p className="mt-1.5 text-[11px] text-neutral-500">{description}</p>
      )}
      {showSpark && (
        <div className="mt-3">
          <MiniBars
            seed={String(value)}
            color={accent ? "#f97316" : "#fb923c"}
          />
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="no-underline text-inherit">
        {inner}
      </Link>
    );
  }
  return inner;
}

function ChartFrame({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-4 ${className}`}
    >
      <div
        className="absolute left-0 top-0 h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg,rgba(249,115,22,0.5),transparent 70%)",
        }}
      />
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-[13px] font-medium text-neutral-100">{title}</h3>
        {subtitle && (
          <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[9px] font-medium text-orange-300">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyMini({ label }: { label: string }) {
  return (
    <div className="flex h-[140px] items-center justify-center rounded-lg border border-dashed border-white/10 text-[11px] text-neutral-500">
      {label}
    </div>
  );
}

/* ─── Visuals: donut, bars, segment list ───────────────────────── */

type Segment = { label: string; value: number; color: string };

function Donut({
  segments,
  centerLabel,
  centerSub,
}: {
  segments: Segment[];
  centerLabel: React.ReactNode;
  centerSub: React.ReactNode;
}) {
  const size = 140;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0);
  const hasData = total > 0;
  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#1c1c1c"
            strokeWidth={stroke}
          />
          {hasData &&
            segments.map((s, i) => {
              if (s.value <= 0) return null;
              const len = (s.value / total) * C;
              const el = (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={stroke}
                  strokeLinecap="butt"
                  strokeDasharray={`${len} ${C}`}
                  strokeDashoffset={-offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
              offset += len;
              return el;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[18px] font-semibold text-neutral-50 tabular-nums">
            {centerLabel}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            {centerSub}
          </span>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5 text-[12px]">
        {segments.map((s) => {
          const pct = hasData ? (s.value / total) * 100 : 0;
          return (
            <li
              key={s.label}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="truncate text-neutral-300">
                  {s.label}
                  <span className="ml-1 text-neutral-500">— {s.value}</span>
                </span>
              </span>
              <span className="shrink-0 font-medium tabular-nums text-neutral-400">
                {pct.toFixed(1)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BarChart({
  bars,
}: {
  bars: { label: string; value: number; display?: string; color: string }[];
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="flex h-[140px] items-end gap-3">
      {bars.map((b) => {
        const h = Math.max((b.value / max) * 100, b.value > 0 ? 6 : 2);
        return (
          <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] font-medium tabular-nums text-neutral-300">
              {b.display ?? b.value}
            </span>
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md transition-all"
                style={{
                  height: `${h}%`,
                  backgroundColor: b.color,
                  boxShadow: `inset 0 -6px 0 rgba(0,0,0,0.18)`,
                }}
              />
            </div>
            <span className="truncate text-[10px] uppercase tracking-wider text-neutral-500">
              {b.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SegmentBars({
  items,
  unitSuffix = "",
}: {
  items: { label: string; value: number; display: string; color: string }[];
  unitSuffix?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-3">
      {items.map((it) => {
        const widthPct = (it.value / max) * 100;
        return (
          <div key={it.label}>
            <div className="mb-1 flex items-baseline justify-between text-[11px]">
              <span className="text-neutral-300">
                {it.label}
                {unitSuffix && (
                  <span className="ml-1 text-neutral-500">({unitSuffix})</span>
                )}
              </span>
              <span className="font-semibold tabular-nums text-neutral-100">
                {it.display}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: it.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LeaderboardTable({
  columns,
  rows,
  totals,
}: {
  columns: string[];
  rows: (string | number)[][];
  totals?: (string | number)[];
}) {
  return (
    <div className="overflow-hidden rounded-xl">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-left">
            {columns.map((c, i) => (
              <th
                key={c}
                className={`pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 ${i === 0 ? "text-left" : "text-right"}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((r, ri) => (
            <tr key={ri} className="transition-colors hover:bg-orange-500/[0.04]">
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-2.5 ${
                    ci === 0
                      ? "text-neutral-200"
                      : "text-right tabular-nums text-neutral-300"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="border-t-2 border-white/10 font-medium">
              {totals.map((cell, ci) => (
                <td
                  key={ci}
                  className={`pt-3 ${
                    ci === 0
                      ? "text-neutral-100"
                      : "text-right tabular-nums text-orange-300"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Dashboard ──────────────────────────────────────────────────── */

export function Dashboard() {
  const { selectedCompanyId, companies } = useCompany();
  const { openOnboarding } = useDialog();
  const { setBreadcrumbs } = useBreadcrumbs();
  const [animatedActivityIds, setAnimatedActivityIds] = useState<Set<string>>(
    new Set(),
  );
  const seenActivityIdsRef = useRef<Set<string>>(new Set());
  const hydratedActivityRef = useRef(false);
  const activityAnimationTimersRef = useRef<number[]>([]);

  const { data: agents } = useQuery({
    queryKey: queryKeys.agents.list(selectedCompanyId!),
    queryFn: () => agentsApi.list(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard" }]);
  }, [setBreadcrumbs]);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.dashboard(selectedCompanyId!),
    queryFn: () => dashboardApi.summary(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const { data: activity } = useQuery({
    queryKey: queryKeys.activity(selectedCompanyId!),
    queryFn: () => activityApi.list(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const { data: issues } = useQuery({
    queryKey: queryKeys.issues.list(selectedCompanyId!),
    queryFn: () => issuesApi.list(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const { data: projects } = useQuery({
    queryKey: queryKeys.projects.list(selectedCompanyId!),
    queryFn: () => projectsApi.list(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const { data: runs } = useQuery({
    queryKey: queryKeys.heartbeats(selectedCompanyId!),
    queryFn: () => heartbeatsApi.list(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const recentIssues = issues ? getRecentIssues(issues) : [];
  const recentActivity = useMemo(() => (activity ?? []).slice(0, 10), [activity]);

  useEffect(() => {
    for (const timer of activityAnimationTimersRef.current) {
      window.clearTimeout(timer);
    }
    activityAnimationTimersRef.current = [];
    seenActivityIdsRef.current = new Set();
    hydratedActivityRef.current = false;
    setAnimatedActivityIds(new Set());
  }, [selectedCompanyId]);

  useEffect(() => {
    if (recentActivity.length === 0) return;
    const seen = seenActivityIdsRef.current;
    const currentIds = recentActivity.map((event) => event.id);
    if (!hydratedActivityRef.current) {
      for (const id of currentIds) seen.add(id);
      hydratedActivityRef.current = true;
      return;
    }
    const newIds = currentIds.filter((id) => !seen.has(id));
    if (newIds.length === 0) {
      for (const id of currentIds) seen.add(id);
      return;
    }
    setAnimatedActivityIds((prev) => {
      const next = new Set(prev);
      for (const id of newIds) next.add(id);
      return next;
    });
    for (const id of newIds) seen.add(id);
    const timer = window.setTimeout(() => {
      setAnimatedActivityIds((prev) => {
        const next = new Set(prev);
        for (const id of newIds) next.delete(id);
        return next;
      });
      activityAnimationTimersRef.current =
        activityAnimationTimersRef.current.filter((t) => t !== timer);
    }, 980);
    activityAnimationTimersRef.current.push(timer);
  }, [recentActivity]);

  useEffect(() => {
    return () => {
      for (const timer of activityAnimationTimersRef.current) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const agentMap = useMemo(() => {
    const map = new Map<string, Agent>();
    for (const a of agents ?? []) map.set(a.id, a);
    return map;
  }, [agents]);

  const entityNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const i of issues ?? [])
      map.set(`issue:${i.id}`, i.identifier ?? i.id.slice(0, 8));
    for (const a of agents ?? []) map.set(`agent:${a.id}`, a.name);
    for (const p of projects ?? []) map.set(`project:${p.id}`, p.name);
    return map;
  }, [issues, agents, projects]);

  const entityTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const i of issues ?? []) map.set(`issue:${i.id}`, i.title);
    return map;
  }, [issues]);

  const agentName = (id: string | null) => {
    if (!id || !agents) return null;
    return agents.find((a) => a.id === id)?.name ?? null;
  };

  if (!selectedCompanyId) {
    if (companies.length === 0) {
      return (
        <EmptyState
          icon={LayoutDashboard}
          message="Welcome to Paperclip. Set up your first company and agent to get started."
          action="Get Started"
          onAction={openOnboarding}
        />
      );
    }
    return (
      <EmptyState
        icon={LayoutDashboard}
        message="Create or select a company to view the dashboard."
      />
    );
  }

  if (isLoading) {
    return <PageSkeleton variant="dashboard" />;
  }

  const hasNoAgents = agents !== undefined && agents.length === 0;

  return (
    <div className="relative min-h-full bg-neutral-950 text-neutral-100">
      <div className="space-y-8 p-1">
        {error && <p className="text-sm text-red-400">{error.message}</p>}

        {hasNoAgents && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-orange-500/25 bg-orange-500/[0.06] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Bot className="h-4 w-4 shrink-0 text-orange-300" />
              <p className="text-sm text-orange-100">You have no agents.</p>
            </div>
            <button
              onClick={() =>
                openOnboarding({ initialStep: 2, companyId: selectedCompanyId! })
              }
              className="rounded-md border border-orange-400/40 bg-orange-500/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-orange-200 transition-colors hover:bg-orange-500/20"
            >
              Create one
            </button>
          </div>
        )}

        <ActiveAgentsPanel companyId={selectedCompanyId!} />

        {data && (
          <>
            {data.budgets.activeIncidents > 0 && (
              <div className="flex items-start justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.06] px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <PauseCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <div>
                    <p className="text-sm font-medium text-red-50">
                      {data.budgets.activeIncidents} active budget incident
                      {data.budgets.activeIncidents === 1 ? "" : "s"}
                    </p>
                    <p className="text-xs text-red-100/70">
                      {data.budgets.pausedAgents} agents paused ·{" "}
                      {data.budgets.pausedProjects} projects paused ·{" "}
                      {data.budgets.pendingApprovals} pending budget approvals
                    </p>
                  </div>
                </div>
                <Link
                  to="/costs"
                  className="text-sm text-red-100 underline underline-offset-2"
                >
                  Open budgets
                </Link>
              </div>
            )}

            {/* ── Ops Overview ── */}
            <section>
              <SectionLabel
                right={
                  <span className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                    <TrendingUp className="h-3 w-3 text-orange-400" />
                    this month
                  </span>
                }
              >
                Ops Overview
              </SectionLabel>
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <KpiTile
                  icon={Bot}
                  accent
                  showSpark
                  value={
                    data.agents.active +
                    data.agents.running +
                    data.agents.paused +
                    data.agents.error
                  }
                  label="Agents Enabled"
                  to="/agents"
                  description={
                    <span>
                      <span className="text-orange-300">
                        {data.agents.running}
                      </span>{" "}
                      running · {data.agents.paused} paused ·{" "}
                      <span className="text-red-300">{data.agents.error}</span>{" "}
                      errors
                    </span>
                  }
                />
                <KpiTile
                  icon={CircleDot}
                  showSpark
                  value={data.tasks.inProgress}
                  label="Tasks In Progress"
                  to="/issues"
                  description={
                    <span>
                      {data.tasks.open} open · {data.tasks.blocked} blocked
                    </span>
                  }
                />
                <KpiTile
                  icon={DollarSign}
                  showSpark
                  value={formatCents(data.costs.monthSpendCents)}
                  label="Month Spend"
                  to="/costs"
                  description={
                    <span>
                      {data.costs.monthBudgetCents > 0
                        ? `${data.costs.monthUtilizationPercent}% of ${formatCents(data.costs.monthBudgetCents)} budget`
                        : "Unlimited budget"}
                    </span>
                  }
                />
                <KpiTile
                  icon={ShieldCheck}
                  showSpark
                  accent={
                    data.pendingApprovals + data.budgets.pendingApprovals > 0
                  }
                  value={data.pendingApprovals + data.budgets.pendingApprovals}
                  label="Pending Approvals"
                  to="/approvals"
                  description={
                    <span>
                      {data.budgets.pendingApprovals > 0
                        ? `${data.budgets.pendingApprovals} budget overrides`
                        : "Awaiting board review"}
                    </span>
                  }
                />
              </div>
            </section>

            {/* ── GTM Outcomes ── */}
            <section>
              <SectionLabel
                right={
                  <span className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                    how the fleet is driving go-to-market
                  </span>
                }
              >
                GTM Outcomes
              </SectionLabel>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <KpiTile
                  icon={Target}
                  accent
                  value={
                    (issues ?? []).filter(
                      (i) =>
                        i.status === "in_progress" ||
                        i.status === "in_review" ||
                        i.status === "done",
                    ).length
                  }
                  label="Prospects Researched"
                  description="accounts worked by the fleet"
                />
                <KpiTile
                  icon={Send}
                  accent
                  value={(runs ?? []).length}
                  label="Sequences Executed"
                  description={`${(runs ?? []).filter((r) => r.status === "succeeded").length} succeeded`}
                />
                <KpiTile
                  icon={MessageSquare}
                  value={
                    (issues ?? []).filter((i) => i.status === "in_review").length
                  }
                  label="Replies Captured"
                  description="outputs awaiting your review"
                />
                <KpiTile
                  icon={CalendarCheck}
                  value={
                    (issues ?? []).filter((i) => i.status === "done").length
                  }
                  label="Milestones Booked"
                  description={`${(issues ?? []).filter((i) => i.status === "done" && i.priority === "high").length} high-value closed`}
                />
              </div>
            </section>

            {/* ── GTM Pipeline Funnel ── */}
            <section>
              <SectionLabel
                right={
                  <Link
                    to="/issues"
                    className="flex items-center gap-1 text-[11px] text-orange-300 no-underline transition-colors hover:text-orange-200"
                  >
                    Open pipeline <ArrowUpRight className="h-3 w-3" />
                  </Link>
                }
              >
                GTM Pipeline
              </SectionLabel>
              {(() => {
                const i = issues ?? [];
                const stages = [
                  {
                    label: "Sourced",
                    value: i.filter(
                      (x) => x.status === "backlog" || x.status === "todo",
                    ).length,
                    color: "#fdba74",
                    icon: Target,
                  },
                  {
                    label: "Engaged",
                    value: i.filter((x) => x.status === "in_progress").length,
                    color: "#fb923c",
                    icon: Send,
                  },
                  {
                    label: "Qualified",
                    value: i.filter((x) => x.status === "in_review").length,
                    color: "#f97316",
                    icon: MessageSquare,
                  },
                  {
                    label: "Closed",
                    value: i.filter((x) => x.status === "done").length,
                    color: "#ea580c",
                    icon: CalendarCheck,
                  },
                ];
                const max = Math.max(...stages.map((s) => s.value), 1);
                return (
                  <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                      {stages.map((s, idx) => {
                        const Icon = s.icon;
                        const widthPct = (s.value / max) * 100;
                        const conversionPct =
                          idx > 0 && stages[idx - 1].value > 0
                            ? Math.round((s.value / stages[idx - 1].value) * 100)
                            : null;
                        return (
                          <div key={s.label} className="relative">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Icon
                                  className="h-3.5 w-3.5"
                                  style={{ color: s.color }}
                                />
                                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-300">
                                  {s.label}
                                </span>
                              </div>
                              {conversionPct !== null && (
                                <span className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[9px] font-medium text-orange-300">
                                  {conversionPct}%
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span
                                className="text-2xl font-semibold tabular-nums"
                                style={{ color: s.color }}
                              >
                                {s.value}
                              </span>
                              <span className="text-[10px] text-neutral-500">
                                items
                              </span>
                            </div>
                            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${widthPct}%`,
                                  backgroundColor: s.color,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </section>

            {/* ── Breakdown & Analytics ── */}
            <section>
              <SectionLabel>Breakdown & Analytics</SectionLabel>
              {(() => {
                const I = issues ?? [];
                const R = runs ?? [];
                const A = agents ?? [];

                /* — Fleet composition (donut) — */
                const fleetSegments: Segment[] = [
                  {
                    label: "Running",
                    value: data.agents.running,
                    color: "#f97316",
                  },
                  {
                    label: "Active",
                    value: data.agents.active,
                    color: "#fb923c",
                  },
                  {
                    label: "Paused",
                    value: data.agents.paused,
                    color: "#3b82f6",
                  },
                  {
                    label: "Error",
                    value: data.agents.error,
                    color: "#ef4444",
                  },
                ];
                const fleetTotal =
                  data.agents.running +
                  data.agents.active +
                  data.agents.paused +
                  data.agents.error;

                /* — Runs by top agents (bar chart) — */
                const runCounts = new Map<string, number>();
                for (const r of R) {
                  if (!r.agentId) continue;
                  runCounts.set(r.agentId, (runCounts.get(r.agentId) ?? 0) + 1);
                }
                const runBars = A.map((a) => ({
                  id: a.id,
                  label: (a.name || "—").split(/\s+/)[0].slice(0, 8),
                  value: runCounts.get(a.id) ?? 0,
                }))
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5);

                const BAR_COLORS = [
                  "#f97316",
                  "#fb923c",
                  "#fdba74",
                  "#3b82f6",
                  "#6366f1",
                ];
                const runBarData = runBars.map((b, i) => ({
                  ...b,
                  color: BAR_COLORS[i % BAR_COLORS.length],
                  display: String(b.value),
                }));

                /* — Tasks by priority (donut) — */
                const pri = {
                  critical: I.filter((x) => x.priority === "critical").length,
                  high: I.filter((x) => x.priority === "high").length,
                  medium: I.filter((x) => x.priority === "medium").length,
                  low: I.filter((x) => x.priority === "low").length,
                  unset: I.filter((x) => !x.priority).length,
                };
                const priSegments: Segment[] = [
                  {
                    label: "Critical",
                    value: pri.critical,
                    color: "#dc2626",
                  },
                  { label: "High", value: pri.high, color: "#ea580c" },
                  { label: "Medium", value: pri.medium, color: "#f97316" },
                  { label: "Low", value: pri.low, color: "#fb923c" },
                  { label: "None", value: pri.unset, color: "#525252" },
                ];
                const priTotal =
                  pri.critical + pri.high + pri.medium + pri.low + pri.unset;

                /* — Tasks by priority (bar chart) — */
                const priBars = [
                  {
                    label: "Crit",
                    value: pri.critical,
                    display: String(pri.critical),
                    color: "#dc2626",
                  },
                  {
                    label: "High",
                    value: pri.high,
                    display: String(pri.high),
                    color: "#ea580c",
                  },
                  {
                    label: "Med",
                    value: pri.medium,
                    display: String(pri.medium),
                    color: "#f97316",
                  },
                  {
                    label: "Low",
                    value: pri.low,
                    display: String(pri.low),
                    color: "#fb923c",
                  },
                  {
                    label: "None",
                    value: pri.unset,
                    display: String(pri.unset),
                    color: "#525252",
                  },
                ];

                /* — Run status (horizontal bars) — */
                const runStatus = [
                  {
                    label: "Succeeded",
                    value: R.filter((x) => x.status === "succeeded").length,
                    color: "#f97316",
                  },
                  {
                    label: "Queued",
                    value: R.filter((x) => x.status === "queued").length,
                    color: "#fb923c",
                  },
                  {
                    label: "Failed",
                    value: R.filter((x) => x.status === "failed").length,
                    color: "#ef4444",
                  },
                ].map((s) => ({ ...s, display: String(s.value) }));

                /* — Task mix by status (segment bars) — */
                const statusMix = [
                  {
                    label: "In Progress",
                    value: I.filter((x) => x.status === "in_progress").length,
                    color: "#f97316",
                  },
                  {
                    label: "In Review",
                    value: I.filter((x) => x.status === "in_review").length,
                    color: "#fb923c",
                  },
                  {
                    label: "Done",
                    value: I.filter((x) => x.status === "done").length,
                    color: "#ea580c",
                  },
                  {
                    label: "Backlog",
                    value: I.filter(
                      (x) => x.status === "backlog" || x.status === "todo",
                    ).length,
                    color: "#3b82f6",
                  },
                ].map((s) => ({ ...s, display: String(s.value) }));

                /* — Agent leaderboard (table) — */
                const taskCounts = new Map<string, number>();
                const doneCounts = new Map<string, number>();
                for (const i of I) {
                  if (!i.assigneeAgentId) continue;
                  taskCounts.set(
                    i.assigneeAgentId,
                    (taskCounts.get(i.assigneeAgentId) ?? 0) + 1,
                  );
                  if (i.status === "done") {
                    doneCounts.set(
                      i.assigneeAgentId,
                      (doneCounts.get(i.assigneeAgentId) ?? 0) + 1,
                    );
                  }
                }
                const leaderboard = A.map((a) => {
                  const runs = runCounts.get(a.id) ?? 0;
                  const tasks = taskCounts.get(a.id) ?? 0;
                  const done = doneCounts.get(a.id) ?? 0;
                  const rate = tasks > 0 ? Math.round((done / tasks) * 100) : 0;
                  return { name: a.name, runs, tasks, rate };
                })
                  .sort((a, b) => b.runs + b.tasks - (a.runs + a.tasks))
                  .slice(0, 6);

                const totalRuns = leaderboard.reduce((a, r) => a + r.runs, 0);
                const totalTasks = leaderboard.reduce((a, r) => a + r.tasks, 0);
                const avgRate =
                  leaderboard.length > 0
                    ? Math.round(
                        leaderboard.reduce((a, r) => a + r.rate, 0) /
                          leaderboard.length,
                      )
                    : 0;

                return (
                  <div className="space-y-3">
                    {/* Row 1 — donut + bars + donut + bars */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                      <ChartFrame title="Agent Fleet">
                        <Donut
                          segments={fleetSegments}
                          centerLabel={fleetTotal}
                          centerSub="Agents"
                        />
                      </ChartFrame>
                      <ChartFrame title="Runs by Agent" subtitle="Top 5">
                        {runBarData.length > 0 ? (
                          <BarChart bars={runBarData} />
                        ) : (
                          <EmptyMini label="No runs yet" />
                        )}
                      </ChartFrame>
                      <ChartFrame title="Tasks by Priority">
                        <Donut
                          segments={priSegments}
                          centerLabel={priTotal}
                          centerSub="Tasks"
                        />
                      </ChartFrame>
                      <ChartFrame title="Priority Mix" subtitle="All tasks">
                        {priTotal > 0 ? (
                          <BarChart bars={priBars} />
                        ) : (
                          <EmptyMini label="No tasks yet" />
                        )}
                      </ChartFrame>
                    </div>

                    {/* Row 2 — cadence + segment bars + leaderboard */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <ChartFrame
                        title="Run Outcomes"
                        subtitle={`${R.length} total`}
                      >
                        {R.length > 0 ? (
                          <SegmentBars items={runStatus} />
                        ) : (
                          <EmptyMini label="No runs yet" />
                        )}
                        <div className="mt-4 rounded-lg border border-white/5 bg-neutral-950 p-3">
                          <div className="flex items-baseline justify-between">
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                              Success rate
                            </span>
                            <span className="text-lg font-semibold tabular-nums text-orange-300">
                              {R.length > 0
                                ? Math.round(
                                    (R.filter((x) => x.status === "succeeded")
                                      .length /
                                      R.length) *
                                      100,
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                        </div>
                      </ChartFrame>

                      <ChartFrame title="Task Mix" subtitle="By status">
                        {I.length > 0 ? (
                          <SegmentBars items={statusMix} unitSuffix="items" />
                        ) : (
                          <EmptyMini label="No tasks yet" />
                        )}
                      </ChartFrame>

                      <ChartFrame
                        title="Agent Leaderboard"
                        subtitle="by output"
                      >
                        {leaderboard.length > 0 ? (
                          <LeaderboardTable
                            columns={["Agent", "Runs", "Tasks", "Done"]}
                            rows={leaderboard.map((r) => [
                              r.name,
                              r.runs,
                              r.tasks,
                              `${r.rate}%`,
                            ])}
                            totals={[
                              "Total",
                              totalRuns,
                              totalTasks,
                              `${avgRate}%`,
                            ]}
                          />
                        ) : (
                          <EmptyMini label="No agents yet" />
                        )}
                      </ChartFrame>
                    </div>

                    {/* Row 3 — legacy activity charts kept as a strip */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                      <ChartFrame title="Run Activity" subtitle="14 days">
                        <RunActivityChart runs={R} />
                      </ChartFrame>
                      <ChartFrame title="Issues by Priority" subtitle="14 days">
                        <PriorityChart issues={I} />
                      </ChartFrame>
                      <ChartFrame title="Issues by Status" subtitle="14 days">
                        <IssueStatusChart issues={I} />
                      </ChartFrame>
                      <ChartFrame title="Success Rate" subtitle="14 days">
                        <SuccessRateChart runs={R} />
                      </ChartFrame>
                    </div>
                  </div>
                );
              })()}
            </section>

            <PluginSlotOutlet
              slotTypes={["dashboardWidget"]}
              context={{ companyId: selectedCompanyId }}
              className="grid gap-3 md:grid-cols-2"
              itemClassName="rounded-2xl border border-white/10 bg-neutral-900 p-4"
            />

            {/* ── Recent Activity + Recent Tasks ── */}
            <section>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {recentActivity.length > 0 && (
                  <div className="min-w-0">
                    <SectionLabel>
                      <span className="flex items-center gap-1.5">
                        <Activity className="h-3 w-3 text-orange-400" /> Recent
                        Activity
                      </span>
                    </SectionLabel>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 divide-y divide-white/5">
                      {recentActivity.map((event) => (
                        <ActivityRow
                          key={event.id}
                          event={event}
                          agentMap={agentMap}
                          entityNameMap={entityNameMap}
                          entityTitleMap={entityTitleMap}
                          className={
                            animatedActivityIds.has(event.id)
                              ? "activity-row-enter"
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="min-w-0">
                  <SectionLabel>
                    <span className="flex items-center gap-1.5">
                      <CircleDot className="h-3 w-3 text-orange-400" /> Recent
                      Tasks
                    </span>
                  </SectionLabel>
                  {recentIssues.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                      <p className="text-sm text-neutral-500">No tasks yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 divide-y divide-white/5">
                      {recentIssues.slice(0, 10).map((issue) => (
                        <Link
                          key={issue.id}
                          to={`/issues/${issue.identifier ?? issue.id}`}
                          className="block px-4 py-3 text-sm no-underline text-inherit transition-colors hover:bg-orange-500/[0.04]"
                        >
                          <div className="flex items-start gap-2 sm:items-center sm:gap-3">
                            <span className="shrink-0 sm:hidden">
                              <StatusIcon status={issue.status} />
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:contents">
                              <span className="line-clamp-2 text-sm text-neutral-100 sm:order-2 sm:flex-1 sm:min-w-0 sm:line-clamp-none sm:truncate">
                                {issue.title}
                              </span>
                              <span className="flex items-center gap-2 sm:order-1 sm:shrink-0">
                                <span className="hidden sm:inline-flex">
                                  <StatusIcon status={issue.status} />
                                </span>
                                <span className="font-mono text-xs text-neutral-500">
                                  {issue.identifier ?? issue.id.slice(0, 8)}
                                </span>
                                {issue.assigneeAgentId &&
                                  (() => {
                                    const name = agentName(issue.assigneeAgentId);
                                    return name ? (
                                      <span className="hidden sm:inline-flex">
                                        <Identity name={name} size="sm" />
                                      </span>
                                    ) : null;
                                  })()}
                                <span className="text-xs text-neutral-500 sm:hidden">
                                  &middot;
                                </span>
                                <span className="shrink-0 text-xs text-neutral-500 sm:order-last">
                                  {timeAgo(issue.updatedAt)}
                                </span>
                              </span>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
