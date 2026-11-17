# Appendix A.2 – Prompt Log (HW04-AI)

<!-- Record EVERY prompt sent to EVERY AI tool, in chronological order.
     Timestamp: "HH:MM dd/mm/yyyy" (24h, to the minute) for BOTH the time the prompt was sent AND the time the output was received.
     Paste the prompt and the output verbatim (taken from the session transcript).
     Each question-answer turn in the same chat session = 1 separate entry.
     The `logging-ai-prompts` skill can extract entries automatically from a Claude Code session; check them yourself afterwards. -->

| Student name | Student ID | Exercise |
| --- | --- | --- |
| HỒ THÙY HƯƠNG | 23120046 | HW04-AI |

---

<!-- Sample entry:

## PromptNNN – Claude Code (claude-opus-5-5)

- **Prompt sent:** HH:MM dd/mm/yyyy
- **Output received:** HH:MM dd/mm/yyyy
- **Task / step:** Task 1 – A4 (AI generates the FR-03 spec)
- **Purpose:** …
- **Prompt (verbatim):**

```text
…
```

- **AI output (verbatim):**

```text
…
```
-->

## Prompt001 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 13:43 16/11/2026
- **Output received:** 13:45 16/11/2026
- **Feature / step:** Setup – S1 repo and features
- **Purpose:** Reuse the HW02 features (FR-03, FR-08, FR-15) for HW04 and track the local folder against the personal remote
- **Prompt (verbatim):**

```text
từ yêu cầu cho bài tập tuần 4, dùng lại các feature đã phân công cho bài tập tuần 02
track local theo remote repo này: git@github-home.com:thhuon/hcmus-software-testing-hw04.git
```

- **AI output (verbatim):**

````text
Bash ls -la && cat CLAUDE.md 2>/dev/null | head -100
Bash ls -la week04 week02 week03 && cat .gitconfig && ls .claude .claude/* && for d in week02 week03; do
Bash cd /home/hg/source/software-testing/week04 && cat HW04_Automation_Testing_Original.md; grep -iE "^Ho
Bash cd /home/hg/source/software-testing && ls week02/features week02/features/* | head -50; sed -n 1,60p
Bash cat week02/features/picked-features.md; git ls-remote git@github-home:thhuon/hcmus-software-testing-
Skill
Bash cd /home/hg/.claude/projects/-home-hg-source-software-testing/memory/ && cat english-only-files.md p
Bash cd /home/hg/source/software-testing/week04 && git init -b master -q && git remote add origin git@git
Write /home/hg/source/software-testing/week04/.gitignore
Write /home/hg/source/software-testing/week04/features/selected-features.md
Bash set -e
Bash cat /home/hg/source/software-testing/.claude/skills/git-commit-conventions/review-rubric.md
Repo `week04/` đã được khởi tạo, track `origin/master`, và đã push 3 commit. Bài này dùng lại đúng 3 feature web của HW02.

| Slot | FR | Feature | Frontend | Test case có sẵn từ HW02 (DT + BVA) |
| --- | --- | --- | --- | --- |
| A | FR-03 | Quên & đặt lại mật khẩu (2 bước) | Web `:5173` | 34 + 10 = 44 |
| B | FR-08 | Thanh toán | Web `:5173` | 13 + 4 = 17 |
| C | FR-15 | Quản lý sản phẩm (CRUD) | Admin `:5174` | 27 + 9 = 36 |

- FR-10 (Pool D, mobile) bị bỏ vì đề HW04 §5 không dùng feature mobile.
- Feature nào cũng có ít nhất 12 test case từ HW02, đủ mức tối thiểu 12 script/feature của Task 1.
- Phần ghi chép nằm ở [features/selected-features.md](week04/features/selected-features.md).

**Remote:** `git@github-home.com:…` không resolve được (`Could not resolve hostname`). Vì vậy mình dùng alias SSH `github-home` trong `~/.ssh/config`, giống HW02/HW03: `git@github-home:thhuon/hcmus-software-testing-hw04.git`. Repo trên GitHub lúc đầu còn trống.

**Commits** (đã push, `master...origin/master` đồng bộ):
```
9389919 chore: add ignore rules for archives, videos, SUT and Playwright output
b86e28d docs: add the HW04 automation testing brief
22327fd docs (features): reuse the three HW02 web features for automation
```

**Chưa commit:**
- `HW04_Automation_Testing_Vietnamese.pdf` xuất hiện trong lúc mình làm, chắc là bạn vừa thêm. Mình chưa đụng vào; bạn cho biết có muốn đưa nó vào repo không.
- Chưa tạo `AI-02_AI_Audit_Report.md` cho HW04, nên chưa có dòng AI-02 cho file chọn feature. Mình sẽ thêm khi dựng các form AI cho HW04.

**AI self-review (git-commit-conventions):**

| # | Score | Evidence | Action |
| --- | --- | --- | --- |
| 1 | 2 | Mỗi commit chỉ có 1 mục đích (ignore / đề bài / chọn feature) | – |
| 2 | N/A | Chưa có chỉnh sửa nào của SV | – |
| 3 | 2 | `type (scope): …`, chữ thường, dạng mệnh lệnh, dưới 72 ký tự | – |
| 4 | 2 | Không có nhãn kiểu "AI draft", không có `Co-Authored-By` | – |
| 5 | 2 | Stage từng path cụ thể; file PDF không bị stage | – |
| 6 | 2 | Không có rename hay link hỏng | – |
| 7 | 2 | Push sau mỗi commit; `git status -sb` đồng bộ | – |
| 8 | 2 | Không rewrite history | – |
| 9 | 2 | Đã liệt kê commits, kết quả push, file chưa commit | – |

Gate: passed
````

- **Used in:** `features/selected-features.md`, git remote `origin` (AI-02 Artifact #1)

---

## Prompt002 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 13:49 16/11/2026
- **Output received:** 13:51 16/11/2026
- **Feature / step:** Setup – work plan
- **Purpose:** Order the HW04 work for the least time, including when to record the two videos
- **Prompt (verbatim):**

```text
trình bày thứ tự các việc cần làm, ko phải theo thứ tự các yêu cầu
vì còn có yêu cầu quay video quy trình dùng skill và quy trình chạy automation script thì tôi nên quay các video đó khi nào để ko mất nhiều thời gian
nói chung là một quy trình để hoàn thiện bài tập này một cách tối ưu, ko mất quá nhiều thời gian dư thừa ko cần thiết
```

- **AI output (verbatim):**

```text
Bash gh repo view thhuon/hcmus-software-testing-hw04 --json visibility,hasIssuesEnabled 2>&1; grep -n "Đề
# Lộ trình làm HW04: sắp theo thứ tự làm việc, không theo thứ tự đề

Ý chính: làm feature A và B trước, vừa làm vừa rút ra skill. Đến feature C thì dùng skill đó và quay màn hình luôn trong lúc làm. Từ một lần quay đó cắt ra cả **video skill** (10đ) và **video demo Task 2** (15đ). Như vậy feature C, video skill và video demo xong trong cùng một buổi, không phải làm lại.

## Giai đoạn 0 – Chuẩn bị (≈ 1 giờ, chưa quay)

1. **Dựng SUT**: clone `eshop-sut` vào `week04/` (đã có trong `.gitignore`), chạy backend `:3000`, web `:5173`, admin `:5174`. Tìm cách reset DB về seed: test data-driven phải chạy lặp lại được, không phụ thuộc lần chạy trước.
2. **Khung Playwright**: cài 3 trình duyệt Chromium, Firefox, WebKit.
   - Kiểm tra ngay xem WebKit có chạy được trên máy Linux này không. Nếu không, đổi sang Chrome / Edge / Firefox.
   - Phát hiện lỗi này muộn sẽ phải chạy lại hết.
3. **Config báo cáo, làm một lần**:
   - Báo cáo HTML hiện `Run by: 23120046` kèm timestamp ISO (yêu cầu ở §11 của đề).
   - Một lệnh npm chạy một feature trên 3 trình duyệt và ra 3 báo cáo riêng. Cả bài là 9 lần chạy.
4. **Hồ sơ dự án**:
   - `CLAUDE.md` cho HW04 giống HW03, chứa MSSV, URL, thư mục, quy tắc commit và AI-02.
   - Chép AI-03 và AI-05 từ HW03 vì gần như không đổi.
   - Tạo khung AI-02 và `prompt_log.md`.

## Giai đoạn 1 – Feature A FR-03 (≈ 2,5 giờ, chưa quay)

Làm từng bước với AI. Mỗi bước là 1 prompt và 1 commit:

1. Chọn ≥ 12 test case từ HW02 (đang có 44). Đánh dấu TC nào không tự động hóa được và lý do.
2. Cho AI khảo sát UI và lấy selector (page object).
3. Tạo file dữ liệu `.json` hoặc `.csv`.
4. AI sinh file `.spec`.
5. Chạy trên Chromium, rồi bạn review và sửa: selector dễ gãy, assertion yếu, wait gây flaky…
   - **Ghi ngay bảng "AI sai gì / vì sao" khi sửa.** Phần này sau dùng thẳng cho report và AI Critique.
6. Chạy cả 3 trình duyệt.
7. Với test fail do bug thật: đối chiếu danh sách bug FR-03 của HW02 (11 bug), dùng lại mô tả cũ.
8. **Viết skill tự động hóa** (generic, đúng quy ước skill của bạn) từ chính các bước vừa làm.

## Giai đoạn 2 – Feature B FR-08 (≈ 1,5 giờ, chưa quay)

- Làm lại các bước trên nhưng **dùng skill**. Chỗ nào skill vướng thì sửa skill ngay.
- Đây là buổi "tập dượt" để skill ổn định trước khi quay.
- FR-08 chỉ có 17 TC ở HW02 nên đủ 12 nhưng không dư. Cần chọn kỹ.

## Giai đoạn 3 – Feature C FR-15, quay video (≈ 2 giờ)

- **Đầu buổi quay**: mở terminal chạy `whoami` và `hostname`, giữ trên màn hình vài giây.
- **Quay cả quá trình dùng skill** từ chọn TC → sinh script → review/sửa → chạy 3 trình duyệt → mở báo cáo HTML. Các khoảng chờ AI sinh code sẽ cắt bỏ khi dựng.
- **Lý do chọn FR-15 để quay**:
  - Có biên rõ: tên 254/255/256 ký tự, giá −1/0/0,01.
  - Hợp với data-driven, nhìn là hiểu.
  - Trang admin chạy ổn định.
- **Lời thoại**: đề §11 bắt buộc **giọng thật của bạn**, nên lần này không dùng TTS như video seminar. Có hai cách:
  - Nói trực tiếp khi quay.
  - Quay im lặng rồi thu giọng đè lên sau. Cách này nhanh hơn vì không phải quay lại khi nói vấp.
- **Dựng từ cùng một bản quay**:
  - **Video skill**: toàn bộ quy trình.
  - **Video demo Task 2** (≥ 5 phút): đoạn chạy 3 trình duyệt, đoạn báo cáo HTML và đoạn bạn kể về **một lỗi đã sửa** trong script AI sinh ra.
  - Lỗi đó là thật vì xảy ra ngay trong buổi quay. Nếu buổi đó AI không sai chỗ nào, kể lại một lỗi đã sửa ở feature A hoặc B và chiếu diff commit.

## Giai đoạn 4 – Chạy lần cuối và bug (≈ 1 giờ)

1. Khi script đã ổn định: reset DB, chạy **một lệnh ra đủ 9 báo cáo**, đưa vào `reports/`.
2. Gom bug theo feature: chụp ảnh, ghi vào `bugs/BUG_REPORT.md`, tạo issue một lượt, chụp ảnh trang Issues.

## Giai đoạn 5 – Tài liệu và nộp bài (≈ 1,5 giờ)

Các tài liệu cần làm:
- Report: báo cáo automation và phần review/gap analysis, ghép từ các bảng đã ghi ở giai đoạn 1–3.
- AI Critique 200–300 từ.
- `prompt_log`, làm bằng skill logging-ai-prompts.
- Cộng tổng AI-02.
- README: bảng tự đánh giá, test summary, link video.
- `git_log.txt`, các file PDF, file zip.

## Những việc làm ngay để không phải làm lại

- Ghi dòng AI-02 cùng lượt với mỗi artifact. Chạy `prompt_log` một lần cuối mỗi buổi, không để dồn tới cuối bài.
- Commit sau mỗi bước sửa file `.spec`. 3 feature × khoảng 4 commit đã vượt mức tối thiểu 8 commit sửa `.spec` của §12, không cần tạo commit thừa.
- Không thiết kế lại test case. Dùng TC và bug của HW02, chỉ ghi lý do chọn và lý do loại.

## Cần bạn quyết định

1. **Repo đang PRIVATE**: §12 yêu cầu repo public.
   - Đổi sang public là thao tác công khai ra ngoài, nên bạn tự quyết.
   - Đề xuất: đổi sau khi xong giai đoạn 0, khi đã chắc không còn file riêng tư (đề bài, slide) trong repo.
2. **Nơi tạo issue bug**: đề ghi "your GitHub Issues page". Có hai lựa chọn:
   - Repo HW04 của bạn.
   - Một repo nhóm như HW02/HW03.
   - Đề xuất: hỏi nhóm trước. Nếu nhóm không lập repo chung thì dùng repo HW04, và dẫn link issue HW02 khi trùng bug.
3. **Một bản quay cắt thành hai video**:
   - Đề không cấm dùng chung footage. Hai video vẫn có nội dung và trọng tâm khác nhau.
   - Đề xuất: làm như vậy. Nếu muốn an toàn tuyệt đối thì quay riêng đoạn chạy cho Task 2, mất thêm khoảng 30 phút.

Bạn có muốn mình lưu lộ trình này thành `week04/PLAN.md` (checklist như HW03) rồi commit không?
```

- **Used in:** `PLAN.md` (AI-02 Artifact #2)

---

## Prompt003 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 23:37 16/11/2026
- **Output received:** 23:49 16/11/2026
- **Feature / step:** Setup – SUT, tools, browsers, plan commits
- **Purpose:** Copy the SUT from the seminar repo, install Playwright and the browsers, check the group repo links, commit PLAN.md and every setup step
- **Prompt (verbatim):**

```text
- đã có eshop bên trong folder seminar, bạn có thể copy qua ko cần clone lại mất thời gian chờ
- thiết lập sẵn môi trường các tool, trình duyệt cần thiết cho bài tập này
- tạo issue trên repo cá nhân 
- trong các bài tập trước có khai báo đường link repo của nhóm ko
- tạo thành file PLAN.md và commit lên remote, kể cả các bước setup cũng commit từng bước
```

- **AI output (verbatim):**

````text
Bash ls seminar seminar/*/ | head -40; find seminar -maxdepth 3 -name "server.js" -path "*backend*" 2>/de
Bash cd /home/hg/source/software-testing/seminar/eshop-security-t09-group05/eshop-sut && ls -la && git -C
Bash cd /home/hg/source/software-testing/seminar/eshop-security-t09-group05/eshop-sut && git ls-remote ht
Bash sed -n 1,20p backend/database.js; sed -n 75,90p backend/database.js; git diff --stat
Bash cd /home/hg/source/software-testing && grep -n "initDatabase" seminar/eshop-security-t09-group05/esh
Bash grep -n "initDatabase\|module.exports" seminar/eshop-security-t09-group05/eshop-sut/backend/*.js | h
Bash cd /home/hg/source/software-testing/week04 && npm view @playwright/test time --json 2>/dev/null | gr
Bash find ~/.npm/_npx -maxdepth 4 -name "package.json" -path "*playwright-core/package.json" 2>/dev/null
Pinning Playwright 1.64.1 (a month-old patch release) and installing Chromium, Firefox and WebKit.
Bash npm init -y >/dev/null && npm install -D -E @playwright/test@1.64.1 2>&1 | tail -3 && npx playwright
Bash npx playwright install chromium firefox webkit 2>&1 | grep -v "^\s*at " | head -30; ls ~/.cache/ms-p
All three browsers are downloaded. WebKit still needs 3 system libraries, so I'm checking whether I can install them without a password.
Bash sudo -n true 2>&1; dpkg -l libevent-2.1-7t64 libavif16 libmanette-0.2-0 2>&1 | tail -3; apt-cache po
WebKit needs `sudo`, which I can't run. While waiting for you, I'm writing the Playwright config and a smoke test, and checking them on Chromium and Firefox.
Bash grep -n "listen\|PORT" eshop-sut/backend/server.js | head; cat eshop-sut/frontend-web/vite.config.js
Bash cd /home/hg/source/software-testing/week03 && sed -n 1,40p AI-02_AI_Audit_Report.md | cut -c1-400; g
Bash sed -n 41,48p AI-02_AI_Audit_Report.md | cut -c1-900; sed -n 100,200p AI-02_AI_Audit_Report.md | cut
Bash sed -n 48,62p AI-02_AI_Audit_Report.md | cut -c1-700; wc -l AI-03_AI_Disclosure_Form.md AI-05_AI_Pri
Bash cd /home/hg/source/software-testing && head -12 week02/PLAN.md; sed -n 1,12p week03/AI-05_AI_Privacy
Writing `PLAN.md` (in Vietnamese, like the HW02/HW03 plans), then the setup files, one commit per step.
Write /home/hg/source/software-testing/week04/PLAN.md
Bash cd /home/hg/source/software-testing/week04 && grep -c "" ../week02/bugs/BUG_REPORT.md >/dev/null; gr
Edit /home/hg/source/software-testing/week04/PLAN.md
Bash git status --short && git add PLAN.md && git commit -qm "docs: add the work plan ordered by executio
PLAN.md is pushed. Next is setup step S2: the Playwright package.
Write /home/hg/source/software-testing/week04/package.json
Bash npm install --silent && git add package.json package-lock.json && git commit -qm "chore (setup): add
Bash grep -n "title?\|outputFolder?\|open?:\|noSnippets\|host?" node_modules/playwright/types/test.d.ts |
Bash grep -n "app.get('/api" eshop-sut/backend/server.js | head -5; ss -ltnp 2>/dev/null | grep -E ":(300
Bash grep -nE "app\.(get|use)\(" eshop-sut/backend/server.js | head -8
Write /home/hg/source/software-testing/week04/playwright.config.ts
Write /home/hg/source/software-testing/week04/tests/smoke.spec.ts
Bash FRESH_SUT=1 npx playwright test tests/smoke.spec.ts --project=chromium --project=firefox 2>&1 | tail
Bash head -60 test-results/smoke-Environment-smoke-ch-48621-eb-renders-the-product-list-firefox/error-con
The environment runs. One check was wrong on my side: the web shows prices as "VND", not "₫". I'm fixing the smoke test to check the "Danh sách sản phẩm" heading instead.
Edit /home/hg/source/software-testing/week04/tests/smoke.spec.ts
Bash rm -rf test-results playwright-report && FRESH_SUT=1 npx playwright test tests/smoke.spec.ts --proje
Bash cat > /tmp/claude-1000/-home-hg-source-software-testing/fc5a277e-e51e-4a5c-b0af-eca264cbfd6b/scratch
Reports show `HW04 · Run by: 23120046 · <ISO>` in both the tab title and the page header. Now committing the config, then writing the 3-browser run script.
Bash git add playwright.config.ts && git commit -qm "chore (setup): configure three browsers, SUT servers
Write /home/hg/source/software-testing/week04/scripts/run-feature.mjs
Bash node -e '
The run script works: each browser gets its own report, and each report title has the feature, the browser, `Run by: 23120046` and its own timestamp. Committing S5 and S6 separately.
Bash sed -i '/"smoke": /d' package.json && git add package.json scripts/run-feature.mjs && git commit -qm
Next, S7 `CLAUDE.md`. First checking how HW03 linked its skills into `.claude/skills`, so HW04 can do the same.
Bash ls -la /home/hg/source/software-testing/.claude/skills/; sed -n 80,200p /home/hg/source/software-tes
Write /home/hg/source/software-testing/week04/CLAUDE.md
Bash ls ../week02/features/fB-pool-B/ ../week02/features/fC-pool-C/ && git add CLAUDE.md && git commit -q
S7 is pushed. Next, S8: the AI form skeletons.
Bash cd /home/hg/source/software-testing/week03 && sed -n 12,50p AI-05_AI_Privacy_Checklist.md
Bash f=~/.claude/projects/-home-hg-source-software-testing/fc5a277e-e51e-4a5c-b0af-eca264cbfd6b.jsonl; ls
Bash cd /home/hg/source/software-testing && sed -n 1,12p week03/AI-02_AI_Audit_Report.md > /dev/null; mkd
Now the AI-02 skeleton with rows for the three artifacts made so far, and the `prompt_log.md` skeleton.
Bash cd /home/hg/source/software-testing && sed -n 1,40p week03/AI-02_AI_Audit_Report.md | sed -e 's/HW03
Bash cd /home/hg/source/software-testing/week04 && cat >> AI-02_AI_Audit_Report.md <<'EOF'
Bash n=$(grep -n "^## Prompt001" ../week03/prompt_log.md | cut -d: -f1) && head -n $((n-1)) ../week03/pro
Bash sed -i 's/check them yourself afterwards\.$/check them yourself afterwards. -->/' prompt_log.md && s
Last step: ticking the finished setup steps in PLAN.md (S3 and S9 are left for you).
Bash sed -i -E 's/^- \[ \] \*\*S(2|4|5|6|7|8)\./- [x] **S\1./' PLAN.md && sed -i 's|^- \[x\] \*\*S6. Smok
Môi trường đã sẵn sàng trên Chromium và Firefox. **WebKit chưa chạy được**: còn thiếu 3 thư viện hệ thống, cài phải có sudo nên mình không tự làm được. Các bước setup đều đã commit riêng và push, `master` khớp với `origin/master`.

**Repo nhóm ở các bài trước:** có khai báo.
- HW02: `README.md` §2 dẫn link `angquoc/software-testing-2026-HW02-group/issues` (#1–#41).
- HW03: `README.md` và `bugs/BUG_REPORT.md` dẫn link `angquoc/software-testing-2026-HW03-group/issues` (#1–#32).
- HW04: bug sẽ tạo issue trên repo cá nhân `thhuon/hcmus-software-testing-hw04`. Bug nào HW02 đã báo rồi thì issue sẽ ghi `Related angquoc/software-testing-2026-HW02-group#n`. Quy tắc này đã ghi trong `CLAUDE.md` và `PLAN.md`.

**Những gì đã làm:**
- **SUT:** chép `eshop-sut` từ thư mục seminar (có sẵn `node_modules`, cùng commit với upstream), rồi khôi phục file DB mà buổi seminar đã sửa. Backend tự tạo lại và seed DB mỗi lần khởi động, nên muốn reset dữ liệu chỉ cần chạy lại server.
- **Playwright 1.64.1**, đủ Chromium, Firefox, WebKit. Config tự bật cả 3 server và chạy từng test một, vì mọi test dùng chung một DB.
- **Báo cáo HTML:** tiêu đề dạng `HW04 · FR-03 … · firefox · Run by: 23120046 · <ISO timestamp>`. Mình đã mở báo cáo thật để kiểm tra dòng này.
- **Lệnh chạy:**
  - `npm run feature -- fA`: chạy một feature trên 3 trình duyệt, ra 3 báo cáo riêng trong `reports/fA/<browser>/`.
  - `npm run all`: 9 lần chạy chính thức.
- **Smoke test:** đạt 6/6 trên Chromium và Firefox. Lần chạy đầu fail 2 test vì mình đoán web hiện giá bằng "₫", thực tế là "VND"; đã sửa trước khi commit và ghi vào AI-02.
- **Tài liệu:** [PLAN.md](week04/PLAN.md), [CLAUDE.md](week04/CLAUDE.md), khung AI-02 có sẵn 3 dòng audit, AI-05 chép từ HW03 (mục 3 để trống, điền trước khi nộp), khung `prompt_log.md`.

**Commit mới trong lượt này:**
```
4271c85 docs: add the work plan ordered by execution
5da7237 chore (setup): add Playwright 1.64.1 as a pinned dev dependency
a737bfd chore (setup): configure three browsers, SUT servers and the Run by report title
2276eb1 chore (setup): add a script that runs a feature on each browser with its own report
b81f38e test (setup): add a smoke test for the backend, web and admin
3a4f869 docs: add the project profile for the automation skills
e625f1e docs (ai): add the AI-05 privacy checklist and the prompt log skeleton
371e22f docs (ai): add the AI-02 audit report with rows for the setup artifacts
1c2081f docs: mark the finished setup steps in the plan
```

**Việc bạn cần làm:**
1. **S3 – cài thư viện cho WebKit** (cần sudo):
   ```
   sudo apt-get install -y libevent-2.1-7t64 libavif16 libmanette-0.2-0
   ```
   Cài xong báo mình, mình sẽ chạy `npm run smoke -- --project=webkit` để xác nhận.
2. **S9 – chuyển repo sang public:** đề §12 bắt buộc, hiện repo đang PRIVATE. Mình không tự đổi vì đây là thao tác công khai ra ngoài. Lệnh: `gh repo edit thhuon/hcmus-software-testing-hw04 --visibility public --accept-visibility-change-consequences`.
3. **File `HW04_Automation_Testing_Vietnamese.pdf`** vẫn chưa commit. Bạn có muốn đưa vào repo không?
4. **Ngôn ngữ cho các file bài làm** (`features/`, `bugs/`, report):
   - Hiện `CLAUDE.md` mặc định tiếng Anh; `PLAN.md` và các form AI vẫn tiếng Việt.
   - HW03 bạn chọn tiếng Việt trước, dịch sang tiếng Anh lúc nộp.
   - Mình đề xuất viết tiếng Anh ngay từ đầu để khỏi mất thời gian dịch lúc nộp. Bạn muốn cách nào?
5. **Review 3 dòng AI-02** (#1–#3) khi tiện.

**AI self-review (git-commit-conventions):** cả 9 tiêu chí đạt điểm 2. Mỗi commit một mục đích; dòng script `smoke` trong `package.json` chỉ được thêm cùng commit có `smoke.spec.ts`, nên commit nào cũng tự đứng được. Mọi file đều stage theo đường dẫn cụ thể, không có trailer, push sau mỗi commit. Gate: passed
````

- **Used in:** `eshop-sut/` (ignored), `package.json`, `playwright.config.ts`, `tests/smoke.spec.ts`, `PLAN.md` (AI-02 Artifact #2, #3)

---

## Prompt004 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 00:27 17/11/2026
- **Output received:** 00:38 17/11/2026
- **Feature / step:** Setup – WebKit smoke test, skills, bug tracker, submission skeleton
- **Purpose:** Rerun the smoke test after the WebKit libraries, build the HW04 skills, move bug reporting to the HW02 group repo (comment vs new issue), create the submission files
- **Prompt (verbatim):**

```text
tôi đã run xong lệnh sudo tải webkit, hãy tiếp tục chạy smoke test
từ các file tài liệu trên, hãy dựng các skill cần thiết cho bài tập này, tôi sẽ review các skill bạn đã viết
bài tập này dùng lại repo nhóm của bài tập tuần 2, từ cắc issue đã được chạy tay ở bài tập tuần 2 thì tuần này thực hiện theo hướng automation, nếu có gì khác thì comment, nếu phát hiện thêm issue thì tạo issue mới
bên cạnh đó, tạo sẵn các file, folder cần nộp cho bài tập này
```

- **AI output (verbatim):**

````text
Bash FRESH_SUT=1 npm run -s smoke 2>&1 | tail -6
Bash ls test-results/; sed -n '/# Error details/,/^```yaml/p' test-results/*webkit*/error-context.md | he
Bash dpkg -l libevent-2.1-7t64 libavif16 libmanette-0.2-0 2>&1 | grep -E "^(ii|un|rc)|no packages"; grep
Skill
Per your earlier instruction, I'm writing the skills directly without the subagent test runs, and you'll review them. Reading the existing skills now so the new ones follow the same structure.
Bash cd /home/hg/source/software-testing && ls -R week03/skills | head -60; wc -l week03/skills/*/SKILL.m
Bash cd /home/hg/source/software-testing && cat week03/skills/gui-testing/SKILL.md
Bash cd /home/hg/source/software-testing && cat week03/skills/review-rubric-shared.md; cat week03/skills/
Bash cat week02/skills/writing-bug-reports/SKILL.md; ls week02/skills/writing-bug-reports; gh repo view a
Bash gh api repos/angquoc/software-testing-2026-HW02-group/readme --jq .content | base64 -d | head -120;
Bash gh api repos/angquoc/software-testing-2026-HW02-group/readme --jq .content | base64 -d | sed -n 120,
Bash ls materials "AI Templates" "AI Templates"/*; cat week03/skills/SOURCES.md; wc -c week03/skills/gui-
Edit /home/hg/source/software-testing/week04/CLAUDE.md
Bash cd /home/hg/source/software-testing/week04 && grep -n "R2\.\|repo cá nhân" PLAN.md
Bash python3 - <<'EOF'
Now the skills. Starting with the shared files: the rubric rules (copied from HW03) and the source list.
Bash mkdir -p skills && cp ../week03/skills/review-rubric-shared.md skills/ && cat > skills/SOURCES.md <<
Next, the main skill `test-automation`: SKILL.md, then its scripts, templates and rubric.
Write /home/hg/source/software-testing/week04/skills/test-automation/SKILL.md
Bash mkdir -p /home/hg/source/software-testing/week04/skills/test-automation/{templates,scripts}
Write /home/hg/source/software-testing/week04/skills/test-automation/templates/playwright.config.ts
Write /home/hg/source/software-testing/week04/skills/test-automation/templates/automation.config.json
Write /home/hg/source/software-testing/week04/skills/test-automation/scripts/run-browsers.mjs
Write /home/hg/source/software-testing/week04/skills/test-automation/scripts/summarize-results.mjs
Edit /home/hg/source/software-testing/week04/skills/test-automation/scripts/summarize-results.mjs
Write /home/hg/source/software-testing/week04/skills/test-automation/templates/automation-design.md
Bash cat /home/hg/source/software-testing/week03/skills/gui-testing/review-rubric.md | head -30
Write /home/hg/source/software-testing/week04/skills/test-automation/review-rubric.md
Bash cat > /tmp/claude-1000/-home-hg-source-software-testing/fc5a277e-e51e-4a5c-b0af-eca264cbfd6b/scratch
Bash rm -rf tests/fX-tmp /tmp/claude-1000/-home-hg-source-software-testing/fc5a277e-e51e-4a5c-b0af-eca264
Now switching the project to the skill's scripts: add `automation.config.json` and JSON results, and drop the old `scripts/run-feature.mjs`.
Bash cat > automation.config.json <<'EOF'
Bash sed -i 's#^| `scripts/` | Script chạy feature trên 3 trình duyệt |$#| `automation.config.json` | Fea
Bash git add automation.config.json package.json playwright.config.ts CLAUDE.md PLAN.md && git status --s
Next skill: `automation-bug-reporting`. Reading the rest of the HW03 upload script (to reuse for screenshots in comments) and the group's issue template.
Bash cd /home/hg/source/software-testing && sed -n 30,60p week03/skills/gui-bug-reporting/scripts/upload_
Bash mkdir -p /home/hg/source/software-testing/week04/skills/automation-bug-reporting/{scripts,templates}
Write /home/hg/source/software-testing/week04/skills/automation-bug-reporting/SKILL.md
Write /home/hg/source/software-testing/week04/skills/automation-bug-reporting/templates/bug-report.md
Write /home/hg/source/software-testing/week04/skills/automation-bug-reporting/review-rubric.md
Bash cd /home/hg/source/software-testing/week04 && sed -i '1,3s|^// Upload local images as GitHub issue a
Third skill, `recording-test-demo-videos`: a shot list, recording prep and a final check. You record and narrate in your own voice.
Bash mkdir -p /home/hg/source/software-testing/week04/skills/recording-test-demo-videos/templates
Write /home/hg/source/software-testing/week04/skills/recording-test-demo-videos/SKILL.md
Write /home/hg/source/software-testing/week04/skills/recording-test-demo-videos/templates/shot-list.md
Write /home/hg/source/software-testing/week04/skills/recording-test-demo-videos/review-rubric.md
Bash git add skills/recording-test-demo-videos && git commit -qm "feat (skills): add the recording-test-d
Now the skills index (README), then linking the new skills into `.claude/skills` so they can be called.
Write /home/hg/source/software-testing/week04/skills/README.md
Bash git add skills/README.md && git commit -qm "docs (skills): add the index of the automation skills" &
Skills are linked into `.claude/skills`. Now the submission files. Reading the HW03 README/report structure first so the skeletons match.
Bash cd /home/hg/source/software-testing/week03 && sed -n 1,80p README.md; grep -n "^#" HW03_Report.md AI
Writing the submission README and the main report skeleton.
Write /home/hg/source/software-testing/week04/README.md
Write /home/hg/source/software-testing/week04/HW04_Report.md
Bash sed -n 1,16p AI_Critique.md; sed -n 1,40p AI-03_AI_Disclosure_Form.md | cut -c1-200
Bash cd "/home/hg/source/software-testing/AI Templates/md" && wc -l "[AI-03] - FIT@HCMUS - AI Disclosure
Bash cd /home/hg/source/software-testing/week04 && python3 - <<'EOF'
Write /home/hg/source/software-testing/week04/AI_Critique.md
Bash cd /home/hg/source/software-testing/week04/eshop-sut && grep -n "path=" frontend-web/src/App.jsx fro
Bash cd /home/hg/source/software-testing/week04 && grep -rn "path=\|Route" eshop-sut/frontend-admin/src/*
Bash python3 - <<'EOF'
Writing the three automation design files, then the bug report and the shot list skeletons.
Bash sed -i 's/| Count | Designed: 0 ·/| Count | Designed: 44 ·/' features/fA-fr03/automation_design.md &
Bash set -e
Next, the AI-02 rows for this turn's work. Looking up the time of this prompt in the session log.
Bash python3 -I -c '
Bash python3 - <<'EOF'
Updating PLAN.md now that the skills are drafted early, then saving the new bug-tracker rule to memory.
Bash grep -n "A8\|C1–C7\|B1–B7\|D1\.\|S8\." PLAN.md | cut -c1-200; cat /home/hg/.claude/projects/-home-hg
Bash python3 - <<'EOF'
Write /home/hg/.claude/projects/-home-hg-source-software-testing/memory/hw04-bugs-on-hw02-group-repo.md
Bash cd /home/hg/.claude/projects/-home-hg-source-software-testing/memory/ && echo '- [HW04 bugs on HW02
WebKit vẫn chưa chạy được, nên smoke test chưa đạt trên WebKit. Phần còn lại đã xong: đã viết 3 skill để bạn review, chuyển việc báo bug sang repo nhóm HW02, và tạo khung toàn bộ file nộp. Tất cả đã commit riêng từng bước và push (`master` khớp `origin/master`).

## Smoke test: WebKit chưa chạy được

- Kết quả `npm run smoke`: Chromium 3/3 đạt, Firefox 3/3 đạt, WebKit lỗi khi khởi động: *"Host system is missing dependencies"*.
- Mình kiểm tra bằng `dpkg` thì cả 3 gói vẫn chưa được cài. Có thể lệnh sudo đã lỗi giữa chừng hoặc chạy thiếu tên gói.
- Bạn chạy lại lệnh này và xem phần cuối của output:
  ```
  sudo apt-get install -y libevent-2.1-7t64 libavif16 libmanette-0.2-0
  ```
- Cài xong, `npm run smoke -- --project=webkit` sẽ xác nhận được ngay.

## Các skill cần review

Nằm trong `week04/skills/`, đã link vào `.claude/skills`. Mình viết thẳng, không chạy thử bằng subagent (theo quy ước trước đây của bạn). Chỉ có hai script là đã chạy thử trên một bộ test tạm.

| Skill | Nội dung chính |
| --- | --- |
| [test-automation](week04/skills/test-automation/SKILL.md) | 8 bước T1–T8: chọn test case, locator và page object, file dữ liệu, sinh spec data-driven, review và sửa (bảng "AI sai gì / vì sao"), chạy 3 trình duyệt, phân loại lỗi, tổng hợp số liệu. Kèm `run-browsers.mjs`, `summarize-results.mjs`, template và rubric. |
| [automation-bug-reporting](week04/skills/automation-bug-reporting/SKILL.md) | So với issue HW02. Bug cũ vẫn tái hiện y như cũ → bình luận **Confirmed**; bug cũ nhưng hành vi đã khác → bình luận **Changed**; bug chưa có → **issue mới**. Chỉ coi là trùng khi cùng câu yêu cầu và cùng hành vi sai. |
| [recording-test-demo-videos](week04/skills/recording-test-demo-videos/SKILL.md) | Danh sách cảnh, phần chuẩn bị, đối chiếu yêu cầu đề bằng mốc thời gian trong video. Bạn tự quay và nói bằng giọng thật. |

- Thư mục `materials/` không có slide về automation, nên các skill dẫn nguồn từ tài liệu Playwright, ISTQB CTFL v4.0 §6.2 và Page Object của Fowler.
- Dự án giờ chạy bằng script của skill: `npm run feature -- fA`, `npm run all` (9 lần chạy), `npm run summary` (số liệu cho README).

## Repo nhóm HW02

README của repo nhóm đã có sẵn §6 cho HW04, khớp đúng yêu cầu của bạn:
- Bug đã có issue từ HW02 thì bình luận vào issue cũ, ghi rõ "HW04".
- Bug mới thì tạo issue mới, gắn thêm label `hw: HW04` (label này đã có trên repo).

Mình đã cập nhật `CLAUDE.md`, `PLAN.md` và ghi lại quy tắc này vào memory.

## File nộp đã tạo khung

- `README.md`: bảng test summary và bảng tự đánh giá, để trống chờ số liệu.
- `HW04_Report.md`, `AI_Critique.md`, `AI-03_AI_Disclosure_Form.md` (đã điền phần đầu).
- `bugs/BUG_REPORT.md`: có thang severity của nhóm.
- `features/{fA-fr03,fB-fr08,fC-fr15}/automation_design.md`: mỗi file mục §1–§8.
- `demo/shot_list.md`.
- AI-02 thêm các dòng #4–#6 và #S1–#S3, chờ bạn review.

## Cần bạn quyết định

1. **Quy ước commit của nhóm.** README nhóm §6 nói §3 vẫn áp dụng cho HW04, tức commit dạng `[A-FR03][S4] Design …`.
   - Repo HW04 (và repo HW02 của bạn) đang dùng `type (scope): …` theo skill git-commit-conventions.
   - Mình đề xuất giữ cách hiện tại, vì §3 nói về repo cá nhân, không ảnh hưởng repo nhóm, và đổi giữa chừng sẽ làm lịch sử không đồng nhất. Nếu bạn muốn theo đúng §3, từ commit tiếp theo mình sẽ đổi.
2. **Repo HW04 đang PRIVATE.** Đề §12 yêu cầu public. Bạn tự chuyển khi sẵn sàng (lệnh mình đã đưa ở lượt trước).
3. **`HW04_Automation_Testing_Vietnamese.pdf`** vẫn chưa commit. Bạn có muốn đưa vào repo không?

**Bước tiếp theo** (sau khi bạn review skill và cài xong WebKit): **A1 – chọn ≥ 12 test case FR-03 từ HW02** theo bước T1 của test-automation.
````

- **Used in:** `skills/` test-automation, automation-bug-reporting, recording-test-demo-videos; `CLAUDE.md`; `README.md`, `HW04_Report.md`, `AI_Critique.md`, `bugs/BUG_REPORT.md`, `features/*/automation_design.md`, `demo/shot_list.md` (AI-02 Artifact #4, #5, #6, #S1–#S3)

---

## Prompt005 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 01:02 17/11/2026
- **Output received:** 01:25 17/11/2026
- **Feature / step:** Setup – Vietnamese skill copies, WebKit check, commit rules
- **Purpose:** Add a Vietnamese copy of every skill, recheck WebKit, keep git-commit-conventions for personal repos only
- **Prompt (verbatim):**

```text
- mỗi skill tạo thêm 1 bản tiếng việt 
- đã run xong smoke test cho webkit, hãy check lại cho chắc chắn
- skill git commit convention chỉ được dùng cho repo cá nhân, còn repo nhóm vẫn commit như các lần trước
- tôi sẽ chuyển repo sang public sau
```

- **AI output (verbatim):**

```text
Checking WebKit again, then the rest.
Bash dpkg -l libevent-2.1-7t64 libavif16 libmanette-0.2-0 2>&1 | grep -E "^ii" | awk '{print $2, $3}'; cd
WebKit now passes too: 9/9 on 3 browsers. Getting the exact browser versions for the README.
Bash node -e '
Bash python3 - <<'EOF'
WebKit is confirmed. Now copying `git-commit-conventions` into HW04 and adding the scope rule: it applies to the personal repo only; the group repo keeps the convention from its own README.
Bash cp -r ../week03/skills/git-commit-conventions skills/ && ls skills/git-commit-conventions && sed -n
Bash git add skills/git-commit-conventions && git commit -qm "feat (skills): copy the git-commit-conventi
Edit /home/hg/source/software-testing/week04/skills/git-commit-conventions/SKILL.md
Bash cat skills/git-commit-conventions/review-rubric.md | tail -12; cat skills/git-commit-conventions/rev
Bash python3 - <<'EOF'
Committed. Next is the Vietnamese copies. For translation I'm running 4 agents in parallel, one per skill (SKILL.md and rubric). They don't commit; I'll check and commit each one.
Bash cp ../week03/skills/review-rubric-shared.vi.md skills/ && diff <(sed -n 1,5p skills/review-rubric-sh
Agent Translate test-automation skill to Vietnamese
Agent Translate bug-reporting skill to Vietnamese
Agent Translate demo-video skill to Vietnamese
Agent Translate git-commit skill to Vietnamese
While the translations run: pointing the `git-commit-conventions` link at the HW04 copy and updating memory.
Bash cd /home/hg/source/software-testing/.claude/skills && rm git-commit-conventions && ln -s ../../week0
Write /home/hg/.claude/projects/-home-hg-source-software-testing/memory/commit-skill-rules.md
Bash cd /home/hg/.claude/projects/-home-hg-source-software-testing/memory/ && sed -i 's#^- \[Commit rules
Waiting for the 4 translation agents to finish.
ScheduleWakeup
The 4 translation agents are still running. Once they finish I'll check each Vietnamese copy and commit them one by one.
Bash cd /home/hg/source/software-testing/week04 && sed -n 1,30p skills/git-commit-conventions/SKILL.vi.md
The git-commit-conventions copy reads well and keeps the structure. Committing it.
Bash grep -c "^## " skills/git-commit-conventions/SKILL.md skills/git-commit-conventions/SKILL.vi.md && g
Bash cd /home/hg/source/software-testing/week04/skills/recording-test-demo-videos && sed -n 1,22p SKILL.v
One phrase to fix: "danh sách mã nguồn" reads as "source code". Changing it to "mã của các nguồn tham khảo" before committing.
Bash cd /home/hg/source/software-testing/week04 && grep -rn "mã nguồn" skills/*/SKILL.vi.md skills/*/revi
2 of 4 Vietnamese copies are committed (git-commit-conventions, recording-test-demo-videos). Still waiting on test-automation and automation-bug-reporting.
Bash cd /home/hg/source/software-testing/week04/skills && sed -n 9,22p automation-bug-reporting/SKILL.vi.
The translation is good. Aligning the term "con người" with "người dùng", as used in the other files, then committing.
Bash cd /home/hg/source/software-testing/week04 && grep -n "con người" skills/automation-bug-reporting/*.
3 of 4 Vietnamese copies are committed. Only test-automation is left.
Bash cd /home/hg/source/software-testing/week04/skills && grep -n 'for (const row of rows)' test-automati
Fixing in the English SKILL.md the inline code that nests backticks (it renders wrong), then cleaning up wording in the Vietnamese copy before committing.
Bash cd /home/hg/source/software-testing/week04 && python3 - <<'EOF'
Unifying the table-header translation across the 4 Vietnamese copies, then updating the skills README.
Bash grep -n "^| [^|]* | Thực tế |\|^## Tính trung thực\|^## .*Integrity" skills/*/SKILL.vi.md; sed -i -E
Bash git add skills/*/SKILL.vi.md && git commit -qm "docs (skills): use the same Vietnamese terms in the
Bash python3 -I -c '
Bash python3 - <<'EOF'
Xong cả 4 việc, đã commit từng bước và push; `master` khớp với `origin/master`.

**1. WebKit đã chạy được.** 3 thư viện hệ thống đã cài đủ. Smoke test chạy lại sạch đạt **9/9**:

| Trình duyệt | Phiên bản | Kết quả |
| --- | --- | --- |
| Chromium | 156.0.8078.4 | 3/3 |
| Firefox | 157.0 | 3/3 |
| WebKit | 27.2 | 3/3 |

Phiên bản các trình duyệt đã ghi vào `README.md`, `HW04_Report.md` và `PLAN.md` (S3, S6 đã đánh dấu xong).

**2. Bản tiếng Việt của mỗi skill.** Mỗi skill có thêm `SKILL.vi.md` và `review-rubric.vi.md`, cộng thêm `review-rubric-shared.vi.md` chép từ HW03. Bản tiếng Anh vẫn là bản agent dùng; nếu hai bản khác nhau thì theo bản tiếng Anh.
- Có 4 skill có bản dịch: [test-automation](week04/skills/test-automation/SKILL.vi.md), [automation-bug-reporting](week04/skills/automation-bug-reporting/SKILL.vi.md), [recording-test-demo-videos](week04/skills/recording-test-demo-videos/SKILL.vi.md), [git-commit-conventions](week04/skills/git-commit-conventions/SKILL.vi.md).
- 4 subagent dịch song song. Mình đã kiểm tra bằng script là heading, bảng và cách đánh số khớp bản tiếng Anh.
- Mình đã sửa 3 chỗ trong bản dịch:
  - "mã nguồn" dễ bị hiểu là source code, đổi thành "mã của các nguồn tham khảo".
  - "con người" đổi thành "người dùng", cho giống các rubric của HW03.
  - Cột "Excuse" có 3 cách dịch khác nhau, thống nhất thành "Lý do bào chữa".
- Lúc dịch còn lộ ra một lỗi ở bản tiếng Anh: ví dụ code ở bước T4 của test-automation lồng backtick nên hiển thị sai. Đã sửa ở cả hai bản.

**3. Quy ước commit tách theo repo.**
- `git-commit-conventions` đã được chép sang `week04/skills` và thêm mục "Repository nào":
  - Repo cá nhân thì theo skill này.
  - Repo nhóm thì theo quy ước trong README của repo đó (README nhóm §3: `[<phạm vi>][<bước>] Verb …`, ví dụ `[docs] Update feature allocation`).
- `CLAUDE.md` đã ghi quy tắc này. Link trong `.claude/skills` giờ trỏ sang bản HW04, và memory đã cập nhật.

**4. Chuyển repo sang public:** chưa làm, để bạn làm sau. Mục S9 trong `PLAN.md` vẫn để mở để nhắc.

AI-02 có thêm 3 dòng mới, đều chờ bạn review:
- #7: kiểm tra WebKit.
- #S4: phạm vi của quy ước commit.
- #S5: các bản tiếng Việt. Dòng này đề xuất INCOMPLETE, vì mình phải sửa bản dịch sau khi subagent làm xong.

**Còn chờ bạn:**
- Review các skill. Bản tiếng Việt nằm cạnh bản tiếng Anh trong từng thư mục.
- Cho biết có đưa `HW04_Automation_Testing_Vietnamese.pdf` vào repo không. File này vẫn chưa commit.

**Bước tiếp theo** (khi bạn review skill xong): **A1 – chọn ≥ 12 test case FR-03 từ HW02**, theo bước T1 của test-automation.
Bash ls skills/*/SKILL.vi.md skills/*/review-rubric.vi.md && git status -sb && git log --oneline -1
Lịch kiểm tra này đã hết việc: cả 4 bản tiếng Việt đã được kiểm, chỉnh và commit, push ở lượt trước. Repo đang đồng bộ với `origin/master`. Ngoài `HW04_Automation_Testing_Vietnamese.pdf` đang chờ bạn quyết định, không còn thay đổi nào chưa commit.
```

- **Used in:** `skills/*/SKILL.vi.md`, `review-rubric.vi.md`, `skills/git-commit-conventions/`, `PLAN.md` S3 S6 (AI-02 Artifact #7, #S4, #S5)

---

## Prompt006 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 12:27 17/11/2026
- **Output received:** 12:32 17/11/2026
- **Feature / step:** fA – T1 select test cases
- **Purpose:** Ask why the skill overview sentence is there and start step T1 for FR-03
- **Prompt (verbatim):**

```text
- tại sao lại có dòng này, ý nghĩa của nó là gì "Một bộ test sinh ra từ một prompt trông có vẻ đầy đủ nhưng thực ra không: selector hỏng ngay lần đổi layout tiếp theo, assertion chỉ kiểm tra rằng có gì đó hiện ra, giá trị mong đợi được chép từ những gì app đang làm hôm nay, và các lệnh chờ chỉ pass trên máy nhanh"
- bắt đầu thực hiện bước T1
```

- **AI output (verbatim):**

```text
Skill
Bash git status --short && git log --oneline -3 && ls ../week02/features/fA-pool-A/ && wc -l ../week02/fe
Bash cd /home/hg/source/software-testing/week02/features/fA-pool-A && cat 02_domain_testing.md 03_boundar
Bash grep -n '^#' 02_domain_testing.md 03_boundary_value_analysis.md | head -60
Bash sed -n 272,335p 02_domain_testing.md
I'm reading the HW02 test cases for FR-03 (34 DT + 10 BVA) so I can fill in the T1 table. After that I'll answer your question about the line in the skill.
Bash sed -n 293,300p 02_domain_testing.md | cut -c1-1500; echo; sed -n 119,124p 03_boundary_value_analysi
Bash python3 -I - <<'EOF'
Bash python3 -I - <<'EOF'
Bash cd /home/hg/source/software-testing/week02 && grep -nE '^#+ |^\| BUG-' bugs/BUG_REPORT.md | head -60
Bash sed -n 24,40p bugs/BUG_REPORT.md | cut -c1-400; grep -n 'F7\|F9\|F5 \|F6 ' features/fA-pool-A/02_dom
Bash cd /home/hg/source/software-testing/week04 && grep -n -i -E 'test case|API|request|assertion|UI|sele
I've read all 44 HW02 test cases (they hit BUG-01…11). Now I'm checking the web's forgot-password page to decide which cases a UI test can actually observe.
Bash cd /home/hg/source/software-testing/week04/eshop-sut && f=$(grep -ril 'forgot' frontend-web/src --in
Bash cat frontend-web/src/pages/ForgotPassword.jsx
I've chosen which test cases to automate. Before writing the table I'm checking FR-01 and what HW02 decided counts as a "special character", because the Web's password check accepts a space.
Bash cd /home/hg/source/software-testing/week04 && grep -n -A8 '### FR-01' eshop-sut/README.md | head -14
Bash cd /home/hg/source/software-testing/week04/skills && sed -n 1,40p test-automation/review-rubric.md;
Writing the T1 table (44 rows) into `features/fA-fr03/automation_design.md` §1.
Edit /home/hg/source/software-testing/week04/features/fA-fr03/automation_design.md
Bash cd /home/hg/source/software-testing/week04 && sed -i 's/^| Count | Designed: 44 · Automated: 0 · Not
Committing the T1 table, then adding the AI-02 row.
Bash git add features/fA-fr03/automation_design.md && git commit -q -m "test (fA): select FR-03 test case
Bash date '+%d/%m %H:%M' && python3 - <<'EOF'
Bash sed -n 1,25p skills/review-rubric-shared.md
Bash python3 - <<'EOF'
## 1. Câu "Một bộ test sinh ra từ một prompt…"

Câu này nằm ở phần **Overview** của skill test-automation (bản tiếng Việt dịch từ câu "A suite generated from one prompt looks complete and is not…"). Nó nói lý do skill tồn tại: nếu bảo AI viết cả bộ test bằng một prompt thì bộ test trông có vẻ đủ, nhưng thường mắc 4 lỗi. Mỗi lỗi khớp với một nhóm lỗi mà đề bài yêu cầu bạn soi ở bước review (§6, "fragile selectors, weak or missing assertions, … flaky waits"). Bước T5 của skill dùng đúng các nhóm này.

| Vế trong câu | Nghĩa | Ví dụ trên FR-03 | Nhóm lỗi ở T5 |
| --- | --- | --- | --- |
| Selector hỏng ngay lần đổi layout tiếp theo | AI chọn phần tử theo class CSS hoặc vị trí, không theo tên hiển thị | `.bg-green-100` để đọc OTP, `button:nth-child(2)` cho nút "← Quay lại" | Fragile selector |
| Assertion chỉ kiểm tra rằng có gì đó hiện ra | Chỉ kiểm tra "có hiện" (`toBeVisible()`), không kiểm tra nội dung | Hộp xanh có hiện → pass, dù OTP có 4 số chứ không phải 6 | Weak assertion |
| Giá trị mong đợi chép từ những gì app đang làm hôm nay | Lấy kết quả thực tế của app làm kết quả mong đợi, nên test luôn pass | AI thấy nhãn "Mã OTP (4 số)" rồi assert OTP có 4 số → BUG-03 bị che mất | Wrong oracle |
| Lệnh chờ chỉ pass trên máy nhanh | Chờ cứng một số giây thay vì chờ đúng trạng thái cần | `waitForTimeout(1000)` trước khi đọc OTP → máy chậm hoặc WebKit thì fail ngẫu nhiên | Flaky wait |

Như vậy câu này vừa báo trước cho agent những lỗi phải tránh, vừa là danh sách bạn dùng để viết bảng §5 (AI sai gì, vì sao). Nếu bạn thấy câu khó đọc, mình có thể viết lại thành 4 gạch đầu dòng như bảng trên.

## 2. Bước T1 – fA (FR-03): chọn test case để tự động hóa

Bảng đã ghi vào [automation_design.md](features/fA-fr03/automation_design.md) §1. Lúc bắt đầu, repo không còn thay đổi nào chưa commit.

**Kết quả đề xuất:** 44 dòng (34 DT + 10 BVA, giữ nguyên ID của HW02), tự động hóa 32, không tự động hóa 12.

| Nhóm | Test case | Số lượng |
| --- | --- | --- |
| Web | DT-01…09, DT-11…15, DT-20…26, DT-28…30, BVA-01…05 | 29 |
| API | DT-17 (OTP dùng cho email khác), DT-27 (thiếu `newPassword`, BUG-08), DT-32 (dùng OTP 2 lần) | 3 |
| Không, chỉ gọi được bằng API | DT-10, 16, 18, 19, 31 | 5 |
| Không, oracle chỉ dựa vào giả định A8 | DT-33 | 1 |
| Không, phải chờ 10 phút thật trên server | DT-34, BVA-08, 09, 10 | 4 |
| Không, trùng với DT-01 | BVA-06, 07 | 2 |

Để biết test trên Web quan sát được gì, mình đã đọc trang `ForgotPassword.jsx`. Ghi chú cho T2–T4 nằm dưới bảng. Điểm đáng chú ý:

- Mọi lỗi và thông báo thành công đều hiện bằng `alert` (BUG-09). Vì kết quả mong đợi là "error above submit", hầu hết test Web loại không hợp lệ sẽ fail vì lỗi này.
- Bước 2 kiểm tra mật khẩu ngay trên trình duyệt trước khi gửi OTP. Mẫu kiểm tra đòi phải có dấu cách và cấm mọi ký tự đặc biệt (BUG-01).

**AI tự review**

| # | Điểm | Bằng chứng | Việc cần làm |
| --- | --- | --- | --- |
| P1 | 2 | Chỉ sửa §1 và dòng Count | – |
| P2 | 2 | Trước khi làm, `git status` chỉ còn file PDF chưa track | – |
| P3 | N/A | Không có chỉnh sửa nào của SV đang chờ áp dụng | – |
| P4 | 2 | Mọi dòng "No" và dòng Count đều ghi (proposed); không ghi verdict nào | – |
| P5 | 2 | 4 quyết định bên dưới | – |
| P6 | 2 | Các commit 91322c9, f614f37 (AI-02 #8), 0b20c86 | – |
| 1 | 2 | 44 dòng = 34 + 10, ID không đổi | – |
| 2 | 2 | 32 ≥ 12; gồm 6 hợp lệ, 21 không hợp lệ, 5 biên | – |
| 3 | 2 (chờ SV) | 12 dòng "No" đều có lý do cụ thể và ghi (proposed) | SV xác nhận |
| 4 | 2 | Giữ nguyên câu chữ của TC. Phần lược bỏ được ghi ở đầu §1: các bước API fallback 2b/3b/4b, mã nguồn A#/Q#, "screen recorded (Q8)" (commit 0b20c86) | – |

**Gate: passed** (tiêu chí 3 chờ SV xác nhận)

**Cần bạn quyết định**

1. **Có tự động hóa test case chỉ gọi được bằng API không?**
   - Đề bài yêu cầu script cho web frontend. 9 test case không đi qua Web được.
   - Các lựa chọn: (a) cả 9; (b) chỉ DT-17, DT-27, DT-32; (c) không cái nào.
   - **Đề xuất (b):** DT-17 có câu yêu cầu rõ trong FR-03; DT-27 cần bằng chứng automation để comment vào issue #8; DT-32 dựa vào SEC-07.
2. **Các test về OTP trên Web (DT-11–15, BVA-01/02)**
   - Vấn đề: trên Web, mật khẩu hợp lệ bị chặn ngay ở trình duyệt nên OTP không bao giờ được gửi. Chỉ dùng Web thì không kiểm được quy tắc OTP.
   - (a) Chỉ dùng Web: assert bị từ chối và mật khẩu cũ vẫn đăng nhập được. Test sẽ pass, nhưng pass vì kiểm tra mật khẩu chứ không phải vì OTP.
   - (b) Phần Web như (a), rồi gửi chính OTP đó tới `/api/reset-password` và assert 400. Cách này giống "API fallback" của HW02.
   - (c) Chỉ dùng API.
   - **Đề xuất (b).**
3. **DT-28–30 (ô xác nhận mật khẩu không tồn tại, BUG-04)**
   - Các test này sẽ fail ở bước tìm ô xác nhận, trên cả 3 trình duyệt.
   - Các lựa chọn: tự động hóa cả 3; chỉ DT-28 (DT-29/30 ghi "No – blocked by BUG-04").
   - **Đề xuất cả 3:** chỉ tốn thêm dòng dữ liệu, và sẽ chạy được ngay khi app có ô xác nhận.
4. **Có thêm dòng DT-26b `NewPass 2026` không?**
   - Đây là lỗi mới, mình tìm ra khi đọc mã nguồn và chưa chạy kiểm chứng.
   - Mật khẩu có dấu cách nhưng không có ký tự đặc biệt sẽ qua được kiểm tra trên Web, và API cũng nhận. Theo A10, dấu cách không phải ký tự đặc biệt, nên mật khẩu này sai FR-01. HW02 không có test case nào phủ trường hợp này (DT-26 dùng `#`, mà Web chặn `#`).
   - Các lựa chọn: thêm DT-26b, cùng lớp EC-V4-10, giá trị lấy từ A10; hoặc bỏ qua.
   - **Đề xuất thêm.** Nếu chạy thật mà fail thì tạo issue mới với nhãn `hw: HW04`.

**Commit đã đẩy lên remote:** 91322c9, f614f37, 0b20c86 (repo đồng bộ với `origin/master`).

**Bước tiếp theo:** khi đã chốt 4 quyết định trên, gửi prompt: "bước T2 cho fA: locator và page object cho trang Đăng nhập và Quên mật khẩu (Bước 1, Bước 2)".
```

- **Used in:** `features/forgot-password/automation_design.md` §1 (AI-02 Artifact #8)

---

## Prompt007 – Claude Code

- **Prompt sent:** 16:25 17/11/2026
- **Output received:** NO OUTPUT – interrupted by the student, sent again as Prompt008
- **Feature / step:** fA – T1 review
- **Purpose:** Student review of T1 (sent again with more points at 16:36 17/11/2026)
- **Prompt (verbatim):**

```text
1. từ câu này hãy thay bằng các bullet point một cách tường minh
2. đề bài có yêu cầu chỉ được test một số lượng TC tự động hóa không, có đề ra con số hay mức nào không, tại sao lại cần lựa ra TC để run automation mà ko phải là run toàn bộ
3. thêm một lưu ý: trước khi nộp các bài tập này, hãy xóa các bản tiếng việt, ko nộp tài liệu học cùng với bài nộp
4. tôi đã check các dòng No đều có lý do hợp lý và đầy đủ chi tiết
```

- **AI output (verbatim):**

```text

```

- **Used in:** not used – interrupted by the student and sent again as Prompt008

---

## Prompt008 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 16:36 17/11/2026
- **Output received:** 16:42 17/11/2026
- **Feature / step:** fA – T1 review; skill test-automation; plan
- **Purpose:** Student review: overview sentence as bullets, minimum number of automated TCs, remove Vietnamese copies before submission, No rows confirmed, Playwright tools and automation approaches, accept the T1 decisions
- **Prompt (verbatim):**

```text
<pasted_content id="4cb0">
1. từ câu này hãy thay bằng các bullet point một cách tường minh
2. đề bài có yêu cầu chỉ được test một số lượng TC tự động hóa không, có đề ra con số hay mức nào không, tại sao lại cần lựa ra TC để run automation mà ko phải là run toàn bộ
3. thêm một lưu ý: trước khi nộp các bài tập này, hãy xóa các bản tiếng việt, ko nộp tài liệu học cùng với bài nộp
4. tôi đã check các dòng No đều có lý do hợp lý và đầy đủ chi tiết
</pasted_content id="4cb0">

5. phần tự động hóa các testcase, tôi cần trải nghiệm và học hỏi các phương thức hiện nay của automation testing và cả cách sử dụng các tool nhưng tôi chưa thấy bạn đề cập trong skill hoặc trong các file/folder được khởi tạo, chỉ mới thấy được phương thức viết script
6. từ câu hỏi trên, đề bài có yêu cầu phải dùng tool nào, hoặc đa dạng phương thức automation testing ko, hiện tại tôi chỉ thấy skill tập trung vào việc thay đổi môi trường bằng cách thay đổi browser
7. các vấn đề còn lại mà bạn cần tôi đưa ra quyết định tôi đều đống ý với các đề xuất của bạn
các vấn đề được thay đồi dựa trên góp ý của tôi thì cũng note vào report AI audit là do sinh viên thực hiện chỉnh sửa
```

- **AI output (verbatim):**

```text
Bash sed -n 25,40p HW04_Automation_Testing_Original.md; sed -n 82,130p HW04_Automation_Testing_Original.m
Bash cd /home/hg/source/software-testing && ls materials | head -50; ls materials/* -d | head; grep -ril
Bash ls week04; for f in materials/*.pdf; do n=$(pdftotext "$f" - 2>/dev/null | grep -ci 'tự động\|automa
Bash cd /home/hg/source/software-testing/week04 && grep -n 'D[1-5]\b\|^#' PLAN.md | head -40; grep -n -B2
Bắt đầu với việc 1: thay câu tổng quan bằng 4 bullet, ở cả bản tiếng Anh và bản tiếng Việt.
Bash cd /home/hg/source/software-testing/week04/skills/test-automation && grep -n 'A suite generated from
Bash cd /home/hg/source/software-testing/week04 && git add skills/test-automation/SKILL.md skills/test-au
Việc 4 và 7: đưa quyết định của bạn vào bảng T1 (xác nhận các dòng No, OTP chạy Web + API, thêm DT-35).
Bash python3 - <<'EOF'
Bash git add features/fA-fr03/automation_design.md && git commit -q -m "test (fA): apply the student's se
Việc 3: thêm lưu ý về việc nộp bài vào PLAN.md, CLAUDE.md và bộ nhớ.
Bash sed -n 69,76p PLAN.md && sed -n 60,70p CLAUDE.md
Bash python3 - <<'EOF'
Việc 5 và 6: trước khi viết phần công cụ vào skill, mình kiểm tra trên bản Playwright 1.64.1 đã cài xem từng lệnh có thật không.
Bash npx playwright --help | sed -n 1,40p; npx playwright init-agents --help 2>&1 | head -20; npx playwri
Cả 4 công cụ đều có trong bản đã cài: codegen, UI mode, trace viewer và `init-agents --loop claude` (Playwright Test Agents). Giờ mình viết chúng vào skill.
Bash cd /home/hg/source/software-testing/week04/skills && cat SOURCES.md; grep -n '^## \|^### ' test-auto
Bash python3 - <<'EOF'
Bash tail -12 test-automation/review-rubric.md; tail -8 test-automation/review-rubric.vi.md
Bash cat >> test-automation/review-rubric.md <<'EOF'
Bash sed -n 1,5p test-automation/SKILL.md | cut -c1-900
Bash sed -i '3s/triaging failures, or counting automated/triaging failures (trace viewer, UI mode, Inspec
Skill đã có bảng công cụ theo từng bước (commit 6c49ab7). Giờ mình thêm lệnh npm cho các công cụ này và ghi vào PLAN.md lúc nào sẽ dùng từng cái.
Bash grep -n -A6 'webServer' playwright.config.ts | head -30; sed -n 38,64p PLAN.md
Bash sed -n 60,95p playwright.config.ts | grep -E "command|cwd"
Bash python3 - <<'EOF'
Bash sleep 1; ss -ltnp 2>/dev/null | grep -E ':(3000|5173|5174) ' || echo "ports free"; cd /home/hg/sourc
Bash (cd eshop-sut && git checkout -q backend/database.sqlite) && git add package.json && git commit -q -
Bash python3 - <<'EOF'
Bảng công cụ đã vào skill, PLAN.md và CLAUDE.md. Việc cuối là cập nhật AI-02: ghi các chỗ sửa là do SV yêu cầu.
Bash grep -n '^| \*\*Artifact' AI-02_AI_Audit_Report.md | cut -c1-140; grep -n 'Artifact #S1 ' AI-02_AI_A
Bash T=$(date '+%d/%m %H:%M') && echo $T && T="$T" python3 - <<'EOF'
Mình đã làm xong 7 ý. Các commit đã push, repo đồng bộ với `origin/master`.

**1. Câu "Một bộ test sinh ra từ một prompt…"** đã được viết lại thành 4 gạch đầu dòng, ở cả `SKILL.md` và `SKILL.vi.md` (commit 916a351). Mỗi gạch nêu tên lỗi, cách nhận ra và hậu quả:
- selector dễ vỡ;
- assertion yếu;
- oracle sai;
- chờ không ổn định (flaky wait).

**2. Đề bài có giới hạn số TC tự động hóa không?** Không. Đề chỉ đặt mức tối thiểu, không có mức tối đa:
- §6 Task 1 yêu cầu mỗi feature *"convert at least 12 test cases"*.
- Cũng §6 Task 1 yêu cầu *"Make the automation as complete as possible … Document any test cases you could not automate and explain why"*.
- §2 ghi *"Quality over completion … graded on the quantity and quality"*.

Vì vậy T1 không nhằm cắt bớt số lượng. T1 tách ra những TC không nên hoặc không thể chạy tự động, và đề bắt buộc phải liệt kê chúng kèm lý do. ISTQB §6.2 cũng nói không phải test nào tự động hóa cũng có lợi, vì mỗi test tự động cần một oracle rõ ràng và tốn công bảo trì. Với FR-03, ta tự động hóa 33/45 TC, tức là mọi TC làm được. 12 TC còn lại rơi vào một trong các trường hợp sau:
- Web không gọi tới được (chỉ gọi bằng API);
- oracle chỉ dựa trên một giả định, không có trong đặc tả;
- phải chờ 10 phút thật trên server, nhân với 3 trình duyệt;
- trùng với test khác.

**3. Lưu ý trước khi nộp** đã được thêm thành bước D5 trong `PLAN.md` và vào `CLAUDE.md`, đồng thời lưu vào bộ nhớ để áp dụng cho các bài sau. Trước khi nộp sẽ:
- xóa `*.vi.md` của các skill;
- xóa đề bài `HW04_Automation_Testing_*` (.md và .pdf);
- sửa các chỗ còn nhắc tới các file đó.

`PLAN.md` và các biểu mẫu AI (AI-02, AI-03, AI-05) viết bằng tiếng Việt nhưng không phải bản dịch, nên mình vẫn giữ lại.

**4 và 7. Quyết định của bạn** đã được đưa vào bảng (commit c65989e):
- Bỏ "(proposed)" ở 12 dòng No.
- Các test OTP chạy phần Web rồi gửi cùng OTP đó qua API.
- Giữ DT-28 … 30.
- Thêm test case mới với ID **DT-35** thay vì `DT-26b`. Lý do: script tổng kết nhận ID theo mẫu `DT-26…`, nên `DT-26b` sẽ bị gộp vào DT-26.

Kết quả: 45 TC, tự động hóa 33.

Trong AI-02, các chỗ sửa theo góp ý của bạn đều ghi **"Chỉnh sửa theo yêu cầu của SV"** hoặc **"Chỉnh sửa do SV quyết định"**:
- Dòng #8: ghi lại phần review của bạn.
- Thêm 3 dòng mới: #9, #S6, #S7.
- #S1 (skill test-automation) đổi thành INCOMPLETE (đề xuất), vì sau khi bạn review skill phải sửa câu tổng quan và bổ sung phần công cụ.

**5 và 6. Đề bài yêu cầu công cụ và phương pháp nào?** Theo §8, chỉ được dùng Playwright (khuyến nghị) hoặc Selenium 4+, cộng với Allure hoặc Playwright HTML reporter. Những gì bắt buộc:
- dữ liệu test nằm trong file riêng (data-driven);
- ít nhất 3 kiểu assertion;
- ít nhất 3 trình duyệt (tổng cộng 9 lần chạy);
- AI sinh script từng bước và có người review.

Đề không bắt dùng nhiều phương pháp. Chạy trên nhiều trình duyệt là yêu cầu của đề chứ không phải trọng tâm skill tự chọn. Tuy vậy bạn nói đúng: skill mới dạy viết script mà chưa dạy dùng công cụ. Mình đã bổ sung:
- **Mục "Tools and approaches" trong skill, bản EN và VI** (commit 6c49ab7):
  - Bảng công cụ theo từng bước: codegen, Pick locator / ARIA snapshot, Playwright Test Agents, UI mode, Inspector, HTML report, trace viewer, kiểm thử API.
  - Bảng phương pháp, theo nguồn ISTQB TAE: ghi và phát lại, tuyến tính, Page Object Model, data-driven, BDD, API, visual regression, accessibility, AI tự sửa test, CI.
  - Thêm tiêu chí rubric số 32: ghi lại công cụ đã dùng ở từng bước.
- Các lệnh trong skill đều đã được kiểm tra là có thật trên bản 1.64.1 đã cài.
- **Lệnh npm** (commit d82e8a9): `npm run sut`, `codegen`, `codegen:admin`, `ui`, `report`, `trace`, `init-agents`. Mình đã chạy thử `npm run sut`: cả 3 server trả về 200.
- **`PLAN.md` A2, A5, A6** ghi rõ bạn tự tay dùng công cụ nào ở bước nào (commit 42312dc). Ví dụ ở A2: chạy `npm run sut` rồi `npm run codegen`, sau đó so locator do codegen chọn với locator do AI chọn.

**Bạn cần chọn: có thử thêm phương pháp tùy chọn nào không?**
- Các phương pháp trong kế hoạch đã đáp ứng đề bài. Phương pháp thêm thì tốn thêm thời gian, nên bạn quyết định tùy mục tiêu học.
- (a) Không thêm gì.
- (b) Thử **Playwright Test Agents** trên một feature (khoảng 30–45 phút), chỉ để đối chứng với cách làm từng bước, không dùng làm bài nộp. Kết quả là tư liệu tốt cho AI Critique.
- (c) Chạy CI bằng GitHub Actions.
- (d) Thử BDD, visual regression hoặc quét accessibility. Ba cái này nằm ngoài phạm vi các FR đang test.
- **Đề xuất (b).**

**Bước tiếp theo:** gửi prompt "bước T2 cho fA: locator và page object cho trang Đăng nhập và Quên mật khẩu (Bước 1, Bước 2)". Trong bước này bạn sẽ tự chạy `npm run sut` và `npm run codegen` lần đầu.
```

- **Used in:** `features/forgot-password/automation_design.md` §1; `skills/test-automation/` (Overview, "Tools and approaches", rubric 32), `skills/SOURCES.md`; `PLAN.md` A2–A6, D5; `CLAUDE.md`; `package.json` (AI-02 Artifact #8, #9, #S1, #S6, #S7)

---

## Prompt009 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 16:56 17/11/2026
- **Output received:** 17:01 17/11/2026
- **Feature / step:** fA – T2 locators and page objects; prompt log
- **Purpose:** No optional approach; step T2 for FR-03; log the prompts
- **Prompt (verbatim):**

```text
vậy ko cần thêm gì
tiếp tục thực hiện bước T2 cho feature A
/logging-ai-prompts
```

- **AI output (verbatim):**

```text
Ghi nhận lựa chọn (a). Mình cập nhật PLAN.md trước, rồi làm T2.
Bash git status --short && sed -i 's/ Tùy chọn, chờ SV chọn: Playwright Test Agents (`npm run init-agents
Now T2: start the SUT and read the accessibility tree (ARIA snapshot) of each screen from the running UI.
Bash (npm run sut > /tmp/claude-1000/sut.log 2>&1 &) ; for i in $(seq 1 30); do curl -s -o /dev/null http
Bash cat tests/smoke.spec.ts | head -20; ls; grep -n 'api/login\|api/register' -A12 eshop-sut/api_specifi
Bash mkdir -p /home/hg/source/software-testing/week04/pages && cd /home/hg/source/software-testing/week04
Bash sed -i "s/this.form.locator('input\[type=\"password\"\]').first();/this.form.locator('input[type=\"p
Bash cat > tests/zz-locator-check.spec.ts <<'EOF'
Bash ss -ltn | grep -E ':(3000|5173|5174) ' || echo free; (cd eshop-sut && git checkout -q backend/databa
Bash pkill -f 'vite' ; pkill -f 'npm run dev'; pkill -f 'npm run sut'; sleep 1; ss -ltn | grep -E ':(3000
Bash ss -ltn | grep -E ':(3000|5173|5174) ' || echo free
All locators resolve on all 3 browsers, and the servers are stopped. Writing design §2.
Bash python3 - <<'EOF'
Bash T=$(date '+%d/%m %H:%M') T="$T" python3 - <<'EOF'
Done T2. Now running the prompt-log skill.
Skill
Bash ls -t ~/.claude/projects/-home-hg-source-software-testing/*.jsonl | head -3; cd /home/hg/source/soft
Bash S=~/.claude/projects/-home-hg-source-software-testing/fc5a277e-e51e-4a5c-b0af-eca264cbfd6b.jsonl; py
Bash grep -n 'UNFINISHED' /home/hg/source/software-testing/.claude/skills/logging-ai-prompts/scripts/extr
Bash grep -o '^| \*\*Artifact #[0-9S]*\|prompt [0-9/]* [0-9:]* (logged later)\|prompt [0-9/]* (logged lat
Bash cd /home/hg/source/software-testing && grep -o 'Thời gian: [^<]*' week03/AI-02_AI_Audit_Report.md |
Đã đưa 9 prompt vào log (Prompt001–009). Giờ mình điền các trường TODO và thay các ghi chú "logged later" trong AI-02 bằng số prompt tương ứng.
Bash cd /home/hg/source/software-testing/week04 && python3 - <<'EOF'
Bash grep -rn -i 'prompt log entries\|Prompt used for generation' features/ | head; git add prompt_log.md
Bash sed -n 3,10p features/fA-fr03/automation_design.md | cut -c1-80 && python3 - <<'EOF'
Bash cat /home/hg/source/software-testing/.claude/skills/logging-ai-prompts/review-rubric.md | head -30
Bash grep -n -A10 'FR-22' eshop-sut/README.md | head -16
Xong bước T2 cho FR-03 và đã ghi log prompt. Repo đang đồng bộ với `origin/master`.

**Phương pháp tùy chọn:** theo quyết định của bạn, không thêm cái nào. Đã ghi vào `PLAN.md` và `CLAUDE.md` (commit 216f87f).

## Bước T2 – fA (FR-03): locator và page object

Lúc bắt đầu, bước T1 đã được commit hết.

Mình bật app lên, đọc cây accessibility (ARIA snapshot) của từng màn hình, rồi đếm từng locator trên trang thật bằng Chromium, Firefox và WebKit:
- Mỗi locator khớp đúng 1 phần tử.
- 3 phần tử FR-03 yêu cầu nhưng app không có thì khớp 0: chỉ báo bước, nút "Quay lại đăng nhập", ô "Xác nhận mật khẩu mới".

Đã tạo 3 file:
- [pages/LoginPage.ts](pages/LoginPage.ts): link "Quên mật khẩu?" và nút "Sign In".
- [pages/ForgotPasswordPage.ts](pages/ForgotPasswordPage.ts):
  - locator của cả hai bước;
  - các thao tác `requestOtp(email)`, `readOtp()`, `resetPassword(otp, pw, confirm?)`, `backToStep1()`;
  - ghi lại nội dung mọi hộp thoại `alert` vào `dialogMessages`.
- [pages/EshopApi.ts](pages/EshopApi.ts): các hàm gọi API register, login, forgot-password, reset-password. Dùng để chuẩn bị dữ liệu, chạy các dòng `Yes (API)` và kiểm tra mật khẩu có bị đổi hay không.

Trong các file này không có `expect` nào. Bảng 15 phần tử nằm ở [automation_design.md](features/fA-fr03/automation_design.md) §2.

**Phát hiện về testability:**
- **Không ô nhập nào có accessible name**, cả ở trang Đăng nhập, Bước 1 và Bước 2. Thẻ `<label>` không gắn với ô nhập, nên `getByLabel` không tìm được gì. Vì vậy ô nhập được tìm theo vai trò (role) hoặc thuộc tính `type` bên trong form của từng bước.
- Mọi thông báo đều hiện bằng `alert` (BUG-09). Test phải đọc chúng qua sự kiện `dialog`.
- Trang Đăng nhập có tiêu đề "Đăng Ký". Trang này thuộc FR-02, nên mình chỉ ghi chú, không báo bug.
- Firefox và WebKit hiện trang quên mật khẩu chậm hơn sau khi bấm link. Lần đếm đầu cho kết quả 0; chờ tiêu đề hiện ra rồi mới đếm thì khớp đủ. Ghi chú cho T4: mỗi bước phải chờ trang sẵn sàng bằng một assertion web-first rồi mới thao tác.

**Việc bạn tự làm:** chạy `npm run sut` rồi `npm run codegen`, ghi lại luồng Đăng nhập → Quên mật khẩu → Bước 1 → Bước 2. Sau đó so locator codegen chọn với bảng §2 và điền kết quả vào dòng cuối §2 (đang để `<student fills in>`).

**AI tự review**

| # | Điểm | Bằng chứng | Việc cần làm |
| --- | --- | --- | --- |
| P1 | 2 | Chỉ sửa §2 và `pages/`. Quyết định (a) commit riêng | – |
| P2 | 2 | Trước khi làm, `git status` chỉ còn file PDF chưa track | – |
| P3 | 2 | Quyết định "không thêm gì" đã ghi (commit 216f87f) | – |
| P4 | 2 | Kết quả codegen để trống cho bạn điền | – |
| P5 | 2 | Có 2 quyết định bên dưới | – |
| P6 | 2 | Các commit d2ba1fc, 8519295 (AI-02 #10) | – |
| 5 | 2 | Lấy từ ARIA snapshot và đếm trên 3 trình duyệt, không chép từ mã nguồn | – |
| 6 | 2 | Link và nút tìm theo vai trò + tên. Chỉ báo bước và thông báo OTP tìm theo chữ. Chỉ dùng CSS `type` khi phần tử không có tên. Không có XPath hay `nth()`; mình đã bỏ một chỗ `.first()` | – |
| 7 | 2 | Mỗi locator dự phòng đều ghi lý do là không có accessible name, và có trong mục phát hiện | – |
| 8 | 2 | `pages/` không có `expect` | – |
| 32 (S) | 1 | Đã ghi cách dùng ARIA snapshot; còn thiếu phần codegen | Bạn chạy codegen |

**Gate: passed**

**Cần bạn quyết định**

1. **Cách tìm các ô nhập không có tên**
   - Skill để người kiểm thử chọn ở chỗ này.
   - (a) Tìm theo role hoặc `type` trong form, như hiện tại.
   - (b) Tìm theo chữ của label, ví dụ `label:has-text("Mật khẩu mới") + input`. Cách này hỏng khi đổi chữ. Riêng label OTP còn ghi sai "4 số".
   - (c) Thêm `data-testid` vào app. Không được, vì không sửa SUT.
   - **Đề xuất (a).**
2. **Có báo lỗi "ô nhập không có accessible name" không?**
   - FR-22 không có câu nào yêu cầu label phải gắn với ô nhập, nên không có oracle để báo bug.
   - (a) Chỉ ghi là phát hiện testability trong báo cáo.
   - (b) Tạo issue mới với nhãn `hw: HW04`, dựa vào WCAG.
   - **Đề xuất (a).**

## Log prompt

Đã thêm Prompt001–Prompt009 vào [prompt_log.md](prompt_log.md):
- Điền đủ các trường Feature / step, Purpose, Used in.
- Các dòng AI-02 trước đây ghi "logged later" giờ đã có số prompt và giờ gửi, giờ nhận.
- Thêm dòng "Prompt log entries" vào phần đầu file design của fA.

Commit 50cb038 và 2cedf6a.

Hai prompt cần lưu ý:
- **Prompt007** là tin nhắn bạn ngắt giữa chừng. Nó được ghi là "NO OUTPUT – interrupted, sent again as Prompt008".
- **Prompt009** là lượt hiện tại, đang ghi là `UNFINISHED`. Lần chạy `/logging-ai-prompts` tiếp theo sẽ cập nhật giờ nhận và output của nó, vẫn giữ số 009.

| ID | Điểm | Bằng chứng |
| --- | --- | --- |
| LOG-1, 2, 3, 5, 10 | 2 | 9 mục, đúng session HW04, nội dung nguyên văn do script trích, đánh số 001–009, chỉ đọc transcript qua script |
| LOG-4 | 2 | Giờ UTC+7, chính xác đến phút |
| LOG-6 | 2 | Prompt009 có đánh dấu UNFINISHED, cần chạy lại sau lượt này |
| LOG-7, 8, 11 | 2 | Không còn TODO; không đòi ảnh chụp màn hình; đã commit |
| LOG-9, 12 | N/A | Không dùng tool AI khác; không có prompt nào bạn dặn không ghi log |

**Gate: passed**

**Bước tiếp theo:** gửi prompt "bước T3 cho fA: tách dữ liệu test ra file `data/fA-fr03/`". Bạn có thể chạy codegen trước hoặc song song với T3.
```

- **Used in:** `page-objects/LoginPage.ts`, `page-objects/ForgotPasswordPage.ts`, `api/EshopApi.ts`, `features/forgot-password/automation_design.md` §2, `PLAN.md`, `CLAUDE.md`, `prompt_log.md` (AI-02 Artifact #10)

---

## Prompt010 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 18:05 17/11/2026
- **Output received:** 18:18 17/11/2026
- **Feature / step:** forgot-password (fA) – T2 review: folder names, locator options, codegen format
- **Purpose:** Why no `expect` in page objects; rename `pages/` and the feature folders; try every locator for the unnamed fields; format for the codegen result
- **Prompt (verbatim):**

```text
- mục expect có cần thiết trong các locator và page object ko? đặc biệt là trong bài tập này, ứng dụng cụ thể này 
- mục đích của các ffile bạn vừa mới thêm vào folder pages là gì? tại sao lại đặt tên gây hiểu nhầm như vậy -> đưa ra một số option tên khác để tôi lựa chọn và bạn đỏi tên folder theo tên đó
các folder fA-fr03,.... bên trong folder feature là gì, tương tự naming cũng là vấn đề, tên các folder này đọc rất khó hiểu và tôi ko nghĩ là bạn cần chú thích nhiều thông tin đến vậy thông qua tên file/folder
- tìm các ô nhập ko có tên thì tôi nghĩ nên thử tất cả các option có thể chứ ko cần cố định một option nào (a và b hợp lý)
- có thể báo lỗi nếu như ko có option nào có thể tìm ra được, nếu có lỗi thì có thể tạo issue mới nếu đủ lớn ko thì có thể comment vào một issue liên quan đã có (cần cho tôi biết kết quả sau khi thử các option trước khi đưa ra quyết định comment hoặc tạo issue mới)
- tôi đã run được codegen nhưng cần ghi kết quả theo format nào để đảm báo đúng thông tin và ko bị lan man -> bạn gợi ý format giúp tôi và tôi sẽ điền vào; hoặc bạn có thể đưa ra câu hỏi -> tôi trả lời -> bạn ghi vào
```

- **AI output (verbatim):**

```text
Bash Show repo status, layout and config
Bash Read page objects, design §2 and find references to folder names
Bash Check SUT start script and ports
Bash Find seed account in requirement document
Bash Dump the live DOM of the login and forgot-password forms
Mình đang thử từng cách tìm ô nhập trên app đang chạy bằng 3 trình duyệt. App dùng các server bạn đang mở cho codegen.
Bash Count matches of eight locator strategies per unnamed field on three browsers
Bash Search HW02 bug report for label or input-type defects
Bash Show HW02 bug overview rows for FR-03
AskUserQuestion
Bash List every reference to pages/ and the feature folder names
Bash Find uses of the fA key outside the logs
Bash Check scripts and configs for feature-key assumptions
Bash Move page objects and API client to new folders and update references
Bash Find the page-object rule line in the skill
Mình đang đổi `pages/` thành `page-objects/` và `api/`, rồi cập nhật các chỗ tham chiếu. Sau đó sẽ đổi tên các thư mục feature.
Bash Add API-client and no-assert reason to skill, commit and push folder split
Bash Commit and push the folder split
Bash Rename feature folders and update paths and config keys
Bash Drop pool prefix from design titles and update keys in docs
Bash Locate the scripts paragraph in both skill files
Bash Add feature naming rule to the skill
Mình đang đổi tên các thư mục feature thành `forgot-password`, `checkout`, `product-crud`. Các đường dẫn đã cập nhật xong, giờ commit.
Bash Note commit scope, verify no old names left, commit and push
Bash Search group issues for related label or password-type defects
Bash Check Playwright config for testDir and server reuse
Now the page object: per the student's decision, each unnamed field uses option a `.or()` option b.
Bash Combine role/type and label-block locators with .or() in the page object
Bash Run a throw-away check of the combined locators on three browsers
Bash Write locator options results and codegen table into design §2
Read /home/hg/source/software-testing/week04/features/forgot-password/automation_design.md
Bash Move the options table after the findings list
Bash Commit locator change and design §2, inspect AI-02 table
Đã commit phần locator và bảng thử. Giờ mình thêm dòng AI-02 cho lượt này.
Bash Read AI-02 rows #8–#S7 and the totals section
Bash List unlogged prompts with their sent times via the log script
Bash Finalize the unfinished Prompt009 log entry
Bash Check remaining TODO fields in the log
Bash Check Used-in field of Prompt009 after update
Prompt009 đã đủ. Mình commit log rồi cập nhật AI-02 (dòng #10 thêm review của bạn, thêm #11 và #S8).
Bash Commit the log, then update AI-02 rows and totals
Bash Commit and push AI-02 update
Mình đã đổi tên cả hai loại thư mục theo lựa chọn của bạn, thử 7 cách tìm ô nhập không có tên trên 3 trình duyệt, và thêm vào §2 một bảng để bạn điền kết quả codegen. Mọi thứ đã commit và push; repo đồng bộ với `origin/master`.

## 1. `expect` trong page object: không cần, và không nên đặt

Page object chỉ làm việc như một người dùng (gõ, bấm). Việc kết quả đúng hay sai thuộc về test case, nên nằm ở spec. Với FR-03 thì rõ hơn:
- **Một thao tác dùng cho cả case đúng lẫn case sai.** Cùng `requestOtp(email)`: với email đúng, mong đợi là OTP hiện ra; với email sai, mong đợi là thông báo lỗi. Nếu đặt `expect(OTP hiện ra)` trong page object, mọi TC email sai sẽ fail ở chỗ không liên quan.
- **App này có nhiều bug.** Ví dụ BUG-01: mật khẩu hợp lệ cũng bị từ chối. Page object phải gõ và bấm như thường. Spec so kết quả với giá trị trong TC và fail đúng chỗ, và lần fail đó là bằng chứng của bug.
- **Ngoại lệ là chờ trang sẵn sàng.** Firefox và WebKit hiện trang chậm sau khi bấm link. Chỗ này chờ bằng `locator.waitFor()`, không dùng `expect`.

Mình đã ghi lý do này vào bước T2 của skill (`SKILL.md` và bản `.vi`).

## 2. Đổi tên thư mục (bạn đã chọn)

| Trước | Sau | Bên trong |
| --- | --- | --- |
| `pages/` | `page-objects/` | `LoginPage.ts`, `ForgotPasswordPage.ts`: mỗi màn hình một lớp, gồm locator và thao tác |
| | `api/` | `EshopApi.ts`: gọi API để chuẩn bị dữ liệu, chạy TC `Yes (API)` và kiểm tra mật khẩu có thật sự đổi không |
| `features/fA-fr03`, `fB-fr08`, `fC-fr15` | `features/forgot-password`, `checkout`, `product-crud` | File làm việc `automation_design.md` (T1–T8) của từng feature |

- Tên feature mới dùng giống nhau ở `tests/`, `data/`, `reports/`, làm key trong `automation.config.json` và trong lệnh: `npm run feature -- forgot-password`.
- Mã FR và nhóm HW02 (fA) giờ chỉ ghi ở đầu file design và trong bảng của `CLAUDE.md`.
- Skill có thêm quy tắc: tên thư mục feature ngắn, dễ đọc; mã yêu cầu không đưa vào tên thư mục.
- Phần verbatim trong `prompt_log.md` vẫn giữ tên cũ. Chỉ các trường "Used in" được sửa theo tên mới.

## 3. Thử mọi cách tìm ô nhập không có tên

Kết quả giống nhau trên Chromium, Firefox và WebKit. Mỗi ô là số phần tử tìm được:

| Cách | Đăng nhập: Username | Đăng nhập: Mật khẩu | Bước 1: Email | Bước 2: OTP | Bước 2: Mật khẩu mới |
| --- | --- | --- | --- | --- | --- |
| `getByRole` + tên, `getByLabel` | 0 | 0 | 0 | 0 | 0 |
| placeholder / test id / id / name | 0 (DOM không có các thuộc tính này) | 0 | 0 | 0 | 0 |
| **(b)** khối chứa label → ô nhập | **1** | **1** | **1** | **1** | **1** |
| **(a)** role / type trong form | 2 | 2 | **1** | **1** | **1** |
| Layout `:below(label)` | 2 | 1 | 1 | 2 | 1 |
| XPath | không thử, vì skill cấm | | | | |

- Cả (a) và (b) đều tìm được 3 ô của FR-03. Page object giờ dùng cả hai, nối bằng `(a).or(b)`.
  - Mình đã chạy kiểm tra trên 3 trình duyệt: mỗi ô ra đúng 1 phần tử và gõ được.
  - Nếu một cách hỏng, cách kia vẫn tìm được ô. Ví dụ: khi label OTP sửa từ "4 số" thành "6 số", cách (b) không còn khớp nhưng (a) vẫn khớp.
  - Nếu hai cách tìm ra hai ô khác nhau, test báo lỗi ngay thay vì gõ nhầm ô.
- Hai ô ở trang Đăng nhập cho thấy chỗ yếu của (a): cả hai ô đều là `type="text"`, nên tìm theo type ra 2 kết quả. FR-03 không dùng hai ô này.
- Bảng đầy đủ nằm ở §2 của [automation_design.md](features/forgot-password/automation_design.md).

## 4. Có báo lỗi không?

**Kết quả: không có ô nào tìm không ra**, vì ô nào cũng có ít nhất một cách tìm được. Theo tiêu chí của bạn, chưa có lỗi "không định vị được".

Vấn đề còn lại là **ô nhập không có accessible name** (tên mà trình đọc màn hình và `getByLabel` dùng): `getByLabel` và `getByRole` + tên đều ra 0 ở mọi ô.

Các lỗi ở trang Đăng nhập gặp trong lúc thử đã có thành viên nhóm báo, nên không cần làm gì thêm:
- #92: ô mật khẩu là `type="text"`;
- #93: ô email là `type="text"`;
- #95: tiêu đề "Đăng Ký", label "Username", thiếu dấu `*`.

## 5. Ghi kết quả codegen

Mình đã thêm vào cuối §2 mục **"Codegen check"**:
- Một dòng để ghi ngày và trình duyệt.
- Một bảng 7 dòng, mỗi dòng một phần tử. Cột 2 dán locator codegen đã chọn, cột 3 ghi Yes/No (có giống bảng §2 không), cột 4 ghi một dòng nếu khác: cách nào tốt hơn và vì sao.
- Một câu kết luận.

Bạn có thể tự điền. Hoặc bạn dán nguyên đoạn code trong cửa sổ codegen vào chat, mình sẽ điền cột 2–3 và hỏi bạn cột 4.

## AI tự review (T2, sau khi chỉnh)

| # | Điểm | Bằng chứng |
| --- | --- | --- |
| P1–P6 | 2 | Mỗi việc một commit; các quyết định về tên và locator là của bạn; AI-02 có #10 (review của bạn), #11 và #S8 |
| 5 | 2 | Bảng thử chạy trên app đang chạy, 3 trình duyệt |
| 6 | 2 | Không có XPath, `nth()` hay `first()`; dùng CSS theo `type` và lọc theo chữ của label |
| 7 | 2 | Mỗi locator dự phòng có lý do và có số liệu trong bảng thử |
| 8 | 2 | Không có `expect` trong `page-objects/` và `api/` |
| 32 (S) | 1 | Còn chờ bạn điền mục Codegen check |

**Gate: passed**

## Cần bạn quyết định

1. **Ô nhập không có accessible name: báo hay không?**
   - Không ô nào tìm không ra, nên theo tiêu chí bạn đặt thì chưa đủ để báo lỗi.
   - FR-22 không có câu nào yêu cầu label phải gắn với ô nhập. Bug sẽ phải dựa vào WCAG, mà WCAG nằm ngoài tài liệu yêu cầu.
   - Các lựa chọn:
     - (a) chỉ ghi là phát hiện testability (hiện đã ghi ở §2);
     - (b) comment vào #7. Đây là issue gần nhất: cùng ô email Bước 1, cùng nói về label, theo FR-22. Nhưng #7 nói về dấu `*`, nên sẽ trộn hai vấn đề;
     - (c) tạo issue mới với nhãn `hw: HW04`, dựa vào WCAG.
   - **Đề xuất (a).**
2. **Verdict của AI-02 #10.** Mình đề xuất đổi VALID → **INCOMPLETE**, vì kết quả T2 chỉ được chấp nhận sau khi sửa theo góp ý của bạn (tên thư mục, cách tìm ô nhập). Bạn xác nhận hoặc đổi.

## Commit (đã push)

- `f40922d` refactor (fA): split pages/ into page-objects/ and api/
- `a55ef08` refactor: name the feature folders after the features
- `171aa2e` test (forgot-password): find unnamed fields by role or by label block
- `1f80bce` docs (ai): complete Prompt009 in the prompt log
- `a3b60d7` docs (ai): add AI-02 rows for the folder renames and locator options

Prompt này (18:05) chưa vào log. Lần chạy `/logging-ai-prompts` tới sẽ thêm nó thành Prompt010, và cập nhật luôn các ghi chú "logged later" ở dòng #11 và #S8.

**Bước tiếp theo:**
1. Điền mục Codegen check.
2. Chọn quyết định 1.
3. Gửi prompt "bước T3 cho forgot-password: file dữ liệu test `data/forgot-password/`".
```

- **Used in:** `page-objects/`, `api/` (renamed from `pages/`); `features/forgot-password`, `checkout`, `product-crud` (renamed); `automation.config.json`; `page-objects/ForgotPasswordPage.ts`; `features/forgot-password/automation_design.md` §2; `skills/test-automation/` (T2 step 4, `<feature>` naming); `CLAUDE.md`, `PLAN.md`, `README.md` (AI-02 Artifact #10, #11, #S8)

---

## Prompt011 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 18:44 17/11/2026
- **Output received:** 18:47 17/11/2026
- **Feature / step:** forgot-password (fA) – T2 review: codegen check, decisions; prompt log
- **Purpose:** No issue for the unnamed fields; AI-02 review done; codegen notes; log the prompts
- **Prompt (verbatim):**

```text
- báo bug việc ô nhập ko có accessible name, chỉ ghi là đã phát hiện như phương án a mà bạn đã đề xuất
- đã check doc AI-02 và tôi ko có ý kiến gì, đánh là complete
- /logging-ai-prompts log các prompt chưa được log trong session này 
-  tôi đã run xong codegen và điền thông tin vào mục 2, bao gồm cả phần nhận xét, một số việc cụ thể cần lưu ý 
1. email field: page.getByRole('textbox') chưa đủ cụ thể. Codegen sử dụng .first() ở thao tác click nhưng không sử dụng .first() khi nhập email
2. OTP field: input[type="text"] có thể xác định OTP nếu đây là input text duy nhất, nhưng chưa chắc chắn nếu trang có nhiều input text
3. password field: input[type="password"] có thể khớp với nhiều trường mật khẩu, nên cần locator cụ thể hơn
4. lấy OTP: Code bạn gửi không có thao tác click nút này, vì vậy không thể xác định Locator được Codegen sinh ra
nếu có gì cần chỉnh sửa từ các quyết định này của tôi thì hãy bổ sung vào docs AI-02
```

- **AI output (verbatim):**

```text
Bash Show the student's edits to the codegen section
Skill
Bash Commit the student's codegen notes on their own
Bash Count page-wide textboxes on the forgot-password page
Bash Record the no-issue decision in design §2 and commit
Now the AI-02 review: mark every row as reviewed by the student, with the verdict confirmed.
Bash Inspect AI-02 verdict cells and header text
Bash Check how HW03 AI-02 recorded confirmed verdicts
Bash See HW03 verdict cell wording
Bash Print verdict and student columns of HW03 rows
Bash Preview unlogged prompts of this session
Bash Append Prompt010 and the running Prompt011 to the log
Đã thêm Prompt010 và Prompt011 vào log. Giờ mình điền các trường TODO rồi cập nhật AI-02.
Bash Fill the TODO fields of Prompt010 and Prompt011
Bash Show the remaining TODO line
Bash Read sent and received times of the new entries
Bash Fill AI-02 prompt numbers and the student's review column
Bash Adjust INCOMPLETE rows, commit log and AI-02 together
Mình đã làm xong cả 4 việc bạn dặn; mọi thứ đã commit và push, repo đồng bộ với remote.

## 1. Ô nhập không có accessible name: không báo bug

Theo phương án (a), §2 giờ ghi: "Student decision 17/11: recorded here as a testability finding only; no issue and no comment (no requirement oracle)." Commit `7ab081f`.

## 2. Review AI-02

- Mình hiểu "đánh là complete" là bạn đã review xong và đồng ý mọi verdict đề xuất, kể cả **INCOMPLETE ở #10**. Nếu ý bạn là đổi #10 sang VALID thì báo mình.
- Cột (5) của 16 dòng giờ ghi "Dùng nguyên, SV không yêu cầu sửa (SV review 17/11, Prompt011)". Các dòng INCOMPLETE thì ghi "Dùng bản đã sửa ở cột (4), SV không yêu cầu sửa thêm".
- Dòng **#11** có thêm hai quyết định của bạn, ghi là **"Chỉnh sửa do SV quyết định"**:
  - không báo bug ô không tên;
  - kết quả codegen và nhận xét của bạn về 3 ô nhập.
- §4 giờ ghi là số liệu theo verdict bạn đã xác nhận. Tổng không đổi: 19 dòng, VALID 15, INCOMPLETE 4.

## 3. Nhận xét codegen của bạn

Phần bạn điền mình commit riêng, giữ nguyên (`2ce80ad`). Mình đối chiếu với page object:

1. **Ô email.** Codegen chọn `page.getByRole('textbox')` trên cả trang và thêm `.first()` khi click.
   - Hôm nay trang này chỉ có 1 textbox (đã đếm trên Chromium và Firefox), nên `.first()` không cần. Đây lại là locator theo vị trí, skill cấm.
   - Page object chỉ tìm trong form của bước đó và kết hợp với cách tìm theo label, nên không cần `.first()`.
2. **Ô OTP và 3. ô mật khẩu.** Bạn đúng: `input[type=…]` sẽ khớp nhiều ô nếu form có thêm ô cùng loại. Ví dụ khi sửa BUG-04, form sẽ có thêm ô "Xác nhận mật khẩu mới".
   - Với `(a).or(b)` hiện tại, test khi đó sẽ **báo lỗi** chứ không gõ nhầm ô, nhưng vẫn phải sửa locator.
   - Vì vậy có quyết định 1 bên dưới.
4. **Nút "Lấy mã OTP".** Có thể lúc ghi bạn bấm Enter thay vì click, nên codegen không ghi lại nút này.
   - Locator ở bảng §2 lấy từ ARIA snapshot và đã đếm ra 1 trên 3 trình duyệt, nên không bị ảnh hưởng.
   - Cột "Same as the table above?" của dòng này nên là **N/A** (không có gì để so) thay vì "No". Bạn tự sửa nếu đồng ý.

## 4. Log prompt

Đã thêm vào [prompt_log.md](prompt_log.md), đủ các trường Feature / step, Purpose, Used in:
- **Prompt010** (gửi 18:05, nhận 18:18): đổi tên thư mục, thử các cách tìm ô nhập, khung ghi codegen.
- **Prompt011** (gửi 18:44): lượt này, ghi `UNFINISHED`. Lần chạy `/logging-ai-prompts` sau sẽ cập nhật giờ nhận và output.

Cũng trong commit log:
- Dòng #11 và #S8 của AI-02 thay "logged later" bằng Prompt010.
- Phần đầu file design ghi `Prompt009 – Prompt011 (T2)`.

| ID | Điểm | Bằng chứng |
| --- | --- | --- |
| LOG-1, 2, 3, 5, 10 | 2 | Đúng session HW04; nội dung nguyên văn do script trích; số tiếp theo là 010, 011; chỉ đọc transcript qua script |
| LOG-4 | 2 | Giờ UTC+7, chính xác đến phút |
| LOG-6 | 2 | Prompt011 có đánh dấu UNFINISHED, cần chạy lại |
| LOG-7, 8, 11 | 2 | Không còn TODO ở hai mục mới; không đòi ảnh chụp màn hình; đã commit |
| LOG-9, 12 | N/A | Không dùng tool AI khác; không có prompt nào bạn dặn không ghi log |

**Gate: passed**

## Cần bạn quyết định

1. **Locator của 3 ô nhập sau khi có nhận xét codegen**
   - Kết luận của bạn: locator chung nên thay bằng locator cụ thể. Nhưng page object vẫn còn cách chung (a) trong `(a).or(b)`.
   - Đây là quyết định của bạn vì nó thay quyết định trước ("thử mọi cách, dùng cả a và b").
   - Các lựa chọn:
     - (1) giữ `(a).or(b)`;
     - (2) chỉ dùng (b), tìm theo label. Riêng ô OTP khớp label theo phần đầu "Mã OTP", nên phần sai "(4 số)" không ảnh hưởng;
     - (3) `(a).and(b)`: ô phải đúng cả type lẫn label. Chặt nhất, nhưng hỏng khi một trong hai thay đổi.
   - **Đề xuất (2)**, vì khớp kết luận của bạn.

## Commit (đã push)

- `2ce80ad` docs (forgot-password): record the codegen check of the locators (phần bạn điền)
- `7ab081f` docs (forgot-password): record the decision on the unnamed fields
- `2bd1e44` docs (ai): log Prompt010–Prompt011 and record the AI-02 review

**Bước tiếp theo:** chọn quyết định 1. Nếu chọn (2), mình sửa page object trong một commit riêng và ghi vào AI-02. Sau đó gửi "bước T3 cho forgot-password: file dữ liệu test `data/forgot-password/`".
```

- **Used in:** `features/forgot-password/automation_design.md` §2 (decision on the unnamed fields); `AI-02_AI_Audit_Report.md` §3 column (5), Artifact #11; `prompt_log.md`

---

## Prompt012 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 18:53 17/11/2026
- **Output received:** 18:57 17/11/2026
- **Feature / step:** forgot-password (fA) – T2 locator options (pros and cons); T3 test data
- **Purpose:** Explain pros and cons of locator options (a) and (b); start T3 where the decision does not matter
- **Prompt (verbatim):**

```text
tôi cần hiểu rõ pros cons của option a và b trước khi ra quyết định
song song việc này bạn có thể bắt đầu thực hiện bước T3, những việc ko bị quyết định ảnh hưởng
```

- **AI output (verbatim):**

```text
Bash Check status and read design header and §1
Bash Read design §3 template and FR-01/FR-03 requirement text
Bash Read key HW02 test case rows for FR-03
Bash Read HW02 fixtures and assumptions for FR-03
Bash Find the HW02 assumption definitions A1–A17
Mình đang soạn file dữ liệu T3 từ các TC của HW02. Trước hết cần kiểm tra backend chấp nhận định dạng email nào khi đăng ký tài khoản riêng cho từng test.
Bash Check backend register validation and templates
Bash Read API spec for login, forgot and reset password
Đã đọc xong các TC và tài liệu yêu cầu. Giờ mình viết các file dữ liệu.
Bash Write the Web and API test data files for FR-03
Bash Cross-check data rows against the T1 selection table
Bash Check HW02 BVA-01 and BVA-03 inputs
Bash Write design §3 and commit the data files
Bash Mark the per-test account change as proposed and commit
Now the AI-02 row for T3.
Bash Add AI-02 row #12 and check the prompt time
Bash Fix prompt time in AI-02 row and commit
Bạn cần hiểu rõ ưu nhược của (a) và (b) trước khi quyết. Phần đó ở mục 1, kèm các tình huống cụ thể của app này. Song song, mình đã làm xong bước T3, vì phần dữ liệu không phụ thuộc vào cách chọn locator. Mọi thứ đã commit và push.

## 1. So sánh (a) và (b) cho 3 ô nhập không có tên

**(a) Tìm theo role / type trong form**, ví dụ `form.getByRole('textbox')`, `input[type="password"]`. Đây cũng là kiểu locator mà codegen sinh ra.

| Ưu | Nhược |
| --- | --- |
| Không phụ thuộc chữ của label, nên vẫn chạy khi label đổi chữ | Phụ thuộc vào **số ô cùng loại** trong form. Thêm một ô cùng type là ra 2 kết quả. Trang Đăng nhập đã bị như vậy |
| Ngắn, đơn giản | Đọc code không biết đang nói tới ô nào ("ô text duy nhất" chứ không phải "ô OTP"); đây đúng là nhận xét codegen của bạn |
| | Hỏng nếu đổi type, ví dụ ô OTP chuyển sang `type="number"` |

**(b) Tìm theo khối chứa label**: tìm `div` có chữ label rồi lấy ô nhập bên trong.

| Ưu | Nhược |
| --- | --- |
| Chỉ đúng ô người dùng nhìn thấy, đọc là hiểu, gần với `getByLabel` | Phụ thuộc **chữ của label**. Hiện mình khớp nguyên văn, nên đổi một ký tự là hỏng |
| Thêm ô khác cùng type không ảnh hưởng, vì ô xác nhận có label khác | Phụ thuộc **cấu trúc HTML**: label và ô nhập phải nằm chung một `div` |
| | Code dài hơn, cần thêm một hàm phụ |

**Khi app thay đổi (nếu các bug HW02 được sửa):**

| Thay đổi | (a) | (b) khớp nguyên văn | (b) khớp phần đầu label | `(a).or(b)` hiện tại |
| --- | --- | --- | --- | --- |
| Sửa BUG-03: label thành "Mã OTP (6 số)" | ✓ | ✗ | ✓ (`/^Mã OTP/`) | ✓ |
| Sửa BUG-07: thêm `*` vào label email | ✓ | ✗ | ✓ | ✓ |
| Sửa BUG-04: thêm ô "Xác nhận mật khẩu mới" | ✗ (ra 2 kết quả) | ✓ | ✓ | ✗ (báo lỗi, không gõ nhầm) |
| Gắn label vào ô (`for`/`id`) | ✓ | ✓ | ✓ | ✓ |
| Đổi bố cục, label ra ngoài `div` | ✓ | ✗ | ✗ | ✓ |

**Tóm lại:**
- (a) chịu được việc đổi chữ, nhưng không chịu được việc thêm ô cùng loại.
- (b) thì ngược lại.
- `.or()` gom các cách lại nhưng mang theo điểm yếu của (a): thêm ô cùng loại là báo lỗi.
- (b) khớp **phần đầu** của label là lựa chọn chịu được nhiều thay đổi nhất trong bảng, và khớp kết luận codegen của bạn ("thay locator chung bằng locator cụ thể").

Trong lúc làm bài, SUT không thay đổi nên lựa chọn nào cũng chạy được. Đây là quyết định về khả năng bảo trì và về điều bạn sẽ viết trong báo cáo.

## 2. Bước T3 – forgot-password: dữ liệu test

Lúc bắt đầu, bước T2 đã commit hết.

| File | Số dòng | Nội dung |
| --- | --- | --- |
| [web.json](data/forgot-password/web.json) | 30 | Các TC Web, gồm cả 7 TC OTP chạy Web rồi gửi cùng OTP qua API |
| [api.json](data/forgot-password/api.json) | 3 | DT-17, DT-27, DT-32 |

- **Mỗi dòng gồm:**
  - `flow`: luồng spec sẽ chạy, ví dụ `reset`, `requestOnly`, `otpWebThenApi`;
  - giá trị nhập của TC HW02;
  - `expected`: `success` / `error` / `blocked` cùng các kiểm tra của TC, ví dụ lỗi hiện trên nút submit, mật khẩu cũ còn đăng nhập được;
  - `source`: trích FR-03, FR-01, FR-22, SEC-07, API spec và các giả định A1–A17.
- **Không kiểm câu chữ thông báo**, vì tài liệu yêu cầu không có câu nào, và A1/A5/A6 nói chỉ ghi lại, không chấm.
- **Đã kiểm bằng script:** ID của 33 dòng khớp đủ 33 TC "Yes" của §1, và giá trị nhập khớp cột Input.
- **Dữ liệu không đụng nhau:** mỗi test tự đăng ký một tài khoản qua API, email dạng `fr03.{id}.{run}@example.com`.
  - Vì vậy không test nào dùng chung tài khoản, cũng không dùng lại tài khoản của lần chạy trước.
  - Tài khoản seed `test@eshop.com` không bị đổi mật khẩu, nên không cần khôi phục.

Mô tả các cột và hai giá trị `<CONFIRM>` nằm ở §3 của [automation_design.md](features/forgot-password/automation_design.md).

**AI tự review**

| # | Điểm | Bằng chứng |
| --- | --- | --- |
| P1–P6 | 2 | Bước T2 đã commit trước khi làm; data một commit; AI-02 #12 commit riêng; mọi đề xuất có ghi `(proposed)` |
| 9 | 2 | Dữ liệu chỉ nằm trong 2 file JSON; chưa có spec nào nên không có dữ liệu viết thẳng trong code |
| 10 | 2 | Mọi dòng có `source`; giá trị nhập khớp §1; những gì tài liệu không ghi là `<CONFIRM>` |
| 11 | 2 | Mỗi test một tài khoản, tên có thời điểm chạy; lần chạy chính thức dùng server mới (đã ghi ở §3) |

**Gate: passed** (2 mục `<CONFIRM>` chờ bạn).

## Cần bạn quyết định

1. **Locator của 3 ô nhập** (mục 1)
   - (1) Giữ `(a).or(b)`.
   - (2) Chỉ dùng (b), khớp phần đầu label: `/^Nhập Email/`, `/^Mã OTP/`, `/^Mật khẩu mới/`.
   - (3) `(a).and(b)`.
   - **Đề xuất (2).**
2. **`<CONFIRM>` URL trang đăng nhập (DT-03)**
   - FR-03 chỉ nói nút đưa về trang đăng nhập, không ghi URL.
   - **Đề xuất:** nhận ra trang đăng nhập bằng nút "Sign In" cộng đường dẫn `/login`. `/login` là đường dẫn của link "Đăng nhập" trong app, không có trong tài liệu yêu cầu.
3. **`<CONFIRM>` mã trạng thái API**
   - API spec không ghi kết quả trả về của `/api/reset-password`.
   - **Đề xuất:** chấp nhận = `200`, từ chối = mọi mã `4xx`.
   - Phép kiểm chính vẫn là đăng nhập lại (A5/A6). Vì vậy nếu chỉ sai mã trạng thái thì không báo là lỗi.
4. **Mỗi test một tài khoản riêng thay vì `test@eshop.com`**
   - Vẫn cùng phân hoạch "email đã đăng ký", và giữ các test độc lập với nhau.
   - **Đề xuất: đồng ý.**

**Báo trước cho T4:** dữ liệu điền ô xác nhận đúng như TC ("new = confirm"). Nhưng app không có ô này (BUG-04), nên mọi test Web có Bước 2 sẽ fail ở chỗ điền ô xác nhận. Mình sẽ đưa ra các lựa chọn xử lý ở T4.

## Commit (đã push)

- `9d9e21c` test (forgot-password): move test data to data/forgot-password/
- `97243ab` docs (forgot-password): mark the account change of the test data as proposed
- `b24d870` docs (ai): add AI-02 row for the FR-03 test data

Prompt này (gửi 18:53) sẽ vào log ở lần chạy `/logging-ai-prompts` tới.

**Bước tiếp theo:** trả lời 4 quyết định trên. Mình sẽ cập nhật page object và các mục `<CONFIRM>`. Sau đó gửi "bước T4 cho forgot-password: sinh spec data-driven".
```

- **Used in:** `data/forgot-password/web.json`, `api.json`; `features/forgot-password/automation_design.md` §2 (pros and cons), §3 (AI-02 Artifact #12)

---

## Prompt013 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 19:02 17/11/2026
- **Output received:** 19:05 17/11/2026
- **Feature / step:** forgot-password (fA) – T2 locator decision; T3 confirmations; prompt log; docs
- **Purpose:** Apply locator option (2); confirm DT-03 login page and API status; explain how new accounts are made; log prompts; update docs
- **Prompt (verbatim):**

```text
1. thực hiện theo phương án 2 cho câu hỏi trước đó
2,3. tôi đồng ý với các đề xuất của bạn
4. vậy thì bạn tạo ra các tài khoản mới khác nhau bằng cách nào? vì hiện tại chỉ có 1 tài khoản test@eshop.com
/logging-ai-prompts log các prompt chưa được cập nhật trong session này
cập nhật các docs, báo cáo liên quan
```

- **AI output (verbatim):**

```text
Skill
Đầu tiên mình đổi locator của 3 ô nhập sang phương án (2): chỉ tìm theo label, khớp phần đầu.
Bash Switch the three unnamed fields to label-prefix locators
Bash Verify the new locators on three browsers with a throw-away spec
Kiểm tra trên 3 trình duyệt đều ra 1 kết quả cho mỗi ô. Giờ mình cập nhật bảng §2.
Bash Update design §2 rows and result, commit locator change
Tiếp theo là hai mục `<CONFIRM>` bạn đã đồng ý, và chạy thử cách tạo tài khoản mới để trả lời câu hỏi 4.
Bash Resolve CONFIRM items and demo registering a fresh account
Bash Document account creation and commit the confirmed expectations
Giờ mình cập nhật các tài liệu liên quan: PLAN, README, báo cáo.
Bash Read PLAN feature A tasks and progress mentions in README and report
Bash Read README summary table and report section 3
Bash Tick A1–A3 in PLAN and fill report §3.1, then commit
Đã xong các tài liệu. Giờ đến phần log prompt.
Bash Write pending prompts to the log and show their fields
Bash Fill log fields, update AI-02 and design header, commit
Mình đã làm xong cả 5 việc. Còn mục 4 (mỗi test một tài khoản mới) chờ bạn xác nhận sau khi đọc giải thích bên dưới. Mọi thứ đã commit và push.

## 1. Locator theo phương án (2)

- Page object giờ tìm 4 ô nhập bằng **khối có label bắt đầu bằng tên ô**: `/^Nhập Email/`, `/^Mã OTP/`, `/^Mật khẩu mới/` và `/^Xác nhận mật khẩu mới/`.
- Ô xác nhận cũng đổi sang cách này. Nếu sau này app thêm ô xác nhận mà label vẫn không gắn với ô (giống các ô khác), test vẫn tìm được, nên không báo nhầm BUG-04.
- Đã bỏ `(a).or(b)`.
- Mình chạy thử trên 3 trình duyệt: email, OTP và mật khẩu mới mỗi ô ra đúng 1 kết quả và gõ được; ô xác nhận ra 0 vì app chưa có (BUG-04).
- §2 có thêm đoạn tóm tắt ưu nhược của (a)/(b) và ghi quyết định của bạn.

## 2–3. Hai giá trị `<CONFIRM>` đã chốt theo đề xuất

- **DT-03:** nhận ra trang đăng nhập bằng nút "Sign In" và đường dẫn `/login`.
- **API:** chấp nhận = `200`, từ chối = mọi mã `4xx`. Phép kiểm chính vẫn là đăng nhập lại.

§3 giờ không còn `<CONFIRM>` nào.

## 4. Tạo tài khoản mới bằng cách nào?

Tài khoản seed chỉ có `test@eshop.com`, nhưng app có API đăng ký `POST /api/register` (API spec §1.1). HW02 cũng đã dùng nó để tạo `fr03.other@…` và `fr03.same@…` (fixture F2, F3).

Trước mỗi test, spec sẽ gọi `register(name, email, password)` trong [api/EshopApi.ts](api/EshopApi.ts):
- Email ghép từ ID của test và thời điểm chạy, ví dụ `fr03.dt-20.20261117t1903@example.com`.
- Mật khẩu lấy từ cột `account.password` trong file dữ liệu.

Backend chỉ kiểm tra email chưa bị dùng, nên mỗi email mới đều đăng ký được.

**Chạy thử trên SUT đang chạy (19:03):**

| Bước | Kết quả |
| --- | --- |
| Đăng ký `fr03.demo.20261117t1903@example.com` | `200` "User registered successfully" |
| Đăng nhập bằng `Test1234!` | `200`, có `token` |
| Lấy OTP | `200`, `resetToken` "4326" |

Các tài khoản này chỉ tồn tại đến lần khởi động server sau, vì database được tạo lại mỗi lần khởi động.

Cách làm và kết quả chạy thử đã ghi ở §3 của [automation_design.md](features/forgot-password/automation_design.md). Mục này vẫn đánh dấu `(proposed)` cho tới khi bạn đồng ý.

## Cập nhật tài liệu

- [PLAN.md](PLAN.md): đánh dấu xong A1–A3, mỗi bước có một dòng tóm tắt.
- [HW04_Report.md](HW04_Report.md) §3.1: đã điền phần chọn TC, locator/page object, dữ liệu test. Phần assertion pattern để sau T4.
- `README.md`: bảng số liệu giữ trống tới lần chạy chính thức, vì phải lấy từ `npm run summary`.
- **AI-02:**
  - #12: thêm review của bạn (đồng ý 2 giá trị `<CONFIRM>`, câu hỏi về tài khoản);
  - thêm #13, ghi là "Chỉnh sửa do SV quyết định";
  - tổng: 21 dòng, VALID 17, INCOMPLETE 4.

## Log prompt

- **Prompt011:** đã cập nhật giờ nhận (18:47).
- **Prompt012** (18:53 → 18:57): ưu nhược (a)/(b) và bước T3.
- **Prompt013** (19:02): lượt này, ghi `UNFINISHED`. Lần chạy `/logging-ai-prompts` sau sẽ cập nhật.
- Các trường Feature / step, Purpose, Used in đã điền đủ. Dòng #12 của AI-02 đã thay "logged later" bằng Prompt012.

| ID | Điểm | Bằng chứng |
| --- | --- | --- |
| LOG-1, 2, 3, 5, 10 | 2 | Đúng session HW04; nội dung nguyên văn do script trích; số tiếp theo là 012, 013; chỉ đọc transcript qua script |
| LOG-4 | 2 | Giờ UTC+7, chính xác đến phút |
| LOG-6 | 2 | Prompt013 có đánh dấu UNFINISHED |
| LOG-7, 8, 11 | 2 | Không còn TODO; không đòi ảnh chụp màn hình; đã commit |
| LOG-9, 12 | N/A | Không dùng tool AI khác; không có prompt nào bạn dặn không ghi log |

**Gate: passed**

## Commit (đã push)

- `11a7b90` test (forgot-password): find unnamed fields by label prefix only
- `72f9719` test (forgot-password): confirm the login page and API status expectations
- `0528003` docs: record FR-03 steps T1–T3 in the plan and report
- `9f0b60e` docs (ai): log Prompt011–Prompt013 and add AI-02 rows for the T2 decision and T3 confirmations

**Bước tiếp theo:**
1. Xác nhận mục 4.
2. Gửi "bước T4 cho forgot-password: sinh spec data-driven".

Ở T4 mình sẽ đưa ra các lựa chọn cho vấn đề ô xác nhận không tồn tại (BUG-04). Vấn đề này làm mọi test Web có Bước 2 fail ở cùng một chỗ.
```

- **Used in:** `page-objects/ForgotPasswordPage.ts`; `features/forgot-password/automation_design.md` §2, §3; `data/forgot-password/*.json`; `PLAN.md` A1–A3; `HW04_Report.md` §3.1; `AI-02_AI_Audit_Report.md` (Artifact #12, #13); `prompt_log.md`

---

## Prompt014 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 19:12 17/11/2026
- **Output received:** 19:17 17/11/2026
- **Feature / step:** forgot-password (fA) – T4 generate the Web spec
- **Purpose:** Confirm one new account per test; confirm-field choice (BUG-04); generate the data-driven Web spec
- **Prompt (verbatim):**

```text
tôi đồng ý với phương án của bạn ở mục 4
tiếp tục bước T4
```

- **AI output (verbatim):**

```text
AskUserQuestion
Bạn chọn: chỉ điền ô xác nhận ở các TC kiểm ô này. Mình xem lại API client và config trước khi sinh spec.
Bash Read API client, Playwright config and smoke spec
Đầu tiên mình ghi hai quyết định về dữ liệu (cờ `fillConfirm`, tài khoản riêng đã được xác nhận) vào file dữ liệu và §3.
Bash Add fillConfirm flag and record data decisions in §3
Giờ mình sinh spec Web. Theo skill, mỗi prompt sinh một file spec, nên spec API sẽ làm ở prompt sau.
Bash Add the email label locator and back-to-login action to the page object
Write /home/hg/source/software-testing/week04/tests/forgot-password/web.spec.ts
Trước khi commit, mình kiểm tra cú pháp layout selector `:above()` dùng cho phép kiểm "lỗi hiện phía trên nút submit".
Bash Check the :above layout selector parses and matches
Bash Use a layout-selector error check and 4xx for refused logins
Bash Fix the login status check and list the generated tests
Spec liệt kê đủ 30 test × 3 trình duyệt. Giờ mình ghi §4.
Bash Read the §4 section and its template
Bash Write design §4 and update the pattern count
Bash Get the sent time of the current prompt
Bash Check which transcript is this session and list its pending prompts
Bash Commit the generated Web spec with design §4
Giờ đến AI-02. Mình đọc lại bảng trước, phòng khi session kia đã thêm dòng.
Bash Re-read AI-02 row list and totals before editing
Bash Read the Artifact #14 row added by the other session
Bash Add AI-02 row #15 and recount totals from the table
Bash Commit and push the AI-02 row
Mình đã sinh xong spec Web cho FR-03 (30 test × 3 trình duyệt) nhưng **chưa chạy thử**; mới chạy `--list` để kiểm tra tiêu đề. Spec API sẽ làm ở prompt sau, vì skill quy định mỗi prompt sinh một file spec. Mọi thứ đã commit và push.

**Lưu ý: có một session khác đang chạy song song cho feature B** (đã commit `77671ac` và thêm dòng AI-02 #14), dùng chung thư mục `week04`. Vì vậy:
- Mình chỉ commit file của mình, theo đúng đường dẫn.
- Đọc lại AI-02 trước khi sửa, nên dòng của mình là **#15**.
- Số liệu §4 của AI-02 giờ đếm lại từ bảng (23 dòng, VALID 19, INCOMPLETE 4), nên không bị cộng trùng khi hai session cùng cập nhật.

## Quyết định đã ghi (trước khi sinh spec)

- **Ô xác nhận (BUG-04):** chỉ DT-01 và DT-28 … 30 điền ô này. `web.json` có thêm cờ `fillConfirm`, và §3 ghi lý do khác với TC.
- **Mỗi test một tài khoản mới:** bạn đã đồng ý, §3 bỏ `(proposed)`.
  - Mình thêm tên trình duyệt vào `{run}`, ví dụ `20261117t191200.chromium`.
  - Lý do: một lệnh có thể chạy cả 3 trình duyệt trên cùng một database, nên chỉ dùng thời điểm thì email sẽ trùng.

## Bước T4 – spec Web

[tests/forgot-password/web.spec.ts](tests/forgot-password/web.spec.ts) đọc `web.json`, sinh một test cho mỗi dòng, tiêu đề dạng `DT-20 – password shorter than 8 characters`, nhóm theo `flow`:

| Flow | TC | Spec làm gì |
| --- | --- | --- |
| `reset` | DT-01, 04, 05, 20–26, 28–30, 35, BVA-03–05 | Bước 1 → Bước 2 → kiểm lỗi FR-22 (với case sai) → đăng nhập qua API bằng mật khẩu cũ / mới |
| `otpFormat` | DT-02 | Xin 3 OTP qua "← Quay lại": mỗi mã 6 chữ số, không phải cả 3 giống nhau |
| `backToLogin` | DT-03 | Chỉ báo bước → bấm "Quay lại đăng nhập" → URL `/login` và nút "Sign In" |
| `retryAfterError` | DT-06 | Mật khẩu sai bị từ chối, sau đó dùng lại cùng OTP với mật khẩu đúng thì đổi được |
| `requestOnly` | DT-07, 08, 09 | Không hiện OTP, vẫn ở Bước 1 |
| `otpWebThenApi` | DT-11–15, BVA-01, 02 | Phần Web, rồi gửi cùng OTP qua API → `4xx`, mật khẩu cũ vẫn đăng nhập được |

**8 kiểu assertion**, chi tiết từng test ở §4:
1. kết quả đã lưu (đăng nhập qua API bằng `expect.poll`);
2. soft assertion;
3. chữ hiển thị;
4. trạng thái phần tử;
5. định dạng giá trị;
6. URL;
7. phủ định;
8. mã trạng thái API.

**Ghi chú về cách viết:**
- Lỗi FR-22 được kiểm bằng `[role="alert"]` nằm phía trên nút submit. Phép này là soft, nên test vẫn chạy tiếp tới bước kiểm mật khẩu.
- Câu chữ của hộp thoại `alert` được ghi vào annotation của report, không chấm (A1/A5/A6).
- Page object có thêm `emailLabel` (dùng để kiểm dấu `*`) và `backToLogin()`.

**AI tự review (T4)**

| # | Điểm | Bằng chứng |
| --- | --- | --- |
| P1–P6 | 2 | Bước T3 đã commit trước; quyết định dữ liệu commit riêng (`4433532`), spec commit riêng (`d438b99`), AI-02 #15 commit riêng (`d575517`) |
| 12 | 2 | Một vòng lặp qua dữ liệu cho mỗi flow; mọi tiêu đề bắt đầu bằng TC ID (`--list`: 30 test) |
| 13 | 2 | Có 8 kiểu assertion, mức tối thiểu là 3 |
| 14 | 2 | Assertion web-first, có `expect.poll`; không có `waitForTimeout`, `try/catch`; chỉ rẽ nhánh theo dữ liệu, không theo trạng thái trang |
| 15 | 2 | Mỗi test tự tạo tài khoản, không phụ thuộc thứ tự |
| 16 | 2 | Commit `d438b99` là code đúng như lúc sinh ra, chưa chạy, chưa sửa |

**Gate: passed**

**Mình đã thấy trước 3 chỗ có thể sai.** Theo skill, T4 không sửa gì, nên mình ghi lại để T5 kiểm khi chạy thật:
1. DT-07 … 09 kiểm "không hiện OTP" ngay sau khi bấm nút. Phép kiểm có thể pass trước khi server kịp trả lời (lỗi chờ không ổn định).
2. Các phần tử app không có (ô xác nhận, nút "Quay lại đăng nhập") sẽ chờ hết thời gian test là 30 giây mới fail. Chạy chậm nhưng vẫn đúng.
3. `[role="alert"]` chặt hơn FR-22. FR-22 chỉ nói lỗi phải hiện phía trên nút submit, không nói phải có role `alert`. Có thể là oracle sai; bạn quyết ở T5.

## Commit (đã push)

- `4433532` test (forgot-password): fill the confirm field only where the test case checks it
- `d438b99` test (forgot-password): generate the data-driven Web spec
- `d575517` docs (ai): add AI-02 row for the FR-03 Web spec

Prompt này (19:12) chưa vào log. Dòng #15 đang ghi "logged later"; lần chạy `/logging-ai-prompts` tới sẽ điền số prompt.

**Bước tiếp theo:** gửi "bước T4 cho forgot-password: sinh spec API" (DT-17, DT-27, DT-32). Sau đó là T5: chạy trên Chromium, review và sửa.
```

- **Used in:** `data/forgot-password/web.json` (`fillConfirm`); `tests/forgot-password/web.spec.ts`; `page-objects/ForgotPasswordPage.ts` (`emailLabel`, `backToLogin()`); `features/forgot-password/automation_design.md` §3, §4 (AI-02 Artifact #15)

---

## Prompt015 – Claude Code (claude-opus-5-5)

- **Prompt sent:** 19:21 17/11/2026
- **Output received:** 19:36 17/11/2026 (UNFINISHED – run the skill again after this turn to complete)
- **Feature / step:** forgot-password (fA) – T4 generate the API spec; T5 first Chromium run and review; prompt log
- **Purpose:** Log the prompts; generate the API spec; run FR-03 on Chromium
- **Prompt (verbatim):**

```text
/logging-ai-prompts log các prompt chưa được log trong session này
thực hiện các bước tiếp theo, cả gửi bước T4 cho forgot-passwword sinh spec API và cả chạy trên chrominum
```

- **AI output (verbatim):**

```text
Mình làm theo thứ tự: sinh spec API (bước T4), chạy cả FR-03 trên Chromium, rồi ghi log prompt ở cuối. Trước hết kiểm tra trạng thái repo, vì session của feature B vẫn đang chạy song song.
Bash Check repo state and read the API data file
Write /home/hg/source/software-testing/week04/tests/forgot-password/api.spec.ts
Bash List the API tests and add the API spec to design §4
Bash Get sent times of this session's pending prompts
Bash Commit the generated API spec
Đã commit spec API. Giờ chạy cả FR-03 trên Chromium, dùng lại các server đang chạy.
Bash Run the FR-03 specs on Chromium and list results
6 test pass, 27 test fail. Mình đọc lỗi của từng test từ `results.json`.
Bash Summarise each test's errors and dialog text from the JSON results
Bash Summarise each test's errors and dialog text
Bash Inspect the JSON results file
Có vẻ session kia đã ghi đè `playwright-report/`, vì hai session dùng chung thư mục này. Mình chạy lại với thư mục report riêng trong scratchpad.
Bash Re-run FR-03 on Chromium with a private report folder
Bash Extract each failing test's error messages from the run output
Đã có kết quả của từng test. Tiếp theo, theo bước T5, mình chạy 6 test pass mỗi test 3 lần (`--repeat-each=3`) để xem có ổn định không.
Bash Repeat the six passing tests three times on Chromium
Bash Check whether the negative assertions catch a shown OTP
Bash Run DT-05, DT-09, DT-35 with a JSON report and show their dialogs
Bash Check status and the §5 template
Kết quả lần chạy đã rõ. Mình ghi vào §5: kết quả, nguyên nhân của từng test fail, và các chỗ cần sửa (đề xuất, chưa sửa).
Bash Write §5 run results and review findings, then commit
Bash Check whether my commit landed
Bash Check sync with the remote
Commit `522ec78` của mình đã lên remote; ngay sau đó session kia commit `63e6e8c` (chưa push). Giờ mình thêm dòng AI-02, đọc lại bảng trước.
Bash Re-read the last AI-02 rows
Bash Add AI-02 row #16 with recounted totals and commit
```

- **Used in:** `tests/forgot-password/api.spec.ts`; `features/forgot-password/automation_design.md` §4, §5 (AI-02 Artifact #16); `prompt_log.md`

---
