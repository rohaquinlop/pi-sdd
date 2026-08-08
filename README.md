# pi-sdd

Spec-driven development (SDD) for [pi](https://github.com/earendil-works/pi) — a port of the Claude Code spec-driven workflow as a pi package. `pi-sdd` adds ten `/sdd:` slash commands that take a feature from **requirements → design → tasks → implementation**, with approval gates between phases so nothing gets built before it has been specified, reviewed, and approved.

## Why

AI agents are great at executing, but without a written contract they drift: requirements change mid-flight, scope creeps, and context is lost when you start a new session. SDD fixes that by keeping the plan in the repository — `spec/` is living documentation, gates are approval markers, and every phase is reviewable and version-controlled.

## Installation

```bash
pi install git:github.com/rohaquinlop/pi-sdd
```

Then `/reload` in a pi session (or restart pi). Commands become available globally — in every project.

Verify: type `/` in the pi editor; `/sdd:new`, `/sdd:requirements`, ... appear in autocomplete.

## Quick start

```bash
/sdd:new user-auth            # creates spec/001-user-auth/ + README, sets active spec
/sdd:requirements             # drafts requirements.md (user stories, REQ items, acceptance criteria)
/sdd:approve requirements     # creates .requirements-approved gate
/sdd:design                   # drafts design.md (architecture, data model, APIs, risks)
/sdd:approve design
/sdd:tasks                    # breaks implementation into phased, checkboxed tasks
/sdd:approve tasks
/sdd:implement                # implements approved tasks, updating checkboxes as it goes
/sdd:status                   # overview of every spec and its progress — use anytime
```

## Commands

| Command | Description |
|---|---|
| `/sdd:new <feature>` | Create a new numbered spec directory and make it active |
| `/sdd:requirements` | Create or review the requirements document for the active spec |
| `/sdd:design` | Create the technical design (requires approved requirements) |
| `/sdd:tasks` | Create the phased task list (requires approved design) |
| `/sdd:approve <requirements\|design\|tasks>` | Create the approval gate for a phase |
| `/sdd:implement [phase]` | Implement approved tasks, marking them done as verified |
| `/sdd:status` | Report all specs: phase gates, task progress, next action |
| `/sdd:switch <spec>` | Make a different spec active |
| `/sdd:update-task <task>` | Mark a single task complete and show progress |
| `/sdd:review` | Review the current un-approved phase of the active spec |

## How it works

```
spec/
├── .current-spec            # active spec pointer, e.g. "001-user-auth"
└── 001-user-auth/
    ├── README.md
    ├── requirements.md      # WHAT — approved via .requirements-approved
    ├── design.md            # HOW — approved via .design-approved
    └── tasks.md             # WHEN/ORDER — approved via .tasks-approved
```

Gates are empty marker files (`.requirements-approved`, `.design-approved`, `.tasks-approved`) inside the spec directory. Commands refuse to advance past an un-approved phase.

## Differences from the Claude Code version

- **No `!`command`` shell interpolation** — pi prompt templates don't execute shell snippets at expansion time. Each command instead instructs the agent to gather the same context itself with its bash tool (`cat spec/.current-spec`, `grep "^- \[" tasks.md`, ...), which is equivalent in effect.
- **No `allowed-tools` frontmatter** — pi's project-trust model already governs tool access.
- **Colon command names** (`sdd:new.md` → `/sdd:new`) — pi matches command names exactly, so this works. Note: Finder displays `:` as `/` in filenames (terminal and git are unaffected); Windows checkouts cannot create these filenames.

## Development

```bash
bun scripts/validate.mjs   # loads the package with pi's own loaders and smoke-tests expansion
```

## Troubleshooting

- **"No active spec"** — run `/sdd:new <feature>` or `/sdd:switch <spec>`.
- **Phase not approved** — `/sdd:review` shows where you are; `/sdd:approve <phase>` when ready.
- **Tasks not updating** — `/sdd:update-task "<exact task text>"` or edit `tasks.md` directly.
