import type { Locator, Page } from '@playwright/test';

/**
 * Web – Giỏ hàng (`/cart`), with lines or empty. Opened through the header link
 * (`SiteHeader.goToCart`), never by URL after products were added: a reload
 * empties the Web cart. Wait for a heading, not for the URL: the URL changes
 * before the page is drawn (design §2 findings).
 */
export class CartPage {
  readonly heading: Locator;
  readonly emptyHeading: Locator;
  readonly continueShoppingLink: Locator;
  /**
   * FR-07 "hình minh họa" of the empty cart: any image in the page content. An
   * illustration may be decorative (`alt=""`, no `img` role), so it is found by
   * element type inside `main`, not by role. 0 today (group issue #80).
   */
  readonly emptyImage: Locator;
  /** Rows with data cells: the product lines, without the header row. */
  readonly lines: Locator;
  readonly checkoutButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Giỏ Hàng', level: 2 });
    this.emptyHeading = page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' });
    this.continueShoppingLink = page.getByRole('link', { name: 'Tiếp tục mua sắm' });
    this.emptyImage = page.getByRole('main').locator('img, svg');
    this.lines = page.getByRole('row').filter({ has: page.getByRole('cell') });
    this.checkoutButton = page.getByRole('button', { name: 'Tiến hành thanh toán' });
  }

  line(product: string): Locator {
    return this.lines.filter({ has: this.page.getByRole('cell', { name: product, exact: true }) });
  }

  /** Opens the cart by URL: a reload, so the Web cart is empty (DT-07). */
  async goto() {
    await this.page.goto('/cart');
    await this.waitReady();
  }

  /** The cart page is drawn, with lines or empty. */
  async waitReady() {
    await this.heading.or(this.emptyHeading).waitFor();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
