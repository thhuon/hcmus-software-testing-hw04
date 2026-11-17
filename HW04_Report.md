# HW04-AI – Automation Testing on EShop

| Student name | Student ID | Class | Exercise |
| --- | --- | --- | --- |
| HỒ THÙY HƯƠNG | 23120046 | CQ2023/3 | HW04-AI |

**AI declaration:** I use AI tools for the following tasks, as recorded in [AI-02_AI_Audit_Report.md](AI-02_AI_Audit_Report.md) (Appendix) and [prompt_log.md](prompt_log.md).

## Table of Contents

1. [SUT and tools](#1-sut-and-tools)
2. [Approach](#2-approach)
3. [Feature A – FR-03](#3-feature-a--fr-03-quên--đặt-lại-mật-khẩu)
4. [Feature B – FR-08](#4-feature-b--fr-08-thanh-toán)
5. [Feature C – FR-15](#5-feature-c--fr-15-quản-lý-sản-phẩm)
6. [Multi-browser runs](#6-multi-browser-runs)
7. [Bug summary](#7-bug-summary)
8. [Test cases not automated](#8-test-cases-not-automated)
9. [Demo video](#9-demo-video)
10. [Agent Skills](#10-agent-skills)
11. [AI Critique](#11-ai-critique)
12. [Self-assessment and test summary](#12-self-assessment-and-test-summary)
13. [Appendix – AI Audit Report](#13-appendix--ai-audit-report)

## 1. SUT and tools

| Item | Value |
| --- | --- |
| SUT | EShop, `ttbhanh/eshop-sut` @ commit `85af3ba`; Web `:5173`, Admin `:5174`, API `:3000`; database re-seeded at every backend start |
| Test basis | `eshop-sut/README.md` (SRS) + HW02 test cases (domain testing, BVA) |
| Automation | Playwright `@playwright/test` 1.64.1, TypeScript specs, page objects, JSON / CSV data files |
| Browsers | Chromium 156.0.8078.4 · Firefox 157.0 · WebKit 27.2 |
| Reports | Playwright HTML reporter, one per feature × browser, title `HW04 · <feature> · <browser> · Run by: 23120046 · <ISO timestamp>` |
| Machine | Ubuntu 26.04, Node 22.22.1 |
| AI tool | Claude Code (claude-opus-5-5) |

## 2. Approach

The three features were automated with the Agent Skill `test-automation` ([skills/test-automation](skills/test-automation/SKILL.md)), one step per prompt, each step reviewed by the student and committed (and pushed) on its own before the next one. The test cases are the HW02 ones (domain testing and BVA): they were not designed again, only selected.

| Step | What the AI did | What the student did |
| --- | --- | --- |
| T1 Selection | Proposed which HW02 test cases to automate, through the Web UI or the API, and the reason for each one left out | Confirmed the selection and decided the open points (e.g. FR-08 DT-07, FR-15 Admin web instead of API) |
| T2 Locators, page objects | ARIA snapshot of each screen, every locator counted on Chromium, Firefox and WebKit, page objects in `page-objects/`, API client in `api/` | Ran codegen and compared its locators with the AI's; chose the locator for fields without an accessible name |
| T3 Test data | `data/<feature>/*.json`: inputs from the HW02 test cases, expected values from the SRS and the HW02 assumptions, never from the running app | Confirmed open expected values |
| T4 Specs | One prompt per spec file; data-driven loop over the data file, one test per row, title starting with the TC ID; generated code committed unchanged; first run on Chromium | – |
| T5 Review and fix | Ran each spec three times (`--repeat-each=3`), read it against seven categories (fragile selector, weak assertion, wrong oracle, missing edge case, flaky wait, hidden dependency, hard-coded data) and proposed fixes | Decided every fix and why the AI missed it (cause type Prompt / Model / Feature), recorded at fix time in design §5 |
| T6 Multi-browser runs | `npm run feature -- <feature>`: Chromium, Firefox, WebKit one after the other, one HTML report per browser, title `HW04 · <feature> · <browser> · Run by: 23120046 · <ISO timestamp>` | Started the official FR-15 run in the Task 2 video |
| T7 Triage, bugs | Classified each failure (product / script / environment) with its oracle and evidence; matched it with the HW02 issues; wrote `bugs/BUG_REPORT.md` and the issue comments (skill `automation-bug-reporting`) | Confirmed every verdict and approved the comments before they were sent |
| T8 Summary | Counts from `npm run summary` (`results.json` of the 9 reports, not counted by hand); test cases not automated with their reason | Reviewed |

Rules kept in every step: no assertion was weakened to make a test pass (a product defect keeps its failing assertion); every test creates its own data (own account, own product), so tests and runs are independent; `retries: 0`, `workers: 1` (one shared database); the HTML reports are committed as Playwright wrote them.

Automation approaches used: codegen (record and playback, as a locator check), Page Object Model, data-driven tests (JSON), API testing with `request`, UI mode, Inspector, trace viewer, Playwright HTML reporter. Not used (student decision, 17/11): Playwright Test Agents, CI, BDD, visual regression, Allure.

Git history: [git_log.txt](git_log.txt) – 14 commits change `.spec.ts` files (brief §12 asks for ≥ 8).

## 3. Feature A – FR-03 Quên & đặt lại mật khẩu

### 3.1 Test cases automated

- **Selection** ([design §1](features/forgot-password/automation_design.md#1-test-cases-selected-t1)): 45 test cases (44 from HW02 + DT-35 added in HW04), **33 automated** (30 through the Web UI, 7 of them also send the same OTP to the API; 3 API only: DT-17, DT-27, DT-32) and 12 not automated, each with its reason and how it was tested instead ([design §7](features/forgot-password/automation_design.md#7-not-automated-t8)): request shapes only the API can send (DT-10, 16, 18, 19, 31), an oracle that is an assumption (DT-33), OTP expiry that needs 10–11 minutes of real server time (DT-34, BVA-08 … 10), duplicates of an automated partition (BVA-06, 07). All 12 ran in HW02 through the API; DT-34 and BVA-10 failed there (HW02 BUG-05 #5).
- **Locators and page objects** ([design §2](features/forgot-password/automation_design.md#2-locators-and-page-objects-t2)): `page-objects/LoginPage.ts`, `page-objects/ForgotPasswordPage.ts`, API client `api/EshopApi.ts`. No input of the page has an accessible name; seven locator options were counted on Chromium, Firefox and WebKit, and the fields are found by the textbox under a label that starts with the field name (student decision). Codegen check by the student: codegen picks generic `getByRole('textbox')` / `input[type=…]` for these fields.
- **Test data** ([design §3](features/forgot-password/automation_design.md#3-test-data-t3)): `data/forgot-password/web.json` (30 rows) and `api.json` (3 rows); inputs from the HW02 test cases, expected values from FR-03, FR-01, FR-22, SEC-07 and the HW02 assumptions; every test registers its own account through the API, so tests and runs do not share data.
- **Specs and assertion patterns** ([design §4](features/forgot-password/automation_design.md#4-specs-and-assertion-patterns-t4)): `tests/forgot-password/web.spec.ts` (30 tests) and `api.spec.ts` (3 tests), one test per data row, title starting with the TC ID; 8 assertion patterns: stored outcome (login through the API), soft assertions, visible text, element state, value format, URL, negative, API response status.

### 3.2 Review of the AI-generated scripts

First run on Chromium: 6 passed, 27 failed. The review ([design §5](features/forgot-password/automation_design.md#5-review-of-the-ai-generated-scripts-t5)) found three mistakes of the AI in the Web spec, all fixed as the student decided, cause type **Model** (student):

| # | What the AI got wrong | Category | Fix |
| --- | --- | --- | --- |
| 1 | DT-05 passed although the Web refused the reset: with new = current password the login check cannot tell the outcomes apart, so BUG-01 was hidden | weak assertion | after an accepted reset the same OTP must be refused by the API (SEC-07 "vô hiệu hóa sau khi dùng") (eb9d9d8) |
| 2 | The FR-22 check required `role="alert"`, which FR-22 does not ask for | wrong oracle | any error text above the submit button (e2a210a) |
| 3 | No assertion before acting on an element the app lacks: 30 s timeout without naming the missing FR-03 element | weak assertion | `toBeVisible()` with the FR-03 name before the action (63f8508) |

After the fixes: 5 passed, 28 failed (DT-05 now fails on BUG-01), run time 5.4 → 3.4 min; the passing tests are stable (`--repeat-each=3`). No issue found in fragile selectors, flaky waits, missing edge cases, hidden dependencies or hard-coded data.

### 3.3 Results

| Browser | Report | Tests | Passed | Failed | Flaky |
| --- | --- | --- | --- | --- | --- |
| Chromium | [reports/forgot-password/chromium](reports/forgot-password/chromium/index.html) | 33 | 5 | 28 | 0 |
| Firefox | [reports/forgot-password/firefox](reports/forgot-password/firefox/index.html) | 33 | 5 | 28 | 0 |
| WebKit | [reports/forgot-password/webkit](reports/forgot-password/webkit/index.html) | 33 | 5 | 28 | 0 |

The same tests pass (DT-07, 08, 09, 17, 32) and fail on every browser ([design §6](features/forgot-password/automation_design.md#6-runs-t6)). These are the second official runs (17/11 20:08–20:20); the first set showed one environment error, `ECONNRESET` on an API call in DT-12 on Firefox (1 of 3 on rerun, never on Chromium or WebKit, likely a keep-alive connection closed by the server after the 5 s soft wait). It does not change any verdict; the student accepted it as a risk and the runs were repeated without it. The official runs keep a screenshot of every failed Web test (`reports/forgot-password/<browser>/screenshots/<TC ID>.png`) and no traces (not asked by the brief; the reports went from 10–25 MB to 3–6 MB per browser). Triage ([design §8](features/forgot-password/automation_design.md#8-failures-and-bugs-t7), verdicts confirmed by the student): all 28 failures are **product defects**, none is a script defect after the T5 fixes. They come from 8 bugs already filed in HW02 – BUG-01 #1 (Web refuses valid passwords), BUG-03 #3 (4-digit OTP), BUG-04 #4 (no confirm field), BUG-06 #6 (no step indicator), BUG-07 #7 (no `*`), BUG-08 #8 (API reset without `newPassword`), BUG-09 #9 (errors in a dialog, 17 tests), BUG-11 #11 (no "Quay lại đăng nhập") – and **one new defect** found only by HW04's added test DT-35: the Web accepts `NewPass 2026`, whose only special character is a space, and changes the password. On the Web this defect is masked by BUG-01: a valid new password can never be set, so the reset only succeeds with an invalid one; the trace viewer shows `POST /api/reset-password` → `200` and no success message in the page, only a browser `alert` (student, 17/11). One HW02 report differs in one point: BUG-01 #1 says the Web refuses *every* new password, but `NewPass 2026` is accepted (DT-35). Bug report: [bugs/BUG_REPORT.md](bugs/BUG_REPORT.md) BUG-02 (new, issue [#117](https://github.com/angquoc/software-testing-2026-HW02-group/issues/117), label `hw: HW04`) and BUG-03 … BUG-10 (7 confirmed, 1 changed: an "HW04 – automated re-test" comment with screenshots on #1, #3, #4, #6, #7, #8, #9, #11); verdicts confirmed by the student 17/11.

## 4. Feature B – FR-08 Thanh toán

### 4.1 Test cases automated

- **Selection** ([design §1](features/checkout/automation_design.md#1-test-cases-selected-t1)): all **17** HW02 test cases are automated (13 DT + 4 BVA), none left out: 7 through the Web UI (DT-01, DT-03, DT-07, BVA-01 … 04) and 10 through the API only (DT-02, 04, 05, 06, 08, 09 … 13); DT-07 has a Web and an API part. Student decisions: DT-03 tries both guest paths (cart button, typed `/checkout`) in one test; BVA-01 … 04 run on the Web, because the backend stores the `total_amount` it receives and ignores the cart, so through the API the boundary values would change nothing; the checkout of an empty cart counts as a bug (DT-07), replacing the HW02 Pass.
- **Locators and page objects** ([design §2](features/checkout/automation_design.md#2-locators-and-page-objects-t2)): from the student's codegen run and an ARIA snapshot of every screen, each locator counted on Chromium, Firefox and WebKit. Page objects `SiteHeader`, `LoginPage`, `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage`, `Dialogs`; API client `api/EshopApi.ts`. Testability findings: no input has an accessible name, the Web cart is lost on a reload (tests move only through links), "Thêm vào giỏ hàng" needs two clicks (#73), no cart badge (#79). [Checkout page](features/checkout/screenshots/DT-01-checkout-page-chromium.png) · [total edited by the user](features/checkout/screenshots/DT-01-total-edited-chromium.png).
- **Test data** ([design §3](features/checkout/automation_design.md#3-test-data-t3)): `data/checkout/web.json` (7 rows) and `api.json` (11 rows); inputs from the HW02 test cases, expected values from FR-08, FR-07, FR-23, SEC-02 and the HW02 assumptions A1–A15 / decisions Q1–Q10; catalog prices from the seed; each test registers its own account, so tests and runs share no cart or order.
- **Specs and assertion patterns** ([design §4](features/checkout/automation_design.md#4-specs-and-assertion-patterns-t4)): `tests/checkout/web.spec.ts` (7 tests) and `api.spec.ts` (11 tests), one test per data row, title starting with the TC ID; 6 assertion patterns: stored outcome through the API, visible text, element state, negative, soft assertions, comparison of a list of values.
- **Bug found while building the tests:** BUG-01 – a logged-in user with an empty cart who types `/checkout` places an order of 0 ₫ ([bugs/BUG_REPORT.md](bugs/BUG_REPORT.md#bug-01), new issue [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116), [screenshot](bugs/screenshots/DT-07_empty-checkout-success_chromium.png)).

### 4.2 Review of the AI-generated scripts

First run of the generated specs on Chromium (17/11, development runs): Web 1 passed, 6 failed ([report](features/checkout/screenshots/first-run/web-report-chromium.png)); API 3 passed, 8 failed ([report](features/checkout/screenshots/first-run/api-report-chromium.png)). Every failed assertion has an oracle quoted from the requirement or the HW02 decisions. The review ([design §5](features/checkout/automation_design.md#5-review-of-the-ai-generated-scripts-t5)) found six problems; cause types confirmed by the student (17/11): #1 and #5 **Feature** (seen only when the app runs: a taken e-mail registered again, a click lost on a busy browser), #2 and #4 **Model**, #3 **Prompt**; #6 (found in T7) **Model**:

| # | What the AI got wrong | Category | Fix |
| --- | --- | --- | --- |
| 1 | The account e-mail was the same for every repeat / retry of a test; the backend registers a taken e-mail again and logs in the first account, so with `--repeat-each=3` the repeats shared a cart and 6 of 12 runs failed | hidden dependency | repeat and retry index in the e-mail (f4b4d10); 12 of 12 passed ([before](features/checkout/screenshots/t5/repeat-before-fix-chromium.png), [after](features/checkout/screenshots/t5/repeat-after-fix-chromium.png)) |
| 2 | A refused API row naming no order count would check no order and pass | weak assertion | hard check (f0b2152) |
| 3 | DT-03 path (b): typing `/checkout` reloads the page, so the guest's cart is empty – two invalid classes in one test | missing edge case | path (b) = log out on the checkout page with the cart, then confirm (b32d917); 9 of 9 passed on 3 browsers |
| 4 | DT-03 path (a): an `if` on page state | weak assertion | branch removed; path (a) records the page reached (b32d917) |
| 5 | `ProductPage.addToCart`: two clicks with a fixed probe; on a busy Firefox the second click was once counted as the first again (DT-03 flaky in the first official set) | flaky wait | click until "Đã thêm", up to 4 clicks, each extra click recorded (35b0c42); Firefox `--repeat-each=3` stable |
| 6 | DT-07 Web and DT-07 API registered the same account e-mail, so the Web test read the API test's order (2 orders instead of 1) | hidden dependency | account e-mail prefix per spec (bc0de04) |

No issue found in fragile selectors, wrong oracles or hard-coded data; no assertion was weakened.

### 4.3 Results

| Browser | Report | Tests | Passed | Failed | Flaky |
| --- | --- | --- | --- | --- | --- |
| Chromium | [reports/checkout/chromium](reports/checkout/chromium/index.html) ([screenshot](features/checkout/screenshots/t6/report-chromium.png)) | 18 | 4 | 14 | 0 |
| Firefox | [reports/checkout/firefox](reports/checkout/firefox/index.html) ([screenshot](features/checkout/screenshots/t6/report-firefox.png)) | 18 | 4 | 14 | 0 |
| WebKit | [reports/checkout/webkit](reports/checkout/webkit/index.html) ([screenshot](features/checkout/screenshots/t6/report-webkit.png)) | 18 | 4 | 14 | 0 |

Official runs: fourth set, 17/11 22:52–22:56 ([design §6](features/checkout/automation_design.md#6-runs-t6)), reusing the running SUT so the parallel FR-03 session was not disturbed (each test uses its own account). The same tests pass (DT-03, DT-04 … 06) and fail on every browser: 17 test cases, 4 passed, 13 failed. Earlier sets were replaced after script fixes: DT-03 flaky on Firefox (review #5), DT-03 path (b) changed (#3, #4), DT-07 Web reading the API test's order (#6). Triage ([design §8](features/checkout/automation_design.md#8-failures-and-bugs-t7)): every failure is a product defect (proposed) already filed in HW02 – #12, #13, #14, #15, #16 – or HW04 BUG-01 #116; HW02 #17 (guest checkout) no longer reproduces. Bug report entries BUG-11 … BUG-17 ([bugs/BUG_REPORT.md](bugs/BUG_REPORT.md)); 18/11 eight comments marked "HW04 – automated re-test" with screenshots: Confirmed on #12, #13, #14, #15, #16, #116, Related on #80 (FR-07, another member's issue), Changed on #17. No new issue for FR-08 in this step (BUG-01 #116 was filed in T2).

## 5. Feature C – FR-15 Quản lý sản phẩm

### 5.1 Test cases automated

- **Selection** ([design §1](features/product-crud/automation_design.md#1-test-cases-selected-t1)): all **36** HW02 test cases are automated (27 DT + 9 BVA), none left out: 23 through the Admin web (DT-01 … 05, 10, 11, 13, 22 … 27, BVA-01 … 09), 5 through the Admin web and the API (DT-09, 14 … 17), 8 through the API only (DT-06 … 08, 12, 18 … 21). Student decisions (18/11): the 17 test cases that HW02 ran through the API but whose values the Admin web can enter now run on the Admin web, the stored result still read through the API; DT-24 checks the product list after an add and after an edit.
- **Locators and page objects** ([design §2](features/product-crud/automation_design.md#2-locators-and-page-objects-t2)): codegen run by the student (18/11 01:31, Chromium) compared with the AI's locators, an ARIA snapshot of the login screen and the product tab, every locator counted on the three browsers. Page objects `AdminLoginPage`, `AdminProductsPage`, `Dialogs` (reused from FR-08); API client `api/EshopApi.ts` extended for products and categories. Codegen picked positions (`.nth(5)`, `.first()`) and data text (`30000000 ₫`) where the page objects use the row of the product and the column index read from the headers. Testability findings: no `<label>` in the forms (names come from placeholders, the category list has no name), the sidebar tabs are `<li>` elements without a role, an edit writes the edited name into every row of the list (HW02 BUG-34), `GET /api/products/:id` returns the price as text for an even id.
- **Test data** ([design §3](features/product-crud/automation_design.md#3-test-data-t3)): `data/product-crud/web.json` (28 rows) and `api.json` (13 rows); inputs from the HW02 test cases, expected values from FR-15, FR-12, FR-21, FR-22, SEC-02 … SEC-05 and the HW02 assumptions A1 … A16 / decisions Q1 … Q11; each test creates its own product, finds it by the id the API returns and deletes what it created, so the seed products 1–5 stay unchanged.
- **Specs and assertion patterns** ([design §4](features/product-crud/automation_design.md#4-specs-and-assertion-patterns-t4)): `tests/product-crud/web.spec.ts` (28 tests) and `api.spec.ts` (13 tests), 41 tests per browser, one test per data row, title starting with the TC ID; 6 assertion patterns: stored outcome through the API, visible text, element state, negative, comparison of a list of values, soft assertions.

### 5.2 Review of the AI-generated scripts

First run of the generated specs on Chromium (18/11, development runs): Web 15 passed, 13 failed; API 2 passed, 11 failed. The review ([design §5](features/product-crud/automation_design.md#5-review-of-the-ai-generated-scripts-t5)) ran both specs three times (123 tests, every test gave the same result each time) and found two mistakes of the AI; cause types confirmed by the student (18/11): #1 **Feature**, #2 **Model**:

| # | What the AI got wrong | Category | Fix |
| --- | --- | --- | --- |
| 1 | DT-16 Web part expected the browser to block the price `250000.5`, but the Admin web sends it: the number field is invalid right after typing, valid again once React re-renders, and "Lưu sản phẩm" sends `"price": "250000.5"`. The test failed on the wrong check instead of on the TC's oracle ("refused … no new product"). The T2 exploration had read the field right after `fill()`, and the data and spec built the oracle on that finding instead of on the TC | wrong oracle | data row changed to a refused add as the TC says; design §2, §3 corrected (2626e15); the test now fails on "new products: expected 0, received 1" (HW02 BUG-30) |
| 2 | DT-17 read the options of the category list once with `allInnerTexts()` and compared them afterwards: no waiting. The list is filled from `GET /api/categories` after the tab is shown; with that request delayed by 1.5 s (`page.route`) the read returned `[]`. It passed only because the local server answers at once | flaky wait | web-first `expect(options).toHaveText(apiNames)`, which retries until the list is filled (a278a51); passed 3 × 3 and with the delayed request. This is the fix narrated in the Task 2 video |

After the fixes: 17 passed, 24 failed per browser (the 24 failing assertions are quoted from the test cases). No issue found in fragile selectors, missing edge cases, hidden dependencies or hard-coded data; no assertion was weakened.

### 5.3 Results

| Browser | Report | Tests | Passed | Failed | Flaky |
| --- | --- | --- | --- | --- | --- |
| Chromium | [reports/product-crud/chromium](reports/product-crud/chromium/index.html) | 41 | 17 | 24 | 0 |
| Firefox | [reports/product-crud/firefox](reports/product-crud/firefox/index.html) | 41 | 17 | 24 | 0 |
| WebKit | [reports/product-crud/webkit](reports/product-crud/webkit/index.html) | 41 | 17 | 24 | 0 |

Official runs: 18/11/2026 04:59:59–05:04 local time ([design §6](features/product-crud/automation_design.md#6-runs-t6)), started by the student with `npm run feature -- product-crud` on fresh servers (database re-seeded before each browser) and recorded in the Task 2 demo video; the reports were committed unchanged right after the recording (c3630b6). Per test case: 36 automated, 36 executed, **14 passed, 22 failed** on every browser (a test case with a Web and an API test counts as failed when either fails). No test differs between the browsers; the result is the same, test by test, as the earlier T6 run.

Triage ([design §8](features/product-crud/automation_design.md#8-failures-and-bugs-t7), verdicts confirmed by the student 18/11): all 22 failing test cases are **product defects** already filed in HW02 (#18 … #39); none is a script defect. HW04 evidence was added as a comment with screenshots on each of the 22 issues (18/11): 20 Confirmed, 2 Changed – #34 (the list shows the wrong names only after an edit; after an add it is right, so DT-04, `Not run` in HW02, now passes) and #35 (the price is now shown, but without thousand separators). Eight defects that HW02 reached through the API are now also reached on the Admin web (#26, #27, #28, #29, #30, #32, #38, #39). No new issue for FR-15. Bug report entries BUG-18 … BUG-39 ([bugs/BUG_REPORT.md](bugs/BUG_REPORT.md)).

## 6. Multi-browser runs

Output of `npm run summary` (`skills/test-automation/scripts/summarize-results.mjs`, read from the `results.json` of the 9 official reports, not counted by hand). Each report title contains `Run by: 23120046` and the ISO start time.

| Feature | Browser | Started (ISO) | Tests | Passed | Failed | Flaky | Report |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-03 forgot-password | Chromium | 2026-11-17T13:08:54.606Z | 33 | 5 | 28 | 0 | [index.html](reports/forgot-password/chromium/index.html) |
| FR-03 forgot-password | Firefox | 2026-11-17T13:12:16.041Z | 33 | 5 | 28 | 0 | [index.html](reports/forgot-password/firefox/index.html) |
| FR-03 forgot-password | WebKit | 2026-11-17T13:16:33.554Z | 33 | 5 | 28 | 0 | [index.html](reports/forgot-password/webkit/index.html) |
| FR-08 checkout | Chromium | 2026-11-17T15:52:03.425Z | 18 | 4 | 14 | 0 | [index.html](reports/checkout/chromium/index.html) |
| FR-08 checkout | Firefox | 2026-11-17T15:53:24.511Z | 18 | 4 | 14 | 0 | [index.html](reports/checkout/firefox/index.html) |
| FR-08 checkout | WebKit | 2026-11-17T15:54:58.834Z | 18 | 4 | 14 | 0 | [index.html](reports/checkout/webkit/index.html) |
| FR-15 product-crud | Chromium | 2026-11-17T21:59:59.476Z | 41 | 17 | 24 | 0 | [index.html](reports/product-crud/chromium/index.html) |
| FR-15 product-crud | Firefox | 2026-11-17T22:01:11.116Z | 41 | 17 | 24 | 0 | [index.html](reports/product-crud/firefox/index.html) |
| FR-15 product-crud | WebKit | 2026-11-17T22:02:58.921Z | 41 | 17 | 24 | 0 | [index.html](reports/product-crud/webkit/index.html) |

Totals per test case (a test case passes only when all its tests pass on that browser; every test case had the same result on the three browsers):

| Feature | Automated | Executed | Passed | Failed | Flaky | Browser runs |
| --- | --- | --- | --- | --- | --- | --- |
| FR-03 forgot-password | 33 | 33 | 5 | 28 | 0 | 3 |
| FR-08 checkout | 17 | 17 | 4 | 13 | 0 | 3 |
| FR-15 product-crud | 36 | 36 | 14 | 22 | 0 | 3 |
| **Total** | **86** | **86** | **23** | **63** | **0** | **9** |

How the official runs were made:

- **FR-03, FR-08** (17/11): `npm run feature -- <feature> --reuse` on the running servers, because the two features were worked on in parallel sessions; each test registers its own account, so no test depends on data left by another. FR-03: second set, replacing a first set with one environment error (`ECONNRESET`, DT-12 Firefox); FR-08: fourth set, replacing sets made before script fixes (design §6 of each feature).
- **FR-15** (18/11): `npm run feature -- product-crud` on fresh servers, recorded in the Task 2 video.
- Failure screenshots: `reports/<feature>/<browser>/screenshots/<TC ID>.png`, one per failed Web test; no traces in the official reports (not asked by the brief; they made the reports 10–25 MB per browser).

## 7. Bug summary

Full report: [bugs/BUG_REPORT.md](bugs/BUG_REPORT.md) – **39 bugs: 33 Confirmed, 4 Changed, 2 New**. Bugs already filed in HW02 got a comment "HW04 – automated re-test" (script, browser, assertion result, screenshots) on the existing issue of the [HW02 group repo](https://github.com/angquoc/software-testing-2026-HW02-group/issues); the two new defects are new issues with the label [`hw: HW04`](https://github.com/angquoc/software-testing-2026-HW02-group/issues?q=label%3A%22hw%3A+HW04%22) ([screenshot of the Issues page](bugs/screenshots/issues-label-hw04.png)).

| Feature | Bugs | New | Confirmed | Changed |
| --- | --- | --- | --- | --- |
| FR-03 | 9 (BUG-02 … BUG-10) | 1 | 7 | 1 |
| FR-08 | 8 (BUG-01, BUG-11 … BUG-17) | 1 | 6 | 1 |
| FR-15 | 22 (BUG-18 … BUG-39) | 0 | 20 | 2 |
| **Total** | **39** | **2** | **33** | **4** |

**FR-03 – forgot-password** ([design §8](features/forgot-password/automation_design.md#8-failures-and-bugs-t7)):

| Bug | Issue | Outcome | Tests | Severity / Priority |
| --- | --- | --- | --- | --- |
| [BUG-02](bugs/BUG_REPORT.md#bug-02) – Bước 2 accepts a new password whose only special character is a space (`NewPass 2026`) and changes the password | [#117](https://github.com/angquoc/software-testing-2026-HW02-group/issues/117) | New | `web.spec.ts` › "DT-35 – special character only outside the set (space)" | High / High (proposed – to be confirmed) |
| [BUG-03](bugs/BUG_REPORT.md#bug-03) – Bước 2 on the Web refuses every new password, also a valid one | [comment on #1](https://github.com/angquoc/software-testing-2026-HW02-group/issues/1#issuecomment-6950008056) | Changed #1 | `web.spec.ts` › DT-04, DT-05, DT-06, BVA-04, BVA-05 | Critical / High (from #1) |
| [BUG-04](bugs/BUG_REPORT.md#bug-04) – OTP has 4 digits instead of 6 | [comment on #3](https://github.com/angquoc/software-testing-2026-HW02-group/issues/3#issuecomment-6950009329) | Confirmed #3 | `web.spec.ts` › DT-01, DT-02 | High / High (from #3) |
| [BUG-05](bugs/BUG_REPORT.md#bug-05) – Bước 2 has no "Xác nhận mật khẩu mới" field | [comment on #4](https://github.com/angquoc/software-testing-2026-HW02-group/issues/4#issuecomment-6950010734) | Confirmed #4 | `web.spec.ts` › DT-01, DT-28, DT-29, DT-30 | Medium / Medium (from #4) |
| [BUG-06](bugs/BUG_REPORT.md#bug-06) – No step indicator on Bước 1 and Bước 2 ("Bước 1 / 2") | [comment on #6](https://github.com/angquoc/software-testing-2026-HW02-group/issues/6#issuecomment-6950012030) | Confirmed #6 | `web.spec.ts` › DT-01, DT-03 | Low / Low (from #6) |
| [BUG-07](bugs/BUG_REPORT.md#bug-07) – Required email field of Bước 1 has no `*` ("Nhập Email của bạn") | [comment on #7](https://github.com/angquoc/software-testing-2026-HW02-group/issues/7#issuecomment-6950013137) | Confirmed #7 | `web.spec.ts` › DT-01 | Low / Low (from #7) |
| [BUG-08](bugs/BUG_REPORT.md#bug-08) – Reset API accepts a request with no `newPassword` and changes the password | [comment on #8](https://github.com/angquoc/software-testing-2026-HW02-group/issues/8#issuecomment-6950014477) | Confirmed #8 | `api.spec.ts` › "DT-27 – reset without newPassword is rejected" | High / High (from #8) |
| [BUG-09](bugs/BUG_REPORT.md#bug-09) – Errors of the reset form appear in a browser dialog, not above the submit button | [comment on #9](https://github.com/angquoc/software-testing-2026-HW02-group/issues/9#issuecomment-6950016053) | Confirmed #9 | `web.spec.ts` › DT-06, DT-11 … 15, DT-20 … 26, DT-35, BVA-01 … 03 (17 tests) | Low / Low (from #9) |
| [BUG-10](bugs/BUG_REPORT.md#bug-10) – Forgot-password page has no "Quay lại đăng nhập" button | [comment on #11](https://github.com/angquoc/software-testing-2026-HW02-group/issues/11#issuecomment-6950017417) | Confirmed #11 | `web.spec.ts` › DT-03 | Low / Low (from #11) |

**FR-08 – checkout** ([bugs/BUG_REPORT.md](bugs/BUG_REPORT.md), [design §8](features/checkout/automation_design.md#8-failures-and-bugs-t7)): 8 bugs – 1 new, 6 confirmed, 1 changed.

| Bug | Issue | Outcome | Tests | Severity / Priority |
| --- | --- | --- | --- | --- |
| BUG-01 – empty cart accepted (typed `/checkout`; also through the API) | [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116) (`hw: HW04`) | New (T2) + automated evidence | DT-07 Web, DT-07 API | Medium / Medium |
| BUG-11 – client `total_amount` stored | [#12](https://github.com/angquoc/software-testing-2026-HW02-group/issues/12) | Confirmed | DT-09 … 13 | Critical / High |
| BUG-12 – no `total_amount` → total `null` | [#13](https://github.com/angquoc/software-testing-2026-HW02-group/issues/13) | Confirmed | DT-02, DT-08 | High / High |
| BUG-13 – cart not cleared after checkout | [#14](https://github.com/angquoc/software-testing-2026-HW02-group/issues/14) | Confirmed | DT-01, BVA-01 … 04, DT-02, 08 … 13 | Medium / Medium |
| BUG-14 – Web total editable | [#15](https://github.com/angquoc/software-testing-2026-HW02-group/issues/15) | Confirmed | DT-01 | Critical / High |
| BUG-15 – no breadcrumb on Thanh toán | [#16](https://github.com/angquoc/software-testing-2026-HW02-group/issues/16) | Confirmed | DT-01 | Low / Low |
| BUG-16 – guest checkout | [#17](https://github.com/angquoc/software-testing-2026-HW02-group/issues/17) | Changed: not reproduced | DT-03 (passes) | High / High |
| BUG-17 – empty cart without illustration (FR-07) | [#80](https://github.com/angquoc/software-testing-2026-HW02-group/issues/80) (another member) | Confirmed, Related | DT-07 Web | Low / – |

Screenshots of the eight comments: `bugs/screenshots/checkout_comment_<issue>.png`.

**FR-15 – product-crud** ([design §8](features/product-crud/automation_design.md#8-failures-and-bugs-t7)): 22 bugs, all already filed in HW02 – 20 confirmed, 2 changed, no new issue.

| Bug | Issue | Outcome | Tests | Severity / Priority |
| --- | --- | --- | --- | --- |
| [BUG-18](bugs/BUG_REPORT.md#bug-18) – Add product API creates a product for a request with no token (`POST /api/products`) | [comment on #18](https://github.com/angquoc/software-testing-2026-HW02-group/issues/18#issuecomment-6959184902) | Confirmed #18 | `api.spec.ts` › DT-06 | Critical / High (from #18) |
| [BUG-19](bugs/BUG_REPORT.md#bug-19) – Edit product API accepts a forged JWT and changes the product (`PUT /api/products/:id`) | [comment on #19](https://github.com/angquoc/software-testing-2026-HW02-group/issues/19#issuecomment-6959185726) | Confirmed #19 | `api.spec.ts` › DT-07 | Critical / High (from #19) |
| [BUG-20](bugs/BUG_REPORT.md#bug-20) – Delete product API accepts the token of a non-admin user and deletes the product (`DELETE /api/products/:id`) | [comment on #20](https://github.com/angquoc/software-testing-2026-HW02-group/issues/20#issuecomment-6959186490) | Confirmed #20 | `api.spec.ts` › DT-08 | Critical / High (from #20) |
| [BUG-21](bugs/BUG_REPORT.md#bug-21) – Add product API saves a product with no name (`name` missing → `null`) | [comment on #21](https://github.com/angquoc/software-testing-2026-HW02-group/issues/21#issuecomment-6959187342) | Confirmed #21 | `api.spec.ts` › DT-12 | High / Medium (from #21) |
| [BUG-22](bugs/BUG_REPORT.md#bug-22) – Add product API saves a price that is not a number (`"abc"`) | [comment on #22](https://github.com/angquoc/software-testing-2026-HW02-group/issues/22#issuecomment-6959188120) | Confirmed #22 | `api.spec.ts` › DT-14 | High / High (from #22) |
| [BUG-23](bugs/BUG_REPORT.md#bug-23) – Add product API saves a product with no category (`category_id` missing → `null`) | [comment on #23](https://github.com/angquoc/software-testing-2026-HW02-group/issues/23#issuecomment-6959188870) | Confirmed #23 | `api.spec.ts` › DT-17 | High / Medium (from #23) |
| [BUG-24](bugs/BUG_REPORT.md#bug-24) – Add product API saves a category id that never existed (`9999`) | [comment on #24](https://github.com/angquoc/software-testing-2026-HW02-group/issues/24#issuecomment-6959189697) | Confirmed #24 | `api.spec.ts` › DT-18 | High / Medium (from #24) |
| [BUG-25](bugs/BUG_REPORT.md#bug-25) – Add product API saves a product with an empty name (`""`) | [comment on #25](https://github.com/angquoc/software-testing-2026-HW02-group/issues/25#issuecomment-6959190498) | Confirmed #25 | `api.spec.ts` › DT-09 | High / Medium (from #25) |
| [BUG-26](bugs/BUG_REPORT.md#bug-26) – A name longer than 255 characters (300 × `X`) is saved, through the Admin web | [comment on #26](https://github.com/angquoc/software-testing-2026-HW02-group/issues/26#issuecomment-6959191421) | Confirmed #26 | `web.spec.ts` › DT-10 | Medium / Medium (from #26) |
| [BUG-27](bugs/BUG_REPORT.md#bug-27) – A name made only of spaces (5 spaces) is saved, through the Admin web | [comment on #27](https://github.com/angquoc/software-testing-2026-HW02-group/issues/27#issuecomment-6959192295) | Confirmed #27 | `web.spec.ts` › DT-11 | High / Medium (from #27) |
| [BUG-28](bugs/BUG_REPORT.md#bug-28) – A negative price (`-50000`) is saved, through the Admin web | [comment on #28](https://github.com/angquoc/software-testing-2026-HW02-group/issues/28#issuecomment-6959193123) | Confirmed #28 | `web.spec.ts` › DT-13 | High / High (from #28) |
| [BUG-29](bugs/BUG_REPORT.md#bug-29) – A product with no price is saved (Admin web: empty price field; API: `price` missing) | [comment on #29](https://github.com/angquoc/software-testing-2026-HW02-group/issues/29#issuecomment-6959193850) | Confirmed #29 | `web.spec.ts, api.spec.ts` › DT-15 | High / High (from #29) |
| [BUG-30](bugs/BUG_REPORT.md#bug-30) – A price with a fractional part (`250000.5`) is saved, through the Admin web and the API | [comment on #30](https://github.com/angquoc/software-testing-2026-HW02-group/issues/30#issuecomment-6959194793) | Confirmed #30 | `web.spec.ts, api.spec.ts` › DT-16 | Medium / Medium (from #30) |
| [BUG-31](bugs/BUG_REPORT.md#bug-31) – Add product API saves the id of a deleted category | [comment on #31](https://github.com/angquoc/software-testing-2026-HW02-group/issues/31#issuecomment-6959196033) | Confirmed #31 | `api.spec.ts` › DT-19 | High / Medium (from #31) |
| [BUG-32](bugs/BUG_REPORT.md#bug-32) – Editing a product with a negative price (`-50000`) is saved, through the Admin web | [comment on #32](https://github.com/angquoc/software-testing-2026-HW02-group/issues/32#issuecomment-6959196922) | Confirmed #32 | `web.spec.ts` › DT-22 | High / High (from #32) |
| [BUG-33](bugs/BUG_REPORT.md#bug-33) – Required fields of the add-product form have no `*` (name, price, category) | [comment on #33](https://github.com/angquoc/software-testing-2026-HW02-group/issues/33#issuecomment-6959197762) | Confirmed #33 | `web.spec.ts` › DT-23 | Low / Low (from #33) |
| [BUG-34](bugs/BUG_REPORT.md#bug-34) – After an edit on the Admin web, every row of the product list shows the edited name | [comment on #34](https://github.com/angquoc/software-testing-2026-HW02-group/issues/34#issuecomment-6959198557) | Changed #34 | `web.spec.ts` › DT-24 | High / Medium (from #34) |
| [BUG-35](bugs/BUG_REPORT.md#bug-35) – The new row of the product list shows its price without thousand separators (`250000 ₫`) | [comment on #35](https://github.com/angquoc/software-testing-2026-HW02-group/issues/35#issuecomment-6959199288) | Changed #35 | `web.spec.ts` › DT-25 | Medium / Medium (from #35) |
| [BUG-36](bugs/BUG_REPORT.md#bug-36) – Product list shows prices without thousand separators (`30000000 ₫`) | [comment on #36](https://github.com/angquoc/software-testing-2026-HW02-group/issues/36#issuecomment-6959200113) | Confirmed #36 | `web.spec.ts` › DT-26 | Low / Low (from #36) |
| [BUG-37](bugs/BUG_REPORT.md#bug-37) – Product list has no category column | [comment on #37](https://github.com/angquoc/software-testing-2026-HW02-group/issues/37#issuecomment-6959200854) | Confirmed #37 | `web.spec.ts` › DT-27 | Low / Low (from #37) |
| [BUG-38](bugs/BUG_REPORT.md#bug-38) – A name of 256 characters (`Ố` × 256) is saved, through the Admin web | [comment on #38](https://github.com/angquoc/software-testing-2026-HW02-group/issues/38#issuecomment-6959201726) | Confirmed #38 | `web.spec.ts` › BVA-05 | Medium / Medium (from #38) |
| [BUG-39](bugs/BUG_REPORT.md#bug-39) – A price of 0 is saved, through the Admin web | [comment on #39](https://github.com/angquoc/software-testing-2026-HW02-group/issues/39#issuecomment-6959202462) | Confirmed #39 | `web.spec.ts` › BVA-06 | High / High (from #39) |

## 8. Test cases not automated

**FR-03 – forgot-password:** 12 of the 45 test cases are not automated ([design §7](features/forgot-password/automation_design.md#7-not-automated-t8), reasons confirmed by the student 17/11): request shapes only the API can send, already passed in HW02 (DT-10, 16, 18, 19, 31); an oracle that is an assumption, not a requirement (DT-33); real server time the test cannot control (DT-34, BVA-08 … 10); duplicates of an automated partition (BVA-06, 07). All 12 were run in HW02 through the API.

| TC ID | Reason | Tested instead |
| --- | --- | --- |
| DT-10 | API-only request shape: the Web always sends `email`, and an empty one is blocked by the browser (DT-07); passed in HW02 | HW02, through the API (`run_step.py`, 20/10/2026): Pass. The Web side of the same rule is automated by DT-07 (empty e-mail) |
| DT-16 | API-only request shape: the Web always sends `resetToken`, and an empty one is blocked by the browser (DT-13); passed in HW02 | HW02, through the API (`run_step.py`, 20/10/2026): Pass. The Web side is automated by DT-13 (empty OTP) |
| DT-18 | API-only, and the same requirement sentence and oracle as DT-17 (automated); passed in HW02 | HW02, through the API (`run_step.py`, 20/10/2026): Pass. Same oracle automated by DT-17 (API) |
| DT-19 | API-only request shape: the Web always sends the email of Bước 1; passed in HW02 | HW02, through the API (`run_step.py`, 20/10/2026): Pass |
| DT-31 | API-only: the Web always requests an OTP before Bước 2; passed in HW02 | HW02, through the API (`run_step.py`, 20/10/2026): Pass |
| DT-33 | the oracle is assumption A8, not a requirement sentence; on the Web the password check runs before the OTP is sent; passed in HW02 | HW02, through the API (`run_step.py`, 20/10/2026): Pass (A8 holds) |
| DT-34 | waits 11 minutes of real server time; the test cannot set the server clock; the limit is assumption A7 | HW02, through the API (`run_step.py`, 20/10/2026), waiting 660 s: **Fail** – HW02 BUG-05 (#5), OTP still accepted |
| BVA-06 | duplicate of DT-01 / DT-04: every Web test uses its OTP within seconds of the request (same partition EC-V8-1, same oracle) | HW02, through the API (`run_step.py`, 20/10/2026): Pass. The same partition is used by every automated reset row (OTP used within seconds), e.g. DT-04, BVA-04 |
| BVA-07 | duplicate of DT-01 / DT-04 (same partition and oracle); an exact 1 s gap needs a fixed sleep | HW02, through the API (`run_step.py`, 20/10/2026): Pass. Same as BVA-06 |
| BVA-08 | waits 10 minutes of real server time; the test cannot set the server clock | HW02, through the API (`run_step.py`, 20/10/2026), waiting 599 s: Pass |
| BVA-09 | waits 10 minutes of real server time; the test cannot set the server clock | HW02, through the API (`run_step.py`, 20/10/2026), waiting 600 s: Pass |
| BVA-10 | waits 10 minutes of real server time; the test cannot set the server clock; the limit is assumption A7 | HW02, through the API (`run_step.py`, 20/10/2026), waiting 601 s: **Fail** – HW02 BUG-05 (#5), OTP still accepted |

**FR-08 – checkout:** none – all 17 HW02 test cases are automated ([design §7](features/checkout/automation_design.md#7-not-automated-t8)); parts of expected results that are recorded but not judged (confirmation screen, address, badge, guest message, HTTP status) are listed there with their reason.

**FR-15 – product-crud:** none – all 36 HW02 test cases are automated ([design §1](features/product-crud/automation_design.md#1-test-cases-selected-t1)). Recorded but not judged: the HTTP status and the `alert` texts (HW02 decisions Q1, Q8), the browser validation messages (they differ per browser), and "in Vietnamese" in the FR-22 oracle of DT-09, 12, 14, 17 … 19 (these are refused through the API or blocked by the browser, so no Admin web message is judged; design §3).

## 9. Demo video

**Link:** [https://www.youtube.com/watch?v=6ro7cYrT5Ew](https://www.youtube.com/watch?v=6ro7cYrT5Ew) (8:04, unlisted). Vietnamese narration in the student's own voice; screen recording of the FR-15 Product CRUD scripts.

| Time | What is shown |
| --- | --- |
| 0:00 | Identity: `whoami && hostname && date -Iseconds && pwd` (hg / hg, 2026-11-18T04:05:50+07:00, `week04`) |
| 0:57 | The scripts: `tests/product-crud/web.spec.ts` reads `data/product-crud/web.json` (one test per row, title starts with the TC ID), the row DT-25, the page object `AdminProductsPage.ts`, three assertion patterns (stored products through the API, text on the page, negative check) |
| 3:00 | The fix narrated: DT-17 (design §5 row 2, flaky wait, cause: model) – the generated test read the category options once while the Admin web was still loading them; `git log` shows the generated commit `8be9fac` and the fix `a278a51`; `git show --oneline a278a51` shows the one-time read replaced by the web-first `toHaveText` |
| 5:31 | DT-17 rerun three times on the three browsers: `9 passed` |
| 5:41 | Official run: `whoami && hostname && date` (04:59:14) in the same terminal, then `npm run feature -- product-crud`, fresh EShop, Chromium → Firefox → WebKit (sped up ×12, labelled), run summary: 41 tests per browser, 17 passed, 24 failed |
| 6:46 | The HTML reports just produced: title "HW04 · FR-15 Product CRUD (admin) · chromium · Run by: 23120046 · 2026-11-17T21:59:59.473Z", a passing test (DT-01) and a failing one (DT-10, expected vs received, screenshot), then the Firefox and WebKit reports |
| 7:26 | Failures and bugs: the product defects were already filed in HW02; HW04 evidence added as comments (issue #34 shown) |
| 8:00 | Summary (design §6) |

The reports shown are the submitted ones (`reports/product-crud/`, committed unchanged right after the recording, design §6).

## 10. Agent Skills

**Skill demo video:** [https://youtu.be/Y7RpOnSWS8I](https://youtu.be/Y7RpOnSWS8I) (6:38, unlisted) – the skill `test-automation` used on FR-15 Product CRUD step by step: test case selection (T1), codegen and locators (T2), test data (T3), generated specs and first run (T4), review and one fix with its rerun (T5), the three browser reports (T6), failure triage with the trace viewer (T7), and the HW04 comments on the HW02 issues (`automation-bug-reporting`). Silent screen recording with Vietnamese subtitles; identity shown by `whoami && hostname` at the start.

## 11. AI Critique

See [AI_Critique.md](AI_Critique.md).

## 12. Self-assessment and test summary

See [README.md](README.md) §2 and §4.

## 13. Appendix – AI Audit Report

See [AI-02_AI_Audit_Report.md](AI-02_AI_Audit_Report.md) and [prompt_log.md](prompt_log.md).
