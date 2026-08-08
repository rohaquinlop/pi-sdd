---
description: Create or review the requirements specification for the active spec
---

# Requirements Phase

## Gather Context

Run these first with bash:
- `cat spec/.current-spec 2>/dev/null` — if empty or missing, tell the user to run `/sdd:new <feature>` or `/sdd:switch <spec>` and stop.
- `ls spec/<active>/` — check whether requirements.md already exists.

## Task

If requirements.md does not exist, create `spec/<active>/requirements.md` with:

- **Feature Overview** — one paragraph on what is being built and why
- **User Stories** — "As a ... I want ... so that ...", each with acceptance criteria as checkboxes
- **Functional Requirements** — grouped Must Have (P0) / Should Have (P1) / Nice to Have (P2), numbered REQ-001, REQ-002, ...
- **Non-Functional Requirements** — performance, security, reliability, usability
- **Constraints and Assumptions**
- **Out of Scope**
- **Success Metrics**

Every requirement must be testable and unambiguous. If the conversation contains relevant context (notes, past decisions, existing code), fold it in.

If requirements.md already exists: read it, give a short summary, and list concrete improvement suggestions (ambiguities, missing acceptance criteria, unmeasurable metrics).

## After

Remind the user to review the document and run `/sdd:approve requirements` when ready. Do not start design.
