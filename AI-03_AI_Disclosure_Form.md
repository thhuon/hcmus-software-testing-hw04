**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC15003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

Biểu mẫu Khai báo Sử dụng AI

*Đính kèm cho mọi bài tập có dùng AI ở bất kỳ mức nào.*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## 1. Thông tin Môn học & Sinh viên

| Mục | Giá trị |
| --- | --- |
| Môn học: | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Mã bài tập: | HW04-AI |
| Tên bài tập: | HW04 – Automation Testing on EShop |
| Cấp độ AI (1–5): | Cấp 4 – AI hỗ trợ sản xuất |
| Ngày: |  |
| Họ tên sinh viên: | HỒ THÙY HƯƠNG |
| MSSV: | 23120046 |

## 2. Câu hỏi Khai báo

## 1. Công cụ AI đã dùng:

*Liệt kê mọi công cụ AI dùng cho bài tập này (ví dụ AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

- Claude Code (model claude-opus-5-5), có dùng các Agent Skill tự viết (`skills/`).
- Không dùng công cụ AI nào khác. Playwright codegen, UI mode, trace viewer là công cụ của Playwright, không phải AI.

## 2. Giai đoạn nào của bài tập có dùng AI:

*Tick tất cả: [ ] brainstorm  [ ] outline  [ ] viết nháp  [ ] phản hồi  [ ] sửa chữa  [ ] code  [ ] phân tích dữ liệu  [ ] thiết kế đồ hoạ  [ ] khác (ghi rõ).*

*Tick:* [ ] brainstorm  [x] outline  [x] viết nháp  [x] phản hồi  [x] sửa chữa  [x] code  [x] phân tích dữ liệu  [ ] thiết kế đồ hoạ  [x] khác

- **outline:** thứ tự làm bài và thời điểm quay 2 video (`PLAN.md`), khung file nộp (README, `HW04_Report.md`, `bugs/BUG_REPORT.md`, file design của từng feature).
- **code:** cấu hình Playwright 3 trình duyệt, page object, API client, file dữ liệu JSON, spec data-driven (T2–T4) của 3 feature; script chạy nhiều trình duyệt và tổng hợp số liệu của skill; 4 Agent Skill.
- **phản hồi / sửa chữa:** review script AI sinh theo 7 nhóm lỗi, chạy lặp `--repeat-each=3`, đề xuất cách sửa (T5); áp các quyết định của tôi.
- **phân tích dữ liệu:** phân loại test fail (lỗi sản phẩm / script / môi trường), đối chiếu với issue HW02, đếm số liệu từ `results.json`.
- **viết nháp:** bug report BUG-01 … BUG-39 và nội dung bình luận / issue; các mục tóm tắt của báo cáo và README; AI-02 (đề xuất verdict, lý do); bảng bằng chứng cho AI Critique; form này.
- **khác:** chạy test trên Chromium / Firefox / WebKit (trừ lần chạy chính thức FR-15 do tôi chạy trong video); gửi issue và bình luận lên repo nhóm HW02 bằng `gh` theo yêu cầu của tôi; dựng 2 video từ các clip tôi quay và ghép giọng đọc của tôi (ffmpeg, faster-whisper chạy trên máy); trích prompt log từ transcript.

## 3. Prompt / nhiệm vụ chính cho AI:

*Dán nguyên văn 2–3 prompt quan trọng nhất. Để xem đầy đủ, đính kèm Phụ lục A (prompt_log.md).*

**Prompt004** – 00:27 17/11/2026 (dựng skill, quy tắc báo bug):

```text
tôi đã run xong lệnh sudo tải webkit, hãy tiếp tục chạy smoke test
từ các file tài liệu trên, hãy dựng các skill cần thiết cho bài tập này, tôi sẽ review các skill bạn đã viết
bài tập này dùng lại repo nhóm của bài tập tuần 2, từ cắc issue đã được chạy tay ở bài tập tuần 2 thì tuần này thực hiện theo hướng automation, nếu có gì khác thì comment, nếu phát hiện thêm issue thì tạo issue mới
bên cạnh đó, tạo sẵn các file, folder cần nộp cho bài tập này
```

**Prompt010** – 18:05 17/11/2026 (review locator và page object của FR-03):

```text
- mục expect có cần thiết trong các locator và page object ko? đặc biệt là trong bài tập này, ứng dụng cụ thể này 
- mục đích của các ffile bạn vừa mới thêm vào folder pages là gì? tại sao lại đặt tên gây hiểu nhầm như vậy -> đưa ra một số option tên khác để tôi lựa chọn và bạn đỏi tên folder theo tên đó
các folder fA-fr03,.... bên trong folder feature là gì, tương tự naming cũng là vấn đề, tên các folder này đọc rất khó hiểu và tôi ko nghĩ là bạn cần chú thích nhiều thông tin đến vậy thông qua tên file/folder
- tìm các ô nhập ko có tên thì tôi nghĩ nên thử tất cả các option có thể chứ ko cần cố định một option nào (a và b hợp lý)
- có thể báo lỗi nếu như ko có option nào có thể tìm ra được, nếu có lỗi thì có thể tạo issue mới nếu đủ lớn ko thì có thể comment vào một issue liên quan đã có (cần cho tôi biết kết quả sau khi thử các option trước khi đưa ra quyết định comment hoặc tạo issue mới)
- tôi đã run được codegen nhưng cần ghi kết quả theo format nào để đảm báo đúng thông tin và ko bị lan man -> bạn gợi ý format giúp tôi và tôi sẽ điền vào; hoặc bạn có thể đưa ra câu hỏi -> tôi trả lời -> bạn ghi vào
```

**Prompt040** – 23:11 17/11/2026 (xác nhận phân loại test fail của FR-08):

```text
- tôi đã check các test fail đều là lỗi sản phẩm, ok với 7 issue nhưu bạn đã đề cập
- comment vào issue của bạn cùng nhóm cho TC 80
- còn lại đồng ý với các đề xuất của bạn
- dùng skill /automation-bug-reporting cho các issue của feature này
```

Toàn bộ: Phụ lục A `prompt_log.md` và `AI-02_AI_Audit_Report.md`.

## 4. Phần cụ thể AI đóng góp:

*Càng cụ thể càng tốt. Ví dụ: 'AI sinh TC01–TC15 ở Mục 3.2; tôi viết lại TC04 và TC11; AI KHÔNG đóng góp vào Mục 1, 2, 4, hoặc AI Critique.'*

| Phần bài | AI đóng góp | Tôi tự làm |
| --- | --- | --- |
| Chọn feature, chọn TC (T1) | Dùng lại 3 feature HW02, đề xuất TC tự động hóa / không và lý do | Chọn feature ở HW02; xác nhận lựa chọn; quyết định FR-08 DT-07 là bug, BVA chạy trên Web, 17 TC FR-15 chạy trên Admin web |
| Locator, page object (T2) | ARIA snapshot, đếm locator trên 3 trình duyệt, viết page object và API client | Chạy codegen cho 3 feature, so sánh với locator AI chọn, viết câu kết luận; chọn cách tìm ô không có tên |
| Dữ liệu, spec (T3–T4) | Sinh file JSON và spec data-driven, chạy lần đầu | Chốt giá trị mong đợi còn mở |
| Review và sửa (T5) | Chạy lặp, rà 7 nhóm lỗi, đề xuất và áp dụng cách sửa (11 lỗi) | Quyết định từng cách sửa và loại nguyên nhân (Prompt / Model / Feature) |
| Chạy 3 trình duyệt (T6) | Chạy chính thức FR-03, FR-08 | Chạy chính thức FR-15 trong video demo |
| Bug, issue (T7) | Phân loại test fail, viết BUG-01 … BUG-39, soạn và gửi 2 issue mới (#116, #117) + 38 bình luận "HW04" (FR-03 8, FR-08 8, FR-15 22) | Xác nhận mọi phân loại, duyệt nội dung trước khi gửi; dùng trace viewer kiểm DT-35 |
| Video | Kịch bản, shot list, lời đọc gợi ý; dựng video từ clip của tôi, ghép giọng | Quay toàn bộ clip, đọc lời thuyết minh video 2 bằng giọng của tôi, đăng YouTube (Unlisted) |
| Báo cáo, README, AI-02 | Tóm tắt từ các file đã commit, số liệu từ `npm run summary`, đề xuất verdict và lý do | Review, xác nhận / sửa verdict |
| Agent Skills (4 skill) | Viết SKILL.md, rubric, template, script | Đưa ra quy tắc và review từng lần sửa (AI-02 #S1 … #S12) |
| AI-03 (form này) | Soạn nháp | Kiểm tra từng ý, ký |

**AI KHÔNG đóng góp vào:** AI Critique (AI chỉ soạn bảng bằng chứng, đoạn văn do tôi viết), AI-02 §5 Kết luận và §6 cam đoan, điểm tự đánh giá, giọng thuyết minh và các clip quay màn hình, lần chạy chính thức FR-15.

## 5. Cách tôi rà soát / chỉnh sửa / xác minh đầu ra AI:

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, hỏi TA, tra RFC, đối chiếu ISTQB syllabus, v.v.).*

- **Từng bước một prompt, một commit:** review kết quả mỗi bước (T1–T8) trước khi cho làm bước sau, xem diff của từng commit.
- **Script:** đối chiếu mỗi giá trị mong đợi với TC HW02 và câu SRS (`eshop-sut/README.md`); chạy lặp `--repeat-each=3`; kiểm cách sửa bằng chạy lại; với FR-03 DT-35 tự mở trace viewer để xem request / response.
- **Locator:** tự chạy codegen và so sánh với locator AI chọn.
- **Kết quả chạy:** chỉ chấp nhận số liệu đọc từ `results.json` của báo cáo (script `summarize-results.mjs`); mở báo cáo HTML kiểm tiêu đề `Run by: 23120046` + giờ ISO.
- **Bug:** kiểm mỗi test fail là lỗi sản phẩm trước khi cho gửi; mở issue trên repo nhóm kiểm nội dung, ảnh.
- **AI-02 / prompt log:** prompt và output trích bằng script từ transcript, không chép tay.

## 6. Trích dẫn (nếu môn yêu cầu):

*Môn Kiểm chứng Phần mềm dùng phong cách IEEE. Ví dụ: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) [Large language model]. https://claude.ai*

[1] Anthropic, "Claude Code (claude-opus-5-5)," [Large language model], 2026. Accessed: 16/11/2026 – 18/11/2026. [Online]. Available: https://claude.ai

## 3. Cam đoan Trung thực

*Bằng việc ký tên dưới đây, tôi cam đoan thông tin khai báo ở trên là chính xác và đầy đủ. Tôi hiểu rằng việc không khai báo hoặc khai báo sai lệch về việc dùng AI sẽ bị coi là vi phạm liêm chính học thuật và có thể dẫn đến điểm 0 cho bài tập cùng việc bị chuyển lên hội đồng kỷ luật.*

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

Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

ISTQB Foundation Level Syllabus (latest version).

Hardman, P. (2025). A Post-AI Learning Taxonomy.

Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

Anthropic (2025). Building reliable AI test agents — engineering blog.

DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
