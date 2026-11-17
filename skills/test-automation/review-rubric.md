# Review rubric – Test automation

Shared rules (scoring, gate, output, process criteria P1–P6): [../review-rubric-shared.md](../review-rubric-shared.md).
Sources: [ISTQB] §6.2 · [PW] Best Practices, Locators, Assertions, Parameterize tests, Reporters, Retries · [POM] · the project's requirement document and designed test cases.

## T1 – Select test cases

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 1 | M | Every designed TC of the feature has a row | Rows in §1 = TCs in the test design file; IDs unchanged |
| 2 | M | Automated rows reach the project's minimum and mix valid, invalid and boundary cases | Count of `Yes` / `Yes (API)` ≥ minimum; techniques and partitions vary |
| 3 | M | Every `No` has a concrete reason | Human judgement, external system, real-time wait, or duplicate of a named row; marked `(proposed)` until confirmed |
| 4 | M | Expected results are quoted from the TC | Same text as the test design file |

## T2 – Locators and page objects

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 5 | M | Locators come from the running UI | Method stated (codegen, UI mode, aria snapshot); not copied from source code |
| 6 | M | Locator priority is followed | Role + name → label → placeholder → text → test id → stable CSS; no positional XPath, `nth-child`, generated classes |
| 7 | M | Every fallback locator has a reason | §2 "Why" names the missing accessible name; it is listed as a testability finding |
| 8 | M | Page objects hold locators and actions only | No `expect` inside `pages/` |

## T3 – Test data

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 9 | M | Test data lives only in the data file | No inline array / object of cases in any spec; `grep` the specs |
| 10 | M | Every expected value is traced | `source` column names the requirement; values match the TC; unknown values are `<CONFIRM>` |
| 11 | M | Runs do not collide on stored data | Unique values per row and run, or a database reset before each run, stated in §3 |

## T4 – Generate specs

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 12 | M | Specs are data-driven | One loop over the data file; every test title starts with the TC ID |
| 13 | M | Distinct assertion patterns reach the project's minimum | §4 table: each pattern with the tests that use it |
| 14 | M | Assertions are web-first and specific | `await expect(locator).toHave…`; no `waitForTimeout`, `if` on page state, `try/catch` around `expect` |
| 15 | M | Tests are independent | Own setup per test; no reliance on test order or data left by another test |
| 16 | M | Nothing is fixed in this step | The commit holds the generated code as produced |

## T5 – Review and fix

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 17 | M | Every spec was reviewed against the seven categories | §5 has the corrections, or the reply states "no issue in <category>" per spec |
| 18 | M | Every correction has a row | Spec › test, what was wrong, category, fix with commit hash, why, cause type |
| 19 | M | "Why the AI missed it" is the tester's | Agent wording marked `(proposed)` until the tester confirms |
| 20 | M | No assertion was weakened to pass | Diff of the fix commits: no oracle changed without a quoted source; no `skip` / `fixme` / inverted assertion for a product failure |
| 21 | S | Passing tests are stable | `--repeat-each=3` gave the same results |

## T6 – Multi-browser runs

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 22 | M | One run and one report per feature × browser | `reports/<feature>/<browser>/index.html` and `results.json` exist for every pair |
| 23 | M | Every report shows the identity text and an ISO timestamp | Report title / header checked in the browser |
| 24 | M | Official runs used frozen specs and clean data | Spec commit before the run; reset / fresh servers stated; reports committed unchanged |
| 25 | M | No retries hide failures | `retries: 0`, or flaky tests reported as flaky |

## T7 – Failure triage

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 26 | M | Every failing test has a verdict | §8 row: product defect / script defect / environment, `(proposed)` until confirmed |
| 27 | M | A product defect has its evidence | Oracle quoted, reproduced on rerun, screenshot from the run |
| 28 | M | Product defects keep their failing assertion | The test still fails in the official run; a bug annotation may link the issue |

## T8 – Summary

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 29 | M | Counts come from the summary script | §6 tables equal `summarize-results.mjs --markdown` output |
| 30 | M | Every non-automated TC is listed with its reason | §7 rows = T1 rows with `No` |
| 31 | S | The `Count:` line matches §1, §4, §7 | Designed, automated, not automated, assertion patterns |

## Tools (T2, T4, T5, T7)

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 32 | S | The step's tool was used by the tester and is recorded | Design §2 names how the locators were found (codegen, Pick locator, ARIA snapshot); §5 how a failure was debugged (UI mode, Inspector); §8 the trace or screenshot of each failure |
