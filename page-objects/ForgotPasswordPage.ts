import type { Locator, Page } from '@playwright/test';

/**
 * Web – Quên mật khẩu (`/forgot-password`), Bước 1 (email → OTP) and
 * Bước 2 (OTP + new password). Locators and actions only; assertions stay in
 * the specs. No input has an accessible name (labels are not linked to their
 * inputs), so each field is the textbox in the block whose label starts with
 * the field's name (student decision 17/11, design §2): it names the intended
 * field, does not depend on how many inputs share a type, and keeps working
 * when the label text after the name changes (e.g. "Mã OTP (4 số)", BUG-03,
 * or a `*` added to a label, BUG-07).
 */
export class ForgotPasswordPage {
  // Both steps
  readonly heading: Locator;
  readonly form: Locator;
  // FR-03 elements that the requirement names; they may be missing in the app.
  readonly stepIndicator: Locator;
  readonly backToLoginButton: Locator;

  // Bước 1
  readonly emailInput: Locator;
  readonly requestOtpButton: Locator;

  // Bước 2
  readonly otpMessage: Locator;
  readonly otpInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly resetPasswordButton: Locator;
  readonly backButton: Locator;

  /** Text of every browser dialog (`alert`) the page opened, in order. */
  readonly dialogMessages: string[] = [];

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Quên Mật Khẩu' });
    this.form = page.getByRole('main').locator('form');
    this.stepIndicator = page.getByText(/Bước\s*[12]\s*\/\s*2/);
    this.backToLoginButton = page
      .getByRole('button', { name: 'Quay lại đăng nhập' })
      .or(page.getByRole('link', { name: 'Quay lại đăng nhập' }));

    this.emailInput = this.fieldUnderLabel(/^Nhập Email/);
    this.requestOtpButton = page.getByRole('button', { name: 'Lấy mã OTP' });

    this.otpMessage = page.getByText(/^Mã OTP của bạn là:/);
    this.otpInput = this.fieldUnderLabel(/^Mã OTP/);
    this.newPasswordInput = this.fieldUnderLabel(/^Mật khẩu mới/);
    this.confirmPasswordInput = this.fieldUnderLabel(/^Xác nhận mật khẩu mới/);
    this.resetPasswordButton = page.getByRole('button', { name: 'Đặt lại mật khẩu' });
    this.backButton = page.getByRole('button', { name: '← Quay lại' });

    page.on('dialog', async (dialog) => {
      this.dialogMessages.push(dialog.message());
      await dialog.accept();
    });
  }

  /**
   * The textbox inside the block (`div`) that holds a label whose text starts
   * with `labelStart`. Playwright counts password inputs as textboxes too.
   */
  private fieldUnderLabel(labelStart: RegExp): Locator {
    return this.form
      .locator('div')
      .filter({ has: this.page.locator('label').filter({ hasText: labelStart }) })
      .getByRole('textbox');
  }

  async goto() {
    await this.page.goto('/forgot-password');
  }

  /** Bước 1: type the email and ask for an OTP. */
  async requestOtp(email: string) {
    await this.emailInput.fill(email);
    await this.requestOtpButton.click();
  }

  /** The OTP shown on Bước 2 (demo mode shows it on screen instead of e-mailing it). */
  async readOtp(): Promise<string> {
    const text = await this.otpMessage.textContent();
    return (text ?? '').replace(/^Mã OTP của bạn là:/, '').trim();
  }

  /**
   * Bước 2: fill OTP, new password and – when `confirm` is given – the
   * confirmation field, then submit. Filling a missing confirmation field
   * fails with a locator timeout, which is the observable result of BUG-04.
   */
  async resetPassword(otp: string, newPassword: string, confirm?: string) {
    await this.otpInput.fill(otp);
    await this.newPasswordInput.fill(newPassword);
    if (confirm !== undefined) await this.confirmPasswordInput.fill(confirm);
    await this.resetPasswordButton.click();
  }

  async backToStep1() {
    await this.backButton.click();
  }
}
