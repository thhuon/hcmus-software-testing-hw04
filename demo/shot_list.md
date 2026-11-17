# HW04 – Demo videos: shot list

| Field | Value |
| --- | --- |
| Videos | (1) **Demo** – Task 2: one automation script end to end, multi-browser run, HTML report, one fix narrated (≥ 5 min) · (2) **Skill** – brief §7: the skills used end to end on one complete feature |
| Recording plan | One recording session while automating FR-15 Product CRUD (PLAN.md phase 3, C1–C7), cut into two videos (proposed, student confirms) |
| Narration | Vietnamese, **student's own voice** (brief §11 – no TTS). Recorded silently, voice-over added afterwards from [narration_script.md](narration_script.md) (student 18/11) |
| Identity proof | Terminal running `whoami` and `hostname` at the start of both videos and again right before the 3-browser run |
| Hosting | YouTube Unlisted → links in `README.md` §2–§3 and `HW04_Report.md` §9–§10 |

## 1. Requirements (V1)

| # | Requirement | Source | Video |
| --- | --- | --- | --- |
| R1 | At least 5 minutes long | Task 2, bullet 1 | Demo |
| R2 | Narrated in Vietnamese | Task 2, bullet 1 | Demo, Skill |
| R3 | The student's own voice narration (not AI-generated) | §11, bullet 2 | Demo, Skill |
| R4 | One automation script running end to end | Task 2, bullet 1 | Demo |
| R5 | The multi-browser run (Chromium, Firefox, WebKit) | Task 2, bullet 1; §6 Task 1 | Demo |
| R6 | The generated HTML report shown | Task 2, bullet 1 | Demo |
| R7 | The report shows `Run by: 23120046` and an ISO timestamp, from the run just shown | §11, bullet 1 | Demo |
| R8 | At least one fix made to the AI-generated script during the review, narrated | Task 2, bullet 2 | Demo |
| R9 | Face-cam or a terminal running `whoami` and `hostname` | Task 2, bullet 3; §11 | Demo, Skill |
| R10 | Uploaded to YouTube as **Unlisted** | Task 2, bullet 1; §7 | Demo, Skill |
| R11 | Shows end to end how the skill was used on one complete feature | §7 | Skill |
| R12 | The skill's workflow: data-driven, multi-browser script generation **and maintenance** | §7 | Skill |
| R13 | Video links in the README and the report | §13 | Demo, Skill |

## 2. Scenes (V2)

Scenes are numbered in **recording order** (one session). Durations are the length **in the final cut** (waits removed or sped up). `⟨…⟩` = fill in from the session. Full voice-over text per scene: [narration_script.md](narration_script.md).

| # | Scene | On screen | Narration points | Requirement covered | Video | Approx. duration |
| --- | --- | --- | --- | --- | --- | --- |
| S0 | Title | Title card: "HW04 – Automation Testing · FR-15 Quản lý sản phẩm · Hồ Thùy Hương – 23120046" (added in the editor) | Chào; video này cho thấy gì | – | Demo, Skill (own text each) | 0:15 |
| S1 | Identity | Terminal, font ≥ 16 px: `whoami && hostname && date -Iseconds && pwd` then `git log --oneline -1` | Tài khoản máy, tên máy, thời điểm quay, thư mục bài làm | R9 | Demo, Skill | 0:20 |
| S2 | The skill and the project profile | `skills/test-automation/SKILL.md` (step table T1–T8) → `review-rubric.md` → `scripts/` → `CLAUDE.md` feature row C → `automation.config.json` entry `product-crud` | Skill viết chung, rút ra từ A và B; giá trị riêng của bài nằm trong CLAUDE.md / config; mỗi bước AI làm → tự chấm rubric → dừng cho SV duyệt → 1 commit | R11, R12 | Skill | 0:50 |
| S3 | T1 Select test cases | Claude Code: prompt "Dùng skill test-automation, bước T1 cho feature product-crud" → `features/product-crud/automation_design.md` §1 fills in → AI self-review table → student's answer to "Decisions needed" → `git commit` | 36 TC HW02 (27 DT + 9 BVA); TC nào tự động hóa, TC nào không và vì sao; SV quyết định | R11 | Skill | 1:00 |
| S4 | T2 Locators and page objects | `npm run sut` (2nd terminal) → `npm run codegen:admin`: log in `admin@eshop.com`, open the product list and the add form, **Pick locator** on 2–3 elements → close codegen, **stop `npm run sut`** → Claude writes the page object(s) in `page-objects/` and design §2 | Codegen chỉ là bản nháp để đọc locator; ưu tiên role + tên hiển thị; phần tử nào không có tên → ghi vào testability findings | R11, R12 | Skill | 1:15 |
| S5 | T3 Test data | `data/product-crud/⟨file⟩.json` side by side with the HW02 TC row (`../week02/features/fC-pool-C/02_domain_testing.md`) | Dữ liệu tách khỏi code; kết quả mong đợi lấy từ TC HW02, không lấy từ app; dữ liệu duy nhất mỗi lần chạy | R11, R12 | Skill | 0:45 |
| S6 | T4 Generate specs + first run | Prompt T4 → `tests/product-crud/*.spec.ts` appear → `npx playwright test tests/product-crud --project=chromium` → result line | AI sinh script data-driven, ≥ 3 kiểu assertion; lần chạy đầu chỉ Chromium; chưa sửa gì | R11, R12 | Skill | 1:00 |
| S7 | T5 Review and **one fix** | (a) the test / line the AI got wrong (UI mode `npm run ui -- tests/product-crud` or the failing output) → (b) explain why it is wrong → (c) the fix in the editor → (d) rerun `npx playwright test tests/product-crud --project=chromium -g "⟨TC ID⟩"` → (e) design §5 row → `git show --stat ⟨hash⟩`. **Fallback** if the AI made no mistake in FR-15: `git show f0b2152` (checkout review row 2, weak assertion on refused API rows) | Dòng sai → vì sao sai → loại lỗi → AI sai vì đâu (SV quyết) → cách sửa → chạy lại → commit | R8, R12 | Demo, Skill | 1:40 |
| S8 | The script, walked through | (recorded after S7, so the fixed script is shown) spec file → the `for (const row of rows)` loop → data file → page object → the ⟨3⟩ assertion patterns (highlight each) | Script nào sẽ chạy; data-driven; page object; locator; ⟨3⟩ kiểu assertion | R4 | Demo | 1:30 |
| S9 | T6 The 3-browser run | Same terminal: `whoami && hostname` then `npm run feature -- product-crud`, **one continuous shot** to the last browser's result line; waits sped up ×4–×8 with an on-screen "×8" label, not cut | Lệnh khởi động lại SUT (DB sạch) rồi chạy Chromium → Firefox → WebKit; mỗi trình duyệt 1 báo cáo; đọc kết quả từng trình duyệt | R4, R5, R9 | Demo, Skill | 1:15 (Demo) · 0:45 (Skill) |
| S10 | The HTML reports | `npm run report -- reports/product-crud/chromium` → zoom on the title (`HW04 · product-crud · chromium · Run by: 23120046 · <ISO>`) → open one passed test (steps) → open one failed test (expected vs received, screenshot) → Firefox and WebKit reports, title only | Tiêu đề có Run by + giờ ISO khớp lần chạy vừa rồi; test pass; test fail đọc expected / received | R6, R7 | Demo, Skill | 1:30 (Demo) · 0:45 (Skill) |
| S11 | T7 Failure triage and bug | `npm run trace -- ⟨trace.zip⟩` on one failing test (DOM snapshot, network) → verdict product vs script (student) → `automation-bug-reporting`: the HW02 issue with the new "HW04" comment, or the new issue with label `hw: HW04`, in the browser | Trace viewer cho thấy gì; SV kết luận lỗi sản phẩm hay lỗi script; bug cũ → bình luận, bug mới → issue mới | R11, R12 | Skill (Demo: 0:20 summary) | 1:15 |
| S12 | T8 Summary | `npm run summary` → design §6–§8 → `git log --oneline -- tests/product-crud` | Số TC tự động hóa / pass / fail / không tự động hóa; các commit theo từng bước | R11 | Skill (Demo: 0:20) | 0:45 |
| S13 | Closing | Editor or title card | Tóm tắt, cảm ơn | – | Demo, Skill | 0:15 |

### Planned cuts

| Video | Scenes in order | Planned length |
| --- | --- | --- |
| Demo (Task 2) | S0 → S1 → S8 → S7 → S9 → S10 → S11 (short) → S12 (short) → S13 | ≈ 7:15 (≥ 5:00, R1) |
| Skill (§7) | S0 → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S9 → S10 → S11 → S12 → S13 | ≈ 10:30 |

In the Demo cut, S8 (the script) comes before S7 (the fix) so the viewer knows the script before hearing what was wrong in it.

## 3. Preparation (V3)

- [ ] Private apps closed: Zalo / Messenger / mail / password manager; notifications off (Do Not Disturb)
- [ ] Clean browser profile for GitHub and the reports; personal bookmarks hidden; `gh auth status` shows `thhuon`
- [ ] No server left running on ports 3000 / 5173 / 5174 before S9 (`npm run feature` starts a fresh SUT, so the database is re-seeded = test data reset)
- [ ] VS Code zoom and terminal font ≥ 16 px; one window layout at 1920×1080; theme readable
- [ ] OBS (or SimpleScreenRecorder): display capture 1920×1080, 30 fps, `.mkv`; microphone **off** (voice-over later), desktop audio off
- [ ] A notepad (outside the capture area) to write the wall-clock time at the start of each scene S1 … S13 – makes cutting fast
- [ ] Dry run: `npx playwright test tests/smoke.spec.ts --project=chromium` passes; note how long one browser of `npm run feature` takes
- [ ] Voice-over: Audacity (or the editor's recorder), quiet room, test 10 s of audio; editor Kdenlive / Shotcut

## 4. Check of the final cut (V5)

Timestamps come from the student after the cut.

| Requirement | Video | Timestamp | OK? |
| --- | --- | --- | --- |
| R1 length ≥ 5:00 | Demo | | |
| R2, R3 Vietnamese, own voice | Demo | | |
| R9 `whoami` + `hostname` | Demo | | |
| R4 script shown | Demo | | |
| R8 fix narrated | Demo | | |
| R5 3-browser run (continuous) | Demo | | |
| R6, R7 report title with `Run by: 23120046` + ISO time | Demo | | |
| R10 Unlisted, link opens in a private window | Demo | | |
| R2, R3 Vietnamese, own voice | Skill | | |
| R9 `whoami` + `hostname` | Skill | | |
| R11 T1 … T8 shown on FR-15 | Skill | | |
| R12 data-driven, multi-browser, maintenance (fix) | Skill | | |
| R10 Unlisted, link opens in a private window | Skill | | |
| R13 links in README and report | Demo, Skill | | |

Links: <video 1 URL> · <video 2 URL>
