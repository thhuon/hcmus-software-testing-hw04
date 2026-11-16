---
name: automation-bug-reporting
description: Use when an automated test fails because of a product defect (confirmed in failure triage) and the defect must be reported — checking whether the issue tracker or an earlier manual test round already has the bug, adding the automation evidence as a comment on that existing issue (also when the behaviour now differs from the earlier report), or writing a new bug-report entry and GitHub issue with the screenshot from the failed run.
---

# Automation Bug Reporting

**Topic:** Defect reporting for automated tests, when the tracker may already hold bugs from earlier (manual) test rounds. **Sources:** [REQ], [TRACKER]; codes in `../SOURCES.md`. Input: the T7 triage of the test-automation skill.

## Overview

An automated test often re-finds a defect that a manual round already filed. A second issue for it splits the history and inflates the count; silence loses the new evidence (which browsers, which data row, the assertion's received value). This skill matches every confirmed product failure against the tracker first, then either **comments on the existing issue** or **files a new one**.

**Core rule: one defect = one `BUG-NN` entry in the bug report + exactly one tracker action (comment on the existing issue, or a new issue) with the screenshot visible in it. Commenting and filing are outward-facing: the human sees the text and says yes first.**

| Outcome | When | Tracker action |
| --- | --- | --- |
| **Confirmed** | Same requirement sentence and same wrong behaviour as an existing issue | Comment: automation evidence, "still reproduces" |
| **Changed** | Same requirement sentence, but the behaviour differs from the issue (other message, other browsers only, fixed for some inputs, now passes) | Comment: what differs, with the evidence |
| **New** | No existing issue breaks the same requirement sentence in the same way | New issue in the tracker's template, plus the project's label for this round |

A previously reported bug whose test **now passes** is also a "Changed" comment (the defect may be fixed); it has no `BUG-NN` failure but keeps its row in the bug report.

## Project context (read first)

Take these from the project's instructions (CLAUDE.md, README or the assignment):

- The issue repository, its README / issue template / labels, and the `gh` account.
- The earlier bug report(s) whose issues may match (file and issue numbers).
- The words or label that mark this round (e.g. a round tag in comments, an extra label on new issues).
- The bug-report file, reporter line, requirement document, application URLs.
- Rules for commits and AI-use logging.

**Without a project layout**, use `bugs/BUG_REPORT.md` (copy [templates/bug-report.md](templates/bug-report.md)) and `bugs/screenshots/`.

Before the first action: `gh auth status` (the right account is active), `gh repo view <owner/repo> --json hasIssuesEnabled`, `gh label list --repo <owner/repo>`, and read the tracker README + `.github/ISSUE_TEMPLATE/`.

## Step 1 – match and write the entry (one prompt per defect or per small group)

1. **Inputs from the run**: spec › test title, data row, browsers where it fails, the assertion's expected vs received (from the HTML report or `results.json`), the failure screenshot (`test-results/…/test-failed-1.png`, or the report attachment). Copy the screenshot to `bugs/screenshots/<TC ID>_<browser>.png`.
2. **Match**: search the earlier bug report and the tracker:
   ```bash
   gh issue list --repo <owner/repo> --state all --search "<FR-xx> <keyword> in:title,body" --limit 50
   ```
   A match needs the **same requirement sentence and the same wrong behaviour**; the same feature is not enough. List the candidates you rejected and why.
3. **Write BUG-NN** in the bug report (next free number): overview row `BUG-NN | Requirement | Title | Found by (spec › test, data row) | Browsers | Outcome | Tracker link | Severity / Priority`, and a detail block:
   - Requirement quoted verbatim with `file:line`; Expected from it; **Actual = the assertion's received value and the screenshot**, not a guess of the cause.
   - Steps: the data row and the test's actions in plain words, so a person can reproduce it without Playwright.
   - Severity / Priority: for a match, take the existing issue's; for a new bug, propose from the tracker's scale, marked `(proposed – to be confirmed)`.
4. **Write the link back** in the test-automation design §8 (`Bug / issue` column).
5. **Show the tracker text** (comment or issue body, below) in the reply; do not send it yet.

### Comment on an existing issue

```markdown
**<round tag> – automated re-test** (<Confirmed | Changed>)

- **Script:** `<tests/…/x.spec.ts>` › `<test title>` · data row `<id>` in `<data file>`
- **Browsers:** Chromium <version> ✗ · Firefox <version> ✗ · WebKit <version> ✓
- **Assertion:** expected `<value quoted from the requirement>` — received `<value>`
- **Report:** `<reports/…/index.html>` (run <ISO timestamp>, commit `<hash>`)
- **Difference from this issue:** <none – same behaviour | what differs>
- **Screenshot:** <image>

Reporter: <reporter line>
```

### New issue

Follow the tracker's template field by field (`### <label>` headings when filing with `gh`) and its title format. "Found by" = the spec › test and data row, plus the technique of the automated test case if the tracker labels by technique. Add the round's label when the project names one.

## Step 2 – send (only after the human says yes)

1. **Screenshot visible in the tracker.** `gh` cannot upload images. Either the human drags the image into the issue / comment in the browser, or run `node scripts/upload_attachments.js <owner/repo> <map.json> <out.json>` (header of the script: a Chrome window opens, the human logs in, the image is dropped into the comment box of the issue and the returned `<img … user-attachments …>` markup is read back; nothing is posted) and paste the markup into the body. Delete the browser profile afterwards.
2. Send:
   ```bash
   gh issue comment <n> --repo <owner/repo> --body-file <tmp file>            # Confirmed / Changed
   gh issue create --repo <owner/repo> --title "<title>" --body-file <tmp file> \
     --label "<labels>" --assignee @me                                         # New
   ```
   Only existing labels. A `502` does not say whether it was posted: list the issue / comments before retrying. Delete the temporary body file.
3. Write the comment URL / issue number into the bug report and design §8.
4. Proof for the submission when asked: a screenshot of the tracker filtered to this round (label or search) and of each commented issue.

## Every reply has exactly this shape

1. Bug ID, test and outcome (Confirmed / Changed / New), one line.
2. The entry (Step 1) with the tracker text, or the links sent (Step 2).
3. **To confirm**: the match decision (with rejected candidates), severity / priority for a new bug, "send it?". Each 2–4 bullets with a recommendation.
4. **AI self-review**: fix what can be fixed first, then score P1–P6 of [../review-rubric-shared.md](../review-rubric-shared.md) and the step's table of [review-rubric.md](review-rubric.md) as `# | Score (2/1/0/N/A) | Evidence | Action`, and end with `Gate: passed` or `Gate: blocked by <#>`.
5. **Suggested commit** and **Next step**. Then stop.

## Commits and AI-use log

Follow git-commit-conventions:

```bash
git commit -m "docs (bugs): report BUG-NN for <TC ID> (<confirmed #n | changed #n | new>)"
git commit -m "docs (bugs): link BUG-NN to <comment on #n | issue #n>"   # after sending
```

If the project keeps an AI audit log or a prompt log, add one entry per bug in the same turn.

## Integrity

| Excuse | Reality |
|--------|---------|
| "Same feature, close enough — comment on that issue" | A match needs the same requirement sentence and the same wrong behaviour. Otherwise it is a new bug. |
| "File a new issue anyway, more bugs look better" | A defect already in the tracker gets a comment; duplicates are closed as duplicates and count for nothing. |
| "The test now passes, nothing to report" | A previously reported bug that no longer reproduces is a "Changed" comment: the team needs to know. |
| "Explain the cause from the source code" | Actual is the received value and the screenshot. The cause is not part of the report. |
| "The human is busy, post all comments now" | Comments and issues are public and carry the human's name; they approve the text first. |
| "No screenshot, the assertion text is enough" | Every comment and issue carries its screenshot from the failed run. |
