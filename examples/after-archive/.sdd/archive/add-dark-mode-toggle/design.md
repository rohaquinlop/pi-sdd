# Design: add-dark-mode-toggle

## Technical Approach

- Define color tokens as CSS custom properties on `:root` and `[data-theme="dark"]` in the global stylesheet.
- A small theme module reads/writes `localStorage["theme"]` (`"light" | "dark"` | absent) and sets `document.documentElement.dataset.theme` accordingly on load.
- When no stored preference exists, evaluate `window.matchMedia("(prefers-color-scheme: dark)")` once on load to pick the initial theme.
- The settings page toggle calls the same module to flip the theme and persist the new choice.

## Alternatives Considered

Live-updating on OS preference change (via a `matchMedia` listener) was considered but rejected — it's explicitly out of scope per the proposal, and adds complexity for a rare case (switching OS theme mid-session).

## Open Questions

None outstanding.
