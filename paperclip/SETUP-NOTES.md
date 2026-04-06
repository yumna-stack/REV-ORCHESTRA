# Setup Notes — April 6, 2026
# Company: Reorchestrata

## Task 1: Paperclip + Pi-Mono Setup

### Repos Cloned
- `paperclip/` — from https://github.com/paperclipai/paperclip
- `pi-mono/` — from https://github.com/badlogic/pi-mono

### Pi-Mono Status
- **Dependencies**: Installed via `npm install` (526 packages)
- **Build**: All 7 packages built successfully (`npm run build`)
- **Validation**: `npm run check` passes (biome lint + TypeScript noEmit + browser smoke)
- **Tests**: 36/36 agent-core tests pass. AI tests mostly skipped (no API keys). Some coding-agent tests fail on Windows due to EPERM on temp dirs — Windows-specific, not a code bug.
- **CLI Linked**: `pi` CLI v0.65.2 globally linked via `npm link`

### Paperclip Status
- **Dependencies**: Installed via `npx pnpm@9.15.4 install` (984 packages)
- **Build**: All packages compile. Server build uses Unix `cp -R` — workaround: manual `tsc` + `cp -r`.
- **Dev Server**: Running at http://127.0.0.1:3100 (embedded PGlite, no external DB needed)
- **UI**: Served at same port (static build mode)
- **Test Company Created**: "Reorchestrata Test" (ID: ddbc1802-eebd-4be2-a539-f6b7f67ff6ca)

### Agent Harness Status (1g)
- **Pi adapter wired**: Paperclip's built-in `pi_local` adapter detected and validated the `pi` CLI
- **Environment test results**:
  - `pi_cwd_valid`: PASS — working directory valid
  - `pi_command_resolvable`: PASS — pi CLI found and executable
  - `pi_models_empty`: WARN — no models available (need API keys)
  - `pi_model_required`: ERROR — need to configure model in provider/model format
- **To complete**: Set API keys (ANTHROPIC_API_KEY, OPENAI_API_KEY, etc.) → pi will discover models → can then hire an agent and run a task

### Setup Issues & Blockers
1. **pnpm version mismatch**: Paperclip requires pnpm 9.15.4 but npm installed 10.x. Fix: `npx pnpm@9.15.4`
2. **Windows shell incompatibility**: `dev-runner.ts` uses `taskkill`, build uses `cp -R`. Workaround: start server directly with `npx tsx src/index.ts`
3. **Pi-Mono Windows test failures**: EPERM on temp dirs, ESM resolution in subprocess. Not blocking.
4. **Agent JWT missing**: Run `pnpm paperclipai onboard` for agent auth
5. **API keys needed**: Pi CLI needs provider API keys to discover and use models

---

## Task 2: Agent-to-Agent Communication & Agent Economy
- **Status**: COMPLETE
- **Deliverable**: `research/task2-agent-communication-economy.md`
- Covers MCP, A2A, CrewAI, LangGraph, AutoGen, Paperclip
- GTM analysis with buyer personas, pain points, and verticals

---

## Task 3: Karpathy AutoResearch
- **Status**: PARTIAL — repo cloned, deps partially installed
- **Repo**: `autoresearch/` cloned from https://github.com/karpathy/autoresearch
- **Python**: 3.12 installed via uv
- **BLOCKER**: No NVIDIA GPU on this machine. AutoResearch requires CUDA GPU (tested on H100).
- **PyTorch**: Download in progress (~2.7GB) but cannot run experiments without GPU
- **GTM docs**: COMPLETE — `research/task3-autoresearch.md`
- **Action needed**: Run on a machine with NVIDIA GPU (HQ workstation, cloud GPU, etc.)

---

## Task 4: Karpathy Second Brain (LLM Wiki)
- **Status**: COMPLETE — set up and tested end-to-end
- **Skills installed**: `karpathy-wiki` and `karpathy-project-wiki` in `~/.claude/skills/`
- **Test wiki**: Created on "Agent Economy" topic in `test-wiki/`
  - Ran full INIT + INGEST cycle
  - Generated: 3 concept pages, 2 entity pages, 1 source summary, overview, index, log, schema
  - All wikilinks and cross-references working
- **GTM docs**: COMPLETE — `research/task4-second-brain.md`
- **Repos**: `second-brain/` (toolboxmd) + `second-brain-alt/` (Astro-Han)
