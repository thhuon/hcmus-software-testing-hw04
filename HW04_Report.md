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

### 3.2 Review of the AI-generated scripts

<!-- From design §5: what the AI got wrong or missed, the fix, why (Prompt / Model / Feature). -->

### 3.3 Results

<!-- Per browser: passed / failed; failing tests and their bugs. -->

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
