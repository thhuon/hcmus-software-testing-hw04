// Upload local images as GitHub attachments (for an issue body or a comment), without posting anything.
// Usage: NODE_PATH=<dir containing playwright-core> node upload_attachments.js <owner/repo> <map.json> <out.json> [profile dir]
//   map.json: {"<issue number>": "<absolute image path>", ...}; a key "<issue number>#<label>" (e.g. "1#DT-04")
//   uploads several images through the same issue, and any existing issue can host the image for a new one
//   out.json: {"<issue number>": "<img … src=\"https://github.com/user-attachments/assets/…\" />", ...} (resumable)
// A Chrome window opens on the login page; the human logs in. Each image is dropped into the issue's
// comment box through the file chooser, the generated markup is read back and the box is cleared (no comment is sent).
// Then put the markup into the issue body with `gh issue edit <n> --body-file …`, and delete the profile dir (it holds the session).
const { chromium } = require('playwright-core');
const fs = require('fs');
const [repo, mapFile, outFile, profile = './gh-profile'] = process.argv.slice(2);
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
(async () => {
  const ctx = await chromium.launchPersistentContext(profile, { channel: 'chrome', headless: false, viewport: null });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto('https://github.com/login');
  await page.waitForFunction(() => !!document.querySelector('meta[name=user-login]')?.content, null, { timeout: 15 * 60e3, polling: 2000 });
  for (const [n, file] of Object.entries(map)) {
    if (out[n]) continue;
    const issue = n.split('#')[0];
    await page.goto(`https://github.com/${repo}/issues/${issue}`, { waitUntil: 'load' }); // not 'networkidle': GitHub never goes idle
    await page.waitForTimeout(4000); // the React issue view re-renders after load
    const ta = page.locator('textarea[placeholder="Use Markdown to format your comment"]').last();
    await ta.scrollIntoViewIfNeeded();
    await ta.click();
    const [chooser] = await Promise.all([ // the file input only exists while the chooser is open
      page.waitForEvent('filechooser', { timeout: 15e3 }),
      page.getByRole('button', { name: 'Paste, drop, or click to add files' }).last().click(),
    ]);
    await chooser.setFiles(file);
    const h = await page.waitForFunction(el => /user-attachments\/assets\/[\w-]+/.test(el.value) && el.value, await ta.elementHandle(), { timeout: 60e3 });
    out[n] = (await h.jsonValue()).trim();
    fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
    console.log(n, out[n].slice(0, 100));
    await ta.fill('');
  }
  await ctx.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
