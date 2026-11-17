# HW04 – Kịch bản quay video demo (feature C: FR-15 Quản lý sản phẩm)

Lời thoại đầy đủ của từng cảnh: [narration_script.md](narration_script.md) (cùng số cảnh với file này).

## 0. Tổng quan

Đề yêu cầu **hai video**. Mỗi video có danh sách cảnh riêng và quay ở một buổi riêng:

| | Video 1 – Demo Agent Skill | Video 2 – Demo automation script |
| --- | --- | --- |
| Đề | §7: cho thấy từ đầu đến cuối cách dùng skill trên trọn một feature | Task 2: một script chạy từ đầu đến cuối trên nhiều trình duyệt, báo cáo HTML, kể một lỗi đã sửa |
| Nội dung | Dùng skill `test-automation` (T1 → T8) và `automation-bug-reporting` để làm FR-15 | Script FR-15 đã làm xong: giới thiệu script → lỗi đã sửa → chạy 3 trình duyệt → báo cáo HTML |
| Quay khi nào | **Buổi quay 1** – trong lúc làm FR-15 (PLAN C1–C7) | **Buổi quay 2** – sau khi FR-15 xong, đúng lúc chạy chính thức FR-15 (PLAN R1) |
| Độ dài dự kiến | ≈ 11 phút | ≈ 7 phút (đề: **ít nhất 5 phút**) |

Quy định chung cho cả hai video:

- Thuyết minh **tiếng Việt, giọng thật của bạn** (đề §11 – không dùng TTS / giọng AI). Quay im, lồng tiếng sau theo [narration_script.md](narration_script.md).
- Cảnh đầu tiên luôn là terminal chạy `whoami` và `hostname` (đề Task 2, §11).
- Mọi lần chạy trong video là lần chạy thật; không mở lại báo cáo cũ, không sửa báo cáo bằng tay.
- Đăng YouTube chế độ **Unlisted**; dán link vào `README.md` §2–§3 và `HW04_Report.md` §9–§10.

## 1. Đề yêu cầu gì (đánh dấu khi dựng xong)

| # | Yêu cầu | Nguồn trong đề | Video | Cảnh |
| --- | --- | --- | --- | --- |
| R1 | Dài ít nhất 5 phút | Task 2 | 2 | cả video |
| R2 | Thuyết minh tiếng Việt | Task 2 | 1, 2 | cả video |
| R3 | Giọng thật của SV, không do AI tạo | §11 | 1, 2 | cả video |
| R4 | Một script tự động chạy từ đầu đến cuối | Task 2 | 2 | 2.2, 2.4 |
| R5 | Chạy trên nhiều trình duyệt (Chromium, Firefox, WebKit) | Task 2, §6 | 2 | 2.4 |
| R6 | Mở báo cáo HTML vừa sinh ra | Task 2 | 2 | 2.5 |
| R7 | Báo cáo có `Run by: 23120046` và giờ ISO của lần chạy vừa chiếu | §11 | 2 | 2.5 |
| R8 | Kể ít nhất một lỗi đã sửa trong script AI sinh ra | Task 2 | 2 (và 1) | 2.3, 1.8 |
| R9 | Face-cam hoặc terminal chạy `whoami` và `hostname` | Task 2, §11 | 1, 2 | 1.1, 2.1, 2.4 |
| R10 | Đăng YouTube chế độ Unlisted | Task 2, §7 | 1, 2 | khi đăng |
| R11 | Cho thấy cách dùng skill trên trọn một feature | §7 | 1 | 1.2 – 1.11 |
| R12 | Skill bao cả sinh script (data-driven, nhiều trình duyệt) **và bảo trì** script (review, sửa, phân tích lỗi) | §7 | 1 | 1.6, 1.7, 1.8, 1.9, 1.10 |
| R13 | Link video có trong README và báo cáo | §13 | 1, 2 | khi nộp |

## 2. Video 1 – Demo Agent Skill (Buổi quay 1, ≈ 11 phút)

Cách làm mỗi bước của skill (cảnh 1.3 – 1.11), giống nhau cho mọi bước:

1. Gõ prompt ở cột "Bạn làm gì" vào Claude Code.
2. Chờ AI trả lời (khi dựng: tua nhanh phần chờ).
3. Cuộn qua 3 phần của câu trả lời: **kết quả bước** → **bảng tự chấm theo rubric** → **Decisions needed** (AI hỏi bạn).
4. Mở file AI vừa điền, đọc lướt; trả lời các câu hỏi / sửa nếu cần.
5. Cho thấy commit của bước: `git log --oneline -1`.

| Cảnh | Bạn làm gì | Màn hình cần thấy | Ý chính khi nói | Thời lượng |
| --- | --- | --- | --- | --- |
| 1.1 Mở đầu + xác thực | Mở terminal (chữ ≥ 16 px), gõ `whoami && hostname && date -Iseconds && pwd` | Tên tài khoản, tên máy, giờ quay, thư mục `week04` | Tên, MSSV; video này demo skill trên FR-15 | 0:30 |
| 1.2 Giới thiệu skill | Mở lần lượt: `skills/test-automation/SKILL.md` (bảng T1–T8) → `review-rubric.md` → thư mục `templates/` và `scripts/` → `CLAUDE.md` (bảng Features, dòng `product-crud`) → `automation.config.json` | Bảng 8 bước; tiêu chí rubric; 2 script `run-browsers.mjs`, `summarize-results.mjs`; dòng cấu hình của FR-15 | Skill gồm những gì; skill viết chung, giá trị riêng của bài nằm trong `CLAUDE.md` + config → dùng lại cho feature khác chỉ cần thêm 1 dòng config; rút ra khi làm feature A, B | 1:00 |
| 1.3 T1 – Chọn test case | Prompt: `/test-automation thực hiện bước T1 cho feature product-crud (FR-15)` | `features/product-crud/automation_design.md` §1 được điền; bảng tự chấm; câu hỏi của AI; bạn trả lời | AI đọc 36 TC của HW02, đề xuất TC nào tự động hóa, TC nào không và vì sao; **bạn quyết định** | 1:00 |
| 1.4 T2 – Locator, page object | Terminal 2: `npm run sut`. Terminal 1: `npm run codegen:admin` → đăng nhập `admin@eshop.com` → mở danh sách sản phẩm, form thêm sản phẩm → **Pick locator** 2–3 phần tử → đóng codegen → **tắt `npm run sut` (Ctrl+C)**. Prompt: `tiếp tục bước T2` | Locator Playwright gợi ý; file page object mới trong `page-objects/`; design §2 | Codegen chỉ để xem locator, không dùng làm script; ưu tiên vai trò + tên hiển thị | 1:15 |
| 1.5 T3 – Dữ liệu test | Prompt: `tiếp tục bước T3`. Mở `data/product-crud/<file>.json` bên cạnh `../week02/features/fC-pool-C/02_domain_testing.md` | 1 dòng dữ liệu và đúng TC đó ở HW02 | Dữ liệu tách khỏi code; kết quả mong đợi lấy từ TC HW02, không lấy từ app | 0:45 |
| 1.6 T4 – Sinh script, chạy lần đầu | Prompt: `tiếp tục bước T4`. Sau đó: `npx playwright test tests/product-crud --project=chromium` | File `tests/product-crud/*.spec.ts`; vòng lặp đọc dữ liệu; dòng kết quả lần chạy đầu | AI sinh script data-driven, ≥ 3 kiểu assertion; chạy thử chỉ Chromium; chưa sửa gì | 1:00 |
| 1.7 T5 – Review script | Prompt: `tiếp tục bước T5`. Mở `npm run ui -- tests/product-crud` để xem từng test | Bảng review design §5 do AI đề xuất; UI mode | Đọc script theo checklist của skill: locator dễ gãy, assertion yếu, oracle sai, thiếu biên, chờ không ổn định… | 1:00 |
| 1.8 T5 – Sửa một lỗi (bảo trì) | Chọn 1 dòng ở §5: mở đúng dòng code sai → sửa (hoặc duyệt bản sửa của AI) → chạy lại `npx playwright test tests/product-crud --project=chromium -g "<mã TC>"` → `git show --stat` | Dòng sai → bản sửa → test chạy lại → commit | Sai ở đâu, vì sao AI sai (**bạn kết luận**), sửa thế nào | 1:15 |
| 1.9 T6 – Chạy 3 trình duyệt | Prompt: `tiếp tục bước T6` (AI chạy `npm run feature -- product-crud`) → mở 1 báo cáo | Lệnh chạy Chromium → Firefox → WebKit; tiêu đề báo cáo có `Run by: 23120046` | Script của skill khởi động lại EShop (dữ liệu sạch), chạy 3 trình duyệt, mỗi trình duyệt 1 báo cáo | 0:45 |
| 1.10 T7 – Phân tích test fail, báo bug | Prompt: `tiếp tục bước T7` → `npm run trace -- <đường dẫn trace.zip>` của 1 test fail → bạn kết luận lỗi sản phẩm hay lỗi script → prompt: `/automation-bug-reporting báo các lỗi sản phẩm của FR-15` → mở issue trên GitHub | Trace viewer (ảnh trang, request API); design §8; issue có bình luận "HW04" hoặc issue mới nhãn `hw: HW04` | Trace cho thấy gì; **bạn quyết định** lỗi sản phẩm / lỗi script; bug đã có ở HW02 → bình luận, bug mới → issue mới | 1:30 |
| 1.11 T8 – Tổng kết | Prompt: `tiếp tục bước T8` → `git log --oneline -- tests/product-crud data/product-crud features/product-crud` | Kết quả `npm run summary` trong design §6; danh sách commit theo từng bước | Số liệu do script đếm, không đếm tay; mỗi bước một commit | 0:45 |
| 1.12 Kết thúc | Màn hình editor hoặc thẻ tiêu đề | – | Skill giúp gì, lần sau dùng cho feature khác thế nào | 0:20 |

## 3. Video 2 – Demo automation script (Buổi quay 2, ≈ 7 phút)

Quay sau khi FR-15 đã xong (có bảng review §5). Lần chạy trong cảnh 2.4 chính là **lần chạy chính thức** của FR-15: commit `reports/product-crud/` ngay sau buổi quay để báo cáo trong video và báo cáo nộp là một.

| Cảnh | Bạn làm gì | Màn hình cần thấy | Ý chính khi nói | Thời lượng |
| --- | --- | --- | --- | --- |
| 2.1 Mở đầu + xác thực | Terminal: `whoami && hostname && date -Iseconds && pwd` | Tên tài khoản, tên máy, giờ quay | Tên, MSSV; video demo Task 2: script FR-15 | 0:30 |
| 2.2 Giới thiệu script | Mở `tests/product-crud/web.spec.ts`: bôi đen dòng 96–97 (đọc `data/product-crud/web.json`) và dòng 189 (`for (const row of data.rows)`) → mở `data/product-crud/web.json`, bôi đen khối `"id": "DT-25"` (dòng 442) → mở `page-objects/AdminProductsPage.ts` dòng 63 (`getByRole('textbox', { name: 'Tên sản phẩm' })`) và dòng 154 (`addProduct`) → quay lại `web.spec.ts`, bôi đen 3 assertion: dòng 205 (`toHaveLength` – số sản phẩm được lưu), dòng 232 (`toHaveText` – giá hiển thị), dòng 226 (`toHaveCount(0)` – không có thẻ `<b>`) | Script, file dữ liệu, page object, 3 kiểu assertion | Data-driven: mỗi dòng JSON = 1 test; page object chỉ có locator + thao tác; 3 kiểu assertion: dữ liệu lưu qua API, chữ hiển thị, phủ định | 1:30 |
| 2.3 Một lỗi đã sửa: DT-17 | 1. Mở `features/product-crud/automation_design.md`, cuộn tới §5 (dòng 214), chỉ hàng #2 (dòng 221, DT-17, "flaky wait", "Model")<br>2. Terminal: `git log --oneline -- tests/product-crud/web.spec.ts` → 2 dòng: `8be9fac` (AI sinh) và `a278a51` (bản sửa)<br>3. `git show --oneline a278a51` (dạng `--oneline` không in email) → chỉ dòng bị xóa (`allInnerTexts()` + `toEqual`) và dòng thêm (`await expect(…).toHaveText(apiNames)`); bấm `q` để thoát<br>4. `npx playwright test tests/product-crud/web.spec.ts --project=chromium -g "DT-17" --repeat-each=3` – **nhớ `-g`** – chờ đến `3 passed` | Dòng review §5; diff của commit sửa; `3 passed` | Test cũ đọc danh sách danh mục ngay khi tab vừa hiện, lúc trang có thể chưa tải xong → kết quả không đáng tin; AI quen đọc giá trị rồi mới so sánh (model); sửa bằng assertion tự chờ; chạy 3 lần đều pass | 1:30 |
| 2.4 Chạy 3 trình duyệt | Cùng terminal: `whoami && hostname` rồi `npm run feature -- product-crud`. **Quay liền một đoạn** đến dòng kết quả của WebKit; khi dựng chỉ tua nhanh (gắn nhãn "×8"), không cắt | Lệnh, Chromium → Firefox → WebKit, số pass / fail từng trình duyệt | EShop khởi động lại (dữ liệu sạch); chạy lần lượt 3 trình duyệt; đọc kết quả | 1:15 |
| 2.5 Báo cáo HTML | `npm run report -- reports/product-crud/chromium` → phóng to tiêu đề → mở 1 test pass → mở 1 test fail (expected / received, ảnh chụp) → mở báo cáo `firefox`, `webkit` (chỉ tiêu đề) | Tiêu đề `HW04 · product-crud · <trình duyệt> · Run by: 23120046 · <giờ ISO>` khớp giờ chạy | Báo cáo vừa sinh ra; đọc một test pass, một test fail | 1:30 |
| 2.6 Test fail và bug | Mở design §8 (bảng 22 dòng) → trình duyệt: issue #34 (bình luận HW04) | Bảng phân loại; issue tương ứng | Test fail nào là lỗi sản phẩm (đã báo), test nào do script (đã sửa) | 0:20 |
| 2.7 Tổng kết + kết thúc | Mở design §6 (kết quả `npm run summary`) | Số TC tự động hóa / pass / fail | Tóm tắt; cảm ơn | 0:30 |

## 4. Chuẩn bị trước mỗi buổi quay

- [ ] Tắt Zalo / Messenger / mail / trình quản lý mật khẩu; bật Không làm phiền
- [ ] Trình duyệt dùng profile sạch, ẩn bookmark cá nhân; `gh auth status` là tài khoản `thhuon`
- [ ] Không còn server chạy ở cổng 3000 / 5173 / 5174 trước khi chạy `npm run feature` (lệnh tự khởi động EShop với dữ liệu sạch)
- [ ] Chữ trong VS Code và terminal ≥ 16 px; cửa sổ 1920×1080
- [ ] OBS (hoặc SimpleScreenRecorder): quay toàn màn hình 1920×1080, 30 fps, file `.mkv`; **tắt micro** (lồng tiếng sau)
- [ ] Giấy ghi chú (ngoài vùng quay): ghi giờ bắt đầu từng cảnh để dựng nhanh
- [ ] Chạy thử: `npx playwright test tests/smoke.spec.ts --project=chromium` pass; ghi lại 1 trình duyệt chạy mất bao lâu
- [ ] Phần mềm thu âm (Audacity) và dựng (Kdenlive / Shotcut); thu thử 10 giây

## 5. Lồng tiếng và dựng

1. Cắt bản quay theo cảnh (dựa vào giờ đã ghi), bỏ đoạn chờ AI trả lời và đoạn gõ sai. Đoạn chạy 3 trình duyệt chỉ tua nhanh, không cắt.
2. Điền các chỗ `⟨…⟩` trong [narration_script.md](narration_script.md) bằng số liệu thật của buổi quay.
3. Thu giọng từng cảnh thành một file riêng (đọc vấp thì thu lại cảnh đó).
4. Ghép giọng vào hình: giọng ngắn hơn hình → để im hoặc tua hình; giọng dài hơn → dừng hình.
5. Xuất video, đăng YouTube **Unlisted**, mở link bằng cửa sổ ẩn danh để kiểm tra, ghi mốc thời gian vào bảng dưới.

## 6. Bảng kiểm sau khi dựng

| Yêu cầu | Video | Mốc thời gian | Đạt? |
| --- | --- | --- | --- |
| R9 `whoami` + `hostname` | 1 | | |
| R11 Cho thấy skill (SKILL.md, config) | 1 | | |
| R11 T1 → T8 trên FR-15 | 1 | | |
| R12 Bảo trì: review, sửa lỗi, phân tích test fail | 1 | | |
| R2, R3 Tiếng Việt, giọng thật | 1 | | |
| R10 Unlisted, mở được bằng cửa sổ ẩn danh | 1 | | |
| R1 Dài ≥ 5:00 | 2 | | |
| R9 `whoami` + `hostname` (đầu video và trước lần chạy) | 2 | | |
| R4 Giới thiệu script | 2 | | |
| R8 Kể lỗi đã sửa | 2 | | |
| R5 Chạy 3 trình duyệt liền mạch | 2 | | |
| R6, R7 Báo cáo có `Run by: 23120046` + giờ ISO | 2 | | |
| R2, R3 Tiếng Việt, giọng thật | 2 | | |
| R10 Unlisted, mở được bằng cửa sổ ẩn danh | 2 | | |
| R13 Link trong README và báo cáo | 1, 2 | | |

Link: <link video 1> · <link video 2>
