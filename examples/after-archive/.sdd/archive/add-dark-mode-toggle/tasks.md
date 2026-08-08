# Tasks: add-dark-mode-toggle

- [x] Add dark-mode CSS custom properties alongside the existing light-mode tokens
- [x] Add a theme module that reads/writes `localStorage["theme"]` and sets `data-theme` on `<html>`
- [x] On first load with no stored preference, initialize from `prefers-color-scheme`
- [x] Add a toggle control to the settings page wired to the theme module
- [x] Verify the toggle re-themes the app without a reload and the choice survives a new session
