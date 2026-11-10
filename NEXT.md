# NEXT — context7-fork status

**Updated:** 2026-11-04 · **Plan:** PLAN.md · **Spec:** — · **Live:** — (local stdio MCP server, no URL)

## Current position
<!-- progress:begin -->
Progress: 25% · Δ +0 since 2026-11-10 · scope 57 tasks (+0) · hours 0.0 · cost $0.00 · plan @33890411
| Initiative | % | Done/Total | State | Open epics |
|---|---|---|---|---|
| I4 Direction | 0 | 0/3 | not started | E4.1 |
| I3 Security | 25 | 3/9 | in progress | E3.5, E3.1, E3.4 |
| I1 Build, test and run | 50 | 2/4 | in progress | E1.1 |
| I2 Test stage | 0 | 0/0 | dropped | — |
Dropped epics (left out of the mean): E3.2, E3.3, E2.1
<!-- progress:end -->
On 2026-11-04 the audit and plan were written (docs/audit/2026-11-04-audit.md; PLAN.md rewritten). Diego chose the controller's recommendation at 17:25: retire this fork and use the official Context7, locked to a security-checked version (T4.1.1 option C). No build work ran on the fork. The audit, PLAN.md and NEXT.md are still uncommitted, because key-scan fails on an upstream docs placeholder (see Blockers). A frozen install from the fork's lockfile fails, which supports retiring it: `corepack pnpm@10 install --frozen-lockfile` gave ERR_PNPM_LOCKFILE_CONFIG_MISMATCH (overrides do not match the lockfile) at 17:30.

## Direction
<!-- direction:begin -->
State: completely blocked · left: 11 (ready 0, queued 0, waiting 11) · verified this session: — · reopened: none · flat sessions: 0 · ledger @5
Reasons: waiting on Diego (blocker): T4.1.1, T4.1.2, T4.1.3, T3.5.1 (after T4.1.3), T3.1.2 (after T4.1.3) +4 more; waiting on Diego (approval): T3.4.1, T1.1.3
<!-- direction:end -->
Rule: when the state is circling, stop building. Write the loop into Decisions (what was tried, why it failed its criterion). Choose one: split the task, change the approach with a named hypothesis, or raise a blocker for Diego. No new attempt until that is written.

## Decisions
- 2026-11-04 — Baselined with `/next baseline` on Diego's yes (migration Task 27); the Security initiative dropped the tasks that need a Worker, routes, uploads or staging (reasons in PLAN.md).
- 2026-11-04 — Phase 2: PLAN.md rewritten from docs/audit/2026-11-04-audit.md. Diego's decisions come first (E4.1), small reversible fixes run tonight, and fork work that his decision could discard is left out. T3.1.5 was dropped (its check can only read skipped). The T3.1.12 and T3.1.14 criteria were rewritten (corepack, and the fork's own repository), so they differ from the secure template, as T3.1.12 already did.
- 2026-11-04 — Diego, 17:25: "I will follow your recommendation. For context 7". The recommendation was to retire this fork and use the official Context7, locked to a version that passes the security check (T4.1.1 option C, pinned), and to do no build work on the fork tonight. T4.1.1 stays open for Diego to tick; T1.1.4 (registering it on this Mac) is still a class B step that needs his yes.
- 2026-11-10 — Diego answered in this session (seilaut-master): "Yes, allow that one exception". A commit on seilaut-master may go ahead when `key-scan.sh` reports exactly one hit, `docs/enterprise/integrations/other-git.mdx:71` (an upstream docs example: an OPENSSH private-key header whose body is `...`, checked 2026-11-10 without printing it). Any other hit stops the commit. Pushing stays blocked until that file is in the key-scan allowlist in `~/.claude` (held by seilaut-new).

## Blockers / awaiting you
- **T3.1.12: 8 high advisories in the MCP server's production dependencies** (domain: security, awaiting: user). `corepack pnpm@10 audit --prod --audit-level=high` on 2026-11-10 (seilaut-master, at f721031): 18 vulnerabilities, 8 high, all under packages/mcp: undici <7.30.1 (TLS certificate validation bypass GHSA-2m5v-pch6-74hx, DoS GHSA-qrxm-fqhp-jwvm, and two more), @modelcontextprotocol/server <2.3.0 (2), zod <4.6.6, body-parser <2.4.0 (through express). Fixing them is a dependency upgrade: Diego's yes first.
- Note (2026-11-10): T1.1.1 and T1.1.2 ticked after `corepack pnpm@10 install --frozen-lockfile` (exit 0: the recorded ERR_PNPM_LOCKFILE_CONFIG_MISMATCH did not reproduce). T1.1.2's mcp integration test calls bare `pnpm` through execSync, so the run needed a `pnpm` shim (`exec corepack pnpm@10`) on PATH; without one the criterion fails for that reason, not the code.
- T4.1.1: Diego tick (domain: decision, awaiting: user). The choice is recorded in Decisions (option C, retire the fork). Ticking the approval line is his. T4.1.2 (the SkillSpector rule and its scope) and T4.1.3 (the upstream placeholder) are still open.
- Committing or pushing in this repo is blocked (domain: security, awaiting: user). `bash ~/.claude/bin/key-scan.sh` exits 1 on docs/enterprise/integrations/other-git.mdx:71, an OpenSSH key header around a `...` placeholder from upstream commit 137ad5f (#2933). Diego said yes to allowlisting it (17:28). The auto-mode safety classifier refused the controller's edit to ~/.claude/bin/key-scan.sh, so the fix is one line in its `allow=( … )` list, added by Diego by hand or in a session where that edit is allowed. Until then the audit and plan exist only on seilaut-master.

## Notes carried forward
- On seilaut-master the MCP server is not built or registered: there is no node_modules, no packages/mcp/dist, and no context7 entry in ~/.claude.json or ~/.codex/config.toml that points here. The earlier note that it runs from this folder as `context7` (user scope) was never verified on this Mac (audit H3).
- The package manager is pnpm 10 through corepack (`corepack pnpm@10`); there is no global pnpm. The overrides that apply are in pnpm-workspace.yaml; package.json's `pnpm.overrides` never reached the lockfile (audit M1).
- `corepack pnpm@10 install --frozen-lockfile` fails with ERR_PNPM_LOCKFILE_CONFIG_MISMATCH (2026-11-04). The fork cannot install from its own lockfile as it stands.

## Verify with
- `COREPACK_ENABLE_DOWNLOAD_PROMPT=0 COREPACK_ENABLE_STRICT=0 corepack pnpm@10 --filter @upstash/context7-mcp run build` (T1.1.1 also starts the built binary)
- T1.1.2's criterion in PLAN.md: offline suites for mcp (through pnpm exec), cli, sdk and pi; the live tools-ai-sdk suite is T1.1.3

## Last session — 2026-11-04
On seilaut-master the controller ran from 16:20 to 20:00 CET.
- Cloned seilaut/context7 and checked out `work/2026-11-04` (baseline e57dcb9).
- Phase 1 audit and Phase 2 plan by an Opus agent.
- Diego took the recommendation to retire the fork, so no build tasks ran.
- The controller's queue tried the install from the lockfile (it failed, see above). The later build, typecheck and test jobs failed at once for lack of node_modules.
- Not pushed: the work branch on origin is unchanged from the handover.

## History
Older sessions → `HISTORY.md` (not auto-read). Entries are written by the SessionEnd hook; the agent fills Asked, Decided and Shipped.
