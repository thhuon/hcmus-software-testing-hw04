# FR-08 Thanh toán (Checkout): automation design

| Field | Value |
| --- | --- |
| Requirement | FR-08 – `eshop-sut/README.md` lines 102–108 |
| Designed test cases | `../week02/features/fB-pool-B/02_domain_testing.md` (13 TC), `03_boundary_value_analysis.md` (4 TC) |
| Screens / URLs | Web – Giỏ hàng `http://localhost:5173/cart` → Thanh toán `http://localhost:5173/checkout` |
| Specs · page objects · API client · data | `tests/checkout/` · `page-objects/` · `api/` · `data/checkout/` |
| Count | Designed: 17 · Automated: 17 (proposed) · Not automated: 0 · Assertion patterns: 0 |
| Prompt log entries | prompt 17/11 (T1, logged later) |

## 1. Test cases selected (T1)

DT = domain testing (`02_domain_testing.md` §2.2), BVA = boundary value analysis (`03_boundary_value_analysis.md` §2.2). Data row: `web/<ID>` = row of the Web data file, `api/<ID>` = row of the API data file (both created in T3). Expected: the TC's own words and step numbers; left out are the source codes (A#, Q#, R#, D#), the fixture IDs and DT-01's "the screen is recorded (A7)". "Cart 3 / 4 / 3" = Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 at catalog prices = 126,000,000 ₫. Full text in the HW02 files.

| TC ID | Technique | Partition / boundary | Input | Expected (quoted from the TC) | Automate? | Reason if not | Data row |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DT-01 | DT | EC-V1-1, V2-1, V3-1, V4-1, V5-1, O1-1 … O5-1 (all valid) | logged in; Web cart 3 / 4 / 3 built on the product pages; address `123 Le Loi, TP.HCM` | 3. Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 listed; total `126.000.000 ₫` (or `126,000,000 ₫`) shown as text that cannot be typed into (FR-08 "không cho phép người dùng chỉnh sửa trực tiếp"); breadcrumb shown (FR-23) · 4. accepted · 5. N + 1 orders; the new one `pending`, `total_amount` 126000000 · 6. no line; empty-cart state; the badge no longer shows the old count (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web; the stored order read through the API) | – | web/DT-01 |
| DT-02 | DT | EC-V5-2 (`total_amount` missing) | cart 3 / 4 / 3 through `POST /api/cart`; body `{"shipping_address": "123 Le Loi, TP.HCM"}` | 2. accepted · 3. N + 1; the new order `pending`, `total_amount` 126000000 · 4. no line | Yes (API): the Web always sends `total_amount` | – | api/DT-02 |
| DT-03 | DT | EC-V1-2 (guest on the Web) | logged out; Bàn phím cơ Keychron Q1 × 3 in the guest cart if the Web allows it | 2–3. no order is placed; what the Web shows is recorded (FR-08 "Chỉ người dùng **đã đăng nhập** mới tiến hành thanh toán được.") · 4. still M orders (all orders, admin) | Yes (Web; both guest paths in one test, student 17/11: (a) the cart's "Tiến hành thanh toán", (b) the typed URL `/checkout` and "Xác Nhận Thanh Toán"; the order count read through the admin API after each path) | – | web/DT-03 |
| DT-04 | DT | EC-V1-3 (no `Authorization` header) | cart 3 / 4 / 3; body `{"total_amount": 126000000, "shipping_address": "123 Le Loi, TP.HCM"}` | 2. refused, error status recorded (SEC-02 "Các API có tính bảo mật phải yêu cầu JWT Token hợp lệ.") · 3. still M orders · 4. the cart unchanged: 3 lines, 3 / 4 / 3 | Yes (API): the header is part of the request shape; the Web guest is DT-03 | – | api/DT-04 |
| DT-05 | DT | EC-V1-4 (forged token: wrong signature) | `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QGVzaG9wLmNvbSIsInJvbGUiOiJ1c2VyIn0.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`; body as DT-04 | 2. refused, error status recorded (SEC-02) · 3. still M orders · 4. the cart unchanged: 3 lines, 3 / 4 / 3 | Yes (API): the Web cannot send another token | – | api/DT-05 |
| DT-06 | DT | EC-V1-5 (not a JWT) | `Authorization: Bearer abc`; body as DT-04 | 2. refused, error status recorded (SEC-02) · 3. still M orders · 4. the cart unchanged: 3 lines, 3 / 4 / 3 | Yes (API): the Web cannot send another token | – | api/DT-06 |
| DT-07 | DT | EC-V2-2 (empty cart) | logged in, empty cart; API body `{"shipping_address": "123 Le Loi, TP.HCM"}` | 2. empty-cart state, no order can be placed (FR-07 "Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.") · 3. refused, error status recorded · 4. still N orders · 5. still no line | Yes (Web: step 2) (proposed); steps 3–5 (API) left out, decision 1 | – | web/DT-07 |
| DT-08 | DT | EC-V4-2 (cart line with a client price) | cart line Bàn phím cơ Keychron Q1 × 3 with `price` 1000 through `POST /api/cart`; body `{"shipping_address": "123 Le Loi, TP.HCM"}` | 2. accepted · 3. N + 1; the new order `pending`, `total_amount` 12000000 = 4,000,000 × 3 at the catalog price; 3000 = Fail · 4. no line | Yes (API): the Web sends the catalog price | – | api/DT-08 |
| DT-09 | DT | EC-V5-3 (`total_amount` lower than the server total) | cart 3 / 4 / 3; `total_amount` `1000` | 2–4. either accepted: N + 1, the new order `pending` with `total_amount` 126000000, cart empty; or refused: error status recorded, still N orders, cart unchanged (FR-08 "không chấp nhận giá trị `total_amount` do client gửi lên"). A new order with any other total = Fail | Yes (API): the value is sent in the body; the editable Web total is checked by DT-01 | – | api/DT-09 |
| DT-10 | DT | EC-V5-4 (higher) | cart 3 / 4 / 3; `total_amount` `200000000` | as DT-09 | Yes (API): as DT-09 | – | api/DT-10 |
| DT-11 | DT | EC-V5-5 (zero) | cart 3 / 4 / 3; `total_amount` `0` | as DT-09 | Yes (API): as DT-09 | – | api/DT-11 |
| DT-12 | DT | EC-V5-6 (negative) | cart 3 / 4 / 3; `total_amount` `-1000` | as DT-09 | Yes (API): as DT-09 | – | api/DT-12 |
| DT-13 | DT | EC-V5-7 (not a number) | cart 3 / 4 / 3; `total_amount` `"abc"` | as DT-09 | Yes (API): the number field of the Web cannot hold `abc` | – | api/DT-13 |
| BVA-01 | BVA | B1 LB (number of cart lines) | 1 line: Bàn phím cơ Keychron Q1 × 3 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 12000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web) (proposed; HW02 ran it through the API), decision 2 | – | web/BVA-01 |
| BVA-02 | BVA | B1 LB+1 | 2 lines: Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 36000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web) (proposed), decision 2 | – | web/BVA-02 |
| BVA-03 | BVA | B2 LB (quantity of one line) | Bàn phím cơ Keychron Q1 × 1, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 118000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web) (proposed), decision 2 | – | web/BVA-03 |
| BVA-04 | BVA | B2 LB+1 | Bàn phím cơ Keychron Q1 × 2, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 122000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web) (proposed), decision 2 | – | web/BVA-04 |

**Selection count (proposed):** 17 test cases · 17 automated (7 Web: DT-01, 03, 07, BVA-01 … 04; 10 API only: DT-02, 04, 05, 06, 08, 09 … 13) · 0 not automated. Valid: DT-01, 02, 08 · invalid: DT-03 … 07, 09 … 13 · boundary: BVA-01 … 04. HW02 has no FR-08 TC that needs a human judgement, an external system or real waiting time; no two TCs share a partition and an oracle.

**Notes for T2–T4** (from `frontend-web/src/pages/Cart.jsx`, `Checkout.jsx`, `context/CartContext.jsx` and `backend/server.js`, read to judge what a test can observe):

- The Web cart lives only in the page's memory (React state): the Web never calls `POST /api/cart`, a reload empties it, and `GET /api/cart` does not show it. On the Web the cart is checked on the cart page and the badge (DT-01 step 6, BVA step 4), not through `GET /api/cart`.
- The server cart (`GET /api/cart`) is a list in the server's memory per user id, never emptied by the checkout (HW02 BUG-14) and only reset by a server restart. The checkout saves the `total_amount` of the request and ignores the cart (BUG-12, BUG-13). For T3: one new account per test (`POST /api/register`) gives an empty cart and 0 orders, so N = 0 and no restart is needed between tests (to confirm in T3).
- The Web checkout page has no address field and sends no `shipping_address`; DT-01's address has nothing to be typed into. The total is an `<input type="number">` that the user can edit, and the edited value is sent (BUG-15). No breadcrumb (BUG-16).
- A guest who clicks "Tiến hành thanh toán" gets an `alert` and the login page; `/checkout` has no route guard and sends the request without a token. DT-03 tries both paths in one test (student decision 17/11).
- DT-09 … 13 allow two outcomes. T4 must state the oracle without an `if` on the result, e.g. "no new order has a total other than 126000000" and "cart lines = 0 if one new order, else 3".

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
