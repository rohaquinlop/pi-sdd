# Spec: dark-mode

## Requirement: The app SHALL let a user switch between light and dark themes and remember their choice.

The system SHALL apply the user's chosen theme immediately and persist it across sessions.

#### Scenario: User toggles dark mode on

- **WHEN** a user switches the theme toggle to dark in settings
- **THEN** the whole app re-themes to dark immediately, with no page reload

#### Scenario: Returning user with a saved preference

- **WHEN** a user who previously chose dark mode reloads the app or starts a new session
- **THEN** the app loads directly in dark mode, without flashing light mode first

#### Scenario: New user with no saved preference

- **WHEN** a user who has never set a preference opens the app and their OS is set to dark mode
- **THEN** the app defaults to dark mode automatically
