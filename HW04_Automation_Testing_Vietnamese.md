# HW04 – Kiểm thử tự động hóa (Automation Testing)

## 1. Thông tin chung

| Hạng mục | Nội dung |
|---|---|
| Mã bài tập | HW04-AI |
| Thời lượng | 10 giờ |
| Hạn nộp | Vui lòng xem liên kết nộp bài trên Moodle |
| Hình thức | Bài tập cá nhân |
| Nơi nộp | Moodle (báo cáo) |
| Giảng viên và trợ giảng | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| Liên hệ | lqvu@fit.hcmus.edu.vn / tdhoang@fit.hcmus.edu.vn / ttbhanh@fit.hcmus.edu.vn / tploc@fit.hcmus.edu.vn / hthanh@fit.hcmus.edu.vn |
| Chính sách AI | Mở — bắt buộc khai báo và đính kèm Báo cáo kiểm toán AI (AI Audit Report) |
| Cấp độ Bloom-AI yêu cầu | G9.1 → G9.6, tùy bài tập (xem phần CLO Mapping) |

## 2. Các nguyên tắc định hướng

Các nguyên tắc này quy định cách bạn cần thực hiện xuyên suốt chuỗi bài tập của học phần. Hãy đọc kỹ trước khi bắt đầu vì bài nộp sẽ được đánh giá dựa trên các nguyên tắc này.

- **Chiến lược AI-First.** Bạn bắt buộc phải áp dụng AI vào các kỹ thuật kiểm thử đã học trên lớp. Tuy nhiên, điều này không có nghĩa là chỉ đưa ra một prompt chung chung, chẳng hạn *"viết tất cả script automation cho tính năng này"*. Thay vào đó, bạn phải hướng dẫn AI thực hiện từng bước của kỹ thuật theo đúng cách đã được giảng dạy, sử dụng AI như một trợ lý có quy trình thay vì một “hộp đen”.
- **Con người rà soát.** Sinh viên phải kiểm tra cẩn thận mọi kết quả do AI tạo ra và chịu hoàn toàn trách nhiệm về tính chính xác của các kết quả đó. Bạn cần thực hiện các chỉnh sửa và tinh chỉnh cần thiết — không được nộp nguyên kết quả AI tạo ra mà chưa rà soát.
- **Báo cáo kiểm toán AI (AI Audit Report).** Toàn bộ quá trình sử dụng AI phải được ghi lại đầy đủ. Bạn được khuyến khích xây dựng Agent Skill để tự động thực hiện các hoạt động này cho những bài tập tương tự. Nếu không sử dụng AI, bạn vẫn phải khai báo rõ điều đó.
- **Tài liệu hóa.** Toàn bộ quá trình làm bài phải được ghi lại dưới định dạng văn bản, chẳng hạn Markdown.
- **Chất lượng quan trọng hơn mức độ hoàn thành.** Bài làm không chỉ được chấm dựa trên việc hoàn thành hay chưa, mà còn dựa trên số lượng và chất lượng sản phẩm bàn giao: các automation script, tệp dữ liệu, báo cáo HTML, bug report, video demo và các liên kết được tham chiếu.

## 3. Chuẩn đầu ra

Sau khi hoàn thành bài tập, bạn sẽ có khả năng:

- Sử dụng AI để tạo automation test script cho frontend web của SUT bằng Playwright hoặc Selenium, sau đó rà soát và tinh chỉnh các script này.
- Áp dụng kiểm thử hướng dữ liệu (data-driven testing) và các mẫu assertion; thực thi toàn bộ bộ kiểm thử trên nhiều trình duyệt.
- Đánh giá phản biện các automation script do AI tạo ra: sửa lỗi, phân tích những điểm AI làm sai hoặc bỏ sót, đồng thời tạo đầy đủ đầu ra (báo cáo HTML và bug report).
- Thể hiện năng lực Bloom-AI ở các cấp độ G9.2 (Apply – Vận dụng), G9.3 (Analyse – Phân tích) và G9.4 (Collaborate with AI – Cộng tác với AI).

## 4. Hệ thống được kiểm thử (SUT)

**SUT:** EShop — ứng dụng thương mại điện tử mẫu bằng tiếng Việt, được thiết kế phục vụ thực hành kiểm thử.

**Repository:** https://github.com/ttbhanh/eshop-sut

Các tính năng của ứng dụng được chia thành những nhóm sau:

### Pool A — Xác thực, danh mục và sản phẩm

- FR-01: Đăng ký tài khoản
- FR-02: Đăng nhập và khóa tài khoản
- FR-03: Quên mật khẩu và đặt lại mật khẩu (hai bước)
- FR-04: Quản lý hồ sơ cá nhân
- FR-05: Danh sách và tìm kiếm sản phẩm
- FR-06: Xem chi tiết sản phẩm

### Pool B — Giỏ hàng và thanh toán

- FR-07: Giỏ hàng
- FR-08: Thanh toán (Checkout)
- FR-09: Mã giảm giá
- FR-10: Máy trạng thái đơn hàng (Order state machine)
- FR-11: Xem lịch sử đơn hàng (người dùng)

### Pool C — Trang quản trị web

- FR-12: Kiểm soát truy cập
- FR-13: Bảng điều khiển (Dashboard)
- FR-14: Quản lý danh mục (CRUD)
- FR-15: Quản lý sản phẩm (CRUD)
- FR-16: Nhập sản phẩm từ CSV
- FR-17: Quản lý mã giảm giá (CRUD)
- FR-18: Quản lý đơn hàng (quản trị viên)
- FR-19: Quản lý người dùng (quản trị viên)

### Pool D — Ứng dụng di động

## 5. Lựa chọn tính năng

Thực hiện automation cho đúng ba (3) tính năng web mà bạn đã chọn trong HW02 — mỗi nhóm Pool A, B và C chọn một tính năng. Không sử dụng tính năng thuộc Pool D (mobile) trong bài tập này vì yêu cầu là tự động hóa frontend web.

Nếu chưa hoàn thành HW02, hãy tự khai báo ba tính năng web thuộc các Pool A–C trực tiếp trong báo cáo này và nêu rõ lý do không có kết quả HW02.

Trong mỗi nhóm, bảo đảm các thành viên không chọn trùng tính năng với nhau, tương tự yêu cầu trong HW02.

## 6. Yêu cầu

Đối với từng nhiệm vụ dưới đây, hãy mô tả quy trình thực hiện trong báo cáo chính và đính kèm minh chứng được yêu cầu. Trước khi bắt đầu, hãy xem lại các bài giảng liên quan đến kiểm thử tự động hóa.

### Task 1 — Automation script được tạo bằng AI

Theo chiến lược AI-First, sử dụng một công cụ AI để tạo automation script, sau đó rà soát, sửa lỗi và chịu hoàn toàn trách nhiệm về các script đó.

- **Tạo bằng AI.** Với mỗi trong ba tính năng, hãy điều khiển công cụ AI theo từng bước — không sử dụng một prompt chung chung duy nhất — để chuyển đổi ít nhất 12 test case thành automation script. 12 test case có thể là bất kỳ tổ hợp nào của positive case, negative case và edge case; tất cả các loại đều được tính vào số lượng tối thiểu.
- **Thiết kế script theo hướng dữ liệu (data-driven).** Dữ liệu kiểm thử phải được lưu trong một tệp `.csv` hoặc `.json` riêng (không chấp nhận hardcode mảng hoặc object trực tiếp trong script), và các script phải sử dụng ít nhất ba mẫu assertion khác nhau.
- **Chạy trên ít nhất 3 trình duyệt** (Chromium / Firefox / WebKit hoặc Chrome / Edge / Firefox). Mỗi tính năng phải chạy trên cả ba trình duyệt — tổng cộng ít nhất 9 lượt chạy trình duyệt cho toàn bộ bộ kiểm thử. Mỗi lượt chạy phải tạo ra một báo cáo HTML (Allure hoặc Playwright HTML reporter), trong đó hiển thị rõ `"Run by: {StudentID}"` (ở tiêu đề, header, footer hoặc metadata của báo cáo).
- **Rà soát và sửa lỗi (human review).** Phân tích kỹ và chỉnh sửa các script do AI tạo ra. Báo cáo những điểm AI làm sai hoặc bỏ sót — ví dụ: selector thiếu ổn định, assertion yếu hoặc bị thiếu, thiếu edge case hoặc thao tác chờ (wait) không ổn định — đồng thời giải thích nguyên nhân (chất lượng prompt, giới hạn của mô hình hoặc đặc điểm của tính năng). Bạn chịu hoàn toàn trách nhiệm đối với các script cuối cùng.
- **Hoàn thiện automation ở mức cao nhất có thể.** Cố gắng để toàn bộ bộ kiểm thử chạy xuyên suốt từ đầu đến cuối và tạo ra đầy đủ đầu ra nhất có thể: báo cáo HTML đa trình duyệt và bug report trong trường hợp assertion thất bại phát hiện ra lỗi thực sự. Ghi nhận các lỗi đó cả trong báo cáo Markdown lẫn trang GitHub Issues, đồng thời đính kèm ảnh chụp màn hình cho mỗi issue. Với những test case không thể tự động hóa, hãy ghi rõ và giải thích lý do.

### Task 2 — Video demo

- Ghi lại một video YouTube ở chế độ không công khai (unlisted), dài ít nhất 5 phút, thuyết minh bằng tiếng Việt, trình diễn một automation script chạy từ đầu đến cuối (bao gồm chạy đa trình duyệt và báo cáo HTML được tạo ra).
- Trong phần thuyết minh, trình bày ít nhất một lỗi bạn đã sửa trong script do AI tạo ra trong quá trình rà soát.
- Video phải có minh chứng xác thực quyền tác giả bằng một trong hai cách: hiển thị camera khuôn mặt của bạn hoặc hiển thị terminal đang chạy lệnh `whoami` và `hostname`.

## 7. Agent Skill

Bạn được khuyến khích xây dựng một Agent Skill áp dụng quy trình automation này (tạo và bảo trì script theo hướng dữ liệu, chạy đa trình duyệt), để có thể tái sử dụng cho các tính năng khác trong những bài tập kiểm thử sau này.

Nộp Agent Skill cùng video minh họa (liên kết YouTube), trong đó trình bày từ đầu đến cuối cách bạn sử dụng skill cho một tính năng hoàn chỉnh.

## 8. Công cụ được phép và cấp độ Bloom-AI

Bạn có thể sử dụng các công cụ sau và phải khai báo chúng trong AI Audit Report:

- Bất kỳ công cụ AI nào bạn lựa chọn (ví dụ: ChatGPT, Claude, Gemini, Copilot, Cursor) — dùng để tạo automation script.
- Playwright (được khuyến nghị) hoặc Selenium 4+.
- Allure hoặc Playwright HTML reporter.

Cấp độ Bloom-AI yêu cầu cho bài tập này là G9.2 (Apply – Vận dụng), G9.3 (Analyse – Phân tích) và G9.4 (Collaborate – Cộng tác).

## 9. Báo cáo kiểm toán AI (AI Audit Report — Phụ lục bắt buộc)

Đính kèm AI Audit Report dưới dạng phụ lục. Có thể sử dụng nội dung trong các AI Template được cung cấp nếu cần.

- Nếu không sử dụng AI, hãy khai báo: **"I do not use any AI help in this exercise."**
- Nếu có sử dụng AI, hãy khai báo: **"I use AI tools for the following tasks,"** và cung cấp các thông tin sau cho từng lần tương tác:
  - Tên công cụ AI
  - Ngày và giờ
  - Prompt của bạn
  - Đầu ra do AI tạo ra

Để đơn giản hóa quy trình này, bạn được khuyến khích tạo một skill hoặc rule tự động trích xuất các thông tin trên sau mỗi phiên làm việc với AI.

## 10. Đánh giá phản biện AI (AI Critique — bắt buộc, 200–300 từ)

Viết một đoạn văn dài 200–300 từ để đánh giá phản biện AI. Đoạn văn cần trả lời các câu hỏi sau:

- AI đã đưa ra nội dung nào sai, thiên lệch hoặc chưa đầy đủ?
- Vì sao AI không phát hiện được vấn đề đó?
- Bạn rút ra nguyên tắc nào về việc cộng tác với AI trong quá trình thực hiện bài tập này?

Có thể sử dụng nội dung trong các AI Template được cung cấp nếu cần.

## 11. Các ràng buộc chống gian lận bằng AI (Anti-AI-Cheat Constraints)

Bài tập này yêu cầu minh chứng thực thi thực tế và có thể xác minh nguồn gốc. Những nội dung sau **không được tạo bằng AI hoặc làm giả** và sẽ được trợ giảng kiểm tra khi chấm:

- Báo cáo HTML phải chứa `"Run by: {StudentID}"` cùng với timestamp theo chuẩn ISO.
- Video demo phải có giọng thuyết minh của chính bạn và hiển thị camera khuôn mặt hoặc terminal đang chạy `whoami` và `hostname`.

## 12. Lịch sử Git Commit

Duy trì một repository GitHub công khai với lịch sử commit có ý nghĩa: ít nhất 8 commit. Chỉ các commit làm thay đổi tệp test script (`.spec.js`, `.spec.ts` hoặc định dạng tương đương) mới được tính vào mức tối thiểu 8 commit; các commit chỉ thay đổi README, PDF hoặc tài liệu khác không phải test script sẽ không được tính.

Cung cấp Git commit log dưới định dạng tệp văn bản.

## 13. Bảo vệ bài tập (Oral Defense)

30% sinh viên được chọn ngẫu nhiên có thể được mời tham gia buổi bảo vệ bài tập kéo dài 5–7 phút trong tuần sau hạn nộp để giải thích cách hoàn thành bài tập này.

## 14. Quy định nộp bài

**Định dạng tên tệp:**

`<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip`

- `SelfAssessedGrade`: điểm tự đánh giá gồm 3 chữ số, trong khoảng `[000, 100]`.
- Ví dụ: `25127001_HW04_AI_Automation_090.zip`

**Các nội dung bắt buộc trong tệp `.zip`:**

- Báo cáo chính (Markdown + PDF), bao gồm báo cáo automation và phần rà soát / phân tích khoảng cách (gap analysis) đối với các script do AI tạo ra.
- Liên kết repository GitHub công khai (chứa script, tệp dữ liệu và báo cáo HTML).
- Các báo cáo HTML đa trình duyệt (Allure / Playwright).
- Liên kết video demo YouTube ở chế độ unlisted.
- AI Critique và AI Audit Report (Markdown + PDF).
- Git commit log (tệp văn bản).
- Bug report, kèm ảnh chụp các lỗi trên trang GitHub Issues (nếu có).
- Tệp `README.md` chứa bảng tự đánh giá (bên dưới) và báo cáo tổng kết kiểm thử: số lượng tính năng; số test case đã tự động hóa, đã thực thi, đạt và không đạt; số lượt chạy trình duyệt; số lượng bug; và liên kết video demo.
- Các tài liệu hỗ trợ khác (nếu có).

Nộp bài trên Moodle. Về hạn nộp, vui lòng tham khảo liên kết nộp bài.

## 15. Mẫu đánh giá

| STT | Tiêu chí | Điểm | Điểm tự đánh giá |
|---:|---|---:|---:|
| 1 | Task 1 - Feature A | 25 | |
| 1 | Task 1 - Feature B | 25 | |
| 1 | Task 1 - Feature C | 25 | |
| 2 | Task 2 — Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | **Tổng** | **100** | |

## 16. Tài liệu tham khảo

- ISTQB Foundation Level Syllabus (phiên bản mới nhất).
- Hardman, P. (2025). *A Post-AI Learning Taxonomy.*
- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
- Anthropic (2025). *Building Reliable AI Test Agents* — bài viết kỹ thuật.
- Tài liệu hướng dẫn DeepEval & Promptfoo — các framework kiểm thử LLM.

## 17. Quy định khác

- Không chấp nhận nộp bài trễ.
- Thiếu bất kỳ tài liệu bắt buộc nào sẽ bị 0 điểm.
- Sao chép giữa các sinh viên — bao gồm cả prompt — sẽ khiến cả hai bên bị 0 điểm.
