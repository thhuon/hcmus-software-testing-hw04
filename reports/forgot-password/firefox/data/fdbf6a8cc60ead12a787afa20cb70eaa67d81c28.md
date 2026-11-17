# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: forgot-password/web.spec.ts >> FR-03 forgot & reset password – Web >> DT-12 – OTP of 9 digits is rejected
- Location: tests/forgot-password/web.spec.ts:246:9

# Error details

```
Error: error message in the page, above the submit button (FR-22)

expect(locator).toBeVisible() failed

Locator: getByRole('main').locator('form').locator(':is(p, span, div, [role="alert"]):not(:has(*)):above(button[type="submit"])').filter({ hasNotText: /^Mã OTP của bạn là:|^Bước\s*\d\s*\/\s*\d/ }).filter({ hasText: /\S/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - error message in the page, above the submit button (FR-22) getByRole('main').locator('form').locator(':is(p, span, div, [role="alert"]):not(:has(*)):above(button[type="submit"])').filter({ hasNotText: /^Mã OTP của bạn là:|^Bước\s*\d\s*\/\s*\d/ }).filter({ hasText: /\S/ }) with timeout 5000ms
  - waiting for getByRole('main').locator('form').locator(':is(p, span, div, [role="alert"]):not(:has(*)):above(button[type="submit"])').filter({ hasNotText: /^Mã OTP của bạn là:|^Bước\s*\d\s*\/\s*\d/ }).filter({ hasText: /\S/ })

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Quên Mật Khẩu" [level=2]
  - text: "Mã OTP của bạn là: 9861 Mã OTP (4 số)"
  - textbox: "482913123"
  - text: Mật khẩu mới
  - textbox: NewPass@2026
  - button "Đặt lại mật khẩu"
  - button "← Quay lại"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

```
Error: apiRequestContext.post: socket hang up (ECONNRESET)
Call log:
  - → POST http://localhost:3000/api/reset-password
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:157.0) Gecko/20100101 Firefox/157.0
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 112

```

# Test source

```ts
  1  | import type { APIRequestContext, APIResponse } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * EShop REST API (`eshop-sut/api_specification.md` §1.1–1.4 accounts and
  5  |  * passwords, §4 cart and orders) for test setup, the `Yes (API)` test cases and
  6  |  * checks of the stored result (did the password change? was an order stored?).
  7  |  * Returns the raw responses; assertions stay in the specs.
  8  |  */
  9  | export class EshopApi {
  10 |   constructor(
  11 |     private readonly request: APIRequestContext,
  12 |     private readonly baseUrl = 'http://localhost:3000',
  13 |   ) {}
  14 | 
  15 |   register(name: string, email: string, password: string): Promise<APIResponse> {
  16 |     return this.request.post(`${this.baseUrl}/api/register`, { data: { name, email, password } });
  17 |   }
  18 | 
  19 |   login(email: string, password: string): Promise<APIResponse> {
  20 |     return this.request.post(`${this.baseUrl}/api/login`, { data: { email, password } });
  21 |   }
  22 | 
  23 |   forgotPassword(body: Record<string, unknown>): Promise<APIResponse> {
  24 |     return this.request.post(`${this.baseUrl}/api/forgot-password`, { data: body });
  25 |   }
  26 | 
  27 |   /** Body as given, so a test can leave out a field (`email`, `resetToken`, `newPassword`). */
  28 |   resetPassword(body: Record<string, unknown>): Promise<APIResponse> {
> 29 |     return this.request.post(`${this.baseUrl}/api/reset-password`, { data: body });
     |                         ^ Error: apiRequestContext.post: socket hang up (ECONNRESET)
  30 |   }
  31 | 
  32 |   // ---- Cart and orders (API spec §4, FR-08). `token` = the JWT of `login`.
  33 | 
  34 |   /** The server cart of the token's user (not the Web cart, which lives in the page). */
  35 |   getCart(token: string): Promise<APIResponse> {
  36 |     return this.request.get(`${this.baseUrl}/api/cart`, { headers: bearer(token) });
  37 |   }
  38 | 
  39 |   /** One cart line as given (`id`, `name`, `price`, `quantity`), so a test can send a client price. */
  40 |   addToCart(token: string, line: Record<string, unknown>): Promise<APIResponse> {
  41 |     return this.request.post(`${this.baseUrl}/api/cart`, { headers: bearer(token), data: line });
  42 |   }
  43 | 
  44 |   /**
  45 |    * `POST /api/checkout` with the body as given. `authorization` is the whole
  46 |    * header value (`Bearer <jwt>`, a forged or malformed one), or `undefined` to
  47 |    * send no `Authorization` header at all (DT-04 … DT-06).
  48 |    */
  49 |   checkout(body: Record<string, unknown>, authorization: string | undefined): Promise<APIResponse> {
  50 |     return this.request.post(`${this.baseUrl}/api/checkout`, {
  51 |       headers: authorization === undefined ? {} : { Authorization: authorization },
  52 |       data: body,
  53 |     });
  54 |   }
  55 | 
  56 |   myOrders(token: string): Promise<APIResponse> {
  57 |     return this.request.get(`${this.baseUrl}/api/orders/my-orders`, { headers: bearer(token) });
  58 |   }
  59 | 
  60 |   /** Every user's orders (FR-18); needs an admin token. */
  61 |   adminOrders(adminToken: string): Promise<APIResponse> {
  62 |     return this.request.get(`${this.baseUrl}/api/admin/orders`, { headers: bearer(adminToken) });
  63 |   }
  64 | }
  65 | 
  66 | function bearer(token: string): Record<string, string> {
  67 |   return { Authorization: `Bearer ${token}` };
  68 | }
  69 | 
```