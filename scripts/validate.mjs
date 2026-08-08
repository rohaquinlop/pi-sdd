// Validates pi-sdd package resources using pi's own loaders.
// Usage: bun scripts/validate.mjs  (or node scripts/validate.mjs)
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const piPath = "/Users/rhafid/.bun/install/global/node_modules/@earendil-works/pi-coding-agent";
let pi;
try {
  pi = await import(join(piPath, "dist/core/prompt-templates.js"));
} catch (err) {
  console.error(`Could not load pi's prompt-templates module from ${piPath}\n${err.message}`);
  process.exit(1);
}
const { loadPromptTemplates, expandPromptTemplate } = pi;

const promptsDir = join(repoRoot, "prompts");
const templates = loadPromptTemplates({
  cwd: repoRoot,
  agentDir: join(repoRoot, ".."),
  promptPaths: [promptsDir],
  includeDefaults: false,
});

const expected = [
  "sdd:new",
  "sdd:requirements",
  "sdd:design",
  "sdd:tasks",
  "sdd:approve",
  "sdd:implement",
  "sdd:status",
  "sdd:switch",
  "sdd:update-task",
  "sdd:review",
];

let failed = false;
const check = (cond, msg) => {
  console.log(`${cond ? "  ok " : "FAIL "}- ${msg}`);
  if (!cond) failed = true;
};

const names = templates.map((t) => t.name).sort();
check(
  expected.length === names.length && expected.every((n) => names.includes(n)),
  `all ${expected.length} templates load with expected names: ${names.join(", ")}`
);
for (const t of templates) {
  check(t.content.length > 0, `${t.name}: has body`);
  check(t.description.length > 0, `${t.name}: has description`);
}

// Expansion smoke tests
const expandedNew = expandPromptTemplate("/sdd:new user-auth", templates);
check(expandedNew.includes("user-auth") && !expandedNew.includes("$ARGUMENTS"), "sdd:new: args substituted, no leftover $ARGUMENTS");
check(expandPromptTemplate("/sdd:status", templates) !== "/sdd:status", "sdd:status: expands");
check(expandPromptTemplate("/sdd:missing foo", templates) === "/sdd:missing foo", "unknown command passes through untouched");
const expandedImplement = expandPromptTemplate("/sdd:implement 2", templates);
check(!expandedImplement.includes("$1") || expandedImplement.includes("$1").valueOf === false, "sdd:implement: phase arg used");

// Skill frontmatter
const skillPath = join(repoRoot, "skills", "sdd", "SKILL.md");
check(existsSync(skillPath), "skills/sdd/SKILL.md exists");
const skill = readFileSync(skillPath, "utf8");
check(/^---\nname: sdd\n/m.test(skill), "skill name: sdd");
check(/^description: .+/m.test(skill), "skill has description");

process.exit(failed ? 1 : 0);
