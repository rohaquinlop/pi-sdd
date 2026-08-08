# Spec: sdd-directory-layout

## Requirement: All SDD artifacts SHALL live under a single `.sdd/` root directory

The system SHALL store `specs/`, `changes/<name>/`, and `archive/<name>/` as
subdirectories of `.sdd/` in the user's project, rather than as separate
top-level directories.

#### Scenario: Proposing a change in a fresh project

- **WHEN** `/sdd:propose <change-name>` runs in a project with no prior SDD
  artifacts
- **THEN** `.sdd/changes/<change-name>/proposal.md`, `design.md`,
  `tasks.md`, and `.sdd/changes/<change-name>/specs/*.md` are created, and
  no `specs/`, `changes/`, or `archive/` directory is created at the
  project root

#### Scenario: Applying a change

- **WHEN** `/sdd:apply <change-name>` runs
- **THEN** it reads and updates `proposal.md`, `design.md`, `tasks.md`, and
  `specs/*.md` under `.sdd/changes/<change-name>/`, not under a root-level
  `changes/<change-name>/`

#### Scenario: Archiving a completed change

- **WHEN** `/sdd:archive <change-name>` runs and all tasks are checked off
- **THEN** each file under `.sdd/changes/<change-name>/specs/` is merged
  into `.sdd/specs/`, and the change directory is moved to
  `.sdd/archive/<change-name>/`

#### Scenario: Exploring with existing specs present

- **WHEN** `/sdd:explore` runs in a project that already has
  `.sdd/specs/*.md`
- **THEN** it may read those files for context but creates no files,
  consistent with its existing no-artifact behavior

## Requirement: Projects on the pre-`.sdd/` layout SHALL be migrated automatically

The system SHALL detect a project that has root-level `specs/`, `changes/`,
and/or `archive/` directories from before this change, and move them under
`.sdd/` the first time `/sdd:propose` or `/sdd:archive` runs against that
project, before proceeding with the rest of the command.

#### Scenario: First propose after upgrading on a project with the old layout

- **WHEN** `/sdd:propose <change-name>` runs in a project that has a
  root-level `changes/` and/or `specs/` directory and no `.sdd/` directory
  yet
- **THEN** the existing `changes/` and/or `specs/` directories are moved to
  `.sdd/changes/` and `.sdd/specs/` respectively, the user is told what was
  moved, and the command then proceeds normally against the new location

#### Scenario: First archive after upgrading on a project with the old layout

- **WHEN** `/sdd:archive <change-name>` runs in a project that has
  root-level `changes/`, `specs/`, and/or `archive/` directories and no
  `.sdd/` directory yet
- **THEN** the existing directories are moved under `.sdd/` before the
  archive logic runs, so the merge and move happen against `.sdd/specs/`
  and produce `.sdd/archive/<change-name>/`

#### Scenario: Project already on the new layout

- **WHEN** any `/sdd:*` command runs in a project that already has a
  `.sdd/` directory
- **THEN** no migration occurs and the command operates on `.sdd/`
  directly

#### Scenario: Project has no SDD artifacts at all yet

- **WHEN** any `/sdd:*` command runs in a project with neither a
  root-level `specs/`/`changes/`/`archive/` nor a `.sdd/` directory
- **THEN** no migration occurs, since there is nothing to migrate, and the
  command proceeds to create `.sdd/`-rooted artifacts as needed
