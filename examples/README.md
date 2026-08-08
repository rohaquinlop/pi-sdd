# Example: adding a dark mode toggle

This walks through the full `explore → propose → apply → archive` loop on a small, realistic feature — a light/dark theme toggle for a fictional web app. Each stage's actual file output lives in this folder so you can see exactly what the workflow produces, not just describe it.

## 1. `/sdd:explore`

Before committing to anything, just talk it through. No files are created at this stage:

> **You:** Users keep asking for dark mode. Where should the theme choice live — cookie, localStorage, or a backend user setting?
>
> **Claude:** For a client-only preference like this, `localStorage` is simplest and avoids a backend round trip. Only move it server-side later if you need the preference to follow a user across devices.

Once the direction feels solid, move to `/sdd:propose`.

## 2. `/sdd:propose add-dark-mode-toggle`

This scaffolds `.sdd/changes/add-dark-mode-toggle/` with a proposal, a design, an initial task list, and a proposed spec delta. See [`after-propose/.sdd/changes/add-dark-mode-toggle/`](./after-propose/.sdd/changes/add-dark-mode-toggle/):

- [`proposal.md`](./after-propose/.sdd/changes/add-dark-mode-toggle/proposal.md) — problem, scope, approach, acceptance criteria
- [`design.md`](./after-propose/.sdd/changes/add-dark-mode-toggle/design.md) — the CSS-custom-properties + `localStorage` approach, and why live OS-preference switching was rejected
- [`tasks.md`](./after-propose/.sdd/changes/add-dark-mode-toggle/tasks.md) — unchecked implementation steps
- [`specs/dark-mode.md`](./after-propose/.sdd/changes/add-dark-mode-toggle/specs/dark-mode.md) — the proposed behavior as Given/When/Then scenarios

At this point nothing has touched real application code yet — these are planning artifacts only.

## 3. `/sdd:apply add-dark-mode-toggle`

Claude works through `tasks.md` top to bottom, writing the actual CSS/JS/toggle-control code in your app (not shown here, since this example repo has no real app to modify), checking off each task as it's implemented and verified.

## 4. `/sdd:archive add-dark-mode-toggle`

Once every task is checked off, this folds the spec delta into the project's top-level `.sdd/specs/` and moves the change to `.sdd/archive/`. See [`after-archive/.sdd/`](./after-archive/.sdd/):

- [`specs/dark-mode.md`](./after-archive/.sdd/specs/dark-mode.md) — now the project's authoritative spec for this capability (there was no prior `specs/dark-mode.md`, so it's created fresh rather than merged)
- [`archive/add-dark-mode-toggle/`](./after-archive/.sdd/archive/add-dark-mode-toggle/) — `proposal.md` and `design.md` preserved as history, `tasks.md` fully checked off

## What if a repo has no `.sdd/specs/` at all yet?

That's the normal starting state, not an error. `/sdd:propose` only *reads* `.sdd/specs/` if it exists, to stay consistent with prior decisions — it's optional context, not a requirement. `/sdd:archive` handles the rest: if a matching file already exists under the project's `.sdd/specs/`, it merges the change's spec delta in; if it doesn't, it just creates it — exactly what happens in this example, where `specs/dark-mode.md` didn't exist before this change archived. The very first change run through the workflow is how a project's `.sdd/specs/` gets bootstrapped.
