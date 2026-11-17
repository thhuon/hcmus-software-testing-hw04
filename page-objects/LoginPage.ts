import type { Locator, Page } from '@playwright/test';

/**
 * Web – Đăng nhập (`/login`). FR-03 uses the forgot-password link and the
 * "Sign In" button (recognising the login page); FR-08 logs in through the form.
 * Locators come from the ARIA snapshot of the running page (design §2 of each
 * feature). The inputs have no accessible name (labels not linked), so each is
 * the textbox in the form block whose label starts with the field's name
 * (label prefix, student decision 17/11).
 */
export class LoginPage {
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(readonly page: Page) {
    this.forgotPasswordLink = page.getByRole('link', { name: 'Quên mật khẩu?' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.usernameInput = this.fieldUnderLabel(/^Username/);
    this.passwordInput = this.fieldUnderLabel(/^Mật khẩu/);
  }

  private fieldUnderLabel(label: RegExp): Locator {
    return this.page
      .locator('form')
      .locator('div')
      .filter({ has: this.page.locator('label').filter({ hasText: label }) })
      .getByRole('textbox');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async openForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /** Fills the form and clicks "Sign In"; the spec waits for the logged-in header. */
  async login(email: string, password: string) {
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
