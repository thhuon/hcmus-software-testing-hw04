import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type APIResponse, type TestInfo } from '@playwright/test';
import { EshopApi } from '../../api/EshopApi';

/**
 * FR-03 Quên mật khẩu & Đặt lại mật khẩu – API, data-driven: the test cases the Web
 * cannot reach (design §1 `Yes (API)`). Rows: data/forgot-password/api.json (design §3).
 * Status meaning (student 17/11): accepted = 200, rejected = 4xx; the login checks
 * (A5 / A6) are the main oracle.
 */

type Role = 'owner' | 'other';
type Outcome = 'accepted' | 'rejected';

type Row = {
  id: string;
  technique: string;
  title: string;
  partition: string;
  flow: string;
  accounts: Partial<Record<Role, { password: string }>>;
  request: {
    otpFor: Role;
    resetFor: Role;
    newPassword?: string;
    secondNewPassword?: string;
    omit?: string;
  };
  expected: {
    reset?: Outcome;
    firstReset?: Outcome;
    secondReset?: Outcome;
    ownerOwnPasswordLogsIn?: boolean;
    otherOwnPasswordLogsIn?: boolean;
    newPasswordLogsIn?: boolean;
    secondPasswordLogsIn?: boolean;
  };
  source: string;
};

type DataFile = { accountEmail: string; rows: Row[] };

const data: DataFile = JSON.parse(
  readFileSync(path.join(__dirname, '../../data/forgot-password/api.json'), 'utf-8'),
);

/** `{run}`: start time of the run + browser project (design §3). */
function runStamp(testInfo: TestInfo): string {
  const started = (process.env.RUN_STARTED ?? new Date().toISOString())
    .replace(/[-:]/g, '')
    .slice(0, 15)
    .toLowerCase();
  return `${started}.${testInfo.project.name}`;
}

function emailOf(row: Row, role: Role, testInfo: TestInfo): string {
  return data.accountEmail
    .replace('{id}', row.id.toLowerCase())
    .replace('{role}', role)
    .replace('{run}', runStamp(testInfo));
}

const statusClass = (status: number) => (status >= 400 && status < 500 ? '4xx' : String(status));
const expectedClass = (outcome: Outcome) => (outcome === 'accepted' ? '200' : '4xx');

async function expectOutcome(res: APIResponse, outcome: Outcome, what: string) {
  expect(statusClass(res.status()), `${what} is ${outcome}: ${await res.text()}`).toBe(expectedClass(outcome));
}

async function expectLogin(api: EshopApi, email: string, password: string, succeeds: boolean) {
  const res = await api.login(email, password);
  expect(statusClass(res.status()), `login ${email} with "${password}" ${succeeds ? 'succeeds' : 'is refused'}`).toBe(
    succeeds ? '200' : '4xx',
  );
  if (succeeds) expect((await res.json()).token, 'login returns a token (API spec §1.2)').toBeTruthy();
}

test.describe('FR-03 forgot & reset password – API', () => {
  for (const row of data.rows) {
    test(`${row.id} – ${row.title}`, async ({ request }, testInfo) => {
      const api = new EshopApi(request);
      const { request: req, expected: e } = row;
      const roles = Object.keys(row.accounts) as Role[];

      for (const role of roles) {
        const res = await api.register(`FR03 ${row.id} ${role}`, emailOf(row, role, testInfo), row.accounts[role]!.password);
        expect(res.status(), `test account "${role}" registered`).toBe(200);
      }

      // Step 1: OTP for `otpFor` (API spec §1.3: 200 with `resetToken`).
      const otpRes = await api.forgotPassword({ email: emailOf(row, req.otpFor, testInfo) });
      expect(otpRes.status(), 'OTP issued').toBe(200);
      const resetToken: string = (await otpRes.json()).resetToken;
      expect(resetToken, 'response has a resetToken').toBeTruthy();

      // Step 2: reset for `resetFor` with that OTP; `omit` leaves a field out of the body.
      const body: Record<string, unknown> = {
        email: emailOf(row, req.resetFor, testInfo),
        resetToken,
        newPassword: req.newPassword,
      };
      if (req.omit) delete body[req.omit];
      const first = await api.resetPassword(body);
      await expectOutcome(first, (e.reset ?? e.firstReset)!, 'reset');

      // Step 3 (DT-32): the same OTP a second time.
      if (req.secondNewPassword) {
        const second = await api.resetPassword({ ...body, newPassword: req.secondNewPassword });
        await expectOutcome(second, e.secondReset!, 'second reset with the same OTP');
      }

      // Stored result: which passwords log in (A5 / A6).
      const resetEmail = emailOf(row, req.resetFor, testInfo);
      if (e.ownerOwnPasswordLogsIn !== undefined)
        await expectLogin(api, emailOf(row, 'owner', testInfo), row.accounts.owner!.password, e.ownerOwnPasswordLogsIn);
      if (e.otherOwnPasswordLogsIn !== undefined)
        await expectLogin(api, emailOf(row, 'other', testInfo), row.accounts.other!.password, e.otherOwnPasswordLogsIn);
      if (e.newPasswordLogsIn !== undefined) await expectLogin(api, resetEmail, req.newPassword!, e.newPasswordLogsIn);
      if (e.secondPasswordLogsIn !== undefined)
        await expectLogin(api, resetEmail, req.secondNewPassword!, e.secondPasswordLogsIn);
    });
  }
});
