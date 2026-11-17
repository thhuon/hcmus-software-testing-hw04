# fA – FR-03 Quên mật khẩu & Đặt lại mật khẩu (2 bước) – forgot & reset password: automation design

| Field | Value |
| --- | --- |
| Requirement | FR-03 – `eshop-sut/README.md` lines 46–60 |
| Designed test cases | `../week02/features/fA-pool-A/02_domain_testing.md` (34 TC), `03_boundary_value_analysis.md` (10 TC) |
| Screens / URLs | Web – Đăng nhập `http://localhost:5173/login` → Quên mật khẩu `http://localhost:5173/forgot-password` (Bước 1 email, Bước 2 OTP + mật khẩu mới) |
| Specs · page objects · data | `tests/fA-fr03/` · `pages/` · `data/fA-fr03/` |
| Count | Designed: 44 · Automated: 32 (proposed) · Not automated: 12 (proposed) · Assertion patterns: 0 |

## 1. Test cases selected (T1)

DT = domain testing (`02_domain_testing.md` §2.2), BVA = boundary value analysis (`03_boundary_value_analysis.md` §2.2). Data row: `web/<ID>` = row of the Web data file, `api/<ID>` = row of the API data file (both created in T3).

| TC ID | Technique | Partition / boundary | Input | Expected (quoted from the TC) | Automate? | Reason if not | Data row |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DT-01 | DT | EC-V1-1, V2-1 … V8-1, O1-1 … O5-2 (all valid, R6-1, R4-1) | `test@eshop.com`; new = confirm = `NewPass@2026` | 1. "Bước 1 / 2"; required fields marked `*` · 3. OTP of 6 digits on screen, Bước 2 opens, "Bước 2 / 2" · 4. three fields OTP, new password, confirm; accepted; password fields masked · 5. token · 6. refused | Yes | – | web/DT-01 |
| DT-02 | DT | EC-O1-2, O1-1 (OTP format, randomness) | three OTP requests for `test@eshop.com` | Each `resetToken` has exactly 6 digits (FR-03 "6 chữ số"); the three are not all equal (A17) | Yes (Web: three requests through Bước 1 and "← Quay lại"; HW02 ran it via API) | – | web/DT-02 |
| DT-03 | DT | EC-V6-2, O6-1 (back to login) | click "Quay lại đăng nhập" | 1. "Bước 1 / 2" · 2. the login page opens (FR-03 "Có nút **Quay lại đăng nhập**.") | Yes | – | web/DT-03 |
| DT-04 | DT | EC-V4-2 (valid + a character outside the set) | new = confirm = `NewPass@2026#` | 2. accepted · 3. token | Yes | – | web/DT-04 |
| DT-05 | DT | EC-V4-3 (new = current) | `fr03.same@example.com`; new = confirm = `Current@2026` | 2. accepted · 3. token | Yes (account registered through the API in setup) | – | web/DT-05 |
| DT-06 | DT | EC-V7-2 (OTP after a rejected attempt) | 1st `NewPass2026`, then the same OTP with `NewPass@2026` | 2. rejected, error above submit · 3. accepted: a rejected attempt does not use up the OTP · 4. token | Yes | – | web/DT-06 |
| DT-07 | DT | EC-V1-2 (email empty) | email `""` | 1. no OTP, stays on Bước 1; browser block or message | Yes | – | web/DT-07 |
| DT-08 | DT | EC-V1-3 (email format invalid) | email `test.eshop.com` | 1. no OTP, stays on Bước 1; browser block or message | Yes | – | web/DT-08 |
| DT-09 | DT | EC-V1-4 (email not registered) | email `noaccount.fr03@example.com` | 1. no OTP, stays on Bước 1; browser block or message | Yes | – | web/DT-09 |
| DT-10 | DT | EC-V1-5 (`email` missing) | body `{}` | error response, no `resetToken` | No | (proposed) API-only request shape: the Web always sends `email`, and an empty one is blocked by the browser (DT-07); passed in HW02 | – |
| DT-11 | DT | EC-V2-2 (OTP 3 digits) | OTP `482`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/DT-11 |
| DT-12 | DT | EC-V2-3 (OTP 9 digits) | OTP `482913123`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/DT-12 |
| DT-13 | DT | EC-V2-4 (OTP empty) | OTP `""`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/DT-13 |
| DT-14 | DT | EC-V2-5 (OTP 6 characters with a letter) | OTP `48291A`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/DT-14 |
| DT-15 | DT | EC-V2-6 (OTP 6 digits, not the issued one) | OTP `482914`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit (R2: FR-03 "OTP chỉ hợp lệ cho email đã yêu cầu") · 4. token: password unchanged | Yes | – | web/DT-15 |
| DT-16 | DT | EC-V2-7 (`resetToken` missing) | reset request without `resetToken` | 2. rejected · 3. token: password unchanged | No | (proposed) API-only request shape: the Web always sends `resetToken`, and an empty one is blocked by the browser (DT-13); passed in HW02 | – |
| DT-17 | DT | EC-V3-2 (OTP of another email) | OTP of `test@eshop.com` sent for `fr03.other@example.com` | 2. rejected (FR-03 "không thể dùng cho email khác.") · 3. token · 4. token: no password changed | Yes (API): the Web sends the email of Bước 1 and cannot pair an OTP with another email | – | api/DT-17 |
| DT-18 | DT | EC-V3-3 (OTP sent for an unregistered email) | OTP of `test@eshop.com` sent for `noaccount.fr03@example.com` | 2. rejected (R2) · 3. token: password unchanged | No | (proposed) API-only, and the same requirement sentence and oracle as DT-17 (automated); passed in HW02 | – |
| DT-19 | DT | EC-V3-4 (`email` missing at Bước 2) | reset request without `email` | 2. rejected (R2) · 3. token: password unchanged | No | (proposed) API-only request shape: the Web always sends the email of Bước 1; passed in HW02 | – |
| DT-20 | DT | EC-V4-4 (password too short) | new = confirm = `Ab1@x` | 2/3. rejected, error above submit (FR-01 "Tối thiểu 8 ký tự") · 4. token: password unchanged | Yes | – | web/DT-20 |
| DT-21 | DT | EC-V4-5 (password empty) | new = confirm = `""` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/DT-21 |
| DT-22 | DT | EC-V4-6 (no upper-case letter) | new = confirm = `newpass@2026` | 2/3. rejected, error above submit (FR-01 "1 chữ hoa") · 4. token: password unchanged | Yes | – | web/DT-22 |
| DT-23 | DT | EC-V4-7 (no lower-case letter) | new = confirm = `NEWPASS@2026` | 2/3. rejected, error above submit (FR-01 "1 chữ thường") · 4. token: password unchanged | Yes | – | web/DT-23 |
| DT-24 | DT | EC-V4-8 (no digit) | new = confirm = `NewPass@word` | 2/3. rejected, error above submit (FR-01 "1 chữ số") · 4. token: password unchanged | Yes | – | web/DT-24 |
| DT-25 | DT | EC-V4-9 (no special character) | new = confirm = `NewPass2026` | 2/3. rejected, error above submit (FR-01 "1 ký tự đặc biệt") · 4. token: password unchanged | Yes | – | web/DT-25 |
| DT-26 | DT | EC-V4-10 (special character only outside the set) | new = confirm = `NewPass#2026` | 2/3. rejected, error above submit (A10, Q7) · 4. token: password unchanged | Yes | – | web/DT-26 |
| DT-27 | DT | EC-V4-11 (`newPassword` missing) | reset request without `newPassword` | 2. rejected (A4) · 3. token: password unchanged | Yes (API): the Web always sends the field; HW02 BUG-08 (#8) | – | api/DT-27 |
| DT-28 | DT | EC-V5-2 (confirm differs) | new `NewPass@2026`; confirm `NewPass@2025` | 2. rejected, error above submit (FR-03 "Hai trường mật khẩu phải khớp nhau.") · 3. token: password unchanged | Yes | – | web/DT-28 |
| DT-29 | DT | EC-V5-3 (confirm empty) | new `NewPass@2026`; confirm `""` | 2. rejected, error above submit (FR-03 "Hai trường mật khẩu phải khớp nhau.") · 3. token: password unchanged | Yes | – | web/DT-29 |
| DT-30 | DT | EC-V5-4 (confirm differs in letter case) | new `NewPass@2026`; confirm `newPass@2026` | 2. rejected, error above submit (FR-03 "Hai trường mật khẩu phải khớp nhau.") · 3. token: password unchanged | Yes | – | web/DT-30 |
| DT-31 | DT | EC-V7-3 (OTP never requested) | `fr03.other@example.com` with OTP `123456` | 1. rejected (R3) · 2. token: password unchanged | No | (proposed) API-only: the Web always requests an OTP before Bước 2; passed in HW02 | – |
| DT-32 | DT | EC-V7-4 (OTP used twice) | same OTP with `NewPass@2026`, then `Again@2026x` | 2. accepted · 3. rejected (SEC-07 "vô hiệu hóa sau khi dùng") · 4. token · 5. refused | Yes (API): after a reset the Web goes to the login page and cannot send the OTP again | – | api/DT-32 |
| DT-33 | DT | EC-V7-5 (older OTP after a newer one) | OTP 1 after OTP 2 was issued | 3. rejected (A8: a Fail is reported as "differs from A8") · 4. token: password unchanged | No | (proposed) the oracle is assumption A8, not a requirement sentence; on the Web the password check runs before the OTP is sent; passed in HW02 | – |
| DT-34 | DT | EC-V8-2 (OTP expired) | OTP used after 660 s | 3. rejected (A7) · 4. token: password unchanged | No | (proposed) waits 11 minutes of real server time; the test cannot set the server clock; the limit is assumption A7 | – |
| BVA-01 | BVA | B1 LB−1 = UB−1 (OTP length) | OTP `48291` (5 digits) | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/BVA-01 |
| BVA-02 | BVA | B1 LB+1 = UB+1 (OTP length) | OTP `4829131` (7 digits) | 2/3. rejected, error above submit · 4. token: password unchanged | Yes | – | web/BVA-02 |
| BVA-03 | BVA | B2 LB−1 (password length) | `NewP@26` (7 characters) | 2/3. rejected, error above submit (FR-01 "Tối thiểu 8 ký tự") · 4. token: password unchanged | Yes | – | web/BVA-03 |
| BVA-04 | BVA | B2 LB | `NewP@202` (8 characters) | 2. accepted (FR-01 "Tối thiểu 8 ký tự") · 3. token | Yes | – | web/BVA-04 |
| BVA-05 | BVA | B2 LB+1 | `NewP@2026` (9 characters) | 2. accepted (FR-01 "Tối thiểu 8 ký tự") · 3. token | Yes | – | web/BVA-05 |
| BVA-06 | BVA | B3 LB (OTP age) | 0 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | (proposed) duplicate of DT-01 / DT-04: every Web test uses its OTP within seconds of the request (same partition EC-V8-1, same oracle) | – |
| BVA-07 | BVA | B3 LB+1 | 1 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | (proposed) duplicate of DT-01 / DT-04 (same partition and oracle); an exact 1 s gap needs a fixed sleep | – |
| BVA-08 | BVA | B3 UB−1 | 599 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | (proposed) waits 10 minutes of real server time; the test cannot set the server clock | – |
| BVA-09 | BVA | B3 UB | 600 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | (proposed) waits 10 minutes of real server time; the test cannot set the server clock | – |
| BVA-10 | BVA | B3 UB+1 | 601 s after issue | 3. rejected (A7, Q3) · 4. token: password unchanged | No | (proposed) waits 10 minutes of real server time; the test cannot set the server clock; the limit is assumption A7 | – |

**Selection count (proposed):** 44 designed · 32 automated (29 Web, 3 API: DT-17, DT-27, DT-32) · 12 not automated. Valid: DT-01, 04, 05, 06, BVA-04, 05 · invalid: 21 DT · boundary: BVA-01 … 05.

**Notes for T2–T4** (from the Web page `frontend-web/src/pages/ForgotPassword.jsx`, read to judge what a Web test can observe):

- Errors and the success message come in browser dialogs (`alert`), not on the page (HW02 BUG-09): the specs must read the dialog text.
- Bước 2 checks the new password in the browser before it sends the OTP, with a pattern that needs a space and forbids every special character (HW02 BUG-01). With a valid password the OTP is never sent, so the Web alone cannot test the OTP rule (Decision 2).
- The email field is `type="text"` (HW02 BUG-10); there is no confirm field (BUG-04), no step indicator (BUG-06), no "Quay lại đăng nhập" button (BUG-11).

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
