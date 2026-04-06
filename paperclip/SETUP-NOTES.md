# Setup Notes — April 6, 2026

## Task 1: Paperclip + Pi-Mono Setup

### Repos Cloned
- `paperclip/` — from https://github.com/paperclipai/paperclip
- `pi-mono/` — from https://github.com/badlogic/pi-mono

### Pi-Mono Status
- **Dependencies**: Installed via `npm install` (526 packages)
- **Build**: All 7 packages built successfully (`npm run build`)
- **Validation**: `npm run check` passes (biome lint + TypeScript noEmit + browser smoke)
- **Tests**: 36/36 agent-core tests pass. AI tests mostly skipped (no API keys). Some coding-agent tests fail on Windows due to EPERM on temp dirs — this is a Windows-specific issue, not a code bug.

### Paperclip Status
- **Dependencies**: Installed via `npx pnpm@9.15.4 install` (984 packages). Required pnpm 9.x specifically (project uses `packageManager` field).
- **Build**: All packages compile. Server build script uses Unix `cp -R` which fails on Windows git bash — manually ran `tsc` + `cp -r` as workaround.
- **Dev Server**: Running at http://127.0.0.1:3100 (embedded PGlite, no external DB needed)
- **UI**: Served at same port (static build mode)

### Setup Issues & Blockers
1. **pnpm version mismatch**: Paperclip requires pnpm 9.15.4 but npm installed 10.x globally. Fix: use `npx pnpm@9.15.4` to invoke correct version.
2. **Windows shell incompatibility**: Paperclip's `dev-runner.ts` uses `taskkill` which isn't available in git bash. Server build uses Unix `cp -R` syntax. Workaround: start server directly with `npx tsx src/index.ts`.
3. **Pi-Mono Windows test failures**: 5 tests fail with EPERM on temp directories (Windows file locking). 3 lazy-module-load tests fail (ESM resolution in subprocess). Not blocking.
4. **Agent JWT missing**: Paperclip warns `missing (run pnpm paperclipai onboard)` — needed for agent authentication.

### Next Steps for Agent Harness
- Run `pnpm paperclipai onboard` to set up agent JWT
- Configure Pi-Mono's coding agent as an adapter in Paperclip
- Test agent heartbeat + task assignment flow
