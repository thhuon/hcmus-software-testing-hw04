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

<!-- Steps T1–T8 of the test-automation skill, one prompt + one commit per step; how the review was done; how the official runs were made. -->

## 3. Feature A – FR-03 Quên & đặt lại mật khẩu

### 3.1 Test cases automated

<!-- From features/forgot-password/automation_design.md §1, §3, §4: count, data file, assertion patterns. -->

- **Selection** ([design §1](features/forgot-password/automation_design.md#1-test-cases-selected-t1)): 45 test cases (44 from HW02 + DT-35 added in HW04), **33 automated** (30 through the Web UI, 7 of them also send the same OTP to the API; 3 API only: DT-17, DT-27, DT-32) and 12 not automated, each with its reason and how it was tested instead ([design §7](features/forgot-password/automation_design.md#7-not-automated-t8)): request shapes only the API can send (DT-10, 16, 18, 19, 31), an oracle that is an assumption (DT-33), OTP expiry that needs 10–11 minutes of real server time (DT-34, BVA-08 … 10), duplicates of an automated partition (BVA-06, 07). All 12 ran in HW02 through the API; DT-34 and BVA-10 failed there (HW02 BUG-05 #5).
- **Locators and page objects** ([design §2](features/forgot-password/automation_design.md#2-locators-and-page-objects-t2)): `page-objects/LoginPage.ts`, `page-objects/ForgotPasswordPage.ts`, API client `api/EshopApi.ts`. No input of the page has an accessible name; seven locator options were counted on Chromium, Firefox and WebKit, and the fields are found by the textbox under a label that starts with the field name (student decision). Codegen check by the student: codegen picks generic `getByRole('textbox')` / `input[type=…]` for these fields.
- **Test data** ([design §3](features/forgot-password/automation_design.md#3-test-data-t3)): `data/forgot-password/web.json` (30 rows) and `api.json` (3 rows); inputs from the HW02 test cases, expected values from FR-03, FR-01, FR-22, SEC-07 and the HW02 assumptions; every test registers its own account through the API, so tests and runs do not share data.
- **Specs and assertion patterns** ([design §4](features/forgot-password/automation_design.md#4-specs-and-assertion-patterns-t4)): `tests/forgot-password/web.spec.ts` (30 tests) and `api.spec.ts` (3 tests), one test per data row, title starting with the TC ID; 8 assertion patterns: stored outcome (login through the API), soft assertions, visible text, element state, value format, URL, negative, API response status.

### 3.2 Review of the AI-generated scripts

<!-- From design §5: what the AI got wrong or missed, the fix, why (Prompt / Model / Feature). -->

First run on Chromium: 6 passed, 27 failed. The review ([design §5](features/forgot-password/automation_design.md#5-review-of-the-ai-generated-scripts-t5)) found three mistakes of the AI in the Web spec, all fixed as the student decided, cause type **Model** (student):

| # | What the AI got wrong | Category | Fix |
| --- | --- | --- | --- |
| 1 | DT-05 passed although the Web refused the reset: with new = current password the login check cannot tell the outcomes apart, so BUG-01 was hidden | weak assertion | after an accepted reset the same OTP must be refused by the API (SEC-07 "vô hiệu hóa sau khi dùng") (eb9d9d8) |
| 2 | The FR-22 check required `role="alert"`, which FR-22 does not ask for | wrong oracle | any error text above the submit button (e2a210a) |
| 3 | No assertion before acting on an element the app lacks: 30 s timeout without naming the missing FR-03 element | weak assertion | `toBeVisible()` with the FR-03 name before the action (63f8508) |

After the fixes: 5 passed, 28 failed (DT-05 now fails on BUG-01), run time 5.4 → 3.4 min; the passing tests are stable (`--repeat-each=3`). No issue found in fragile selectors, flaky waits, missing edge cases, hidden dependencies or hard-coded data.

### 3.3 Results

<!-- Per browser: passed / failed; failing tests and their bugs. -->

| Browser | Report | Tests | Passed | Failed | Flaky |
| --- | --- | --- | --- | --- | --- |
| Chromium | [reports/forgot-password/chromium](reports/forgot-password/chromium/index.html) | 33 | 5 | 28 | 0 |
| Firefox | [reports/forgot-password/firefox](reports/forgot-password/firefox/index.html) | 33 | 5 | 28 | 0 |
| WebKit | [reports/forgot-password/webkit](reports/forgot-password/webkit/index.html) | 33 | 5 | 28 | 0 |

The same tests pass (DT-07, 08, 09, 17, 32) and fail on every browser ([design §6](features/forgot-password/automation_design.md#6-runs-t6)). These are the second official runs (17/11 20:08–20:20); the first set showed one environment error, `ECONNRESET` on an API call in DT-12 on Firefox (1 of 3 on rerun, never on Chromium or WebKit, likely a keep-alive connection closed by the server after the 5 s soft wait). It does not change any verdict; the student accepted it as a risk and the runs were repeated without it. The official runs keep a screenshot of every failed Web test (`reports/forgot-password/<browser>/screenshots/<TC ID>.png`) and no traces (not asked by the brief; the reports went from 10–25 MB to 3–6 MB per browser). Triage ([design §8](features/forgot-password/automation_design.md#8-failures-and-bugs-t7), verdicts confirmed by the student): all 28 failures are **product defects**, none is a script defect after the T5 fixes. They come from 8 bugs already filed in HW02 – BUG-01 #1 (Web refuses valid passwords), BUG-03 #3 (4-digit OTP), BUG-04 #4 (no confirm field), BUG-06 #6 (no step indicator), BUG-07 #7 (no `*`), BUG-08 #8 (API reset without `newPassword`), BUG-09 #9 (errors in a dialog, 17 tests), BUG-11 #11 (no "Quay lại đăng nhập") – and **one new defect** found only by HW04's added test DT-35: the Web accepts `NewPass 2026`, whose only special character is a space, and changes the password. On the Web this defect is masked by BUG-01: a valid new password can never be set, so the reset only succeeds with an invalid one; the trace viewer shows `POST /api/reset-password` → `200` and no success message in the page, only a browser `alert` (student, 17/11). One HW02 report differs in one point: BUG-01 #1 says the Web refuses *every* new password, but `NewPass 2026` is accepted (DT-35). Bug report: [bugs/BUG_REPORT.md](bugs/BUG_REPORT.md) BUG-02 (new, issue [#117](https://github.com/angquoc/software-testing-2026-HW02-group/issues/117), label `hw: HW04`) and BUG-03 … BUG-10 (7 confirmed, 1 changed: an "HW04 – automated re-test" comment with screenshots on #1, #3, #4, #6, #7, #8, #9, #11); verdicts confirmed by the student 17/11.

## 4. Feature B – FR-08 Thanh toán

### 4.1 Test cases automated

<!-- From features/checkout/automation_design.md §1–§4: count, data file, assertion patterns. -->

- **Selection** ([design §1](features/checkout/automation_design.md#1-test-cases-selected-t1)): all **17** HW02 test cases are automated (13 DT + 4 BVA), none left out: 7 through the Web UI (DT-01, DT-03, DT-07, BVA-01 … 04) and 10 through the API only (DT-02, 04, 05, 06, 08, 09 … 13); DT-07 has a Web and an API part. Student decisions: DT-03 tries both guest paths (cart button, typed `/checkout`) in one test; BVA-01 … 04 run on the Web, because the backend stores the `total_amount` it receives and ignores the cart, so through the API the boundary values would change nothing; the checkout of an empty cart counts as a bug (DT-07), replacing the HW02 Pass.
- **Locators and page objects** ([design §2](features/checkout/automation_design.md#2-locators-and-page-objects-t2)): from the student's codegen run and an ARIA snapshot of every screen, each locator counted on Chromium, Firefox and WebKit. Page objects `SiteHeader`, `LoginPage`, `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage`, `Dialogs`; API client `api/EshopApi.ts`. Testability findings: no input has an accessible name, the Web cart is lost on a reload (tests move only through links), "Thêm vào giỏ hàng" needs two clicks (#73), no cart badge (#79). [Checkout page](features/checkout/screenshots/DT-01-checkout-page-chromium.png) · [total edited by the user](features/checkout/screenshots/DT-01-total-edited-chromium.png).
- **Test data** ([design §3](features/checkout/automation_design.md#3-test-data-t3)): `data/checkout/web.json` (7 rows) and `api.json` (11 rows); inputs from the HW02 test cases, expected values from FR-08, FR-07, FR-23, SEC-02 and the HW02 assumptions A1–A15 / decisions Q1–Q10; catalog prices from the seed; each test registers its own account, so tests and runs share no cart or order.
- **Specs and assertion patterns** ([design §4](features/checkout/automation_design.md#4-specs-and-assertion-patterns-t4)): `tests/checkout/web.spec.ts` (7 tests) and `api.spec.ts` (11 tests), one test per data row, title starting with the TC ID; 6 assertion patterns: stored outcome through the API, visible text, element state, negative, soft assertions, comparison of a list of values.
- **Bug found while building the tests:** BUG-01 – a logged-in user with an empty cart who types `/checkout` places an order of 0 ₫ ([bugs/BUG_REPORT.md](bugs/BUG_REPORT.md#bug-01), new issue [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116), [screenshot](bugs/screenshots/DT-07_empty-checkout-success_chromium.png)).

### 4.2 Review of the AI-generated scripts

<!-- From design §5: what the AI got wrong or missed, the fix, why (Prompt / Model / Feature). -->

First run of the generated specs on Chromium (17/11, development runs): Web 1 passed, 6 failed ([report](features/checkout/screenshots/first-run/web-report-chromium.png)); API 3 passed, 8 failed ([report](features/checkout/screenshots/first-run/api-report-chromium.png)). Every failed assertion has an oracle quoted from the requirement or the HW02 decisions. The review ([design §5](features/checkout/automation_design.md#5-review-of-the-ai-generated-scripts-t5)) found five problems; cause types confirmed by the student (17/11): #1 and #5 **Feature** (seen only when the app runs: a taken e-mail registered again, a click lost on a busy browser), #2 and #4 **Model**, #3 **Prompt**:

| # | What the AI got wrong | Category | Fix |
| --- | --- | --- | --- |
| 1 | The account e-mail was the same for every repeat / retry of a test; the backend registers a taken e-mail again and logs in the first account, so with `--repeat-each=3` the repeats shared a cart and 6 of 12 runs failed | hidden dependency | repeat and retry index in the e-mail (f4b4d10); 12 of 12 passed ([before](features/checkout/screenshots/t5/repeat-before-fix-chromium.png), [after](features/checkout/screenshots/t5/repeat-after-fix-chromium.png)) |
| 2 | A refused API row naming no order count would check no order and pass | weak assertion | hard check (f0b2152) |
| 3 | DT-03 path (b): typing `/checkout` reloads the page, so the guest's cart is empty – two invalid classes in one test | missing edge case | open: student decision |
| 4 | DT-03 path (a): an `if` on page state | weak assertion | open: depends on 3 |
| 5 | `ProductPage.addToCart`: two clicks with a fixed probe; on a busy Firefox the second click was once counted as the first again (DT-03 flaky in the first official set) | flaky wait | click until "Đã thêm", up to 4 clicks, each extra click recorded (35b0c42); Firefox `--repeat-each=3` stable |

No issue found in fragile selectors, wrong oracles or hard-coded data; no assertion was weakened.

### 4.3 Results

<!-- Per browser: passed / failed; failing tests and their bugs. -->

| Browser | Report | Tests | Passed | Failed | Flaky |
| --- | --- | --- | --- | --- | --- |
| Chromium | [reports/checkout/chromium](reports/checkout/chromium/index.html) ([screenshot](features/checkout/screenshots/t6/report-chromium.png)) | 18 | 4 | 14 | 0 |
| Firefox | [reports/checkout/firefox](reports/checkout/firefox/index.html) ([screenshot](features/checkout/screenshots/t6/report-firefox.png)) | 18 | 4 | 14 | 0 |
| WebKit | [reports/checkout/webkit](reports/checkout/webkit/index.html) ([screenshot](features/checkout/screenshots/t6/report-webkit.png)) | 18 | 4 | 14 | 0 |

Official runs 17/11 21:14–21:19 ([design §6](features/checkout/automation_design.md#6-runs-t6)), reusing the running SUT so the parallel FR-03 session was not disturbed (each test uses its own account). The same tests pass (DT-03, DT-04 … 06) and fail on every browser: 17 test cases, 4 passed, 13 failed. A first set had DT-03 fail on Firefox only; it was flaky (1 of 5 on rerun), fixed (review #5) and the set was run again. Bugs behind the failures: after T7.

## 5. Feature C – FR-15 Quản lý sản phẩm

### 5.1 Test cases automated

### 5.2 Review of the AI-generated scripts

### 5.3 Results

## 6. Multi-browser runs

<!-- `npm run summary` output: runs table (9 runs) and totals; links to reports/<feature>/<browser>/index.html. -->

## 7. Bug summary

<!-- From bugs/BUG_REPORT.md §2: Confirmed / Changed comments on HW02 issues, new issues with label hw: HW04; screenshot of the Issues page. -->

## 8. Test cases not automated

<!-- From design §7 of each feature: TC, reason. -->

## 9. Demo video

<!-- Link (unlisted), what it shows with timestamps (from demo/shot_list.md §4), the fix narrated. -->

## 10. Agent Skills

<!-- Skills, what each does, skill demo video link. -->

## 11. AI Critique

See [AI_Critique.md](AI_Critique.md).

## 12. Self-assessment and test summary

See [README.md](README.md) §2 and §4.

## 13. Appendix – AI Audit Report

See [AI-02_AI_Audit_Report.md](AI-02_AI_Audit_Report.md) and [prompt_log.md](prompt_log.md).
