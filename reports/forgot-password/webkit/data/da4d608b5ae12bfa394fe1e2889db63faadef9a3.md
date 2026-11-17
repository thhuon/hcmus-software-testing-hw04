# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: forgot-password/api.spec.ts >> FR-03 forgot & reset password – API >> DT-27 – reset without newPassword is rejected
- Location: tests/forgot-password/api.spec.ts:81:9

# Error details

```
Error: reset is rejected: {"message":"Password reset successfully"}

expect(received).toBe(expected) // Object.is equality

Expected: "4xx"
Received: "200"
```

# Test source

```ts
  1   | import { readFileSync } from 'node:fs';
  2   | import path from 'node:path';
  3   | import { test, expect, type APIResponse, type TestInfo } from '@playwright/test';
  4   | import { EshopApi } from '../../api/EshopApi';
  5   | 
  6   | /**
  7   |  * FR-03 Quên mật khẩu & Đặt lại mật khẩu – API, data-driven: the test cases the Web
  8   |  * cannot reach (design §1 `Yes (API)`). Rows: data/forgot-password/api.json (design §3).
  9   |  * Status meaning (student 17/11): accepted = 200, rejected = 4xx; the login checks
  10  |  * (A5 / A6) are the main oracle.
  11  |  */
  12  | 
  13  | type Role = 'owner' | 'other';
  14  | type Outcome = 'accepted' | 'rejected';
  15  | 
  16  | type Row = {
  17  |   id: string;
  18  |   technique: string;
  19  |   title: string;
  20  |   partition: string;
  21  |   flow: string;
  22  |   accounts: Partial<Record<Role, { password: string }>>;
  23  |   request: {
  24  |     otpFor: Role;
  25  |     resetFor: Role;
  26  |     newPassword?: string;
  27  |     secondNewPassword?: string;
  28  |     omit?: string;
  29  |   };
  30  |   expected: {
  31  |     reset?: Outcome;
  32  |     firstReset?: Outcome;
  33  |     secondReset?: Outcome;
  34  |     ownerOwnPasswordLogsIn?: boolean;
  35  |     otherOwnPasswordLogsIn?: boolean;
  36  |     newPasswordLogsIn?: boolean;
  37  |     secondPasswordLogsIn?: boolean;
  38  |   };
  39  |   source: string;
  40  | };
  41  | 
  42  | type DataFile = { accountEmail: string; rows: Row[] };
  43  | 
  44  | const data: DataFile = JSON.parse(
  45  |   readFileSync(path.join(__dirname, '../../data/forgot-password/api.json'), 'utf-8'),
  46  | );
  47  | 
  48  | /** `{run}`: start time of the run + browser project (design §3). */
  49  | function runStamp(testInfo: TestInfo): string {
  50  |   const started = (process.env.RUN_STARTED ?? new Date().toISOString())
  51  |     .replace(/[-:]/g, '')
  52  |     .slice(0, 15)
  53  |     .toLowerCase();
  54  |   return `${started}.${testInfo.project.name}`;
  55  | }
  56  | 
  57  | function emailOf(row: Row, role: Role, testInfo: TestInfo): string {
  58  |   return data.accountEmail
  59  |     .replace('{id}', row.id.toLowerCase())
  60  |     .replace('{role}', role)
  61  |     .replace('{run}', runStamp(testInfo));
  62  | }
  63  | 
  64  | const statusClass = (status: number) => (status >= 400 && status < 500 ? '4xx' : String(status));
  65  | const expectedClass = (outcome: Outcome) => (outcome === 'accepted' ? '200' : '4xx');
  66  | 
  67  | async function expectOutcome(res: APIResponse, outcome: Outcome, what: string) {
> 68  |   expect(statusClass(res.status()), `${what} is ${outcome}: ${await res.text()}`).toBe(expectedClass(outcome));
      |                                                                                   ^ Error: reset is rejected: {"message":"Password reset successfully"}
  69  | }
  70  | 
  71  | async function expectLogin(api: EshopApi, email: string, password: string, succeeds: boolean) {
  72  |   const res = await api.login(email, password);
  73  |   expect(statusClass(res.status()), `login ${email} with "${password}" ${succeeds ? 'succeeds' : 'is refused'}`).toBe(
  74  |     succeeds ? '200' : '4xx',
  75  |   );
  76  |   if (succeeds) expect((await res.json()).token, 'login returns a token (API spec §1.2)').toBeTruthy();
  77  | }
  78  | 
  79  | test.describe('FR-03 forgot & reset password – API', () => {
  80  |   for (const row of data.rows) {
  81  |     test(`${row.id} – ${row.title}`, async ({ request }, testInfo) => {
  82  |       const api = new EshopApi(request);
  83  |       const { request: req, expected: e } = row;
  84  |       const roles = Object.keys(row.accounts) as Role[];
  85  | 
  86  |       for (const role of roles) {
  87  |         const res = await api.register(`FR03 ${row.id} ${role}`, emailOf(row, role, testInfo), row.accounts[role]!.password);
  88  |         expect(res.status(), `test account "${role}" registered`).toBe(200);
  89  |       }
  90  | 
  91  |       // Step 1: OTP for `otpFor` (API spec §1.3: 200 with `resetToken`).
  92  |       const otpRes = await api.forgotPassword({ email: emailOf(row, req.otpFor, testInfo) });
  93  |       expect(otpRes.status(), 'OTP issued').toBe(200);
  94  |       const resetToken: string = (await otpRes.json()).resetToken;
  95  |       expect(resetToken, 'response has a resetToken').toBeTruthy();
  96  | 
  97  |       // Step 2: reset for `resetFor` with that OTP; `omit` leaves a field out of the body.
  98  |       const body: Record<string, unknown> = {
  99  |         email: emailOf(row, req.resetFor, testInfo),
  100 |         resetToken,
  101 |         newPassword: req.newPassword,
  102 |       };
  103 |       if (req.omit) delete body[req.omit];
  104 |       const first = await api.resetPassword(body);
  105 |       await expectOutcome(first, (e.reset ?? e.firstReset)!, 'reset');
  106 | 
  107 |       // Step 3 (DT-32): the same OTP a second time.
  108 |       if (req.secondNewPassword) {
  109 |         const second = await api.resetPassword({ ...body, newPassword: req.secondNewPassword });
  110 |         await expectOutcome(second, e.secondReset!, 'second reset with the same OTP');
  111 |       }
  112 | 
  113 |       // Stored result: which passwords log in (A5 / A6).
  114 |       const resetEmail = emailOf(row, req.resetFor, testInfo);
  115 |       if (e.ownerOwnPasswordLogsIn !== undefined)
  116 |         await expectLogin(api, emailOf(row, 'owner', testInfo), row.accounts.owner!.password, e.ownerOwnPasswordLogsIn);
  117 |       if (e.otherOwnPasswordLogsIn !== undefined)
  118 |         await expectLogin(api, emailOf(row, 'other', testInfo), row.accounts.other!.password, e.otherOwnPasswordLogsIn);
  119 |       if (e.newPasswordLogsIn !== undefined) await expectLogin(api, resetEmail, req.newPassword!, e.newPasswordLogsIn);
  120 |       if (e.secondPasswordLogsIn !== undefined)
  121 |         await expectLogin(api, resetEmail, req.secondNewPassword!, e.secondPasswordLogsIn);
  122 |     });
  123 |   }
  124 | });
  125 | 
```