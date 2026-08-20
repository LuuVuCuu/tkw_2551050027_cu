// js/nav.js — Tính năng 1 (menu mobile), Tính năng 2 (navbar khi cuộn),
//             và bài khởi động (nút lên đầu trang).
//
// Phần tử có sẵn trong HTML, ĐÚNG TÊN NÀY, đừng đổi:
//   nút mở menu   : <button aria-expanded="false" aria-controls="nav-mobile">
//   khối menu     : #nav-mobile        (đang có class "hidden")
//   mốc cuộn      : #nav-sentinel      (thẻ rỗng cao 1px, đầu <body>)
//   nút lên đầu   : #nut-len-dau       (CSS hiện nó khi có class "is-visible")

/* ------------------------------------------------------------------ */
/* Tính năng 1 — Menu mobile                        (tiết 2)          */
/* ------------------------------------------------------------------ */
export function initNav() {
  const toggle = document.querySelector('[aria-controls="nav-mobile"]');
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return;          // trang này không có menu → thoát êm

  // MỘT hàm duy nhất chịu trách nhiệm đổi trạng thái menu. Không nơi nào khác
  // được sửa class hay ARIA của menu, nhờ vậy phần nhìn và phần ARIA không
  // bao giờ lệch nhau.
  function setOpen(open) {
    menu.classList.toggle("hidden", !open);                    // cho người nhìn thấy
    toggle.setAttribute("aria-expanded", String(open));        // cho trình đọc màn hình
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);   // chặn nền cuộn
  }

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  // Bấm nút thì đảo trạng thái.
  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Ba cách đóng, vì người dùng không ai giống ai.

  // a. Phím ESC. Trả tiêu điểm về nút, nếu không người dùng bàn phím bị "rơi"
  //    ra đầu trang.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });

  // b. Bấm ra ngoài vùng header.
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (e.target.closest("header")) return;   // vẫn đang bấm trong header → kệ
    setOpen(false);
  });

  // c. Màn hình phóng lên desktop: menu desktop đã hiện, menu mobile phải đóng,
  //    nếu không class "overflow-hidden" còn kẹt lại và trang không cuộn được.
  const desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });

  // Trạng thái đầu: đóng. JavaScript là nguồn sự thật duy nhất.
  setOpen(false);
}

/* ------------------------------------------------------------------ */
/* Tính năng 2 — Navbar đổi trạng thái khi cuộn      (tiết 2)         */
/* ------------------------------------------------------------------ */
export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel) return;

  // Sentinel còn trong màn hình → đang ở đầu trang.
  // Sentinel trôi mất            → đã cuộn.
  // KHÔNG dùng sự kiện "scroll": scroll bắn hàng trăm lần mỗi giây, observer
  // chỉ báo đúng hai lần — lúc ra và lúc vào lại.
  const observer = new IntersectionObserver(([entry]) => {
    const scrolled = !entry.isIntersecting;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("is-scrolled", scrolled);
  });

  observer.observe(sentinel);
}

/* ------------------------------------------------------------------ */
/* Bài khởi động — nút "Lên đầu trang"               (tiết 1)         */
/* ------------------------------------------------------------------ */
export function initToTop() {
  const btn = document.getElementById("nut-len-dau");
  const sentinel = document.getElementById("nav-sentinel");
  if (!btn || !sentinel) return;

  // rootMargin 400px: nới vùng quan sát thêm 400px về phía trên, nên sentinel
  // chỉ bị coi là "ra khỏi màn hình" sau khi đã cuộn quá 400px — đúng ngưỡng
  // đề bài yêu cầu.
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Sentinel KHÔNG còn trong vùng quan sát → đã cuộn quá 400px → hiện nút.
      // CSS đã có sẵn: .to-top.is-visible { opacity: 1; pointer-events: auto }
      btn.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { rootMargin: "400px 0px 0px 0px" }
  );
  observer.observe(sentinel);

  btn.addEventListener("click", () => {
    // Người bật "giảm chuyển động" thì nhảy thẳng, không cuộn mượt.
    const giamChuyenDong = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: giamChuyenDong ? "auto" : "smooth" });

    // Trả tiêu điểm về đầu trang cho người dùng bàn phím, nếu không họ cuộn
    // lên trên mà con trỏ vẫn còn kẹt ở cuối trang.
    const dau = document.querySelector('a[href="#main"]') || document.body;
    dau.focus({ preventScroll: true });
  });
}
