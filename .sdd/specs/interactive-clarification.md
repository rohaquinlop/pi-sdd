# Spec: interactive-clarification

## Requirement: Skills SHALL resolve genuinely ambiguous decisions interactively rather than silently choosing or leaving them unresolved in a file

When any of the four `/sdd:*` skills (`explore`, `propose`, `apply`, `archive`) encounters a decision point with real alternatives where the choice would materially affect the resulting artifact or code, the skill SHALL ask the user via the clarification UI (pi's `clarification_ui` tool) rather than picking silently or recording the decision as an unresolved note for later.

#### Scenario: Propose hits a non-obvious technical decision

- **WHEN** `/sdd:propose <change-name>` is drafting `design.md` and encounters a decision with real alternatives (e.g. which of two viable architectures to use)
- **THEN** it asks the user via `clarification_ui`, presenting a recommended option first (marked "(Recommended)") and up to three genuine alternatives, before writing `design.md`

#### Scenario: Propose resolves a question instead of leaving it open

- **WHEN** a decision raised during `/sdd:propose` is resolved via `clarification_ui`
- **THEN** the resolution is written into the relevant artifact (e.g. `design.md`'s `## Technical Approach`, or `proposal.md`'s `## Scope`/`## Approach`) as a decision with brief rationale, not left in `## Open Questions`

#### Scenario: Design.md's Open Questions only holds implementation-time unknowns

- **WHEN** `/sdd:propose` finishes writing `design.md`
- **THEN** `## Open Questions` contains only things that cannot be known until implementation is underway, not decisions that were resolvable at proposal time

#### Scenario: Apply hits an unanticipated implementation fork

- **WHEN** `/sdd:apply` is working through `tasks.md` and a task reveals a fork the plan didn't anticipate (e.g. an edge case with two reasonable handling strategies)
- **THEN** it asks the user via `clarification_ui` before proceeding, then edits `design.md`/`proposal.md` with the resolution per the existing course-correction rule

#### Scenario: Archive hits a genuine spec merge conflict

- **WHEN** `/sdd:archive` is merging a change's `specs/*.md` into `.sdd/specs/` and a requirement in the change's spec actually contradicts an existing requirement (not merely additive)
- **THEN** it asks the user via `clarification_ui` how to reconcile the conflict rather than guessing a merge strategy

#### Scenario: Explore surfaces a genuine direction fork

- **WHEN** a `/sdd:explore` conversation reveals a fork that would change the shape of the eventual proposal (e.g. two materially different solution strategies)
- **THEN** it asks the user via `clarification_ui` to pick a direction, without creating any files — explore's no-artifact behavior is unchanged

#### Scenario: Trivial or single-answer decisions are not asked about

- **WHEN** a decision has only one reasonable answer, or is a minor implementation detail without real alternatives
- **THEN** no skill uses `clarification_ui` for it — the guidance is scoped to genuine, materially-consequential forks only
