# HW04 – Lời thoại lồng tiếng (feature C: FR-15 Quản lý sản phẩm)

Lời thoại cho từng cảnh trong [shot_list.md](shot_list.md) (cùng số cảnh). **Bạn tự đọc và thu bằng giọng của mình** (đề §11: không dùng TTS / giọng AI). Câu nào chưa tự nhiên thì sửa theo cách nói của bạn.

Cách dùng:

- `[Hình]` = màn hình đang chiếu khi đọc đoạn đó.
- `⟨…⟩` = điền bằng số liệu / tên thật **sau buổi quay**, trước khi thu giọng.
- Mỗi cảnh thu một file âm thanh riêng, đọc vấp thì chỉ thu lại cảnh đó.

---

## Video 1 – Demo Agent Skill (≈ 11 phút)

### 1.1 Mở đầu + xác thực (0:30)

[Hình] Terminal: `whoami`, `hostname`, `date`, `pwd`.

> Chào thầy cô. Em là Hồ Thùy Hương, mã số sinh viên 23120046. Video này trình bày cách em dùng Agent Skill test-automation do em xây dựng để tự động hóa trọn vẹn một feature: FR-15, Quản lý sản phẩm trên trang Admin của EShop, từ bước chọn test case đến báo cáo bug.
>
> Trước hết là bằng chứng người thực hiện: em chạy whoami và hostname, tài khoản là ⟨whoami⟩, tên máy là ⟨hostname⟩, thời điểm quay là ⟨ngày giờ⟩, trong thư mục bài làm week04.

### 1.2 Giới thiệu skill (1:00)

[Hình] `SKILL.md` (bảng T1–T8) → `review-rubric.md` → `templates/`, `scripts/` → `CLAUDE.md` → `automation.config.json`.

> Đây là skill test-automation. File SKILL.md chia quy trình thành tám bước, từ T1 đến T8: chọn test case, xây locator và page object, tách dữ liệu test, sinh script, review và sửa, chạy trên ba trình duyệt, phân tích test fail, và tổng kết.
>
> Đi kèm là file review-rubric: sau mỗi bước, AI phải tự chấm theo các tiêu chí này. Thư mục templates có mẫu file thiết kế, và thư mục scripts có hai script: run-browsers chạy một feature trên ba trình duyệt, summarize-results đếm kết quả từ các lần chạy.
>
> Skill được viết chung, không gắn với EShop. Những giá trị riêng của bài như mã số sinh viên trên tiêu đề báo cáo, địa chỉ ứng dụng hay thư mục test nằm trong CLAUDE.md và automation.config.json. Ví dụ ở đây, feature product-crud trỏ tới thư mục tests/product-crud. Muốn dùng skill cho một feature khác, em chỉ cần thêm một dòng cấu hình.
>
> Em rút ra skill này khi làm hai feature A và B. Bây giờ em dùng nó cho feature C.

### 1.3 T1 – Chọn test case (1:00)

[Hình] Gõ prompt T1 → câu trả lời của AI → design §1 → bảng tự chấm → câu hỏi → câu trả lời của em → commit.

> Bước một, em gọi skill và yêu cầu thực hiện bước T1 cho feature product-crud.
>
> Câu trả lời của AI luôn có ba phần. Phần đầu là kết quả của bước: ở đây AI đọc ⟨36⟩ test case của FR-15 ở HW02 – ⟨27⟩ test case domain testing và ⟨9⟩ test case giá trị biên – rồi điền bảng chọn test case vào mục 1 của file automation design. Mỗi test case có kỹ thuật, dữ liệu nhập, kết quả mong đợi trích nguyên văn, và có tự động hóa hay không.
>
> Phần thứ hai là bảng tự chấm theo rubric. Phần thứ ba là những điểm AI cần em quyết định, rồi AI dừng lại chờ em. Ở đây AI đề xuất không tự động hóa ⟨K⟩ test case, ví dụ ⟨mã TC⟩ vì ⟨lý do⟩. Em quyết định ⟨quyết định của em⟩. Sau đó bước này được commit riêng.

### 1.4 T2 – Locator và page object (1:15)

[Hình] `npm run sut` → `npm run codegen:admin` → Pick locator → page object → design §2.

> Bước hai là locator. Em khởi động EShop và mở Playwright codegen trên trang Admin, đăng nhập bằng tài khoản admin có sẵn trong dữ liệu mẫu, rồi mở danh sách sản phẩm và form thêm sản phẩm. Em dùng Pick locator để xem Playwright chọn locator nào cho từng phần tử. Bản ghi của codegen chỉ để tham khảo, không dùng làm script.
>
> Sau đó AI viết page object ⟨tên page object⟩ và ghi vào mục 2 lý do chọn từng locator. Thứ tự ưu tiên là vai trò và tên hiển thị của phần tử, rồi đến label, cuối cùng mới là CSS. ⟨Nếu có: phần tử … không có tên hiển thị, nên được ghi vào phần testability findings.⟩

### 1.5 T3 – Dữ liệu test (0:45)

[Hình] File JSON bên trái, test case HW02 bên phải.

> Bước ba, dữ liệu test được tách ra file JSON trong thư mục data/product-crud. Bên trái là một dòng dữ liệu, bên phải là test case tương ứng ở HW02: dữ liệu nhập và kết quả mong đợi khớp với test case, không lấy từ những gì ứng dụng đang trả về. Như vậy nếu ứng dụng có lỗi, test sẽ phát hiện ra chứ không "học theo" lỗi đó.

### 1.6 T4 – Sinh script và chạy lần đầu (1:00)

[Hình] File spec mới → vòng lặp đọc dữ liệu → lệnh chạy Chromium → dòng kết quả.

> Bước bốn, AI sinh script theo skill. Script đọc file dữ liệu, mỗi dòng trở thành một test riêng có tên bắt đầu bằng mã test case, dùng page object của bước hai và ít nhất ba kiểu assertion khác nhau.
>
> Em chạy thử lần đầu chỉ trên Chromium: ⟨x⟩ test pass, ⟨y⟩ test fail. Ở bước này chưa sửa gì; kết quả lần chạy đầu được ghi nguyên vào mục 4, để sau này so sánh được script trước và sau khi review.

### 1.7 T5 – Review script (1:00)

[Hình] Bảng review §5 → UI mode.

> Bước năm là review – phần bảo trì script. Skill có một danh sách kiểm tra: locator dễ gãy, assertion yếu, kết quả mong đợi sai, thiếu trường hợp biên, chờ không ổn định, phụ thuộc ngầm giữa các test và dữ liệu viết cứng. AI đọc từng script theo danh sách đó và đề xuất các chỗ cần sửa vào bảng review ở mục 5.
>
> Em mở UI mode của Playwright để chạy từng test và xem lại từng bước, kiểm tra xem đề xuất của AI có đúng không.

### 1.8 T5 – Sửa một lỗi (1:15)

[Hình] Dòng code sai → bản sửa → chạy lại test → `git show --stat`.

> Ở test ⟨mã TC⟩, AI viết ⟨mô tả dòng code sai⟩. Kết quả lần chạy đầu không đáng tin, vì ⟨lý do⟩. Lỗi này thuộc loại ⟨loại lỗi⟩. Theo em, AI sai vì ⟨lý do em kết luận⟩.
>
> Em sửa bằng cách ⟨cách sửa⟩, rồi chạy lại riêng test này: bây giờ nó ⟨kết quả⟩. Lỗi và nguyên nhân được ghi vào bảng review, và bản sửa là một commit riêng.

### 1.9 T6 – Chạy ba trình duyệt (0:45)

[Hình] Lệnh `npm run feature -- product-crud` chạy → tiêu đề một báo cáo.

> Bước sáu, skill chạy lệnh npm run feature cho product-crud. Script run-browsers của skill khởi động lại EShop với dữ liệu sạch, rồi chạy toàn bộ test trên Chromium, Firefox và WebKit; mỗi trình duyệt có một báo cáo HTML riêng, tiêu đề ghi Run by: 23120046 và thời điểm chạy. Kết quả: Chromium ⟨x pass / y fail⟩, Firefox ⟨…⟩, WebKit ⟨…⟩.

### 1.10 T7 – Phân tích test fail và báo bug (1:30)

[Hình] Trace viewer → design §8 → prompt automation-bug-reporting → issue trên GitHub.

> Bước bảy, em mở trace viewer của test ⟨mã TC⟩. Trace cho thấy ảnh chụp trang ở từng bước, các request gửi lên API và phản hồi. Ở đây ⟨điều trace cho thấy⟩, nên em kết luận đây là lỗi ⟨của sản phẩm / của script⟩. Kết luận này do em đưa ra, AI chỉ đề xuất.
>
> Với các lỗi sản phẩm, em dùng skill thứ hai, automation-bug-reporting. Skill kiểm tra lỗi đã có trong bug report HW02 chưa: lỗi đã có thì bình luận vào issue cũ, kèm script, trình duyệt, kết quả assertion, ảnh chụp và chữ HW04; lỗi mới thì tạo issue mới có nhãn hw: HW04. Với FR-15, ⟨n⟩ lỗi đã có từ HW02 và ⟨m⟩ lỗi mới.

### 1.11 T8 – Tổng kết (0:45)

[Hình] Design §6 → `git log`.

> Bước cuối, skill chạy npm run summary để đếm kết quả từ các file kết quả, không đếm tay: FR-15 có ⟨N⟩ test case tự động hóa, ⟨P⟩ pass và ⟨F⟩ fail trên mỗi trình duyệt, ⟨K⟩ test case không tự động hóa. Lịch sử git cho thấy mỗi bước là một commit riêng.

### 1.12 Kết thúc (0:20)

> Như vậy, với skill này em làm trọn một feature mới theo cùng một quy trình: AI làm từng bước và tự chấm, em duyệt và quyết định, mọi kết quả đều đến từ lần chạy thật. Lần sau dùng cho feature khác, em chỉ cần thêm feature đó vào file cấu hình. Cảm ơn thầy cô đã xem.

---

## Video 2 – Demo automation script (≈ 7 phút)

### 2.1 Mở đầu + xác thực (0:30)

[Hình] Terminal: `whoami`, `hostname`, `date`, `pwd`.

> Chào thầy cô. Em là Hồ Thùy Hương, mã số sinh viên 23120046. Đây là video demo Task 2 của bài HW04 – Automation Testing. Em sẽ cho thấy script tự động hóa feature FR-15, Quản lý sản phẩm trên trang Admin của EShop, chạy từ đầu đến cuối trên ba trình duyệt, mở báo cáo HTML, và kể lại một lỗi em đã sửa trong script do AI sinh ra.
>
> Bằng chứng người thực hiện: tài khoản ⟨whoami⟩, tên máy ⟨hostname⟩, thời điểm quay ⟨ngày giờ⟩.

### 2.2 Giới thiệu script (1:30)

[Hình] Spec → vòng lặp dữ liệu → file JSON → page object → các assertion.

> Đây là script em sẽ chạy: file ⟨tên spec⟩ trong thư mục tests/product-crud, viết bằng Playwright và TypeScript.
>
> Script được viết theo hướng data-driven. Dữ liệu test không nằm trong code mà nằm trong file JSON riêng, data/product-crud/⟨tên file⟩. Mỗi phần tử của file là một test case đã thiết kế ở HW02: có mã test case, dữ liệu nhập và kết quả mong đợi. Kết quả mong đợi em lấy từ test case HW02, tức là từ yêu cầu FR-15, chứ không chép lại từ những gì ứng dụng đang hiển thị.
>
> Script đọc file này, và với mỗi dòng dữ liệu thì tạo ra một test riêng. Tên test bắt đầu bằng mã test case, nên trong báo cáo em biết ngay test nào ứng với test case nào.
>
> Các thao tác trên trang Admin được gom vào page object ⟨tên page object⟩: đăng nhập, mở danh sách sản phẩm, thêm, sửa, xóa. Locator ưu tiên vai trò và tên hiển thị của phần tử, ví dụ nút ⟨"Thêm sản phẩm"⟩, nên khi giao diện đổi class CSS thì script không bị gãy.
>
> Về phần kiểm tra, script dùng ⟨ba⟩ kiểu assertion. Thứ nhất, ⟨kiểm tra thông báo hoặc dòng sản phẩm hiển thị trên giao diện⟩. Thứ hai, ⟨kiểm tra mã trạng thái và nội dung trả về của API⟩. Thứ ba, ⟨so sánh số sản phẩm trước và sau thao tác, để chắc rằng dữ liệu thật sự thay đổi – hoặc thật sự không thay đổi khi yêu cầu bị từ chối⟩.

### 2.3 Một lỗi đã sửa (1:30)

Chọn **một** cách: cách A nếu review FR-15 (design §5) có lỗi; cách B nếu không.

**Cách A – lỗi tìm thấy khi review FR-15** (giống cảnh 1.8, nói chi tiết hơn)

[Hình] Dòng ở design §5 → `git show <hash>`.

> Tiếp theo em kể một lỗi trong script do AI sinh ra mà em đã phát hiện khi review.
>
> Ở test ⟨mã TC⟩, AI viết ⟨mô tả dòng code sai⟩. Lần chạy đầu trên Chromium, test này ⟨pass / fail⟩, nhưng kết quả đó không đáng tin, vì ⟨lý do: ví dụ test vẫn pass dù hệ thống làm sai / test fail vì locator chứ không phải vì sản phẩm⟩.
>
> Lỗi này thuộc loại ⟨assertion yếu / locator dễ gãy / chờ không ổn định / kết quả mong đợi sai⟩. Theo em, AI sai vì ⟨do prompt chưa nói rõ … / do giới hạn của mô hình … / do đặc điểm của feature …⟩.
>
> Em sửa bằng cách ⟨cách sửa⟩. Đây là phần thay đổi trong commit ⟨hash⟩. Chạy lại, test này ⟨pass / fail đúng lý do là lỗi của sản phẩm⟩. Lỗi được ghi vào bảng review ở mục 5 của file automation design.

**Cách B – lỗi đã sửa ở FR-08 Thanh toán** (commit `f0b2152`, `features/checkout/automation_design.md` §5 dòng 2)

[Hình] `git show f0b2152` → `tests/checkout/api.spec.ts` quanh dòng 141 → bảng review checkout §5 dòng 2.

> Khi tự động hóa FR-15, script AI sinh ra không có lỗi đáng kể, nên em kể một lỗi em đã sửa ở feature FR-08 Thanh toán, trong file tests/checkout/api.spec.ts.
>
> Với những dòng dữ liệu mà đơn hàng phải bị từ chối, AI đặt cả hai bước kiểm tra số đơn hàng bên trong câu lệnh if: chỉ kiểm tra khi dòng dữ liệu có ghi trường newOrdersAll hoặc trường newOrders. Nếu một dòng dữ liệu thiếu cả hai trường, test không kiểm tra đơn hàng nào cả mà vẫn báo pass. Nghĩa là test có thể xanh ngay cả khi hệ thống đã tạo ra một đơn hàng lẽ ra phải bị từ chối.
>
> Lỗi này thuộc loại assertion yếu. Em kết luận nguyên nhân là do giới hạn của mô hình: AI cho cả hai trường là tùy chọn để một nhánh code dùng được cho mọi dòng dữ liệu, nhưng không xử lý trường hợp thiếu cả hai.
>
> Em sửa bằng cách thêm một expect bắt buộc trước hai bước kiểm tra đó: dòng bị từ chối phải ghi ít nhất một trong hai trường, nếu không test fail ngay và báo rõ mã test case bị thiếu. Đây là diff của commit f0b2152. Lỗi này em ghi ở dòng 2 bảng review, mục 5 trong file automation design của checkout.

### 2.4 Chạy ba trình duyệt (1:15)

[Hình] Cùng terminal: `whoami && hostname` → `npm run feature -- product-crud` → chạy liền đến dòng kết quả của WebKit (tua nhanh, nhãn "×8").

> Bây giờ em chạy script trên cả ba trình duyệt. Em chạy lại whoami và hostname ngay trong terminal này, rồi gõ lệnh npm run feature, gạch gạch, product-crud.
>
> Lệnh này khởi động lại EShop, nên cơ sở dữ liệu được tạo lại từ đầu và lần chạy nào cũng bắt đầu từ cùng một dữ liệu. Sau đó nó chạy toàn bộ test của FR-15 lần lượt trên Chromium, Firefox và WebKit. Mỗi trình duyệt có một báo cáo HTML riêng trong thư mục reports/product-crud. Phần chờ em tua nhanh chứ không cắt, để thấy lần chạy liền mạch từ đầu đến cuối.
>
> Kết quả: Chromium ⟨x⟩ test pass, ⟨y⟩ test fail. Firefox ⟨x⟩ pass, ⟨y⟩ fail. WebKit ⟨x⟩ pass, ⟨y⟩ fail.

### 2.5 Báo cáo HTML (1:30)

[Hình] Báo cáo Chromium → phóng to tiêu đề → một test pass → một test fail → tiêu đề báo cáo Firefox, WebKit.

> Đây là báo cáo HTML của Chromium mà Playwright vừa sinh ra. Trên tiêu đề có tên bài HW04, tên feature product-crud, trình duyệt chromium, dòng Run by: 23120046 và thời điểm chạy theo chuẩn ISO, ⟨giờ trên tiêu đề⟩, khớp với lần chạy vừa rồi.
>
> Em mở một test pass, ⟨mã TC⟩: báo cáo ghi lại từng bước của test và từng assertion đã kiểm tra.
>
> Em mở một test fail, ⟨mã TC⟩: Playwright cho thấy giá trị mong đợi là ⟨expected⟩, còn giá trị nhận được là ⟨received⟩, kèm ảnh chụp màn hình lúc test fail.
>
> Tương tự là báo cáo của Firefox và WebKit, tiêu đề cũng có Run by: 23120046 và thời điểm chạy của từng trình duyệt.

### 2.6 Test fail và bug (0:20)

[Hình] Design §8 hoặc trang GitHub Issues.

> Các test fail em đã phân tích bằng trace viewer. ⟨n⟩ test fail do lỗi của sản phẩm và đã được báo trên GitHub Issues của nhóm: bug đã có từ HW02 thì bình luận vào issue cũ, bug mới thì tạo issue mới có nhãn hw: HW04. ⟨m⟩ test fail do script và đã được sửa.

### 2.7 Tổng kết + kết thúc (0:30)

[Hình] Design §6.

> Tổng cộng, FR-15 có ⟨N⟩ test case được tự động hóa trên ⟨36⟩ test case thiết kế ở HW02, chạy trên ba trình duyệt, mỗi trình duyệt ⟨P⟩ pass và ⟨F⟩ fail. ⟨K⟩ test case không tự động hóa, lý do em ghi trong mục 7 của file automation design. Đó là toàn bộ phần demo Task 2 của em. Cảm ơn thầy cô đã xem.
