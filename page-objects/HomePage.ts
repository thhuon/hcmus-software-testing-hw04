import type { Locator, Page } from '@playwright/test';

/**
 * Web – Trang chủ (`/`), the product list. A product card has no role and no
 * accessible name, so a card is the `div` whose own child is a product heading,
 * filtered by the product name (design §2: CSS structure fallback). Never by
 * position: the order of the products is data.
 */
export class HomePage {
  readonly heading: Locator;
  readonly productHeadings: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Danh sách sản phẩm', level: 1 });
    this.productHeadings = page.getByRole('heading', { level: 2 });
  }

  card(product: string): Locator {
    return this.page
      .locator('div:has(> h2)')
      .filter({ has: this.page.getByRole('heading', { name: product, exact: true }) });
  }

  detailsLink(product: string): Locator {
    return this.card(product).getByRole('link', { name: 'Xem chi tiết' });
  }

  addButton(product: string): Locator {
    return this.card(product).getByRole('button', { name: 'Thêm vào giỏ' });
  }

  /** Opens the home page by URL: a reload, so the Web cart starts empty. */
  async goto() {
    await this.page.goto('/');
    await this.waitReady();
  }

  async waitReady() {
    await this.heading.waitFor();
    await this.productHeadings.first().waitFor();
  }

  async openProduct(product: string) {
    await this.detailsLink(product).click();
  }

  /** Adds one piece of the product; every click adds a new cart line (group issue #70). */
  async addOne(product: string) {
    await this.addButton(product).click();
  }
}
