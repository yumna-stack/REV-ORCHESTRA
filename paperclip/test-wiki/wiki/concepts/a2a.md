---
title: Agent-to-Agent Protocol (A2A)
type: concept
tags: [protocol, a2a, google, agent-to-agent]
created: 2026-04-06
updated: 2026-04-06
sources: [raw/agent-economy-overview.md]
---

# Agent-to-Agent Protocol (A2A)

Google's open protocol for inter-agent communication. Enables independent agents to discover each other, negotiate tasks, and exchange results across different frameworks and vendors.

## Core Concepts
- **Agent Cards**: JSON metadata at `/.well-known/agent.json` describing capabilities
- **Tasks**: Fundamental unit of work with lifecycle states
- **Messages & Parts**: Rich multi-modal communication
- **Push Notifications**: Async updates for long-running tasks

## Relationship to [[MCP]]
- A2A = horizontal (agent-to-agent)
- MCP = vertical (agent-to-tool)
- Complementary: use MCP internally, A2A externally

## Related
- [[MCP]] — the agent-to-tool counterpart
- [[Agent Economy]] — the broader paradigm
