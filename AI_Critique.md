# AI Critique – HW04-AI (200–300 words)

| Student name | Student ID | Exercise |
| --- | --- | --- |
| HỒ THÙY HƯƠNG | 23120046 | HW04-AI |

<!-- One paragraph of 200–300 words that answers all 3 questions (brief §10); each point refers to a specific artifact (Artifact #n in AI-02, a spec › test, a review row of features/<feature>/automation_design.md §5):
     1. Where did the AI get something wrong, biased, or incomplete?
     2. Why did it fail to catch the issue?
     3. What principle have you learned about collaborating with AI during this assignment?
     Suggested material: the review tables (§5) of the three features (fragile selectors, weak assertions, wrong oracles, flaky waits, missing edge cases, and their cause types), the INCOMPLETE / INVALID rows in AI-02. -->

Word count: 0

## Critique

[SV viết – 200–300 từ, một đoạn trả lời cả 3 câu hỏi; sau đó xóa mục Evidence bên dưới]

## Evidence (xoá trước khi nộp)

Taken from the review tables (design §5 of each feature, cause types decided by the student) and AI-02. Counts: 11 mistakes in the AI-generated scripts – FR-03 3, FR-08 6, FR-15 2; cause type Model 7, Feature 3, Prompt 1. By category: weak assertion 4, hidden dependency 2, flaky wait 2, wrong oracle 2, missing edge case 1, fragile selector 0.

| Question | Evidence (IDs + file) | Cause (prompt / tool / complexity) |
| --- | --- | --- |
| Where was the AI wrong, biased or incomplete? | **False pass:** FR-03 DT-05 passed although the Web refused the reset – the login check could not tell the two outcomes apart, so BUG-01 (#1) was hidden ([forgot-password design §5](features/forgot-password/automation_design.md#5-review-of-the-ai-generated-scripts-t5) #1, AI-02 #15) | Model: one login check copied to every success row without asking whether it discriminates for this row |
| | **Oracle added to the requirement:** FR-03 error check required `role="alert"`, which FR-22 does not ask for (FR-03 §5 #2) | Model: a common accessibility convention treated as the requirement |
| | **Weak assertions:** FR-03 acting on missing elements → 30 s timeout without naming the FR-03 element (FR-03 §5 #3); FR-08 refused API rows that named no order count checked nothing and passed (checkout §5 #2); FR-08 DT-03 path (a) solved with an `if` on page state (checkout §5 #4) | Model |
| | **Hidden dependencies:** FR-08 account e-mail equal for every repeat / retry – 6 of 12 runs failed with `--repeat-each=3` (checkout §5 #1); DT-07 Web and API registered the same account (checkout §5 #6) | Feature (#1: backend registers a taken e-mail again, seen only when the app runs); Model (#6) |
| | **Missing edge case:** FR-08 DT-03 path (b) typed `/checkout`, which reloads the page and empties the guest's cart – two invalid classes in one test (checkout §5 #3) | Prompt: the student's "typed URL" from T1 was carried into the prompt; the model did not connect it with the T2 finding that a reload empties the cart |
| | **Flaky waits:** FR-08 `addToCart` fixed two clicks, failed once on a busy Firefox (checkout §5 #5); FR-15 DT-17 read the category options once with `allInnerTexts()` – returns `[]` when `/api/categories` is 1.5 s late (product-crud §5 #2; fix narrated in the Task 2 video) | Feature (#5: no visible state after the first click, race only under load); Model (DT-17: read-then-assert pattern) |
| | **Wrong oracle from its own exploration:** FR-15 DT-16 expected the browser to block `250000.5`, but the Admin web sends it once React re-renders (product-crud §5 #1) | Feature: T2 read the field right after `fill()`; T3 / T4 trusted that finding over the TC's own "refused" |
| | **Outside the scripts:** the skill script `summarize-results.mjs` kept only the last test of a TC, so FR-15 counted 17 / 19 instead of 14 / 22 (AI-02 #S12); the first video 2 draft put "em chạy … trên 3 trình duyệt" over footage with no run (AI-02 #53, caught by the AI itself); the smoke test guessed the price format "₫" instead of "VND" (AI-02 #3) | Model: assumptions not checked against the real data / footage |
| Why did it miss it? | Most mistakes (7 of 11) are the model's habits: reuse one check for every row, add conventions to the requirement, read then assert, branch on page state. The others appear only when the app runs: repeats, slow requests, browser load, React re-renders (3 Feature) – the first run on a fast local server hid them. One came from the prompt carrying an earlier choice unchanged. No fragile selector was found: T2 counted every locator on three browsers before any spec was written | |
| What principle did I learn? | (student) | |

