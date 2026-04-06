# Agent-to-Agent Communication & Agent Economy
## Research Summary — April 6, 2026

---

## 1. Agent-to-Agent Communication Protocols

### Google A2A (Agent-to-Agent Protocol)
- Open protocol by Google for inter-agent communication across different frameworks and vendors
- Enables agents to discover each other's capabilities, negotiate tasks, and exchange results
- Uses "Agent Cards" — JSON metadata describing what an agent can do
- Supports long-running tasks with streaming updates
- Built on HTTP/JSON-RPC, enterprise-ready with auth/security built in

### Anthropic MCP (Model Context Protocol)
- Open standard for connecting AI agents to external tools and data sources
- Acts as a "USB-C for AI" — standardized interface between LLMs and external systems
- Client-server architecture: LLM is the client, tools/data are servers
- Already adopted by many tools (Claude Code, Cursor, Windsurf, etc.)
- Focus: agent-to-tool communication (not agent-to-agent directly)

### Key Difference
- **MCP** = agent talks to tools/data (vertical integration)
- **A2A** = agent talks to agent (horizontal coordination)
- They are complementary, not competing

### Other Protocols
- **OpenAI Function Calling** — de facto standard for tool use, but proprietary
- **LangChain Tool Protocol** — framework-specific tool interface
- **AutoGen** (Microsoft) — multi-agent conversation framework

---

## 2. Agent Economy: Agents Hiring Agents

### The Emerging Model
- Agents can now **delegate tasks** to specialized sub-agents
- **Paperclip** (paperclip.ing) models this as a company: agents have roles, budgets, org charts
- Agents can "hire" other agents, assign tasks via tickets, and track costs
- Budget enforcement prevents runaway spending

### Supply Chain Dynamics
- **Vertical specialization**: coding agents, research agents, design agents, QA agents
- **Horizontal orchestration**: a "manager" agent delegates to specialists
- **Cost tracking**: per-agent token budgets enable ROI measurement
- **Marketplace potential**: agents offering services to other agents

### Real-World Examples

| Platform | Approach | Key Feature |
|----------|----------|-------------|
| **Paperclip** | Company OS for AI agents | Org charts, budgets, governance, multi-company |
| **CrewAI** | Role-based agent teams | Agents with roles, goals, backstories |
| **AutoGPT** | Autonomous single agent | Self-prompting loop with memory |
| **LangGraph** | Graph-based workflows | Stateful agent workflows with branching |
| **Microsoft AutoGen** | Multi-agent conversations | Agents debate and collaborate |
| **OpenAI Swarm** | Lightweight handoffs | Agent-to-agent task handoff |

---

## 3. GTM Angles

### Who Buys Agent Orchestration?
1. **AI-first startups** — building products with multiple agent workflows
2. **Enterprise AI teams** — need governance, audit trails, cost control
3. **Consulting/agencies** — automating client deliverables with agent teams
4. **DevOps/SRE teams** — autonomous monitoring, incident response

### Pain Points Solved
- **Cost explosion** — no visibility into multi-agent spend → budget controls
- **Coordination chaos** — agents duplicating work → org structure + task management
- **No accountability** — can't trace what agents did → audit logs + governance
- **Vendor lock-in** — tied to one LLM provider → multi-provider support

### Demo Ideas
1. Set up a "mini company" with 3 agents: researcher, writer, reviewer
2. Show the org chart, task flow, and cost tracking dashboard
3. Demonstrate budget enforcement (agent pauses at limit)
4. Show audit trail of agent decisions

### Verticals with Highest Potential
- **Content production** — agents writing, editing, publishing
- **Software development** — coding, testing, deployment agents
- **Customer support** — triage, resolution, escalation agents
- **Research & analysis** — data gathering, synthesis, reporting agents
