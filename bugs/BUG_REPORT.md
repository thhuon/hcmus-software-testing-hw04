# HW04 – Bug Report (automated tests)

| Field | Value |
| --- | --- |
| SUT | EShop @ commit 85af3ba (`eshop-sut`) |
| Issue tracker | [angquoc/software-testing-2026-HW02-group](https://github.com/angquoc/software-testing-2026-HW02-group/issues) – rules: group README §4 (template, title, labels) and §6 (HW04: comment on HW02 issues, new issues with label `hw: HW04`) |
| Earlier bug reports matched | HW02 `bugs/BUG_REPORT.md` (BUG-01 … BUG-41 = issues #1 … #41) |
| Reporter | HỒ THÙY HƯƠNG – 23120046 |
| Count | Bugs: 0 · Confirmed: 0 · Changed: 0 · New: 0 |

## 1. Severity / priority scale

Copied from the group README §4.3 (first "yes" wins).

| Severity | Definition |
| --- | --- |
| Critical | Data exposed or lost, access beyond the role, or a main flow blocked (cannot register, log in, buy) |
| High | The system accepts wrong data or computes wrongly, and the user cannot avoid it |
| Medium | A business or validation rule is broken, but there is a workaround |
| Low | Only UI, wording or messages are wrong; no data impact |

| Priority | Definition (as HW02 `bugs/BUG_REPORT.md` §1) |
| --- | --- |
| High | Fix before the next release: blocks a main flow, money or security |
| Medium | Fix in the normal cycle |
| Low | Fix when convenient |

## 2. Overview

| Bug ID | Requirement | Title | Found by (spec › test, data row) | Browsers failing | Outcome | Tracker | Severity / Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |

Outcome: `Confirmed #n` (same behaviour as the existing issue) · `Changed #n` (behaviour differs; say how) · `New #n`.

## 3. Details

### BUG-01

| Field | Value |
| --- | --- |
| Title | |
| Requirement | <FR-xx> – "<verbatim>" (<file:line>) |
| Found by | `<spec>` › `<test title>` · data row `<id>` (`<data file>`) |
| Browsers | Chromium <v> ✗ · Firefox <v> ✗ · WebKit <v> ✗ |
| Preconditions | |
| Steps to reproduce | 1. … |
| Test data | |
| Expected | (from the requirement) |
| Actual | Assertion received `<value>` |
| Evidence | [screenshot](screenshots/<TC ID>_<browser>.png) · report `<reports/…/index.html>` |
| Outcome | Confirmed / Changed / New – <difference from the existing issue> |
| Tracker | <comment URL or issue link> |
| Severity / Priority | |
