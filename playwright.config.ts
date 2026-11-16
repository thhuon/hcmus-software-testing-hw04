import { defineConfig, devices } from '@playwright/test';

// Identity and timestamp shown in every HTML report (brief §6 Task 1, §11).
const STUDENT_ID = '23120046';
// Fixed once per run: the config is re-evaluated in each worker, the env var keeps one value.
process.env.RUN_STARTED ??= new Date().toISOString();
const RUN_STARTED = process.env.RUN_STARTED;

// Set by scripts/run-feature.mjs; empty when Playwright is called directly.
const FEATURE = process.env.FEATURE ?? '';
const BROWSER = process.env.BROWSER ?? '';
const reportTitle = ['HW04', FEATURE, BROWSER, `Run by: ${STUDENT_ID}`, RUN_STARTED]
  .filter(Boolean)
  .join(' · ');

// FRESH_SUT=1 starts new SUT servers, so the backend re-creates and re-seeds the database.
const reuseServers = process.env.FRESH_SUT !== '1';
const SUT = './eshop-sut';

export default defineConfig({
  testDir: './tests',
  // One shared SQLite database: run tests one at a time so data changes do not collide.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: [
    ['list'],
    [
      'html',
      {
        title: reportTitle,
        outputFolder: process.env.REPORT_DIR ?? 'playwright-report',
        open: 'never',
      },
    ],
  ],
  metadata: {
    'Run by': STUDENT_ID,
    'Started at': RUN_STARTED,
    Feature: FEATURE || 'all',
    Browser: BROWSER || 'all',
  },

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

  // Backend :3000, customer web :5173, admin web :5174.
  webServer: [
    {
      command: 'node server.js',
      cwd: `${SUT}/backend`,
      url: 'http://localhost:3000/api/categories',
      reuseExistingServer: reuseServers,
      timeout: 60_000,
    },
    {
      command: 'npm run dev -- --port 5173 --strictPort',
      cwd: `${SUT}/frontend-web`,
      url: 'http://localhost:5173',
      reuseExistingServer: reuseServers,
      timeout: 60_000,
    },
    {
      command: 'npm run dev -- --port 5174 --strictPort',
      cwd: `${SUT}/frontend-admin`,
      url: 'http://localhost:5174',
      reuseExistingServer: reuseServers,
      timeout: 60_000,
    },
  ],
});
