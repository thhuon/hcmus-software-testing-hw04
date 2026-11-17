# HW04 – Bug Report (automated tests)

| Field | Value |
| --- | --- |
| SUT | EShop @ commit 85af3ba (`eshop-sut`) |
| Issue tracker | [angquoc/software-testing-2026-HW02-group](https://github.com/angquoc/software-testing-2026-HW02-group/issues) – rules: group README §4 (template, title, labels) and §6 (HW04: comment on HW02 issues, new issues with label `hw: HW04`) |
| Earlier bug reports matched | HW02 `bugs/BUG_REPORT.md` (BUG-01 … BUG-41 = issues #1 … #41) |
| Reporter | HỒ THÙY HƯƠNG – 23120046 |
| Count | Bugs: 10 · Confirmed: 7 · Changed: 1 · New: 2 |

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
| [BUG-01](#bug-01) | FR-08 (HW02 fB A6, decision Q4) | Checkout with an empty cart (typed URL `/checkout`) is accepted and stores an order of 0 ₫ | checkout DT-07 (T2 check through the page objects; spec in T4) | Chromium, Firefox, WebKit | New | [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116) | Medium / Medium (SV xác nhận 17/11) |
| [BUG-02](#bug-02) | FR-03, FR-01 | Bước 2 accepts a new password whose only special character is a space (`NewPass 2026`) and changes the password | `tests/forgot-password/web.spec.ts` › "DT-35 – special character only outside the set (space)", data row `DT-35` in `data/forgot-password/web.json` (domain testing EC-V4-10, added in HW04) | Chromium, Firefox, WebKit | New | to file (label `hw: HW04`) | High / High (proposed – to be confirmed) |
| [BUG-03](#bug-03) | FR-03, FR-01 | Bước 2 on the Web refuses every new password, also a valid one | `web.spec.ts` › DT-04, DT-05, DT-06, BVA-04, BVA-05 (rows of `data/forgot-password/web.json`) | Chromium, Firefox, WebKit | Changed #1 | comment on [#1](https://github.com/angquoc/software-testing-2026-HW02-group/issues/1) | Critical / High (from #1) |
| [BUG-04](#bug-04) | FR-03 | OTP has 4 digits instead of 6 | `web.spec.ts` › DT-01, DT-02 | Chromium, Firefox, WebKit | Confirmed #3 | comment on [#3](https://github.com/angquoc/software-testing-2026-HW02-group/issues/3) | High / High (from #3) |
| [BUG-05](#bug-05) | FR-03 | Bước 2 has no "Xác nhận mật khẩu mới" field | `web.spec.ts` › DT-01, DT-28, DT-29, DT-30 | Chromium, Firefox, WebKit | Confirmed #4 | comment on [#4](https://github.com/angquoc/software-testing-2026-HW02-group/issues/4) | Medium / Medium (from #4) |
| [BUG-06](#bug-06) | FR-03, FR-22 | No step indicator on Bước 1 and Bước 2 ("Bước 1 / 2") | `web.spec.ts` › DT-01, DT-03 | Chromium, Firefox, WebKit | Confirmed #6 | comment on [#6](https://github.com/angquoc/software-testing-2026-HW02-group/issues/6) | Low / Low (from #6) |
| [BUG-07](#bug-07) | FR-22 | Required email field of Bước 1 has no `*` ("Nhập Email của bạn") | `web.spec.ts` › DT-01 | Chromium, Firefox, WebKit | Confirmed #7 | comment on [#7](https://github.com/angquoc/software-testing-2026-HW02-group/issues/7) | Low / Low (from #7) |
| [BUG-08](#bug-08) | FR-03, FR-01 | Reset API accepts a request with no `newPassword` and changes the password | `tests/forgot-password/api.spec.ts` › "DT-27 – reset without newPassword is rejected", data row `DT-27` in `data/forgot-password/api.json` | Chromium, Firefox, WebKit | Confirmed #8 | comment on [#8](https://github.com/angquoc/software-testing-2026-HW02-group/issues/8) | High / High (from #8) |
| [BUG-09](#bug-09) | FR-22 | Errors of the reset form appear in a browser dialog, not above the submit button | `web.spec.ts` › DT-06, DT-11 … 15, DT-20 … 26, DT-35, BVA-01 … 03 (17 tests) | Chromium, Firefox, WebKit | Confirmed #9 | comment on [#9](https://github.com/angquoc/software-testing-2026-HW02-group/issues/9) | Low / Low (from #9) |
| [BUG-10](#bug-10) | FR-03 | Forgot-password page has no "Quay lại đăng nhập" button | `web.spec.ts` › DT-03 | Chromium, Firefox, WebKit | Confirmed #11 | comment on [#11](https://github.com/angquoc/software-testing-2026-HW02-group/issues/11) | Low / Low (from #11) |

Outcome: `Confirmed #n` (same behaviour as the existing issue) · `Changed #n` (behaviour differs; say how) · `New #n`.

## 3. Details

### BUG-01

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] Checkout with an empty cart (typed URL `/checkout`) is accepted and stores an order of 0 ₫ |
| Requirement | FR-08 – `eshop-sut/README.md:105` "**Tổng tiền thanh toán** được tính tự động từ giỏ hàng …"; `eshop-sut/README.md:106` "Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua." FR-08 has no sentence that names an empty cart; the oracle is the HW02 test basis `../week02/features/fB-pool-B/01_test_basis.md` A6 "A checkout with an empty cart is refused: no order is created (API: error response; Web: the empty-cart state shows and no order can be placed)", decision Q4 approved by the student on 20/10 |
| Found by | checkout DT-07 (domain testing, EC-V2-2 empty cart), step 2 by the typed URL; seen in the T2 check through the page objects (`CartPage`, `CheckoutPage`, `api/EshopApi.ts`), 17/11 19:48. HW02 set DT-07 to Pass because the cart page offers no checkout button for an empty cart (Prompt065); the student counts the typed-URL path as a bug (17/11) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ |
| Preconditions | A new account registered through `POST /api/register` and logged in on the Web; nothing added to the cart |
| Steps to reproduce | 1. Log in on the Web (Đăng nhập)<br>2. Open "Giỏ hàng": "Giỏ hàng của bạn đang trống", no "Tiến hành thanh toán" button<br>3. Type `http://localhost:5173/checkout` in the address bar<br>4. Click "Xác Nhận Thanh Toán"<br>5. `GET /api/orders/my-orders` with the user's token |
| Test data | empty cart; any user account |
| Expected | No order can be placed and no order is created (A6, Q4) |
| Actual | Step 3: "Xác Nhận Đơn Hàng" with an empty "Sản phẩm:" list, total `0`, "Tổng thanh toán: 0 ₫", "Xác Nhận Thanh Toán" enabled. Step 4: the Web sends `{"items": [], "total_amount": 0, "coupon_id": null}` → 200 `{"message": "Checkout successful", "orderId": 13}`; "Thanh toán thành công!" is shown. Step 5: a new order `{"total_amount": 0, "status": "pending", "shipping_address": null}`. Same on the three browsers (orders 13, 15, 17) |
| Evidence | [empty checkout page](screenshots/DT-07_empty-checkout_chromium.png) · [after the click](screenshots/DT-07_empty-checkout-success_chromium.png) (Chromium); the automated DT-07 run adds its report and failure screenshot in T6 / T7 |
| Outcome | New – no HW02 issue covers it (rejected candidates: #14 cart not cleared after checkout, #13 checkout without `total_amount`, #12 client `total_amount` stored: other requirement sentences / behaviours; #74 Web cart vs `GET /api/cart`: FR-07) |
| Tracker | [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116) – filed 17/11/2026 by thhuon, labels `severity: medium`, `platform: web`, `technique: EP`, `pool: B`, `hw: HW04` |
| Severity / Priority | Medium / Medium (SV xác nhận 17/11): the rule "an order needs products" is broken, the user can avoid it by not typing the URL; no data of others is touched |

### BUG-02

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Bước 2 accepts a new password whose only special character is a space (`NewPass 2026`) and changes the password |
| Requirement | `eshop-sut/README.md:58` "Mật khẩu mới phải tuân thủ điều kiện như FR-01."; `eshop-sut/README.md:34` "**Yêu cầu mật khẩu mạnh**: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`)." A space is not in the list (HW02 assumption A10) |
| Found by | `tests/forgot-password/web.spec.ts` › "DT-35 – special character only outside the set (space)", data row `DT-35` in `data/forgot-password/web.json` (domain testing EC-V4-10, added in HW04); official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password (Đăng nhập → "Quên mật khẩu?")<br>2. Bước 1: type the account e-mail, click "Lấy mã OTP"<br>3. Bước 2: type the OTP shown on the page and `NewPass 2026` in "Mật khẩu mới", click "Đặt lại mật khẩu"<br>4. Log in with the old password `Test1234!`, then with `NewPass 2026` |
| Test data | new password `NewPass 2026` (12 characters: upper, lower, digits, one space, no allowed special character) |
| Expected | The new password is refused with an error above the submit button; the old password still logs in (FR-01 via FR-03, HW02 A6) |
| Actual | Step 3: the Web sends `{"newPassword": "NewPass 2026", …}` to `POST /api/reset-password` → `200`, a dialog "Đổi mật khẩu thành công!" opens and the app moves to the login page. Step 4: `Test1234!` → `401`, `NewPass 2026` → `200` (token). Test assertion: "login with \"Test1234!\" succeeds" expected `200`, received `4xx`, on the three browsers. Rechecked 17/11 20:30 with a one-off agent script (Web form + API logins, Chromium): same result |
| Evidence | [failure screenshot](screenshots/DT-35_chromium.png) (the login page the app moved to) · [report entry](screenshots/DT-35_report_chromium.png) (dialog annotation and failed assertion) · Firefox / WebKit: `reports/forgot-password/<browser>/screenshots/DT-35.png` |
| Outcome | New. Rejected candidates: #1 (the Web refuses valid passwords – the opposite behaviour, same requirement sentence), #2 (the reset **API** accepts weak passwords; here the Web's own check lets the password through), #42 / #49 (FR-01 registration, another feature). Related: #1, #2 |
| Tracker | to file (label `hw: HW04`) (not sent yet) |
| Severity / Priority | High / High (proposed – to be confirmed) |

### BUG-03

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Bước 2 on the Web refuses every new password, also a valid one |
| Requirement | `eshop-sut/README.md:58` "Mật khẩu mới phải tuân thủ điều kiện như FR-01."; `eshop-sut/README.md:34` (FR-01 strong-password rule) |
| Found by | `web.spec.ts` › DT-04, DT-05, DT-06, BVA-04, BVA-05 (rows of `data/forgot-password/web.json`); official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password (Đăng nhập → "Quên mật khẩu?")<br>2. Bước 1: type the account e-mail, click "Lấy mã OTP"<br>3. Bước 2: OTP shown and a valid new password (`NewPass@2026#`, `Current@2026`, `NewP@202`, `NewP@2026`), click "Đặt lại mật khẩu"<br>4. Log in with the new password |
| Test data | DT-04 `NewPass@2026#` · DT-05 `Current@2026` (= current) · DT-06 `NewPass2026` then `NewPass@2026` with the same OTP · BVA-04 `NewP@202` (8) · BVA-05 `NewP@2026` (9) |
| Expected | The valid new password is accepted; it logs in and the old one does not (A5); the used OTP is refused afterwards (SEC-07) |
| Actual | Dialog "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."; login with the new password → `4xx` (DT-04, DT-06, BVA-04, BVA-05); DT-05: the same OTP is still accepted by the API (`200`), so no reset happened. Same on the three browsers. **Differs from #1:** not every password is refused – `NewPass 2026` (space, no allowed special character) is accepted (BUG-02) |
| Evidence | [DT-04 failure screenshot](screenshots/DT-04_chromium.png) · [DT-04 report entry](screenshots/DT-04_report_chromium.png) · [DT-05 report entry](screenshots/DT-05_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour for valid passwords as #1; differs in "every" |
| Tracker | comment on [#1](https://github.com/angquoc/software-testing-2026-HW02-group/issues/1) (not sent yet) |
| Severity / Priority | Critical / High (from #1) |

### BUG-04

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] OTP has 4 digits instead of 6 |
| Requirement | `eshop-sut/README.md:51` "Hệ thống sinh mã OTP **6 chữ số ngẫu nhiên** …"; `eshop-sut/README.md:284` SEC-07 "tối thiểu 6 chữ số" |
| Found by | `web.spec.ts` › DT-01, DT-02; official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password (Đăng nhập → "Quên mật khẩu?")<br>2. Bước 1: type the account e-mail, click "Lấy mã OTP" (DT-02: three times, through "← Quay lại")<br>3. Read the OTP in "Mã OTP của bạn là: …" |
| Test data | any registered e-mail |
| Expected | Each OTP has exactly 6 digits (`^\d{6}$`); the three are not all equal (A17) |
| Actual | DT-01: `9594`; DT-02: `4941`, `1900`, `2240` – 4 digits; the three differ (randomness holds). Same on the three browsers |
| Evidence | [DT-01 failure screenshot](screenshots/DT-01_chromium.png) · [DT-02 failure screenshot](screenshots/DT-02_chromium.png) · [DT-02 report entry](screenshots/DT-02_report_chromium.png) |
| Outcome | Same sentence, same behaviour as #3 |
| Tracker | comment on [#3](https://github.com/angquoc/software-testing-2026-HW02-group/issues/3) (not sent yet) |
| Severity / Priority | High / High (from #3) |

### BUG-05

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Bước 2 has no "Xác nhận mật khẩu mới" field |
| Requirement | `eshop-sut/README.md:57` "Người dùng nhập OTP, Mật khẩu mới, và **Xác nhận mật khẩu mới**."; `eshop-sut/README.md:59` "Hai trường mật khẩu phải khớp nhau." |
| Found by | `web.spec.ts` › DT-01, DT-28, DT-29, DT-30; official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password (Đăng nhập → "Quên mật khẩu?")<br>2. Bước 1: type the account e-mail, click "Lấy mã OTP"<br>3. Look for the field "Xác nhận mật khẩu mới" on Bước 2 |
| Test data | DT-28 confirm `NewPass@2025`, DT-29 empty, DT-30 `newPass@2026` (new `NewPass@2026`) |
| Expected | Bước 2 has the three fields OTP, Mật khẩu mới, Xác nhận mật khẩu mới |
| Actual | Assertion "confirm field \"Xác nhận mật khẩu mới\" (FR-03)" → element not found (5 s); Bước 2 shows only "Mã OTP (4 số)" and "Mật khẩu mới". Same on the three browsers |
| Evidence | [DT-28 failure screenshot](screenshots/DT-28_chromium.png) · [DT-28 report entry](screenshots/DT-28_report_chromium.png) |
| Outcome | Same sentence, same behaviour as #4 |
| Tracker | comment on [#4](https://github.com/angquoc/software-testing-2026-HW02-group/issues/4) (not sent yet) |
| Severity / Priority | Medium / Medium (from #4) |

### BUG-06

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] No step indicator on Bước 1 and Bước 2 ("Bước 1 / 2") |
| Requirement | `eshop-sut/README.md:52` "Giao diện phải hiển thị **chỉ báo bước (Step Indicator)** — ví dụ: \"Bước 1 / 2\"."; `eshop-sut/README.md:256` (FR-22) |
| Found by | `web.spec.ts` › DT-01, DT-03; official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password<br>2. Look for "Bước 1 / 2"; go to Bước 2 and look for "Bước 2 / 2" |
| Test data | – |
| Expected | "Bước 1 / 2" on Bước 1, "Bước 2 / 2" on Bước 2 (A16) |
| Actual | Text matching `Bước [12] / 2` → element not found on both steps. Same on the three browsers |
| Evidence | [DT-03 failure screenshot](screenshots/DT-03_chromium.png) · [DT-03 report entry](screenshots/DT-03_report_chromium.png) |
| Outcome | Same sentence, same behaviour as #6 |
| Tracker | comment on [#6](https://github.com/angquoc/software-testing-2026-HW02-group/issues/6) (not sent yet) |
| Severity / Priority | Low / Low (from #6) |

### BUG-07

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Required email field of Bước 1 has no `*` ("Nhập Email của bạn") |
| Requirement | `eshop-sut/README.md:252` "Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn." |
| Found by | `web.spec.ts` › DT-01; official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password<br>2. Read the label of the e-mail field |
| Test data | – |
| Expected | The label shows `*` |
| Actual | Label text "Nhập Email của bạn" (expected to contain `*`). Same on the three browsers |
| Evidence | [DT-01 report entry](screenshots/DT-01_report_chromium.png) · [DT-03 failure screenshot](screenshots/DT-03_chromium.png) (Bước 1) |
| Outcome | Same sentence, same behaviour as #7 |
| Tracker | comment on [#7](https://github.com/angquoc/software-testing-2026-HW02-group/issues/7) (not sent yet) |
| Severity / Priority | Low / Low (from #7) |

### BUG-08

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Reset API accepts a request with no `newPassword` and changes the password |
| Requirement | `eshop-sut/README.md:58` "Mật khẩu mới phải tuân thủ điều kiện như FR-01." (A4: the rule also holds for the API) |
| Found by | `tests/forgot-password/api.spec.ts` › "DT-27 – reset without newPassword is rejected", data row `DT-27` in `data/forgot-password/api.json`; official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. `POST /api/forgot-password` `{"email": "<account>"}` → `resetToken`<br>2. `POST /api/reset-password` `{"email": "<account>", "resetToken": "<OTP>"}` (no `newPassword`) |
| Test data | body without `newPassword` |
| Expected | The request is refused (`4xx`); the old password still logs in |
| Actual | `200` `{"message":"Password reset successfully"}` (assertion expected `4xx`, received `200`); the test runs in the three browser projects with the same result |
| Evidence | [DT-27 report entry](screenshots/DT-27_report_chromium.png) (API test, no page) |
| Outcome | Same sentence, same behaviour as #8 |
| Tracker | comment on [#8](https://github.com/angquoc/software-testing-2026-HW02-group/issues/8) (not sent yet) |
| Severity / Priority | High / High (from #8) |

### BUG-09

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Errors of the reset form appear in a browser dialog, not above the submit button |
| Requirement | `eshop-sut/README.md:255` "Thông báo lỗi phải xuất hiện **trên** nút submit, không phải bên dưới." |
| Found by | `web.spec.ts` › DT-06, DT-11 … 15, DT-20 … 26, DT-35, BVA-01 … 03 (17 tests); official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password (Đăng nhập → "Quên mật khẩu?")<br>2. Bước 1: type the account e-mail, click "Lấy mã OTP"<br>3. Bước 2: a wrong OTP (e.g. `482`) or a password that breaks FR-01 (e.g. `Ab1@x`), click "Đặt lại mật khẩu" |
| Test data | OTPs `482`, `482913123`, `""`, `48291A`, `482914`, `48291`, `4829131`; passwords `Ab1@x`, `""`, `newpass@2026`, `NEWPASS@2026`, `NewPass@word`, `NewPass2026`, `NewPass#2026`, `NewP@26` |
| Expected | An error text in the form, above "Đặt lại mật khẩu" |
| Actual | No text element above the button (assertion "error message in the page, above the submit button (FR-22)" → not found); the message comes in a dialog "Mật khẩu quá yếu! …" (15 tests). DT-13 (empty OTP) and DT-21 (empty password): the browser blocks the empty `required` field, no text above the button, no dialog. The OTP / password itself is refused as expected (password unchanged). Same on the three browsers |
| Evidence | [DT-11 failure screenshot](screenshots/DT-11_chromium.png) · [DT-11 report entry](screenshots/DT-11_report_chromium.png) · [DT-21 report entry](screenshots/DT-21_report_chromium.png) |
| Outcome | Same sentence, same behaviour as #9 (which also lists the empty-field case, DT-13) |
| Tracker | comment on [#9](https://github.com/angquoc/software-testing-2026-HW02-group/issues/9) (not sent yet) |
| Severity / Priority | Low / Low (from #9) |

### BUG-10

| Field | Value |
| --- | --- |
| Title | [23120046][FR-03][Web] Forgot-password page has no "Quay lại đăng nhập" button |
| Requirement | `eshop-sut/README.md:53` "Có nút **Quay lại đăng nhập**." |
| Found by | `web.spec.ts` › DT-03; official runs 17/11/2026: Chromium `2026-11-17T13:08:54.601Z`, Firefox `…13:12:16.037Z`, WebKit `…13:16:33.549Z` (reports `reports/forgot-password/<browser>/index.html`, commit 21b20d0; specs at 63f8508) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` with password `Test1234!` (each test registers its own, design §3); backend and Web running |
| Steps to reproduce | 1. Open http://localhost:5173/forgot-password<br>2. Look for "Quay lại đăng nhập" (button or link) |
| Test data | – |
| Expected | A "Quay lại đăng nhập" button that opens the login page (`/login`, "Sign In") |
| Actual | Assertion "button \"Quay lại đăng nhập\" (FR-03)" → element not found (5 s). Same on the three browsers |
| Evidence | [DT-03 failure screenshot](screenshots/DT-03_chromium.png) · [DT-03 report entry](screenshots/DT-03_report_chromium.png) |
| Outcome | Same sentence, same behaviour as #11 |
| Tracker | comment on [#11](https://github.com/angquoc/software-testing-2026-HW02-group/issues/11) (not sent yet) |
| Severity / Priority | Low / Low (from #11) |
