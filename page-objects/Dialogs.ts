import type { Page } from '@playwright/test';

/**
 * Records the text of every browser dialog (`alert`) a page opens and accepts it.
 * The Web shows its checkout messages this way ("Bạn cần đăng nhập để thanh toán!",
 * "Lỗi khi thanh toán: …"); they are not elements of the page. Create it once per
 * page, before the action that may open a dialog.
 */
export class Dialogs {
  readonly messages: string[] = [];

  constructor(page: Page) {
    page.on('dialog', async (dialog) => {
      this.messages.push(dialog.message());
      await dialog.accept().catch(() => {});
    });
  }
}
