import { describe, test, expect } from "vitest";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../../..");

// Every file that shows an agent a ctx7 command. Each must pin the exact CLI version this
// repo ships (packages/cli/package.json). Upgrade commands (@latest on purpose) live in
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

describe("agent-facing ctx7 commands are pinned to the shipped CLI version", () => {
  test.each(AGENT_FACING_FILES)("%s", async (file) => {
    const version = JSON.parse(
      await readFile(join(repoRoot, "packages/cli/package.json"), "utf-8")
    ).version;
    const text = await readFile(join(repoRoot, file), "utf-8");

    const versions = [...text.matchAll(/ctx7@([^\s"'`)<>,;]+)/g)].map((m) => m[1]);
    for (const v of versions) expect(v).toBe(version);
    expect(text).not.toMatch(/npx (-y )?ctx7(\s|$)/m);
  });
});
