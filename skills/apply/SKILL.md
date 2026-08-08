---
name: apply
description: Implement a change's tasks.md against real code, checking off tasks as they complete. Use once a change has been proposed. Optionally takes a change name as an argument, e.g. "/sdd:apply add-dark-mode".
---

# Apply

Implement the tasks for an existing change.

1. Determine the target change:
   - If the user's request names a change, use `.sdd/changes/<name>/`.
   - Otherwise, infer it from conversation context or the most recently modified directory under `.sdd/changes/`.
   - If ambiguous, list the available `.sdd/changes/*/` directories and ask the user to pick one.
2. If `.sdd/changes/<name>/tasks.md` doesn't exist, stop and tell the user to run `/sdd:propose` first — this command never creates missing artifacts.
3. Read `proposal.md`, `design.md`, `tasks.md`, and `specs/*.md` in the change directory to load full context before writing code.
4. Work through the unchecked tasks in `tasks.md` in order:
   - Implement each task in the real codebase, following existing project conventions.
   - Check off the task (`- [x]`) in `tasks.md` immediately once it's done and verified (run tests/build where applicable).
   - If implementation reveals a fork the plan didn't anticipate — a genuinely ambiguous choice with real alternatives, not a trivial detail — ask the user with the clarification UI (the `clarification_ui` tool) before proceeding. List the recommended option first, marked "(Recommended)", plus up to three genuine alternatives; the UI's free-text option covers anything else.
   - If implementation reveals that `design.md` or `proposal.md` needs to change (a flawed assumption, a missed edge case, or the resolution of a fork above), edit that artifact directly and keep going — don't restart or ask permission for small course corrections, but do flag any change that alters the original scope.
5. Only edit files that are either planning artifacts under `.sdd/changes/<name>/` or code required by a task — don't scope-creep into unrelated files.
6. When all tasks are checked off, tell the user the change is ready for `/sdd:archive`.
