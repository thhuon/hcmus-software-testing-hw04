# Knowledge sources of the automation skills

Order of authority: (1) the project's requirement document and instructions, (2) the course lecture, (3) external references. A skill that uses its own judgement says so (`Agent judgement`).

| Code | Source | Content used | Used by |
| --- | --- | --- | --- |
| [REQ] | The project's requirement document (named in the project's CLAUDE.md) | Requirement sentences quoted verbatim with `file:line` — the oracle of every assertion and bug | test-automation, automation-bug-reporting |
| [TD] | The project's designed test cases (domain testing / BVA tables of an earlier test design) | Test case ID, technique, input, expected result | test-automation |
| [ISTQB] | ISTQB Certified Tester Foundation Level Syllabus v4.0 (2023), §6.2 *Benefits and Risks of Test Automation* | Unrealistic expectations, maintenance cost, over-reliance on the tool; automation needs a test oracle | test-automation |
| [PW] | Playwright documentation — <https://playwright.dev/docs>: *Best Practices*, *Locators*, *Assertions*, *Parameterize tests*, *Reporters*, *Retries*, *Web server*, *Projects* | Locator priority (role → label → text → test id), web-first assertions, data-driven tests, HTML / JSON reporters, flaky tests, one project per browser | test-automation |
| [POM] | Fowler, M. (2013). *PageObject* — <https://martinfowler.com/bliki/PageObject.html> | Page objects hide locators and offer actions; assertions stay in the test | test-automation |
| [TRACKER] | The project's issue tracker conventions (README, issue template, labels) | Title format, template fields, labels, rules for already-reported bugs | automation-bug-reporting |
| [BRIEF] | The project's assignment (requirements for the demo video) | Duration, language, identity proof, required content | recording-test-demo-videos |
