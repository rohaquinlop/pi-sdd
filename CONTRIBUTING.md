# Contributing

This project's entire pitch is that anyone can read every instruction it ships before trusting it. Contributions need to hold up to that standard.

## Ground rules

- **No runtime code.** Nothing in this package executes on a user's machine beyond what pi itself does when it reads a `SKILL.md`. `package.json` is metadata for pi's package loader — don't add dependencies, scripts, hooks, or MCP servers that run at install or load time. The single exception is `scripts/validate.mjs`, a dev-time check that never runs on install or inside a session.
- **No dependencies.** No third-party libraries, nothing fetched at install or run time beyond the git clone the user already initiated.
- **No telemetry.** Nothing that phones home, no analytics, no usage tracking — not even "anonymous" tracking.

If a change needs any of the above to work, it doesn't belong in this repo.

## Adding or editing a skill

- Match the style of the existing `skills/*/SKILL.md` files: a short frontmatter `name` and `description` that say what the skill does and when to use it, then a numbered or bulleted instruction body — no filler, no restating the description.
- Keep instructions imperative and specific (file paths, directory conventions) rather than vague ("update the relevant files").
- State explicitly what the skill must *not* do, if that's a meaningful boundary (see how `apply` and `archive` each defer to `propose` for creating missing artifacts).
- If the skill reads templates, reference their actual path in `templates/` (relative to the package root).

## Adding or editing a template

- Templates are skeletons with section headers and short guidance comments — not filled-in examples. Filled-in examples belong in `examples/`, not `templates/`.
- Keep the `Given/When/Then` (`WHEN`/`THEN`) scenario format in `templates/spec.md` consistent with what `skills/propose/SKILL.md` and `skills/archive/SKILL.md` expect.

## Updating the example

If a skill's behavior changes in a way that would change what `examples/` shows, update `examples/` in the same change — a stale example is worse than no example.

## Before opening a PR

Run:

```
bun scripts/validate.mjs
```

This is the same check CI runs; catch manifest and content issues locally first.

## Versioning

See [README.md#versioning](./README.md#versioning). Bump the `version` field in `package.json` per the policy (major = breaking workflow changes, minor = new skill/template, patch = wording).
