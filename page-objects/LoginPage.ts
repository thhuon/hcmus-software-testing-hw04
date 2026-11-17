import type { Locator, Page } from '@playwright/test';

/**
 * Web – Đăng nhập (`/login`). Only what the FR-03 tests need: reaching the
 * forgot-password page and recognising that the login page is open.
 * Locators come from the ARIA snapshot of the running page (design §2).
 */
export class LoginPage {
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;

  constructor(readonly page: Page) {
    this.forgotPasswordLink = page.getByRole('link', { name: 'Quên mật khẩu?' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async openForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}
