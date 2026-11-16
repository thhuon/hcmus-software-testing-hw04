# Review rubric – Git commit conventions

Scoring, gate and output as in [../review-rubric-shared.md](../review-rubric-shared.md); the process criteria P1–P6 do not apply here. A commit that fails an M criterion and is not pushed yet is fixed (amend or split) before reporting; a pushed one is reported, never force-pushed without the human's instruction.

| # | M/S | Criterion | How to check |
| --- | --- | --- | --- |
| 1 | M | One purpose per commit | `git show --stat <hash>`: every file belongs to the purpose in the message |
| 2 | M | The human's corrections are their own commit | No human change amended into the agent's commit |
| 3 | M | Message format | `<type> (<scope>): <what changed>`; type from the list; lower case, imperative, no full stop, about 50–72 characters |
| 4 | M | No who-labels or AI trailers | No "AI draft", "review", "step n", "WIP"; no `Co-Authored-By` unless the project asks |
| 5 | M | Only intended files are staged | Explicit paths; no ignored, private or unrelated file in `git diff --cached --name-only` |
| 6 | M | Each commit leaves the project consistent | Renames (`git mv`) together with their reference updates; no broken link |
| 7 | M | Push only when asked or required | Then `git status -sb` shows the branch in sync |
| 8 | M | No rewrite of pushed history without an instruction | No force push, amend or rebase of pushed commits unless asked |
| 9 | S | The reply lists what happened | Commits (`hash message`), push result, files left uncommitted and why |
