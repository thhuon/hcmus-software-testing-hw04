# Review rubric – Automation bug reporting

Shared rules (scoring, gate, output, process criteria P1–P6): [../review-rubric-shared.md](../review-rubric-shared.md).
Sources: [REQ] · [TRACKER] · the test-automation design §8 (triage).

## Step 1 – match and entry

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 1 | M | The failure is a confirmed product defect | design §8 verdict confirmed by the tester; oracle quoted; reproduced on rerun |
| 2 | M | The tracker and the earlier report were searched | The `gh issue list` query and the candidates (accepted / rejected with reason) are in the reply |
| 3 | M | The outcome follows the match rule | Confirmed / Changed only for the same requirement sentence and wrong behaviour; otherwise New |
| 4 | M | The requirement is quoted verbatim with `file:line`, Expected comes from it | Equal to the document at that line |
| 5 | M | Actual is the received value and the screenshot | Values from the report / `results.json`; no cause from source code |
| 6 | M | Steps can be followed without the test code | Data row and actions in plain words, from a clean start |
| 7 | M | The screenshot is from the failed run and is linked | File in `bugs/screenshots/`, named `<TC ID>_<browser>`; link works |
| 8 | M | The Bug ID / tracker link is written back | design §8 and the bug-report overview |
| 9 | S | Severity / priority follow the tracker's scale | Taken from the existing issue, or `(proposed)` from the scale |

## Step 2 – send

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 10 | M | The human approved the text before it was sent | Approval in the conversation before the `gh` command |
| 11 | M | The tracker's template, title format and labels are followed | Fields as `### <label>`; only existing labels; round label / tag present |
| 12 | M | The screenshot is visible in the comment / issue | Opened in the browser: the image renders |
| 13 | M | One tracker action per defect | No new issue for a Confirmed / Changed bug; no duplicate comment after a `502` |
| 14 | S | Temporary body files and browser profiles are deleted | `git status`, no profile folder left |
