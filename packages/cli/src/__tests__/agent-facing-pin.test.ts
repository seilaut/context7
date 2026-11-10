import { describe, test, expect } from "vitest";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../../..");

// The seven files that show an agent a ctx7 command through npx or a download. Each must pin the
// exact CLI version this repo ships (packages/cli/package.json). Not covered (see REMEDIATION.md,
// Category E, "Open"): the CLI's own help text, bare `ctx7 ...` lines in skills/context7-cli/references,
// and human-facing READMEs and docs. Upgrade commands (@latest on purpose) live in
// src/commands/upgrade.ts and src/utils/update-check.ts and are deliberately not listed.
const AGENT_FACING_FILES = [
  "rules/context7-cli.md",
  "skills/find-docs/SKILL.md",
  "skills/context7-cli/SKILL.md",
  "packages/mcp/src/lib/auth/auth-prompt.ts",
  "packages/cli/src/setup/templates.ts",
  "plugins/claude/context7/README.md",
  "plugins/codex/context7/README.md",
];

// An unversioned ctx7 package reference: npx with any flags, or npm/pnpm/yarn global install.
const UNVERSIONED =
  /\b(?:npx|pnpm dlx|bunx)\b(?:\s+-{1,2}[\w-]+)*\s+ctx7(?![\w@-])|\b(?:npm|pnpm|yarn)\s+(?:install|i|add)\b[^\n]*\bctx7(?![\w@-])/m;

describe("agent-facing ctx7 commands are pinned to the shipped CLI version", () => {
  test.each(AGENT_FACING_FILES)("%s", async (file) => {
    const version = JSON.parse(
      await readFile(join(repoRoot, "packages/cli/package.json"), "utf-8")
    ).version;
    const text = await readFile(join(repoRoot, file), "utf-8");

    const versions = [...text.matchAll(/ctx7@([^\s"'`)<>,;]+)/g)].map((m) => m[1]);
    for (const v of versions) expect(v).toBe(version);
    expect(text).not.toMatch(UNVERSIONED);
  });
});
