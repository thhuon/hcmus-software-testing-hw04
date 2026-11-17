# HW04 – Bug Report (automated tests)

| Field | Value |
| --- | --- |
| SUT | EShop @ commit 85af3ba (`eshop-sut`) |
| Issue tracker | [angquoc/software-testing-2026-HW02-group](https://github.com/angquoc/software-testing-2026-HW02-group/issues) – rules: group README §4 (template, title, labels) and §6 (HW04: comment on HW02 issues, new issues with label `hw: HW04`) |
| Earlier bug reports matched | HW02 `bugs/BUG_REPORT.md` (BUG-01 … BUG-41 = issues #1 … #41) |
| Reporter | HỒ THÙY HƯƠNG – 23120046 |
| Proof (Issues page) | [issues-label-hw04.png](screenshots/issues-label-hw04.png) – filter `is:issue state:open author:thhuon label:"hw: HW04"`, 17/11/2026 22:35: #117 (FR-03), #116 (FR-08). Commented HW02 issues: links in the overview; FR-08 comments (18/11/2026): [#12](screenshots/checkout_comment_12.png), [#13](screenshots/checkout_comment_13.png), [#14](screenshots/checkout_comment_14.png), [#15](screenshots/checkout_comment_15.png), [#16](screenshots/checkout_comment_16.png), [#17](screenshots/checkout_comment_17.png), [#116](screenshots/checkout_comment_116.png), [#80](screenshots/checkout_comment_80.png) |
| Count | Bugs: 39 · Confirmed: 33 · Changed: 4 · New: 2 |

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
| [BUG-11](#bug-11) | FR-08 | Checkout saves the `total_amount` sent by the client as the order total | `api.spec.ts` › DT-09 … DT-13 (rows of `data/checkout/api.json`) | Chromium, Firefox, WebKit | Confirmed #12 | [comment on #12](https://github.com/angquoc/software-testing-2026-HW02-group/issues/12#issuecomment-6955368073) – sent 18/11/2026 by thhuon, with screenshots | Critical / High (from #12) |
| [BUG-12](#bug-12) | FR-08 | Checkout without `total_amount` saves the order with total `null` instead of computing it from the cart | `api.spec.ts` › DT-02, DT-08 | Chromium, Firefox, WebKit | Confirmed #13 | [comment on #13](https://github.com/angquoc/software-testing-2026-HW02-group/issues/13#issuecomment-6955368743) – sent 18/11/2026 by thhuon, with screenshots | High / High (from #13) |
| [BUG-13](#bug-13) | FR-08 | Cart is not cleared after a successful checkout (Web cart page and `GET /api/cart`) | `web.spec.ts` › DT-01, BVA-01 … 04; `api.spec.ts` › DT-02, DT-08 … 13 | Chromium, Firefox, WebKit | Confirmed #14 | [comment on #14](https://github.com/angquoc/software-testing-2026-HW02-group/issues/14#issuecomment-6955369373) – sent 18/11/2026 by thhuon, with screenshots | Medium / Medium (from #14) |
| [BUG-14](#bug-14) | FR-08 | Checkout total on the Web can be edited | `web.spec.ts` › DT-01 | Chromium, Firefox, WebKit | Confirmed #15 | [comment on #15](https://github.com/angquoc/software-testing-2026-HW02-group/issues/15#issuecomment-6955370141) – sent 18/11/2026 by thhuon, with screenshots | Critical / High (from #15) |
| [BUG-15](#bug-15) | FR-23 | Thanh toán page has no breadcrumb | `web.spec.ts` › DT-01 | Chromium, Firefox, WebKit | Confirmed #16 | [comment on #16](https://github.com/angquoc/software-testing-2026-HW02-group/issues/16#issuecomment-6955370947) – sent 18/11/2026 by thhuon, with screenshots | Low / Low (from #16) |
| [BUG-16](#bug-16) | FR-08 | A guest who is not logged in can check out on the Web – **not reproduced in HW04** | `web.spec.ts` › DT-03 (passes) | – (passes) | Changed #17 | [comment on #17](https://github.com/angquoc/software-testing-2026-HW02-group/issues/17#issuecomment-6955371671) – sent 18/11/2026 by thhuon, with screenshots | High / High (from #17) |
| [BUG-17](#bug-17) | FR-07 | Empty cart has no illustration (found again by FR-08 DT-07) | `web.spec.ts` › DT-07 | Chromium, Firefox, WebKit | Confirmed #80 (Related, FR-07, 23120061) | [comment on #80](https://github.com/angquoc/software-testing-2026-HW02-group/issues/80#issuecomment-6955373092) – sent 18/11/2026 by thhuon, with screenshots | Low / – (from #80) |
| [BUG-18](#bug-18) | FR-12 | Add product API creates a product for a request with no token (`POST /api/products`) | `api.spec.ts` › DT-06 | Chromium, Firefox, WebKit | Confirmed #18 | comment on [#18](https://github.com/angquoc/software-testing-2026-HW02-group/issues/18) – drafted, not sent | Critical / High (from #18) |
| [BUG-19](#bug-19) | SEC-02, FR-12 | Edit product API accepts a forged JWT and changes the product (`PUT /api/products/:id`) | `api.spec.ts` › DT-07 | Chromium, Firefox, WebKit | Confirmed #19 | comment on [#19](https://github.com/angquoc/software-testing-2026-HW02-group/issues/19) – drafted, not sent | Critical / High (from #19) |
| [BUG-20](#bug-20) | SEC-03, FR-12 | Delete product API accepts the token of a non-admin user and deletes the product (`DELETE /api/products/:id`) | `api.spec.ts` › DT-08 | Chromium, Firefox, WebKit | Confirmed #20 | comment on [#20](https://github.com/angquoc/software-testing-2026-HW02-group/issues/20) – drafted, not sent | Critical / High (from #20) |
| [BUG-21](#bug-21) | FR-15 | Add product API saves a product with no name (`name` missing → `null`) | `api.spec.ts` › DT-12 | Chromium, Firefox, WebKit | Confirmed #21 | comment on [#21](https://github.com/angquoc/software-testing-2026-HW02-group/issues/21) – drafted, not sent | High / Medium (from #21) |
| [BUG-22](#bug-22) | FR-15 | Add product API saves a price that is not a number (`"abc"`) | `api.spec.ts` › DT-14 | Chromium, Firefox, WebKit | Confirmed #22 | comment on [#22](https://github.com/angquoc/software-testing-2026-HW02-group/issues/22) – drafted, not sent | High / High (from #22) |
| [BUG-23](#bug-23) | FR-15 | Add product API saves a product with no category (`category_id` missing → `null`) | `api.spec.ts` › DT-17 | Chromium, Firefox, WebKit | Confirmed #23 | comment on [#23](https://github.com/angquoc/software-testing-2026-HW02-group/issues/23) – drafted, not sent | High / Medium (from #23) |
| [BUG-24](#bug-24) | FR-15 | Add product API saves a category id that never existed (`9999`) | `api.spec.ts` › DT-18 | Chromium, Firefox, WebKit | Confirmed #24 | comment on [#24](https://github.com/angquoc/software-testing-2026-HW02-group/issues/24) – drafted, not sent | High / Medium (from #24) |
| [BUG-25](#bug-25) | FR-15 | Add product API saves a product with an empty name (`""`) | `api.spec.ts` › DT-09 | Chromium, Firefox, WebKit | Confirmed #25 | comment on [#25](https://github.com/angquoc/software-testing-2026-HW02-group/issues/25) – drafted, not sent | High / Medium (from #25) |
| [BUG-26](#bug-26) | FR-15 | A name longer than 255 characters (300 × `X`) is saved, through the Admin web | `web.spec.ts` › DT-10 | Chromium, Firefox, WebKit | Confirmed #26 | comment on [#26](https://github.com/angquoc/software-testing-2026-HW02-group/issues/26) – drafted, not sent | Medium / Medium (from #26) |
| [BUG-27](#bug-27) | FR-15 | A name made only of spaces (5 spaces) is saved, through the Admin web | `web.spec.ts` › DT-11 | Chromium, Firefox, WebKit | Confirmed #27 | comment on [#27](https://github.com/angquoc/software-testing-2026-HW02-group/issues/27) – drafted, not sent | High / Medium (from #27) |
| [BUG-28](#bug-28) | FR-15 | A negative price (`-50000`) is saved, through the Admin web | `web.spec.ts` › DT-13 | Chromium, Firefox, WebKit | Confirmed #28 | comment on [#28](https://github.com/angquoc/software-testing-2026-HW02-group/issues/28) – drafted, not sent | High / High (from #28) |
| [BUG-29](#bug-29) | FR-15 | A product with no price is saved (Admin web: empty price field; API: `price` missing) | `web.spec.ts, api.spec.ts` › DT-15 | Chromium, Firefox, WebKit | Confirmed #29 | comment on [#29](https://github.com/angquoc/software-testing-2026-HW02-group/issues/29) – drafted, not sent | High / High (from #29) |
| [BUG-30](#bug-30) | FR-15 | A price with a fractional part (`250000.5`) is saved, through the Admin web and the API | `web.spec.ts, api.spec.ts` › DT-16 | Chromium, Firefox, WebKit | Confirmed #30 | comment on [#30](https://github.com/angquoc/software-testing-2026-HW02-group/issues/30) – drafted, not sent | Medium / Medium (from #30) |
| [BUG-31](#bug-31) | FR-15 | Add product API saves the id of a deleted category | `api.spec.ts` › DT-19 | Chromium, Firefox, WebKit | Confirmed #31 | comment on [#31](https://github.com/angquoc/software-testing-2026-HW02-group/issues/31) – drafted, not sent | High / Medium (from #31) |
| [BUG-32](#bug-32) | FR-15 | Editing a product with a negative price (`-50000`) is saved, through the Admin web | `web.spec.ts` › DT-22 | Chromium, Firefox, WebKit | Confirmed #32 | comment on [#32](https://github.com/angquoc/software-testing-2026-HW02-group/issues/32) – drafted, not sent | High / High (from #32) |
| [BUG-33](#bug-33) | FR-22 | Required fields of the add-product form have no `*` (name, price, category) | `web.spec.ts` › DT-23 | Chromium, Firefox, WebKit | Confirmed #33 | comment on [#33](https://github.com/angquoc/software-testing-2026-HW02-group/issues/33) – drafted, not sent | Low / Low (from #33) |
| [BUG-34](#bug-34) | FR-15 | After an edit on the Admin web, every row of the product list shows the edited name | `web.spec.ts` › DT-24 | Chromium, Firefox, WebKit | Changed #34 | comment on [#34](https://github.com/angquoc/software-testing-2026-HW02-group/issues/34) – drafted, not sent | High / Medium (from #34) |
| [BUG-35](#bug-35) | FR-15 | The new row of the product list shows its price without thousand separators (`250000 ₫`) | `web.spec.ts` › DT-25 | Chromium, Firefox, WebKit | Changed #35 | comment on [#35](https://github.com/angquoc/software-testing-2026-HW02-group/issues/35) – drafted, not sent | Medium / Medium (from #35) |
| [BUG-36](#bug-36) | FR-21 | Product list shows prices without thousand separators (`30000000 ₫`) | `web.spec.ts` › DT-26 | Chromium, Firefox, WebKit | Confirmed #36 | comment on [#36](https://github.com/angquoc/software-testing-2026-HW02-group/issues/36) – drafted, not sent | Low / Low (from #36) |
| [BUG-37](#bug-37) | FR-15 | Product list has no category column | `web.spec.ts` › DT-27 | Chromium, Firefox, WebKit | Confirmed #37 | comment on [#37](https://github.com/angquoc/software-testing-2026-HW02-group/issues/37) – drafted, not sent | Low / Low (from #37) |
| [BUG-38](#bug-38) | FR-15 | A name of 256 characters (`Ố` × 256) is saved, through the Admin web | `web.spec.ts` › BVA-05 | Chromium, Firefox, WebKit | Confirmed #38 | comment on [#38](https://github.com/angquoc/software-testing-2026-HW02-group/issues/38) – drafted, not sent | Medium / Medium (from #38) |
| [BUG-39](#bug-39) | FR-15 | A price of 0 is saved, through the Admin web | `web.spec.ts` › BVA-06 | Chromium, Firefox, WebKit | Confirmed #39 | comment on [#39](https://github.com/angquoc/software-testing-2026-HW02-group/issues/39) – drafted, not sent | High / High (from #39) |

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
| Tracker | [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116) – filed 17/11/2026 by thhuon, labels `severity: medium`, `platform: web`, `technique: EP`, `pool: B`, `hw: HW04`; automated evidence (Web and API): [comment on #116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116#issuecomment-6955372327) – sent 18/11/2026 |
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
| Tracker | [comment on #12](https://github.com/angquoc/software-testing-2026-HW02-group/issues/12#issuecomment-6955368073) – sent 18/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #13](https://github.com/angquoc/software-testing-2026-HW02-group/issues/13#issuecomment-6955368743) – sent 18/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #14](https://github.com/angquoc/software-testing-2026-HW02-group/issues/14#issuecomment-6955369373) – sent 18/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #15](https://github.com/angquoc/software-testing-2026-HW02-group/issues/15#issuecomment-6955370141) – sent 18/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #16](https://github.com/angquoc/software-testing-2026-HW02-group/issues/16#issuecomment-6955370947) – sent 18/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #17](https://github.com/angquoc/software-testing-2026-HW02-group/issues/17#issuecomment-6955371671) – sent 18/11/2026 by thhuon, with screenshots |
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
| Tracker | [comment on #80](https://github.com/angquoc/software-testing-2026-HW02-group/issues/80#issuecomment-6955373092) – sent 18/11/2026 by thhuon, with screenshots |
| Severity / Priority | Low / – (from #80) |

### BUG-18

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API creates a product for a request with no token (`POST /api/products`) |
| Requirement | `eshop-sut/README.md:178` "Token JWT hợp lệ.", `:179` "`role = 'admin'` trong Token." (FR-12) |
| Found by | `tests/product-crud/api.spec.ts` › DT-06, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request |
| Steps to reproduce | 1. `POST /api/products` with no `Authorization` header and body `{"name":"Ốp lưng iPhone 15 silicon","price":250000,"description":"Mô tả test","imageUrl":"","category_id":3}`<br>2. `GET /api/products` |
| Test data | No `Authorization` header (EC-V1-2) |
| Expected | The request is refused: no new product (HW02 A1, Q1; the status is recorded only) |
| Actual | Step 1: `200 {"message":"Product created",…}`. Assertion "new products stored by the request": expected length 0, received 1 (the product is stored). Same on the three browsers |
| Evidence | [report entry DT-06-api](screenshots/product-crud_DT-06-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #18 (HW02 BUG-18, fC/DT-06): none – same behaviour |
| Tracker | comment on [#18](https://github.com/angquoc/software-testing-2026-HW02-group/issues/18) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Critical / High (from #18) |

### BUG-19

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Edit product API accepts a forged JWT and changes the product (`PUT /api/products/:id`) |
| Requirement | `eshop-sut/README.md:279` SEC-02 "Các API có tính bảo mật phải yêu cầu JWT Token hợp lệ." |
| Found by | `tests/product-crud/api.spec.ts` › DT-07, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request; product P created by the test through `POST /api/products` (admin) with `{"name":"Ốp lưng iPhone 15 silicon <tag>","price":250000,"description":"Mô tả test","imageUrl":"","category_id":3}` |
| Steps to reproduce | 1. `PUT /api/products/<P>` with `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlc2hvcC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` and body `{"name":"Sản phẩm bị sửa trái phép","price":1000,"description":"Mô tả test","imageUrl":"","category_id":3}`<br>2. `GET /api/products` |
| Test data | Forged JWT (valid header and payload, signature `AAAA…`, EC-V1-3) |
| Expected | The request is refused: P keeps its values (HW02 A1, A11) |
| Actual | Step 1: `200 {"message":"Product updated"}`. Assertion "P keeps its values": P now has name `Sản phẩm bị sửa trái phép` and price 1000. Same on the three browsers |
| Evidence | [report entry DT-07-api](screenshots/product-crud_DT-07-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #19 (HW02 BUG-19, fC/DT-07): none – same behaviour |
| Tracker | comment on [#19](https://github.com/angquoc/software-testing-2026-HW02-group/issues/19) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Critical / High (from #19) |

### BUG-20

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Delete product API accepts the token of a non-admin user and deletes the product (`DELETE /api/products/:id`) |
| Requirement | `eshop-sut/README.md:280` SEC-03 "API Admin phải kiểm tra `role = 'admin'` trong Token, không chỉ kiểm tra sự tồn tại của Token." |
| Found by | `tests/product-crud/api.spec.ts` › DT-08, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request; product P created by the test through `POST /api/products` (admin) with `{"name":"Ốp lưng iPhone 15 silicon <tag>","price":250000,"description":"Mô tả test","imageUrl":"","category_id":3}` |
| Steps to reproduce | 1. `DELETE /api/products/<P>` with `Authorization: Bearer <JWT of test@eshop.com>`<br>2. `GET /api/products` |
| Test data | Valid JWT of the user `test@eshop.com` (role `user`, EC-V1-4) |
| Expected | The request is refused: P is still listed (HW02 A1, A11) |
| Actual | Step 1: `200 {"message":"Product deleted"}`. Assertion "P is still listed": expected true, received false. Same on the three browsers |
| Evidence | [report entry DT-08-api](screenshots/product-crud_DT-08-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #20 (HW02 BUG-20, fC/DT-08): none – same behaviour |
| Tracker | comment on [#20](https://github.com/angquoc/software-testing-2026-HW02-group/issues/20) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Critical / High (from #20) |

### BUG-21

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API saves a product with no name (`name` missing → `null`) |
| Requirement | `eshop-sut/README.md:195` FR-15 "Tên sản phẩm: bắt buộc, tối đa 255 ký tự." |
| Found by | `tests/product-crud/api.spec.ts` › DT-12, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request |
| Steps to reproduce | 1. `POST /api/products` (admin JWT) with body `{"price":250000,"description":"Mô tả test","imageUrl":"","category_id":3}`<br>2. `GET /api/products` |
| Test data | No `name` key (EC-V3-7) |
| Expected | Refused: no new product (HW02 A3) |
| Actual | Step 1: `200 Product created`. Assertion "new products stored by the request": expected 0, received 1 – stored with `name` `null`. Same on the three browsers |
| Evidence | [report entry DT-12-api](screenshots/product-crud_DT-12-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #21 (HW02 BUG-21, fC/DT-12): none – same behaviour |
| Tracker | comment on [#21](https://github.com/angquoc/software-testing-2026-HW02-group/issues/21) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #21) |

### BUG-22

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API saves a price that is not a number (`"abc"`) |
| Requirement | `eshop-sut/README.md:196` FR-15 "Giá: bắt buộc, phải là số **dương** (> 0)." |
| Found by | `tests/product-crud/api.spec.ts` › DT-14, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request |
| Steps to reproduce | 1. `POST /api/products` (admin JWT) with the nominal body and `"price":"abc"`<br>2. `GET /api/products` |
| Test data | `price` `"abc"` (EC-V4-4) |
| Expected | Refused: no new product (HW02 A5) |
| Actual | Step 1: `200 Product created`. Assertion: expected 0 new products, received 1 – stored with price `"abc"`. The Web part (`web.spec.ts` › DT-14) passes on the three browsers: the number field does not take `abc`. Same on the three browsers |
| Evidence | [report entry DT-14-api](screenshots/product-crud_DT-14-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #22 (HW02 BUG-22, fC/DT-14): none – same behaviour; the Admin web field blocks `abc` (Web part passes) |
| Tracker | comment on [#22](https://github.com/angquoc/software-testing-2026-HW02-group/issues/22) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / High (from #22) |

### BUG-23

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API saves a product with no category (`category_id` missing → `null`) |
| Requirement | `eshop-sut/README.md:197` FR-15 "Danh mục: bắt buộc, phải chọn từ danh sách có sẵn." |
| Found by | `tests/product-crud/api.spec.ts` › DT-17, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request |
| Steps to reproduce | 1. `POST /api/products` (admin JWT) with body `{"name":"Ốp lưng iPhone 15 silicon","price":250000,"description":"Mô tả test","imageUrl":""}`<br>2. `GET /api/products` |
| Test data | No `category_id` key (EC-V5-2) |
| Expected | Refused: no new product (HW02 A7) |
| Actual | Step 1: `200 Product created`. Assertion: expected 0 new products, received 1 – stored with `category_id` `null`. The Web part passes: the list offers exactly the categories of `GET /api/categories`, with no empty choice. Same on the three browsers |
| Evidence | [report entry DT-17-api](screenshots/product-crud_DT-17-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #23 (HW02 BUG-23, fC/DT-17): none – same behaviour |
| Tracker | comment on [#23](https://github.com/angquoc/software-testing-2026-HW02-group/issues/23) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #23) |

### BUG-24

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API saves a category id that never existed (`9999`) |
| Requirement | `eshop-sut/README.md:197` FR-15 "Danh mục: bắt buộc, phải chọn từ danh sách có sẵn." |
| Found by | `tests/product-crud/api.spec.ts` › DT-18, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request |
| Steps to reproduce | 1. `POST /api/products` (admin JWT) with the nominal body and `"category_id":9999`<br>2. `GET /api/products`, `GET /api/categories` |
| Test data | `category_id` `9999` (EC-V5-4) |
| Expected | Refused: no new product; 9999 still not a category (HW02 A7) |
| Actual | Step 1: `200 Product created`. Assertion: expected 0 new products, received 1 – stored with `category_id` 9999. Same on the three browsers |
| Evidence | [report entry DT-18-api](screenshots/product-crud_DT-18-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #24 (HW02 BUG-24, fC/DT-18): none – same behaviour |
| Tracker | comment on [#24](https://github.com/angquoc/software-testing-2026-HW02-group/issues/24) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #24) |

### BUG-25

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API saves a product with an empty name (`""`) |
| Requirement | `eshop-sut/README.md:195` FR-15 "Tên sản phẩm: bắt buộc, tối đa 255 ký tự." |
| Found by | `tests/product-crud/api.spec.ts` › DT-09, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request |
| Steps to reproduce | 1. `POST /api/products` (admin JWT) with the nominal body and `"name":""`<br>2. `GET /api/products` |
| Test data | `name` `""` (EC-V3-2) |
| Expected | Refused: no new product (HW02 A3) |
| Actual | Step 1: `200 Product created`. Assertion: expected 0 new products, received 1 – stored with name `""`. The Web part (`web.spec.ts` › DT-09) passes: the name field is `required` and the form is not sent. Same on the three browsers |
| Evidence | [report entry DT-09-api](screenshots/product-crud_DT-09-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #25 (HW02 BUG-25, fC/DT-09): none – same behaviour; the Admin web blocks the empty name (Web part passes) |
| Tracker | comment on [#25](https://github.com/angquoc/software-testing-2026-HW02-group/issues/25) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #25) |

### BUG-26

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A name longer than 255 characters (300 × `X`) is saved, through the Admin web |
| Requirement | `eshop-sut/README.md:195` FR-15 "Tên sản phẩm: bắt buộc, tối đa 255 ký tự." |
| Found by | `tests/product-crud/web.spec.ts` › DT-10, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": name = `X` × 300; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products` |
| Test data | Name `X` × 300 (EC-V3-3) |
| Expected | Refused, not saved cut to 255 characters: no new product (HW02 A4, Q3) |
| Actual | `POST /api/products` → `200 Product created`. Assertion "new products stored": expected 0, received 1 – the 300-character name is stored in full. Same on the three browsers |
| Evidence | [failure screenshot DT-10](screenshots/product-crud_DT-10_chromium.png) · [report entry DT-10-web](screenshots/product-crud_DT-10-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #26 (HW02 BUG-26, fC/DT-10): same behaviour; HW04 reaches it on the Admin web form (HW02 sent it through the API): the name field has no length limit |
| Tracker | comment on [#26](https://github.com/angquoc/software-testing-2026-HW02-group/issues/26) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Medium / Medium (from #26) |

### BUG-27

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A name made only of spaces (5 spaces) is saved, through the Admin web |
| Requirement | `eshop-sut/README.md:195` FR-15 "Tên sản phẩm: bắt buộc, tối đa 255 ký tự." |
| Found by | `tests/product-crud/web.spec.ts` › DT-11, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": name = 5 spaces; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products` |
| Test data | Name `"     "` (EC-V3-5) |
| Expected | Refused: no new product (HW02 A3, Q2) |
| Actual | `200 Product created`. Assertion: expected 0 new products, received 1 – stored with name `"     "`. Same on the three browsers |
| Evidence | [failure screenshot DT-11](screenshots/product-crud_DT-11_chromium.png) · [report entry DT-11-web](screenshots/product-crud_DT-11-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #27 (HW02 BUG-27, fC/DT-11): same behaviour; HW04 reaches it on the Admin web (the `required` name field accepts spaces); HW02 used the API |
| Tracker | comment on [#27](https://github.com/angquoc/software-testing-2026-HW02-group/issues/27) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #27) |

### BUG-28

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A negative price (`-50000`) is saved, through the Admin web |
| Requirement | `eshop-sut/README.md:196` FR-15 "Giá: bắt buộc, phải là số **dương** (> 0)." |
| Found by | `tests/product-crud/web.spec.ts` › DT-13, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": price = `-50000`; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products` |
| Test data | Price `-50000` (EC-V4-2) |
| Expected | Refused: no new product (HW02 A5) |
| Actual | `200 Product created`. Assertion: expected 0 new products, received 1 – stored with price −50000. Same on the three browsers |
| Evidence | [failure screenshot DT-13](screenshots/product-crud_DT-13_chromium.png) · [report entry DT-13-web](screenshots/product-crud_DT-13-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #28 (HW02 BUG-28, fC/DT-13): same behaviour; HW04 reaches it on the Admin web (the price field has no minimum); HW02 used the API |
| Tracker | comment on [#28](https://github.com/angquoc/software-testing-2026-HW02-group/issues/28) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / High (from #28) |

### BUG-29

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A product with no price is saved (Admin web: empty price field; API: `price` missing) |
| Requirement | `eshop-sut/README.md:196` FR-15 "Giá: bắt buộc, phải là số **dương** (> 0)." |
| Found by | `tests/product-crud/web.spec.ts` and `tests/product-crud/api.spec.ts` › DT-15, rows in `data/product-crud/web.json` and `api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action (Web part); Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request (API part) |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": price field left empty; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products`<br>API: `POST /api/products` (admin JWT) with the nominal body without `price`, then `GET /api/products` |
| Test data | Web: price field empty · API: no `price` key (EC-V4-5) |
| Expected | Refused: no new product (HW02 A5) |
| Actual | Both parts `200 Product created`. Assertion: expected 0 new products, received 1 – Web part stored with price `""`, API part with price `null`. Same on the three browsers |
| Evidence | [failure screenshot DT-15](screenshots/product-crud_DT-15_chromium.png) · [report entry DT-15-web](screenshots/product-crud_DT-15-web_report_chromium.png) · [report entry DT-15-api](screenshots/product-crud_DT-15-api_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #29 (HW02 BUG-29, fC/DT-15): API part as in HW02; new in HW04: the Admin web also saves a product with the price field left empty (stored `""`) |
| Tracker | comment on [#29](https://github.com/angquoc/software-testing-2026-HW02-group/issues/29) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / High (from #29) |

### BUG-30

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A price with a fractional part (`250000.5`) is saved, through the Admin web and the API |
| Requirement | `eshop-sut/README.md:196` FR-15 "Giá: bắt buộc, phải là số **dương** (> 0)." |
| Found by | `tests/product-crud/web.spec.ts` and `tests/product-crud/api.spec.ts` › DT-16, rows in `data/product-crud/web.json` and `api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action (Web part); Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request (API part) |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": price = `250000.5`; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products`<br>API: `POST /api/products` (admin JWT) with the nominal body and `"price":250000.5` |
| Test data | Price `250000.5` (EC-V4-7) |
| Expected | Refused: no new product (HW02 A6, Q4: whole đồng) |
| Actual | Both parts `200 Product created`. Assertion: expected 0 new products, received 1 – stored with price 250000.5. Same on the three browsers |
| Evidence | [failure screenshot DT-16](screenshots/product-crud_DT-16_chromium.png) · [report entry DT-16-web](screenshots/product-crud_DT-16-web_report_chromium.png) · [report entry DT-16-api](screenshots/product-crud_DT-16-api_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #30 (HW02 BUG-30, fC/DT-16): API part as in HW02; new in HW04: the Admin web sends `250000.5` too (the number field marks it invalid only until the next field is filled) |
| Tracker | comment on [#30](https://github.com/angquoc/software-testing-2026-HW02-group/issues/30) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Medium / Medium (from #30) |

### BUG-31

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Add product API saves the id of a deleted category |
| Requirement | `eshop-sut/README.md:197` FR-15 "Danh mục: bắt buộc, phải chọn từ danh sách có sẵn." |
| Found by | `tests/product-crud/api.spec.ts` › DT-19, rows in `data/product-crud/api.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin and user JWT from `POST /api/login` (`admin@eshop.com` / `Admin123!`, `test@eshop.com` / `Test1234!`); products ids 1–5 (seed) read through `GET /api/products` before the request; category C created through `POST /api/categories` (`Danh mục tạm FR-15 <tag>`) and deleted through `DELETE /api/categories/<C>`, no longer listed |
| Steps to reproduce | 1. `POST /api/products` (admin JWT) with the nominal body and `"category_id":<C>`<br>2. `GET /api/products` |
| Test data | `category_id` = the deleted category (EC-V5-5; id 10 in the Chromium run) |
| Expected | Refused: no new product (HW02 A7, Q5) |
| Actual | Step 1: `200 Product created`. Assertion: expected 0 new products, received 1 – stored with the deleted category id. Same on the three browsers |
| Evidence | [report entry DT-19-api](screenshots/product-crud_DT-19-api_report_chromium.png) |
| Outcome | Same requirement sentence and same wrong behaviour as #31 (HW02 BUG-31, fC/DT-19): none – same behaviour (category id 10 instead of 4: categories made by earlier runs) |
| Tracker | comment on [#31](https://github.com/angquoc/software-testing-2026-HW02-group/issues/31) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #31) |

### BUG-32

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Editing a product with a negative price (`-50000`) is saved, through the Admin web |
| Requirement | `eshop-sut/README.md:196` FR-15 "Giá: bắt buộc, phải là số **dương** (> 0)." |
| Found by | `tests/product-crud/web.spec.ts` › DT-22, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action; product P created through the API and shown in the list |
| Steps to reproduce | 1. Admin web: "Sửa" on P's row<br>2. Price `-50000`, other fields unchanged<br>3. "Lưu sản phẩm"<br>4. `GET /api/products` |
| Test data | Price `-50000` on edit (EC-V2-3, V4-2) |
| Expected | Refused: P keeps price 250000 (HW02 A8, A11) |
| Actual | `PUT /api/products/<P>` → `200 Product updated`, `alert` "Cập nhật thành công!". Assertion "P keeps the values read before the edit": expected price 250000, received −50000. Same on the three browsers |
| Evidence | [failure screenshot DT-22](screenshots/product-crud_DT-22_chromium.png) · [report entry DT-22-web](screenshots/product-crud_DT-22-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #32 (HW02 BUG-32, fC/DT-22): same behaviour; HW04 edits on the Admin web ("Sửa"), HW02 used the API |
| Tracker | comment on [#32](https://github.com/angquoc/software-testing-2026-HW02-group/issues/32) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / High (from #32) |

### BUG-33

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Required fields of the add-product form have no `*` (name, price, category) |
| Requirement | `eshop-sut/README.md:252` FR-22 "Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn." |
| Found by | `tests/product-crud/web.spec.ts` › DT-23, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web: tab "Sản phẩm", form "Thêm sản phẩm mới"<br>2. Read the labels of the name, price and category fields |
| Test data | – |
| Expected | Three labels with `*` (name, price, category) |
| Actual | Assertion "labels with * for Tên sản phẩm, Giá tiền, Danh mục": expected 3, received 0 – the form has no `<label>` at all (placeholders only). Same on the three browsers |
| Evidence | [failure screenshot DT-23](screenshots/product-crud_DT-23_chromium.png) · [report entry DT-23-web](screenshots/product-crud_DT-23-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #33 (HW02 BUG-33, fC/DT-23): none – same behaviour |
| Tracker | comment on [#33](https://github.com/angquoc/software-testing-2026-HW02-group/issues/33) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Low / Low (from #33) |

### BUG-34

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] After an edit on the Admin web, every row of the product list shows the edited name |
| Requirement | `eshop-sut/README.md:193` FR-15 "Admin có thể Thêm / Xem / Sửa / Xóa sản phẩm." |
| Found by | `tests/product-crud/web.spec.ts` › DT-24, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web: add `Ốp lưng iPhone 15 silicon <tag>`, 250000, Phụ kiện; read the names of the list<br>2. "Sửa" on its row, name `Ốp lưng iPhone 15 silicon xanh <tag>`, "Lưu sản phẩm" (`alert` "Cập nhật thành công!")<br>3. Read the names of the list; `GET /api/products` |
| Test data | – |
| Expected | Every row shows the name of its own product, as `GET /api/products` (HW02 A12, Q8) |
| Actual | After the add: the list equals `GET /api/products` (passed). After the edit: assertion "list names after the edit = GET /api/products" – all 6 rows show `Ốp lưng iPhone 15 silicon xanh <tag>` with their own prices, while `GET /api/products` has the real names. A reload shows the right names again. Same on the three browsers |
| Evidence | [failure screenshot DT-24](screenshots/product-crud_DT-24_chromium.png) · [report entry DT-24-web](screenshots/product-crud_DT-24-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence as #34 (HW02 BUG-34, fC/DT-24); the behaviour differs: HW02 reported it after an add; HW04 sees the list right after an add and wrong only after an edit. HW02 DT-04 (`Not run`, step 4 masked by this issue) now runs and passes |
| Tracker | comment on [#34](https://github.com/angquoc/software-testing-2026-HW02-group/issues/34) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / Medium (from #34) |

### BUG-35

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] The new row of the product list shows its price without thousand separators (`250000 ₫`) |
| Requirement | `eshop-sut/README.md:193` FR-15 "Admin có thể Thêm / Xem / Sửa / Xóa sản phẩm." |
| Found by | `tests/product-crud/web.spec.ts` › DT-25, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": the nominal values; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products`<br>4. Read the price of the new row |
| Test data | Price `250000` |
| Expected | The new row shows `250.000 ₫` (or `250,000 ₫`) (HW02 A12; FR-21) |
| Actual | Assertion "price with ₫ and thousand separators": expected `/^250[.,]000 ₫$/`, received `250000 ₫`. Same on the three browsers |
| Evidence | [failure screenshot DT-25](screenshots/product-crud_DT-25_chromium.png) · [report entry DT-25-web](screenshots/product-crud_DT-25-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence as #35 (HW02 BUG-35, fC/DT-25); the behaviour differs: HW02 saw "₫" only (no price); HW04 shows the price on the new row, only without thousand separators (the format defect of #36) |
| Tracker | comment on [#35](https://github.com/angquoc/software-testing-2026-HW02-group/issues/35) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Medium / Medium (from #35) |

### BUG-36

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Product list shows prices without thousand separators (`30000000 ₫`) |
| Requirement | `eshop-sut/README.md:246` FR-21 "Luôn dùng ký hiệu `₫` với định dạng phân cách hàng nghìn." |
| Found by | `tests/product-crud/web.spec.ts` › DT-26, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web: tab "Sản phẩm"<br>2. Read the price of the seed rows |
| Test data | Seed prices 30000000 / 28000000 / 45000000 / 6000000 / 4000000 |
| Expected | `30.000.000 ₫` (or `30,000,000 ₫`) and so on |
| Actual | Five soft assertions failed, e.g. expected `/^30[.,]000[.,]000 ₫$/`, received `30000000 ₫`. Same on the three browsers |
| Evidence | [failure screenshot DT-26](screenshots/product-crud_DT-26_chromium.png) · [report entry DT-26-web](screenshots/product-crud_DT-26-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #36 (HW02 BUG-36, fC/DT-26): none – same behaviour |
| Tracker | comment on [#36](https://github.com/angquoc/software-testing-2026-HW02-group/issues/36) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Low / Low (from #36) |

### BUG-37

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] Product list has no category column |
| Requirement | `eshop-sut/README.md:193` FR-15 "Admin có thể Thêm / Xem / Sửa / Xóa sản phẩm." |
| Found by | `tests/product-crud/web.spec.ts` › DT-27, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": the nominal values; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products`<br>4. Read the new row |
| Test data | Category "Phụ kiện" |
| Expected | The new row shows its category `Phụ kiện` (HW02 A12, Q8) |
| Actual | Assertion "the row shows the category": received `<name>250000 ₫SửaXóa` – columns "Ảnh", "Tên SP", "Giá", "Hành động" only. Same on the three browsers |
| Evidence | [failure screenshot DT-27](screenshots/product-crud_DT-27_chromium.png) · [report entry DT-27-web](screenshots/product-crud_DT-27-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #37 (HW02 BUG-37, fC/DT-27): none – same behaviour |
| Tracker | comment on [#37](https://github.com/angquoc/software-testing-2026-HW02-group/issues/37) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Low / Low (from #37) |

### BUG-38

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A name of 256 characters (`Ố` × 256) is saved, through the Admin web |
| Requirement | `eshop-sut/README.md:195` FR-15 "Tên sản phẩm: bắt buộc, tối đa 255 ký tự." |
| Found by | `tests/product-crud/web.spec.ts` › BVA-05, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": name = `Ố` (U+1ED0) × 256; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products` |
| Test data | Name `Ố` × 256 (B1 UB+1) |
| Expected | Refused, not saved cut: no new product (HW02 A4, Q3) |
| Actual | `200 Product created`. Assertion: expected 0 new products, received 1 – the 256-character name is stored. Same on the three browsers |
| Evidence | [failure screenshot BVA-05](screenshots/product-crud_BVA-05_chromium.png) · [report entry BVA-05-web](screenshots/product-crud_BVA-05-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #38 (HW02 BUG-38, fC/BVA-05): same behaviour; HW04 types the value on the Admin web, HW02 sent it through the API |
| Tracker | comment on [#38](https://github.com/angquoc/software-testing-2026-HW02-group/issues/38) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | Medium / Medium (from #38) |

### BUG-39

| Field | Value |
| --- | --- |
| Title | [23120046][FR-15][Admin] A price of 0 is saved, through the Admin web |
| Requirement | `eshop-sut/README.md:196` FR-15 "Giá: bắt buộc, phải là số **dương** (> 0)." |
| Found by | `tests/product-crud/web.spec.ts` › BVA-06, rows in `data/product-crud/web.json`; T6 run 18/11/2026: Chromium `2026-11-17T19:15:21.038Z`, Firefox `…19:16:40.213Z`, WebKit `…19:18:38.884Z` (reports `reports/product-crud/<browser>/index.html`; specs at a278a51) |
| Browsers | Chromium 156.0.8078.4 ✗ · Firefox 157.0 ✗ · WebKit 27.2 ✗ (Playwright 1.64.1) |
| Preconditions | Admin web http://localhost:5174 logged in as `admin@eshop.com` / `Admin123!`, tab "Sản phẩm"; products ids 1–5 (seed) read through `GET /api/products` before the action |
| Steps to reproduce | 1. Admin web, form "Thêm sản phẩm mới": price = `0`; other fields as the nominal values<br>2. Click "Lưu sản phẩm"<br>3. `GET /api/products` |
| Test data | Price `0` (B2 LB−1) |
| Expected | Refused: no new product (HW02 A5) |
| Actual | `200 Product created`. Assertion: expected 0 new products, received 1 – stored with price 0. Same on the three browsers |
| Evidence | [failure screenshot BVA-06](screenshots/product-crud_BVA-06_chromium.png) · [report entry BVA-06-web](screenshots/product-crud_BVA-06-web_report_chromium.png) · Firefox / WebKit: `reports/product-crud/<browser>/screenshots/<TC ID>.png` |
| Outcome | Same requirement sentence and same wrong behaviour as #39 (HW02 BUG-39, fC/BVA-06): same behaviour; HW04 types the value on the Admin web, HW02 sent it through the API |
| Tracker | comment on [#39](https://github.com/angquoc/software-testing-2026-HW02-group/issues/39) – drafted 18/11/2026, not sent (waiting for the student's OK) |
| Severity / Priority | High / High (from #39) |
