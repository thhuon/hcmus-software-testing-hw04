# Rubric review – Báo cáo bug từ kiểm thử tự động

*Bản tiếng Việt để đọc và review; bản agent dùng là [review-rubric.md](review-rubric.md).*

Quy tắc chung (thang điểm, gate, phần cuối câu trả lời, tiêu chí quy trình P1–P6): [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md).
Nguồn: [REQ] · [TRACKER] · design §8 của test-automation (triage).

## Bước 1 – đối chiếu và viết mục bug

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 1 | M | Lần fail là lỗi sản phẩm đã được xác nhận | Verdict ở design §8 đã được tester xác nhận; có trích oracle; tái hiện được khi rerun |
| 2 | M | Đã tìm trên tracker và trong báo cáo trước | Câu truy vấn `gh issue list` và các ứng viên (chấp nhận / loại, kèm lý do) có trong câu trả lời |
| 3 | M | Kết quả theo đúng quy tắc đối chiếu | Confirmed / Changed chỉ khi cùng câu yêu cầu và cùng hành vi sai; ngược lại là New |
| 4 | M | Yêu cầu được trích nguyên văn kèm `file:line`, Expected lấy từ đó | Khớp với tài liệu tại dòng đó |
| 5 | M | Actual là giá trị received và screenshot | Giá trị lấy từ report / `results.json`; không nêu nguyên nhân từ source code |
| 6 | M | Làm theo Steps được mà không cần code test | Dòng dữ liệu và thao tác viết bằng lời thường, bắt đầu từ trạng thái sạch |
| 7 | M | Screenshot là của lần chạy bị fail và có link | File trong `bugs/screenshots/`, tên `<TC ID>_<browser>`; link mở được |
| 8 | M | Bug ID / link tracker được ghi ngược lại | design §8 và bảng tổng quan của bug report |
| 9 | S | Severity / priority theo thang của tracker | Lấy từ issue đã có, hoặc `(proposed)` theo thang |

## Bước 2 – gửi

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 10 | M | Con người đã duyệt nội dung trước khi gửi | Sự đồng ý có trong hội thoại, trước lệnh `gh` |
| 11 | M | Theo đúng template, định dạng tiêu đề và label của tracker | Các trường dạng `### <label>`; chỉ dùng label đã có; có label / tag của vòng này |
| 12 | M | Screenshot hiển thị trong comment / issue | Mở trên trình duyệt: ảnh hiển thị được |
| 13 | M | Mỗi lỗi một hành động trên tracker | Không mở issue mới cho bug Confirmed / Changed; không comment trùng sau lỗi `502` |
| 14 | S | File nội dung tạm và browser profile đã được xóa | `git status`, không còn thư mục profile |
