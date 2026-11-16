import { defineConfig, devices } from '@playwright/test';

// Identity shown in every HTML report title, e.g. "Run by: 12345678". Change it per project.
const RUN_BY = 'Run by: <ID>';
// Fixed once per run: the config is re-evaluated in each worker, the env var keeps one value.
process.env.RUN_STARTED ??= new Date().toISOString();
const RUN_STARTED = process.env.RUN_STARTED;

// Set by run-browsers.mjs; empty when Playwright is called directly.
const FEATURE = process.env.FEATURE ?? '';
const BROWSER = process.env.BROWSER ?? '';
const REPORT_DIR = process.env.REPORT_DIR ?? 'playwright-report';
const title = [FEATURE, BROWSER, RUN_BY, RUN_STARTED].filter(Boolean).join(' · ');

// FRESH_SUT=1 starts new SUT servers (e.g. a backend that re-seeds its database at start).
const reuseServers = process.env.FRESH_SUT !== '1';

export default defineConfig({
  testDir: './tests',
  // A shared database: one test at a time, so data changes do not collide.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0, // flaky tests are fixed, not retried
  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: [
    ['list'],
    ['html', { title, outputFolder: REPORT_DIR, open: 'never' }],
    ['json', { outputFile: `${REPORT_DIR}/results.json` }],
  ],
  metadata: { 'Run by': RUN_BY, 'Started at': RUN_STARTED, Feature: FEATURE || 'all', Browser: BROWSER || 'all' },

  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // One entry per server of the system under test.
  webServer: [
    {
      command: 'npm start',
      cwd: './sut/backend',
      url: 'http://localhost:3000/health',
      reuseExistingServer: reuseServers,
      timeout: 60_000,
    },
  ],
});
