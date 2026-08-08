---
description: Show all specifications, their phase gates, and task progress
---

# Spec Status Report

## Gather Context

Run with bash:
- `ls -d spec/*/ 2>/dev/null | sort`
- `cat spec/.current-spec 2>/dev/null || echo "(none)"`
- For each spec directory, check which of `requirements.md`, `design.md`, `tasks.md` and the three `.X-approved` gates exist.
- For specs with tasks.md: `grep -c "^- \[x\]" spec/<dir>/tasks.md` (done) and `grep -c "^- \[" spec/<dir>/tasks.md` (total).

## Report

Present a compact table: **spec** (directory), **req / des / tasks** (✓ created, ✓* approved, – missing), **progress** (n/m, %), **active** (marker). Then:

- Highlight the active spec.
- Give one **recommended next action** for it: create requirements, approve requirements, start design, approve design, break down tasks, approve tasks, or implement.
- If there is no active spec, suggest `/sdd:new` or `/sdd:switch`.
