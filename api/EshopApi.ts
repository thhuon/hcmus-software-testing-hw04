import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * EShop REST API (`eshop-sut/api_specification.md` §1.1–1.4) for test setup,
 * the `Yes (API)` test cases and checks of the stored result (did the
 * password change?). Returns the raw responses; assertions stay in the specs.
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
}
