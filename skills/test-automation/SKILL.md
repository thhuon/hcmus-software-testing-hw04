---
name: test-automation
description: Use when designed test cases of a web feature must be turned into automated UI test scripts with Playwright (or Selenium) step by step with an AI and a human review — choosing which test cases to automate, building locators / page objects, moving test data to a JSON or CSV file, generating data-driven specs with several assertion patterns, reviewing and fixing the AI-generated scripts (fragile selectors, weak assertions, flaky waits, missing edge cases), running them on several browsers with one HTML report per run, triaging failures (trace viewer, UI mode, Inspector), choosing an automation approach (record and playback, page objects, data-driven, BDD, API, visual, CI) or the Playwright tool for a step (codegen, Test Agents), or counting automated / passed / failed test cases.
---

# Test Automation (data-driven, multi-browser web UI)

**Topic:** Test automation of a web UI. **Sources:** [ISTQB] §6.2, [TAE], [PW] Best Practices / Locators / Assertions / Parameterize tests / Reporters / Retries, [POM]. Codes are in `../SOURCES.md`.

## Overview

A suite generated from one prompt looks complete but usually has four kinds of defect. Step T5 checks for each of them:

- **Fragile selector:** the element is found by a CSS class or by its position (`.bg-green-100`, `nth-child(2)`) instead of its role and name, so the next layout change breaks the test.
- **Weak assertion:** the test checks only that *something* appeared (`toBeVisible()`), not what it says, so a wrong message or value still passes.
- **Wrong oracle:** the expected value is copied from what the app does today instead of from the requirement, so the test passes on the bug (e.g. the app shows a 4-digit code, the requirement asks for 6 digits, and the test expects 4).
- **Flaky wait:** a fixed sleep (`waitForTimeout(1000)`) instead of waiting for the state the next action needs, so the test passes on a fast machine and fails on a slow one or on another browser.

This skill turns designed test cases into a suite one step per prompt, with a human review that records what the AI got wrong and why.

| Step | Writes | Who decides |
| --- | --- | --- |
| T1 Select test cases | design §1 | The tester confirms which test cases are automated and why the others are not |
| T2 Locators and page objects | design §2, `pages/` | The tester confirms the locator choice where the UI offers no accessible name |
| T3 Test data | design §3, `data/<feature>/` | Expected values come from the test basis, never from the app |
| T4 Generate specs | design §4, `tests/<feature>/` | The AI generates; nothing is fixed yet |
| T5 Review and fix | design §5, specs | The tester decides every "why the AI missed it" |
| T6 Multi-browser runs | design §6 | Real runs only; reports are never edited |
| T7 Failure triage | design §6, §8 | The tester confirms product defect vs script defect |
| T8 Summary | design §7, §8 | Counts from the script, not by hand |

Then: every confirmed product defect → **REQUIRED NEXT SKILL:** automation-bug-reporting.

**Core rules:**

- One step per prompt; each step starts from the committed output of the previous step.
- Every assertion's expected value is traced to a test case and a requirement sentence ([REQ], [TD]). An assertion that fails because the product is wrong **stays failing**: never weaken, skip or invert it to get a green run.
- Results come from real runs on the tester's machine. HTML reports are produced by the tool and committed as they are.

## Project context (read first)

Take these from the project's instructions (CLAUDE.md, README or the assignment):

- Features in scope, their keys, application URLs and start commands; the requirement document.
- Where the designed test cases are (technique, ID, input, expected result).
- Minimums: test cases per feature, distinct assertion patterns, browsers, data file format.
- Report identity: the text every HTML report must show (e.g. `Run by: <ID>`) and the timestamp format.
- Folders for specs, page objects, data, reports, and the working file per feature.
- Rules for commits and AI-use logging.

If a value is missing, ask once and propose adding it to CLAUDE.md.

### Setup (once per project)

| File | Copy to (default) | Purpose |
| --- | --- | --- |
| [templates/playwright.config.ts](templates/playwright.config.ts) | `playwright.config.ts` | One project per browser, `webServer` for the SUT, `workers: 1` for a shared database, HTML report titled with the run identity and an ISO timestamp, JSON results for the summary |
| [templates/automation.config.json](templates/automation.config.json) | `automation.config.json` | Feature keys, spec folders, labels, browsers, reports folder, test-case ID pattern |
| [templates/automation-design.md](templates/automation-design.md) | `features/<feature>/automation_design.md` | The working file of one feature, sections §1–§8 |

Scripts (Node ≥ 18, run from the project root):

- `node <skill>/scripts/run-browsers.mjs --config automation.config.json <feature|all> [--browsers chromium,firefox] [--reuse]` — one run per feature × browser, each with its own HTML report and `results.json` in `<reportsDir>/<feature>/<browser>/`. Fresh SUT servers per run unless `--reuse`.
- `node <skill>/scripts/summarize-results.mjs --config automation.config.json [--markdown]` — counts per run and per test case from the `results.json` files.

Before T1, check the environment: a smoke spec that opens every frontend passes on every browser (`npx playwright install` + system dependencies for WebKit on Linux).

## Tools and approaches

Writing specs is one part of test automation. Each step also has a tool the tester uses with their own hands, and the suite is built from named automation approaches [TAE], [PW].

### Tool per step (Playwright)

| Step | Tool | Command | What the tester does with it |
| --- | --- | --- | --- |
| T2 | Codegen (record and playback) | `npx playwright codegen <url>` | Records one flow of the feature and reads the locators Playwright chooses. The recording is a draft for comparison, never a committed spec. |
| T2 | Inspector "Pick locator", ARIA snapshot | codegen toolbar → Pick locator; `await page.locator('body').ariaSnapshot()` | Gets the locator of one element; reads the role / name tree of a screen to see which elements have no accessible name. |
| T4 | AI agent: an AI assistant prompted step by step, or Playwright Test Agents | `npx playwright init-agents --loop=claude` (planner, generator, healer) | Generates specs. The agents' output is reviewed in T5 like any AI output; a "healed" test that changes an expected value is a wrong oracle. |
| T5 | UI mode | `npx playwright test <dir> --ui` | Runs one test at a time, steps back through its actions (time travel), watches files and reruns on save. |
| T5 | Debug with the Inspector | `npx playwright test <dir> --debug -g "<TC ID>"` | Steps through one test line by line, checks the locator under the cursor. |
| T5, T6 | Repeat and rerun | `--repeat-each=3`, `--last-failed` | Shows flakiness; reruns only the failures. |
| T6 | Projects and HTML report | `--project=<browser>`, `npx playwright show-report <dir>` | One run per browser; opens the report and checks its title. |
| T7 | Trace viewer | `npx playwright show-trace <test-results>/…/trace.zip`, or the trace link in the HTML report | Sees the DOM snapshot, network calls and console at the failing step; decides product vs script defect. |
| T7 | Screenshot / video on failure | config `screenshot`, `video`, `trace: 'retain-on-failure'` | Evidence for the bug report. |
| all | API testing | `request` fixture, `page.waitForResponse()` | `Yes (API)` rows, test setup and checks of the stored result without the UI. |

Record in the design file which tool was used (§2 how the locators were found, §5 how a failure was debugged, §8 the trace or screenshot of each failure).

### Automation approaches

| Approach | Idea | Use in this skill |
| --- | --- | --- |
| Capture / playback | Record the user's actions into a script | T2 only: a source of locators and a draft to compare with, never the suite |
| Linear scripting | One script per test, data and steps inside it | Avoided: test data goes to a data file (T3) |
| Structured / modular (Page Object Model) | Reusable page objects with locators and actions [POM] | T2 |
| Data-driven | One script reads many rows from a data file | T3, T4 |
| Keyword-driven / behaviour-driven (BDD) | Steps written as keywords or Given / When / Then (Cucumber, playwright-bdd) | Optional: when non-programmers write or read the tests |
| API-level testing | Requests without a browser | `Yes (API)` rows, setup, persisted-outcome checks |
| Visual regression | Compare a screenshot with an approved baseline (`toHaveScreenshot()`) | Optional: requirements about layout or appearance |
| Accessibility scan | Automated WCAG checks (`@axe-core/playwright`) | Optional: accessibility requirements |
| AI-assisted generation and self-healing | An AI writes or repairs tests | T4 generation; every repair is reviewed as in T5 |
| Continuous integration | The suite runs on every push (GitHub Actions) | Optional: after the official runs |

The project names the optional approaches it uses; each is added as its own step with its own commit.

## Steps

Gate before each step: the previous step is committed (`git status --short`). If not, give the commit commands and stop.

### T1 Select test cases → design §1

One row per designed test case of the feature: `TC ID | Technique | Partition / boundary | Input | Expected (quoted from the TC) | Automate? | Reason if not | Data row`.

- Automate at least the project's minimum, mixing valid, invalid and boundary cases. Prefer TCs whose expected result is observable in the UI or in a response the UI receives.
- `Automate? = No` needs a concrete reason: needs a human judgement (wording is "friendly"), an external system (real e-mail inbox), waiting real time (expiry after 15 minutes) without a clock the test can control, or a duplicate of an automated row (same partition, same oracle).
- A TC that the UI cannot reach but the API can is `Yes (API)`: it is automated through `request`, and the design says so.
- Mark `(proposed)` on every "No"; the tester confirms.

### T2 Locators and page objects → design §2, `pages/`

1. Explore the running UI, not the source: Playwright codegen, `npx playwright test --ui`, or `page.ariaSnapshot()` / an accessibility snapshot of each screen.
2. Inventory per screen: `Element | Locator | Why this locator`. Priority [PW Locators]: `getByRole(role, { name })` → `getByLabel` → `getByPlaceholder` → `getByText` → `getByTestId` → CSS on a stable attribute. Never XPath by position, `nth-child`, generated class names, or text that changes with data.
3. An element without an accessible name forces a fallback locator: note it as a finding (accessibility / testability), not as a reason to use XPath.
4. One page object per screen [POM]: locators as readonly fields, user actions as methods (`requestOtp(email)`, `resetPassword(otp, pw, confirm)`). **No assertions inside page objects**; they stay in the spec.

### T3 Test data → design §3, `data/<feature>/*.json|csv`

- One row per automated TC: `id`, `technique`, `title`, the inputs, the expected outcome (`kind`: `success | error | blocked`, the expected message / URL / value quoted from the test basis) and `source` (requirement ID).
- **No test data inside the spec** (no inline arrays or objects of cases): the spec only reads the file.
- Data that the app keeps (accounts, orders, products) must not collide between runs: generate unique values from the row (`reset+{id}+{runStamp}@test.local`) or rely on a database reset before each run, and say which.
- Expected values that the test basis does not state are `<CONFIRM>` items, never values copied from the current app.

### T4 Generate specs → `tests/<feature>/*.spec.ts`, design §4

The AI generates the specs from §1–§3 in one prompt per spec file. The generated code must:

- Loop over the data file: `` for (const row of rows) test(`${row.id} – ${row.title}`, …) ``. The title starts with the TC ID (the summary script reads it).
- Use **web-first assertions** (`await expect(locator).toHaveText(…)`), which wait by themselves; no `waitForTimeout`, no `if` on page state, no `try/catch` around an assertion.
- Use at least the project's minimum of **distinct assertion patterns**, each chosen for what the TC checks, e.g.:

| Pattern | Checks | Example |
| --- | --- | --- |
| URL / navigation | the flow moved to the right page | `await expect(page).toHaveURL(/\/login$/)` |
| Visible message text | the exact error / success message | `await expect(alert).toHaveText(row.expected.message)` |
| Element state | field value, enabled / disabled, count | `toHaveValue`, `toBeDisabled`, `toHaveCount` |
| Negative assertion | something must not happen | `await expect(successBanner).not.toBeVisible()` |
| Response | status and body the UI received | `const res = await page.waitForResponse(…); expect(res.status()).toBe(400)` |
| Persisted outcome | the change is really stored (re-login, reload, API read) | `expect(await api.get(...)).toMatchObject(…)` |
| Soft assertions | several fields of one result | `expect.soft(...)` |

- Keep tests independent: each test sets up its own state (`beforeEach`, fixtures, API helpers); no test relies on the order of another.
- Record in design §4 which pattern each test uses (`TC ID | Patterns`).

Do not fix anything in T4: the raw generated code is the evidence that T5 reviews.

### T5 Review and fix → specs, design §5

1. Run on one browser: `npx playwright test tests/<feature> --project=chromium`, then `--repeat-each=3` for the passing tests (flakiness shows up as different results).
2. Review every spec against this checklist, with the tester:

| Category | Look for |
| --- | --- |
| Fragile selector | XPath, CSS classes, `nth()`, text that depends on data, locators that broke on another screen size |
| Weak assertion | `toBeVisible()` on a generic container, `toBeTruthy()` on a locator, no assertion after the action, checking only the URL when the message matters |
| Wrong oracle | expected value copied from the current app instead of the test basis; an assertion inverted to pass |
| Missing edge case | a T1 row not automated, a boundary value missing from the data file |
| Flaky wait | `waitForTimeout`, `networkidle` on a polling page, actions before the page is ready |
| Hidden dependency | shared account / data between tests, order dependency, data left by a previous run |
| Hard-coded data | inputs in the spec instead of the data file |

3. Fix, rerun, commit. The tester's own corrections are separate commits.
4. Write one row per correction in design §5: `# | Spec › test | What the AI got wrong or missed | Category | Fix (commit) | Why the AI missed it | Cause type`. Cause types (the tester decides; the agent proposes):
   - **Prompt**: the prompt did not give the information (no requirement sentence for the message, no seed account).
   - **Model**: a tendency of the model (prefers CSS selectors from code it has seen, asserts on visibility instead of content, invents plausible messages).
   - **Feature**: only visible when the app runs (OTP generated per request, a toast that disappears after 3 s, a page that never reaches network idle).
5. A failure caused by the product, not by the script, is not fixed: it goes to T7 with its assertion intact.

### T6 Multi-browser runs → design §6

1. Each browser is a separate run with its own HTML report (`run-browsers.mjs`). Check the report title shows the project's identity text and an ISO timestamp.
2. A test that fails on one browser only: rerun it on that browser. Same result → a browser difference to triage in T7 (script timing, engine behaviour, or a real cross-browser defect). Different result → flaky: fix the wait (T5 categories), never add retries to hide it.
3. Official runs: once the specs are frozen (committed), reset the data, run all browsers in one command, commit the reports unchanged. Write the run table: `Feature | Browser | Report | Started (ISO) | Tests | Passed | Failed | Flaky`.

### T7 Failure triage → design §6, §8

For every failing test of the official run:

| Verdict | Evidence needed | Next |
| --- | --- | --- |
| Product defect | The assertion's expected value is quoted from [REQ] / [TD]; the failure reproduces on rerun; the screenshot shows the wrong behaviour | automation-bug-reporting |
| Script defect | The expected value or the locator is wrong | Back to T5 (fix, rerun) |
| Environment | Server down, port taken, data left from another run | Fix the environment, rerun |

Mark `(proposed)`; the tester confirms. A product defect keeps its failing assertion; the test may carry an annotation linking the bug (`test.info().annotations.push({ type: 'issue', description: '<link>' })`).

### T8 Summary → design §7, §8

1. Run `summarize-results.mjs --markdown` and paste its tables into design §6 (no hand counts).
2. §7 Not automated: every T1 row with `Automate? = No`, its reason, and how it was tested instead (manually in an earlier round, or not at all).
3. §8 Failures and bugs: `TC ID | Browsers failing | Verdict | Bug / issue`.

## Every reply has exactly this shape

1. Step and gate, one line.
2. The result of the step: the table written to the design file, or the spec / run output.
3. **AI self-review**: fix what can be fixed first, then score P1–P6 of [../review-rubric-shared.md](../review-rubric-shared.md) and the step's table of [review-rubric.md](review-rubric.md) as `# | Score (2/1/0/N/A) | Evidence | Action`, and end with `Gate: passed` or `Gate: blocked by <#>`.
4. **Decisions needed**: numbered, each 2–4 bullets — the issue, why the human decides, the options with a recommendation.
5. **Suggested commit** and **Next step** (the next step's prompt). Then stop.

## Commits and AI-use log

Follow git-commit-conventions. One commit per step and feature, e.g. `test (<feature>): select test cases to automate`, `test (<feature>): add page objects for <screens>`, `test (<feature>): move test data to <file>`, `test (<feature>): generate data-driven specs`, `test (<feature>): fix <what> in <spec>`, `test (<feature>): record multi-browser runs`. Every commit that changes a spec counts as evidence of the work; do not squash them.

If the project keeps an AI audit log or a prompt log, add its entry in the same turn.

## Integrity

| Excuse | Reality |
|--------|---------|
| "Generate the whole suite in one prompt, it's faster" | One step per prompt is the evidence that a human guided the AI; one prompt gives a suite nobody reviewed. |
| "The assertion fails, relax it to `toBeVisible()`" | A failing assertion with a quoted oracle is a found defect. Weakening it hides the bug. |
| "Use the message the app shows as the expected value" | The app may be wrong. The expected value comes from the requirement or the test case. |
| "Add `retries: 2`, the run is green now" | Retries hide flakiness. Fix the wait, or report the test as flaky. |
| "`waitForTimeout(2000)` fixes it" | It makes the test slow and still flaky. Wait for the state you need with a web-first assertion. |
| "Copy the Chromium result to WebKit, same code" | Each browser is a real run with its own report. |
| "Regenerate the report with a nicer title" | Reports come from the tool on the tester's machine and are committed unchanged. |
| "The AI's mistake is obvious: it forgot" | Name what was missing: prompt input, a model tendency, or a runtime-only behaviour. |
