# Tự động hóa kiểm thử (data-driven, web UI trên nhiều browser)

*Bản tiếng Việt để đọc và review; bản agent dùng là [SKILL.md](SKILL.md).*

**Khi nào dùng:** Khi các test case đã thiết kế của một feature web cần được chuyển thành script test UI tự động bằng Playwright (hoặc Selenium), từng bước với AI và có người dùng review — chọn test case nào để tự động hóa, xây dựng locator / page object, chuyển dữ liệu test sang file JSON hoặc CSV, sinh spec data-driven (hướng dữ liệu) với nhiều assertion pattern, review và sửa script do AI sinh (selector dễ vỡ, assertion yếu, lệnh chờ flaky, thiếu edge case), chạy trên nhiều browser với mỗi lần chạy một HTML report, phân loại lỗi (triage), hoặc đếm số test case được tự động hóa / pass / fail.

**Chủ đề:** Tự động hóa kiểm thử giao diện web. **Nguồn:** [ISTQB] §6.2, [PW] Best Practices / Locators / Assertions / Parameterize tests / Reporters / Retries, [POM]. Mã của các nguồn tham khảo có trong `../SOURCES.md`.

## Tổng quan

Một bộ test sinh ra từ một prompt trông có vẻ đầy đủ nhưng thực ra không: selector hỏng ngay lần đổi layout tiếp theo, assertion chỉ kiểm tra rằng *có gì đó* hiện ra, giá trị mong đợi được chép từ những gì app đang làm hôm nay, và các lệnh chờ chỉ pass trên máy nhanh. Skill này biến test case đã thiết kế thành một bộ test, mỗi prompt một bước, có người dùng review và ghi lại AI đã sai gì, vì sao.

| Bước | Ghi vào | Ai quyết định |
| --- | --- | --- |
| T1 Chọn test case | design §1 | Tester xác nhận test case nào được tự động hóa và vì sao các test case còn lại thì không |
| T2 Locator và page object | design §2, `pages/` | Tester xác nhận cách chọn locator ở chỗ UI không có accessible name (tên truy cập) |
| T3 Dữ liệu test | design §3, `data/<feature>/` | Giá trị mong đợi lấy từ test basis (cơ sở kiểm thử), không bao giờ lấy từ app |
| T4 Sinh spec | design §4, `tests/<feature>/` | AI sinh code; chưa sửa gì |
| T5 Review và sửa | design §5, spec | Tester quyết định mọi "vì sao AI bỏ sót" |
| T6 Chạy trên nhiều browser | design §6 | Chỉ dùng lần chạy thật; không bao giờ sửa report |
| T7 Phân loại lỗi (failure triage) | design §6, §8 | Tester xác nhận lỗi sản phẩm hay lỗi script |
| T8 Tổng kết | design §7, §8 | Số liệu lấy từ script, không đếm tay |

Sau đó: mỗi lỗi sản phẩm đã được xác nhận → **SKILL BẮT BUỘC TIẾP THEO:** automation-bug-reporting.

**Quy tắc cốt lõi:**

- Mỗi prompt một bước; mỗi bước bắt đầu từ kết quả đã commit của bước trước.
- Giá trị mong đợi của mọi assertion (khẳng định kiểm tra) được truy về một test case và một câu trong tài liệu yêu cầu ([REQ], [TD]). Assertion fail vì sản phẩm sai thì **giữ nguyên trạng thái fail**: không bao giờ nới lỏng, bỏ qua hay đảo ngược nó để có lần chạy xanh.
- Kết quả lấy từ các lần chạy thật trên máy của tester. HTML report do công cụ tạo ra và được commit nguyên trạng.

## Bối cảnh dự án (đọc trước)

Lấy các giá trị sau từ hướng dẫn của dự án (CLAUDE.md, README hoặc đề bài):

- Các feature trong phạm vi, key của chúng, URL ứng dụng và lệnh khởi động; tài liệu yêu cầu.
- Nơi chứa các test case đã thiết kế (kỹ thuật, ID, input, kết quả mong đợi).
- Mức tối thiểu: số test case mỗi feature, số assertion pattern khác nhau, số browser, định dạng file dữ liệu.
- Danh tính trên report: dòng chữ mà mọi HTML report phải hiển thị (vd. `Run by: <ID>`) và định dạng timestamp.
- Thư mục chứa spec, page object, dữ liệu, report, và file làm việc của từng feature.
- Quy tắc commit và ghi log sử dụng AI.

Nếu thiếu giá trị nào, hỏi một lần và đề xuất thêm nó vào CLAUDE.md.

### Thiết lập (một lần cho mỗi dự án)

| File | Chép tới (mặc định) | Mục đích |
| --- | --- | --- |
| [templates/playwright.config.ts](templates/playwright.config.ts) | `playwright.config.ts` | Mỗi browser một project, `webServer` cho SUT, `workers: 1` vì dùng chung database, HTML report có tiêu đề gồm danh tính lần chạy và timestamp ISO, kết quả JSON cho phần tổng kết |
| [templates/automation.config.json](templates/automation.config.json) | `automation.config.json` | Key feature, thư mục spec, nhãn, browser, thư mục report, mẫu ID test case |
| [templates/automation-design.md](templates/automation-design.md) | `features/<feature>/automation_design.md` | File làm việc của một feature, gồm các mục §1–§8 |

Script (Node ≥ 18, chạy từ thư mục gốc của dự án):

- `node <skill>/scripts/run-browsers.mjs --config automation.config.json <feature|all> [--browsers chromium,firefox] [--reuse]` — mỗi cặp feature × browser một lần chạy, mỗi lần có HTML report và `results.json` riêng trong `<reportsDir>/<feature>/<browser>/`. Mỗi lần chạy khởi động server SUT mới, trừ khi có `--reuse`.
- `node <skill>/scripts/summarize-results.mjs --config automation.config.json [--markdown]` — số liệu theo từng lần chạy và từng test case, lấy từ các file `results.json`.

Trước T1, kiểm tra môi trường: một smoke spec mở mọi frontend phải pass trên mọi browser (`npx playwright install` + các system dependency cho WebKit trên Linux).

## Các bước

Gate trước mỗi bước: bước trước đã được commit (`git status --short`). Nếu chưa, đưa lệnh commit rồi dừng.

### T1 Chọn test case → design §1

Mỗi test case đã thiết kế của feature là một dòng: `TC ID | Technique | Partition / boundary | Input | Expected (quoted from the TC) | Automate? | Reason if not | Data row`.

- Tự động hóa ít nhất bằng mức tối thiểu của dự án, trộn các case hợp lệ, không hợp lệ và biên. Ưu tiên các TC có kết quả mong đợi quan sát được trên UI hoặc trong response mà UI nhận được.
- `Automate? = No` cần lý do cụ thể: cần người thật đánh giá (câu chữ có "thân thiện" không), cần hệ thống bên ngoài (hộp thư e-mail thật), phải chờ thời gian thật (hết hạn sau 15 phút) mà test không có đồng hồ để điều khiển, hoặc trùng với một dòng đã tự động hóa (cùng phân hoạch, cùng oracle).
- TC mà UI không đi tới được nhưng API thì được là `Yes (API)`: nó được tự động hóa qua `request`, và file design ghi rõ điều đó.
- Đánh dấu `(proposed)` cho mọi "No"; tester xác nhận.

### T2 Locator và page object → design §2, `pages/`

1. Khám phá UI đang chạy, không đọc source: Playwright codegen, `npx playwright test --ui`, hoặc `page.ariaSnapshot()` / accessibility snapshot của từng màn hình.
2. Kiểm kê theo từng màn hình: `Element | Locator | Why this locator`. Thứ tự ưu tiên [PW Locators]: `getByRole(role, { name })` → `getByLabel` → `getByPlaceholder` → `getByText` → `getByTestId` → CSS trên một thuộc tính ổn định. Không bao giờ dùng XPath theo vị trí, `nth-child`, tên class được sinh tự động, hoặc text thay đổi theo dữ liệu.
3. Phần tử không có accessible name buộc phải dùng locator dự phòng (fallback): ghi nhận nó là một phát hiện (accessibility / testability), không phải lý do để dùng XPath.
4. Mỗi màn hình một page object [POM]: locator là các field readonly, thao tác của người dùng là các method (`requestOtp(email)`, `resetPassword(otp, pw, confirm)`). **Không có assertion trong page object**; assertion nằm ở spec.

### T3 Dữ liệu test → design §3, `data/<feature>/*.json|csv`

- Mỗi TC được tự động hóa là một dòng: `id`, `technique`, `title`, các input, kết quả mong đợi (`kind`: `success | error | blocked`, message / URL / giá trị mong đợi trích từ test basis) và `source` (ID yêu cầu).
- **Không có dữ liệu test trong spec** (không có mảng hay object chứa case viết inline): spec chỉ đọc file.
- Dữ liệu mà app lưu lại (tài khoản, đơn hàng, sản phẩm) không được trùng giữa các lần chạy: sinh giá trị duy nhất từ dòng dữ liệu (`reset+{id}+{runStamp}@test.local`) hoặc dựa vào việc reset database trước mỗi lần chạy, và ghi rõ dùng cách nào.
- Giá trị mong đợi mà test basis không nêu là mục `<CONFIRM>`, không bao giờ là giá trị chép từ app hiện tại.

### T4 Sinh spec → `tests/<feature>/*.spec.ts`, design §4

AI sinh spec từ §1–§3, mỗi file spec một prompt. Code được sinh ra phải:

- Lặp qua file dữ liệu: `` for (const row of rows) test(`${row.id} – ${row.title}`, …) ``. Tiêu đề bắt đầu bằng TC ID (script tổng kết đọc nó).
- Dùng **web-first assertion** (`await expect(locator).toHaveText(…)`), loại assertion tự chờ; không `waitForTimeout`, không `if` theo trạng thái trang, không `try/catch` bao quanh assertion.
- Dùng ít nhất số **assertion pattern khác nhau** tối thiểu của dự án, mỗi pattern được chọn theo điều mà TC kiểm tra, ví dụ:

| Pattern | Kiểm tra | Ví dụ |
| --- | --- | --- |
| URL / navigation | luồng đã chuyển đến đúng trang | `await expect(page).toHaveURL(/\/login$/)` |
| Visible message text | đúng nguyên văn message lỗi / thành công | `await expect(alert).toHaveText(row.expected.message)` |
| Element state | giá trị field, enabled / disabled, số lượng | `toHaveValue`, `toBeDisabled`, `toHaveCount` |
| Negative assertion | một điều không được xảy ra | `await expect(successBanner).not.toBeVisible()` |
| Response | status và body mà UI nhận được | `const res = await page.waitForResponse(…); expect(res.status()).toBe(400)` |
| Persisted outcome | thay đổi thực sự đã được lưu (đăng nhập lại, reload, đọc qua API) | `expect(await api.get(...)).toMatchObject(…)` |
| Soft assertions | nhiều field của cùng một kết quả | `expect.soft(...)` |

- Giữ các test độc lập: mỗi test tự dựng trạng thái của mình (`beforeEach`, fixture, API helper); không test nào phụ thuộc vào thứ tự của test khác.
- Ghi vào design §4 mỗi test dùng pattern nào (`TC ID | Patterns`).

Không sửa gì ở T4: code thô do AI sinh ra là bằng chứng để T5 review.

### T5 Review và sửa → spec, design §5

1. Chạy trên một browser: `npx playwright test tests/<feature> --project=chromium`, rồi `--repeat-each=3` cho các test pass (test flaky lộ ra qua kết quả khác nhau giữa các lần).
2. Cùng tester review từng spec theo checklist sau:

| Nhóm | Cần tìm |
| --- | --- |
| Fragile selector | XPath, CSS class, `nth()`, text phụ thuộc dữ liệu, locator bị hỏng ở kích thước màn hình khác |
| Weak assertion | `toBeVisible()` trên một container chung chung, `toBeTruthy()` trên locator, không có assertion sau thao tác, chỉ kiểm URL trong khi message mới là điều quan trọng |
| Wrong oracle | giá trị mong đợi chép từ app hiện tại thay vì từ test basis; assertion bị đảo ngược để pass |
| Missing edge case | một dòng T1 chưa được tự động hóa, một giá trị biên bị thiếu trong file dữ liệu |
| Flaky wait | `waitForTimeout`, `networkidle` trên trang có polling, thao tác trước khi trang sẵn sàng |
| Hidden dependency | dùng chung tài khoản / dữ liệu giữa các test, phụ thuộc thứ tự, dữ liệu còn sót từ lần chạy trước |
| Hard-coded data | input nằm trong spec thay vì trong file dữ liệu |

3. Sửa, chạy lại, commit. Phần sửa của chính tester là các commit riêng.
4. Mỗi chỗ sửa ghi một dòng trong design §5: `# | Spec › test | What the AI got wrong or missed | Category | Fix (commit) | Why the AI missed it | Cause type`. Các cause type (loại nguyên nhân; tester quyết định, agent đề xuất):
   - **Prompt**: prompt không cung cấp thông tin (không có câu yêu cầu cho message, không có tài khoản seed).
   - **Model**: một xu hướng của model (thích CSS selector từ code nó từng thấy, assert sự hiển thị thay vì nội dung, bịa ra message nghe hợp lý).
   - **Feature**: chỉ thấy được khi app chạy (OTP sinh theo từng request, toast biến mất sau 3 s, trang không bao giờ đạt network idle).
5. Lỗi do sản phẩm gây ra, không phải do script, thì không sửa: nó chuyển sang T7 với assertion giữ nguyên.

### T6 Chạy trên nhiều browser → design §6

1. Mỗi browser là một lần chạy riêng với HTML report riêng (`run-browsers.mjs`). Kiểm tra tiêu đề report có dòng danh tính của dự án và timestamp ISO.
2. Test chỉ fail trên một browser: rerun (chạy lại) test đó trên browser đó. Cùng kết quả → khác biệt giữa các browser, cần phân loại ở T7 (timing của script, hành vi của engine, hoặc lỗi cross-browser thật). Kết quả khác → flaky: sửa lệnh chờ (các nhóm ở T5), không bao giờ thêm retry để che nó.
3. Lần chạy chính thức: khi spec đã đóng băng (đã commit), reset dữ liệu, chạy mọi browser bằng một lệnh, commit report nguyên trạng. Ghi bảng các lần chạy: `Feature | Browser | Report | Started (ISO) | Tests | Passed | Failed | Flaky`.

### T7 Phân loại lỗi → design §6, §8

Với mỗi test fail trong lần chạy chính thức:

| Verdict | Bằng chứng cần có | Tiếp theo |
| --- | --- | --- |
| Product defect (lỗi sản phẩm) | Giá trị mong đợi của assertion được trích từ [REQ] / [TD]; lỗi tái hiện khi chạy lại; screenshot cho thấy hành vi sai | automation-bug-reporting |
| Script defect (lỗi script) | Giá trị mong đợi hoặc locator bị sai | Quay lại T5 (sửa, chạy lại) |
| Environment (môi trường) | Server chết, port bị chiếm, dữ liệu còn sót từ lần chạy khác | Sửa môi trường, chạy lại |

Đánh dấu `(proposed)`; tester xác nhận. Lỗi sản phẩm giữ nguyên assertion đang fail; test có thể kèm annotation link tới bug (`test.info().annotations.push({ type: 'issue', description: '<link>' })`).

### T8 Tổng kết → design §7, §8

1. Chạy `summarize-results.mjs --markdown` và dán các bảng của nó vào design §6 (không đếm tay).
2. §7 Không tự động hóa: mọi dòng T1 có `Automate? = No`, lý do, và cách nó được kiểm thử thay vào đó (thủ công ở vòng trước, hoặc không kiểm thử).
3. §8 Lỗi và bug: `TC ID | Browsers failing | Verdict | Bug / issue`.

## Mọi câu trả lời có đúng dạng này

1. Bước và gate, một dòng.
2. Kết quả của bước: bảng đã ghi vào file design, hoặc spec / output của lần chạy.
3. **AI self-review** (AI tự review): sửa những gì sửa được trước, rồi chấm P1–P6 của [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md) và bảng của bước trong [review-rubric.vi.md](review-rubric.vi.md) theo dạng `# | Score (2/1/0/N/A) | Evidence | Action`, và kết thúc bằng `Gate: passed` hoặc `Gate: blocked by <#>`.
4. **Decisions needed** (cần quyết định): đánh số, mỗi mục 2–4 gạch đầu dòng — vấn đề, vì sao người dùng quyết định, các lựa chọn kèm khuyến nghị.
5. **Suggested commit** (commit đề xuất) và **Next step** (bước tiếp theo, kèm prompt của bước đó). Rồi dừng.

## Commit và log sử dụng AI

Theo git-commit-conventions. Mỗi bước và mỗi feature một commit, vd. `test (<feature>): select test cases to automate`, `test (<feature>): add page objects for <screens>`, `test (<feature>): move test data to <file>`, `test (<feature>): generate data-driven specs`, `test (<feature>): fix <what> in <spec>`, `test (<feature>): record multi-browser runs`. Mọi commit thay đổi spec đều là bằng chứng của công việc; không squash chúng.

Nếu dự án có AI audit log hoặc prompt log, thêm mục tương ứng trong cùng lượt.

## Tính trung thực

| Lý do bào chữa | Thực tế |
|--------|---------|
| "Sinh cả bộ test trong một prompt cho nhanh" | Mỗi prompt một bước là bằng chứng người dùng đã dẫn dắt AI; một prompt cho ra bộ test không ai review. |
| "Assertion fail rồi, nới nó thành `toBeVisible()`" | Assertion fail với oracle được trích dẫn là một lỗi đã tìm thấy. Nới lỏng nó là che giấu bug. |
| "Lấy message app đang hiển thị làm giá trị mong đợi" | App có thể sai. Giá trị mong đợi lấy từ yêu cầu hoặc test case. |
| "Thêm `retries: 2`, giờ chạy xanh rồi" | Retry che giấu flaky. Hãy sửa lệnh chờ, hoặc báo test đó là flaky. |
| "`waitForTimeout(2000)` là hết lỗi" | Nó làm test chậm mà vẫn flaky. Hãy chờ đúng trạng thái cần thiết bằng web-first assertion. |
| "Chép kết quả Chromium sang WebKit, cùng code mà" | Mỗi browser là một lần chạy thật với report riêng. |
| "Tạo lại report với tiêu đề đẹp hơn" | Report do công cụ tạo trên máy của tester và được commit nguyên trạng. |
| "Lỗi của AI rõ rồi: nó quên" | Hãy chỉ rõ cái gì bị thiếu: thông tin trong prompt, một xu hướng của model, hay một hành vi chỉ xuất hiện khi chạy. |
