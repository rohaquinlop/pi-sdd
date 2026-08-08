---
description: Create a new feature specification
argument-hint: "<feature-name>"
---

# New Specification

Create a new specification for: $ARGUMENTS

1. If no feature name was provided, ask the user for one and stop.
2. Run `mkdir -p spec` and `ls -d spec/*/ 2>/dev/null | sort` to see existing specs.
3. Derive the next ID: highest existing number + 1, zero-padded to 3 digits (001, 002, ...). The directory name is `<ID>-<feature-slug>`, where the slug is the feature name lowercased with spaces replaced by hyphens.
4. If the directory already exists, tell the user and suggest `/sdd:switch <dir>` instead.
5. Create `spec/<dir>/README.md` containing: feature name, creation date, and a status checklist (requirements / design / tasks / implementation — all `[ ]`).
6. Write the directory name (e.g. `001-user-auth`) into `spec/.current-spec`, overwriting any previous value (`echo <dir> > spec/.current-spec`).
7. Report what was created and tell the user the next step: `/sdd:requirements`.
