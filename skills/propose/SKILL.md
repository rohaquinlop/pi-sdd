---
name: propose
description: Create a new spec-driven change with proposal, design, tasks, and spec artifacts. Use when the user is ready to commit to a direction for a feature or fix. Takes the change name/idea as an argument, e.g. "/sdd:propose add-dark-mode".
---

# Propose

Scaffold a new change under `.sdd/changes/<change-name>/` from the name or idea the user provided.

1. If the project has root-level `specs/`, `changes/`, and/or `archive/` directories from before the `.sdd/` convention, and no `.sdd/` directory exists yet, move whichever of those three are present to `.sdd/specs/`, `.sdd/changes/`, and `.sdd/archive/` respectively (via bash: `mkdir -p .sdd && mv <dir> .sdd/`, creating `.sdd/` first), then tell the user what was moved before continuing.
2. Derive a short kebab-case `<change-name>` from the user's name or idea (e.g. "add dark mode toggle" → `add-dark-mode`). If no name or idea was provided, ask the user for one before continuing.
3. If `.sdd/changes/<change-name>/` already exists, tell the user and ask whether to continue editing it instead of creating a new one.
4. Read the templates at `templates/proposal.md`, `templates/design.md`, `templates/tasks.md`, and `templates/spec.md` (paths relative to this package's root; from this skill file: `../../templates/`) to see the expected structure. Do not copy their placeholder text verbatim — use them only as a shape to fill in with real content.
5. Investigate the existing codebase and any existing `.sdd/specs/` in the user's project enough to write a grounded proposal — reuse existing patterns and conventions rather than inventing new ones.
6. Before writing `design.md`, resolve any non-obvious technical or scope decision — one with real alternatives where the choice would materially affect the approach — by asking the user with the clarification UI (the `clarification_ui` tool). List the recommended option first, marked "(Recommended)", plus up to three genuine alternatives; the UI's free-text option covers anything else. Fold the resolved answer into `design.md`'s `## Technical Approach` or `proposal.md`'s `## Scope`/`## Approach` as a decision with brief rationale — don't leave it as an open question. Only decisions that truly cannot be known until implementation belong in `design.md`'s `## Open Questions`.
7. Create these files, writing real content (not placeholders):
   - `.sdd/changes/<change-name>/proposal.md` — problem, scope (in/out), approach, acceptance criteria.
   - `.sdd/changes/<change-name>/design.md` — technical approach, architecture notes, and any open questions. Skip sections that add no value for a small change.
   - `.sdd/changes/<change-name>/tasks.md` — a checkbox list of small, independently verifiable implementation steps, ordered sensibly.
   - `.sdd/changes/<change-name>/specs/*.md` — one file per affected capability, using Given/When/Then scenarios (`#### Scenario:` / `- **WHEN** ...` / `- **THEN** ...`) per `templates/spec.md`. These describe the *proposed* behavior; they are not yet the project's authoritative specs.
8. Summarize what was created and suggest `/sdd:apply` as the next step.

Never write application code in this step — only planning artifacts.
