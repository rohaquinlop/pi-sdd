# Proposal: add-dark-mode-toggle

## Problem

Users working at night or in low-light environments have asked for a dark theme. The app currently only ships a light palette, forcing anyone who wants dark mode to rely on a browser extension.

## Scope

**In scope:**
- A light/dark toggle in the settings page
- Persisting the user's choice across sessions
- Defaulting to the OS-level preference when the user hasn't chosen one

**Out of scope:**
- Per-component custom theming beyond light/dark
- A third "auto" mode that switches mid-session when the OS preference changes live

## Approach

Use CSS custom properties for color tokens, switched via a `data-theme` attribute on `<html>`. Store the user's explicit choice in `localStorage`; fall back to `prefers-color-scheme` when unset.

## Acceptance Criteria

- Toggling in settings immediately re-themes the whole app, no reload required
- The choice survives a page reload and a new browser session
- A user who has never toggled it sees dark mode automatically if their OS is set to dark
