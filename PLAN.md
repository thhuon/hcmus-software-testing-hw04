# HW04-AI – Kế hoạch làm bài & ghi chú

> File nội bộ để theo dõi tiến độ — **không bắt buộc nộp** (có thể để trong zip như "supporting material").
> Đề gốc: `HW04_Automation_Testing_Original.md` (bản dịch: `HW04_Automation_Testing_Vietnamese.md`) · Quy định: `../___2026.Homework.Policies.md` · Feature: `features/selected-features.md`

| Sinh viên | MSSV | Bài tập | Tên file nộp |
| --- | --- | --- | --- |
| HỒ THÙY HƯƠNG | 23120046 | HW04-AI (cá nhân) | `23120046_HW04_AI_Automation_<XXX>.zip` |

**Feature (dùng lại từ HW02, đề §5):** A – FR-03 Quên & đặt lại mật khẩu · B – FR-08 Thanh toán · C – FR-15 Quản lý sản phẩm (Admin).

## 0. Nguyên tắc sắp việc

Thứ tự dưới đây là thứ tự **làm**, không theo thứ tự mục của đề:

1. Làm A và B trước, vừa làm vừa rút ra skill. Đến C thì dùng skill đó và **quay màn hình đúng lúc làm C**. Một lần quay cho ra cả video skill (đề §7) lẫn video demo Task 2, nên không phải làm lại feature nào để quay.
2. Không thiết kế lại test case: lấy TC và bug từ HW02, chỉ ghi lý do chọn / loại.
3. Ghi bảng "AI sai gì / vì sao" **ngay lúc sửa script**. Report và AI Critique ở cuối chỉ ghép lại từ các bảng này.
4. Dòng AI-02 ghi cùng lượt với mỗi artifact. Chạy `prompt_log` cuối mỗi buổi làm, không dồn đến cuối.
5. Mỗi bước một prompt, một commit, push ngay. Đề §12 cần ≥ 8 commit có sửa file `.spec`; 3 feature × khoảng 4 bước là đủ, không cần tạo commit thừa.
6. Báo cáo HTML chính thức chạy **một lần ở cuối**, bằng một lệnh, khi script đã ổn định.

## 1. Công việc

### Giai đoạn 0 – Chuẩn bị môi trường (≈ 1 giờ)

- [x] **S1. SUT** – chép `eshop-sut` từ `../seminar/eshop-security-t09-group05/eshop-sut` (đã có `node_modules`, cùng commit upstream `85af3ba`), khôi phục `backend/database.sqlite` về bản gốc. Thư mục nằm trong `.gitignore`. Backend tạo lại và seed DB **mỗi lần khởi động** (`database.js` gọi `initDatabase()`), nên muốn reset dữ liệu chỉ cần khởi động lại backend.
- [x] **S2. Playwright** – `@playwright/test` 1.64.1 (cố định version), cài Chromium, Firefox, WebKit.
- [x] **S3. Thư viện hệ thống cho WebKit** – SV tự chạy (cần sudo): `sudo apt-get install -y libevent-2.1-7t64 libavif16 libmanette-0.2-0`.
- [x] **S4. `playwright.config.ts`** – 3 project chromium / firefox / webkit; `webServer` tự bật backend `:3000`, web `:5173`, admin `:5174`; báo cáo HTML có tiêu đề `Run by: 23120046` + timestamp ISO (đề §6 Task 1, §11).
- [x] **S5. Script chạy** – `npm run feature -- <fA|fB|fC>` chạy feature trên 3 trình duyệt, mỗi lần chạy ra một báo cáo `reports/<feature>/<browser>/`. Cả bài là 9 lần chạy.
- [x] **S6. Smoke test** – `npm run smoke`: API, web, admin. Đạt 9/9 trên Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2 (17/11).
- [x] **S7. `CLAUDE.md`** – hồ sơ dự án cho agent: MSSV, URL, thư mục, quy tắc commit / AI-02, repo issue.
- [x] **S8. Biểu mẫu AI** – khung AI-02, AI-05 (chép từ HW03), `prompt_log.md`, AI-03 (phần đầu). Nội dung AI-03 điền ở giai đoạn 5.
- [x] **S10. Khung file nộp** – `README.md`, `HW04_Report.md`, `AI_Critique.md`, `bugs/BUG_REPORT.md`, `features/<feature>/automation_design.md`, `demo/shot_list.md` (17/11).
- [ ] **S9. Repo public** – đề §12 yêu cầu repo public; hiện repo đang PRIVATE. SV tự đổi sau khi xác nhận repo không có file riêng tư.

### Giai đoạn 1 – Feature A: FR-03 (≈ 2,5 giờ, chưa quay)

Mỗi bước 1 prompt + 1 commit, SV review trước khi qua bước sau:

- [ ] **A1. Chọn TC** – ≥ 12 TC từ HW02 (`features/fA-pool-A/` của HW02, có 34 DT + 10 BVA); ghi TC không tự động hóa được và lý do (đề Task 1 ý cuối).
- [ ] **A2. Khảo sát UI** – AI lấy selector (ưu tiên role / label / text), viết page object. **SV tự dùng:** `npm run sut` rồi `npm run codegen` (ghi lại luồng Quên mật khẩu, so locator của codegen với locator AI chọn), nút Pick locator, ARIA snapshot.
- [ ] **A3. Dữ liệu** – file `.json` / `.csv` riêng trong `data/fA-fr03/`.
- [ ] **A4. Sinh script** – AI sinh `.spec.ts` data-driven, ≥ 3 kiểu assertion khác nhau (phương pháp: Page Object Model + data-driven + API cho các dòng `Yes (API)`).
- [ ] **A5. Review & sửa** – chạy trên Chromium; SV sửa selector dễ gãy, assertion yếu, thiếu edge case, wait gây flaky. Ghi bảng "AI sai gì / vì sao" (prompt, giới hạn model, hay đặc điểm feature). **SV tự dùng:** `npm run ui -- tests/fA-fr03` (UI mode, tua từng bước), `npx playwright test tests/fA-fr03 --debug -g "DT-01"` (Inspector), `--repeat-each=3`.
- [ ] **A6. Chạy 3 trình duyệt** – xử lý lỗi chỉ xảy ra trên Firefox / WebKit. **SV tự dùng:** `npm run report -- reports/fA/<browser>` (mở HTML report), `npm run trace -- <file trace.zip>` (trace viewer, xem DOM / network / console tại bước fail).
- [ ] **A7. Bug** – test fail do bug thật → đối chiếu các bug FR-03 đã có ở HW02 (`bugs/BUG_REPORT.md` của HW02), ghi vào `bugs/BUG_REPORT.md`.
- [ ] **A8. Tinh chỉnh skill** – đã có bản nháp 3 skill (`skills/`: test-automation, automation-bug-reporting, recording-test-demo-videos; viết sẵn 17/11, SV review). Sửa skill ở chỗ vướng khi làm A1–A7.

**Công cụ và phương pháp automation được thực hành** (skill test-automation, mục "Tools and approaches"): codegen (ghi và phát lại) · Pick locator / ARIA snapshot · Page Object Model · data-driven · kiểm thử API (`request`) · UI mode · Inspector · HTML report · trace viewer. Phương pháp tùy chọn (Test Agents, CI, BDD, visual regression, accessibility, Allure): **không dùng** (SV quyết định 17/11).

### Giai đoạn 2 – Feature B: FR-08 (≈ 1,5 giờ, chưa quay)

- [ ] **B1–B7.** Như A1–A7 nhưng **dùng skill**. Chỗ nào skill vướng thì sửa skill ngay; đây là buổi tập dượt trước khi quay. FR-08 chỉ có 17 TC ở HW02 nên cần chọn kỹ cho đủ 12.

### Giai đoạn 3 – Feature C: FR-15 + quay video (≈ 2 giờ)

- [ ] **C0. Chuẩn bị quay** – đóng app riêng tư; bật OBS; terminal sẵn `whoami` và `hostname` (đề Task 2, §11).
- [ ] **C1–C7.** Làm FR-15 bằng skill, **quay toàn bộ**: chọn TC → sinh script → review / sửa → chạy 3 trình duyệt → mở báo cáo HTML. Cắt bỏ các khoảng chờ khi dựng.
- [ ] **C8. Lời thoại** – giọng thật của SV, tiếng Việt (đề §11 không cho dùng TTS). Có thể nói trực tiếp khi quay, hoặc quay im rồi thu giọng đè lên sau (nhanh hơn, không phải quay lại khi nói vấp).
- [ ] **C9. Dựng 2 video từ cùng bản quay** → YouTube (Unlisted):
  - **Video skill** (đề §7): toàn bộ quy trình dùng skill trên FR-15.
  - **Video demo Task 2** (≥ 5 phút): `whoami` / `hostname`, chạy 3 trình duyệt, báo cáo HTML, kể **một lỗi đã sửa** trong script AI sinh. Nếu buổi quay AI không sai chỗ nào thì kể lỗi đã sửa ở A hoặc B và chiếu diff commit.

### Giai đoạn 4 – Chạy chính thức & bug (≈ 1 giờ)

- [ ] **R1. Chạy chính thức** – reset DB (khởi động lại backend), chạy 9 lần (3 feature × 3 trình duyệt), báo cáo vào `reports/`, commit.
- [ ] **R2. Bug** – repo nhóm HW02 `angquoc/software-testing-2026-HW02-group` (README §4, §6). Bug đã có issue ở HW02 → **bình luận** vào issue cũ (script, trình duyệt, kết quả assertion, ảnh, ghi "HW04"; nếu hành vi khác HW02 thì nói rõ khác gì). Bug mới → **issue mới** có thêm label `hw: HW04`. Hoàn thiện `bugs/BUG_REPORT.md`; chụp trang Issues lọc theo `hw: HW04` và các issue đã bình luận.

### Giai đoạn 5 – Tài liệu & nộp (≈ 1,5 giờ)

- [ ] **D1. `HW04_Report.md`** – báo cáo automation + review / gap analysis của script AI sinh, ghép từ bảng ở A5, B5, C5; danh sách TC không tự động hóa được.
- [ ] **D2. `AI_Critique.md`** – 200–300 từ (đề §10).
- [ ] **D3. Biểu mẫu AI** – `prompt_log.md` (skill logging-ai-prompts), tổng AI-02 §4–§6, AI-03, AI-05.
- [ ] **D4. `README.md`** – bảng tự đánh giá + test summary: số feature; số TC tự động hóa / đã chạy / passed / failed; số lần chạy trình duyệt; số bug; link 2 video.
- [ ] **D5. Dọn trước khi nộp** (SV yêu cầu 17/11) – xóa khỏi repo và khỏi bản nộp:
  - các bản tiếng Việt của skill: `skills/**/SKILL.vi.md`, `skills/**/review-rubric.vi.md`, `skills/review-rubric-shared.vi.md`;
  - tài liệu học: đề bài `HW04_Automation_Testing_Original.md`, `HW04_Automation_Testing_Vietnamese.md`, `HW04_Automation_Testing_Vietnamese.pdf`;
  - sửa các chỗ còn nhắc tới chúng: `README.md` §3, `skills/README.md` ("Vietnamese reading copies"), `CLAUDE.md` mục Assignment; kiểm tra lại bằng `git ls-files | grep -i -E "\.vi\.md|HW04_Automation_Testing"` (không còn dòng nào).
- [ ] **D6. Nộp** – `git_log.txt`, PDF (report, AI Critique, AI-02), zip `23120046_HW04_AI_Automation_<XXX>.zip` → Moodle.

## 2. Bố cục thư mục

| Thư mục / file | Nội dung |
| --- | --- |
| `tests/<feature>/*.spec.ts` | Script Playwright (`fA-fr03`, `fB-fr08`, `fC-fr15`), `tests/smoke.spec.ts` |
| `pages/` | Page object dùng chung |
| `data/<feature>/` | Dữ liệu test `.json` / `.csv` |
| `features/<feature>/` | Chọn TC, bảng review "AI sai gì / vì sao", TC không tự động hóa được |
| `reports/<feature>/<browser>/` | Báo cáo HTML chính thức (9 bộ) |
| `bugs/` | `BUG_REPORT.md` + ảnh chụp |
| `automation.config.json` | Feature, thư mục spec, trình duyệt cho script chạy / tổng hợp của skill test-automation |

## 3. Lưu ý chống gian lận (đề §11)

- Báo cáo HTML phải do chính máy SV chạy, có `Run by: 23120046` + timestamp ISO. Không sửa tay báo cáo.
- Video phải có giọng thật của SV và face-cam hoặc terminal `whoami` + `hostname`.
- Thiếu tài liệu bắt buộc → 0 điểm; nộp trễ không được chấp nhận.
