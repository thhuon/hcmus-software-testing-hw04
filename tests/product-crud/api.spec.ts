import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type APIResponse, type TestInfo } from '@playwright/test';
import { EshopApi } from '../../api/EshopApi';

/**
 * FR-15 Quản lý Sản phẩm (Product CRUD) – API, data-driven: the test cases the
 * Admin web cannot send (design §1 `Yes (API)`) and the API parts of DT-09, DT-14 … 17.
 * Rows: data/product-crud/api.json (design §3). The stored products read through
 * `GET /api/products` before and after the request are the oracle (A9 … A11); the
 * HTTP status is recorded, not judged (Q1).
 */

type Expected = {
  kind: 'refused' | 'noChange';
  newProducts?: number;
  seedUnchanged?: boolean;
  targetUnchanged?: boolean;
  targetListed?: boolean;
  categoryAbsent?: number;
  noProductNamed?: string;
  recordOnly?: string[];
};

type Row = {
  id: string;
  technique: string;
  title: string;
  partition: string;
  method: 'POST' | 'PUT' | 'DELETE';
  /** "new" = POST; "P" = the product the test creates first; any other value = that id. */
  target: string;
  setupTarget?: boolean;
  setupDeletedCategory?: string;
  /** "admin" / "user" = Bearer + that account's JWT; null = no header; any other string = the header value. */
  authorization: string | null;
  body?: Record<string, unknown>;
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
  user: { email: string; password: string };
  seedProducts: { id: number }[];
  targetProduct: { body: Record<string, unknown> };
  rows: Row[];
};

const data: DataFile = JSON.parse(
  readFileSync(path.join(__dirname, '../../data/product-crud/api.json'), 'utf-8'),
);
const seedIds = data.seedProducts.map((p) => p.id);

/** `{tag}` = TC ID, browser, start of the run, repeat and retry index (design §3). */
function tagOf(row: Row, testInfo: TestInfo): string {
  const started = (process.env.RUN_STARTED ?? new Date().toISOString())
    .replace(/[-:]/g, '')
    .slice(0, 15)
    .toLowerCase();
  return `${row.id}.api.${testInfo.project.name}.${started}.r${testInfo.repeatEachIndex}t${testInfo.retry}`;
}

test.describe('FR-15 product CRUD – API', () => {
  let api: EshopApi;
  let adminToken: string;
  let userToken: string;
  let idsBefore: number[];
  let seedBefore: Product[];

  async function tokenOf(email: string, password: string): Promise<string> {
    const res = await api.login(email, password);
    expect(res.status(), `${email} logs in through the API`).toBe(200);
    return (await res.json()).token;
  }

  async function storedProducts(): Promise<Product[]> {
    const res = await api.products();
    expect(res.status(), 'GET /api/products').toBe(200);
    return res.json();
  }

  function authorizationOf(row: Row): string | undefined {
    if (row.authorization === null) return undefined;
    if (row.authorization === 'admin') return `Bearer ${adminToken}`;
    if (row.authorization === 'user') return `Bearer ${userToken}`;
    return row.authorization;
  }

  test.beforeEach(async ({ request }) => {
    api = new EshopApi(request);
    adminToken = await tokenOf(data.admin.email, data.admin.password);
    userToken = await tokenOf(data.user.email, data.user.password);
    const before = await storedProducts();
    idsBefore = before.map((p) => p.id);
    seedBefore = before.filter((p) => seedIds.includes(p.id));
  });

  test.afterEach(async () => {
    // HW02 F8: delete every product the test created (P and anything a refused request stored).
    for (const p of (await storedProducts()).filter((x) => !idsBefore.includes(x.id))) {
      await api.deleteProduct(p.id, `Bearer ${adminToken}`);
    }
  });

  for (const row of data.rows) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      testInfo.annotations.push({ type: 'partition', description: row.partition });
      testInfo.annotations.push({ type: 'source', description: row.source });
      const tag = tagOf(row, testInfo);
      const exp = row.expected;

      // Setup: P (HW02 F4) and the deleted category C (HW02 F5).
      let target: Product | undefined;
      if (row.setupTarget) {
        const body = {
          ...data.targetProduct.body,
          name: String(data.targetProduct.body.name).replace('{tag}', tag),
        };
        const res = await api.createProduct(body, `Bearer ${adminToken}`);
        expect(res.status(), 'P is created through the API').toBe(200);
        const id = (await res.json()).id as number;
        target = (await storedProducts()).find((p) => p.id === id);
        expect(target, 'P is listed').toBeDefined();
      }
      let body = row.body;
      if (row.setupDeletedCategory) {
        const name = row.setupDeletedCategory.replace('{tag}', tag);
        expect((await api.createCategory(name, adminToken)).status(), 'category C is created').toBe(200);
        const categories = (await (await api.categories()).json()) as { id: number; name: string }[];
        const c = categories.find((x) => x.name === name);
        expect(c, 'category C is listed').toBeDefined();
        expect((await api.deleteCategory(c!.id, adminToken)).status(), 'category C is deleted').toBe(200);
        const left = (await (await api.categories()).json()) as { id: number }[];
        expect(left.some((x) => x.id === c!.id), 'category C is no longer listed').toBe(false);
        body = { ...body, category_id: c!.id };
      }
      const productsBefore = await storedProducts();

      // The request under test.
      const auth = authorizationOf(row);
      const id = row.target === 'P' ? target!.id : row.target;
      let res: APIResponse;
      switch (row.method) {
        case 'POST':
          res = await api.createProduct(body!, auth);
          break;
        case 'PUT':
          res = await api.updateProduct(id, body!, auth);
          break;
        case 'DELETE':
          res = await api.deleteProduct(id, auth);
          break;
      }
      testInfo.annotations.push({
        type: 'response',
        description: JSON.stringify({ status: res.status(), body: await res.text() }),
      });

      // Oracle: the stored products after the request.
      const after = await storedProducts();
      const added = after.filter((p) => !productsBefore.some((b) => b.id === p.id));
      if (exp.newProducts !== undefined) {
        expect(added, 'new products stored by the request').toHaveLength(exp.newProducts);
      }
      if (exp.targetUnchanged) {
        expect.soft(after.find((p) => p.id === target!.id), 'P keeps its values').toEqual(target);
      }
      if (exp.targetListed !== undefined) {
        expect.soft(after.some((p) => p.id === target!.id), 'P is still listed').toBe(exp.targetListed);
      }
      if (exp.noProductNamed !== undefined) {
        expect.soft(after.map((p) => p.name), 'no product with this name').not.toContain(exp.noProductNamed);
      }
      if (exp.categoryAbsent !== undefined) {
        const categories = (await (await api.categories()).json()) as { id: number }[];
        expect
          .soft(categories.map((c) => c.id), `category ${exp.categoryAbsent} is still not in the list`)
          .not.toContain(exp.categoryAbsent);
      }
      if (exp.seedUnchanged) {
        expect
          .soft(
            after.filter((p) => seedIds.includes(p.id)),
            'products 1–5 keep every field (FR-15 "các sản phẩm khác giữ nguyên.")',
          )
          .toEqual(seedBefore);
      }
    });
  }
});
