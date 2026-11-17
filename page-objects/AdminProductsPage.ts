import type { Locator, Page, Response } from '@playwright/test';

/** Values typed into the product form. `undefined` = leave the field as it is. */
export interface ProductFormInput {
  name?: string;
  price?: string;
  /** Visible text of the category option, e.g. `Phụ kiện`. */
  category?: string;
  description?: string;
  imageUrl?: string;
}

/** Browser check of one field (HTML validation), read without submitting. */
export interface FieldValidity {
  value: string;
  valid: boolean;
  message: string;
}

/**
 * Admin web – tab "Sản phẩm" ("Quản lý Sản phẩm"): the add / edit form and the
 * product table. Locators from the ARIA snapshot of the running app (design §2
 * of product-crud). Locators and actions only; assertions stay in the specs.
 *
 * Behaviour that shapes the actions (design §2 findings):
 * - The sidebar tabs are `<li>` without a role; a reload brings back the dashboard.
 * - The form has no labels; the category `<select>` has no accessible name.
 * - An add reloads the table from the API; an edit shows the `alert`
 *   "Cập nhật thành công!" and writes the edited name into every row (HW02 BUG-34).
 */
export class AdminProductsPage {
  readonly productsTab: Locator;
  readonly logoutTab: Locator;
  readonly heading: Locator;

  readonly form: Locator;
  readonly addFormHeading: Locator;
  readonly editFormHeading: Locator;
  readonly nameInput: Locator;
  readonly priceInput: Locator;
  readonly imageUrlInput: Locator;
  readonly descriptionInput: Locator;
  readonly categorySelect: Locator;
  /** FR-22: required fields carry `*` next to their label. 0 labels today (HW02 BUG-33). */
  readonly formLabels: Locator;
  readonly saveButton: Locator;
  readonly cancelEditButton: Locator;

  readonly table: Locator;
  readonly columnHeaders: Locator;
  /** Data rows only: the header row has column headers, not cells. */
  readonly productRows: Locator;

  constructor(readonly page: Page) {
    this.productsTab = page.getByRole('listitem').filter({ hasText: /^Sản phẩm$/ });
    this.logoutTab = page.getByRole('listitem').filter({ hasText: /^Đăng xuất$/ });
    this.heading = page.getByRole('heading', { name: 'Quản lý Sản phẩm', level: 2 });

    this.saveButton = page.getByRole('button', { name: 'Lưu sản phẩm' });
    this.form = page.locator('form').filter({ has: this.saveButton });
    this.addFormHeading = page.getByRole('heading', { name: 'Thêm sản phẩm mới', level: 3 });
    this.editFormHeading = page.getByRole('heading', { name: 'Sửa sản phẩm', level: 3 });
    this.nameInput = page.getByRole('textbox', { name: 'Tên sản phẩm' });
    this.priceInput = page.getByRole('spinbutton', { name: 'Giá tiền' });
    this.imageUrlInput = page.getByRole('textbox', { name: 'URL Ảnh' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Mô tả' });
    this.categorySelect = this.form.getByRole('combobox');
    this.formLabels = this.form.locator('label');
    this.cancelEditButton = page.getByRole('button', { name: 'Hủy sửa' });

    this.table = page.getByRole('table');
    this.columnHeaders = page.getByRole('columnheader');
    this.productRows = page.getByRole('row').filter({ has: page.getByRole('cell') });
  }

  /** Clicks the "Sản phẩm" tab (after login or after a reload) and waits for the tab. */
  async open() {
    await this.productsTab.click();
    await this.heading.waitFor();
  }

  /** The row whose cells include one with exactly this name (image `alt` and name cell). */
  row(productName: string): Locator {
    return this.productRows.filter({
      has: this.page.getByRole('cell', { name: productName, exact: true }),
    });
  }

  columnHeader(name: string): Locator {
    return this.columnHeaders.filter({ hasText: new RegExp(`^${name}$`) });
  }

  /** Position of a column, read from the header texts so that the code does not hard-code it. */
  async columnIndex(header: 'Ảnh' | 'Tên SP' | 'Giá' | 'Hành động'): Promise<number> {
    await this.table.waitFor();
    const texts = (await this.columnHeaders.allInnerTexts()).map((t) => t.trim());
    const index = texts.indexOf(header);
    if (index < 0) throw new Error(`Column "${header}" not found in [${texts.join(', ')}]`);
    return index;
  }

  async nameCell(row: Locator): Promise<Locator> {
    return row.getByRole('cell').nth(await this.columnIndex('Tên SP'));
  }

  async priceCell(row: Locator): Promise<Locator> {
    return row.getByRole('cell').nth(await this.columnIndex('Giá'));
  }

  /** Text of the "Tên SP" cell of every row, top to bottom (DT-24). */
  async rowNames(): Promise<string[]> {
    return this.columnTexts('Tên SP');
  }

  /** Text of the "Giá" cell of every row, top to bottom (DT-25, DT-26). */
  async rowPrices(): Promise<string[]> {
    return this.columnTexts('Giá');
  }

  private async columnTexts(header: 'Tên SP' | 'Giá'): Promise<string[]> {
    const index = await this.columnIndex(header);
    const texts: string[] = [];
    for (const row of await this.productRows.all()) {
      texts.push((await row.getByRole('cell').nth(index).innerText()).trim());
    }
    return texts;
  }

  /** Fills the given fields. The price is filled as a number field allows (see `typePrice`). */
  async fillForm(input: ProductFormInput) {
    if (input.name !== undefined) await this.nameInput.fill(input.name);
    if (input.price !== undefined) await this.priceInput.fill(input.price);
    if (input.imageUrl !== undefined) await this.imageUrlInput.fill(input.imageUrl);
    if (input.description !== undefined) await this.descriptionInput.fill(input.description);
    if (input.category !== undefined) await this.categorySelect.selectOption({ label: input.category });
  }

  /**
   * Types text into the price field key by key, as a user would. A number field
   * decides what it keeps: Chromium and WebKit drop letters, Firefox keeps them
   * and marks the field invalid (DT-14 Web part).
   */
  async typePrice(text: string) {
    await this.priceInput.clear();
    await this.priceInput.pressSequentially(text);
  }

  /** Clicks "Lưu sản phẩm" without waiting for a request (the browser may block the form). */
  async save() {
    await this.saveButton.click();
  }

  /** Fills the add form, saves, and returns the `POST /api/products` the Admin web sent. */
  async addProduct(input: ProductFormInput): Promise<Response> {
    await this.addFormHeading.waitFor();
    await this.fillForm(input);
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => r.url().endsWith('/api/products') && r.request().method() === 'POST',
      ),
      this.save(),
    ]);
    return response;
  }

  /** Clicks "Sửa" on the product's row and waits for the edit form. */
  async startEdit(productName: string) {
    await this.row(productName).getByRole('button', { name: 'Sửa' }).click();
    await this.editFormHeading.waitFor();
  }

  /** Edits the product, saves, and returns the `PUT /api/products/:id` the Admin web sent. */
  async editProduct(productName: string, changes: ProductFormInput): Promise<Response> {
    await this.startEdit(productName);
    await this.fillForm(changes);
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => /\/api\/products\/\d+$/.test(r.url()) && r.request().method() === 'PUT',
      ),
      this.save(),
    ]);
    return response;
  }

  /** Clicks "Xóa" on the product's row and returns the `DELETE /api/products/:id` it sent. */
  async deleteProduct(productName: string): Promise<Response> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => /\/api\/products\/\d+$/.test(r.url()) && r.request().method() === 'DELETE',
      ),
      this.row(productName).getByRole('button', { name: 'Xóa' }).click(),
    ]);
    return response;
  }

  /** HTML validation state of a field (blocked forms: DT-09, DT-14, DT-16 Web parts). */
  async validity(field: Locator): Promise<FieldValidity> {
    return field.evaluate((e: HTMLInputElement) => ({
      value: e.value,
      valid: e.validity.valid,
      message: e.validationMessage,
    }));
  }
}
