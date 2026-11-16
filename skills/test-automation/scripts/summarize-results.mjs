#!/usr/bin/env node
// Counts the results of the multi-browser runs from <reportsDir>/<feature>/<browser>/results.json
// (Playwright JSON reporter). No hand counting.
// Usage: node summarize-results.mjs --config automation.config.json [--markdown]
// Per test case: Passed = passed on every browser it ran on; Failed = failed on at least one browser;
// Flaky = passed only after a retry; Skipped = skipped everywhere. The TC ID is read from the start of
// the test title with config.tcIdPattern (titles look like "DT-01 – …").
import { existsSync, readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const configPath = args.includes('--config') ? args[args.indexOf('--config') + 1] : 'automation.config.json';
const markdown = args.includes('--markdown');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const tcId = new RegExp(config.tcIdPattern ?? '^[A-Z][A-Za-z]*-\\d+');

// Flatten the suite tree of a JSON report into { title, status } per test.
function collect(suite, out) {
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests ?? []) out.push({ title: spec.title, status: t.status });
  }
  for (const child of suite.suites ?? []) collect(child, out);
  return out;
}
const STATUS = { expected: 'passed', unexpected: 'failed', flaky: 'flaky', skipped: 'skipped' };

const runs = [];
const cases = new Map(); // `${feature}|${id}` -> { feature, id, title, byBrowser: {} }
const missing = [];
for (const [key, feature] of Object.entries(config.features)) {
  for (const browser of config.browsers) {
    const file = `${config.reportsDir}/${key}/${browser}/results.json`;
    if (!existsSync(file)) { missing.push(file); continue; }
    const report = JSON.parse(readFileSync(file, 'utf8'));
    const tests = (report.suites ?? []).reduce((acc, s) => collect(s, acc), []);
    const count = (s) => tests.filter((t) => STATUS[t.status] === s).length;
    runs.push({
      feature: key, label: feature.label, browser,
      started: report.stats?.startTime ?? '', tests: tests.length,
      passed: count('passed'), failed: count('failed'), flaky: count('flaky'), skipped: count('skipped'),
    });
    for (const t of tests) {
      const id = t.title.match(tcId)?.[0] ?? t.title;
      const k = `${key}|${id}`;
      if (!cases.has(k)) cases.set(k, { feature: key, id, title: t.title, byBrowser: {} });
      cases.get(k).byBrowser[browser] = STATUS[t.status] ?? t.status;
    }
  }
}

const verdict = (c) => {
  const v = Object.values(c.byBrowser);
  if (v.includes('failed')) return 'failed';
  if (v.every((s) => s === 'skipped')) return 'skipped';
  if (v.includes('flaky')) return 'flaky';
  return 'passed';
};
const all = [...cases.values()];
const perFeature = Object.keys(config.features).map((key) => {
  const fc = all.filter((c) => c.feature === key);
  return {
    feature: key,
    automated: fc.length,
    executed: fc.filter((c) => verdict(c) !== 'skipped').length,
    passed: fc.filter((c) => verdict(c) === 'passed').length,
    failed: fc.filter((c) => verdict(c) === 'failed').length,
    flaky: fc.filter((c) => verdict(c) === 'flaky').length,
    runs: runs.filter((r) => r.feature === key).length,
  };
});
const total = perFeature.reduce((t, f) => {
  for (const k of ['automated', 'executed', 'passed', 'failed', 'flaky', 'runs']) t[k] += f[k];
  return t;
}, { feature: 'Total', automated: 0, executed: 0, passed: 0, failed: 0, flaky: 0, runs: 0 });

function table(rows, cols) {
  if (!markdown) { console.table(rows.map((r) => Object.fromEntries(cols.map((c) => [c, r[c]])))); return; }
  console.log(`| ${cols.join(' | ')} |\n| ${cols.map(() => '---').join(' | ')} |`);
  for (const r of rows) console.log(`| ${cols.map((c) => r[c] ?? '').join(' | ')} |`);
  console.log();
}

console.log(markdown ? '#### Runs\n' : 'Runs');
table(runs, ['feature', 'browser', 'started', 'tests', 'passed', 'failed', 'flaky', 'skipped']);
console.log(markdown ? '#### Test cases (across browsers)\n' : 'Test cases (across browsers)');
table(all.map((c) => ({ ...c, ...c.byBrowser, result: verdict(c) })), ['feature', 'id', ...config.browsers, 'result']);
console.log(markdown ? '#### Totals\n' : 'Totals');
table([...perFeature, total], ['feature', 'automated', 'executed', 'passed', 'failed', 'flaky', 'runs']);
if (missing.length) console.error(`Missing results (run not done yet):\n  ${missing.join('\n  ')}`);
