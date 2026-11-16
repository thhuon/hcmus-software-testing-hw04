# Review rubrics – shared rules

Every skill has a `review-rubric.md` with its own criteria. This file holds what all of them share. The agent scores the rubric after every step; the human uses the same files to review the agent's work.

## Scoring

| Score | Meaning |
| --- | --- |
| 2 | Met; the evidence names concrete IDs (control code, requirement #, item #, P0x, commit hash) |
| 1 | Partly met; say what is missing |
| 0 | Missing or wrong |
| N/A | Does not apply here; give the reason |

## Gate

A step is reported as done only when every **M** (must) criterion of the step scores 2, or scores 1 / 0 only because it waits for a human decision or input listed in the reply. **S** (should) criteria below 2 are reported, not blocking.

## Output at the end of every reply

1. Fix what can be fixed from the files, then score.
2. Table `| # | Score | Evidence | Action |` with P1–P6 and the criteria of the step's table in the skill rubric.
3. `Gate: passed` or `Gate: blocked by <#>`.

Reviewing a finished file (the human asks for a review instead of a step): score every criterion of the steps already done and report; do not edit unless asked.

## Process criteria (every step of every testing skill)

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| P1 | M | Only the current step was done | Only that step's file section changed (plus count lines and the AI-use log entry) |
| P2 | M | The previous step is committed before this one starts | `git status --short` of the working folder was clean, or the reply stopped with the commit commands |
| P3 | M | The human's corrections from the last reply are applied | Every requested change is in the file, as its own commit; nothing rejected is still there |
| P4 | M | Human-only content is left to the human | Verdicts and severities only as `(proposed)`; no result, observation, quote, score, screenshot or "why the AI missed it" the human did not give |
| P5 | S | Open points are questions | Each "Decisions needed" item: the issue, why the human decides, the options, a recommendation |
| P6 | M | Commit and log follow the project rules | One commit per step (git-commit-conventions); AI-use log entry in the same turn if the project keeps one |
