# Rubric review – quy tắc chung

*Bản tiếng Việt để đọc và review; bản agent dùng là [review-rubric-shared.md](review-rubric-shared.md).*

Mỗi skill có một `review-rubric.md` với tiêu chí riêng. File này chứa phần dùng chung. Agent chấm rubric sau mỗi bước; người dùng dùng chính các file này để review kết quả của agent.

## Thang điểm

| Điểm | Ý nghĩa |
| --- | --- |
| 2 | Đạt; bằng chứng nêu mã cụ thể (mã control, số yêu cầu, số item, P0x, hash commit) |
| 1 | Đạt một phần; nói rõ còn thiếu gì |
| 0 | Thiếu hoặc sai |
| N/A | Không áp dụng; nêu lý do |

## Gate (điều kiện hoàn thành)

Một bước chỉ được báo là xong khi mọi tiêu chí **M** (bắt buộc) của bước đạt 2, hoặc đạt 1 / 0 chỉ vì đang chờ người dùng quyết định hay cung cấp thông tin (đã nêu trong câu trả lời). Tiêu chí **S** (nên có) dưới 2 thì báo ra, không chặn.

## Phần cuối của mỗi câu trả lời

1. Sửa những gì sửa được ngay trong file, rồi mới chấm.
2. Bảng `| # | Điểm | Bằng chứng | Hành động |` gồm P1–P6 và các tiêu chí trong bảng của bước đó ở rubric của skill.
3. `Gate: passed` hoặc `Gate: blocked by <#>`.

Review một file đã làm xong (người dùng yêu cầu review thay vì làm bước mới): chấm mọi tiêu chí của các bước đã làm và báo cáo; không tự sửa nếu không được yêu cầu.

## Tiêu chí quy trình (mọi bước của mọi skill kiểm thử)

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| P1 | M | Chỉ làm đúng bước hiện tại | Chỉ mục của bước đó thay đổi (cùng dòng đếm số lượng và mục log AI) |
| P2 | M | Bước trước đã commit trước khi bắt đầu bước này | `git status --short` của thư mục làm việc sạch, hoặc câu trả lời dừng lại và đưa lệnh commit |
| P3 | M | Áp dụng các chỉnh sửa người dùng yêu cầu ở lượt trước | Mọi thay đổi được yêu cầu đã có trong file, thành commit riêng; không còn nội dung đã bị từ chối |
| P4 | M | Nội dung chỉ con người được quyết thì để con người quyết | Verdict và mức nghiêm trọng chỉ ở dạng `(proposed)`; không có kết quả, quan sát, trích dẫn, điểm, ảnh chụp hay "lý do AI bỏ sót" mà người dùng chưa đưa |
| P5 | S | Điểm chưa rõ được nêu thành câu hỏi | Mỗi mục "Decisions needed": vấn đề, vì sao người dùng quyết, các lựa chọn, khuyến nghị |
| P6 | M | Commit và log theo quy tắc của dự án | Mỗi bước một commit (git-commit-conventions); ghi log AI trong cùng lượt nếu dự án có log |
