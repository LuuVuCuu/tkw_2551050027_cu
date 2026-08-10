# 2.6 · Emmet — viết HTML/CSS siêu nhanh

> **Emmet** tích hợp sẵn trong **VS Code** (và Sublime, Atom…). Gõ **cú pháp viết tắt** rồi nhấn
> **`Tab`** → Emmet bung ra mã HTML/CSS hoàn chỉnh.
>
> Emmet là tính năng của **trình soạn thảo**, không phải thứ "chạy trong trình duyệt".
> Hãy mở file `.html` trong VS Code, gõ thử rồi nhấn `Tab` để thấy nó bung.

---

## 1) Khởi tạo nhanh khung HTML5

Gõ `!` rồi `Tab` → sinh toàn bộ khung chuẩn:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

---

## 2) Bảng cú pháp thông dụng

| Cú pháp | Ý nghĩa | Ví dụ → kết quả |
|---------|---------|-----------------|
| `tag` | Tạo thẻ | `div` → `<div></div>` |
| `cha>con` | Lồng con vào cha | `div>p` → `<div><p></p></div>` |
| `a+b` | Cùng cấp | `h1+h2+h3` |
| `tag*n` | Lặp n lần | `li*3` → 3 thẻ `<li>` |
| `tag.class` | Thêm class | `p.note` → `<p class="note"></p>` |
| `tag#id` | Thêm id | `div#main` → `<div id="main"></div>` |
| `tag[attr="val"]` | Thêm thuộc tính | `a[href="#"]` → `<a href="#"></a>` |
| `tag{nội dung}` | Thêm văn bản | `p{Xin chào}` → `<p>Xin chào</p>` |
| `$` | Đánh số khi lặp | `li.item$*3` → `item1, item2, item3` |
| `(...)` | Gom nhóm | `(ul>li*2>a)+div.content>p` |
| `lorem` / `lorem10` | Văn bản giả (10 từ) | đoạn Lorem Ipsum |
| `^` | Lùi một cấp | `div>p^span` (span là anh em của div) |

### Emmet cho CSS
Trong file `.css`, gõ viết tắt rồi `Tab`:

| Gõ | Bung ra |
|----|---------|
| `m10` | `margin: 10px;` |
| `p10-20` | `padding: 10px 20px;` |
| `w100p` | `width: 100%;` |
| `df` | `display: flex;` |
| `jcc` | `justify-content: center;` |
| `bgc` | `background-color: #fff;` |
| `pos:a` | `position: absolute;` |

---

## 3) Bài tập tự bung (gõ → `Tab` → so với `ket-qua-mau.html`)

1. `!`  → khung HTML5
2. `ul.menu>li*4>a[href="#"]{Mục $}`
3. `nav>ul>li*3>a`
4. `.card*3>img+h3{Tiêu đề $}+p>lorem15`
5. `form>(label+input)*3+button{Gửi}`
6. `table>tr*3>td*4`
7. `header+main>(section>h2)+aside^footer`

> Mở [ket-qua-mau.html](ket-qua-mau.html) để xem kết quả bung của các bài trên rồi đối chiếu.

---

## 4) Lỗi thường gặp
- **Quên nhấn `Tab`** (hoặc dùng editor không hỗ trợ Emmet) → cú pháp nằm nguyên dạng văn bản.
- Đặt `class`/`id` sai chỗ: `.box` mặc định bung thành `<div class="box">`; muốn thẻ khác phải ghi rõ `span.box`.
