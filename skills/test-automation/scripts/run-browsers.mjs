#!/usr/bin/env node
// Runs one feature (or all) on each browser separately: one HTML report + results.json per run in
//   <reportsDir>/<feature>/<browser>/
// Usage: node run-browsers.mjs --config automation.config.json <feature|all> [--browsers chromium,firefox] [--reuse]
//   --reuse  use SUT servers that are already running (default: FRESH_SUT=1, the Playwright config starts
//            new servers for every run, so a backend that seeds its database at start gives clean data)
// The Playwright config reads FEATURE, BROWSER, REPORT_DIR, FRESH_SUT (see templates/playwright.config.ts).
// Screenshots and traces of each run go to <outputDir>/<feature>/<browser> (config "outputDir", default
// "test-output"), not to Playwright's shared test-results/, which every other run (another terminal or
// session) empties when it starts.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const configPath = opt('--config') ?? 'automation.config.json';
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const key = args.find((a, i) => !a.startsWith('--') && !['--config', '--browsers'].includes(args[i - 1]));
const browsers = opt('--browsers')?.split(',') ?? config.browsers;
const reuse = args.includes('--reuse');
const outputRoot = config.outputDir ?? 'test-output';

const keys = key === 'all' ? Object.keys(config.features) : [key];
const badKey = keys.find((k) => !(k in config.features));
const badBrowser = browsers.find((b) => !config.browsers.includes(b));
if (!key || badKey || badBrowser) {
  console.error(`Unknown ${badBrowser ? `browser "${badBrowser}"` : `feature "${badKey ?? ''}"`}.`);
  console.error(`Usage: node run-browsers.mjs --config <file> <${Object.keys(config.features).join('|')}|all> [--browsers ${config.browsers.join(',')}] [--reuse]`);
  process.exit(2);
}

const summary = [];
for (const k of keys) {
  for (const browser of browsers) {
    const reportDir = `${config.reportsDir}/${k}/${browser}`;
    const env = { ...process.env, FEATURE: config.features[k].label, BROWSER: browser, REPORT_DIR: reportDir, FRESH_SUT: reuse ? '0' : '1' };
    delete env.RUN_STARTED; // every run gets its own ISO timestamp
    console.log(`\n=== ${k} (${config.features[k].label}) on ${browser} → ${reportDir}`);
    const outputDir = `${outputRoot}/${k}/${browser}`;
    const run = spawnSync('npx', ['playwright', 'test', config.features[k].dir, `--project=${browser}`, `--output=${outputDir}`], { env, stdio: 'inherit' });
    summary.push({ feature: k, browser, exit: run.status, report: `${reportDir}/index.html` });
  }
}

// Exit code 1 from Playwright = some tests failed (expected when a test finds a defect); anything else = run error.
console.log('\nRun summary');
console.table(summary);
process.exit(summary.some((s) => s.exit !== 0 && s.exit !== 1) ? 1 : 0);
