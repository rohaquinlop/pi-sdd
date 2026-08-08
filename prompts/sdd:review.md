---
description: Review the current phase of the active spec
---

# Review Current Phase

## Gather Context

Run with bash:
- `cat spec/.current-spec 2>/dev/null`
- `ls -la spec/<active>/` — which documents and gates exist

## Task

1. Determine the current phase: the first phase whose gate is missing (requirements → design → tasks → implementation).
2. Read and display the relevant document (or state that it does not exist yet).
3. Review it against a checklist:
   - **requirements** — complete, unambiguous, testable; acceptance criteria present for each user story; priorities assigned
   - **design** — covers every functional requirement; risks identified with mitigations; no obvious gaps
   - **tasks** — ordered by dependency; each task small and verifiable; each phase leaves a working state
   - **implementation** — tasks.md checkboxes reflect reality
4. List concrete issues found (specific, not generic), then remind the user how to proceed: fix the document first, or `/sdd:approve <phase>` when ready.
