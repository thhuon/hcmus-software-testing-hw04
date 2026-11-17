import type { Locator, Page } from '@playwright/test';

/**
 * Web – header shown on every page. The links are the only way to move between
 * pages without a reload, and a reload empties the Web cart (it lives in the
 * page's memory, group issue #74; design §2 findings). There is no cart badge
 * (group issue #79). Locators and actions only; assertions stay in the specs.
 */
export class SiteHeader {
  readonly homeLink: Locator;
  readonly cartLink: Locator;
  /** Shown only while the Web treats the user as logged in. */
  readonly logoutButton: Locator;
  /** Shown only to a guest. */
  readonly loginLink: Locator;

  constructor(readonly page: Page) {
    this.homeLink = page.getByRole('link', { name: 'EShop' });
    this.cartLink = page.getByRole('link', { name: 'Giỏ hàng' });
    this.logoutButton = page.getByRole('button', { name: 'Thoát' });
    this.loginLink = page.getByRole('link', { name: 'Đăng nhập' });
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goHome() {
    await this.homeLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
