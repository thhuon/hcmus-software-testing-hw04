# HW04-AI – Automation Testing on EShop

| Student name | Student ID | Class | Exercise | Submission file |
| --- | --- | --- | --- | --- |
| HỒ THÙY HƯƠNG | 23120046 | CQ2023/3 | HW04-AI | `23120046_HW04_AI_Automation_<XXX>.zip` |

**AI declaration:** I use AI tools for the following tasks, as recorded in [AI-02_AI_Audit_Report.md](AI-02_AI_Audit_Report.md) and [prompt_log.md](prompt_log.md).

**Public repository:** <https://github.com/thhuon/hcmus-software-testing-hw04> (scripts, data files, HTML reports)

## 1. Selected features

The same three web features as HW02 (brief §5; group allocation: [HW02 group repo README §1](https://github.com/angquoc/software-testing-2026-HW02-group)). Details: [features/selected-features.md](features/selected-features.md).

| Slot | Pool | Feature | Frontend | Specs | Data | Automation design |
| --- | --- | --- | --- | --- | --- | --- |
| A | Pool A | FR-03 – Quên & đặt lại mật khẩu (2 bước) | Web | `tests/forgot-password/` | `data/forgot-password/` | [features/forgot-password](features/forgot-password/automation_design.md) |
| B | Pool B | FR-08 – Thanh toán (Checkout) | Web | `tests/checkout/` | `data/checkout/` | [features/checkout](features/checkout/automation_design.md) |
| C | Pool C | FR-15 – Quản lý sản phẩm (Product CRUD) | Admin web | `tests/product-crud/` | `data/product-crud/` | [features/product-crud](features/product-crud/automation_design.md) |

## 2. Test summary report

<!-- Numbers from `npm run summary` (skills/test-automation/scripts/summarize-results.mjs) after the official runs — must match the reports in reports/ and bugs/BUG_REPORT.md. -->

| Feature | TC automated | Executed | Passed | Failed | Browser runs | Bugs (confirmed / changed / new) |
| --- | --- | --- | --- | --- | --- | --- |
| A – FR-03 | 33 | 33 | 5 | 28 | 3 | 7 / 1 / 1 |
| B – FR-08 | | | | | | |
| C – FR-15 | | | | | | |
| **Total** | | | | | | |

- Number of features: **3**
- Browsers: Chromium 156.0.8078.4 · Firefox 157.0 · WebKit 27.2 (Playwright 1.64.1, Ubuntu 26.04)
- HTML reports (`Run by: 23120046` + ISO timestamp in the title): [reports/](reports/)
- Bugs: [bugs/BUG_REPORT.md](bugs/BUG_REPORT.md) · GitHub Issues: [HW02 group repo, label `hw: HW04`](https://github.com/angquoc/software-testing-2026-HW02-group/issues?q=label%3A%22hw%3A+HW04%22) + comments on HW02 issues
- Demo video (Task 2): <YouTube link>
- Main report: [HW04_Report.md](HW04_Report.md) · PDF: [pdf/](pdf/)

## 3. Agent Skills

**Skill demo video:** <YouTube link>

The skills are generic (one per testing topic, sources in [skills/SOURCES.md](skills/SOURCES.md)), each with a Vietnamese reading copy (`SKILL.vi.md`, `review-rubric.vi.md`); the HW04 values they use are in [CLAUDE.md](CLAUDE.md) and [automation.config.json](automation.config.json).

| Skill | Topic | Used for in HW04 |
| --- | --- | --- |
| [test-automation](skills/test-automation/SKILL.md) | Test automation | Task 1: T1–T8 for FR-03, FR-08, FR-15 (selection, page objects, data files, data-driven specs, review and fix, multi-browser runs, triage, summary) |
| [automation-bug-reporting](skills/automation-bug-reporting/SKILL.md) | Defect reporting | Task 1: comments on HW02 issues / new issues for failing assertions |
| [recording-test-demo-videos](skills/recording-test-demo-videos/SKILL.md) | Demo video | Task 2 and the skill video: shot list, preparation, final check |
| [git-commit-conventions](skills/git-commit-conventions/SKILL.md) | Version control | One commit per step in this personal repo (≥ 8 commits changing `.spec.ts`, brief §12); the group repo keeps its own README convention |

## 4. Self-assessment

| No. | Criteria | Grade | Self-Assessed Grade |
| ---: | --- | ---: | ---: |
| 1 | Task 1 - Feature A | 25 | |
| 1 | Task 1 - Feature B | 25 | |
| 1 | Task 1 - Feature C | 25 | |
| 2 | Task 2 — Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | **Total** | **100** | |

## 5. Contents of this submission

| File / folder | Content |
| --- | --- |
| `HW04_Report.md` + `pdf/HW04_Report.pdf` | Main report: automation report per feature, review / gap analysis of the AI-generated scripts, runs, bugs |
| `tests/`, `page-objects/`, `api/`, `data/` | Playwright specs (TypeScript), page objects (one class per screen), API client (setup and checks through the API), test data files (JSON / CSV) |
| `reports/<feature>/<browser>/` | Multi-browser HTML reports (Playwright HTML reporter) + `results.json` |
| `features/<feature>/automation_design.md` | Selection, locators, data, assertion patterns, review table, runs, not automated, failures |
| `bugs/BUG_REPORT.md` + `bugs/screenshots/` | Bug report + screenshots of the bugs and the GitHub Issues page |
| `AI-02_AI_Audit_Report.md` (+ PDF), `AI_Critique.md` (+ PDF) | AI Audit Report, AI Critique (200–300 words) |
| `AI-03_AI_Disclosure_Form.md`, `AI-05_AI_Privacy_Checklist.md` | AI templates |
| `prompt_log.md` | Full AI interaction log |
| `skills/` + `CLAUDE.md` + `automation.config.json` | Agent Skills + the HW04 project profile they read |
| `demo/shot_list.md` | Shot list and requirement check of the two videos |
| `playwright.config.ts`, `package.json` | Automation setup (`npm run smoke`, `npm run feature -- forgot-password`, `npm run all`, `npm run summary`) |
| `git_log.txt` | Git commit log |
