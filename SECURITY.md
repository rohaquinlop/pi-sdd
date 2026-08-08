# Security Policy

## Threat model

This repo ships only Markdown and JSON — no dependencies, no scripts that run at install or load time, nothing that executes on `git pull` or `pi install` beyond pi itself reading Markdown. The realistic security concerns for a project like this are:

- A skill's *instructions* being subtly misleading in a way that causes pi to take an unintended or unsafe action in a user's project (e.g. writing outside the intended `changes/`/`specs/`/`archive/` convention, or being worded to encourage skipping review).
- A `package.json` manifest pointing somewhere other than what it claims to.

There is no runtime, network call, or credential handling in this project to compromise — reports should focus on the above.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting instead of opening a public issue: go to this repository's **Security** tab → **Report a vulnerability**. This lets us discuss and fix the issue before it's public.

If you're not sure whether something rises to the level of a security issue, err on the side of reporting privately — worst case, we'll suggest reopening it as a regular public issue.

## Scope

In scope: the contents of this repository (skills, templates, manifests).
