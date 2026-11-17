import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * EShop REST API (`eshop-sut/api_specification.md` §1.1–1.4 accounts and
 * passwords, §3 products and categories, §4 cart and orders) for test setup, the
 * `Yes (API)` test cases and checks of the stored result (did the password change?
 * was an order stored? which products are stored?).
 * Returns the raw responses; assertions stay in the specs.
 */
export class EshopApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl = 'http://localhost:3000',
  ) {}

  register(name: string, email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/register`, { data: { name, email, password } });
  }

  login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/login`, { data: { email, password } });
  }

  forgotPassword(body: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/forgot-password`, { data: body });
  }

  /** Body as given, so a test can leave out a field (`email`, `resetToken`, `newPassword`). */
  resetPassword(body: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/reset-password`, { data: body });
  }

  // ---- Cart and orders (API spec §4, FR-08). `token` = the JWT of `login`.

  /** The server cart of the token's user (not the Web cart, which lives in the page). */
  getCart(token: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/cart`, { headers: bearer(token) });
  }

  /** One cart line as given (`id`, `name`, `price`, `quantity`), so a test can send a client price. */
  addToCart(token: string, line: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/cart`, { headers: bearer(token), data: line });
  }

  /**
   * `POST /api/checkout` with the body as given. `authorization` is the whole
   * header value (`Bearer <jwt>`, a forged or malformed one), or `undefined` to
   * send no `Authorization` header at all (DT-04 … DT-06).
   */
  checkout(body: Record<string, unknown>, authorization: string | undefined): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/checkout`, {
      headers: authorization === undefined ? {} : { Authorization: authorization },
      data: body,
    });
  }

  myOrders(token: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/orders/my-orders`, { headers: bearer(token) });
  }

  /** Every user's orders (FR-18); needs an admin token. */
  adminOrders(adminToken: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/admin/orders`, { headers: bearer(adminToken) });
  }

  // ---- Products and categories (API spec §3, FR-15). `authorization` is the whole
  // header value (`Bearer <jwt>`, a forged one, a user's), or `undefined` to send no
  // `Authorization` header at all (DT-06 … DT-08). Bodies are sent as given, so a test
  // can leave out a field (`name`, `price`, `category_id`) or send a wrong type.

  products(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/products`);
  }

  product(id: number | string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/products/${id}`);
  }

  createProduct(body: Record<string, unknown>, authorization: string | undefined): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/products`, {
      headers: header(authorization),
      data: body,
    });
  }

  updateProduct(
    id: number | string,
    body: Record<string, unknown>,
    authorization: string | undefined,
  ): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}/api/products/${id}`, {
      headers: header(authorization),
      data: body,
    });
  }

  deleteProduct(id: number | string, authorization: string | undefined): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}/api/products/${id}`, {
      headers: header(authorization),
    });
  }

  categories(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/categories`);
  }

  /** FR-14; needs an admin token. DT-19 creates a category and deletes it. */
  createCategory(name: string, adminToken: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/categories`, {
      headers: bearer(adminToken),
      data: { name },
    });
  }

  deleteCategory(id: number | string, adminToken: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}/api/categories/${id}`, { headers: bearer(adminToken) });
  }
}

function header(authorization: string | undefined): Record<string, string> {
  return authorization === undefined ? {} : { Authorization: authorization };
}

function bearer(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}
