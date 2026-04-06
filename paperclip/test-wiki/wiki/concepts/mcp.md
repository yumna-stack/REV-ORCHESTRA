---
title: Model Context Protocol (MCP)
type: concept
tags: [protocol, mcp, anthropic, agent-to-tool]
created: 2026-04-06
updated: 2026-04-06
sources: [raw/agent-economy-overview.md]
---

# Model Context Protocol (MCP)

MCP is Anthropic's open-source standard for connecting AI agents to external tools and data sources. It acts as "USB-C for AI" — a single standardized interface.

## Architecture
- Client-server model: LLM is the client, tools/data are servers
- Collapses N-by-M integration problem into N-plus-M ecosystem

## Adopted By
- Claude, ChatGPT, VS Code Copilot, Cursor, Windsurf

## Relationship to [[A2A]]
- MCP = vertical (agent-to-tool)
- A2A = horizontal (agent-to-agent)
- They are complementary, not competing

## Related
- [[A2A]] — the agent-to-agent counterpart
- [[Agent Economy]] — the broader paradigm
