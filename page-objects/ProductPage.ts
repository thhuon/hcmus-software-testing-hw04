import type { Locator, Page } from '@playwright/test';

/**
 * Web – Chi tiết sản phẩm (`/product/:id`). The quantity field has no accessible
 * name (label not linked), so it is the spinbutton in the block whose label
 * starts with "Số lượng" (design §2, same pattern as the other unnamed fields).
 */
export class ProductPage {
  readonly quantityInput: Locator;
  readonly addButton: Locator;
  /** The add button's own text for 2 s after a successful add. */
  readonly addedButton: Locator;

  constructor(readonly page: Page) {
    this.quantityInput = page
      .locator('div')
      .filter({ has: page.locator('label').filter({ hasText: /^Số lượng/ }) })
      .getByRole('spinbutton');
    this.addButton = page.getByRole('button', { name: 'Thêm vào giỏ hàng' });
    this.addedButton = page.getByRole('button', { name: 'Đã thêm' });
  }

  heading(product: string): Locator {
    return this.page.getByRole('heading', { name: product, level: 1 });
  }

  async waitReady(product: string) {
    await this.heading(product).waitFor();
  }

  /**
   * Sets the quantity and adds the product. The first click adds nothing (group
   * issue #73), so the button is clicked until it reads "Đã thêm", at most twice
   * (student decision 17/11). Returns the number of clicks it took, so the spec
   * can record a second click as an annotation linking #73.
   */
  async addToCart(quantity: number): Promise<number> {
    await this.quantityInput.fill(String(quantity));
    await this.addButton.click();
    const addedAfterOne = await this.addedButton
      .waitFor({ timeout: 1_500 })
      .then(() => true, () => false);
    if (addedAfterOne) return 1;
    await this.addButton.click();
    await this.addedButton.waitFor();
    return 2;
  }
}
