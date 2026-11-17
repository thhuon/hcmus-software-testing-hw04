import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type TestInfo } from '@playwright/test';
import { EshopApi } from '../../api/EshopApi';
import { AdminLoginPage } from '../../page-objects/AdminLoginPage';
import { AdminProductsPage, type ProductFormInput } from '../../page-objects/AdminProductsPage';
import { Dialogs } from '../../page-objects/Dialogs';

/**
 * FR-15 Quản lý Sản phẩm (Product CRUD) – Admin web, data-driven.
 * Rows: data/product-crud/web.json (design §3). Every test logs in on the Admin web,
 * opens "Sản phẩm" and reads the stored products through `GET /api/products` before
 * and after its action (student 18/11: stored values from the list, not from `/:id`).
 * The HTTP status and the `alert` texts are recorded as annotations, not asserted (Q1, Q8).
 */

/** A name written as one character repeated (BVA: `Ố` × n, DT-10: `X` × 300). */
type Text = string | { repeat: string; times: number };

type FormData = {
  name?: Text;
  price?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
};

type Expected = {
  kind: 'accepted' | 'refused' | 'blocked' | 'display';
  newProducts?: number;
  stored?: { name: Text; nameLength?: number; price: number; category_id: number };
  target?: { name: string; price: number; category_id: number };
  targetUnchanged?: boolean;
  targetListed?: boolean;
  targetByIdReturned?: boolean;
  seedUnchanged?: boolean;
  rowShown?: boolean;
  rowNameText?: string;
  rowBoldElements?: number;
  invalidField?: 'name' | 'price';
  requestSent?: boolean;
  fieldDoesNotHold?: string;
  categoryOptionsEqualApi?: boolean;
  labelsWithStar?: number;
  listNamesEqualApi?: { afterAdd: boolean; afterEdit: boolean };
  rowPriceText?: string;
  seedPriceTexts?: Record<string, string>;
  rowCategoryText?: string;
  recordOnly?: string[];
};

type Flow =
  | 'add'
  | 'edit'
  | 'delete'
  | 'addBlocked'
  | 'typePrice'
  | 'categoryChoice'
  | 'formLabels'
  | 'addThenEdit'
  | 'list';

type Row = {
  id: string;
  technique: string;
  title: string;
  partition: string;
  flow: Flow;
  setupTarget?: boolean;
  form?: FormData;
  typePrice?: string;
  submit?: boolean;
  editName?: string;
  requiredFields?: string[];
  expected: Expected;
  source: string;
};

type Product = {
  id: number;
  name: string;
  price: unknown;
  description: string;
  imageUrl: string;
  category_id: unknown;
};

type DataFile = {
  admin: { email: string; password: string };
  categories: Record<string, number>;
  seedProducts: { id: number; name: string; price: number; category_id: number }[];
  targetProduct: { body: Record<string, unknown> };
  rows: Row[];
};

const data: DataFile = JSON.parse(
  readFileSync(path.join(__dirname, '../../data/product-crud/web.json'), 'utf-8'),
);
const seedIds = data.seedProducts.map((p) => p.id);

/** `{tag}` = TC ID, browser, start of the run, repeat and retry index (design §3). */
function tagOf(row: Row, testInfo: TestInfo): string {
  const started = (process.env.RUN_STARTED ?? new Date().toISOString())
    .replace(/[-:]/g, '')
    .slice(0, 15)
    .toLowerCase();
  return `${row.id}.${testInfo.project.name}.${started}.r${testInfo.repeatEachIndex}t${testInfo.retry}`;
}

function text(value: Text, tag: string): string {
  return typeof value === 'string' ? value.replace('{tag}', tag) : value.repeat.repeat(value.times);
}

function formInput(form: FormData, tag: string): ProductFormInput {
  return {
    ...form,
    name: form.name === undefined ? undefined : text(form.name, tag),
  };
}

function record(testInfo: TestInfo, type: string, description: unknown) {
  testInfo.annotations.push({
    type,
    description: typeof description === 'string' ? description : JSON.stringify(description),
  });
}

test.describe('FR-15 product CRUD – Admin web', () => {
  let api: EshopApi;
  let adminAuth: string;
  let idsBefore: number[];
  let seedBefore: Product[];
  let dialogs: Dialogs;
  let products: AdminProductsPage;

  async function storedProducts(): Promise<Product[]> {
    const res = await api.products();
    expect(res.status(), 'GET /api/products').toBe(200);
    return res.json();
  }

  async function newProducts(): Promise<Product[]> {
    return (await storedProducts()).filter((p) => !idsBefore.includes(p.id));
  }

  async function expectSeedUnchanged() {
    const seedAfter = (await storedProducts()).filter((p) => seedIds.includes(p.id));
    expect.soft(seedAfter, 'products 1–5 keep every field (FR-15 "các sản phẩm khác giữ nguyên.")').toEqual(
      seedBefore,
    );
  }

  /** Creates P through the API (HW02 F4) and reloads the list so that the Admin web shows it. */
  async function createTarget(tag: string): Promise<Product> {
    const body = { ...data.targetProduct.body, name: String(data.targetProduct.body.name).replace('{tag}', tag) };
    const res = await api.createProduct(body, adminAuth);
    expect(res.status(), 'P is created through the API').toBe(200);
    const id = (await res.json()).id as number;
    const target = (await storedProducts()).find((p) => p.id === id);
    expect(target, 'P is listed').toBeDefined();
    await products.page.reload();
    await products.open();
    return target!;
  }

  test.beforeEach(async ({ page, request }) => {
    api = new EshopApi(request);
    const login = await api.login(data.admin.email, data.admin.password);
    expect(login.status(), 'admin logs in through the API').toBe(200);
    adminAuth = `Bearer ${(await login.json()).token}`;

    const before = await storedProducts();
    idsBefore = before.map((p) => p.id);
    seedBefore = before.filter((p) => seedIds.includes(p.id));

    dialogs = new Dialogs(page);
    await new AdminLoginPage(page).loginAsAdmin(data.admin.email, data.admin.password);
    products = new AdminProductsPage(page);
    await products.open();
  });

  test.afterEach(async () => {
    // HW02 F8: delete every product the test created, so the list stays ids 1–5.
    for (const p of await newProducts()) {
      await api.deleteProduct(p.id, adminAuth);
    }
  });

  for (const row of data.rows) {
    test(`${row.id} – ${row.title}`, async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'partition', description: row.partition });
      testInfo.annotations.push({ type: 'source', description: row.source });
      const tag = tagOf(row, testInfo);
      const exp = row.expected;

      switch (row.flow) {
        case 'add': {
          const input = formInput(row.form!, tag);
          const res = await products.addProduct(input);
          record(testInfo, 'response', { status: res.status(), body: await res.text() });
          record(testInfo, 'dialogs', dialogs.messages);

          const added = await newProducts();
          if (exp.newProducts !== undefined) {
            expect(added, 'new products stored (ids after − ids before)').toHaveLength(exp.newProducts);
          }
          if (exp.stored) {
            const name = text(exp.stored.name, tag);
            expect.soft(added[0], 'stored product').toMatchObject({
              name,
              price: exp.stored.price,
              category_id: exp.stored.category_id,
            });
            if (exp.stored.nameLength !== undefined) {
              expect.soft([...(added[0]?.name ?? '')].length, 'stored name length in characters').toBe(
                exp.stored.nameLength,
              );
            }
          }
          if (exp.rowShown) {
            await expect(products.row(input.name!), 'the list has a row for the new product').toHaveCount(1);
          }
          if (exp.rowNameText !== undefined) {
            const cell = await products.nameCell(products.row(input.name!));
            await expect(cell, 'name shown as text, tags visible (SEC-04)').toHaveText(exp.rowNameText.replace('{tag}', tag));
            await expect(cell.locator('b'), 'no rendered <b> element in the name cell').toHaveCount(
              exp.rowBoldElements ?? 0,
            );
          }
          if (exp.rowPriceText !== undefined) {
            const cell = await products.priceCell(products.row(input.name!));
            await expect(cell, 'price with ₫ and thousand separators (FR-21)').toHaveText(new RegExp(exp.rowPriceText));
          }
          if (exp.rowCategoryText !== undefined) {
            await expect(products.row(input.name!), 'the row shows the category').toContainText(exp.rowCategoryText);
          }
          if (exp.seedUnchanged) await expectSeedUnchanged();
          break;
        }

        case 'edit': {
          const target = await createTarget(tag);
          const input = formInput(row.form!, tag);
          const res = await products.editProduct(target.name, input);
          record(testInfo, 'response', { status: res.status(), body: await res.text() });
          record(testInfo, 'dialogs', dialogs.messages);

          const after = (await storedProducts()).find((p) => p.id === target.id);
          if (exp.target) {
            expect(after, 'P after the edit (FR-15 "chỉ sản phẩm đó bị thay đổi")').toMatchObject({
              id: target.id,
              name: exp.target.name.replace('{tag}', tag),
              price: exp.target.price,
              category_id: exp.target.category_id,
            });
          }
          if (exp.targetUnchanged) {
            expect(after, 'P keeps the values read before the edit').toEqual(target);
          }
          if (exp.newProducts !== undefined) {
            expect(await newProducts(), 'no other product is created').toHaveLength(exp.newProducts + 1);
          }
          if (exp.seedUnchanged) await expectSeedUnchanged();
          break;
        }

        case 'delete': {
          const target = await createTarget(tag);
          const res = await products.deleteProduct(target.name);
          record(testInfo, 'response', { status: res.status(), body: await res.text() });

          await expect(products.row(target.name), 'the row of P is gone').toHaveCount(0);
          const listed = (await storedProducts()).some((p) => p.id === target.id);
          expect(listed, 'P listed by GET /api/products').toBe(exp.targetListed);
          const byId = await (await api.product(target.id)).json();
          expect(byId.id === target.id, 'GET /api/products/<P> returns P').toBe(exp.targetByIdReturned);
          if (exp.seedUnchanged) await expectSeedUnchanged();
          break;
        }

        case 'addBlocked': {
          const posts: string[] = [];
          page.on('request', (r) => {
            if (r.method() === 'POST' && r.url().endsWith('/api/products')) posts.push(r.url());
          });
          await products.fillForm(formInput(row.form!, tag));
          await products.save();
          const field = exp.invalidField === 'name' ? products.nameInput : products.priceInput;
          const validity = await products.validity(field);
          record(testInfo, 'browser validation', validity);

          expect(validity.valid, `the ${exp.invalidField} field blocks the form`).toBe(false);
          expect(posts.length > 0, 'POST /api/products sent').toBe(exp.requestSent);
          expect(await newProducts(), 'no product stored').toHaveLength(exp.newProducts ?? 0);
          if (exp.seedUnchanged) await expectSeedUnchanged();
          break;
        }

        case 'typePrice': {
          await products.fillForm(formInput(row.form!, tag));
          await products.typePrice(row.typePrice!);
          const validity = await products.validity(products.priceInput);
          record(testInfo, 'price field', validity);

          expect(
            validity.valid && validity.value === exp.fieldDoesNotHold,
            `the price field holds "${exp.fieldDoesNotHold}" as a valid value`,
          ).toBe(false);
          expect(await newProducts(), 'no product stored').toHaveLength(exp.newProducts ?? 0);
          if (exp.seedUnchanged) await expectSeedUnchanged();
          break;
        }

        case 'categoryChoice': {
          const res = await api.categories();
          const apiNames = ((await res.json()) as { name: string }[]).map((c) => c.name);
          // Web-first: the Admin web fills the list from the 4th of five requests after the
          // login, so the options may still be empty when the tab is shown (T5 review #2).
          await expect(
            products.categorySelect.getByRole('option'),
            'the list offers exactly the categories of GET /api/categories',
          ).toHaveText(apiNames);
          const options = (await products.categorySelect.getByRole('option').allInnerTexts()).map((o) => o.trim());
          record(testInfo, 'category options', {
            options,
            emptyChoice: options.includes(''),
            selected: await products.categorySelect.inputValue(),
          });
          break;
        }

        case 'formLabels': {
          record(testInfo, 'labels in the form', await products.formLabels.allInnerTexts());
          await expect(
            products.formLabels.filter({ hasText: '*' }),
            `labels with * for ${row.requiredFields!.join(', ')} (FR-22)`,
          ).toHaveCount(exp.labelsWithStar!);
          break;
        }

        case 'addThenEdit': {
          const input = formInput(row.form!, tag);
          await products.addProduct(input);
          await expect(products.row(input.name!)).toHaveCount(1);
          const namesAfterAdd = (await storedProducts()).map((p) => p.name);
          expect.soft(await products.rowNames(), 'list names after the add = GET /api/products').toEqual(
            namesAfterAdd,
          );

          await products.editProduct(input.name!, { name: row.editName!.replace('{tag}', tag) });
          await products.addFormHeading.waitFor();
          record(testInfo, 'dialogs', dialogs.messages);
          const namesAfterEdit = (await storedProducts()).map((p) => p.name);
          expect.soft(await products.rowNames(), 'list names after the edit = GET /api/products').toEqual(
            namesAfterEdit,
          );
          break;
        }

        case 'list': {
          for (const [name, pattern] of Object.entries(exp.seedPriceTexts!)) {
            const cell = await products.priceCell(products.row(name));
            await expect.soft(cell, `price of ${name} with ₫ and thousand separators (FR-21)`).toHaveText(
              new RegExp(pattern),
            );
          }
          break;
        }
      }
    });
  }
});
