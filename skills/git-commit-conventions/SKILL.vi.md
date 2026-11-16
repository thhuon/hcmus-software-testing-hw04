# Quy tắc commit git

*Bản tiếng Việt để đọc và review; bản agent dùng là [SKILL.md](SKILL.md).*

**Khi nào dùng:** Khi sắp commit hoặc push thay đổi — quyết định chia công việc thành các commit, viết commit message, commit một bước đã xong hoặc phần sửa của người dùng, đổi tên file, hoặc push lên remote.

**Chủ đề:** Cách quản lý phiên bản cho công việc làm từng bước có AI hỗ trợ. Lịch sử commit là bằng chứng: mỗi commit cho thấy một bước và ai làm bước đó.

## Tổng quan

**Quy tắc cốt lõi: một commit = một thay đổi có ý nghĩa. Các thay đổi nhỏ cùng mục đích có thể chung một commit; các thay đổi khác mục đích không bao giờ chung commit. Message chỉ nói cái gì đã thay đổi, không gì khác.**

## Repository nào

| Repository | Quy ước |
| --- | --- |
| Repository của mình (repo làm việc của dự án) | Skill này |
| Repository dùng chung có ghi quy ước riêng (repo nhóm, upstream, repo team: README, CONTRIBUTING) | **Quy ước của repository đó**, cho định dạng message, scope và quy tắc push. Định dạng message của skill này không áp dụng ở đó. |

Trước khi commit, kiểm tra mình đang ở repository nào (`git remote -v`). Ở repository dùng chung, đọc phần quy ước của repo trước và làm theo định dạng các commit gần đây (`git log --oneline -10`). Issue và comment trên repository dùng chung không phải commit: chúng theo quy tắc issue của repo đó.

## Chia công việc thành commit

| Tình huống | Commit |
| --- | --- |
| Một bước kỹ thuật do agent làm (vd. test basis, một nhóm item của checklist, một phiên đã ghi lại) | Một commit cho bước đó |
| Người dùng sửa kết quả của agent sau đó | Một commit thứ hai, riêng, chứa phần sửa của người dùng — không bao giờ amend vào commit của agent |
| Nhiều chỗ sửa nhỏ cùng một mục đích (sửa cùng một tên trong năm file, dịch một tài liệu) | Một commit |
| Đổi tên hoặc chuyển file cùng với việc cập nhật các chỗ tham chiếu đi kèm | Một commit, để commit nào cũng để dự án ở trạng thái nhất quán |
| Một artifact mới cùng mục log AI của nó (nếu dự án có log việc dùng AI) | Hai commit: artifact trước, rồi đến mục log |
| Các thay đổi khác mục đích làm trong cùng một phiên | Mỗi mục đích một commit, theo thứ tự phụ thuộc giữa chúng |

Không bao giờ gộp hai bước, hai phiên hay hai người tham gia vào một commit. Không bao giờ trộn refactor với nội dung mới.

## Định dạng message

```
<type> (<scope>): <what changed>
<type>: <what changed>            # when no scope fits
```

| Type | Dùng cho |
| --- | --- |
| `feat` | Khả năng mới: skill, script, template, lệnh mới |
| `fix` | Sửa chỗ sai |
| `refactor` | Tổ chức lại mà không đổi chức năng (đổi tên, gộp, chuyển chỗ, tổng quát hoá) |
| `docs` | Tài liệu, báo cáo, log, kế hoạch |
| `test` | Sản phẩm kiểm thử: test basis, test item, kết quả, phiên, phân tích |
| `chore` | Việc dọn dẹp: quy tắc ignore, khung thư mục, công cụ |

- Scope = khu vực thay đổi: một thư mục task, `skills`, `ai`, `bugs`, `gui`, `usability` …
- Chữ thường, câu mệnh lệnh ("add", "record", "merge"), không dấu chấm cuối, khoảng 50–72 ký tự.
- Mô tả thay đổi, vd. `test (gui): generate form items for the checkout screen`.
- **Không bao giờ** ghi ai soạn hay ai review: không "AI draft", "review", "step 3", "WIP".
- **Không có trailer** ghi công cho AI (không `Co-Authored-By`), trừ khi dự án yêu cầu.

## Trước khi commit

1. `git status --short`: xem từng file đã thay đổi.
2. Stage bằng đường dẫn cụ thể (`git add <paths>`); chỉ dùng `git add -A` khi mọi thay đổi đều thuộc commit này.
3. Không bao giờ commit file mà dự án giữ riêng tư hoặc để ngoài repository: tài liệu môn học bị ignore, dữ liệu cá nhân của người tham gia, thông tin bí mật (secret), kết quả build, file nén. Nếu có một file như vậy xuất hiện, thêm nó vào `.gitignore` trong một commit `chore` riêng.
4. Đổi tên bằng `git mv` để lịch sử đi theo file.
5. `git diff --cached --stat`: tập file đã stage khớp với mục đích ghi trong message.

## Commit và push

- Commit khi một bước đã xong và quy tắc của dự án hoặc người dùng yêu cầu. Nếu người dùng muốn review trước khi commit, đưa ra các lệnh commit đề xuất rồi dừng.
- Chỉ push khi người dùng yêu cầu, hoặc khi dự án quy định mọi thay đổi đã xong đều được push. Push lên remote và nhánh của dự án, rồi kiểm tra `git status -sb` cho thấy nhánh đã đồng bộ.
- Không bao giờ viết lại lịch sử đã push (không force push, không amend commit đã push). Với commit chưa push, chỉ amend để sửa nội dung hoặc message của chính commit đó.

## Dạng câu trả lời khi commit

1. Các commit đã tạo: `hash message`, mỗi dòng một commit.
2. Kết quả push (hoặc "chưa push – đang chờ review").
3. Những gì còn chưa commit, và lý do.
4. **AI tự review**: sửa những gì sửa được trước, rồi chấm [review-rubric.vi.md](review-rubric.vi.md) theo dạng `# | Score (2/1/0/N/A) | Evidence | Action` (quy tắc trong [../review-rubric-shared.vi.md](../review-rubric-shared.vi.md)), và kết thúc bằng `Gate: passed` hoặc `Gate: blocked by <#>`.

## Lỗi thường gặp

| Lỗi | Cách sửa |
|---------|-----|
| "Một commit lớn cho cả phiên" | Tách theo mục đích; lịch sử phải cho thấy từng bước. |
| Amend phần sửa của người dùng vào commit của agent | Commit riêng: phần sửa là bằng chứng của việc review. |
| `git add -A` lấy luôn một file riêng tư | Bỏ stage file đó, thêm vào `.gitignore`, commit việc này riêng. |
| Message ghi "AI draft of step G2" | Ghi cái gì đã thay đổi: "generate form items for the checkout screen". |
| Đổi tên ở một commit, sửa link hỏng ở commit sau | Đổi tên và cập nhật tham chiếu phải đi cùng nhau. |
