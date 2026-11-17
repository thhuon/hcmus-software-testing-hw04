# HW04 – Bug Report (automated tests)

| Field | Value |
| --- | --- |
| SUT | EShop @ commit 85af3ba (`eshop-sut`) |
| Issue tracker | [angquoc/software-testing-2026-HW02-group](https://github.com/angquoc/software-testing-2026-HW02-group/issues) – rules: group README §4 (template, title, labels) and §6 (HW04: comment on HW02 issues, new issues with label `hw: HW04`) |
| Earlier bug reports matched | HW02 `bugs/BUG_REPORT.md` (BUG-01 … BUG-41 = issues #1 … #41) |
| Reporter | HỒ THÙY HƯƠNG – 23120046 |
| Count | Bugs: 1 · Confirmed: 0 · Changed: 0 · New: 1 |

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
