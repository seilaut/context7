import { describe, test, expect } from "vitest";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../../..");
const skillPath = join(repoRoot, "skills/find-docs/SKILL.md");
const rulePath = join(repoRoot, "rules/context7-cli.md");
const cliPackagePath = join(repoRoot, "packages/cli/package.json");

const readCliVersion = async (): Promise<string> =>
  JSON.parse(await readFile(cliPackagePath, "utf-8")).version;

describe("find-docs skill aligns with context7-cli rule", () => {
  test("uses npx ctx7@<shipped version> as the canonical invocation style", async () => {
    const skill = await readFile(skillPath, "utf-8");
    const cliVersion = await readCliVersion();
    expect(skill).toContain(`npx ctx7@${cliVersion} library`);
    expect(skill).toContain(`npx ctx7@${cliVersion} docs`);
    expect(skill).not.toMatch(/^ctx7 library/m);
    expect(skill).not.toContain("ctx7 library nextjs");
  });

  test("documents official library naming guidance", async () => {
    const skill = await readFile(skillPath, "utf-8");
    const rule = await readFile(rulePath, "utf-8");

    expect(skill).toContain('"Next.js" not "nextjs"');
    expect(rule).toContain('"Next.js" not "nextjs"');
    expect(skill).toContain('library "Next.js"');
  });

  test("does not recommend global install as the primary workflow", async () => {
    const skill = await readFile(skillPath, "utf-8");
    const cliVersion = await readCliVersion();
    const npxIndex = skill.indexOf(`npx ctx7@${cliVersion}`);
    const globalInstallIndex = skill.indexOf(`npm install -g ctx7@${cliVersion}`);
    expect(npxIndex).toBeGreaterThanOrEqual(0);
    expect(globalInstallIndex).toBeGreaterThan(npxIndex);
  });
});
