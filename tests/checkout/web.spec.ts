import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type TestInfo } from '@playwright/test';
import { EshopApi } from '../../api/EshopApi';
import { SiteHeader } from '../../page-objects/SiteHeader';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { Dialogs } from '../../page-objects/Dialogs';

/**
 * FR-08 Thanh toán (Checkout) – Web UI, data-driven.
 * Rows: data/checkout/web.json (design §3). Expected values come from the data file
 * (FR-08, FR-07, FR-23, HW02 assumptions A1–A15 and decisions Q1–Q10), never from the app.
 * The stored orders are read through the API (persisted outcome, A7 / A9).
 */

type Line = { product: string; quantity: number };

type Expected = {
  kind: 'accepted' | 'refused';
  items?: { name: string; quantity: number }[];
  totalText?: string;
  totalEditable?: boolean;
  breadcrumb?: boolean;
  newOrders?: number;
  newOrdersAll?: number;
  orderStatus?: string;
  orderTotal?: number;
  cartEmptyAfter?: boolean;
  emptyState?: { message: boolean; image: boolean };
  checkoutButton?: boolean;
  recordOnly?: string[];
};

type Row = {
  id: string;
  technique: string;
  title: string;
  partition: string;
  flow: 'checkout' | 'guest' | 'emptyCart';
  loggedIn: boolean;
  cart: Line[];
  paths?: ('cartButton' | 'typedCheckoutUrl')[];
  address?: string;
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

const data: DataFile = JSON.parse(readFileSync(path.join(__dirname, '../../data/checkout/web.json'), 'utf-8'));

/**
 * `{run}` of the account e-mail: start time of the run + browser + repeat and retry
 * index (design §3). The backend registers a taken e-mail again and logs in the first
 * account, so a repeated or retried test must not reuse the e-mail of its earlier attempt.
 */
function runStamp(testInfo: TestInfo): string {
  const started = (process.env.RUN_STARTED ?? new Date().toISOString())
    .replace(/[-:]/g, '')
    .slice(0, 15)
    .toLowerCase();
  return `${started}.${testInfo.project.name}.r${testInfo.repeatEachIndex}t${testInfo.retry}`;
}

function accountEmail(row: Row, testInfo: TestInfo): string {
  return data.accountEmail.replace('{id}', row.id.toLowerCase()).replace('{run}', runStamp(testInfo));
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rowsOf = (flow: Row['flow']) => data.rows.filter((row) => row.flow === flow);

test.describe('FR-08 checkout – Web', () => {
  let api: EshopApi;
  let header: SiteHeader;
  let login: LoginPage;
  let home: HomePage;
  let product: ProductPage;
  let cart: CartPage;
  let checkout: CheckoutPage;
  let dialogs: Dialogs;

  test.beforeEach(async ({ page, request }) => {
    api = new EshopApi(request);
    header = new SiteHeader(page);
    login = new LoginPage(page);
    home = new HomePage(page);
    product = new ProductPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    dialogs = new Dialogs(page);
  });

  test.afterEach(async ({}, testInfo) => {
    // Wording of the browser dialogs is recorded, not judged (A2).
    if (dialogs.messages.length > 0) {
      testInfo.annotations.push({ type: 'dialog', description: dialogs.messages.join(' | ') });
    }
  });

  /** Registers the row's own account through the API and returns its JWT (design §3). */
  async function createAccount(row: Row, testInfo: TestInfo): Promise<{ email: string; token: string }> {
    const email = accountEmail(row, testInfo);
    const registered = await api.register(`FR08 ${row.id}`, email, data.accountPassword);
    expect(registered.status(), 'test account registered').toBe(200);
    const loggedIn = await api.login(email, data.accountPassword);
    expect(loggedIn.status(), 'test account logs in through the API').toBe(200);
    return { email, token: (await loggedIn.json()).token };
  }

  async function loginOnWeb(email: string) {
    await login.goto();
    await login.login(email, data.accountPassword);
    await expect(header.logoutButton, 'the Web shows the logged-in header').toBeVisible();
  }

  /**
   * Adds the cart lines on the product pages, in order, moving only through links
   * (a reload empties the Web cart). Records a second click of "Thêm vào giỏ hàng"
   * as an annotation linking group issue #73 (student decision 17/11).
   */
  async function buildCart(lines: Line[], testInfo: TestInfo) {
    for (const line of lines) {
      const name = data.products[line.product].name;
      await home.waitReady();
      await home.openProduct(name);
      await product.waitReady(name);
      const clicks = await product.addToCart(line.quantity);
      if (clicks > 1) {
        testInfo.annotations.push({
          type: 'issue',
          description: `"Thêm vào giỏ hàng" needed ${clicks} clicks for ${name} (group issue #73, FR-07)`,
        });
      }
      await header.goHome();
    }
  }

  async function myOrders(token: string): Promise<Order[]> {
    const res = await api.myOrders(token);
    expect(res.status(), 'own orders readable').toBe(200);
    return res.json();
  }

  async function allOrdersCount(adminToken: string): Promise<number> {
    const res = await api.adminOrders(adminToken);
    expect(res.status(), 'all orders readable with the admin token').toBe(200);
    return (await res.json()).length;
  }

  // ---- Accepted checkout: DT-01, BVA-01 … BVA-04 ----
  for (const row of rowsOf('checkout')) {
    test(`${row.id} – ${row.title}`, async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'source', description: row.source });
      const e = row.expected;
      const account = await createAccount(row, testInfo);
      await loginOnWeb(account.email);
      await buildCart(row.cart, testInfo);

      await header.goToCart();
      await cart.waitReady();
      await cart.proceedToCheckout();
      await checkout.waitReady();

      // Checkout page (A10, A11, FR-23): soft, so the stored order is still checked.
      if (e.items) {
        await expect.soft(checkout.items, 'one list item per cart line (A11)').toHaveCount(e.items.length);
        for (const item of e.items) {
          await expect
            .soft(checkout.item(item.name), `${item.name} listed with quantity ${item.quantity} (A11)`)
            .toHaveText(new RegExp(`${escapeRegExp(item.name)}\\D+${item.quantity}\\b`));
        }
      }
      if (e.totalText) {
        await expect
          .soft(checkout.totalText, 'total shown with ₫ and thousand separators (A10)')
          .toContainText(new RegExp(e.totalText));
      }
      if (e.totalEditable === false) {
        const editableTotal = checkout.totalInput.and(page.locator('input:not([readonly]):not([disabled])'));
        await expect
          .soft(editableTotal, 'the total cannot be typed into (FR-08 "không cho phép người dùng chỉnh sửa trực tiếp")')
          .toHaveCount(0);
      }
      if (e.breadcrumb) {
        await expect.soft(checkout.breadcrumb, 'breadcrumb on Thanh toán (FR-23)').toBeVisible();
      }
      testInfo.annotations.push({
        type: 'address',
        description: `address fields on the page: ${await checkout.addressInput.count()} (HW02 value "${row.address ?? '-'}", not judged: A12, Q7)`,
      });

      const response = await checkout.confirm();
      testInfo.annotations.push({ type: 'checkout response', description: `${response.status()} ${await response.text()}` });

      // Stored order (A7): exactly one new order of this account, pending, with the server total.
      await expect.poll(async () => (await myOrders(account.token)).length, { message: 'new orders of the account' }).toBe(e.newOrders);
      const [order] = await myOrders(account.token);
      expect(order, 'the new order (A3, A7)').toMatchObject({ status: e.orderStatus, total_amount: e.orderTotal });

      // Cart emptied after success (FR-08 "Sau thanh toán thành công, giỏ hàng được xóa.", A8).
      if (e.cartEmptyAfter) {
        await header.goToCart();
        await cart.waitReady();
        await expect(cart.lines, 'no cart line after the checkout (A8)').toHaveCount(0);
        await expect(cart.emptyHeading, 'empty-cart state after the checkout (A8)').toBeVisible();
      }
    });
  }

  // ---- Guest: DT-03, both paths in one test (student 17/11) ----
  for (const row of rowsOf('guest')) {
    test(`${row.id} – ${row.title}`, async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'source', description: row.source });
      const adminLogin = await api.login(data.admin.email, data.admin.password);
      expect(adminLogin.status(), 'admin logs in through the API').toBe(200);
      const adminToken: string = (await adminLogin.json()).token;
      const ordersBefore = await allOrdersCount(adminToken);

      await home.goto();
      await expect(header.loginLink, 'guest header (no one logged in)').toBeVisible();
      await buildCart(row.cart, testInfo);

      for (const guestPath of row.paths ?? []) {
        if (guestPath === 'cartButton') {
          // (a) the cart's "Tiến hành thanh toán"; if the Web opens the checkout page, try to place the order.
          await header.goToCart();
          await cart.waitReady();
          await cart.proceedToCheckout();
          await login.signInButton.or(checkout.heading).waitFor();
          if (await checkout.heading.isVisible()) {
            await checkout.confirm();
          }
        } else {
          // (b) the typed URL /checkout (a reload: the guest cart is empty) and "Xác Nhận Thanh Toán".
          await checkout.goto();
          const response = await checkout.confirm();
          testInfo.annotations.push({ type: 'checkout response (b)', description: `${response.status()} ${await response.text()}` });
        }
        testInfo.annotations.push({ type: `URL after path ${guestPath}`, description: page.url() });

        // Only "no order" is judged (A2, Q1).
        expect(await allOrdersCount(adminToken), `no new order after the guest path ${guestPath} (FR-08 "đã đăng nhập")`).toBe(
          ordersBefore + (row.expected.newOrdersAll ?? 0),
        );
      }
    });
  }

  // ---- Empty cart on the Web: DT-07 step 2 (the API part is api/DT-07) ----
  for (const row of rowsOf('emptyCart')) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      testInfo.annotations.push({ type: 'source', description: row.source });
      const e = row.expected;
      const account = await createAccount(row, testInfo);
      await loginOnWeb(account.email);

      // The cart page: empty-cart state (FR-07 "hình minh họa và thông báo rõ ràng"), no way to the checkout.
      await header.goToCart();
      await cart.waitReady();
      if (e.emptyState?.message) {
        await expect.soft(cart.emptyHeading, 'empty-cart message (FR-07)').toBeVisible();
      }
      if (e.emptyState?.image) {
        await expect.soft(cart.emptyImage.first(), 'empty-cart illustration (FR-07)').toBeVisible();
      }
      if (e.checkoutButton === false) {
        await expect.soft(cart.checkoutButton, 'no "Tiến hành thanh toán" for an empty cart (A6)').toHaveCount(0);
      }

      // The typed URL /checkout: "Xác Nhận Thanh Toán" must not place an order (A6, Q4; BUG-01 #116).
      await checkout.goto();
      const response = await checkout.confirm();
      testInfo.annotations.push({ type: 'checkout response', description: `${response.status()} ${await response.text()}` });
      testInfo.annotations.push({ type: 'issue', description: 'BUG-01 https://github.com/angquoc/software-testing-2026-HW02-group/issues/116' });
      expect(await myOrders(account.token), 'no order for an empty cart (A6, A9)').toHaveLength(e.newOrders ?? 0);
    });
  }
});
