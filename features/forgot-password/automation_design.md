# FR-03 Quên mật khẩu & Đặt lại mật khẩu (2 bước) – forgot & reset password: automation design

| Field | Value |
| --- | --- |
| Requirement | FR-03 – `eshop-sut/README.md` lines 46–60 |
| Designed test cases | `../week02/features/fA-pool-A/02_domain_testing.md` (34 TC), `03_boundary_value_analysis.md` (10 TC); DT-35 added in HW04 (§1) |
| Screens / URLs | Web – Đăng nhập `http://localhost:5173/login` → Quên mật khẩu `http://localhost:5173/forgot-password` (Bước 1 email, Bước 2 OTP + mật khẩu mới) |
| Specs · page objects · API client · data | `tests/forgot-password/` · `page-objects/` · `api/` · `data/forgot-password/` |
| Count | Designed: 44 + 1 added in HW04 (DT-35) · Automated: 33 · Not automated: 12 · Assertion patterns: 8 |
| Prompt log entries | Prompt006, Prompt008 (T1) · Prompt009 – Prompt013 (T2) · Prompt012, Prompt013 (T3) · Prompt014, Prompt015 (T4) · Prompt015 (T5) |

## 1. Test cases selected (T1)

DT = domain testing (`02_domain_testing.md` §2.2), BVA = boundary value analysis (`03_boundary_value_analysis.md` §2.2). Data row: `web/<ID>` = row of the Web data file, `api/<ID>` = row of the API data file (both created in T3). Expected: the TC's own words and step numbers; left out are the API-fallback steps (2b, 3b, 4b), the source codes (A#, Q#, R#, FR-22) and DT-01's "screen recorded (Q8)". Full text in the HW02 files.

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
| DT-10 | DT | EC-V1-5 (`email` missing) | body `{}` | error response, no `resetToken` | No | API-only request shape: the Web always sends `email`, and an empty one is blocked by the browser (DT-07); passed in HW02 | – |
| DT-11 | DT | EC-V2-2 (OTP 3 digits) | OTP `482`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/DT-11 |
| DT-12 | DT | EC-V2-3 (OTP 9 digits) | OTP `482913123`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/DT-12 |
| DT-13 | DT | EC-V2-4 (OTP empty) | OTP `""`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/DT-13 |
| DT-14 | DT | EC-V2-5 (OTP 6 characters with a letter) | OTP `48291A`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/DT-14 |
| DT-15 | DT | EC-V2-6 (OTP 6 digits, not the issued one) | OTP `482914`; new = confirm = `NewPass@2026` | 2/3. rejected, error above submit (R2: FR-03 "OTP chỉ hợp lệ cho email đã yêu cầu") · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/DT-15 |
| DT-16 | DT | EC-V2-7 (`resetToken` missing) | reset request without `resetToken` | 2. rejected · 3. token: password unchanged | No | API-only request shape: the Web always sends `resetToken`, and an empty one is blocked by the browser (DT-13); passed in HW02 | – |
| DT-17 | DT | EC-V3-2 (OTP of another email) | OTP of `test@eshop.com` sent for `fr03.other@example.com` | 2. rejected (FR-03 "không thể dùng cho email khác.") · 3. token · 4. token: no password changed | Yes (API): the Web sends the email of Bước 1 and cannot pair an OTP with another email | – | api/DT-17 |
| DT-18 | DT | EC-V3-3 (OTP sent for an unregistered email) | OTP of `test@eshop.com` sent for `noaccount.fr03@example.com` | 2. rejected (R2) · 3. token: password unchanged | No | API-only, and the same requirement sentence and oracle as DT-17 (automated); passed in HW02 | – |
| DT-19 | DT | EC-V3-4 (`email` missing at Bước 2) | reset request without `email` | 2. rejected (R2) · 3. token: password unchanged | No | API-only request shape: the Web always sends the email of Bước 1; passed in HW02 | – |
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
| DT-31 | DT | EC-V7-3 (OTP never requested) | `fr03.other@example.com` with OTP `123456` | 1. rejected (R3) · 2. token: password unchanged | No | API-only: the Web always requests an OTP before Bước 2; passed in HW02 | – |
| DT-32 | DT | EC-V7-4 (OTP used twice) | same OTP with `NewPass@2026`, then `Again@2026x` | 2. accepted · 3. rejected (SEC-07 "vô hiệu hóa sau khi dùng") · 4. token · 5. refused | Yes (API): after a reset the Web goes to the login page and cannot send the OTP again | – | api/DT-32 |
| DT-33 | DT | EC-V7-5 (older OTP after a newer one) | OTP 1 after OTP 2 was issued | 3. rejected (A8: a Fail is reported as "differs from A8") · 4. token: password unchanged | No | the oracle is assumption A8, not a requirement sentence; on the Web the password check runs before the OTP is sent; passed in HW02 | – |
| DT-34 | DT | EC-V8-2 (OTP expired) | OTP used after 660 s | 3. rejected (A7) · 4. token: password unchanged | No | waits 11 minutes of real server time; the test cannot set the server clock; the limit is assumption A7 | – |
| DT-35 | DT | EC-V4-10 (special character only outside the set: a space) | new = confirm = `NewPass 2026` | 2/3. rejected, error above submit (A10, Q7) · 4. token: password unchanged | Yes (added in HW04, student 17/11: A10 names the space; the Web check refuses DT-26's `#` but lets a space through) | – | web/DT-35 |
| BVA-01 | BVA | B1 LB−1 = UB−1 (OTP length) | OTP `48291` (5 digits) | 2/3. rejected, error above submit · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/BVA-01 |
| BVA-02 | BVA | B1 LB+1 = UB+1 (OTP length) | OTP `4829131` (7 digits) | 2/3. rejected, error above submit · 4. token: password unchanged | Yes (Web + API: the Web part, then the same OTP is sent to `/api/reset-password`) | – | web/BVA-02 |
| BVA-03 | BVA | B2 LB−1 (password length) | `NewP@26` (7 characters) | 2/3. rejected, error above submit (FR-01 "Tối thiểu 8 ký tự") · 4. token: password unchanged | Yes | – | web/BVA-03 |
| BVA-04 | BVA | B2 LB | `NewP@202` (8 characters) | 2. accepted (FR-01 "Tối thiểu 8 ký tự") · 3. token | Yes | – | web/BVA-04 |
| BVA-05 | BVA | B2 LB+1 | `NewP@2026` (9 characters) | 2. accepted (FR-01 "Tối thiểu 8 ký tự") · 3. token | Yes | – | web/BVA-05 |
| BVA-06 | BVA | B3 LB (OTP age) | 0 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | duplicate of DT-01 / DT-04: every Web test uses its OTP within seconds of the request (same partition EC-V8-1, same oracle) | – |
| BVA-07 | BVA | B3 LB+1 | 1 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | duplicate of DT-01 / DT-04 (same partition and oracle); an exact 1 s gap needs a fixed sleep | – |
| BVA-08 | BVA | B3 UB−1 | 599 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | waits 10 minutes of real server time; the test cannot set the server clock | – |
| BVA-09 | BVA | B3 UB | 600 s after issue | 3. accepted; a rejection is recorded, not judged · 4. token | No | waits 10 minutes of real server time; the test cannot set the server clock | – |
| BVA-10 | BVA | B3 UB+1 | 601 s after issue | 3. rejected (A7, Q3) · 4. token: password unchanged | No | waits 10 minutes of real server time; the test cannot set the server clock; the limit is assumption A7 | – |

**Selection count (confirmed by the student, 17/11):** 45 test cases (44 from HW02 + DT-35 added in HW04) · 33 automated (30 Web, 7 of them also through the API; 3 API only: DT-17, DT-27, DT-32) · 12 not automated. Valid: DT-01, 04, 05, 06, BVA-04, 05 · invalid: 22 DT · boundary: BVA-01 … 05.

**Student decisions (17/11):** API-only TCs: only DT-17, DT-27, DT-32 · OTP TCs (DT-11 … 15, BVA-01, 02): Web part, then the same OTP through the API · DT-28 … 30 automated although the confirm field is missing (BUG-04) · DT-35 added. DT-35 is a new ID, not `DT-26b`: the test-case ID pattern of the summary script would count `DT-26b` as DT-26.

**Notes for T2–T4** (from the Web page `frontend-web/src/pages/ForgotPassword.jsx`, read to judge what a Web test can observe):

- Errors and the success message come in browser dialogs (`alert`), not on the page (HW02 BUG-09): the specs must read the dialog text.
- Bước 2 checks the new password in the browser before it sends the OTP, with a pattern that needs a space and forbids every special character (HW02 BUG-01). With a valid password the OTP is never sent, so the Web alone cannot test the OTP rule; the OTP TCs also send the OTP through the API (student decision).
- The email field is `type="text"` (HW02 BUG-10); there is no confirm field (BUG-04), no step indicator (BUG-06), no "Quay lại đăng nhập" button (BUG-11).

## 2. Locators and page objects (T2)

**How the locators were found:** ARIA snapshot (`page.locator('body').ariaSnapshot()`) of each screen of the running Web app (`npm run sut`), then every locator counted on the live page on Chromium, Firefox and WebKit (1 match each; 0 for the elements FR-03 names but the app lacks). Codegen by the student: see "Codegen check" at the end of this section.

Page objects: `page-objects/LoginPage.ts`, `page-objects/ForgotPasswordPage.ts`; API client (setup, `Yes (API)` rows, "password unchanged" checks): `api/EshopApi.ts`. No `expect` in `page-objects/` or `api/`.

| Screen | Element | Locator | Why this locator |
| --- | --- | --- | --- |
| Đăng nhập `/login` | "Quên mật khẩu?" link | `getByRole('link', { name: 'Quên mật khẩu?' })` | Role + accessible name |
| Đăng nhập | "Sign In" button | `getByRole('button', { name: 'Sign In' })` | Role + name; used to recognise that the login page is open (DT-03). The heading reads "Đăng Ký", so it cannot be used |
| Quên mật khẩu (both steps) | Page heading | `getByRole('heading', { name: 'Quên Mật Khẩu' })` | Role + name |
| Quên mật khẩu | Form of the current step | `getByRole('main').locator('form')` | The form has no accessible name, so it has no `form` role; one form per step. Fallback: CSS tag inside the `main` landmark |
| Quên mật khẩu | Step indicator "Bước 1 / 2", "Bước 2 / 2" | `getByText(/Bước\s*[12]\s*\/\s*2/)` | Text named by FR-03 ("Bước 1 / 2"). 0 matches today (HW02 BUG-06) |
| Quên mật khẩu | "Quay lại đăng nhập" | `getByRole('button', { name: 'Quay lại đăng nhập' }).or(getByRole('link', …))` | Name from FR-03; button or link, both accepted. 0 matches today (HW02 BUG-11) |
| Bước 1 | Email field | `form.locator('div').filter({ has: locator('label').filter({ hasText: /^Nhập Email/ }) }).getByRole('textbox')` | No accessible name (label not linked). The textbox in the block whose label starts with "Nhập Email" (option (b), label prefix; student decision 17/11 after the options and the codegen check below). Still found when a `*` is added to the label (BUG-07). The field is `type="text"`, not `type="email"` (HW02 BUG-10) |
| Bước 1 | "Lấy mã OTP" button | `getByRole('button', { name: 'Lấy mã OTP' })` | Role + name |
| Bước 2 | OTP message "Mã OTP của bạn là: …" | `getByText(/^Mã OTP của bạn là:/)` | Fixed prefix of the message; the code itself changes per request. `readOtp()` returns the text after the colon without assuming a length |
| Bước 2 | OTP field | `form.locator('div').filter({ has: locator('label').filter({ hasText: /^Mã OTP/ }) }).getByRole('textbox')` | No accessible name. Prefix only: the rest of the label, "(4 số)", states the wrong length (HW02 BUG-03) and would break an exact match when fixed |
| Bước 2 | "Mật khẩu mới" field | `form.locator('div').filter({ has: locator('label').filter({ hasText: /^Mật khẩu mới/ }) }).getByRole('textbox')` | No accessible name. Names the field, so a confirmation field (label "Xác nhận mật khẩu mới") added later is not matched |
| Bước 2 | "Xác nhận mật khẩu mới" field | `form.locator('div').filter({ has: locator('label').filter({ hasText: /^Xác nhận mật khẩu mới/ }) }).getByRole('textbox')` | Label text from FR-03 ("**Xác nhận mật khẩu mới**"); same pattern as the other fields, so it is found whether or not the label is linked. 0 matches today (HW02 BUG-04): `resetPassword(otp, pw, confirm)` then fails on this field |
| Bước 2 | "Đặt lại mật khẩu" button | `getByRole('button', { name: 'Đặt lại mật khẩu' })` | Role + name |
| Bước 2 | "← Quay lại" button | `getByRole('button', { name: '← Quay lại' })` | Role + name; goes back to Bước 1 (used by DT-02 to ask for several OTPs) |
| Both steps | Error / success messages | `page.on('dialog')` → `dialogMessages[]` | Every message is a browser `alert` (HW02 BUG-09), not an element; the page object records the text and accepts the dialog |

Testability findings (elements without an accessible name, unstable text):

- **No input has an accessible name** on Đăng nhập, Bước 1 and Bước 2: the `<label>` elements have no `for` and do not wrap the input, so `getByRole(…, { name })` and `getByLabel` find nothing and screen readers read "edit text" only (WCAG 2.2 SC 1.3.1, 4.1.2). FR-22 has no sentence about linked labels. Every field is still found by another option (table below), so no field is unreachable. Student decision 17/11: recorded here as a testability finding only; no issue and no comment (no requirement oracle).
- **Messages in `alert` dialogs** (HW02 BUG-09): they cannot be located or read by assistive technology inside the page; the tests read them through the `dialog` event.
- **Wrong heading on Đăng nhập**: "Đăng Ký" (register) on the login page. Outside FR-03 (login page, FR-02); already filed by the group as #95.
- **Timing seen in the check:** on Firefox and WebKit the forgot-password page was not rendered yet right after the link click (counts 0); after waiting for the heading every locator matched. The specs must start each step with a web-first assertion (e.g. the heading is visible) before acting.

**Locator options tried for the fields without an accessible name** (student 17/11: try every option, keep the ones that work). Live UI, match counts identical on Chromium, Firefox and WebKit; a count of 1 was checked to be the input next to the label. The Đăng nhập fields are not used by FR-03; they show where option (a) fails.

| Option | Đăng nhập "Username" | Đăng nhập "Mật khẩu" | Bước 1 Email | Bước 2 OTP | Bước 2 "Mật khẩu mới" |
| --- | --- | --- | --- | --- | --- |
| `getByRole('textbox', { name: <label> })` | 0 | 0 | 0 | 0 | 0 |
| `getByLabel(<label>)` | 0 | 0 | 0 | 0 | 0 |
| `getByPlaceholder` / `getByTestId` / `id` / `name` | 0 (no such attribute in the DOM) | 0 | 0 | 0 | 0 |
| (b) block of the label: `label:text-is(<label>) + input`, or `div` filtered by the label text → textbox | 1 | 1 | 1 | 1 | 1 |
| (a) role / type inside the form | 2 (both inputs are `type="text"`) | 2 | 1 | 1 with `input[type="text"]`; 2 with `getByRole('textbox')` (Playwright counts the password input as a textbox) | 1 |
| Layout `input:below(label:text-is(<label>))` | 2 | 1 | 1 | 2 | 1 |
| XPath `following-sibling` | not tried: XPath is not allowed (skill T2) | | | | |

Result: (a) and (b) both find every FR-03 field today. Pros and cons (prompt 18:53 17/11): (a) survives a changed label text but breaks when a second input of the same type is added (confirm field, BUG-04); (b) names the intended field and survives an added input, but an exact label match breaks when the label text changes (BUG-03, BUG-07 fixes) and both (b) variants break when label and input leave their common `div`. **Student decision 17/11: (b) with a label prefix only** (replaces the earlier `(a).or(b)`), matching the codegen conclusion below; checked: 1 match per field, fill works, on 3 browsers. Login defects seen on the way are already filed by the group: #92 (password `type="text"`), #93 (email `type="text"`), #95 (heading "Đăng Ký", label "Username", no `*`).

**Codegen check (student, by hand).** `npm run sut`, then `npm run codegen`; record Đăng nhập → "Quên mật khẩu?" → Bước 1 (type an email, "Lấy mã OTP") → Bước 2 (type OTP and password, "Đặt lại mật khẩu", "← Quay lại"). Date / browser: 17/11/26 - Firefox.

| Element | Locator codegen picked (copied from the codegen window) | Same as the table above? | If not: which is better, and why (one line) |
| --- | --- | --- | --- |
| "Quên mật khẩu?" link | `page.getByRole('link', { name: 'Quên mật khẩu?' })` | Yes | |
| Bước 1 Email field | `page.getByRole('textbox')` | No | A more specific locator using the email field's label or placeholder is better because it avoids ambiguity. |
| "Lấy mã OTP" button | Not captured in codegen | No | A role-based locator with the button's accessible name would be preferable. |
| Bước 2 OTP field | `page.locator('input[type="text"]')` | No | A locator using a specific label or placeholder is better because `input[type="text"]` may match multiple fields. |
| Bước 2 "Mật khẩu mới" field | `page.locator('input[type="password"]')` | No | A locator using a specific label or placeholder is better because it identifies the intended password field more clearly. |
| "Đặt lại mật khẩu" button | `page.getByRole('button', { name: 'Đặt lại mật khẩu' })` | Yes | |
| "← Quay lại" button | `page.getByRole('button', { name: '← Quay lại' })` | Yes | |

Conclusion (one sentence, student): The Codegen-generated locators can identify UI elements, but some generic locators should be replaced with more specific and reliable locators to improve test stability and maintainability.

## 3. Test data (T3)

Inputs are the HW02 test-case values (§1); expected values come from FR-03, FR-01, FR-22, SEC-07, the API spec and the HW02 assumptions A1–A17 (`../week02/features/fA-pool-A/01_test_basis.md`), never from the running app. Message wording is not asserted: the requirement gives none, and A1 / A5 / A6 say it is recorded, not judged.

| File | Rows | Columns | Data reset / uniqueness |
| --- | --- | --- | --- |
| `data/forgot-password/web.json` | 30 (`web/<ID>` of §1) | `id`, `technique`, `title`, `partition`, `flow` (which spec flow runs the row: `reset`, `otpFormat`, `backToLogin`, `retryAfterError`, `requestOnly`, `otpWebThenApi`), inputs `account` (password of the account created for the test), `email` (`null` = that account), `otp` (`"issued"` = the OTP shown on Bước 2, or a fixed value), `newPassword`, `confirm`; `expected` (`kind`: `success` / `error` / `blocked`, plus the checks of the TC: `errorAboveSubmit`, `oldPasswordLogsIn`, `newPasswordLogsIn`, `apiRejected`, `stepIndicator`, `otpPattern`, …); `source` | Every row with an `account` registers its own account through the API before the test: e-mail `fr03.{id}.{run}@example.com` (`{run}` = start time of the run + browser, e.g. `20261117t190312.chromium`, because one command may run the three browsers against the same database), so no two tests, browsers or runs share an account. The seed account `test@eshop.com` is not used, so no test has to restore its password (HW02 fixture F8 no longer needed). Official runs also start fresh servers (database re-seeded) |
| `data/forgot-password/api.json` | 3 (`api/<ID>`: DT-17, DT-27, DT-32) | `id`, `technique`, `title`, `partition`, `flow`, `accounts` (`owner`, `other` with their passwords), `request` (whose OTP, for which e-mail, new passwords, omitted field), `expected` (`reset` / `firstReset` / `secondReset`: `accepted` / `rejected`; which logins succeed), `source`; file-level `statusMeaning` | Same rule: `fr03.{id}.{role}.{run}@example.com` per account |

Changes against the HW02 inputs (student 17/11): the registered e-mail is a new account per test instead of `test@eshop.com` (same partition EC-V1-1 "registered email"; keeps the tests independent), and DT-05's account is created with `Current@2026` (HW02 fixture F3). DT-17's second account uses the F2 password `Other@2026x`.

**Confirm field (student 17/11):** the app has no "Xác nhận mật khẩu mới" field (HW02 BUG-04), while the HW02 test cases fill it in every Bước 2 row. `fillConfirm` is `true` only where the test case checks the field itself: DT-01 (the form has the three fields) and DT-28 … 30 (the two passwords must match); these fail on BUG-04. In the other Bước 2 rows the spec fills OTP and new password only, so each test fails only for the rule it checks; `confirm` stays in the data as the TC value.

How a new account is made: before each test the spec calls `POST /api/register` (API spec §1.1; `api/EshopApi.ts` `register(name, email, password)`) with the row's e-mail pattern and `account.password`, the same call as HW02 fixtures F2 / F3. The backend checks only that the e-mail is not taken, so a new e-mail per test and run always registers. Tried on the running SUT (17/11 19:03): `fr03.demo.20261117t1903@example.com` → 200 "User registered successfully"; login with `Test1234!` → 200 with `token`; forgot-password → 200 with `resetToken` "4326". These accounts live only until the next server start (database re-seeded).

Expected values confirmed by the student (17/11; were `<CONFIRM>`):

1. **DT-03 login page**: FR-03 gives no URL; the login page is recognised by its "Sign In" button (as in T2) and the path `/login` (path of the app's "Đăng nhập" link, not in the SRS) → `web.json` DT-03 `loginPath`, `loginPageButton`.
2. **API status** (`api.json` `statusMeaning`): the API spec gives `200` only for login and forgot-password; accepted = `200`, rejected = any `4xx`. The login checks (A5 / A6) stay the main oracle, so a wrong status alone is not reported as a defect.

No `<CONFIRM>` left.

## 4. Specs and assertion patterns (T4)

Prompt used for generation: see the AI-use log entry of this step (Web spec: Prompt014; API spec: Prompt015; one prompt per spec file).

The spec reads `data/forgot-password/web.json` and makes one test per row, title `<TC ID> – <title>`, grouped by the row's `flow`. Generated as is, not run yet (T5 runs and reviews it); checked only with `npx playwright test tests/forgot-password --list`: 30 tests per browser, 90 in all.

| Spec | TC IDs | Assertion patterns |
| --- | --- | --- |
| `tests/forgot-password/web.spec.ts` › flow `reset` | DT-01, 04, 05, 20 … 26, 28, 29, 30, 35, BVA-03, 04, 05 | Persisted outcome; Soft (FR-22 error above submit, and DT-01's form checks); Text (DT-01 step indicator, `*`); Element state (DT-01 fields visible, `type="password"`); Value format (DT-01 OTP) |
| › flow `otpFormat` | DT-02 | Value format (each OTP `^\d{6}$`, soft); distinct values (A17) |
| › flow `backToLogin` | DT-03 | Text (step indicator, soft); URL / navigation (`/login`); Element state ("Sign In" visible) |
| › flow `retryAfterError` | DT-06 | Soft (error above submit); Persisted outcome (rejected password refused, then the new one logs in, the old one refused) |
| › flow `requestOnly` | DT-07, 08, 09 | Negative (no OTP message, no Bước 2 button); Element state ("Lấy mã OTP" still visible) |
| › flow `otpWebThenApi` | DT-11 … 15, BVA-01, 02 | Soft (error above submit); Response (API reset `4xx`); Persisted outcome (old password logs in, new one refused) |
| `tests/forgot-password/api.spec.ts` (Prompt015) | DT-17, DT-27, DT-32 | Response (status class `200` / `4xx` of forgot-password and reset; `resetToken` present); Persisted outcome (logins of owner / other account, new and second password) |

| Assertion pattern | Used by |
| --- | --- |
| Persisted outcome: login through the API with old / new password (`expect.poll`, `200` / `4xx`; A5, A6) | every row with an account except DT-02: 25 Web tests; DT-17, DT-27, DT-32 |
| Soft assertions (`expect.soft`): several checks of one result, the test goes on to the stored-password check | DT-01, 02, 03, 06, every `error` row (FR-22 `[role="alert"]` above `button[type="submit"]`) |
| Visible text (`toHaveText`, `toContainText`) | DT-01, DT-03 |
| Element state (`toBeVisible`, `toHaveAttribute`) | DT-01, DT-03, DT-07 … 09 |
| Value format (`toMatch` a pattern from the data, distinct values) | DT-01, DT-02 |
| URL / navigation (`toHaveURL`) | DT-03 |
| Negative (`not.toBeVisible`) | DT-07 … 09 |
| Response (status of the API reset) | DT-11 … 15, BVA-01, 02, DT-17, DT-27, DT-32 |

Page object additions made with the spec: `emailLabel` (for the `*` check) and `backToLogin()` in `page-objects/ForgotPasswordPage.ts`.

## 5. Review of the AI-generated scripts (T5)

**First run on Chromium** (development run, 17/11 ≈ 19:30, servers already running, report in a private folder because another session shares `playwright-report/`): `npx playwright test tests/forgot-password --project=chromium` → 33 tests, **6 passed, 27 failed** (5.4 min). The 6 passing tests (DT-05, 07, 08, 09, 17, 32) passed 18/18 with `--repeat-each=3`.

Why each test failed (proposed verdicts for T7; the dialog text is recorded as an annotation, not judged):

| Failing check | Tests | Seen | Proposed verdict |
| --- | --- | --- | --- |
| FR-22 error above the submit button | DT-06, 11 … 15, 20 … 26, 35, BVA-01 … 03 (17) | no element in the page; the message comes in a dialog, e.g. "Mật khẩu quá yếu! …" | product defect, HW02 BUG-09 (#9) |
| New password does not log in (A5) | DT-04, 06, BVA-04, 05 | dialog "Mật khẩu quá yếu! …" for a valid password | product defect, HW02 BUG-01 (#1) |
| Old password no longer logs in (A6) | DT-35 | dialog "Đổi mật khẩu thành công!": the Web accepts `NewPass 2026` (space, no allowed special character) and changes the password | product defect, **new** (DT-35, HW04) |
| Confirm field: fill waits for the 30 s test timeout | DT-01 (soft check too), 28, 29, 30 | field missing | product defect, HW02 BUG-04 (#4) |
| OTP `^\d{6}$` | DT-01, DT-02 | `6022`, `3693` (4 digits) | product defect, HW02 BUG-03 (#3) |
| Step indicator "Bước 1 / 2", "Bước 2 / 2" | DT-01, DT-03 | element not found | product defect, HW02 BUG-06 (#6) |
| `*` on the email label | DT-01 | "Nhập Email của bạn" | product defect, HW02 BUG-07 (#7) |
| "Quay lại đăng nhập": click waits for the test timeout | DT-03 | button missing | product defect, HW02 BUG-11 (#11) |
| API reset without `newPassword` rejected | DT-27 | `200` "Password reset successfully" | product defect, HW02 BUG-08 (#8) |

Review of the generated specs (all seven categories, both specs). Fixes as proposed, decided by the student 17/11; cause types confirmed by the student.

| # | Spec › test | What the AI got wrong or missed | Category | Fix (commit) | Why the AI missed it | Cause type |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `web.spec.ts` › DT-05 | **False pass.** The Web refused the reset (dialog "Mật khẩu quá yếu! …", BUG-01), but the test passed: with new = current password, "the new password logs in" is true whether or not the reset happened | weak assertion | After the login checks of every `success` row (`otpUsedUp` in the data, source SEC-07 "vô hiệu hóa sau khi dùng"), the same OTP is sent to the API and must be refused (`4xx`): an accepted Web reset uses it up. DT-05 now fails (`200`: the OTP was never used, BUG-01) (eb9d9d8) | The same A5 login check was applied to every success row without asking whether it can tell the two outcomes apart for this row | Model |
| 2 | `web.spec.ts` › every `error` row (`expectErrorAboveSubmit`) | `[role="alert"]` is stricter than FR-22, which asks only that the message appears above the submit button; an inline message without `role="alert"` would fail although it meets FR-22 | wrong oracle | `errorAboveSubmit` in the page object: any visible text element of the form above `button[type="submit"]` that holds no other element, except labels, the OTP message and a step indicator; no role or wording assumed. Checked on the live page: 0 matches today, 1 for an inline error injected above the button, none for one below it (e2a210a) | The model added the accessible-error convention (`role="alert"`) to the requirement | Model |
| 3 | `web.spec.ts` › DT-01, 28, 29, 30, DT-03 | No assertion before acting on an element the app may lack: `fill` / `click` waits for the 30 s test timeout and the report says "Test timeout", not which FR-03 element is missing | weak assertion | `await expect(field, 'confirm field "Xác nhận mật khẩu mới" (FR-03)').toBeVisible()` before the fill (only when `fillConfirm`) and the same for "Quay lại đăng nhập" before the click: DT-28 now fails in 5.5 s with the FR-03 name (63f8508) | The page object's action was trusted to fail clearly | Model |

**Run after the fixes** (Chromium, 17/11 ≈ 19:55, private report folder): 33 tests, **5 passed, 28 failed** (3.4 min, was 5.4 min). DT-05 moved from pass to fail (BUG-01, finding 1); every other failure is the same check as in the table above. The 5 passing tests (DT-07, 08, 09, 17, 32) passed 15/15 with `--repeat-each=3`. Debugging tool used: the failure screenshots and the error trace of the list reporter; the trace viewer is for the student in T7 (`npm run trace -- <trace.zip>`).

No issue found:

- **Flaky wait**: no `waitForTimeout`; logins use `expect.poll`. The `requestOnly` negatives (DT-07 … 09) right after the click were suspected of passing before the server answers; checked by running the same steps with a registered e-mail: the assertions failed 3/3 (the OTP was caught), so they do detect the wrong outcome. `--repeat-each=3` stable.
- **Fragile selector**: role + name, label prefix, `[role="alert"]` (see 2); no XPath, `nth`, generated classes.
- **Missing edge case**: all 33 automated rows of §1 run (30 Web + 3 API).
- **Hidden dependency**: every test registers its own account; order does not matter.
- **Hard-coded data**: inputs and expected values come from the data files; the spec holds only the account display name `FR03 <id>`.
- `api.spec.ts`: no issue in any category; DT-17 and DT-32 pass, DT-27 fails on BUG-08.

Categories: fragile selector · weak assertion · wrong oracle · missing edge case · flaky wait · hidden dependency · hard-coded data. Cause types: Prompt · Model · Feature.

## 6. Runs (T6)

**Official runs** (second set, 17/11/2026 20:08–20:20, `node skills/test-automation/scripts/run-browsers.mjs --config automation.config.json forgot-password --browsers <browser> --reuse`, one browser after the other). They replace the first set of 19:47–19:59 (commit 4ec4bf5, same results), which the student had rerun because of the environment error below.

- **Frozen specs:** `tests/forgot-password/` at commit 63f8508 (last spec change, after the T5 fixes). Run settings at 45800c0: own output folder per run, failure screenshots copied per TC, no traces. Reports committed as the tool wrote them.
- **SUT and data:** the servers already running (`--reuse`), because the student's servers were also in use by the parallel FR-08 session; the database was not re-seeded. Clean data comes from the test data: every test registers its own account named after the TC, the run's start time and the browser (§3), and no test reads data that an earlier test or run left.
- **Settings:** `retries: 0`, `workers: 1`; screenshot on failure; **no traces** (student 17/11: the brief asks for the HTML report with "Run by" and an ISO timestamp, §6 Task 1 / §11, and a screenshot per bug, not for traces; traces made the reports 10–25 MB per browser, now 2.9–5.9 MB). Development runs still keep traces for the trace viewer.
- **Reports:** `reports/forgot-password/<browser>/index.html` + `results.json`. Title checked in a browser on all three: "HW04 · FR-03 Forgot & reset password · <browser> · Run by: 23120046 · <ISO start time>" (chromium `2026-11-17T13:08:54.601Z`, firefox `…13:12:16.037Z`, webkit `…13:16:33.549Z`).
- **Screenshots:** `reports/forgot-password/<browser>/screenshots/<TC ID>.png`, one per failed Web test (27 per browser), copied by the run script from the run's own output; they show the page when the test ended (the dialog texts are in the report's `dialog` annotations). DT-27 is an API test with no page: its evidence is the report entry, captured as `features/forgot-password/screenshots/DT-27-<browser>-report.png`.

Script output (`summarize-results.mjs --markdown`, FR-03 rows):

**Runs**

| feature | browser | started | tests | passed | failed | flaky | skipped |
| --- | --- | --- | --- | --- | --- | --- | --- |
| forgot-password | chromium | 2026-11-17T13:08:54.606Z | 33 | 5 | 28 | 0 | 0 |
| forgot-password | firefox | 2026-11-17T13:12:16.041Z | 33 | 5 | 28 | 0 | 0 |
| forgot-password | webkit | 2026-11-17T13:16:33.554Z | 33 | 5 | 28 | 0 | 0 |

**Test cases (across browsers)**

| feature | id | chromium | firefox | webkit | result |
| --- | --- | --- | --- | --- | --- |
| forgot-password | DT-17 | passed | passed | passed | passed |
| forgot-password | DT-27 | failed | failed | failed | failed |
| forgot-password | DT-32 | passed | passed | passed | passed |
| forgot-password | DT-01 | failed | failed | failed | failed |
| forgot-password | DT-04 | failed | failed | failed | failed |
| forgot-password | DT-05 | failed | failed | failed | failed |
| forgot-password | DT-20 | failed | failed | failed | failed |
| forgot-password | DT-21 | failed | failed | failed | failed |
| forgot-password | DT-22 | failed | failed | failed | failed |
| forgot-password | DT-23 | failed | failed | failed | failed |
| forgot-password | DT-24 | failed | failed | failed | failed |
| forgot-password | DT-25 | failed | failed | failed | failed |
| forgot-password | DT-26 | failed | failed | failed | failed |
| forgot-password | DT-28 | failed | failed | failed | failed |
| forgot-password | DT-29 | failed | failed | failed | failed |
| forgot-password | DT-30 | failed | failed | failed | failed |
| forgot-password | DT-35 | failed | failed | failed | failed |
| forgot-password | BVA-03 | failed | failed | failed | failed |
| forgot-password | BVA-04 | failed | failed | failed | failed |
| forgot-password | BVA-05 | failed | failed | failed | failed |
| forgot-password | DT-02 | failed | failed | failed | failed |
| forgot-password | DT-03 | failed | failed | failed | failed |
| forgot-password | DT-06 | failed | failed | failed | failed |
| forgot-password | DT-07 | passed | passed | passed | passed |
| forgot-password | DT-08 | passed | passed | passed | passed |
| forgot-password | DT-09 | passed | passed | passed | passed |
| forgot-password | DT-11 | failed | failed | failed | failed |
| forgot-password | DT-12 | failed | failed | failed | failed |
| forgot-password | DT-13 | failed | failed | failed | failed |
| forgot-password | DT-14 | failed | failed | failed | failed |
| forgot-password | DT-15 | failed | failed | failed | failed |
| forgot-password | BVA-01 | failed | failed | failed | failed |
| forgot-password | BVA-02 | failed | failed | failed | failed |

**Totals**

| feature | automated | executed | passed | failed | flaky | runs |
| --- | --- | --- | --- | --- | --- | --- |
| forgot-password | 33 | 33 | 5 | 28 | 0 | 3 |

**Browser comparison:** the same 5 tests pass and the same 28 fail on all three browsers, each on the same check (first error of every test compared across the three `results.json`). Durations: chromium 3.2 min, firefox 4.2 min, webkit 3.6 min. No flaky test.

**Environment error ENV-01 – `ECONNRESET` on an API call (accepted as a risk, student 17/11):**

| Field | Value |
| --- | --- |
| Seen in | First official run, DT-12 on Firefox (19:51): after the FR-22 failure, `apiRequestContext.post: socket hang up (ECONNRESET)` on the API reset, so the API part of DT-12 did not run in that run |
| Reproduced | DT-12 rerun 3 times on Firefox (private folder): 1 of 3. Not seen on Chromium or WebKit, and not in the second official set (0 of 99 tests) |
| Proposed cause | The API call follows the soft FR-22 check, which waits its full 5 s; Node / Express closes an idle keep-alive connection after 5 s (`keepAliveTimeout` default), so the request can go out on a socket the server is closing. Environment / timing, not the product under test |
| Effect | None on the verdicts: DT-12 fails on FR-22 on every browser; only its API check can be missing from a run |
| Decision | Student 17/11: record it, rerun the three official runs once more (done: no `ECONNRESET`), accept it as a risk; no change to the specs |

## 7. Not automated (T8)

| TC ID | Reason | Tested instead |
| --- | --- | --- |

## 8. Failures and bugs (T7)

| TC ID | Browsers failing | Assertion (expected vs received) | Verdict | Bug / issue |
| --- | --- | --- | --- | --- |
