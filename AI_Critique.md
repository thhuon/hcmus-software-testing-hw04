# AI Critique – HW04-AI (200–300 words)

| Student name | Student ID | Exercise |
| --- | --- | --- |
| HỒ THÙY HƯƠNG | 23120046 | HW04-AI |

<!-- One paragraph of 200–300 words that answers all 3 questions (brief §10); each point refers to a specific artifact (Artifact #n in AI-02, a spec › test, a review row of features/<feature>/automation_design.md §5):
     1. Where did the AI get something wrong, biased, or incomplete?
     2. Why did it fail to catch the issue?
     3. What principle have you learned about collaborating with AI during this assignment?
     Suggested material: the review tables (§5) of the three features (fragile selectors, weak assertions, wrong oracles, flaky waits, missing edge cases, and their cause types), the INCOMPLETE / INVALID rows in AI-02. -->

Word count: 288

## Critique

The AI was most often wrong about what its assertions actually proved, not about how it found elements. Across the three features I corrected eleven mistakes in the generated scripts (design §5 of each feature), and none was a fragile selector, because every locator had been counted on Chromium, Firefox and WebKit before any spec was written. The worst was a false pass: FR-03 DT-05 passed while the Web refused the password reset, because one login check was copied to every success row and could not tell the two outcomes apart, which hid BUG-01 (#1). The AI also added conventions to the requirement (a `role="alert"` that FR-22 never asks for), left weak branches (an `if` on page state, refused API rows that checked nothing), and read values once before asserting, so FR-15 DT-17 saw an empty category list when the request was 1.5 s late. Other mistakes appeared only when the app ran under real conditions: FR-08 accounts collided on repeated runs, a click was lost on a busy Firefox, and in FR-15 DT-16 the AI trusted its own exploration over the test case and expected the browser to block a price that the Admin web actually sends. It missed them because seven of the eleven came from model habits that look correct on a fast local server, three from behaviour visible only at run time, and one from a prompt that carried an earlier choice forward unchanged. The principle I learned is that a passing test is a claim I must verify: I check that every assertion can fail for the defect it targets, take oracles from the test case and the requirement instead of the running app, and repeat runs across browsers before trusting a result.