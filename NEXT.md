# NEXT — context7-fork status

**Updated:** 2026-11-04 · **Plan:** PLAN.md · **Spec:** — · **Live:** — (local stdio MCP server, no URL)

## Current position
<!-- progress:begin -->
Progress: 0% · scope 45 tasks · hours 0.0 · cost $0.00 · plan @878d0d2a
| Initiative | % | Done/Total | State | Open epics |
|---|---|---|---|---|
| I1 Carried work | 0 | 0/2 | not started | E1.1 |
| I2 Test stage | 0 | 0/0 | dropped | — |
| I3 Security | 0 | 0/6 | not started | E3.1, E3.4 |
Dropped epics (left out of the mean): E2.1, E3.2, E3.3
<!-- progress:end -->
Baselined on 2026-11-04 during the new-Mac migration (Task 27). The fork of upstash/context7 (fork point 3131245, remediated 2026-10-14, see REMEDIATION.md) builds the Context7 MCP server that Claude Code runs on this Mac. No criterion has been run yet: the first `/next verify` ticks or reopens T1.1.1, T1.1.2 and the security checks.

## Direction
<!-- direction:begin -->
State: forward · verified this session: — · reopened: none · flat sessions: 0 · ledger @0
<!-- direction:end -->
Rule: when the state is circling, stop building. Write the loop into Decisions (what was tried, why it failed its criterion). Choose one: split the task, change the approach with a named hypothesis, or raise a blocker for Diego. No new attempt until that is written.

## Decisions
- 2026-11-04 — Baselined with `/next baseline` on Diego's yes (migration Task 27); the Security initiative dropped the tasks that need a Worker, routes, uploads or staging (reasons in PLAN.md).

## Blockers / awaiting you
—

## Notes carried forward
- The MCP server is registered for Claude Code as `context7` (user scope) and runs `packages/mcp/dist/index.js` from this folder.
- The package manager is pnpm (`pnpm-lock.yaml`); dependencies are held at patched versions through `pnpm.overrides`.

## Verify with
- `pnpm --filter @upstash/context7-mcp build`
- `pnpm test`

## Last session — 2026-11-04
Baselined this project: PLAN.md written from the draft, NEXT.md created, ledger started.

## History
Older sessions → `HISTORY.md` (not auto-read). Entries are written by the SessionEnd hook; the agent fills Asked, Decided and Shipped.
