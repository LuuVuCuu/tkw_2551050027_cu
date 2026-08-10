# Chương 2 — Code mẫu HTML & CSS

Bộ code mẫu minh hoạ cho **Chương 2** (môn Thiết kế Web — INTE03010), sắp xếp **theo từng mục**
của giáo trình. Mỗi bài là một file `.html` **độc lập, chạy được ngay** khi mở bằng trình duyệt,
có **chú thích tiếng Việt** ngay trong mã.

## Cách dùng
1. Mở [index.html](index.html) bằng trình duyệt → bấm vào từng thẻ để xem demo.
2. Khuyến nghị mở thư mục bằng **VS Code + tiện ích Live Server** để tự nạp lại khi sửa.
3. Đọc mã → mở trình duyệt → mở **DevTools (F12)** để soi DOM/CSS.

## Cấu trúc thư mục
```
WDCode/                        ← thư mục gốc cả môn (repo git)
├── index.html                 ← mục lục CẢ MÔN (liên kết tới từng chương)
├── assets/                    ← ảnh SVG placeholder + site.css/lesson.css (DÙNG CHUNG)
├── chuong2/                   ← ĐANG Ở ĐÂY
│   ├── index.html             ← MỤC LỤC Chương 2 (bắt đầu từ đây)
│   ├── 2.1-html/              ← 9 demo HTML
│   ├── 2.2-css/               ← 9 demo CSS (+ css/main.css minh hoạ External CSS)
│   ├── 2.3-responsive/        ← 5 demo Responsive (có demo Flexbox tương tác)
│   ├── 2.4-ky-thuat-css/      ← 6 demo kỹ thuật CSS
│   ├── 2.5-phong-cach-thiet-ke/ ← showcase 8 phong cách thiết kế
│   └── 2.6-emmet/             ← cheat sheet Emmet + kết quả bung mẫu
└── chuong3/                   ← Lập trình JavaScript (3.1→3.12)
```
> **Lưu ý:** thư mục `assets/` dùng chung nằm ở **gốc `WDCode/`**, nên các bài trong Chương 2
> tham chiếu bằng `../../assets/…`, còn trang mục lục chương dùng `../assets/…`.

## Ghi chú
- **Ảnh**: dùng SVG placeholder cục bộ trong `../assets/` (gốc dự án) để chạy **offline**. Sinh viên có thể thay bằng ảnh thật.
- **Video/Audio** (bài 2.1.9): cần file media thật — bỏ vào `2.1-html/media/` rồi sửa `src`.
- **Font Awesome** (bài 2.4.6) và **YouTube embed** (bài 2.1.9): cần **internet** để nạp CDN.
- Một số bài dùng **JavaScript nhỏ** (Flexbox tương tác, canvas, nút dark mode) — học kỹ ở **[Chương 3](../chuong3/index.html)**.
