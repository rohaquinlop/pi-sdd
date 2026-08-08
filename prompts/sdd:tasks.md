---
description: Break the approved design into implementation tasks (requires approved design)
---

# Tasks Phase

## Gather Context

Run with bash:
- `cat spec/.current-spec 2>/dev/null`
- `test -f spec/<active>/.design-approved && echo approved || echo "NOT approved"`

## Task

1. If design is not approved, tell the user to finish it first (`/sdd:design`, then `/sdd:approve design`) and stop.
2. Read `spec/<active>/requirements.md` and `spec/<active>/design.md`.
3. If tasks.md does not exist, create `spec/<active>/tasks.md` with:
   - **Phase breakdown** — `## Phase N: <name>` sections in dependency order (foundation → core → testing → polish)
   - **Checkbox tasks** — `- [ ] <task>` under each phase; each task specific, small, and independently verifiable
   - **Dependencies** — note which tasks must precede others
   - **Definition of Done** — what counts as complete (tests pass, reviewed, documented)
4. Order tasks so each phase leaves the project in a working state. Include verification tasks (tests, manual checks) alongside implementation tasks.

## After

Remind the user to review and run `/sdd:approve tasks` when ready. Do not start implementing.
