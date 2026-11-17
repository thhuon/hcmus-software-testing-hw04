# HW04 – Demo videos: voice-over script

Voice-over text for the scenes of [shot_list.md](shot_list.md), in Vietnamese, **read and recorded in the student's own voice** (brief §11: no TTS, no AI voice). Written word for word at the student's request (18/11); change any sentence into your own words – the voice and the wording are yours.

How to use:

- `[Hình]` = what is on screen while the paragraph is read. `⟨…⟩` = fill in from the recording session before recording the voice.
- Read one scene per audio clip (easier to re-record one scene). Speed ≈ 150–170 words/min; the durations match [shot_list.md](shot_list.md) §2.
- Where the voice is shorter than the picture, leave silence or speed up the picture; where it is longer, freeze the frame – never cut the 3-browser run (S9).

---

## Video 1 – Demo Task 2 (≈ 7:15)

### S0 – Mở đầu (0:15)

[Hình] Title card.

> Chào thầy cô. Em là Hồ Thùy Hương, mã số sinh viên 23120046. Đây là video demo Task 2 của bài HW04 – Automation Testing. Em sẽ cho thấy script tự động hóa feature FR-15, Quản lý sản phẩm trên trang Admin của EShop, chạy từ đầu đến cuối trên ba trình duyệt, mở báo cáo HTML, và kể lại một lỗi em đã sửa trong script do AI sinh ra.

### S1 – Xác thực người làm (0:20)

[Hình] Terminal: `whoami`, `hostname`, `date -Iseconds`, `pwd`, `git log --oneline -1`.

> Trước hết là bằng chứng người thực hiện. Em chạy lệnh whoami và hostname trong terminal: tài khoản là ⟨whoami⟩, tên máy là ⟨hostname⟩. Lệnh date cho thấy thời điểm quay, hôm nay là ⟨ngày⟩. Đây là thư mục bài làm week04 và commit mới nhất trong repository của em.

### S8 – Giới thiệu script (1:30)

[Hình] `tests/product-crud/⟨spec⟩.spec.ts` → vòng lặp dữ liệu → `data/product-crud/⟨file⟩.json` → page object → các assertion.

> Đây là script em sẽ chạy: file ⟨tên spec⟩ trong thư mục tests/product-crud, viết bằng Playwright và TypeScript.
>
> Script được viết theo hướng data-driven. Dữ liệu test không nằm trong code mà nằm trong file JSON riêng, data/product-crud/⟨tên file⟩. Mỗi phần tử của file là một test case đã thiết kế ở HW02: có mã test case, dữ liệu nhập và kết quả mong đợi. Kết quả mong đợi em lấy từ test case HW02, tức là từ yêu cầu FR-15, chứ không chép lại từ những gì ứng dụng đang hiển thị.
>
> Script đọc file này, và với mỗi dòng dữ liệu thì tạo ra một test riêng. Tên test bắt đầu bằng mã test case, nên trong báo cáo em biết ngay test nào ứng với test case nào.
>
> Các thao tác trên trang Admin được gom vào page object ⟨tên page object⟩: đăng nhập, mở danh sách sản phẩm, thêm, sửa, xóa. Locator ưu tiên vai trò và tên hiển thị của phần tử, ví dụ nút ⟨"Thêm sản phẩm"⟩, nên khi giao diện đổi class CSS thì script không bị gãy.
>
> Về phần kiểm tra, script dùng ⟨ba⟩ kiểu assertion khác nhau. Thứ nhất, ⟨kiểm tra thông báo hoặc dòng sản phẩm hiển thị trên giao diện⟩. Thứ hai, ⟨kiểm tra mã trạng thái và nội dung trả về của API⟩. Thứ ba, ⟨so sánh số sản phẩm trước và sau thao tác, để chắc rằng dữ liệu thật sự đã thay đổi – hoặc thật sự không thay đổi khi yêu cầu bị từ chối⟩.

### S7 – Một lỗi trong script AI sinh ra và cách em sửa (1:40)

Pick **one** version. Version A when the FR-15 review (design §5) found a mistake during the session; version B (FR-08, commit `f0b2152`) otherwise.

**Version A – lỗi tìm thấy khi review FR-15** (điền sau bước T5)

[Hình] Test sai / output fail → dòng code sai → sửa trong editor → chạy lại → design §5 → `git show --stat ⟨hash⟩`.

> Tiếp theo em kể một lỗi trong script do AI sinh ra mà em đã phát hiện khi review.
>
> Ở test ⟨mã TC⟩, AI viết ⟨mô tả dòng code sai⟩. Lần chạy đầu trên Chromium, test này ⟨pass / fail⟩, nhưng kết quả đó không đáng tin, vì ⟨lý do: ví dụ test vẫn pass dù hệ thống làm sai / test fail vì locator chứ không phải vì sản phẩm⟩.
>
> Lỗi này thuộc loại ⟨weak assertion – assertion yếu / fragile selector – locator dễ gãy / flaky wait – chờ không ổn định / wrong oracle – kết quả mong đợi sai⟩. Theo em, AI sai vì ⟨lý do em kết luận: do prompt chưa nói rõ … / do giới hạn của mô hình … / do đặc điểm của feature …⟩.
>
> Em sửa bằng cách ⟨cách sửa⟩. Đây là phần thay đổi trong commit ⟨hash⟩. Em chạy lại riêng test này: bây giờ nó ⟨pass / fail đúng lý do là lỗi của sản phẩm⟩. Lỗi này được ghi vào bảng review ở mục 5 của file automation design, kèm loại lỗi và nguyên nhân.

**Version B – lỗi đã sửa ở FR-08 Thanh toán** (commit `f0b2152`, checkout design §5 dòng 2)

[Hình] `git show f0b2152` → `tests/checkout/api.spec.ts` quanh dòng 141 → `features/checkout/automation_design.md` §5 dòng 2.

> Khi tự động hóa feature FR-15, script AI sinh ra không có lỗi đáng kể, nên em kể một lỗi em đã sửa ở feature FR-08 Thanh toán, trong file tests/checkout/api.spec.ts.
>
> Với những dòng dữ liệu mà đơn hàng phải bị từ chối, AI đặt cả hai bước kiểm tra số đơn hàng bên trong câu lệnh if: chỉ kiểm tra khi dòng dữ liệu có ghi trường newOrdersAll hoặc trường newOrders. Nếu một dòng dữ liệu thiếu cả hai trường, test không kiểm tra đơn hàng nào cả mà vẫn báo pass. Nghĩa là test có thể xanh ngay cả khi hệ thống đã tạo ra một đơn hàng lẽ ra phải bị từ chối.
>
> Lỗi này thuộc loại weak assertion – assertion yếu. Em kết luận nguyên nhân là do giới hạn của mô hình: AI cho cả hai trường là tùy chọn để một nhánh code dùng được cho mọi dòng dữ liệu, nhưng không xử lý trường hợp thiếu cả hai.
>
> Em sửa bằng cách thêm một expect bắt buộc trước hai bước kiểm tra đó: dòng bị từ chối phải ghi ít nhất một trong hai trường, nếu không test sẽ fail ngay và thông báo rõ mã test case bị thiếu. Đây là diff của commit f0b2152. Lỗi này em ghi ở dòng 2 bảng review, mục 5 trong file automation design của checkout.

### S9 – Chạy trên ba trình duyệt (1:15)

[Hình] Cùng terminal: `whoami && hostname` → `npm run feature -- product-crud` → chạy liên tục tới dòng kết quả của WebKit (tua nhanh, có nhãn "×8").

> Bây giờ em chạy script trên cả ba trình duyệt. Em chạy lại whoami và hostname ngay trong terminal này, rồi gõ lệnh npm run feature, gạch gạch, product-crud.
>
> Lệnh này khởi động lại EShop, nên cơ sở dữ liệu được tạo lại từ đầu và lần chạy nào cũng bắt đầu từ cùng một dữ liệu. Sau đó nó chạy toàn bộ test của FR-15 lần lượt trên Chromium, Firefox và WebKit. Mỗi trình duyệt có một báo cáo HTML riêng trong thư mục reports/product-crud. Phần chờ em tua nhanh chứ không cắt, để thấy lần chạy liền mạch từ đầu đến cuối.
>
> Kết quả: Chromium ⟨x⟩ test pass, ⟨y⟩ test fail. Firefox ⟨x⟩ pass, ⟨y⟩ fail. WebKit ⟨x⟩ pass, ⟨y⟩ fail.

### S10 – Báo cáo HTML (1:30)

[Hình] Báo cáo Chromium → phóng to tiêu đề → một test pass → một test fail → báo cáo Firefox, WebKit (tiêu đề).

> Đây là báo cáo HTML của Chromium mà Playwright vừa sinh ra. Trên tiêu đề có tên bài HW04, tên feature product-crud, trình duyệt chromium, dòng Run by: 23120046 và thời điểm chạy theo chuẩn ISO, ⟨giờ trên tiêu đề⟩ – khớp với lần chạy vừa rồi.
>
> Em mở một test pass, ⟨mã TC⟩: báo cáo ghi lại từng bước của test và từng assertion đã kiểm tra.
>
> Em mở một test fail, ⟨mã TC⟩: Playwright cho thấy giá trị mong đợi là ⟨expected⟩, còn giá trị nhận được là ⟨received⟩, kèm ảnh chụp màn hình lúc test fail.
>
> Tương tự là báo cáo của Firefox và WebKit, tiêu đề cũng có Run by: 23120046 và thời điểm chạy của từng trình duyệt.

### S11 – Phân tích test fail (0:20)

[Hình] Bảng design §8 hoặc trang GitHub Issues.

> Các test fail em đã phân tích bằng trace viewer. ⟨n⟩ test fail do lỗi của sản phẩm: em đã báo trên GitHub Issues của nhóm, bug đã có từ HW02 thì bình luận thêm vào issue cũ, bug mới thì tạo issue mới có nhãn hw: HW04. ⟨m⟩ test fail do script và đã được sửa.

### S12 – Tổng kết (0:20)

[Hình] Output `npm run summary`.

> Tổng cộng, FR-15 có ⟨N⟩ test case được tự động hóa trên tổng số ⟨36⟩ test case thiết kế ở HW02, chạy trên ba trình duyệt: ⟨P⟩ pass và ⟨F⟩ fail mỗi trình duyệt. ⟨K⟩ test case không tự động hóa, lý do em ghi trong mục 7 của file automation design.

### S13 – Kết thúc (0:15)

> Đó là toàn bộ phần demo Task 2 của em. Cảm ơn thầy cô đã xem.

---

## Video 2 – Agent Skill (≈ 10:30)

S1, S7, S9 and S10 reuse the text of video 1 (S7: the same version A or B; S9 and S10 may be read shorter, the picture is cut shorter). The scenes below are new.

### S0 – Mở đầu (0:15)

[Hình] Title card.

> Chào thầy cô. Em là Hồ Thùy Hương, mã số sinh viên 23120046. Video này trình bày cách em dùng Agent Skill test-automation do em xây dựng để tự động hóa trọn vẹn một feature – FR-15, Quản lý sản phẩm trên trang Admin của EShop – từ chọn test case đến báo cáo bug.

### S1 – Xác thực người làm (0:20)

Same text as video 1, S1.

### S2 – Giới thiệu skill (0:50)

[Hình] `skills/test-automation/SKILL.md` (bảng T1–T8) → `review-rubric.md` → `scripts/` → `CLAUDE.md` dòng feature C → `automation.config.json`.

> Đây là skill test-automation. File SKILL.md chia quy trình thành tám bước, từ T1 đến T8: chọn test case, xây locator và page object, tách dữ liệu test, sinh script, review và sửa, chạy trên nhiều trình duyệt, phân tích test fail, và tổng kết. Đi kèm là bảng tiêu chí review-rubric để AI tự chấm sau mỗi bước, và hai script: run-browsers chạy một feature trên ba trình duyệt, summarize-results đếm kết quả.
>
> Skill được viết chung, không gắn với EShop. Những giá trị riêng của bài như mã số sinh viên trên tiêu đề báo cáo, địa chỉ ứng dụng, thư mục test thì nằm trong CLAUDE.md và automation.config.json – như ở đây, feature product-crud trỏ tới thư mục tests/product-crud.
>
> Em rút ra skill này khi làm hai feature A và B, và bây giờ dùng nó cho feature C. Ở mỗi bước, AI làm, tự chấm theo rubric, rồi dừng lại cho em duyệt. Những quyết định như test case nào không tự động hóa, lỗi do sản phẩm hay do script, là do em quyết định. Mỗi bước là một commit riêng.

### S3 – T1: Chọn test case (1:00)

[Hình] Prompt T1 trong Claude Code → design §1 → bảng tự chấm → câu trả lời của SV → commit.

> Bước một, em yêu cầu AI dùng skill, bước T1, cho feature product-crud. AI đọc ⟨36⟩ test case của FR-15 ở HW02 – ⟨27⟩ test case domain testing và ⟨9⟩ test case giá trị biên – rồi điền bảng chọn test case ở mục 1 của file automation design.
>
> Với mỗi test case, bảng ghi kỹ thuật, dữ liệu nhập, kết quả mong đợi trích nguyên văn, và có tự động hóa hay không. ⟨K⟩ test case không tự động hóa, ví dụ ⟨mã TC⟩ vì ⟨lý do⟩.
>
> Cuối câu trả lời, AI tự chấm theo rubric và hỏi em những điểm cần quyết định. Em trả lời: ⟨quyết định của em⟩. Sau đó em commit bước này.

### S4 – T2: Locator và page object (1:15)

[Hình] `npm run sut` → `npm run codegen:admin` → Pick locator → page object trong `page-objects/` → design §2.

> Bước hai là locator. Em khởi động EShop và mở Playwright codegen trên trang Admin, đăng nhập bằng tài khoản admin có sẵn trong dữ liệu mẫu, rồi mở danh sách sản phẩm và form thêm sản phẩm. Em dùng Pick locator để xem Playwright chọn locator nào cho từng phần tử. Bản ghi của codegen chỉ để tham khảo, không dùng làm script.
>
> Sau đó AI viết page object ⟨tên⟩ và ghi vào mục 2 lý do chọn từng locator. Ưu tiên là vai trò và tên hiển thị, sau đó là label, cuối cùng mới đến CSS. ⟨Phần tử không có tên hiển thị, nếu có: … – em ghi vào phần testability findings.⟩

### S5 – T3: Dữ liệu test (0:45)

[Hình] `data/product-crud/⟨file⟩.json` cạnh dòng TC trong `../week02/features/fC-pool-C/02_domain_testing.md`.

> Bước ba, dữ liệu test được tách ra file JSON trong thư mục data/product-crud. Bên trái là một dòng dữ liệu, bên phải là test case tương ứng ở HW02: dữ liệu nhập và kết quả mong đợi khớp với test case, không lấy từ những gì ứng dụng đang trả về. Tên sản phẩm được thêm hậu tố riêng cho mỗi lần chạy, để chạy lặp lại không bị trùng dữ liệu.

### S6 – T4: Sinh script và chạy lần đầu (1:00)

[Hình] Prompt T4 → các file `tests/product-crud/*.spec.ts` → `npx playwright test tests/product-crud --project=chromium`.

> Bước bốn, AI sinh script theo skill: script đọc file dữ liệu, mỗi dòng thành một test, dùng page object của bước hai và ít nhất ba kiểu assertion. Em chạy thử lần đầu chỉ trên Chromium: ⟨x⟩ pass, ⟨y⟩ fail. Ở bước này em chưa sửa gì, kết quả lần chạy đầu được ghi nguyên vào mục 4.

### S7 – T5: Review và sửa (1:40)

Same text as video 1, S7 (version A or B). Add at the start:

> Bước năm là review. Em đọc từng script theo danh sách kiểm tra của skill: locator dễ gãy, assertion yếu, kết quả mong đợi sai, thiếu trường hợp biên, chờ không ổn định, phụ thuộc ngầm giữa các test và dữ liệu viết cứng.

### S9 – T6: Chạy ba trình duyệt (0:45)

> Bước sáu, em chạy lệnh npm run feature, gạch gạch, product-crud: EShop được khởi động lại với dữ liệu sạch, rồi toàn bộ test chạy trên Chromium, Firefox và WebKit. Kết quả: Chromium ⟨x / y⟩, Firefox ⟨x / y⟩, WebKit ⟨x / y⟩.

### S10 – Báo cáo HTML (0:45)

> Mỗi trình duyệt có một báo cáo HTML, tiêu đề ghi Run by: 23120046 và thời điểm chạy. Em mở một test fail để xem giá trị mong đợi và giá trị nhận được trước khi phân tích ở bước bảy.

### S11 – T7: Phân tích test fail và báo bug (1:15)

[Hình] `npm run trace -- ⟨trace.zip⟩` → design §8 → GitHub issue có bình luận "HW04" hoặc issue mới nhãn `hw: HW04`.

> Bước bảy, em mở trace viewer của test ⟨mã TC⟩. Trace cho thấy ảnh chụp trang ở từng bước, các request gửi lên API và phản hồi. Ở đây ⟨điều trace cho thấy: ví dụ API trả về 201 dù tên sản phẩm rỗng⟩, nên em kết luận đây là lỗi ⟨của sản phẩm / của script⟩.
>
> Với lỗi sản phẩm, em dùng skill automation-bug-reporting. Skill kiểm tra lỗi này đã có trong bug report HW02 chưa. ⟨Lỗi đã có ở issue #… – em bình luận vào issue cũ với script, trình duyệt, kết quả assertion, ảnh chụp và chữ HW04.⟩ ⟨Lỗi mới – em tạo issue mới có thêm nhãn hw: HW04.⟩

### S12 – T8: Tổng kết (0:45)

[Hình] `npm run summary` → design §6–§8 → `git log --oneline -- tests/product-crud`.

> Bước cuối, lệnh npm run summary đếm kết quả từ các file results.json, không đếm tay: FR-15 có ⟨N⟩ test case tự động hóa, ⟨P⟩ pass, ⟨F⟩ fail trên mỗi trình duyệt, ⟨K⟩ test case không tự động hóa. Lịch sử git cho thấy mỗi bước là một commit riêng.

### S13 – Kết thúc (0:15)

> Như vậy, với skill này, em làm trọn một feature mới theo cùng một quy trình: AI làm từng bước, em duyệt và quyết định, mọi kết quả đều đến từ lần chạy thật. Cảm ơn thầy cô đã xem.
