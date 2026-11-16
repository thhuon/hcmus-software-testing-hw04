#!/usr/bin/env node
// Runs one feature (or all) on each browser separately, one HTML report per run:
//   reports/<feature>/<browser>/index.html
// Usage: node scripts/run-feature.mjs <fA|fB|fC|all> [--browsers chromium,firefox] [--reuse]
//   --reuse  use SUT servers that are already running (default: start fresh servers,
//            so the backend re-seeds the database before every browser run)
import { spawnSync } from 'node:child_process';

const FEATURES = {
  fA: { dir: 'tests/fA-fr03', label: 'FR-03 Forgot & reset password' },
  fB: { dir: 'tests/fB-fr08', label: 'FR-08 Checkout' },
  fC: { dir: 'tests/fC-fr15', label: 'FR-15 Product CRUD (admin)' },
};
const ALL_BROWSERS = ['chromium', 'firefox', 'webkit'];

const args = process.argv.slice(2);
const key = args[0];
const browsersArg = args.indexOf('--browsers');
const browsers = browsersArg >= 0 ? args[browsersArg + 1].split(',') : ALL_BROWSERS;
const reuse = args.includes('--reuse');

const keys = key === 'all' ? Object.keys(FEATURES) : [key];
if (!keys.every((k) => k in FEATURES) || !browsers.every((b) => ALL_BROWSERS.includes(b))) {
  console.error('Usage: node scripts/run-feature.mjs <fA|fB|fC|all> [--browsers chromium,firefox,webkit] [--reuse]');
  process.exit(2);
}

const summary = [];
for (const k of keys) {
  for (const browser of browsers) {
    const reportDir = `reports/${k}/${browser}`;
    const env = {
      ...process.env,
      FEATURE: FEATURES[k].label,
      BROWSER: browser,
      REPORT_DIR: reportDir,
      FRESH_SUT: reuse ? '0' : '1',
    };
    delete env.RUN_STARTED; // each run gets its own ISO timestamp
    console.log(`\n=== ${k} (${FEATURES[k].label}) on ${browser} → ${reportDir}`);
    const run = spawnSync('npx', ['playwright', 'test', FEATURES[k].dir, `--project=${browser}`], {
      env,
      stdio: 'inherit',
    });
    summary.push({ feature: k, browser, exit: run.status, report: `${reportDir}/index.html` });
  }
}

// Exit code 1 = some tests failed (expected when a test reveals a bug); other codes = run error.
console.log('\nRun summary');
console.table(summary);
process.exit(summary.some((s) => s.exit !== 0 && s.exit !== 1) ? 1 : 0);
