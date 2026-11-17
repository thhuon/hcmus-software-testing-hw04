# FR-08 Thanh toán (Checkout): automation design

| Field | Value |
| --- | --- |
| Requirement | FR-08 – `eshop-sut/README.md` lines 102–108 |
| Designed test cases | `../week02/features/fB-pool-B/02_domain_testing.md` (13 TC), `03_boundary_value_analysis.md` (4 TC) |
| Screens / URLs | Web – Giỏ hàng `http://localhost:5173/cart` → Thanh toán `http://localhost:5173/checkout` |
| Specs · page objects · API client · data | `tests/checkout/` · `page-objects/` · `api/` · `data/checkout/` |
| Count | Designed: 17 · Automated: 17 · Not automated: 0 · Assertion patterns: 0 |
| Prompt log entries | Prompt016 (T1) · Prompt017 (T1 decisions, T2 locators) · Prompt018 (T2 page objects, BUG-01) · Prompt019 (BUG-01 filing, T3) |

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
| DT-07 | DT | EC-V2-2 (empty cart) | logged in, empty cart; API body `{"shipping_address": "123 Le Loi, TP.HCM"}` | 2. empty-cart state, no order can be placed (FR-07 "Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.") · 3. refused, error status recorded · 4. still N orders · 5. still no line | Yes (Web + API, student 17/11): step 2 on the cart page and by the typed URL `/checkout` ("Xác Nhận Thanh Toán" must not place an order), then steps 3–5 through the API. The student counts an accepted empty-cart checkout as a bug (A6, Q4), replacing the HW02 Pass (Prompt065) | – | web/DT-07, api/DT-07 |
| DT-08 | DT | EC-V4-2 (cart line with a client price) | cart line Bàn phím cơ Keychron Q1 × 3 with `price` 1000 through `POST /api/cart`; body `{"shipping_address": "123 Le Loi, TP.HCM"}` | 2. accepted · 3. N + 1; the new order `pending`, `total_amount` 12000000 = 4,000,000 × 3 at the catalog price; 3000 = Fail · 4. no line | Yes (API): the Web sends the catalog price | – | api/DT-08 |
| DT-09 | DT | EC-V5-3 (`total_amount` lower than the server total) | cart 3 / 4 / 3; `total_amount` `1000` | 2–4. either accepted: N + 1, the new order `pending` with `total_amount` 126000000, cart empty; or refused: error status recorded, still N orders, cart unchanged (FR-08 "không chấp nhận giá trị `total_amount` do client gửi lên"). A new order with any other total = Fail | Yes (API): the value is sent in the body; the editable Web total is checked by DT-01 | – | api/DT-09 |
| DT-10 | DT | EC-V5-4 (higher) | cart 3 / 4 / 3; `total_amount` `200000000` | as DT-09 | Yes (API): as DT-09 | – | api/DT-10 |
| DT-11 | DT | EC-V5-5 (zero) | cart 3 / 4 / 3; `total_amount` `0` | as DT-09 | Yes (API): as DT-09 | – | api/DT-11 |
| DT-12 | DT | EC-V5-6 (negative) | cart 3 / 4 / 3; `total_amount` `-1000` | as DT-09 | Yes (API): as DT-09 | – | api/DT-12 |
| DT-13 | DT | EC-V5-7 (not a number) | cart 3 / 4 / 3; `total_amount` `"abc"` | as DT-09 | Yes (API): the number field of the Web cannot hold `abc` | – | api/DT-13 |
| BVA-01 | BVA | B1 LB (number of cart lines) | 1 line: Bàn phím cơ Keychron Q1 × 3 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 12000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web, student 17/11; HW02 ran it through the API): cart built on the product pages, checked on the checkout page, the cart page and the stored order (API) | – | web/BVA-01 |
| BVA-02 | BVA | B1 LB+1 | 2 lines: Bàn phím cơ Keychron Q1 × 3, Tai nghe AirPods Pro 2 × 4 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 36000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web, student 17/11): as BVA-01 | – | web/BVA-02 |
| BVA-03 | BVA | B2 LB (quantity of one line) | Bàn phím cơ Keychron Q1 × 1, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 118000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web, student 17/11): as BVA-01 | – | web/BVA-03 |
| BVA-04 | BVA | B2 LB+1 | Bàn phím cơ Keychron Q1 × 2, Tai nghe AirPods Pro 2 × 4, iPhone 15 Pro Max × 3 | 2. accepted · 3. N + 1 orders; the new one `pending`, `total_amount` 122000000 · 4. no line (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.") | Yes (Web, student 17/11): as BVA-01 | – | web/BVA-04 |

**Selection count (confirmed by the student, 17/11):** 17 test cases · 17 automated (7 Web: DT-01, 03, 07 (also through the API), BVA-01 … 04; 10 API only: DT-02, 04, 05, 06, 08, 09 … 13) · 0 not automated. Valid: DT-01, 02, 08 · invalid: DT-03 … 07, 09 … 13 · boundary: BVA-01 … 04. HW02 has no FR-08 TC that needs a human judgement, an external system or real waiting time; no two TCs share a partition and an oracle.

**Student decisions (17/11):** DT-03 tries both guest paths in one test · DT-07 automated in full; the accepted empty-cart checkout is a bug (new issue, `bugs/BUG_REPORT.md`) · BVA-01 … 04 run on the Web: only there do the boundary lines and quantities decide the stored total (the backend stores the `total_amount` it receives and ignores the cart, so through the API the test would read back the total it sent).

**Notes for T2–T4** (from `frontend-web/src/pages/Cart.jsx`, `Checkout.jsx`, `context/CartContext.jsx` and `backend/server.js`, read to judge what a test can observe):

- The Web cart lives only in the page's memory (React state): the Web never calls `POST /api/cart`, a reload empties it, and `GET /api/cart` does not show it. On the Web the cart is checked on the cart page and the badge (DT-01 step 6, BVA step 4), not through `GET /api/cart`.
- The server cart (`GET /api/cart`) is a list in the server's memory per user id, never emptied by the checkout (HW02 BUG-14) and only reset by a server restart. The checkout saves the `total_amount` of the request and ignores the cart (BUG-12, BUG-13). For T3: one new account per test (`POST /api/register`) gives an empty cart and 0 orders, so N = 0 and no restart is needed between tests (to confirm in T3).
- The Web checkout page has no address field and sends no `shipping_address`; DT-01's address has nothing to be typed into. The total is an `<input type="number">` that the user can edit, and the edited value is sent (BUG-15). No breadcrumb (BUG-16).
- A guest who clicks "Tiến hành thanh toán" gets an `alert` and the login page; `/checkout` has no route guard and sends the request without a token. DT-03 tries both paths in one test (student decision 17/11).
- DT-09 … 13 allow two outcomes. T4 must state the oracle without an `if` on the result, e.g. "no new order has a total other than 126000000" and "cart lines = 0 if one new order, else 3".

## 2. Locators and page objects (T2)

**How the locators were found:** codegen by the student (Đăng nhập → home → Giỏ hàng → Thanh toán → success; see "Codegen check" at the end of this section), then an ARIA snapshot (`page.locator('body').ariaSnapshot()`) of every FR-08 screen of the running Web app and every locator counted on the live page on Chromium 156.0.8078.4, Firefox 157.0 and WebKit 27.2 (exploration script in the agent's scratchpad, 17/11; each test account new, `fr08.t2.<browser>.<time>@test.local`). Counts were the same on the three browsers.

Page objects: `page-objects/SiteHeader.ts`, `LoginPage.ts` (extended: fields and `login()`), `HomePage.ts`, `ProductPage.ts`, `CartPage.ts`, `CheckoutPage.ts`, `Dialogs.ts` (records every `alert`); API client `api/EshopApi.ts` (extended: `getCart`, `addToCart`, `checkout` with any or no `Authorization` header, `myOrders`, `adminOrders`). No `expect` in `page-objects/` or `api/`.

**Check through the page objects** (temporary spec, not kept; 17/11, Chromium, Firefox, WebKit, 3 passed): login form → three product pages (Keychron × 3, AirPods × 4, iPhone × 3; `addToCart` needed 2 clicks every time on every browser) → cart (3 lines) → checkout (3 items, total field `126000000`, text `Tổng thanh toán: 126,000,000 ₫`; address 0, breadcrumb 0) → `confirm()` 200 → success heading → order `total_amount` 126000000 through `myOrders`; cart page by URL (empty heading, no checkout button) → checkout by URL → `confirm()` 200, order 0 ₫; logout → guest: home `addOne` → cart → "Tiến hành thanh toán" → login page → checkout by URL → `confirm()` 401; `Dialogs` recorded "Bạn cần đăng nhập để thanh toán!", "Lỗi khi thanh toán: Unauthorized". Every locator matched 1 element (0 for address and breadcrumb).

| Screen | Element | Locator | Why this locator |
| --- | --- | --- | --- |
| Header (every page) | "Giỏ hàng" link | `getByRole('link', { name: 'Giỏ hàng' })` | Role + name; 1 match. The only way to reach the cart without a reload (see findings) |
| Header | "Thoát" button (logged in) / "Đăng nhập" link (guest) | `getByRole('button', { name: 'Thoát' })` / `getByRole('link', { name: 'Đăng nhập' })` | Role + name; shows whether the Web treats the user as logged in (DT-03) |
| Header | "EShop" link (home) | `getByRole('link', { name: 'EShop' })` | Role + name; back to the home page without a reload |
| Header | Cart badge | – | Does not exist (0 elements; group issue #79). DT-01 step 6 checks the cart page instead |
| Đăng nhập `/login` | "Username" field | `form.locator('div').filter({ has: locator('label').filter({ hasText: /^Username/ }) }).getByRole('textbox')` | No accessible name (label not linked). Same pattern as FR-03 (option (b), label prefix, student decision 17/11); 1 match. Codegen: `getByRole('textbox').first()` |
| Đăng nhập | "Mật khẩu" field | same pattern with `/^Mật khẩu/` | As above; 1 match. Codegen: `getByRole('textbox').nth(1)` |
| Đăng nhập | "Sign In" button | `getByRole('button', { name: 'Sign In' })` | Role + name (already in `LoginPage.ts`). Codegen pressed Enter instead |
| Trang chủ `/` | Page heading | `getByRole('heading', { name: 'Danh sách sản phẩm', level: 1 })` | Role + name; the page is ready when it and the first product heading are visible |
| Trang chủ | Product card of a product | `locator('div:has(> h2)').filter({ has: getByRole('heading', { name: <product>, exact: true }) })` | The card has no role and no name; fallback: the `div` whose own child is a product heading, filtered by the product name (1 match per product). Codegen: `getByRole('button', { name: 'Thêm vào giỏ' }).nth(1)` / `.first()` = by position, changes when the product order changes (5 products today) |
| Trang chủ | "Xem chi tiết" link of a card | `card.getByRole('link', { name: 'Xem chi tiết' })` | Role + name inside the card; 1 match. Opens the product page without a reload |
| Trang chủ | "Thêm vào giỏ" button of a card | `card.getByRole('button', { name: 'Thêm vào giỏ' })` | Role + name inside the card; adds 1 piece (DT-03 guest cart) |
| Chi tiết sản phẩm `/product/:id` | Product heading | `getByRole('heading', { name: <product>, level: 1 })` | Role + name; the page is ready |
| Chi tiết sản phẩm | "Số lượng" field | `locator('div').filter({ has: locator('label').filter({ hasText: /^Số lượng/ }) }).getByRole('spinbutton')` | No accessible name (`getByLabel('Số lượng')` = 0); label prefix as on Đăng nhập; 1 match. `getByRole('spinbutton')` alone also gives 1 today |
| Chi tiết sản phẩm | "Thêm vào giỏ hàng" button | `getByRole('button', { name: 'Thêm vào giỏ hàng' })` | Role + name; 1 match. The first click adds nothing (group issue #73); the second adds and the button reads "Đã thêm" for 2 s |
| Chi tiết sản phẩm | "Đã thêm" feedback | `getByRole('button', { name: 'Đã thêm' })` | The button's own text after a successful add; the action waits for it before moving on |
| Giỏ hàng `/cart` | Page heading | `getByRole('heading', { name: 'Giỏ Hàng', level: 2 })` | Role + name |
| Giỏ hàng | Line of a product | `getByRole('row').filter({ has: getByRole('cell', { name: <product>, exact: true }) })` | Table row with the product cell; 1 match per line. Cells in column order: Sản phẩm, Giá, Số lượng, Thành tiền, Thao tác |
| Giỏ hàng | All product lines | `getByRole('row').filter({ has: getByRole('cell') })` | Rows that have data cells; the header row has only column headers, so it is left out without a position. Count = number of lines |
| Giỏ hàng | "Tiến hành thanh toán" button | `getByRole('button', { name: 'Tiến hành thanh toán' })` | Role + name; same as codegen |
| Giỏ hàng (empty) | Empty-cart message | `getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' })` | Role + name; the FR-07 "thông báo rõ ràng". No image (0 `img`, group issue #80) |
| Giỏ hàng (empty) | Empty-cart illustration (FR-07 "hình minh họa") | `getByRole('main').locator('img, svg')` | Added in T4 for DT-07 (student 17/11: keep the TC as it is). A decorative image has `alt=""` and no `img` role, so it is found by element type inside the `main` landmark. 0 today (group issue #80) |
| Giỏ hàng (empty) | "Tiếp tục mua sắm" link | `getByRole('link', { name: 'Tiếp tục mua sắm' })` | Role + name |
| Thanh toán `/checkout` | Page heading | `getByRole('heading', { name: 'Xác Nhận Đơn Hàng', level: 2 })` | Role + name |
| Thanh toán | Product list items | `getByRole('main').getByRole('listitem')` | One item per line, text `<name> x <qty> — <amount> ₫`; count = lines (FR-08 "danh sách sản phẩm đặt mua") |
| Thanh toán | Total field "Tổng tiền thanh toán (VND)" | `locator('div').filter({ has: locator('label').filter({ hasText: /^Tổng tiền thanh toán/ }) }).getByRole('spinbutton')` | No accessible name; label prefix; 1 match. An editable number input (HW02 BUG-15): DT-01 checks that it cannot be typed into |
| Thanh toán | Total text "Tổng thanh toán: …" | `getByText(/^Tổng thanh toán:/)` | Fixed prefix; the amount changes with the cart. Shown as `12,000,000 ₫` on all three browsers (default locale en-US) |
| Thanh toán | Address field | `getByRole('textbox', { name: /địa chỉ/i })` | Does not exist (0): the page sends no `shipping_address`; kept only to show the absence in DT-01 |
| Thanh toán | Breadcrumb | `getByRole('navigation', { name: /breadcrumb/i })` | FR-23 "Breadcrumb bắt buộc có ở các trang con (Giỏ hàng, Thanh toán, Chi tiết sản phẩm)"; the usual pattern is a `nav` named "Breadcrumb". 0 today (HW02 BUG-16) |
| Thanh toán | "Xác Nhận Thanh Toán" button | `getByRole('button', { name: 'Xác Nhận Thanh Toán' })` | Role + name; same as codegen |
| Thanh toán | Coupon field | `getByRole('textbox', { name: 'Nhập mã giảm giá...' })` | Name from the placeholder; FR-09, not used by FR-08 tests |
| Thanh toán thành công | Heading "Thanh toán thành công!" | `getByRole('heading', { name: 'Thanh toán thành công!' })` | Role + name; the Web's "accepted" |
| Thanh toán thành công | "Quay lại trang chủ" button | `getByRole('button', { name: 'Quay lại trang chủ' })` | Role + name; same as codegen |
| Every page | `alert` messages | `page.on('dialog')` → `dialogMessages[]` | Guest: "Bạn cần đăng nhập để thanh toán!" (cart button) and "Lỗi khi thanh toán: Unauthorized" (typed `/checkout`); a failed checkout also uses `alert`. The page object records the text and accepts the dialog |
| – (response) | `POST /api/checkout` | `page.waitForResponse(r => r.url().endsWith('/api/checkout'))` | Request body and status the Web sent: logged in `{"items": […], "total_amount": 12000000, "coupon_id": null}` → 200 |

Testability findings (elements without an accessible name, unstable text, behaviour that changes how the tests are built):

- **No input has an accessible name** (Đăng nhập, "Số lượng", "Tổng tiền thanh toán"): labels without `for`; every field is still found by its label prefix. Product cards have no role or name, so the card is found by its heading (CSS structure fallback).
- **The Web cart lives in the page's memory:** a reload (`page.goto`) empties it (group issue #74). After adding products, a test reaches the cart and the checkout only through links and buttons, never by URL. `page.goto('/checkout')` is used only where an empty cart is wanted (DT-03 path (b), DT-07).
- **The URL changes before the page is drawn:** on Chromium, right after clicking "Giỏ hàng" on the success page the URL was `/cart` while the success heading was still shown. Wait for the page heading, not for the URL.
- **"Thêm vào giỏ hàng" needs two clicks** (group issue #73, FR-07, not FR-08). The Web tests need quantities above 1 (DT-01, BVA), which only the product page offers; the home button adds a new line of 1 per click (group issue #70). Student decision 17/11: `ProductPage.addToCart(qty)` clicks until the button reads "Đã thêm", at most twice, and returns the number of clicks; the spec records a second click as an annotation linking #73, so the defect stays visible in the report.
- **No cart badge** (group issue #79): DT-01 step 6 "the badge no longer shows the old count" cannot be checked; the cart page is checked instead.
- **Seen on the way, for T7 (not judged here):** after a Web checkout the cart page still shows the line (3 browsers; HW02 BUG-14). A guest is refused on both DT-03 paths and no order is created (3 browsers), also after "Thoát" from a logged-in session; HW02 BUG-17 reported that a guest could check out. A logged-in user with an empty cart who types `/checkout` sees an empty list, total 0 and an enabled "Xác Nhận Thanh Toán"; the click sends `{"items": [], "total_amount": 0, "coupon_id": null}` → 200, the success heading shows and an order with `total_amount` 0 is stored (3 browsers; BUG-01 [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116); screenshots [empty checkout page](../../bugs/screenshots/DT-07_empty-checkout_chromium.png), [after the click](../../bugs/screenshots/DT-07_empty-checkout-success_chromium.png)).
- **Checkout page of a normal cart** (DT-01 cart 3 / 4 / 3, Chromium, 17/11 20:2x): [as opened](screenshots/DT-01-checkout-page-chromium.png) – list of three items, editable total field `126000000`, no address field, no breadcrumb; [after typing `1000` into the total](screenshots/DT-01-total-edited-chromium.png) – "Tổng thanh toán: 1,000 ₫", the amount the Web would send (HW02 BUG-15).

**Codegen check (student, by hand).** `npm run sut`, then `npm run codegen`; recorded: home → "Thêm vào giỏ" × 2 → "Giỏ hàng" → "Tiến hành thanh toán" (guest `alert`, login page) → Đăng nhập → "Giỏ hàng" → "Tiến hành thanh toán" → coupon field → "Xác Nhận Thanh Toán" → "Quay lại trang chủ". Date / browser: 17/11/26 - Firefox (as FR-03, student 17/11).

| Element | Locator codegen picked (copied from the codegen window) | Same as the table above? | If not: which is better, and why (one line) |
| --- | --- | --- | --- |
| Home "Thêm vào giỏ" (two products) | `page.getByRole('button', { name: 'Thêm vào giỏ' }).nth(1)`, `.first()` | No | The card's button filtered by the product heading: `.nth(1)` picks whatever product is second, and the order of the 5 products is data |
| "Giỏ hàng" link | `page.getByRole('link', { name: 'Giỏ hàng' })` | Yes | |
| Guest `alert` | `page.once('dialog', dialog => { … dialog.dismiss() })` | Same mechanism | `page.on('dialog')` that keeps every message: the guest path (b) raises a second dialog that `once` does not catch, and the test needs the text |
| "Tiến hành thanh toán" button | `page.getByRole('button', { name: 'Tiến hành thanh toán' })` | Yes | |
| Đăng nhập "Username" field | `page.getByRole('textbox').first()` | No | The label-prefix locator: `.first()` breaks when another textbox is added above it, and it does not say which field it is |
| Đăng nhập "Mật khẩu" field | `page.getByRole('textbox').nth(1)` | No | As above |
| "Sign In" button | Not captured (Enter pressed in the password field) | No | `getByRole('button', { name: 'Sign In' })`: the test clicks what the user sees |
| Coupon field | `page.getByRole('textbox', { name: 'Nhập mã giảm giá' })` | Yes (substring of the name "Nhập mã giảm giá...") | Not used by FR-08 |
| "Xác Nhận Thanh Toán" button | `page.getByRole('button', { name: 'Xác Nhận Thanh Toán' })` | Yes | |
| "Quay lại trang chủ" button | `page.getByRole('button', { name: 'Quay lại trang chủ' })` | Yes | |
| Product page, cart lines, checkout list and total, success heading | Not captured (codegen records actions, not the elements a test reads) | – | From the ARIA snapshot (table above) |

Conclusion (one sentence, student): Playwright Codegen provides useful initial locators, but some generated locators rely on element positions and are not sufficiently stable, so I compared them with the ARIA snapshot and selected more specific role-based or label-based locators to improve test reliability and maintainability.

The comparisons in the last column were proposed by the agent and accepted by the student (17/11).

**T2 status (17/11):** codegen check done by the student; decisions applied; page objects and API client written and checked on the three browsers.

## 3. Test data (T3)

Inputs are the HW02 test-case values (§1); expected values come from FR-08, FR-07, FR-23, SEC-02 and the HW02 assumptions A1–A15 with the decisions Q1–Q10 approved by the student on 20/10 (`../week02/features/fB-pool-B/01_test_basis.md` §4–§5), never from the running app. Product ids and catalog prices: seed script `eshop-sut/backend/database.js:98-102` (HW02 fixture F2). Every expected total was recomputed from them (catalog price × quantity, A3): 126,000,000 · 12,000,000 · 36,000,000 · 118,000,000 · 122,000,000 ₫.

| File | Rows | Columns | Data reset / uniqueness |
| --- | --- | --- | --- |
| `data/checkout/web.json` | 7 (`web/<ID>` of §1: DT-01, DT-03, DT-07, BVA-01 … 04) | file level: `accountEmail`, `accountPassword`, `admin` (SRS §1 seed admin, for the all-orders count), `products` (id, name, catalog price); rows: `id`, `technique`, `title`, `partition`, `flow` (`checkout`, `guest`, `emptyCart`), `loggedIn`, `cart` (product key + quantity, added on the product pages in this order), `paths` (DT-03), `address`; `expected` (`kind`: `accepted` / `refused`; `items`, `totalText`, `totalEditable`, `breadcrumb`, `newOrders`, `newOrdersAll`, `orderStatus`, `orderTotal`, `cartEmptyAfter`, `emptyState`, `checkoutButton`, `recordOnly`); `source`. DT-07's API part (steps 3–5) is the row `api/DT-07` | Every logged-in row registers its own account through the API before the test (`POST /api/register`, as FR-03): `fr08.{id}.{run}@example.com` with `{run}` = start time of the run + browser, so no two tests, browsers or runs share an account, a cart or an order list. A new account has an empty server cart and 0 orders, so "N orders before" is 0 and no backend restart is needed (HW02 fixtures F4, F6 replaced). The Web cart starts empty because each test opens a new page |
| `data/checkout/api.json` | 11 (`api/<ID>`: DT-02, DT-04 … 06, DT-07 API part, DT-08, DT-09 … 13) | file level as above; rows: `id`, `technique`, `title`, `partition`, `flow`, `cart` (lines sent with `POST /api/cart`; `price` only where the TC sends a client price: DT-08), `authorization` (`"user"` = the account's JWT, `null` = no header, other strings sent as the header value: DT-05 forged token, DT-06 `Bearer abc`), `body` of `POST /api/checkout`; `expected` (`kind`: `accepted` / `refused` / `serverTotalOrRefused`; `newOrders`, `newOrdersAll`, `orderStatus`, `orderTotal`, `serverTotal`, `cartLinesBefore`, `serverCartLinesAfter`); `source` | Same rule; the server cart of the new account is built with `POST /api/cart` at catalog prices (HW02 fixture F11 / F12), so the cart cannot hold lines from another test (it is never emptied, BUG-14) |

Changes against the HW02 inputs (as FR-03, student 17/11): a new account per test instead of `test@eshop.com` (same partition EC-V1-1 "logged in"; keeps the tests independent). DT-05 keeps the HW02 forged token literally (its payload names user id 2, the seed user), and DT-03 … 06 count every order through the admin account, as the HW02 TCs do.

How each oracle is read (from the decisions, not from the app):

- **Accepted / refused** (A7, A9, Q1, Q5): accepted = exactly one new order of the account, `pending`, with the server total, and the cart empty afterwards; refused = no new order (own orders, or all orders for the rows without a valid user token) and the cart unchanged. The HTTP status is recorded as an annotation, not asserted (Q1: "the status code is recorded, not judged").
- **DT-09 … 13** (A5, Q2): `serverTotalOrRefused` – either one new order with `total_amount` 126000000 and an empty cart, or no new order and 3 cart lines; a new order with any other total fails.
- **DT-01 page checks** (A10, A11, Q6): every cart line listed by name and quantity; the total shown with `₫` and any thousand separator (`totalText` pattern `126[.,]000[.,]000 ₫`); the total cannot be typed into; a breadcrumb (FR-23). The HW02 address `123 Le Loi, TP.HCM` has no field on the Web page: kept in the data, not typed and not judged (A12, Q7: no class for the address).
- **Cart emptied** (A8): on the Web, the cart page shows the empty-cart state after the checkout; through the API, `GET /api/cart` returns no line. The badge part of A8 cannot be checked: the Web has no badge (group issue #79).
- **DT-03** (A2): what the Web shows a guest (dialog text, URL) is recorded, not judged; only "no new order" is asserted, after each path.

Open expected values (`<CONFIRM>`): none. DT-07 keeps the TC as it is (student 17/11): `emptyState.image` comes from the FR-07 sentence the TC quotes and stays, as a soft assertion next to the order checks; the Web has no image (group issue #80, FR-07, another member's feature), so T7 links DT-07 to #80 as well as to #116.

## 4. Specs and assertion patterns (T4)

Prompt used for generation: see the AI-use log entry of this step (prompt 17/11 19:59 for `web.spec.ts`; `api.spec.ts` in the next prompt). One prompt per spec file; the generated code is committed as it came (`e32f37b`) and is reviewed in T5.

| Spec | TC IDs | Assertion patterns |
| --- | --- | --- |
| `tests/checkout/web.spec.ts` (7 tests: one loop per `flow` of `web.json`) | DT-01, BVA-01 … 04 (`checkout`) | Visible text (`toHaveText` on each list item: name + quantity; `toContainText` on the total, pattern from the data), element state (`toHaveCount` of the list items, of the cart lines), negative (`toHaveCount(0)` of an editable total field), persisted outcome (`expect.poll` on the account's orders, `toMatchObject` status + `total_amount` through the API), soft assertions for the page checks |
| | DT-03 (`guest`) | Persisted outcome (all orders through the admin API, after each path); the dialog text, URL and response status are recorded as annotations, not asserted (A2, Q1) |
| | DT-07 (`emptyCart`, Web part) | Visible state (`toBeVisible` of the empty message and illustration), negative (`toHaveCount(0)` of "Tiến hành thanh toán"), persisted outcome (`toHaveLength(0)` of the account's orders); soft for the page checks |

| Assertion pattern | Used by |
| --- | --- |
| Visible message / text | DT-01 (items, total text), DT-07 (empty-cart message) |
| Element state | DT-01, BVA-01 … 04 (item count, cart lines after the checkout), DT-07 (illustration) |
| Negative assertion | DT-01 (no editable total), DT-07 (no checkout button) |
| Persisted outcome (API) | DT-01, BVA-01 … 04 (new order, status, total), DT-03 (all orders unchanged), DT-07 (no order) |
| Soft assertions | DT-01 page checks, DT-07 page checks |

**First run of the generated Web spec** (agent, 17/11 20:02, Chromium only, `REPORT_DIR` and `--output` in a temporary folder outside the repository so that a parallel session's `playwright-report/` is not overwritten; not an official run, nothing fixed): 1 passed, 6 failed.

| Test | Result | Failed assertions (expected vs received) |
| --- | --- | --- |
| DT-01 | failed | editable total field: expected 0, received 1 (HW02 BUG-15) · breadcrumb: not found (BUG-16) · cart lines after the checkout: expected 0, received 3 (BUG-14). Items, total text and the stored order (`pending`, 126000000) passed. [Screenshot at the end](screenshots/first-run/DT-01-chromium.png) (cart page with the 3 lines); the checkout page: §2 findings |
| BVA-01 … 04 | failed | cart lines after the checkout: expected 0, received 1 / 2 / 3 / 3 (BUG-14); the stored orders (12000000, 36000000, 118000000, 122000000, `pending`) passed. Screenshots: [BVA-01](screenshots/first-run/BVA-01-chromium.png), [BVA-02](screenshots/first-run/BVA-02-chromium.png), [BVA-03](screenshots/first-run/BVA-03-chromium.png), [BVA-04](screenshots/first-run/BVA-04-chromium.png) |
| DT-03 | passed | path (a): dialog "Bạn cần đăng nhập để thanh toán!", URL `/login`; path (b): response 401, dialog "Lỗi khi thanh toán: Unauthorized"; all orders unchanged after each path |
| DT-07 | failed | empty-cart illustration: not found (group issue #80) · orders after "Xác Nhận Thanh Toán" on the typed `/checkout`: expected 0, received 1 (order 0 ₫, BUG-01 #116). Empty message and "no checkout button" passed. [Screenshot](screenshots/first-run/DT-07-chromium.png) (success view after the empty checkout) |

Every test that built a cart recorded the second click of "Thêm vào giỏ hàng" (#73). Failure screenshots copied from the run's output to `features/checkout/screenshots/first-run/<TC ID>-chromium.png`; the HTML report of this run is kept locally in `playwright-report/checkout/web-chromium-20261117T2002/` (git-ignored, development run). Triage (product vs script defect) is T7; the review of the generated code is T5.

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
| DT-07 (step 2, typed URL; T2 check, before the spec) | Chromium, Firefox, WebKit | no order can be placed (A6, Q4) vs `POST /api/checkout` `{"items": [], "total_amount": 0}` → 200, order 0 ₫ stored | Product defect (student 17/11) | [BUG-01](../../bugs/BUG_REPORT.md#bug-01) – [#116](https://github.com/angquoc/software-testing-2026-HW02-group/issues/116) |
