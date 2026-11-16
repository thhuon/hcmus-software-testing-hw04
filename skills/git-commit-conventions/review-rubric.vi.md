# Rubric review – Quy tắc commit git

*Bản tiếng Việt để đọc và review; bản agent dùng là [review-rubric.md](review-rubric.md). Số thứ tự hai bản giống nhau.*

Thang điểm, gate và phần cuối câu trả lời như [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md); tiêu chí quy trình P1–P6 không áp dụng ở đây. Commit chưa push mà không đạt một tiêu chí M thì sửa (amend hoặc tách) trước khi báo cáo; commit đã push thì báo lại, không bao giờ force push khi chưa được yêu cầu.

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 1 | M | Mỗi commit một mục đích | `git show --stat <hash>`: mọi file thuộc đúng mục đích ghi trong message |
| 2 | M | Phần sửa của người dùng là commit riêng | Không gộp (amend) thay đổi của người dùng vào commit của agent |
| 3 | M | Message đúng định dạng của repo | Repo của mình: `<type> (<scope>): <what changed>`; type nằm trong danh sách; chữ thường, câu mệnh lệnh, không dấu chấm cuối, khoảng 50–72 ký tự. Repo dùng chung có quy ước riêng: theo quy ước đó, giống các commit gần đây của repo |
| 4 | M | Không ghi ai làm và không có trailer AI | Không "AI draft", "review", "step n", "WIP"; không `Co-Authored-By` trừ khi dự án yêu cầu |
| 5 | M | Chỉ stage đúng file cần commit | Ghi rõ đường dẫn; `git diff --cached --name-only` không có file bị ignore, file riêng tư hay file không liên quan |
| 6 | M | Mỗi commit để dự án ở trạng thái nhất quán | Đổi tên (`git mv`) đi cùng việc sửa các chỗ tham chiếu; không có link hỏng |
| 7 | M | Chỉ push khi được yêu cầu hoặc dự án quy định | Sau đó `git status -sb` cho thấy nhánh đã đồng bộ |
| 8 | M | Không viết lại lịch sử đã push khi chưa được yêu cầu | Không force push, amend hay rebase commit đã push nếu không được yêu cầu |
| 9 | S | Câu trả lời liệt kê những gì đã làm | Các commit (`hash message`), kết quả push, file còn chưa commit và lý do |
