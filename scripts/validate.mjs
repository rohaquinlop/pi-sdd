// Validates pi-sdd package resources: /sdd:* prompt templates, skills, and templates.
//
// Locally it uses pi's own template loader (when pi is installed at the known
// global path); in CI or elsewhere it falls back to structural checks. Either
// way it verifies names, frontmatter, expansion, and that no untranslated
// Claude Code-isms (AskUserQuestion, $ARGUMENTS) leaked into the port.
//
// Usage: bun scripts/validate.mjs   (or node scripts/validate.mjs)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const promptsDir = join(repoRoot, "prompts");
const skillsDir = join(repoRoot, "skills");
const templatesDir = join(repoRoot, "templates");

let failed = false;
const check = (cond, msg) => {
  console.log(`${cond ? "  ok " : "FAIL "}- ${msg}`);
  if (!cond) failed = true;
};

const EXPECTED_COMMANDS = ["sdd:explore", "sdd:propose", "sdd:apply", "sdd:archive"];
const EXPECTED_SKILLS = ["explore", "propose", "apply", "archive"];
const EXPECTED_TEMPLATES = ["proposal.md", "design.md", "tasks.md", "spec.md"];
const LEAK_PATTERNS = ["AskUserQuestion", "$ARGUMENTS"];

// --- Prompt templates -------------------------------------------------------

let templates = [];
let piUsed = false;
const piPath = "/Users/rhafid/.bun/install/global/node_modules/@earendil-works/pi-coding-agent";
try {
  const pi = await import(join(piPath, "dist/core/prompt-templates.js"));
  templates = pi.loadPromptTemplates({
    cwd: repoRoot,
    agentDir: join(repoRoot, ".."),
    promptPaths: [promptsDir],
    includeDefaults: false,
  });
  piUsed = true;
} catch {
  // Fallback: structural check without pi's loader.
  for (const file of readdirSync(promptsDir).filter((f) => f.endsWith(".md"))) {
    const raw = readFileSync(join(promptsDir, file), "utf8");
    const body = raw.replace(/^---[\s\S]*?---/, "").trim();
    const desc = raw.match(/^description:\s*(.+)$/m)?.[1] ?? "";
    templates.push({ name: basename(file, ".md"), description: desc, content: body });
  }
}
// Informational only: the fallback is the expected path in CI, not a failure.
console.log(`  inf - ${piUsed ? "using pi's own template loader" : "pi loader unavailable — structural fallback used (expected in CI)"}`);
check(
  EXPECTED_COMMANDS.length === templates.length &&
    EXPECTED_COMMANDS.every((n) => templates.some((t) => t.name === n)),
  `all 4 /sdd:* commands load: ${templates.map((t) => t.name).sort().join(", ")}`
);
for (const t of templates) {
  check(t.content.length > 0, `${t.name}: has body`);
  check(t.description.length > 0, `${t.name}: has description`);
  check(!LEAK_PATTERNS.some((p) => t.content.includes(p)), `${t.name}: no AskUserQuestion/$ARGUMENTS leaks`);
}

// Expansion smoke tests (only meaningful with pi's loader; fallback mimics the regex)
const expand = (text) => {
  const m = text.match(/^\/([^\s]+)(?:\s+([\s\S]*))?$/);
  if (!m) return text;
  const tpl = templates.find((t) => t.name === m[1]);
  if (!tpl) return text;
  const args = (m[2] ?? "").split(/\s+/).filter(Boolean);
  return tpl.content.replace(/\$@|\$ARGUMENTS/g, args.join(" "));
};
const expanded = expand("/sdd:propose add-dark-mode");
check(expanded.includes("add-dark-mode") && !expanded.includes("$@"), "sdd:propose: arg flows into expansion");
check(expand("/sdd:apply") !== "/sdd:apply", "sdd:apply: expands with no args");
check(expand("/sdd:missing foo") === "/sdd:missing foo", "unknown command passes through untouched");

// --- Manifest order ---------------------------------------------------------

// The /sdd:* commands all score identically in pi's fuzzy autocomplete, and its
// sort is stable — so the dropdown order IS the load order. Explicit file paths
// in the manifest are loaded in manifest order (directory scans are not
// deterministic), so pi.prompts declares them in workflow order.
let manifestPrompts = [];
const pkg = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8"));
manifestPrompts = pkg.pi?.prompts ?? [];
const manifestOrder = manifestPrompts.map((p) => basename(p, ".md"));
check(
  JSON.stringify(manifestOrder) === JSON.stringify(EXPECTED_COMMANDS),
  `package.json pi.prompts lists commands in workflow order: ${manifestOrder.join(", ")}`
);

// --- Skills -----------------------------------------------------------------

for (const skill of EXPECTED_SKILLS) {
  const p = join(skillsDir, skill, "SKILL.md");
  check(existsSync(p), `skills/${skill}/SKILL.md exists`);
  if (!existsSync(p)) continue;
  const raw = readFileSync(p, "utf8");
  check(new RegExp(`^name: ${skill}$`, "m").test(raw), `skills/${skill}: name frontmatter`);
  check(/^description: .+/m.test(raw), `skills/${skill}: description frontmatter`);
  check(!LEAK_PATTERNS.some((pat) => raw.includes(pat)), `skills/${skill}: no AskUserQuestion/$ARGUMENTS leaks`);
  check(raw.includes("clarification_ui"), `skills/${skill}: uses clarification_ui for interactive decisions`);
}

// --- Templates --------------------------------------------------------------

for (const file of EXPECTED_TEMPLATES) {
  check(existsSync(join(templatesDir, file)), `templates/${file} exists`);
}

process.exit(failed ? 1 : 0);
