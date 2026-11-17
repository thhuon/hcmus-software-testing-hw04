# Rubric review – Quay video demo kiểm thử

*Bản tiếng Việt để đọc và review; bản agent dùng là [review-rubric.md](review-rubric.md).*

Quy tắc chung (thang điểm, gate, phần cuối câu trả lời, tiêu chí quy trình P1–P6): [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md).
Nguồn: [BRIEF] – yêu cầu về video của dự án.

## V1 – Yêu cầu

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 1 | M | Mọi yêu cầu về video trong brief là một checkbox kèm nguồn | Số câu yêu cầu = số dòng; mỗi dòng ghi rõ video của nó |

## V2 – Shot list

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 2 | M | Mỗi yêu cầu được ít nhất một cảnh bao phủ | Cột "Scenes" của bảng yêu cầu chỉ ra cảnh cho mọi dòng V1; mỗi video có bảng cảnh riêng |
| 3 | M | Bằng chứng danh tính đi đầu và quay trực tiếp | Cảnh 1 = `whoami` / `hostname` hoặc face-cam |
| 4 | M | Cảnh sửa lỗi cho thấy một chỗ sửa thật | Nêu commit và dòng review mà chỗ sửa đó xuất phát |
| 5 | S | Ý thuyết minh là gạch đầu dòng bằng ngôn ngữ thuyết minh | Không có kịch bản từng chữ trừ khi tester yêu cầu |
| 6 | S | Độ dài dự kiến đạt mức tối thiểu | Tổng thời lượng ≥ mức tối thiểu của từng video |

## V3–V4 – Chuẩn bị và quay

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 7 | M | Bản quay và giọng nói là của tester | Agent không tạo âm thanh, không giọng tổng hợp, không bản quay nào |
| 8 | S | Checklist chuẩn bị được đưa trước khi quay | Ứng dụng riêng tư, reset dữ liệu, font, micro, chạy thử |

## V5 – Cắt và kiểm

| # | M/S | Tiêu chí | Cách kiểm |
| --- | --- | --- | --- |
| 9 | M | Mọi yêu cầu có mốc thời gian trong bản cắt cuối | Bảng kiểm đầy đủ, mốc thời gian do tester đưa |
| 10 | M | Các lần chạy và report là thật, không bị cắt ở chỗ quan trọng | Lệnh + output trong một cảnh; tiêu đề report có danh tính + mốc thời gian |
| 11 | M | Link hoạt động và nằm đúng chỗ dự án quy định | Đã mở trong cửa sổ ẩn danh; README / report đã cập nhật |
