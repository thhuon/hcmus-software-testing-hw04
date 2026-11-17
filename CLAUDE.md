# HW04 – Automation Testing: project profile for the testing skills

Skills are generic (one per testing topic). Every value that belongs to this homework is here; a skill reads it from this file.

## Assignment and policies

- Brief: `HW04_Automation_Testing_Original.md` (original) · Vietnamese reading copy `HW04_Automation_Testing_Vietnamese.md` · task list and execution order `PLAN.md`.
- Policies: `../___2026.Homework.Policies.md`. Integrity: brief §11 (HTML reports and the demo video are verified by the TAs; never edit a report by hand, never fabricate a run).
- Tester: **HỒ THÙY HƯƠNG – 23120046** (CQ2023/3).

## Language

- Skills, `CLAUDE.md`, scripts, test code and commit messages: English.
- `PLAN.md`: Vietnamese (as HW02/HW03). The course AI forms (AI-02, AI-03, AI-05) stay in Vietnamese.
- Demo video files `demo/shot_list.md` and `demo/narration_script.md`: Vietnamese, plain step-by-step wording (student 18/11: the student reads them while recording).
- Verbatim records stay as they are: prompts, requirement quotes, UI labels of the app.

## System under test

- EShop, local copy `eshop-sut/` (git-ignored; copied from the seminar repo, upstream `ttbhanh/eshop-sut` commit `85af3ba`). Web `http://localhost:5173` · Admin `http://localhost:5174` · API `http://localhost:3000`.
- Requirement document: `eshop-sut/README.md`; API: `eshop-sut/api_specification.md`.
- The backend drops and re-seeds the SQLite database at every start (`backend/database.js`), so a fresh server = clean data.
- Seed accounts and data: read them from `eshop-sut/README.md` / `backend/database.js`, never invent them.

## Features (reused from HW02, brief §5)

| Key (folder name) | HW02 pool | FR | Feature | Frontend | Tests | Data | HW02 test cases |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `forgot-password` | fA | FR-03 | Forgot & reset password (2 steps) | Web | `tests/forgot-password/` | `data/forgot-password/` | `../week02/features/fA-pool-A/02_domain_testing.md`, `03_boundary_value_analysis.md` |
| `checkout` | fB | FR-08 | Checkout | Web | `tests/checkout/` | `data/checkout/` | `../week02/features/fB-pool-B/…` |
| `product-crud` | fC | FR-15 | Product CRUD | Admin web | `tests/product-crud/` | `data/product-crud/` | `../week02/features/fC-pool-C/…` |

HW02 bugs to compare against: `../week02/bugs/BUG_REPORT.md` (group issues `angquoc/software-testing-2026-HW02-group` #1–#41).

## Automation setup

- Playwright `@playwright/test` 1.64.1 (TypeScript specs), browsers Chromium, Firefox, WebKit. Config `playwright.config.ts`: `webServer` starts the three SUT servers; `workers: 1` (one shared database).
- HTML report title: `HW04 · <feature> · <browser> · Run by: 23120046 · <ISO timestamp>` (brief §6 Task 1, §11).
- Working file per feature: `features/<key>/automation_design.md` (template of the test-automation skill).
- Minimums per feature (brief §6 Task 1): ≥ 12 automated test cases; test data in a separate `.json` / `.csv` file (no inline arrays); ≥ 3 distinct assertion patterns; all 3 browsers.
- Feature keys and spec folders for the skill scripts: `automation.config.json`. Commands:
  - `npm run smoke` – environment check (add `-- --project=chromium` to limit).
  - `npm run feature -- forgot-password` – one feature on 3 browsers, HTML report + `results.json` in `reports/forgot-password/<browser>/` (fresh SUT per run; `--reuse` keeps running servers; `--browsers chromium` limits).
  - `npm run all` – the 9 official runs (3 features × 3 browsers); `npm run summary` – counts for the README and report.
  - Tools (skill test-automation "Tools and approaches"): `npm run sut` (start the three servers for codegen), `npm run codegen` / `npm run codegen:admin`, `npm run ui -- tests/<dir>` (UI mode), `npm run report -- <report dir>`, `npm run trace -- <trace.zip>`, `npm run init-agents` (Playwright Test Agents; not used in HW04, student 17/11).
- During development use `npx playwright test tests/forgot-password --project=chromium` (output in the ignored `playwright-report/`); only the official runs go to `reports/` and are committed.

## Bug reports

- Report `bugs/BUG_REPORT.md`; screenshots `bugs/screenshots/`.
- Issue tracker: the **HW02 group repo `angquoc/software-testing-2026-HW02-group`** (`gh` account `thhuon`), following its README §4 (template "Bug report", title `[23120046][FR-xx][Web|Admin] …`, labels 1 severity + 1 platform + technique of the automated HW02 test case + 1 pool, assignee self) and §6 (HW04 rules).
- **Defect already filed in HW02** (`../week02/bugs/BUG_REPORT.md`, issues #1–#41): no new issue. Comment on the existing issue with the script, browser, assertion result, screenshot, and the word "HW04"; also when the behaviour now differs from the HW02 report (say what differs).
- **New defect**: a new issue with the extra label `hw: HW04`.
- Reporter line: `HỒ THÙY HƯƠNG – 23120046`. Proof for the submission: screenshot of the Issues page filtered by `label:"hw: HW04"` plus the commented issues.

## Rules for this homework

- **One technique step per prompt, one commit per step**, pushed right away (git-commit-conventions, for this personal repo only). A commit to the HW02 group repo follows the group README §3 (`[<scope>][<step>] Verb …`, e.g. `[docs] Update feature allocation`), as in earlier homeworks. ≥ 8 commits must change `.spec.ts` files (brief §12). Commit scope = the feature key (`test (forgot-password): …`). **No `Co-Authored-By` trailer**. Remote `git@github-home:thhuon/hcmus-software-testing-hw04.git`, branch `master`.
- **The student decides** every verdict, severity and "why the AI missed it"; agent proposals are marked `(proposed)` (`(đề xuất)` in AI-02).
- **Review notes at fix time**: every correction of an AI-generated script goes into `features/<key>/` review table (what was wrong, why the AI missed it: prompt quality, model limitation, feature characteristic) in the same step.
- **AI-02 row in the same turn as every artifact** (`AI-02_AI_Audit_Report.md` §3, Vietnamese as the course form), committed on its own (`docs (ai): add AI-02 row for <artifact>`). Columns and wording as in HW03 (`../week03/CLAUDE.md`). Skill changes are `Artifact #Sn`.
- Prompt log: `prompt_log.md`, filled with the `logging-ai-prompts` skill at the end of each work session. The feature design files have no header table (student, 17/11): skip the skill's step that updates a `Prompt log entries` field.
- **Before submission** (student, 17/11): delete the Vietnamese copies (`*.vi.md` of the skills) and the course materials (the brief `HW04_Automation_Testing_*.md` / `.pdf`) from the repository and the zip, and remove the references to them (PLAN.md D5). Until then they stay as reading copies.
