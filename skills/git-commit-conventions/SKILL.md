---
name: git-commit-conventions
description: Use when changes are about to be committed or pushed — deciding how to split work into commits, writing commit messages, committing a finished step or a human's correction, renaming files, or pushing to the remote.
---

# Git Commit Conventions

**Topic:** Version control practice for step-by-step, AI-assisted work. The history is evidence: each commit shows one step and who made it.

## Overview

**Core rule: one commit = one meaningful change. Small changes with the same purpose may go into one commit; changes with different purposes never share a commit. The message says what changed, nothing else.**

## Splitting work into commits

| Situation | Commits |
| --- | --- |
| One technique step done by the agent (e.g. a test basis, one category of checklist items, one recorded session) | One commit for that step |
| The human edits the agent's output afterwards | A second, separate commit with the human's change — never amend it into the agent's commit |
| Several small edits with one purpose (fix the same name in five files, translate one document) | One commit |
| A rename or move plus the reference updates it needs | One commit, so every commit leaves the project consistent |
| A new artifact plus its AI-use log entry (if the project logs AI use) | Two commits: the artifact, then the log entry |
| Changes with different purposes made in one session | One commit per purpose, in the order they depend on each other |

Never put two steps, two sessions or two participants in one commit. Never mix a refactor with new content.

## Message format

```
<type> (<scope>): <what changed>
<type>: <what changed>            # when no scope fits
```

| Type | For |
| --- | --- |
| `feat` | New capability: a new skill, script, template, command |
| `fix` | Correcting something wrong |
| `refactor` | Restructuring without changing what it does (rename, merge, move, generalise) |
| `docs` | Documents, reports, logs, plans |
| `test` | Test artefacts: test basis, test items, results, sessions, analysis |
| `chore` | Housekeeping: ignore rules, folder skeletons, tooling |

- Scope = the area changed: a task folder, `skills`, `ai`, `bugs`, `gui`, `usability` …
- Lower case, imperative ("add", "record", "merge"), no full stop, about 50–72 characters.
- Describe the change, e.g. `test (gui): generate form items for the checkout screen`.
- **Never** label who drafted or reviewed it: no "AI draft", "review", "step 3", "WIP".
- **No trailers** that attribute the work to an AI (no `Co-Authored-By`), unless the project asks for them.

## Before committing

1. `git status --short`: look at every changed file.
2. Stage explicit paths (`git add <paths>`); use `git add -A` only when every change belongs to this commit.
3. Never commit files the project keeps private or out of the repository: ignored course materials, participants' personal data, secrets, build output, archives. If one of them shows up, add it to `.gitignore` in its own `chore` commit.
4. Rename with `git mv` so history follows the file.
5. `git diff --cached --stat`: the staged set matches the purpose of the message.

## Committing and pushing

- Commit when a step is finished and the project's rules or the human ask for it. If the human wants to review before committing, show the suggested commit commands and stop.
- Push only when the human asks, or when the project says every finished change is pushed. Push to the project's remote and branch, then check `git status -sb` shows the branch in sync.
- Never rewrite pushed history (no force push, no amend of a pushed commit). For an unpushed commit, amend only to fix that commit's own content or message.

## Reply shape when committing

1. The commits made: `hash message`, one per line.
2. Push result (or "not pushed – waiting for review").
3. Anything left uncommitted, and why.
4. **AI self-review**: fix what can be fixed first, then score [review-rubric.md](review-rubric.md) as `# | Score (2/1/0/N/A) | Evidence | Action` (rules in [../review-rubric-shared.md](../review-rubric-shared.md)), and end with `Gate: passed` or `Gate: blocked by <#>`.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| "One big commit for the whole session" | Split by purpose; the history must show each step. |
| Amending the human's correction into the agent's commit | Separate commit: the correction is evidence of review. |
| `git add -A` picked up a private file | Unstage it, add it to `.gitignore`, commit that separately. |
| Message says "AI draft of step G2" | Say what changed: "generate form items for the checkout screen". |
| Rename in one commit, broken links fixed in the next | Rename and reference updates belong together. |
