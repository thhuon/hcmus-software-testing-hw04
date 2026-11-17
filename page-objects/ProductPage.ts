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
   * issue #73), so the button is clicked until it reads "Đã thêm" (student decision
   * 17/11). A click that adds always shows "Đã thêm" for 2 s, so clicking again only
   * happens while nothing was added and cannot add the product twice. The click
   * counter of the page is not shown, so there is no state to wait for between
   * clicks: on a busy Firefox a second click was once counted as the first again
   * (T6, design §5 #5), hence up to `maxClicks` instead of exactly two. Returns the
   * number of clicks, so the spec records every extra click as an annotation (#73).
   */
  async addToCart(quantity: number, maxClicks = 4): Promise<number> {
    await this.quantityInput.fill(String(quantity));
    for (let clicks = 1; clicks <= maxClicks; clicks++) {
      await this.addButton.click();
      const added = await this.addedButton.waitFor({ timeout: 1_500 }).then(
        () => true,
        () => false,
      );
      if (added) return clicks;
    }
    throw new Error(`"Thêm vào giỏ hàng" added nothing after ${maxClicks} clicks (group issue #73)`);
  }
}
