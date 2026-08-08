# pi-sdd

[![Validate package](https://github.com/rohaquinlop/pi-sdd/actions/workflows/validate.yml/badge.svg)](https://github.com/rohaquinlop/pi-sdd/actions/workflows/validate.yml)

A spec-driven development workflow for [pi](https://github.com/earendil-works/pi) — a port of [spec-driven-framework](https://github.com/rohaquinlop/spec-driven-framework) (a Claude Code plugin), keeping the same workflow, artifacts, and conventions.

This repo contains **only Markdown and JSON**. There is no npm dependency, no build step, no third-party code, and no telemetry of any kind. `package.json` is pure metadata for pi's package loader — nothing in this package executes code on your machine besides pi itself reading `SKILL.md` files.

## The workflow

```
/sdd:explore   → discuss an idea freely, no files created
/sdd:propose   → turn a settled idea into proposal.md + design.md + tasks.md + specs/
/sdd:apply     → implement tasks.md against real code, checking tasks off as you go
/sdd:archive   → once done, fold spec changes into specs/ and archive the change
```

Artifacts live in your project as plain Markdown, under a single `.sdd/` directory:

```
your-project/
└── .sdd/
    ├── specs/                  # the project's current, authoritative specs
    ├── changes/<name>/         # an in-progress change
    │   ├── proposal.md
    │   ├── design.md
    │   ├── tasks.md
    │   └── specs/*.md          # proposed spec deltas for this change
    └── archive/<name>/         # completed changes, kept for history
```

Projects that already have root-level `specs/`, `changes/`, or `archive/` directories from before this convention are migrated automatically — the first `/sdd:propose` or `/sdd:archive` run moves them under `.sdd/` and tells you what moved.

## Install

### Option A — as a pi package (recommended)

```bash
pi install git:github.com/rohaquinlop/pi-sdd
```

Then `/reload` in a pi session (or restart pi). The four commands become available globally, in every project: `/sdd:explore`, `/sdd:propose`, `/sdd:apply`, `/sdd:archive`.

To update later: `pi update --extensions`.

### Option B — standalone, no package system

Copy the skills into your project (or your personal `~/.pi/agent/skills/`):

```
git clone https://github.com/rohaquinlop/pi-sdd.git
cp -r pi-sdd/skills/* your-project/.pi/skills/
```

Skills then appear unnamespaced and are invoked as `/skill:explore`, `/skill:propose`, `/skill:apply`, `/skill:archive` (or auto-loaded when the task matches their description). The `/sdd:*` prompt templates in `prompts/` provide the namespaced command names.

## Example

See [`examples/`](./examples/) for a full walkthrough of the `explore → propose → apply → archive` loop on a real feature (a dark mode toggle), including the actual `proposal.md`/`design.md`/`tasks.md`/`specs/*.md` files each command produces at every stage.

## Differences from the Claude Code version

| Claude Code (spec-driven-framework) | pi (this port) |
|---|---|
| `/sdd:*` skills registered via plugin marketplace | `/sdd:*` prompt templates (in `prompts/`) dispatching to the same four skills — declared explicitly in `pi.prompts` so the autocomplete dropdown shows them in workflow order: explore → propose → apply → archive || `AskUserQuestion` tool for ambiguous decisions | pi's `clarification_ui` tool — same semantics: recommended option first, real alternatives, free-text "Other" |
| `$ARGUMENTS` in skill text | arguments passed by the template expansion; skills read "the name/idea the user provided" |
| `/plugin marketplace add` + `/plugin install` | `pi install git:github.com/rohaquinlop/pi-sdd` |
| `claude plugin validate . --strict` | `bun scripts/validate.mjs` (also runs in CI) |

Everything else — the `.sdd/` directory convention, the four skills' instructions and boundaries, the templates, the legacy-layout migration, the no-dependencies/no-telemetry stance — is ported as-is.

## Versioning

The `version` field in [`package.json`](./package.json) follows the same policy as the original: **major** breaks command names, argument shape, or the `.sdd/` convention; **minor** adds a skill, template, or backward-compatible improvement; **patch** is wording/doc fixes with no behavioral effect. Bumping it is what signals a new version to `pi update --extensions`.

## License

MIT
