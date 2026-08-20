# EngGo 

Môn **Thực hành Thiết kế Web** · Trường Đại Học Mở TPHCM, Khoa CNTT

Dự án: **EngGo** — ứng dụng học tiếng Anh 20 phút mỗi ngày.
## 1. Chạy dự án

```bash
npm install
npm run dev        # Tailwind watch — phải chạy trong suốt lúc sửa giao diện
```

Mở `index.html` bằng **Live Server** của VS Code. Đừng nháy đúp vào file
(module ES không chạy qua `file://`).

`dist/output.css` đã build sẵn (`npm run build`) nên trang hiện đúng ngay cả khi
chưa cài gì.

---

| # | Tính năng | File | Ghi chú kỹ thuật |
|---|---|---|---|
| 1 | Menu mobile | `js/nav.js` — `initNav` | một hàm `setOpen()` chạm đủ 4 thứ: class `hidden`, `aria-expanded`, `aria-label`, khoá cuộn nền. Đóng bằng ESC (trả tiêu điểm về nút), bấm ra ngoài header, hoặc khi màn hình lên ≥1024px |
| 2 | Navbar khi cuộn | `js/nav.js` — `initHeaderOnScroll` | `IntersectionObserver` theo dõi `#nav-sentinel`, không dùng sự kiện `scroll` |
| 3 | Accordion FAQ | `js/faq.js` | một listener cho cả nhóm (event delegation) + `closest()`; mỗi lúc chỉ mở một mục; có phím ↑ ↓ Home End |
| 4 | Sáng / tối | `js/theme.js` + script inline trong `<head>` của cả 3 trang | script inline chạy trước khi vẽ `<body>` nên không nháy trắng; nút mang `aria-pressed`; nhớ lựa chọn trong `localStorage["theme"]`; chỉ nghe hệ điều hành khi người dùng chưa tự chọn |
| 5 | Giá Tháng / Năm | `js/pricing.js` | số tiền nằm ở `data-monthly` / `data-yearly` trong HTML, định dạng bằng `Intl.NumberFormat("vi-VN")`; trạng thái ở `aria-checked`, chạy được cả bằng Space và Enter |
| 6 | Slider cảm nhận | `js/slider.js` | tự viết: `translateX`, chấm chỉ dẫn sinh bằng JS, slide ẩn có `inert` + `aria-hidden`, tự chạy 6s nhưng dừng khi hover / focus / đổi tab, luôn `clearInterval` trước khi đặt bộ đếm mới |
| 7 | Lộ dần khi cuộn | `js/reveal.js` | `IntersectionObserver` `threshold: 0.15`, hiện xong thì `unobserve` |
| + | Nút lên đầu trang | `js/nav.js` — `initToTop` | hiện sau khi cuộn quá 400px (`rootMargin`), cuộn mượt và trả tiêu điểm về đầu trang |

Ba trang dùng chung một `main.js`, nên mỗi hàm `init*` đều bắt đầu bằng
`if (!el) return;` — trang liên hệ không có bảng giá hay slider vẫn không lỗi.

**Tôn trọng `prefers-reduced-motion`:** hiệu ứng lộ dần hiện thẳng, slider không
tự chạy, nút lên đầu trang nhảy thay vì cuộn mượt.

---

## 3. Nội dung đã đổi sang chủ đề tiếng Anh

Giữ nguyên mọi `id` và `data-*` (chúng là tên **vai trò**, không phải tên sản phẩm),
chỉ đổi phần chữ:

| Starter (Vựa) | Bài này (EngGo) |
|---|---|
| Phần mềm quản lý vựa nông sản | Ứng dụng học tiếng Anh mỗi ngày |
| Phiếu cân, lô hàng, công nợ thương lái | Buổi học, lộ trình, tiến độ và sổ từ vựng |
| Gói Vựa nhỏ / Vựa vừa / Chuỗi kho | Gói Tự học / Gia đình / Trung tâm |
| 390.000 ₫ · 890.000 ₫ · 1.990.000 ₫ | 149.000 ₫ · 299.000 ₫ · 899.000 ₫ (trả năm bớt 20%) |
| 5 câu FAQ về vựa | 5 câu FAQ về việc học: học offline, mất gốc, mỗi ngày bao lâu, ngừng gói, luyện IELTS/TOEIC |
| 3 cảm nhận của chủ vựa | 3 cảm nhận của học viên và phụ huynh |
| `data/records.json` — 30 phiếu cân | 30 buổi học mẫu (`student`, `skill`, `status`, `minutes`, `score`, `date`) — dùng ở buổi 5 |

---

## 4. Tự kiểm

```bash
cp -r ../../../ThucHanh/labs/kiem-tra .
npm install --save-dev jsdom

node kiem-tra/lab1.mjs      # hồi quy buổi 1
node kiem-tra/lab2.mjs      # hồi quy buổi 2
node kiem-tra/lab3.mjs      # hồi quy buổi 3
node kiem-tra/lab4.mjs      # buổi 4 — ngưỡng 26/35
```

Kiểm tay nhanh: nhấn **Tab** từ đầu trang — phải thấy link "Bỏ qua đến nội dung
chính", rồi đi hết được navbar, FAQ, công tắc giá và slider mà lúc nào cũng nhìn
thấy tiêu điểm đang ở đâu. Tab trong slider không được rơi vào slide đang ẩn.

---

## 5. Cấu trúc thư mục

```
index.html          Trang chủ — 7 tính năng + script inline chống nháy trắng
pricing.html        Bảng giá — công tắc Tháng/Năm, bảng so sánh, FAQ thanh toán
contact.html        Liên hệ — form có kiểm tra bằng thuộc tính HTML
src/input.css       Token + component (buổi 1→4) — không sửa ở buổi 4
dist/output.css     Tailwind build ra — KHÔNG sửa tay, PHẢI commit
js/main.js          Điểm khởi động, chỉ gọi các hàm init
js/nav.js           Tính năng 1, 2 và nút lên đầu trang
js/faq.js           Tính năng 3
js/theme.js         Tính năng 4
js/pricing.js       Tính năng 5
js/slider.js        Tính năng 6
js/reveal.js        Tính năng 7
data/records.json   30 buổi học mẫu, buổi 5 dùng
assets/icons/       Icon SVG export từ Figma
```
