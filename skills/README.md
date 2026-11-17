# Testing skills – web test automation

Claude Code skills (Agent Skills format: one folder per skill, `SKILL.md` with `name` / `description` frontmatter). One skill per testing topic; each skill holds the whole technique as numbered steps, run one step per prompt. The skills hold no project values, so they can be reused on other features and projects.

| Topic | Skill | Steps | Supporting files |
| --- | --- | --- | --- |
| Test automation | [test-automation](test-automation/SKILL.md) | Tools and approaches per step (codegen, UI mode, Inspector, trace viewer, Test Agents; POM, data-driven, API, optional BDD / visual / accessibility / CI) · T1 select test cases → T2 locators and page objects → T3 test data file → T4 generate data-driven specs → T5 review and fix → T6 multi-browser runs → T7 failure triage → T8 summary | `scripts/run-browsers.mjs` (one run + HTML report per feature × browser), `scripts/summarize-results.mjs` (counts from the JSON results), `templates/`: Playwright config, `automation.config.json`, automation design |
| Defect reporting | [automation-bug-reporting](automation-bug-reporting/SKILL.md) | Step 1 match against the tracker and write the entry → Step 2 comment on the existing issue or file a new one | `scripts/upload_attachments.js` (screenshot markup for an issue or comment), `templates/bug-report.md` |
| Demo video | [recording-test-demo-videos](recording-test-demo-videos/SKILL.md) | V1 requirements → V2 shot list → V3 prepare → V4 record (tester) → V5 cut and check | `templates/shot-list.md` |
| Version control | [git-commit-conventions](git-commit-conventions/SKILL.md) | Which repository → split work into commits → message format → commit and push (own repositories only; a shared repository keeps its own convention) | – |

Typical chain: test-automation → automation-bug-reporting (every confirmed product defect) → recording-test-demo-videos; git-commit-conventions after every step. Reused from earlier work: logging-ai-prompts (prompt log from the session transcript).

**Vietnamese reading copies:** every skill has `SKILL.vi.md` and `review-rubric.vi.md` (shared rules: [review-rubric-shared.vi.md](review-rubric-shared.vi.md)). The English files are the ones the agent uses; if the two differ, the English file wins.

## Using the skills in a project

Install by symlink, either per project in `<project>/.claude/skills/<name>` or for every project in `~/.claude/skills/<name>`, pointing to the skill folder.

Each skill reads its "Project context" from the project's instructions, best kept in the project's `CLAUDE.md`:

- **System under test:** URLs, start commands, requirement document, features in scope and where their designed test cases are.
- **Minimums:** test cases per feature, assertion patterns, browsers, data file format.
- **Report identity:** the text every HTML report shows (e.g. `Run by: <ID>`).
- **Working files:** the automation design per feature (template), the bug report, the shot list.
- **Issue tracker:** repository, `gh` account, template and labels, the earlier bug report to match against, the tag / label of this round.
- **Process rules:** commit convention, AI-use logging (audit row, prompt log), who confirms what.

A value that is missing is asked once, and the agent proposes adding it to `CLAUDE.md`.

Every skill has a `review-rubric.md`: one table per step, criteria numbered 1, 2, 3 …, each M (must) or S (should) with how to check it. Scoring, the gate and the process criteria P1–P6 that all skills share are in [review-rubric-shared.md](review-rubric-shared.md). The agent scores the rubric after every step and reports a step as done only when every M criterion is met; the human uses the same files to review.

## Shared rules of every skill

- **One technique step per prompt.** Each step's input is the reviewed and committed output of the previous step.
- **The human decides** every verdict, every "why the AI missed it", every severity and every tracker action. The agent writes proposals marked `(proposed)`.
- **No fabricated evidence.** Runs, reports, screenshots, recordings and narration come from the tester's machine and voice.
- **Commits** follow git-commit-conventions.

## Knowledge sources

See [SOURCES.md](SOURCES.md).

## How the skills were tested

The skills were written from the sources in SOURCES.md and are reviewed by their author while in use.

The scripts were run on a throw-away suite (three tests: one passing, one failing on Firefox only, one skipped) on Chromium and Firefox: `run-browsers.mjs` gave one HTML report and `results.json` per browser with the feature, browser, identity text and ISO timestamp in the report title, and refused an unknown feature key (exit 2); `summarize-results.mjs` counted 2 runs, 3 automated / 2 executed / 1 passed / 1 failed test cases, and the per-browser table.
