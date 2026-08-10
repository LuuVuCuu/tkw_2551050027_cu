# Starter Buổi 1 — Vựa

Môn **Thực hành Thiết kế Web** · Trường Đại Học Mở TPHCM, Khoa CNTT

Đây là **kết quả của Buổi 1**, dùng làm điểm xuất phát cho Buổi 2.
Dự án: **Vựa** — phần mềm quản lý vựa nông sản.

---

## 1. Chạy dự án

```bash
npm install
npm run dev
```

Mở `index.html` bằng **Live Server** của VS Code. Đừng nháy đúp vào file: từ buổi 5 trở đi trang cần đọc dữ liệu qua HTTP.

**Để nguyên terminal đang chạy `npm run dev` suốt buổi.** Đây là lỗi số một: tắt terminal, sửa HTML, thấy không đổi gì, rồi kết luận Tailwind hỏng.

Kiểm tra nhanh xem đã chạy đúng chưa: mở `src/input.css`, đổi `--color-brand-600` sang màu bất kỳ, lưu lại. Navbar và các nút phải đổi màu ngay.

---

## 2. Trong này đã có sẵn gì

| Phần | Trạng thái |
|---|---|
| Cấu hình Tailwind v4, script `dev` / `build` | Xong |
| `src/input.css` — 20 design token, lớp base, 8 component | Xong |
| Khung HTML semantic đầy đủ | Xong |
| Navbar, kể cả markup menu mobile | Xong, đã style |
| Hero + khối đặc trưng "phiếu cân" | Xong, đã style |
| Nội dung chữ thật cho mọi section | Xong |
| 8 section còn lại | **Chỉ có khung, chưa có class bố cục** |
| `data/records.json` — 30 phiếu cân mẫu | Có sẵn, buổi 5 mới dùng |
| Thư mục `js/` | Trống, buổi 4 mới dùng |

---

## 3. Việc của bạn ở Buổi 2

Mở `index.html`, cuộn xuống dòng đánh dấu:

```
############ TỪ ĐÂY TRỞ XUỐNG LÀ PHẦN VIỆC CỦA BUỔI 2 ############
```

Mỗi section bên dưới có một khối chú thích ghi rõ tiết nào làm và gợi ý class cần dùng.

**Ba quy tắc khi làm:**

1. **Chỉ thêm class, không xóa thẻ.** Khung semantic đã đúng rồi. Đổi `<blockquote>` thành `<div>` là mất điểm phần accessibility.
2. **Không đổi thứ bậc heading.** Trang có đúng một `<h1>`; mọi section dùng `<h2>`, mọi thẻ con dùng `<h3>`.
3. **Mọi khoảng cách phải nằm trong scale.** Viết `p-[13px]` là sai; chọn `p-3` hoặc `p-4` rồi ghi lại lý do.

Thứ tự làm theo đúng phiếu Buổi 2:

| Tiết | Section |
|---|---|
| 2 | Dải khách hàng, lưới tính năng |
| 3 | Số liệu, cảm nhận |
| 4 | Bảng giá — ba thẻ cao bằng nhau (phần khó nhất) |
| 5 | Câu hỏi thường gặp, CTA, footer, rà nhịp toàn trang |

Section **Cách hoạt động** chính là phần "thêm một section không có trong Figma" của bài tập về nhà. Nội dung mẫu đã có sẵn để tham khảo; bạn có thể giữ, sửa, hoặc thay bằng ý tưởng khác.

---

## 4. Nếu bạn làm sản phẩm khác

Starter này dùng đề "Vựa" làm ví dụ chung của lớp. Nếu nhóm bạn được giao chủ đề khác, cần đổi ba thứ — tìm bằng cách gõ `TODO` trong VS Code:

1. `src/input.css` — thay bộ token màu và phông theo bảng bạn đã đọc từ Figma.
2. `index.html` — thay `<title>`, `<meta name="description">`, tên thương hiệu và toàn bộ nội dung chữ.
3. Khối đặc trưng `.ticket` — sản phẩm của bạn nên có **một** chi tiết hình ảnh riêng, và chỉ một. Cả trang còn lại giữ kỷ luật.

> Chữ chung chung là dấu hiệu chưa xác định được người dùng của mình là ai. So sánh: *"Giải pháp quản lý toàn diện cho doanh nghiệp"* và *"Cân xong là có phiếu. Cuối ngày là có sổ."*

---

## 5. Cấu trúc thư mục

```
index.html          Trang chính
src/input.css       Design token + component  ← sửa màu/phông ở đây
dist/output.css     File Tailwind build ra — KHÔNG sửa tay
js/                 Trống, buổi 4 dùng
data/records.json   30 phiếu cân mẫu, buổi 5 dùng
assets/img/         Ảnh của bạn
assets/icons/       Icon SVG export từ Figma
```

---

## 6. Checklist Buổi 2

Đạt đủ các mục sau mới coi như xong buổi:

- ☐ Đủ 10 section có bố cục, khớp Figma ở màn hình từ 1280px
- ☐ Không dùng `absolute` để xếp bố cục chính (chỉ cho badge)
- ☐ Không có giá trị spacing tùy ý ngoài scale
- ☐ Khoảng cách dùng `gap`, không dùng `margin` trên từng phần tử con
- ☐ Ba thẻ bảng giá cao bằng nhau, ba nút thẳng hàng
- ☐ Cảm nhận giữ `<figure>` / `<blockquote>` / `<cite>`; số liệu giữ `<dl>`
- ☐ Mọi SVG trang trí có `aria-hidden="true"`
- ☐ Ít nhất 4 commit, có tag `buoi-2`

```bash
git add -A
git commit -m "feat(layout): dung bang gia va footer"
git tag buoi-2
```
