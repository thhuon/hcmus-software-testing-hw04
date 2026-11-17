import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type TestInfo } from '@playwright/test';
import { ForgotPasswordPage } from '../../page-objects/ForgotPasswordPage';
import { LoginPage } from '../../page-objects/LoginPage';
import { EshopApi } from '../../api/EshopApi';

/**
 * FR-03 Quên mật khẩu & Đặt lại mật khẩu – Web UI, data-driven.
 * Rows: data/forgot-password/web.json (design §3). Expected values come from the
 * data file (FR-03, FR-01, FR-22, SEC-07, HW02 assumptions A1–A17), never from the app.
 */

type Expected = {
  kind: 'success' | 'error' | 'blocked';
  errorAboveSubmit?: boolean;
  oldPasswordLogsIn?: boolean;
  newPasswordLogsIn?: boolean;
  apiRejected?: boolean;
  stepIndicator?: { step1?: string; step2?: string };
  requiredMarked?: boolean;
  otpPattern?: string;
  step2Fields?: string[];
  passwordMasked?: boolean;
  otpUsedUp?: boolean;
  otpRequests?: number;
  otpsNotAllEqual?: boolean;
  navigatesTo?: string;
  loginPath?: string;
  loginPageButton?: string;
  otpShown?: boolean;
  staysOnStep?: number;
  attempts?: { newPassword: string; confirm: string; expected: 'success' | 'error'; errorAboveSubmit?: boolean }[];
};

type Row = {
  id: string;
  technique: string;
  title: string;
  partition: string;
  flow: 'reset' | 'otpFormat' | 'backToLogin' | 'retryAfterError' | 'requestOnly' | 'otpWebThenApi';
  account?: { password: string };
  email?: string | null;
  otp?: string;
  newPassword?: string;
  confirm?: string;
  fillConfirm?: boolean;
  expected: Expected;
  source: string;
};

type DataFile = { accountEmail: string; rows: Row[] };

const data: DataFile = JSON.parse(
  readFileSync(path.join(__dirname, '../../data/forgot-password/web.json'), 'utf-8'),
);

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

/** The e-mail typed at Bước 1: the row's own account, or the literal value of the test case. */
function emailOf(row: Row, testInfo: TestInfo): string {
  return row.email === null || row.email === undefined ? accountEmail(row, testInfo) : row.email;
}

/**
 * FR-22: an error message is shown in the page, above the submit button (any text element;
 * the requirement names no role or wording). Soft, so the stored-password check still runs.
 */
async function expectErrorAboveSubmit(fp: ForgotPasswordPage) {
  await expect.soft(fp.errorAboveSubmit, 'error message in the page, above the submit button (FR-22)').toBeVisible();
}

/** A5 / A6: the stored password, checked by logging in through the API ("200" = token, "4xx" = refused). */
async function expectLogin(api: EshopApi, email: string, password: string, succeeds: boolean) {
  const statusClass = (status: number) => (status >= 400 && status < 500 ? '4xx' : String(status));
  await expect
    .poll(async () => statusClass((await api.login(email, password)).status()), {
      message: `login with "${password}" ${succeeds ? 'succeeds' : 'is refused'}`,
    })
    .toBe(succeeds ? '200' : '4xx');
}

/**
 * SEC-07 "vô hiệu hóa sau khi dùng": after an accepted Web reset the same OTP is refused by the
 * API (4xx). Tells an accepted reset from a refused one even when new = current password (DT-05).
 * Runs after the login checks, because a still-valid OTP would change the password here.
 */
async function expectOtpUsedUp(api: EshopApi, email: string, otp: string, newPassword: string) {
  const res = await api.resetPassword({ email, resetToken: otp, newPassword });
  expect(res.status() >= 400 && res.status() < 500, `OTP ${otp} is used up after the reset (SEC-07): ${res.status()}`).toBe(true);
}

/** Wording of the browser dialogs is recorded, not judged (A1, A5, A6). */
function recordDialogs(fp: ForgotPasswordPage, testInfo: TestInfo) {
  if (fp.dialogMessages.length > 0) {
    testInfo.annotations.push({ type: 'dialog', description: fp.dialogMessages.join(' | ') });
  }
}

const rowsOf = (flow: Row['flow']) => data.rows.filter((row) => row.flow === flow);

test.describe('FR-03 forgot & reset password – Web', () => {
  let fp: ForgotPasswordPage;
  let api: EshopApi;

  test.beforeEach(async ({ page, request }) => {
    fp = new ForgotPasswordPage(page);
    api = new EshopApi(request);
  });

  test.afterEach(async ({}, testInfo) => {
    recordDialogs(fp, testInfo);
  });

  /** Registers the row's own account through the API (design §3). */
  async function createAccount(row: Row, testInfo: TestInfo) {
    const res = await api.register(`FR03 ${row.id}`, accountEmail(row, testInfo), row.account!.password);
    expect(res.status(), 'test account registered').toBe(200);
  }

  /** Bước 1 with the row's e-mail; returns when Bước 2 shows an OTP. */
  async function openStep2(row: Row, testInfo: TestInfo) {
    await fp.goto();
    await expect(fp.heading).toBeVisible();
    await fp.requestOtp(emailOf(row, testInfo));
    await expect(fp.otpMessage).toBeVisible();
  }

  for (const row of rowsOf('reset')) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      const e = row.expected;
      await createAccount(row, testInfo);
      const email = accountEmail(row, testInfo);

      await fp.goto();
      await expect(fp.heading).toBeVisible();
      if (e.stepIndicator?.step1) await expect.soft(fp.stepIndicator).toHaveText(e.stepIndicator.step1);
      if (e.requiredMarked) await expect.soft(fp.emailLabel, 'required field marked * (FR-22)').toContainText('*');

      await fp.requestOtp(email);
      await expect(fp.otpMessage).toBeVisible();
      const otp = row.otp === 'issued' ? await fp.readOtp() : row.otp!;

      if (e.otpPattern) expect.soft(otp, 'OTP format (FR-03 "6 chữ số")').toMatch(new RegExp(e.otpPattern));
      if (e.stepIndicator?.step2) await expect.soft(fp.stepIndicator).toHaveText(e.stepIndicator.step2);
      if (e.step2Fields) {
        await expect.soft(fp.otpInput).toBeVisible();
        await expect.soft(fp.newPasswordInput).toBeVisible();
        await expect.soft(fp.confirmPasswordInput, 'confirm field (FR-03)').toBeVisible();
      }
      if (e.passwordMasked) await expect.soft(fp.newPasswordInput).toHaveAttribute('type', 'password');

      await fp.resetPassword(otp, row.newPassword!, row.fillConfirm ? row.confirm : undefined);

      if (e.kind === 'error') {
        if (e.errorAboveSubmit) await expectErrorAboveSubmit(fp);
        await expectLogin(api, email, row.account!.password, true);
        await expectLogin(api, email, row.newPassword!, false);
      } else {
        await expectLogin(api, email, row.newPassword!, true);
        if (e.oldPasswordLogsIn === false) await expectLogin(api, email, row.account!.password, false);
        if (e.otpUsedUp) await expectOtpUsedUp(api, email, otp, row.newPassword!);
      }
    });
  }

  for (const row of rowsOf('otpFormat')) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      const e = row.expected;
      await createAccount(row, testInfo);
      const otps: string[] = [];
      await openStep2(row, testInfo);
      for (let i = 0; i < e.otpRequests!; i++) {
        if (i > 0) {
          await fp.backToStep1();
          await fp.requestOtp(accountEmail(row, testInfo));
          await expect(fp.otpMessage).toBeVisible();
        }
        otps.push(await fp.readOtp());
      }
      for (const otp of otps) expect.soft(otp, 'OTP format (FR-03 "6 chữ số")').toMatch(new RegExp(e.otpPattern!));
      expect(new Set(otps).size, `OTPs ${otps.join(', ')} are not all equal (A17)`).toBeGreaterThan(1);
    });
  }

  for (const row of rowsOf('backToLogin')) {
    test(`${row.id} – ${row.title}`, async ({ page }) => {
      const e = row.expected;
      await fp.goto();
      await expect(fp.heading).toBeVisible();
      await expect.soft(fp.stepIndicator).toHaveText(e.stepIndicator!.step1!);
      await fp.backToLogin();
      await expect(page).toHaveURL(new RegExp(`${e.loginPath}$`));
      await expect(new LoginPage(page).signInButton).toBeVisible();
    });
  }

  for (const row of rowsOf('retryAfterError')) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      const e = row.expected;
      await createAccount(row, testInfo);
      const email = accountEmail(row, testInfo);
      await openStep2(row, testInfo);
      const otp = await fp.readOtp();

      const [rejected, accepted] = e.attempts!;
      await fp.resetPassword(otp, rejected.newPassword);
      await expectErrorAboveSubmit(fp);
      await expectLogin(api, email, rejected.newPassword, false);

      await fp.resetPassword(otp, accepted.newPassword);
      await expectLogin(api, email, accepted.newPassword, true);
      await expectLogin(api, email, row.account!.password, false);
      if (e.otpUsedUp) await expectOtpUsedUp(api, email, otp, accepted.newPassword);
    });
  }

  for (const row of rowsOf('requestOnly')) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      await fp.goto();
      await expect(fp.heading).toBeVisible();
      await fp.requestOtp(emailOf(row, testInfo));
      // A1 / A2: no OTP is shown and Bước 2 does not open.
      await expect(fp.otpMessage).not.toBeVisible();
      await expect(fp.resetPasswordButton).not.toBeVisible();
      await expect(fp.requestOtpButton).toBeVisible();
    });
  }

  for (const row of rowsOf('otpWebThenApi')) {
    test(`${row.id} – ${row.title}`, async ({}, testInfo) => {
      await createAccount(row, testInfo);
      const email = accountEmail(row, testInfo);
      await openStep2(row, testInfo);

      // Web part: the fixed OTP of the test case with a valid new password.
      await fp.resetPassword(row.otp!, row.newPassword!);
      await expectErrorAboveSubmit(fp);

      // API part: the same OTP sent to the reset endpoint (student decision, design §1).
      const res = await api.resetPassword({ email, resetToken: row.otp, newPassword: row.newPassword });
      expect(res.status(), 'reset with a wrong OTP is rejected (4xx)').toBeGreaterThanOrEqual(400);
      expect(res.status()).toBeLessThan(500);

      await expectLogin(api, email, row.account!.password, true);
      await expectLogin(api, email, row.newPassword!, false);
    });
  }
});
