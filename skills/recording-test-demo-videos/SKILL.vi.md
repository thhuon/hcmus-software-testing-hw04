# Quay video demo kiểm thử

*Bản tiếng Việt để đọc và review; bản agent dùng là [SKILL.md](SKILL.md).*

**Khi nào dùng:** Khi tester phải quay một video demo có lời thuyết minh về chính công việc kiểm thử của mình — script tự động chạy từ đầu đến cuối trên nhiều trình duyệt kèm HTML report, một Agent Skill được dùng cho trọn một feature, hoặc một chỗ sửa trong code do AI sinh ra — và cần shot list (danh sách cảnh quay), dàn ý lời thuyết minh bằng ngôn ngữ của mình, bằng chứng danh tính (face-cam hoặc `whoami` / `hostname`), cách thiết lập để quay, hoặc bước kiểm tra cuối video theo yêu cầu đề bài trước khi tải lên YouTube ở chế độ unlisted.

**Chủ đề:** Video làm bằng chứng cho công việc kiểm thử. **Nguồn:** [BRIEF] (yêu cầu về video của dự án); mã của các nguồn tham khảo ở `../SOURCES.md`.

## Tổng quan

Video demo là bằng chứng tester đã tự làm. Video mất giá trị bằng chứng khi thiếu một phần bắt buộc (bằng chứng danh tính, một lần chạy trên trình duyệt, report, phần thuyết minh chỗ sửa) hoặc khi trông như dàn dựng (mở lại report cũ, dùng giọng tổng hợp trong khi đề yêu cầu giọng thật của tester). Cách rẻ nhất để làm đúng là **quay công việc thật ngay lúc đang làm**, theo một shot list viết trước, và đối chiếu bản cắt với yêu cầu trước khi tải lên.

| Bước | Đầu ra | Ai làm |
| --- | --- | --- |
| V1 Yêu cầu | checklist yêu cầu trong shot list | Agent, dựa trên brief của dự án |
| V2 Shot list | các cảnh, nội dung trên màn hình, ý thuyết minh | Agent soạn nháp, tester chỉnh |
| V3 Chuẩn bị | máy sạch, reset dữ liệu, cài đặt phần mềm quay, chạy thử | Tester, theo checklist của agent |
| V4 Quay | (các) bản quay thô | **Chỉ tester** |
| V5 Cắt và kiểm | (các) video cuối, mốc thời gian của từng yêu cầu, tải lên | Tester cắt; agent kiểm các mốc thời gian tester đưa |

**Quy tắc cốt lõi: agent lên kế hoạch và kiểm tra; việc quay, giọng nói và việc tải lên là của tester. Không có gì trong video được dàn dựng: mọi lần chạy xuất hiện đều là lần chạy thật trên máy của tester.**

## Bối cảnh dự án (đọc trước)

Lấy các thông tin sau từ hướng dẫn của dự án hoặc đề bài: số video và mỗi video phải thể hiện gì, độ dài tối thiểu, ngôn ngữ thuyết minh, bằng chứng danh tính (face-cam, `whoami` + `hostname`, tên trên màn hình), có được dùng giọng tổng hợp không, nơi đăng (ví dụ YouTube unlisted), link đặt ở đâu (README, report).

Nếu đề yêu cầu hai video (ví dụ "skill được dùng cho trọn một feature" và "một script chạy từ đầu đến cuối kèm report"), cho **mỗi video một danh sách cảnh và một buổi quay riêng**, đánh số theo video (1.1, 1.2 … / 2.1, 2.2 …), để không video nào là sản phẩm phụ của video kia và tester không phải dò số cảnh bị xáo trộn giữa hai bản dựng. Thứ tự thường gặp: quay video skill trong lúc làm feature; quay video script sau khi feature xong, đúng lúc chạy chính thức feature đó, để report trong video chính là report được nộp (không chạy lại feature đó sau này).

## V1 – Yêu cầu

Liệt kê mọi yêu cầu của mọi video thành checkbox, kèm dòng nguồn trong brief, ví dụ `[ ] ≥ 5 min`, `[ ] narrated in <language>, tester's own voice`, `[ ] whoami + hostname visible`, `[ ] all browsers run`, `[ ] HTML report opened, identity text visible`, `[ ] one fix to AI-generated code narrated`.

## V2 – Shot list ([templates/shot-list.md](templates/shot-list.md))

Viết shot list bằng **ngôn ngữ thuyết minh** (tester đọc khi quay), lời lẽ dễ hiểu. Mỗi cảnh một dòng: `Cảnh | Bạn làm gì (lệnh / prompt / thao tác chính xác) | Màn hình cần thấy | Ý chính khi nói | Thời lượng`; một bảng yêu cầu chỉ ra mỗi yêu cầu nằm ở cảnh nào.

- Mở đầu bằng danh tính: terminal chạy `whoami` và `hostname` (hoặc face-cam), ngày và thư mục dự án.
- Cho thấy đầu vào trước đầu ra: test case / file dữ liệu trước lần chạy, prompt cho AI trước code được sinh.
- Với chỗ sửa: lần chạy fail → dòng bị sai → vì sao AI làm sai → chỗ sửa (diff hoặc commit) → lần chạy lại pass hoặc fail đúng như mong đợi.
- Với video skill: cho thấy các file của skill và cấu hình dự án giúp skill dùng lại được trước; sau đó mỗi bước của skill một cảnh, gồm prompt gõ chính xác, các phần trong câu trả lời của agent (kết quả, tự chấm, câu hỏi), quyết định của tester và commit của bước; cho thấy cả các bước bảo trì (review, sửa, phân tích lỗi) chứ không chỉ các bước sinh script.
- Với lần chạy trên nhiều trình duyệt: chạy mọi trình duyệt bằng một lệnh và để terminal luôn hiện; sau đó mở từng report và chỉ vào tiêu đề của nó (danh tính + mốc thời gian).
- Ý thuyết minh là các gạch đầu dòng ngắn bằng ngôn ngữ thuyết minh, theo lời của tester — đang xảy ra gì và vì sao — không phải kịch bản để đọc, trừ khi tester yêu cầu. Khi tester yêu cầu kịch bản lồng tiếng thì viết thành file riêng, cùng số cảnh, mọi giá trị chỉ có sau buổi quay để dạng `⟨…⟩`.

## V3 – Chuẩn bị (checklist cho tester)

- Đóng chat, mail, trình quản lý mật khẩu, thông báo; dùng profile trình duyệt sạch; ẩn bookmark cá nhân.
- Reset dữ liệu test để lần chạy khớp với những gì video nói.
- Font terminal và editor ≥ 16 px; kích thước cửa sổ nằm trọn trong vùng quay (ví dụ 1920×1080); theme tối / sáng đều phải dễ đọc.
- Phần mềm quay (ví dụ OBS): màn hình + micro, thu thử 10 giây âm thanh; thêm lớp face-cam nếu dùng.
- Chạy thử toàn bộ shot list một lần mà không quay; ghi lại mỗi lần chạy mất bao lâu để sau này cắt bớt đoạn chờ.

## V4 – Quay

Tester tự quay. Agent có thể gợi ý các cách:

- **Thuyết minh trực tiếp** khi đang làm, hoặc **quay không tiếng rồi thu voice-over (lồng tiếng) sau** dựa trên các ý thuyết minh (ít phải quay lại hơn). Cả hai đều dùng giọng thật của tester.
- Tạm dừng quay khi AI sinh nội dung lâu hoặc khi cài đặt, thay vì để sau mới cắt.
- Nếu một cảnh bị hỏng, cứ tiếp tục quay và làm lại cảnh đó; cắt sau.

## V5 – Cắt và kiểm

1. Tester cắt bỏ đoạn chờ và lỗi thao tác; các lần chạy, report và chỗ sửa phải giữ đủ liền mạch để đáng tin (lệnh và output của nó trong một cảnh liên tục).
2. Tester đưa các mốc thời gian; agent điền bảng kiểm trong shot list: `Requirement | Video | Timestamp | OK?`. Thiếu gì → chỉ quay lại cảnh đó.
3. Tải lên theo quy định của dự án (ví dụ YouTube **Unlisted**); thử link trong cửa sổ ẩn danh; đặt link vào đúng chỗ dự án quy định.

## Mọi câu trả lời đều có đúng dạng này

1. Bước, một dòng.
2. Checklist, shot list hoặc bảng kiểm.
3. **AI tự review**: chấm P1–P6 của [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md) và bảng của bước đó trong [review-rubric.vi.md](review-rubric.vi.md) theo dạng `# | Score (2/1/0/N/A) | Evidence | Action`, và kết thúc bằng `Gate: passed` hoặc `Gate: blocked by <#>`.
4. **Decisions needed** (cần người dùng quyết: mỗi video quay lúc nào, thuyết minh trực tiếp hay voice-over, kể chỗ sửa nào) và **Next step** (bước tiếp theo). Rồi dừng lại.

## Commit và log sử dụng AI

Theo git-commit-conventions: `docs (video): add the shot list for <video>`, `docs (video): add the video links and requirement timestamps`. Không commit file video thô (ignore `*.mp4`, `*.mov`, `*.mkv`). Nếu dự án có log audit AI hoặc prompt log, thêm mục tương ứng trong cùng lượt.

## Tính trung thực

| Lý do bào chữa | Thực tế |
|--------|---------|
| "Dùng giọng text-to-speech đi, nghe sạch hơn" | Khi dự án yêu cầu giọng thật của tester, giọng tổng hợp làm video không hợp lệ. |
| "Mở report hôm qua đi, chạy lâu quá" | Cho thấy một lần chạy thật; cắt đoạn chờ, không cắt lần chạy. |
| "Agent có thể viết lời thuyết minh từng chữ" | Chỉ có ý thuyết minh, theo lời của tester, trừ khi tester yêu cầu kịch bản. |
| "Bằng chứng danh tính có thể thêm bằng caption" | Cho thấy trực tiếp: output của lệnh trong terminal hoặc face-cam. |
| "Làm giả một chỗ sửa cho video" | Thuyết minh một chỗ sửa thật từ phần review, kèm commit của nó. |
