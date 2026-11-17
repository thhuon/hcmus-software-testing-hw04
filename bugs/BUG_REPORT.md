# HW04 – Bug Report (automated tests)

| Field | Value |
| --- | --- |
| SUT | EShop @ commit 85af3ba (`eshop-sut`) |
| Issue tracker | [angquoc/software-testing-2026-HW02-group](https://github.com/angquoc/software-testing-2026-HW02-group/issues) – rules: group README §4 (template, title, labels) and §6 (HW04: comment on HW02 issues, new issues with label `hw: HW04`) |
| Earlier bug reports matched | HW02 `bugs/BUG_REPORT.md` (BUG-01 … BUG-41 = issues #1 … #41) |
| Reporter | HỒ THÙY HƯƠNG – 23120046 |
| Proof (Issues page) | [issues-label-hw04.png](screenshots/issues-label-hw04.png) – filter `is:issue state:open author:thhuon label:"hw: HW04"`, 17/11/2026 22:35: #117 (FR-03), #116 (FR-08). Commented HW02 issues: links in the overview |
| Count | Bugs: 17 · Confirmed: 13 · Changed: 2 · New: 2 |

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
| [BUG-02](#bug-02) | FR-03, FR-01 | Bước 2 accepts a new password whose only special character is a space (`NewPass 2026`) and changes the password | `tests/forgot-password/web.spec.ts` › "DT-35 – special character only outside the set (space)", data row `DT-35` in `data/forgot-password/web.json` (domain testing EC-V4-10, added in HW04) | Chromium, Firefox, WebKit | New | [#117](https://github.com/angquoc/software-testing-2026-HW02-group/issues/117) | High / High (proposed – to be confirmed) |
| [BUG-03](#bug-03) | FR-03, FR-01 | Bước 2 on the Web refuses every new password, also a valid one | `web.spec.ts` › DT-04, DT-05, DT-06, BVA-04, BVA-05 (rows of `data/forgot-password/web.json`) | Chromium, Firefox, WebKit | Changed #1 | [comment on #1](https://github.com/angquoc/software-testing-2026-HW02-group/issues/1#issuecomment-6950008056) | Critical / High (from #1) |
| [BUG-04](#bug-04) | FR-03 | OTP has 4 digits instead of 6 | `web.spec.ts` › DT-01, DT-02 | Chromium, Firefox, WebKit | Confirmed #3 | [comment on #3](https://github.com/angquoc/software-testing-2026-HW02-group/issues/3#issuecomment-6950009329) | High / High (from #3) |
| [BUG-05](#bug-05) | FR-03 | Bước 2 has no "Xác nhận mật khẩu mới" field | `web.spec.ts` › DT-01, DT-28, DT-29, DT-30 | Chromium, Firefox, WebKit | Confirmed #4 | [comment on #4](https://github.com/angquoc/software-testing-2026-HW02-group/issues/4#issuecomment-6950010734) | Medium / Medium (from #4) |
| [BUG-06](#bug-06) | FR-03, FR-22 | No step indicator on Bước 1 and Bước 2 ("Bước 1 / 2") | `web.spec.ts` › DT-01, DT-03 | Chromium, Firefox, WebKit | Confirmed #6 | [comment on #6](https://github.com/angquoc/software-testing-2026-HW02-group/issues/6#issuecomment-6950012030) | Low / Low (from #6) |
| [BUG-07](#bug-07) | FR-22 | Required email field of Bước 1 has no `*` ("Nhập Email của bạn") | `web.spec.ts` › DT-01 | Chromium, Firefox, WebKit | Confirmed #7 | [comment on #7](https://github.com/angquoc/software-testing-2026-HW02-group/issues/7#issuecomment-6950013137) | Low / Low (from #7) |
| [BUG-08](#bug-08) | FR-03, FR-01 | Reset API accepts a request with no `newPassword` and changes the password | `tests/forgot-password/api.spec.ts` › "DT-27 – reset without newPassword is rejected", data row `DT-27` in `data/forgot-password/api.json` | Chromium, Firefox, WebKit | Confirmed #8 | [comment on #8](https://github.com/angquoc/software-testing-2026-HW02-group/issues/8#issuecomment-6950014477) | High / High (from #8) |
| [BUG-09](#bug-09) | FR-22 | Errors of the reset form appear in a browser dialog, not above the submit button | `web.spec.ts` › DT-06, DT-11 … 15, DT-20 … 26, DT-35, BVA-01 … 03 (17 tests) | Chromium, Firefox, WebKit | Confirmed #9 | [comment on #9](https://github.com/angquoc/software-testing-2026-HW02-group/issues/9#issuecomment-6950016053) | Low / Low (from #9) |
| [BUG-10](#bug-10) | FR-03 | Forgot-password page has no "Quay lại đăng nhập" button | `web.spec.ts` › DT-03 | Chromium, Firefox, WebKit | Confirmed #11 | [comment on #11](https://github.com/angquoc/software-testing-2026-HW02-group/issues/11#issuecomment-6950017417) | Low / Low (from #11) |
| [BUG-11](#bug-11) | FR-08 | Checkout saves the `total_amount` sent by the client as the order total | `api.spec.ts` › DT-09 … DT-13 (rows of `data/checkout/api.json`) | Chromium, Firefox, WebKit | Confirmed #12 | comment on [#12](https://github.com/angquoc/software-testing-2026-HW02-group/issues/12) – not sent yet | Critical / High (from #12) |
| [BUG-12](#bug-12) | FR-08 | Checkout without `total_amount` saves the order with total `null` instead of computing it from the cart | `api.spec.ts` › DT-02, DT-08 | Chromium, Firefox, WebKit | Confirmed #13 | comment on [#13](https://github.com/angquoc/software-testing-2026-HW02-group/issues/13) – not sent yet | High / High (from #13) |
| [BUG-13](#bug-13) | FR-08 | Cart is not cleared after a successful checkout (Web cart page and `GET /api/cart`) | `web.spec.ts` › DT-01, BVA-01 … 04; `api.spec.ts` › DT-02, DT-08 … 13 | Chromium, Firefox, WebKit | Confirmed #14 | comment on [#14](https://github.com/angquoc/software-testing-2026-HW02-group/issues/14) – not sent yet | Medium / Medium (from #14) |
| [BUG-14](#bug-14) | FR-08 | Checkout total on the Web can be edited | `web.spec.ts` › DT-01 | Chromium, Firefox, WebKit | Confirmed #15 | comment on [#15](https://github.com/angquoc/software-testing-2026-HW02-group/issues/15) – not sent yet | Critical / High (from #15) |
| [BUG-15](#bug-15) | FR-23 | Thanh toán page has no breadcrumb | `web.spec.ts` › DT-01 | Chromium, Firefox, WebKit | Confirmed #16 | comment on [#16](https://github.com/angquoc/software-testing-2026-HW02-group/issues/16) – not sent yet | Low / Low (from #16) |
| [BUG-16](#bug-16) | FR-08 | A guest who is not logged in can check out on the Web – **not reproduced in HW04** | `web.spec.ts` › DT-03 (passes) | – (passes) | Changed #17 | comment on [#17](https://github.com/angquoc/software-testing-2026-HW02-group/issues/17) – not sent yet | High / High (from #17) |
| [BUG-17](#bug-17) | FR-07 | Empty cart has no illustration (found again by FR-08 DT-07) | `web.spec.ts` › DT-07 | Chromium, Firefox, WebKit | Confirmed #80 (Related, FR-07, 23120061) | comment on [#80](https://github.com/angquoc/software-testing-2026-HW02-group/issues/80) – not sent yet | Low / – (from #80) |

Outcome: `Confirmed #n` (same behaviour as the existing issue) · `Changed #n` (behaviour differs; say how) · `New #n`.

## 3. Details

### BUG-01

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] Checkout with an empty cart (typed URL `/checkout`) is accepted and stores an order of 0 ₫ |
| Requirement | FR-08 – `eshop-sut/README.md:105` "**Tổng tiền thanh toán** được tính tự động từ giỏ hàng …"; `eshop-sut/README.md:106` "Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua." FR-08 has no sentence that names an empty cart; the oracle is the HW02 test basis `../week02/features/fB-pool-B/01_test_basis.md` A6 "A checkout with an empty cart is refused: no order is created (API: error response; Web: the empty-cart state shows and no order can be placed)", decision Q4 approved by the student on 20/10 |
| Found by | checkout DT-07 (domain testing, EC-V2-2 empty cart), step 2 by the typed URL; seen in the T2 check through the page objects (`CartPage`, `CheckoutPage`, `api/EshopApi.ts`), 17/11 19:48; automated: `web.spec.ts` › DT-07 (typed `/checkout`) and `api.spec.ts` › DT-07 (`POST /api/checkout` with an empty server cart), official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f). HW02 set DT-07 to Pass because the cart page offers no checkout button for an empty cart (Prompt065); the student counts the typed-URL path as a bug (17/11) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ |
| Preconditions | A new account registered through `POST /api/register` and logged in on the Web; nothing added to the cart |
| Steps to reproduce | 1. Log in on the Web (Đăng nhập)<br>2. Open "Giỏ hàng": "Giỏ hàng của bạn đang trống", no "Tiến hành thanh toán" button<br>3. Type `http://localhost:5173/checkout` in the address bar<br>4. Click "Xác Nhận Thanh Toán"<br>5. `GET /api/orders/my-orders` with the user's token |
| Test data | empty cart; any user account |
| Expected | No order can be placed and no order is created (A6, Q4) |
| Actual | Step 3: "Xác Nhận Đơn Hàng" with an empty "Sản phẩm:" list, total `0`, "Tổng thanh toán: 0 ₫", "Xác Nhận Thanh Toán" enabled. Step 4: the Web sends `{"items": [], "total_amount": 0, "coupon_id": null}` → 200 `{"message": "Checkout successful", "orderId": 13}`; "Thanh toán thành công!" is shown. Step 5: a new order `{"total_amount": 0, "status": "pending", "shipping_address": null}`. Same on the three browsers (orders 13, 15, 17) |
| Evidence | [empty checkout page](screenshots/DT-07_empty-checkout_chromium.png) · [after the click](screenshots/DT-07_empty-checkout-success_chromium.png) (Chromium); automated run: [DT-07 Web failure screenshot](screenshots/checkout_DT-07_chromium.png) (success view after the empty checkout) · [DT-07 Web report entry](screenshots/checkout_DT-07-web_report_chromium.png) (own orders: expected 0, received 1, `total_amount` 0) · [DT-07 API report entry](screenshots/checkout_DT-07-api_report_chromium.png) (expected 0, received 1, `total_amount` `null`) |
| Outcome | New – no HW02 issue covers it (rejected candidates: #14 cart not cleared after checkout, #13 checkout without `total_amount`, #12 client `total_amount` stored: other requirement sentences / behaviours; #74 Web cart vs `GET /api/cart`: FR-07) |
| Tracker | [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116) – filed 17/11/2026 by thhuon, labels `severity: medium`, `platform: web`, `technique: EP`, `pool: B`, `hw: HW04`; automated evidence (Web and API): comment on #116 – not sent yet |
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
| Notes | Masked by BUG-03 (#1) on the Web: a new password that meets FR-01 is always refused, so the reset only succeeds with a password that breaks FR-01 such as `NewPass 2026`. The page itself shows no success message; the only feedback is a browser `alert` "Đổi mật khẩu thành công!" and the move to the login page (trace viewer, student 17/11) |
| Outcome | New. Rejected candidates: #1 (the Web refuses valid passwords – the opposite behaviour, same requirement sentence), #2 (the reset **API** accepts weak passwords; here the Web's own check lets the password through), #42 / #49 (FR-01 registration, another feature). Related: #1, #2 |
| Tracker | [#117](https://github.com/angquoc/software-testing-2026-HW02-group/issues/117) – filed 17/11/2026 by thhuon, labels `severity: high`, `platform: web`, `technique: EP`, `pool: A`, `hw: HW04`; screenshots in the issue |
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
| Tracker | [comment on #1](https://github.com/angquoc/software-testing-2026-HW02-group/issues/1#issuecomment-6950008056) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #3](https://github.com/angquoc/software-testing-2026-HW02-group/issues/3#issuecomment-6950009329) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #4](https://github.com/angquoc/software-testing-2026-HW02-group/issues/4#issuecomment-6950010734) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #6](https://github.com/angquoc/software-testing-2026-HW02-group/issues/6#issuecomment-6950012030) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #7](https://github.com/angquoc/software-testing-2026-HW02-group/issues/7#issuecomment-6950013137) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #8](https://github.com/angquoc/software-testing-2026-HW02-group/issues/8#issuecomment-6950014477) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #9](https://github.com/angquoc/software-testing-2026-HW02-group/issues/9#issuecomment-6950016053) – sent 17/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #11](https://github.com/angquoc/software-testing-2026-HW02-group/issues/11#issuecomment-6950017417) – sent 17/11/2026 by thhuon, with screenshots |
| Severity / Priority | Low / Low (from #11) |

### BUG-11

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] Checkout saves the `total_amount` sent by the client as the order total |
| Requirement | `eshop-sut/README.md:107` "Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên." |
| Found by | `tests/checkout/api.spec.ts` › DT-09 … DT-13, rows `DT-09` … `DT-13` in `data/checkout/api.json` (domain testing EC-V5-3 … 7); official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` (each test its own, design §3) and logged in through `POST /api/login`; its server cart built with `POST /api/cart` (Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 at catalog prices = 126,000,000 ₫, unless the test data says otherwise) |
| Steps to reproduce | 1. `POST /api/checkout` with `Authorization: Bearer <JWT>` and body `{"total_amount": <value>, "shipping_address": "123 Le Loi, TP.HCM"}`<br>2. `GET /api/orders/my-orders` and read the new order<br>3. `GET /api/cart` |
| Test data | `total_amount` `1000` (DT-09), `200000000` (DT-10), `0` (DT-11), `-1000` (DT-12), `"abc"` (DT-13); server total 126,000,000 ₫ |
| Expected | Either one new order with `total_amount` 126000000 and an empty cart, or no order and the cart unchanged (A5, Q2); never the client value |
| Actual | Step 1: `200 {"message":"Checkout successful","orderId":…}`. Assertion "a new order carries the server total 126000000, never the client value": received `1000` / `200000000` / `0` / `-1000` / `"abc"`. The cart still has 3 lines (BUG-13). Same on the three browsers |
| Evidence | [DT-09 report entry](screenshots/checkout_DT-09_report_chromium.png) · [DT-13 report entry](screenshots/checkout_DT-13_report_chromium.png) (API tests have no page) |
| Outcome | Same requirement sentence and same wrong behaviour as #12 (the same five values) |
| Tracker | comment on [#12](https://github.com/angquoc/software-testing-2026-HW02-group/issues/12) – not sent yet |
| Severity / Priority | Critical / High (from #12) |

### BUG-12

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] Checkout without `total_amount` saves the order with total `null` instead of computing it from the cart |
| Requirement | `eshop-sut/README.md:107` "Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên." |
| Found by | `tests/checkout/api.spec.ts` › DT-02 (EC-V5-2), DT-08 (EC-V4-2, cart line with a client price), rows in `data/checkout/api.json`; official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through `POST /api/register` (each test its own, design §3) and logged in through `POST /api/login`; its server cart built with `POST /api/cart` (Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 at catalog prices = 126,000,000 ₫, unless the test data says otherwise); DT-08: one line Bàn phím cơ Keychron Q1 × 3 sent with `price` 1000 |
| Steps to reproduce | 1. `POST /api/checkout` with `Authorization: Bearer <JWT>` and body `{"shipping_address": "123 Le Loi, TP.HCM"}` (no `total_amount`)<br>2. `GET /api/orders/my-orders`<br>3. `GET /api/cart` |
| Test data | DT-02: cart 3 / 4 / 3 (126,000,000 ₫) · DT-08: Keychron × 3 at client price 1000 (catalog 12,000,000 ₫) |
| Expected | One new `pending` order with the total computed from the cart at catalog prices: 126000000 (DT-02), 12000000 (DT-08) (A3, A4, A7) |
| Actual | Step 1: `200 {"message":"Checkout successful",…}`. Assertion "the new order (A3, A7)": expected `total_amount` 126000000 / 12000000, received `null`. Same on the three browsers |
| Evidence | [DT-02 report entry](screenshots/checkout_DT-02_report_chromium.png) · [DT-08 report entry](screenshots/checkout_DT-08_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #13 (also DT-08 there) |
| Tracker | comment on [#13](https://github.com/angquoc/software-testing-2026-HW02-group/issues/13) – not sent yet |
| Severity / Priority | High / High (from #13) |

### BUG-13

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] Cart is not cleared after a successful checkout (Web cart page and `GET /api/cart`) |
| Requirement | `eshop-sut/README.md:108` "Sau thanh toán thành công, giỏ hàng được xóa." |
| Found by | `tests/checkout/web.spec.ts` › DT-01, BVA-01 … BVA-04 (Web, boundary carts of 1 and 2 lines, quantity 1 and 2) and `tests/checkout/api.spec.ts` › DT-02, DT-08 … DT-13 (server cart); official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through the API and logged in on the Web (Đăng nhập); the cart built on the product pages (quantity field + "Thêm vào giỏ hàng") (Web tests); A new account registered through `POST /api/register` (each test its own, design §3) and logged in through `POST /api/login`; its server cart built with `POST /api/cart` (Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 at catalog prices = 126,000,000 ₫, unless the test data says otherwise) (API tests) |
| Steps to reproduce | Web: 1. Build the cart on the product pages<br>2. "Giỏ hàng" → "Tiến hành thanh toán" → "Xác Nhận Thanh Toán"; the order is stored<br>3. Click "Giỏ hàng" again<br>API: `POST /api/checkout` (200), then `GET /api/cart` |
| Test data | DT-01: 3 / 4 / 3 · BVA-01: Keychron × 3 · BVA-02: Keychron × 3, AirPods × 4 · BVA-03: Keychron × 1, AirPods × 4, iPhone × 3 · BVA-04: Keychron × 2, AirPods × 4, iPhone × 3 |
| Expected | After a successful checkout the cart holds no line; the Web cart page shows the empty-cart state (A8) |
| Actual | Web: assertion "no cart line after the checkout (A8)": expected 0 lines, received 3 (DT-01), 1 / 2 / 3 / 3 (BVA-01 … 04), while the order was stored with the right total. API: `GET /api/cart` still returns all lines. Same on the three browsers |
| Evidence | [DT-01 failure screenshot](screenshots/checkout_DT-01_chromium.png) (cart page after the checkout) · [BVA-02 failure screenshot](screenshots/checkout_BVA-02_chromium.png) · [BVA-02 report entry](screenshots/checkout_BVA-02_report_chromium.png) · Firefox / WebKit: `reports/checkout/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #14 (#14 has the server cart and the student's Web observation); HW04 adds four boundary carts on the Web (HW02 ran BVA through the API) |
| Tracker | comment on [#14](https://github.com/angquoc/software-testing-2026-HW02-group/issues/14) – not sent yet |
| Severity / Priority | Medium / Medium (from #14) |

### BUG-14

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] Checkout total on the Web can be edited |
| Requirement | `eshop-sut/README.md:105` "**Tổng tiền thanh toán** được tính tự động từ giỏ hàng và không cho phép người dùng chỉnh sửa trực tiếp." |
| Found by | `tests/checkout/web.spec.ts` › DT-01, row `DT-01` in `data/checkout/web.json`; official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through the API and logged in on the Web (Đăng nhập); the cart built on the product pages (quantity field + "Thêm vào giỏ hàng") |
| Steps to reproduce | 1. Build the cart Keychron × 3, AirPods × 4, iPhone × 3<br>2. "Giỏ hàng" → "Tiến hành thanh toán"<br>3. Look at "Tổng tiền thanh toán (VND)" and type another number into it |
| Test data | cart 3 / 4 / 3 (126,000,000 ₫); typed value `1000` |
| Expected | The total is shown as text the user cannot type into (A10) |
| Actual | Assertion "the total cannot be typed into": expected 0 editable total fields, received 1 (`<input type="number">`). Typing `1000` changes "Tổng thanh toán" to "1,000 ₫", the amount the Web sends. Same on the three browsers |
| Evidence | [checkout page](../features/checkout/screenshots/DT-01-checkout-page-chromium.png) · [after typing 1000](../features/checkout/screenshots/DT-01-total-edited-chromium.png) · [DT-01 report entry](screenshots/checkout_DT-01_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #15 |
| Tracker | comment on [#15](https://github.com/angquoc/software-testing-2026-HW02-group/issues/15) – not sent yet |
| Severity / Priority | Critical / High (from #15) |

### BUG-15

| Field | Value |
| --- | --- |
| Title | [23120046][FR-23][Web] Thanh toán page has no breadcrumb |
| Requirement | `eshop-sut/README.md:263` FR-23 "Breadcrumb bắt buộc có ở các trang con (Giỏ hàng, Thanh toán, Chi tiết sản phẩm)." |
| Found by | `tests/checkout/web.spec.ts` › DT-01; official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account registered through the API and logged in on the Web (Đăng nhập); the cart built on the product pages (quantity field + "Thêm vào giỏ hàng") |
| Steps to reproduce | 1. Build a cart<br>2. "Giỏ hàng" → "Tiến hành thanh toán"<br>3. Look for a breadcrumb on "Xác Nhận Đơn Hàng" |
| Test data | cart 3 / 4 / 3 |
| Expected | A breadcrumb on the Thanh toán page |
| Actual | Assertion "breadcrumb on Thanh toán (FR-23)": expected visible, element not found (`getByRole('navigation', { name: /breadcrumb/i })`, no breadcrumb text either). Same on the three browsers |
| Evidence | [checkout page](../features/checkout/screenshots/DT-01-checkout-page-chromium.png) · [DT-01 report entry](screenshots/checkout_DT-01_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #16 |
| Tracker | comment on [#16](https://github.com/angquoc/software-testing-2026-HW02-group/issues/16) – not sent yet |
| Severity / Priority | Low / Low (from #16) |

### BUG-16

| Field | Value |
| --- | --- |
| Title | [23120046][FR-08][Web] A guest who is not logged in can check out on the Web – **not reproduced in HW04** |
| Requirement | `eshop-sut/README.md:104` "Chỉ người dùng **đã đăng nhập** mới tiến hành thanh toán được." |
| Found by | `tests/checkout/web.spec.ts` › DT-03 – **passes**; official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✓ · Firefox 157.0 ✓ · WebKit 27.2 ✓ (passes) |
| Preconditions | (a) nobody logged in; (b) a new account logged in on the Web, then "Thoát" on the checkout page |
| Steps to reproduce | (a) Home → "Thêm vào giỏ" on Keychron, product page quantity 3 → "Giỏ hàng" → "Tiến hành thanh toán"<br>(b) Log in, build Keychron × 3, "Giỏ hàng" → "Tiến hành thanh toán" → "Thoát" (header) → "Xác Nhận Thanh Toán"<br>After each path: `GET /api/admin/orders` (admin) |
| Test data | Bàn phím cơ Keychron Q1 × 3 |
| Expected | No order is placed (A2, Q1) |
| Actual | Passed on the three browsers: (a) dialog "Bạn cần đăng nhập để thanh toán!" and the login page; (b) `POST /api/checkout` without a token → `401 {"error":"Unauthorized"}`, dialog "Lỗi khi thanh toán: Unauthorized"; the number of all orders unchanged after each path |
| Evidence | [DT-03 report entry](screenshots/checkout_DT-03_report_chromium.png) |
| Outcome | Changed: #17 (HW02) reported that a guest could add to the cart and check out "như bình thường"; HW04 finds no order on either path, also after "Thoát" from a logged-in session. The defect may be fixed, or HW02 saw a session that was still logged in |
| Tracker | comment on [#17](https://github.com/angquoc/software-testing-2026-HW02-group/issues/17) – not sent yet |
| Severity / Priority | High / High (from #17) |

### BUG-17

| Field | Value |
| --- | --- |
| Title | [23120046][FR-07][Web] Empty cart has no illustration (found again by FR-08 DT-07) |
| Requirement | `eshop-sut/README.md:100` FR-07 "Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng." (quoted by the FR-08 test case DT-07) |
| Found by | `tests/checkout/web.spec.ts` › DT-07 (soft assertion), row `DT-07` in `data/checkout/web.json`; official runs 17/11/2026 (fourth set): Chromium `2026-11-17T15:52:03.425Z`, Firefox `…15:53:24.511Z`, WebKit `…15:54:58.834Z` (reports `reports/checkout/<browser>/index.html`, commit 4f6ee4f; specs at bc0de04) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | A new account logged in on the Web; nothing in the cart |
| Steps to reproduce | 1. Log in<br>2. Click "Giỏ hàng" |
| Test data | empty cart |
| Expected | The empty-cart state with an illustration and a clear message |
| Actual | Assertion "empty-cart illustration (FR-07)": expected visible, no `img` / `svg` in the page content; the message "Giỏ hàng của bạn đang trống" is there. Same on the three browsers |
| Evidence | [DT-07 report entry](screenshots/checkout_DT-07-web_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #80 (another member's FR-07 issue; group README §4.1: no duplicate, a comment marked Related) |
| Tracker | comment on [#80](https://github.com/angquoc/software-testing-2026-HW02-group/issues/80) – not sent yet |
| Severity / Priority | Low / – (from #80) |
