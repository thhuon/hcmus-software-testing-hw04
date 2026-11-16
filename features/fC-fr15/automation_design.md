# fC – FR-15 Quản lý Sản phẩm (Product CRUD): automation design

| Field | Value |
| --- | --- |
| Requirement | FR-15 – `eshop-sut/README.md` lines 191–198 |
| Designed test cases | `../week02/features/fC-pool-C/02_domain_testing.md` (27 TC), `03_boundary_value_analysis.md` (9 TC) |
| Screens / URLs | Admin web – quản lý sản phẩm `http://localhost:5174` |
| Specs · page objects · data | `tests/fC-fr15/` · `pages/` · `data/fC-fr15/` |
| Count | Designed: 36 · Automated: 0 · Not automated: 0 · Assertion patterns: 0 |

## 1. Test cases selected (T1)

| TC ID | Technique | Partition / boundary | Input | Expected (quoted from the TC) | Automate? | Reason if not | Data row |
| --- | --- | --- | --- | --- | --- | --- | --- |

## 2. Locators and page objects (T2)

| Screen | Element | Locator | Why this locator |
| --- | --- | --- | --- |

Testability findings (elements without an accessible name, unstable text):

## 3. Test data (T3)

| File | Rows | Columns | Data reset / uniqueness |
| --- | --- | --- | --- |

Open expected values (`<CONFIRM>`):

## 4. Specs and assertion patterns (T4)

Prompt used for generation: see the AI-use log entry of this step.

| Spec | TC IDs | Assertion patterns |
| --- | --- | --- |

| Assertion pattern | Used by |
| --- | --- |

## 5. Review of the AI-generated scripts (T5)

| # | Spec › test | What the AI got wrong or missed | Category | Fix (commit) | Why the AI missed it | Cause type |
| --- | --- | --- | --- | --- | --- | --- |

Categories: fragile selector · weak assertion · wrong oracle · missing edge case · flaky wait · hidden dependency · hard-coded data. Cause types: Prompt · Model · Feature.

## 6. Runs (T6)

Official runs (`summarize-results.mjs --markdown`):

## 7. Not automated (T8)

| TC ID | Reason | Tested instead |
| --- | --- | --- |

## 8. Failures and bugs (T7)

| TC ID | Browsers failing | Assertion (expected vs received) | Verdict | Bug / issue |
| --- | --- | --- | --- | --- |
