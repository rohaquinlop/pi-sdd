---
description: Implement the active spec's approved tasks, phase by phase
argument-hint: "[phase-number]"
---

# Implementation Phase

## Gather Context

Run with bash:
- `cat spec/.current-spec 2>/dev/null`
- `test -f spec/<active>/.tasks-approved && echo approved || echo "NOT approved"`
- `grep -n "^- \[" spec/<active>/tasks.md` — numbered task list

## Task

1. If tasks are not approved, tell the user to run `/sdd:review` then `/sdd:approve tasks`; do not implement.
2. If a phase number was given ($1), focus only on that phase's tasks; otherwise start from the first incomplete task.
3. Show the user the incomplete tasks, then implement them one at a time, in order:
   - implement the code for the task
   - run the relevant tests / verification
   - only then mark the task done: edit `spec/<active>/tasks.md`, `- [ ]` → `- [x]`
   - commit the completed work (see conventions below)
4. When all tasks in the phase are done, report progress (as `/sdd:status` would) plus the next phase or follow-up.

## Discipline

- Never mark a task complete without verification (tests pass, or the user confirms).
- If a task proves mis-specified or impossible, stop and propose updating the spec (requirements/design/tasks) instead of silently changing scope.
- Keep tasks.md in sync after every completed task — it is the source of truth for progress.
- Commit message convention: `impl(<NNN>): <task summary>` for implementation commits, `spec(<NNN>): <change>` for spec document changes, where <NNN> is the spec ID (e.g. `impl(001): add login endpoint`).
