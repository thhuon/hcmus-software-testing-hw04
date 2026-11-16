**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

AI Audit Report — Mẫu 5 mục cho mỗi Artifact

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## 1. Thông tin Sinh viên

| Mục | Giá trị |
| --- | --- |
| Họ tên sinh viên (in hoa): | HỒ THÙY HƯƠNG |
| MSSV: | 23120046 |
| Lớp / Khoá: | CQ2023/3 |
| Mã bài tập (ví dụ HW#00, HW#02): | HW04-AI |
| Ngày làm bài: | 16/11/2026 – … (theo prompt_log.md) |
| Công cụ AI đã dùng: | Claude Code (claude-opus-5-5) |
| Công cụ AI đã dùng: | [x] Có  [ ] Không |

## 2. Hướng dẫn (đọc trước khi điền)

- Thêm 1 hàng cho mỗi artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…).

- Dán nguyên văn prompt — KHÔNG paraphrase.

- Dán nguyên văn output AI (hoặc kèm screenshot có chú thích trong báo cáo).

- Gắn nhãn: VALID / INVALID / INCOMPLETE.

- Lý do phải dẫn chiếu slide, mục ISTQB, hoặc RFC kỹ thuật.

- Hiển thị bản sửa với phần thay đổi được tô sáng.

- Hàng mẫu in nghiêng — thay trước khi nộp.

## 3. Bảng Audit — 1 hàng / artifact

**Khai báo (theo Đề HW04 §9):** *"I use AI tools for the following tasks,"* — chi tiết từng tương tác (tool, ngày giờ, prompt, output) ở bảng dưới và trong `prompt_log.md`.

Nguồn dẫn chiếu trong cột (4):

- **[ĐỀ]**: `HW04_Automation_Testing_Original.md`
- **[POL]**: `___2026.Homework.Policies.md`
- **[SRS]**: `eshop-sut/README.md`
- **[PW]**: Playwright documentation – https://playwright.dev/docs (Best Practices, Locators, Test assertions, Reporters)

Cột (1): `Artifact #n` cho sản phẩm bài làm, `Artifact #Sn` cho mỗi prompt thay đổi Agent Skill. Prompt chưa được log ghi `prompt dd/mm HH:MM (logged later)`; skill logging-ai-prompts điền số PromptNNN và nguyên văn khi log.

| (1) Prompt + Công cụ | (2) Output AI | (3) Verdict | (4) Lý do (ISTQB) | (5) Bản SV sửa |
| --- | --- | --- | --- | --- |
| **Artifact #1 – Chọn 3 feature web dùng lại từ HW02 (FR-03, FR-08, FR-15)**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 16/11 13:43 (logged later)<br>Prompt: "từ yêu cầu cho bài tập tuần 4, dùng lại các feature đã phân công cho bài tập tuần 02<br>track local theo remote repo này: git@github-home.com:thhuon/hcmus-software-testing-hw04.git" | File: `features/selected-features.md` (commit 22327fd): 3 feature pool A/B/C lấy từ `picked-features.md` của HW02, số TC DT + BVA có sẵn (44 / 17 / 36), loại FR-10 (mobile); repo git nối remote `github-home` (alias SSH, sửa từ `github-home.com` không phân giải được) | Đề xuất: VALID – SV xác nhận | (đề xuất) Đúng [ĐỀ] §5: dùng lại 3 feature web của HW02, bỏ feature Pool D; mỗi feature có ≥ 12 TC để đạt mức tối thiểu [ĐỀ] §6 Task 1 | [SV điền] – chưa review |
| **Artifact #2 – Kế hoạch làm bài theo thứ tự thực hiện (PLAN.md), thời điểm quay 2 video**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 16/11 13:49 (logged later), prompt 16/11 23:37 (logged later)<br>Prompt: "trình bày thứ tự các việc cần làm, ko phải theo thứ tự các yêu cầu<br>vì còn có yêu cầu quay video quy trình dùng skill và quy trình chạy automation script thì tôi nên quay các video đó khi nào để ko mất nhiều thời gian<br>nói chung là một quy trình để hoàn thiện bài tập này một cách tối ưu, ko mất quá nhiều thời gian dư thừa ko cần thiết" · "- đã có eshop bên trong folder seminar, bạn có thể copy qua ko cần clone lại mất thời gian chờ<br>- thiết lập sẵn môi trường các tool, trình duyệt cần thiết cho bài tập này<br>- tạo issue trên repo cá nhân<br>- trong các bài tập trước có khai báo đường link repo của nhóm ko<br>- tạo thành file PLAN.md và commit lên remote, kể cả các bước setup cũng commit từng bước" | File: `PLAN.md` (commit 4271c85): 6 giai đoạn (chuẩn bị S1–S9, A1–A8, B, C + quay video, chạy chính thức, tài liệu), quay 1 lần khi làm FR-15 rồi dựng 2 video, bảng bố cục thư mục, lưu ý [ĐỀ] §11 | Đề xuất: VALID – SV xác nhận | (đề xuất) Phủ đủ yêu cầu [ĐỀ] §6 Task 1–2, §7, §9–§12, §14; video giữ giọng thật và `whoami` / `hostname` theo [ĐỀ] §11; dùng chung bản quay cho 2 video là đề xuất của agent, SV quyết định | [SV điền] – chưa review |
| **Artifact #3 – Môi trường automation: Playwright 1.64.1, config 3 trình duyệt + tự bật SUT + tiêu đề "Run by", script chạy theo feature, smoke test, CLAUDE.md**<br>Tool: Claude Code (claude-opus-5-5) + Playwright<br>Thời gian: prompt 16/11 23:37 (logged later)<br>Prompt: (như prompt thứ hai của Artifact #2) | File: `package.json` (commit 5da7237), `playwright.config.ts` (commit a737bfd), `scripts/run-feature.mjs` (commit 2276eb1), `tests/smoke.spec.ts` (commit b81f38e), `CLAUDE.md` (commit 3a4f869). Smoke test chạy đạt 6/6 trên Chromium + Firefox; WebKit chờ SV cài 3 thư viện hệ thống (cần sudo) | Đề xuất: INCOMPLETE – SV xác nhận | (đề xuất) Báo cáo HTML có `Run by: 23120046` + timestamp ISO đúng [ĐỀ] §6 Task 1, §11 (đã mở báo cáo kiểm tra tiêu đề); mỗi feature × trình duyệt ra 1 báo cáo riêng ([ĐỀ] §6: ≥ 9 lần chạy). Lần chạy đầu smoke test fail 2/6 do agent đoán sai định dạng giá ("₫" trong khi web hiện "VND"), agent sửa trước khi commit; WebKit chưa chạy được | [SV điền] – chưa review |
| **Artifact #4 – Chuyển nơi báo bug sang repo nhóm HW02 (bình luận vào issue HW02, issue mới có label `hw: HW04`)**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 17/11 00:27 (logged later)<br>Prompt: "tôi đã run xong lệnh sudo tải webkit, hãy tiếp tục chạy smoke test<br>từ các file tài liệu trên, hãy dựng các skill cần thiết cho bài tập này, tôi sẽ review các skill bạn đã viết<br>bài tập này dùng lại repo nhóm của bài tập tuần 2, từ cắc issue đã được chạy tay ở bài tập tuần 2 thì tuần này thực hiện theo hướng automation, nếu có gì khác thì comment, nếu phát hiện thêm issue thì tạo issue mới<br>bên cạnh đó, tạo sẵn các file, folder cần nộp cho bài tập này" | File: `CLAUDE.md` mục Bug reports, `PLAN.md` R2 (commit b58082e): theo README repo nhóm §4 (template, tiêu đề, label) và §6 (quy tắc HW04) | Đề xuất: VALID – SV xác nhận | (đề xuất) Đúng README repo nhóm §6: bug đã có issue HW02 thì bình luận, không tạo issue mới; bug mới gắn thêm `hw: HW04` | [SV điền] – chưa review |
| **Artifact #5 – Dùng script của skill để chạy 3 trình duyệt, thêm kết quả JSON để đếm số liệu**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 17/11 00:27 (logged later)<br>Prompt: (như Artifact #4) | File: `automation.config.json`, `package.json` (`feature`, `all`, `summary`), `playwright.config.ts` (JSON reporter), xóa `scripts/run-feature.mjs` (commit 746c95b) | Đề xuất: VALID – SV xác nhận | (đề xuất) Một nguồn script duy nhất (skill test-automation) cho dự án và skill; số liệu README §2 lấy từ `results.json` thay vì đếm tay ([PW] Reporters) | [SV điền] – chưa review |
| **Artifact #6 – Khung file nộp: README, HW04_Report, AI Critique, AI-03, BUG_REPORT, file thiết kế automation của 3 feature, shot list video**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 17/11 00:27 (logged later)<br>Prompt: (như Artifact #4) | File: `features/fA-fr03`, `fB-fr08`, `fC-fr15/automation_design.md` (commit badb3e5); `bugs/BUG_REPORT.md` (commit a65d1a2); `README.md`, `HW04_Report.md`, `AI_Critique.md` (commit 29353c9); `AI-03_AI_Disclosure_Form.md` (commit 1a2684c); `demo/shot_list.md` (commit daa23a8) | Đề xuất: VALID – SV xác nhận | (đề xuất) Phủ đủ danh sách nộp [ĐỀ] §14 và bảng tự đánh giá §15; số liệu và nội dung để trống, điền khi có kết quả | [SV điền] – chưa review |
| **Artifact #S1 – Skill test-automation (T1–T8) + script `run-browsers.mjs`, `summarize-results.mjs`, template config / thiết kế, rubric; SOURCES.md, review-rubric-shared.md**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 17/11 00:27 (logged later)<br>Prompt: (như Artifact #4) | File: `skills/SOURCES.md`, `skills/review-rubric-shared.md` (commit 89a21e1); `skills/test-automation/` (commit cd177b4). Script chạy thử trên bộ test tạm (3 test, Chromium + Firefox): đúng 1 báo cáo / trình duyệt, đếm đúng 3 / 2 / 1 / 1 | Đề xuất: VALID – SV xác nhận | (đề xuất) Theo [ĐỀ] §6 Task 1 (≥ 12 TC, dữ liệu tách file, ≥ 3 kiểu assertion, 3 trình duyệt, review AI sai gì / vì sao) và §7 (skill dùng lại được); locator / assertion theo [PW] Best Practices; generic, không có giá trị riêng của HW04. Skill chưa được kiểm bằng phiên chạy thử với subagent (theo yêu cầu của SV) | [SV điền] – chưa review |
| **Artifact #S2 – Skill automation-bug-reporting (đối chiếu issue cũ → bình luận Confirmed / Changed hoặc issue mới) + template bug report, rubric, script upload ảnh**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 17/11 00:27 (logged later)<br>Prompt: (như Artifact #4) | File: `skills/automation-bug-reporting/` (commit 8fdfcc3); `upload_attachments.js` chép từ skill gui-bug-reporting của HW03 | Đề xuất: VALID – SV xác nhận | (đề xuất) Đáp ứng yêu cầu của SV và README repo nhóm §6 (bình luận vào issue HW02, issue mới khi chưa có); quy tắc "cùng câu yêu cầu + cùng hành vi sai" để tránh trùng issue | [SV điền] – chưa review |
| **Artifact #S3 – Skill recording-test-demo-videos (V1–V5) + template shot list, rubric; README của thư mục skills**<br>Tool: Claude Code (claude-opus-5-5)<br>Thời gian: prompt 17/11 00:27 (logged later)<br>Prompt: (như Artifact #4) | File: `skills/recording-test-demo-videos/` (commit 57e39b9); `skills/README.md` (commit 223c368) | Đề xuất: VALID – SV xác nhận | (đề xuất) Theo [ĐỀ] §6 Task 2 (≥ 5 phút, tiếng Việt, `whoami` / `hostname`, chạy nhiều trình duyệt, báo cáo HTML, kể 1 lỗi đã sửa), §7 (video dùng skill) và §11 (giọng thật, không dàn dựng) | [SV điền] – chưa review |

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới. Số liệu theo verdict đề xuất của 9 dòng (6 artifact bài làm + 3 thay đổi skill #S1–#S3, tính đến Artifact #6); đổi khi SV đổi verdict hoặc khi thêm dòng.

| Chỉ số | Số lượng | Tỉ lệ |
| --- | --- | --- |
| Tổng artifact AI sinh đã audit | 9 | 100% |
| VALID (đúng, dùng nguyên) | 8 | 88.9% |
| INVALID (sai; loại bỏ) | 0 | 0.0% |
| INCOMPLETE (chấp nhận sau khi sửa) | 1 | 11.1% |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

[Điền ở giai đoạn 5]

## 6. Mandatory Disclosure (dán nguyên văn)

[Điền ở giai đoạn 5]

Chữ ký

| Họ tên sinh viên (in hoa): | HỒ THÙY HƯƠNG |
| --- | --- |
| MSSV: | 23120046 |
| Lớp / Khoá: | CQ2023/3 |
| Môn học: | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên: | ThS. Lâm Quang Vũ |
| Ngày: |  |
| Chữ ký: |  |

Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
