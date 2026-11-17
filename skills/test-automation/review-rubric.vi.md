# Rubric review – Tự động hóa kiểm thử

*Bản tiếng Việt để đọc và review; bản agent dùng là [review-rubric.md](review-rubric.md).*

Quy tắc chung (thang điểm, gate, phần cuối câu trả lời, tiêu chí quy trình P1–P6): [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md).
Nguồn: [ISTQB] §6.2 · [PW] Best Practices, Locators, Assertions, Parameterize tests, Reporters, Retries · [POM] · tài liệu yêu cầu và các test case đã thiết kế của dự án.

## T1 – Chọn test case

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 1 | M | Mỗi TC đã thiết kế của feature đều có một dòng | Số dòng ở §1 = số TC trong file test design; ID giữ nguyên |
| 2 | M | Số dòng được tự động hóa đạt mức tối thiểu của dự án và trộn các case hợp lệ, không hợp lệ và biên | Số `Yes` / `Yes (API)` ≥ mức tối thiểu; kỹ thuật và phân hoạch đa dạng |
| 3 | M | Mọi `No` có lý do cụ thể | Cần người thật đánh giá, hệ thống bên ngoài, chờ thời gian thật, hoặc trùng với một dòng được nêu tên; đánh dấu `(proposed)` cho tới khi được xác nhận |
| 4 | M | Kết quả mong đợi được trích từ TC | Cùng nguyên văn với file test design |

## T2 – Locator và page object

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 5 | M | Locator lấy từ UI đang chạy | Có nêu cách làm (codegen, UI mode, aria snapshot); không chép từ source code |
| 6 | M | Theo đúng thứ tự ưu tiên locator | Role + name → label → placeholder → text → test id → CSS ổn định; không có XPath theo vị trí, `nth-child`, class được sinh tự động |
| 7 | M | Mọi locator dự phòng (fallback) đều có lý do | Cột "Why" ở §2 nêu accessible name bị thiếu; nó được liệt kê là một phát hiện về testability |
| 8 | M | Page object chỉ chứa locator và thao tác | Không có `expect` trong thư mục page object (ví dụ `page-objects/`) |

## T3 – Dữ liệu test

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 9 | M | Dữ liệu test chỉ nằm trong file dữ liệu | Không spec nào có mảng / object chứa case viết inline; `grep` các spec |
| 10 | M | Mọi giá trị mong đợi đều truy được nguồn | Cột `source` nêu yêu cầu; giá trị khớp với TC; giá trị chưa biết là `<CONFIRM>` |
| 11 | M | Các lần chạy không đụng nhau ở dữ liệu được lưu | Giá trị duy nhất cho mỗi dòng và mỗi lần chạy, hoặc reset database trước mỗi lần chạy, có ghi ở §3 |

## T4 – Sinh spec

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 12 | M | Spec là data-driven | Một vòng lặp qua file dữ liệu; tiêu đề mọi test bắt đầu bằng TC ID |
| 13 | M | Số assertion pattern khác nhau đạt mức tối thiểu của dự án | Bảng §4: mỗi pattern kèm các test dùng nó |
| 14 | M | Assertion là web-first và cụ thể | `await expect(locator).toHave…`; không `waitForTimeout`, `if` theo trạng thái trang, `try/catch` bao quanh `expect` |
| 15 | M | Các test độc lập | Mỗi test tự setup; không dựa vào thứ tự test hay dữ liệu do test khác để lại |
| 16 | M | Không sửa gì ở bước này | Commit chứa code được sinh ra đúng như AI tạo |

## T5 – Review và sửa

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 17 | M | Mọi spec đã được review theo bảy nhóm | §5 có các chỗ sửa, hoặc câu trả lời ghi "no issue in <category>" cho từng spec |
| 18 | M | Mọi chỗ sửa đều có một dòng | Spec › test, sai ở đâu, nhóm, cách sửa kèm hash commit, vì sao, cause type |
| 19 | M | "Vì sao AI bỏ sót" là của tester | Câu chữ của agent đánh dấu `(proposed)` cho tới khi tester xác nhận |
| 20 | M | Không assertion nào bị nới lỏng để pass | Diff của các commit sửa: không oracle nào bị đổi mà không có nguồn trích dẫn; không `skip` / `fixme` / assertion bị đảo ngược cho một lỗi do sản phẩm |
| 21 | S | Các test pass là ổn định | `--repeat-each=3` cho cùng kết quả |

## T6 – Chạy trên nhiều browser

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 22 | M | Mỗi cặp feature × browser có một lần chạy và một report | `reports/<feature>/<browser>/index.html` và `results.json` có đủ cho mọi cặp |
| 23 | M | Mọi report hiển thị dòng danh tính và timestamp ISO | Tiêu đề / header của report được kiểm trên browser |
| 24 | M | Lần chạy chính thức dùng spec đã đóng băng và dữ liệu sạch | Commit spec có trước lần chạy; có ghi việc reset / khởi động server mới; report được commit nguyên trạng |
| 25 | M | Không có retry che giấu test fail | `retries: 0`, hoặc test flaky được báo là flaky |

## T7 – Phân loại lỗi

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 26 | M | Mọi test fail đều có verdict | Dòng ở §8: product defect / script defect / environment, `(proposed)` cho tới khi được xác nhận |
| 27 | M | Lỗi sản phẩm có đủ bằng chứng | Oracle được trích dẫn, tái hiện khi chạy lại, screenshot từ lần chạy |
| 28 | M | Lỗi sản phẩm giữ nguyên assertion đang fail | Test vẫn fail trong lần chạy chính thức; annotation bug có thể link tới issue |

## T8 – Tổng kết

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 29 | M | Số liệu lấy từ script tổng kết | Các bảng §6 bằng output của `summarize-results.mjs --markdown` |
| 30 | M | Mọi TC không tự động hóa đều được liệt kê kèm lý do | Số dòng §7 = số dòng T1 có `No` |
| 31 | S | Các con số khớp nhau | Số dòng §1 = số dòng `Yes` mà spec chạy (§4) + số dòng §7 |

## Công cụ (T2, T4, T5, T7)

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 32 | S | Người kiểm thử đã tự dùng công cụ của bước và có ghi lại | Design §2 ghi cách tìm locator (codegen, Pick locator, ARIA snapshot); §5 ghi cách debug một lỗi (UI mode, Inspector); §8 ghi trace hoặc ảnh chụp của từng lỗi |
