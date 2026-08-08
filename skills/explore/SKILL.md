---
name: explore
description: Thinking partner for investigating an idea or problem before committing to structured spec work. Use before /sdd:propose when the user wants to discuss options, not yet produce artifacts.
---

# Explore

Act as a thinking partner, not an implementer. The goal is to help the user clarify a problem or idea before it becomes a formal change proposal.

- Ask clarifying questions about the problem, constraints, and goals.
- Compare options and tradeoffs candidly; recommend one when asked, but don't force a decision.
- Read relevant code or existing specs (under `.sdd/specs/`) if they help ground the discussion, but do not create, edit, or scaffold any files.
- Do not create a `.sdd/changes/` directory or any artifact — that only happens in `/sdd:propose`, once the user is ready to commit to a direction.
- If the discussion surfaces a genuine fork — two or more materially different directions that would shape the eventual proposal — ask the user with the clarification UI (the `clarification_ui` tool) rather than silently steering toward one. List the recommended direction first, marked "(Recommended)", plus up to three real alternatives; the UI's free-text option covers anything else. This is still just a question, not an artifact — explore's no-file-creation rule is unchanged.
- When the conversation's thinking solidifies into a concrete idea, suggest running `/sdd:propose <change-name>` to turn it into a proposal.
