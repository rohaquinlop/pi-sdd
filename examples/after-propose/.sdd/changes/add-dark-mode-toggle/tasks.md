# Tasks: add-dark-mode-toggle

- [ ] Add dark-mode CSS custom properties alongside the existing light-mode tokens
- [ ] Add a theme module that reads/writes `localStorage["theme"]` and sets `data-theme` on `<html>`
- [ ] On first load with no stored preference, initialize from `prefers-color-scheme`
- [ ] Add a toggle control to the settings page wired to the theme module
- [ ] Verify the toggle re-themes the app without a reload and the choice survives a new session
