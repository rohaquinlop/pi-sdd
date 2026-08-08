---
description: Mark a task in the active spec as complete
argument-hint: "<task-text-or-number>"
---

# Update Task

Task: $ARGUMENTS

1. Run `cat spec/.current-spec 2>/dev/null` — if missing, tell the user to run `/sdd:new` or `/sdd:switch` first and stop.
2. Run `grep -n "^- \[" spec/<active>/tasks.md` to list tasks with line numbers.
3. Match the argument against the list — by task text (exact or fuzzy) or by line number. If nothing matches, show the list and ask.
4. Before marking done, verify the task is genuinely complete (code written, tests pass, or the user confirms).
5. Edit `spec/<active>/tasks.md`: change `- [ ]` to `- [x]` on the matched line.
6. Show updated progress: done/total and percentage, then suggest the next task or the next phase.
