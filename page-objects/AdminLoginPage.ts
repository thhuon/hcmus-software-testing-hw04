import type { Locator, Page } from '@playwright/test';

/** Admin web (FR-15 … FR-20): one page, no route per screen. */
export const ADMIN_URL = 'http://localhost:5174/';

/**
 * Admin web – "Admin Login". Shown while `localStorage.adminToken` is empty.
 * The fields have no label: their accessible names come from the placeholders
 * (design §2 of product-crud). A non-admin account or a wrong password is
 * answered with an `alert` (record it with `Dialogs`). Locators and actions only.
 */
export class AdminLoginPage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  /** "EShop Admin": the sidebar heading shown once the login is accepted. */
  readonly appHeading: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Admin Login', level: 2 });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.appHeading = page.getByRole('heading', { name: 'EShop Admin', level: 1 });
  }

  async goto() {
    await this.page.goto(ADMIN_URL);
    await this.heading.waitFor();
  }

  /** Fills the form and clicks "Login"; does not wait (a refused login stays on this screen). */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Opens the Admin web and logs in with an account that must be accepted (setup of the Web tests). */
  async loginAsAdmin(email: string, password: string) {
    await this.goto();
    await this.login(email, password);
    await this.appHeading.waitFor();
  }
}
