import type { Locator, Page, Response } from '@playwright/test';

/**
 * Web – Thanh toán (`/checkout`, "Xác Nhận Đơn Hàng") and the success view
 * ("Thanh toán thành công!") that replaces it on the same URL. The route has no
 * guard: a guest or an empty cart can open it by URL. Locators and actions only;
 * assertions stay in the specs.
 */
export class CheckoutPage {
  readonly heading: Locator;
  /** One item per cart line: `<name> x <qty> — <amount> ₫`. */
  readonly items: Locator;
  /**
   * "Tổng tiền thanh toán (VND)": no accessible name, so the spinbutton in the block
   * whose label starts with the field's name. FR-08 says the user cannot edit the
   * total; today it is an editable number input (HW02 BUG-15).
   */
  readonly totalInput: Locator;
  /** "Tổng thanh toán: <amount> ₫". */
  readonly totalText: Locator;
  /** Not in the app today (no `shipping_address` is sent); kept to show the absence. */
  readonly addressInput: Locator;
  /** FR-23: breadcrumb on the sub-pages; 0 today (HW02 BUG-16). */
  readonly breadcrumb: Locator;
  readonly couponInput: Locator;
  readonly confirmButton: Locator;
  readonly successHeading: Locator;
  readonly backHomeButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng', level: 2 });
    this.items = page.getByRole('main').getByRole('listitem');
    this.totalInput = page
      .locator('div')
      .filter({ has: page.locator('label').filter({ hasText: /^Tổng tiền thanh toán/ }) })
      .getByRole('spinbutton');
    this.totalText = page.getByText(/^Tổng thanh toán:/);
    this.addressInput = page.getByRole('textbox', { name: /địa chỉ/i });
    this.breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
    this.couponInput = page.getByRole('textbox', { name: 'Nhập mã giảm giá...' });
    this.confirmButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
    this.successHeading = page.getByRole('heading', { name: 'Thanh toán thành công!' });
    this.backHomeButton = page.getByRole('button', { name: 'Quay lại trang chủ' });
  }

  item(product: string): Locator {
    return this.items.filter({ hasText: product });
  }

  /** Opens the page by URL: a reload, so the Web cart is empty (DT-03 path (b), DT-07). */
  async goto() {
    await this.page.goto('/checkout');
    await this.waitReady();
  }

  async waitReady() {
    await this.heading.waitFor();
  }

  /**
   * Clicks "Xác Nhận Thanh Toán" and returns the `POST /api/checkout` response the
   * Web received (its request holds the body the Web sent).
   */
  async confirm(): Promise<Response> {
    const response = this.page.waitForResponse(
      (r) => r.url().endsWith('/api/checkout') && r.request().method() === 'POST',
    );
    await this.confirmButton.click();
    return response;
  }
}
