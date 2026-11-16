---
name: recording-test-demo-videos
description: Use when a tester must record a narrated demo video of their own testing work — automated scripts running end to end on several browsers with the HTML report, an Agent Skill used on a whole feature, or a fix made to AI-generated code — and needs the shot list, a narration outline in their language, the identity proof (face-cam or `whoami` / `hostname`), the recording setup, or a final check of the video against the assignment before uploading it as an unlisted YouTube video.
---

# Recording Test Demo Videos

**Topic:** Evidence videos of testing work. **Source:** [BRIEF] (the project's video requirements); codes in `../SOURCES.md`.

## Overview

A demo video is evidence that the tester did the work. It fails as evidence when a required element is missing (identity proof, a browser run, the report, the narrated fix) or when it looks staged (a replayed report, a synthetic voice where the tester's own voice is required). The cheapest way to get it right is to **record real work while doing it**, from a shot list written beforehand, and to check the cut against the requirements before uploading.

| Step | Output | Who does it |
| --- | --- | --- |
| V1 Requirements | requirement checklist in the shot list | Agent from the project's brief |
| V2 Shot list | scenes, what is on screen, narration points | Agent drafts, tester edits |
| V3 Prepare | clean machine, data reset, recorder settings, dry run | Tester, with the agent's checklist |
| V4 Record | raw recording(s) | **Tester only** |
| V5 Cut and check | final video(s), timestamp of each requirement, upload | Tester cuts; agent checks the timestamps the tester gives |

**Core rule: the agent plans and checks; the recording, the voice and the upload are the tester's. Nothing in the video is staged: every run shown is a real run on the tester's machine.**

## Project context (read first)

Take these from the project's instructions or the assignment: how many videos and what each must show, minimum length, language of the narration, identity proof (face-cam, `whoami` + `hostname`, name on screen), whether a synthetic voice is allowed, hosting (e.g. YouTube unlisted), where the links go (README, report).

If two videos are required and their content overlaps (e.g. "the skill used on a whole feature" and "a script running end to end with the report"), plan **one recording session** that covers both and two cuts from it; say so in the shot list so the tester can decide.

## V1 – Requirements

List every requirement of every video as a checkbox with its source line from the brief, e.g. `[ ] ≥ 5 min`, `[ ] narrated in <language>, tester's own voice`, `[ ] whoami + hostname visible`, `[ ] all browsers run`, `[ ] HTML report opened, identity text visible`, `[ ] one fix to AI-generated code narrated`.

## V2 – Shot list ([templates/shot-list.md](templates/shot-list.md))

One row per scene: `# | Scene | On screen | Narration points | Requirement covered | Approx. duration`.

- Start with identity: terminal running `whoami` and `hostname` (or the face-cam), date and the project folder.
- Show the input before the output: the test cases / data file before the run, the AI prompt before the generated code.
- For the fix: the failing run → the line that was wrong → why the AI got it wrong → the fix (diff or commit) → the passing or correctly failing rerun.
- For multi-browser runs: run all browsers in one command and keep the terminal visible; then open each report and point at its title (identity + timestamp).
- Narration points are short bullets in the narration language, in the tester's words — what is happening and why — not a script to read, unless the tester asks for one.

## V3 – Prepare (checklist for the tester)

- Close chats, mail, password managers, notifications; use a clean browser profile; hide personal bookmarks.
- Reset the test data so the run matches what the video says.
- Terminal and editor font ≥ 16 px; window size the recorder captures fully (e.g. 1920×1080); dark / light theme readable.
- Recorder (e.g. OBS): screen + microphone, test 10 s of audio; face-cam layer if used.
- Dry run of the whole shot list once without recording; note how long each run takes so waits can be cut later.

## V4 – Record

The tester records. Options the agent can suggest:

- **Narrate live** while working, or **record silently and add the voice-over afterwards** from the narration points (fewer retakes). Both use the tester's own voice.
- Pause the recorder during long AI generations or installs instead of cutting later.
- If a scene goes wrong, keep recording and redo that scene; cut later.

## V5 – Cut and check

1. The tester cuts waits and mistakes; runs, reports and the fix stay uncut enough to be credible (the command and its output in one continuous shot).
2. The tester gives the timestamps; the agent fills the check table in the shot list: `Requirement | Video | Timestamp | OK?`. Anything missing → re-record that scene only.
3. Upload as the project says (e.g. YouTube **Unlisted**); test the link in a private window; put the links where the project says.

## Every reply has exactly this shape

1. Step, one line.
2. The checklist, shot list or check table.
3. **AI self-review**: score P1–P6 of [../review-rubric-shared.md](../review-rubric-shared.md) and the step's table of [review-rubric.md](review-rubric.md) as `# | Score (2/1/0/N/A) | Evidence | Action`, and end with `Gate: passed` or `Gate: blocked by <#>`.
4. **Decisions needed** (one or two videos from one session, live vs voice-over) and **Next step**. Then stop.

## Commits and AI-use log

Follow git-commit-conventions: `docs (video): add the shot list for <video>`, `docs (video): add the video links and requirement timestamps`. Raw video files are not committed (ignore `*.mp4`, `*.mov`, `*.mkv`). If the project keeps an AI audit log or a prompt log, add its entry in the same turn.

## Integrity

| Excuse | Reality |
|--------|---------|
| "Use a text-to-speech voice, it sounds cleaner" | When the project requires the tester's own voice, a synthetic voice makes the video invalid. |
| "Open yesterday's report, the run takes too long" | Show a real run; cut the waiting, not the run. |
| "The agent can write the narration word for word" | Narration points only, in the tester's words, unless the tester asks for a script. |
| "Identity proof can be added as a caption" | Show it live: the terminal command output or the face-cam. |
| "Fake a fix for the video" | Narrate a real fix from the review, with its commit. |
