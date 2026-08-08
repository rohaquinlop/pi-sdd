# Changelog

All notable changes to this project are documented here. See [README.md#versioning](./README.md#versioning) for the versioning policy.

## [0.1.0] - 2026-08-06

Initial release — a port of [spec-driven-framework](https://github.com/rohaquinlop/spec-driven-framework) v0.3.0 to pi.

### Added

- `pi` package manifest (`package.json` → `pi.skills`, `pi.prompts`); no dependencies, no telemetry
- Four skills implementing the `explore → propose → apply → archive` workflow (`skills/explore`, `skills/propose`, `skills/apply`, `skills/archive`), ported from the original with `AskUserQuestion` translated to pi's `clarification_ui` tool
- `/sdd:*` prompt templates dispatching to the skills (`prompts/sdd:explore.md`, `prompts/sdd:propose.md`, `prompts/sdd:apply.md`, `prompts/sdd:archive.md`)
- Planning artifact templates (`templates/proposal.md`, `templates/design.md`, `templates/tasks.md`, `templates/spec.md`)
- Full dark-mode-toggle workflow walkthrough under `examples/`
- Specs for the framework itself under `.sdd/specs/` (directory layout, interactive clarification)
- Validation script (`scripts/validate.mjs`) and CI workflow validating skills, templates, and command expansion
