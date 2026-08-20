// js/theme.js — Tính năng 4: công tắc nền sáng / nền tối.   (tiết 3)
//
// Phần tử có sẵn: nút #nut-nen-toi trong navbar.
//
// LƯU Ý QUAN TRỌNG: việc BẬT nền tối lúc tải trang KHÔNG nằm ở file này mà ở
// đoạn script inline trong <head>. File này nạp ở cuối <body>, lúc đó trình
// duyệt đã vẽ nền trắng rồi — đặt ở đây thì người dùng thấy một cú chớp trắng
// mỗi lần tải trang. File này chỉ lo phần BẤM NÚT ĐỂ ĐỔI.

const KEY = "theme";

export function initTheme() {
  const btn = document.getElementById("nut-nen-toi");
  if (!btn) return;

  const root = document.documentElement;
  const isDark = () => root.classList.contains("dark");

  // Đồng bộ nút với trạng thái mà script inline trong <head> đã đặt sẵn.
  sync();

  btn.addEventListener("click", () => {
    root.classList.toggle("dark");                                  // a. đổi giao diện
    localStorage.setItem(KEY, isDark() ? "dark" : "light");         // b. nhớ cho lần sau
    sync();                                                         // c. cập nhật ARIA
  });

  // Người dùng đổi cài đặt hệ điều hành trong lúc đang mở trang.
  // Nguyên tắc: chỉ nghe theo hệ điều hành khi người dùng CHƯA từng tự chọn —
  // lựa chọn của người dùng luôn thắng cài đặt máy.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem(KEY)) return;
    root.classList.toggle("dark", e.matches);
    sync();
  });

  function sync() {
    // Nút này là một công tắc hai trạng thái, nên phải mang trạng thái đó
    // trong ARIA, không chỉ trong hình vẽ.
    btn.setAttribute("aria-pressed", String(isDark()));
    btn.setAttribute("aria-label", isDark() ? "Chuyển sang nền sáng" : "Chuyển sang nền tối");
  }
}
