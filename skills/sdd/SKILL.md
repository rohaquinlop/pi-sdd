---
name: sdd
description: Spec-driven development workflow for pi — features move through requirements → design → tasks → implementation with approval gates between phases, tracked in the spec/ directory and driven by /sdd: commands. Load when the user invokes /sdd:..., mentions spec-driven development or a spec workflow, asks to create or review requirements/design/tasks documents for a feature, or implements work tracked in spec/*/tasks.md.
---

# Spec-Driven Development (SDD)

SDD keeps the plan in the repository and the agent on contract. Every feature is specified, reviewed, and approved before any code is written; implementation then follows the approved task list, phase by phase.

## State model

```
spec/
├── .current-spec          # active spec directory name, e.g. "001-user-auth"
└── 001-user-auth/
    ├── README.md          # name, creation date, status checklist
    ├── requirements.md    # WHAT        — gate: .requirements-approved
    ├── design.md          # HOW         — gate: .design-approved
    └── tasks.md           # WHEN/ORDER  — gate: .tasks-approved
```

The three gate files are empty markers. A phase is "approved" iff its marker exists. `.current-spec` holds the directory name of the spec currently being worked on.

## Phases and gates

| # | Phase | Document | Gate | Next |
|---|-------|----------|------|------|
| 1 | Requirements | requirements.md | `.requirements-approved` | design |
| 2 | Design | design.md | `.design-approved` | tasks |
| 3 | Tasks | tasks.md | `.tasks-approved` | implementation |
| 4 | Implementation | tasks.md checkboxes | — | done |

Rules:

- Never start a phase whose predecessor is un-approved; never implement from an un-approved tasks.md.
- Approval is the user's call. When asked to approve, verify the document exists and is complete first, then create the marker.
- If a spec document changes after approval, its gate is stale: ask the user whether to re-approve.

## Document standards

Use the skeletons in this package's `templates/` directory (`../../templates/` from this skill):

- `templates/requirements.md` — overview, user stories + acceptance criteria, REQ-NNN functional requirements (P0/P1/P2), non-functional requirements, constraints/assumptions, out of scope, success metrics.
- `templates/design.md` — architecture overview, technology stack with rationale, data model, API/interface contracts, security, performance, deployment, risks table with mitigations.
- `templates/tasks.md` — phased checkbox tasks (foundation → core → testing → polish), dependencies, definition of done.

Quality bar: requirements must be testable and unambiguous; design must trace to requirements; tasks must be small, ordered by dependency, and leave the project working after each phase.

## Implementation discipline

- Work tasks sequentially; mark `- [ ]` → `- [x]` only after verification (tests pass or user confirms).
- Keep tasks.md in sync immediately after each completed task — it is the source of truth for progress.
- Never silently change scope: if a task is mis-specified, stop and propose a spec update.
- Commit after each completed task; keep specs and gates in version control.

## Version control conventions

- `spec(<NNN>): <change>` — spec document or gate changes (e.g. `spec(001): complete requirements phase`)
- `impl(<NNN>): <task summary>` — implementation commits (e.g. `impl(001): add login endpoint`)
- Branch per spec when working on several in parallel: `feature/001-<slug>`

## Troubleshooting

- No active spec → `/sdd:new <feature>` or `/sdd:switch <spec>`.
- Phase not approved → `/sdd:review` shows the current phase; `/sdd:approve <phase>` when the user is ready.
- Stale gates after doc edits → propose re-approval.
- Completed specs → move to `spec/archive/` and clear `.current-spec`.
