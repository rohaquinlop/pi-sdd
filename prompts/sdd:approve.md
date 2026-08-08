---
description: Approve a specification phase — creates the gate marker
argument-hint: "requirements|design|tasks"
---

# Approve Phase

Phase to approve: $ARGUMENTS

1. Validate the argument: it must be exactly one of `requirements`, `design`, `tasks`. Otherwise list the valid options and stop.
2. Run `cat spec/.current-spec 2>/dev/null` to find the active spec. If missing, tell the user to run `/sdd:new` or `/sdd:switch` first and stop.
3. Verify the phase document exists (`test -f spec/<active>/<phase>.md`). If not, tell the user to create it first (`/sdd:requirements`, `/sdd:design`, or `/sdd:tasks`) and stop.
4. Create the gate marker with bash: `touch spec/<active>/.<phase>-approved`.
5. Confirm to the user and state the next step:
   - after `requirements` → `/sdd:design`
   - after `design` → `/sdd:tasks`
   - after `tasks` → `/sdd:implement`

Note: if the gate already exists, do not re-approve unless the user explicitly asks (re-approving implies the document changed and needs re-review).
