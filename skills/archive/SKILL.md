---
name: archive
description: Archive a completed change once all its tasks are done, folding its spec deltas into the project's main specs/. Optionally takes a change name as an argument, e.g. "/sdd:archive add-dark-mode".
---

# Archive

Close out a finished change.

1. If the project has root-level `specs/`, `changes/`, and/or `archive/` directories from before the `.sdd/` convention, and no `.sdd/` directory exists yet, move whichever of those three are present to `.sdd/specs/`, `.sdd/changes/`, and `.sdd/archive/` respectively (via bash: `mkdir -p .sdd && mv <dir> .sdd/`, creating `.sdd/` first), then tell the user what was moved before continuing.
2. Determine the target change the same way `/sdd:apply` does: use the name from the user's request if given, otherwise infer from context, otherwise ask the user to pick from `.sdd/changes/*/`.
3. Open `.sdd/changes/<name>/tasks.md` and confirm every task is checked off. If any are unchecked, tell the user which ones and stop — don't archive incomplete work.
4. For each file under `.sdd/changes/<name>/specs/`, merge its content into the project's top-level `.sdd/specs/` (create `.sdd/specs/` if it doesn't exist yet):
   - If a matching spec file already exists there, merge the requirement/scenario changes in rather than overwriting unrelated requirements.
   - If the change's spec content genuinely contradicts an existing requirement (not merely additive), ask the user with the clarification UI (the `clarification_ui` tool) how to reconcile it rather than guessing a merge strategy. List the recommended reconciliation first, marked "(Recommended)", plus any real alternative; the UI's free-text option covers anything else.
   - If it doesn't exist yet, move the content over as the new authoritative spec for that capability.
5. Move the entire `.sdd/changes/<name>/` directory to `.sdd/archive/<name>/` (create `.sdd/archive/` if needed), preserving `proposal.md`, `design.md`, and `tasks.md` as a historical record.
6. Confirm to the user what was archived and where the updated specs now live.
