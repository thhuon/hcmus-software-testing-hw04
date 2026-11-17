# Báo cáo bug từ kiểm thử tự động

*Bản tiếng Việt để đọc và review; bản agent dùng là [SKILL.md](SKILL.md).*

**Khi nào dùng:** Khi một test tự động fail vì lỗi của sản phẩm (đã xác nhận ở bước phân loại lỗi – failure triage) và cần báo cáo lỗi đó — kiểm tra xem issue tracker (nơi quản lý issue) hoặc một vòng test thủ công trước đó đã có bug này chưa, thêm bằng chứng từ automation thành comment trên issue đã có (kể cả khi hành vi nay khác với báo cáo trước), hoặc viết mục bug report mới và GitHub issue mới kèm screenshot từ lần chạy bị fail.

**Chủ đề:** Báo cáo lỗi (defect) cho test tự động, khi tracker có thể đã có bug từ các vòng test (thủ công) trước. **Nguồn:** [REQ], [TRACKER]; giải thích các mã ở `../SOURCES.md`. Đầu vào: kết quả triage ở bước T7 của skill test-automation.

## Tổng quan

Test tự động thường tìm lại một lỗi mà vòng test thủ công đã báo. Mở thêm issue thứ hai cho lỗi đó sẽ chia lịch sử ra hai nơi và thổi phồng số lượng bug; còn im lặng thì mất bằng chứng mới (trình duyệt nào, dòng dữ liệu nào, giá trị received của assertion). Skill này đối chiếu mọi lỗi sản phẩm đã xác nhận với tracker trước, rồi hoặc **comment trên issue đã có**, hoặc **mở issue mới**.

**Quy tắc cốt lõi: một lỗi = một mục `BUG-NN` trong bug report + đúng một hành động trên tracker (comment trên issue đã có, hoặc issue mới), trong đó screenshot hiển thị được. Comment và mở issue là việc hướng ra bên ngoài: người dùng xem nội dung và đồng ý trước.**

| Kết quả | Khi nào | Hành động trên tracker |
| --- | --- | --- |
| **Confirmed** | Cùng câu yêu cầu và cùng hành vi sai như một issue đã có | Comment: bằng chứng automation, "still reproduces" (vẫn tái hiện) |
| **Changed** | Cùng câu yêu cầu, nhưng hành vi khác với issue (thông báo khác, chỉ lỗi trên trình duyệt khác, đã sửa với một số input, nay pass) | Comment: điểm khác biệt, kèm bằng chứng |
| **New** | Không issue nào đã có vi phạm cùng câu yêu cầu theo cùng cách | Issue mới theo template của tracker, cộng label của dự án cho vòng này |

Một bug đã báo trước đây mà test của nó **nay pass** cũng là một comment "Changed" (lỗi có thể đã được sửa); nó không có test fail nào ứng với `BUG-NN`, nhưng vẫn giữ dòng của mình trong bug report.

## Bối cảnh dự án (đọc trước)

Lấy các thông tin sau từ hướng dẫn của dự án (CLAUDE.md, README hoặc đề bài):

- Repository chứa issue, README / issue template / label của nó, và tài khoản `gh`.
- (Các) bug report trước đó có issue có thể trùng (file và số issue).
- Từ ngữ hoặc label đánh dấu vòng này (ví dụ một tag của vòng trong comment, một label thêm trên issue mới).
- File bug report, dòng reporter, tài liệu yêu cầu, URL của ứng dụng.
- Quy tắc commit và ghi log sử dụng AI.

**Nếu dự án không quy định cấu trúc thư mục**, dùng `bugs/BUG_REPORT.md` (chép từ [templates/bug-report.md](templates/bug-report.md)) và `bugs/screenshots/`.

Trước hành động đầu tiên: `gh auth status` (đúng tài khoản đang được dùng), `gh repo view <owner/repo> --json hasIssuesEnabled`, `gh label list --repo <owner/repo>`, và đọc README của tracker + `.github/ISSUE_TEMPLATE/`.

## Bước 1 – đối chiếu và viết mục bug (một prompt cho mỗi lỗi hoặc mỗi nhóm nhỏ)

1. **Đầu vào từ lần chạy**: spec › tên test, dòng dữ liệu, các trình duyệt bị fail, expected và received của assertion (từ HTML report hoặc `results.json`), screenshot lúc fail (`test-results/…/test-failed-1.png`, hoặc file đính kèm trong report). Chép screenshot vào `bugs/screenshots/<TC ID>_<browser>.png`.
2. **Đối chiếu**: tìm trong bug report trước và trên tracker:
   ```bash
   gh issue list --repo <owner/repo> --state all --search "<FR-xx> <keyword> in:title,body" --limit 50
   ```
   Muốn tính là trùng thì phải **cùng câu yêu cầu và cùng hành vi sai**; cùng tính năng là chưa đủ. Liệt kê các ứng viên đã loại và lý do.
3. **Viết BUG-NN** trong bug report (số trống tiếp theo): dòng tổng quan `BUG-NN | Requirement | Title | Found by (spec › test, data row) | Browsers | Outcome | Tracker link | Severity / Priority`, và một khối chi tiết:
   - Trích nguyên văn yêu cầu kèm `file:line`; Expected lấy từ đó; **Actual = giá trị received của assertion và screenshot**, không đoán nguyên nhân.
   - Steps: dòng dữ liệu và các thao tác của test, viết bằng lời thường, để một người tái hiện được mà không cần Playwright.
   - Severity / Priority: nếu trùng, lấy theo issue đã có; nếu là bug mới, đề xuất theo thang của tracker, ghi `(proposed – to be confirmed)`.
4. **Ghi link ngược lại** vào design §8 của test-automation (cột `Bug / issue`).
5. **Hiển thị nội dung sẽ gửi lên tracker** (comment hoặc nội dung issue, xem bên dưới) trong câu trả lời; chưa gửi.

### Comment trên issue đã có

```markdown
**<round tag> – automated re-test** (<Confirmed | Changed>)

- **Script:** `<tests/…/x.spec.ts>` › `<test title>` · data row `<id>` in `<data file>`
- **Browsers:** Chromium <version> ✗ · Firefox <version> ✗ · WebKit <version> ✓
- **Assertion:** expected `<value quoted from the requirement>` — received `<value>`
- **Report:** `<reports/…/index.html>` (run <ISO timestamp>, commit `<hash>`)
- **Difference from this issue:** <none – same behaviour | what differs>
- **Screenshot:** <image>

Reporter: <reporter line>
```

### Issue mới

Làm theo template của tracker từng trường một (heading `### <label>` khi tạo bằng `gh`) và theo định dạng tiêu đề của nó. "Found by" = spec › test và dòng dữ liệu, cộng thêm kỹ thuật của test case tự động nếu tracker gắn label theo kỹ thuật. Thêm label của vòng này khi dự án có quy định.

## Bước 2 – gửi (chỉ sau khi người dùng đồng ý)

1. **Screenshot hiển thị được trên tracker.** `gh` không upload được ảnh. Hoặc người dùng kéo ảnh vào issue / comment trên trình duyệt, hoặc chạy `node scripts/upload_attachments.js <owner/repo> <map.json> <out.json>` (xem phần đầu script: một cửa sổ Chrome mở ra, người dùng đăng nhập, ảnh được thả vào ô comment của issue và đoạn markup `<img … user-attachments …>` trả về được đọc lại; không đăng gì cả) rồi dán markup đó vào nội dung. Key dạng `<issue>#<nhãn>` cho phép upload nhiều ảnh qua cùng một issue; ảnh cho issue mới được upload qua một issue bất kỳ đã có trong repo. Sau đó xóa browser profile.
2. Gửi:
   ```bash
   gh issue comment <n> --repo <owner/repo> --body-file <tmp file>            # Confirmed / Changed
   gh issue create --repo <owner/repo> --title "<title>" --body-file <tmp file> \
     --label "<labels>" --assignee @me                                         # New
   ```
   Chỉ dùng label đã có. Lỗi `502` không cho biết đã đăng hay chưa: liệt kê issue / comment trước khi thử lại. Xóa file nội dung tạm.
3. Ghi URL của comment / số issue vào bug report và design §8.
4. Bằng chứng để nộp bài khi được yêu cầu: screenshot tracker đã lọc theo vòng này (label hoặc search) và screenshot của từng issue đã comment.

## Mọi câu trả lời có đúng cấu trúc này

1. Bug ID, test và kết quả (Confirmed / Changed / New), một dòng.
2. Mục bug (Bước 1) kèm nội dung cho tracker, hoặc các link đã gửi (Bước 2).
3. **To confirm** (cần xác nhận): quyết định trùng hay không (kèm các ứng viên bị loại), severity / priority cho bug mới, "send it?" (gửi chưa?). Mỗi mục 2–4 gạch đầu dòng, kèm khuyến nghị.
4. **AI self-review** (AI tự review): sửa những gì sửa được trước, rồi chấm P1–P6 của [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md) và bảng của bước đó trong [review-rubric.vi.md](review-rubric.vi.md) theo dạng `# | Score (2/1/0/N/A) | Evidence | Action`, và kết thúc bằng `Gate: passed` hoặc `Gate: blocked by <#>`.
5. **Suggested commit** và **Next step**. Rồi dừng.

## Commit và log sử dụng AI

Theo git-commit-conventions:

```bash
git commit -m "docs (bugs): report BUG-NN for <TC ID> (<confirmed #n | changed #n | new>)"
git commit -m "docs (bugs): link BUG-NN to <comment on #n | issue #n>"   # after sending
```

Nếu dự án có AI audit log hoặc prompt log, thêm một mục cho mỗi bug trong cùng lượt.

## Tính trung thực

| Lý do bào chữa | Thực tế |
|--------|---------|
| "Cùng tính năng, gần giống rồi — comment vào issue đó" | Muốn tính là trùng thì phải cùng câu yêu cầu và cùng hành vi sai. Nếu không thì là bug mới. |
| "Cứ mở issue mới, nhiều bug trông đẹp hơn" | Lỗi đã có trên tracker thì comment; issue trùng sẽ bị đóng là duplicate và không được tính. |
| "Test nay pass rồi, không có gì để báo" | Bug đã báo trước đây mà không còn tái hiện là một comment "Changed": nhóm cần biết điều đó. |
| "Giải thích nguyên nhân từ source code" | Actual là giá trị received và screenshot. Nguyên nhân không thuộc báo cáo. |
| "Người dùng đang bận, đăng hết comment luôn" | Comment và issue là công khai và mang tên người dùng; họ duyệt nội dung trước. |
| "Không có screenshot, nội dung assertion là đủ" | Mọi comment và issue đều kèm screenshot từ lần chạy bị fail. |
