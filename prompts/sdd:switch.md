---
description: Switch the active specification
argument-hint: "<spec-id>"
---

# Switch Active Spec

Target: $ARGUMENTS

1. Run `ls -d spec/*/ 2>/dev/null | sort` to list existing specs.
2. If no argument was given, show the list and ask which spec to switch to; stop.
3. Resolve the target: accept a full directory name (`001-user-auth`) or a unique prefix/slug (`user-auth`). If nothing matches or multiple specs match, say so and show the list.
4. Verify the spec directory exists, then write its directory name to `spec/.current-spec` (`echo <dir> > spec/.current-spec`).
5. Show the switched-to spec's phase status and its recommended next action (as `/sdd:status` would for that spec).
