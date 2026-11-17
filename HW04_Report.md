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

- **Selection** ([design §1](features/forgot-password/automation_design.md#1-test-cases-selected-t1)): 45 test cases (44 from HW02 + DT-35 added in HW04), **33 automated** (30 through the Web UI, 7 of them also send the same OTP to the API; 3 API only: DT-17, DT-27, DT-32) and 12 not automated (API-only request shapes already covered, an assumption-only oracle, real-time OTP expiry, duplicates), each with its reason.
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

The same tests pass (DT-07, 08, 09, 17, 32) and fail on every browser ([design §6](features/forgot-password/automation_design.md#6-runs-t6)). These are the second official runs (17/11 20:08–20:20); the first set showed one environment error, `ECONNRESET` on an API call in DT-12 on Firefox (1 of 3 on rerun, never on Chromium or WebKit, likely a keep-alive connection closed by the server after the 5 s soft wait). It does not change any verdict; the student accepted it as a risk and the runs were repeated without it. The official runs keep a screenshot of every failed Web test (`reports/forgot-password/<browser>/screenshots/<TC ID>.png`) and no traces (not asked by the brief; the reports went from 10–25 MB to 3–6 MB per browser). Bugs behind the failures: after T7.

## 4. Feature B – FR-08 Thanh toán

### 4.1 Test cases automated

### 4.2 Review of the AI-generated scripts

### 4.3 Results

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
