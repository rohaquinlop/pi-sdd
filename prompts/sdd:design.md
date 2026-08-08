---
description: Create the technical design for the active spec (requires approved requirements)
---

# Design Phase

## Gather Context

Run with bash:
- `cat spec/.current-spec 2>/dev/null`
- `test -f spec/<active>/.requirements-approved && echo approved || echo "NOT approved"`

## Task

1. If requirements are not approved yet, tell the user to finish them first (`/sdd:requirements`, then `/sdd:approve requirements`) and stop.
2. Read `spec/<active>/requirements.md` and, if present, any existing `spec/<active>/design.md`.
3. If design.md does not exist, create `spec/<active>/design.md` with:
   - **Architecture Overview** — components and data flow (ASCII or mermaid diagram where helpful)
   - **Technology Stack** — with rationale for each choice
   - **Data Model** — schemas, relationships, migrations
   - **API / Interface Design** — endpoints, contracts, error formats
   - **Security Considerations** — authentication/authorization, secrets, data protection
   - **Performance Considerations**
   - **Deployment / Operations**
   - **Technical Risks and Mitigations** — table: risk, impact, probability, mitigation
4. The design must trace to the requirements: every functional requirement should be addressed by a design element. Explicitly call out any requirement the design does not cover.

## After

Remind the user to review and run `/sdd:approve design` when ready. Do not start the task breakdown.
