import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type TestInfo } from '@playwright/test';
import { EshopApi } from '../../api/EshopApi';

/**
 * FR-08 Thanh toán (Checkout) – API, data-driven: the test cases the Web cannot send
 * (design §1 `Yes (API)`) and DT-07's API part. Rows: data/checkout/api.json (design §3).
 * The HTTP status is recorded, not judged (Q1); the stored orders and the server cart
 * are the oracle (A3–A9).
 */

type Line = { product: string; quantity: number; price?: number };

type Expected = {
  kind: 'accepted' | 'refused' | 'serverTotalOrRefused';
  newOrders?: number;
  newOrdersAll?: number;
  orderStatus?: string;
  orderTotal?: number;
  serverTotal?: number;
  cartLinesBefore?: number;
  serverCartLinesAfter?: number;
};

type Row = {
  id: string;
  technique: string;
  title: string;
  partition: string;
  flow: 'checkout';
  cart: Line[];
  /** "user" = Bearer + the account's JWT; null = no header; any other string = the header value. */
  authorization: string | null;
  body: Record<string, unknown>;
  expected: Expected;
  source: string;
};

type DataFile = {
  accountEmail: string;
  accountPassword: string;
  admin: { email: string; password: string };
  products: Record<string, { id: number; name: string; price: number }>;
  rows: Row[];
};

type Order = { id: number; total_amount: unknown; status: string };

const data: DataFile = JSON.parse(readFileSync(path.join(__dirname, '../../data/checkout/api.json'), 'utf-8'));

/** `{run}` of the account e-mail: start time of the run + browser (design §3). */
function runStamp(testInfo: TestInfo): string {
  const started = (process.env.RUN_STARTED ?? new Date().toISOString())
    .replace(/[-:]/g, '')
    .slice(0, 15)
    .toLowerCase();
  return `${started}.${testInfo.project.name}`;
}

function accountEmail(row: Row, testInfo: TestInfo): string {
  return data.accountEmail.replace('{id}', row.id.toLowerCase()).replace('{run}', runStamp(testInfo));
}

test.describe('FR-08 checkout – API', () => {
  let api: EshopApi;

  test.beforeEach(async ({ request }) => {
    api = new EshopApi(request);
  });

  async function tokenOf(email: string, password: string): Promise<string> {
    const res = await api.login(email, password);
    expect(res.status(), `${email} logs in through the API`).toBe(200);
    return (await res.json()).token;
  }

  async function myOrders(token: string): Promise<Order[]> {
    const res = await api.myOrders(token);
    expect(res.status(), 'own orders readable').toBe(200);
    return res.json();
  }

  async function allOrders(adminToken: string): Promise<Order[]> {
    const res = await api.adminOrders(adminToken);
    expect(res.status(), 'all orders readable with the admin token').toBe(200);
    return res.json();
  }

  async function cartLines(token: string): Promise<unknown[]> {
    const res = await api.getCart(token);
    expect(res.status(), 'server cart readable').toBe(200);
    return res.json();
  }

  for (const row of data.rows) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      testInfo.annotations.push({ type: 'source', description: row.source });
      const e = row.expected;

      // Setup: the row's own account and its server cart (design §3).
      const email = accountEmail(row, testInfo);
      expect((await api.register(`FR08 ${row.id}`, email, data.accountPassword)).status(), 'test account registered').toBe(200);
      const token = await tokenOf(email, data.accountPassword);
      for (const line of row.cart) {
        const product = data.products[line.product];
        const added = await api.addToCart(token, {
          id: product.id,
          name: product.name,
          price: line.price ?? product.price,
          quantity: line.quantity,
        });
        expect(added.status(), `cart line ${product.name} × ${line.quantity} added`).toBe(200);
      }
      expect(await cartLines(token), 'server cart holds the row\'s lines before the checkout').toHaveLength(row.cart.length);

      const adminToken = await tokenOf(data.admin.email, data.admin.password);
      const ownBefore = await myOrders(token);
      const allBefore = await allOrders(adminToken);

      // The checkout request.
      const authorization = row.authorization === 'user' ? `Bearer ${token}` : row.authorization ?? undefined;
      const response = await api.checkout(row.body, authorization);
      testInfo.annotations.push({ type: 'checkout response', description: `${response.status()} ${await response.text()}` });

      const ownNew = (await myOrders(token)).filter((o) => !ownBefore.some((b) => b.id === o.id));
      const allNew = (await allOrders(adminToken)).filter((o) => !allBefore.some((b) => b.id === o.id));
      const linesAfter = await cartLines(token);

      if (e.kind === 'accepted') {
        // A7: exactly one new order of the account, pending, with the server total; A8: cart emptied.
        expect(ownNew, 'exactly one new order of the account (A7)').toHaveLength(e.newOrders ?? 1);
        expect.soft(ownNew[0], 'the new order (A3, A7)').toMatchObject({ status: e.orderStatus, total_amount: e.orderTotal });
        expect.soft(linesAfter, 'server cart emptied after the checkout (FR-08 "giỏ hàng được xóa", A8)').toHaveLength(
          e.serverCartLinesAfter ?? 0,
        );
      } else if (e.kind === 'refused') {
        // A1, A6, A9: no new order, the cart unchanged.
        if (e.newOrdersAll !== undefined) {
          expect.soft(allNew, 'no new order at all (A1, A9)').toHaveLength(e.newOrdersAll);
        }
        if (e.newOrders !== undefined) {
          expect.soft(ownNew, 'no new order of the account (A6, A9)').toHaveLength(e.newOrders);
        }
        expect.soft(linesAfter, 'server cart unchanged (A9)').toHaveLength(e.serverCartLinesAfter ?? row.cart.length);
      } else {
        // A5, Q2: either one new order with the server total and an empty cart, or no order and the cart unchanged.
        expect(ownNew.length, 'at most one new order').toBeLessThanOrEqual(1);
        expect
          .soft(ownNew.map((o) => o.total_amount), `a new order carries the server total ${e.serverTotal}, never the client value (FR-08 README:107)`)
          .toEqual(ownNew.map(() => e.serverTotal));
        expect
          .soft(linesAfter, 'cart emptied if the order was stored, unchanged if refused (A8, A9)')
          .toHaveLength(ownNew.length === 1 ? 0 : e.cartLinesBefore ?? row.cart.length);
      }
    });
  }
});
