// js/faq.js — Tính năng 3: accordion câu hỏi thường gặp.   (tiết 3)
//
// Phần tử có sẵn trong HTML:
//   khu vực   : #cau-hoi
//   nút hỏi   : <button data-faq-trigger aria-expanded="false" aria-controls="faq-p1">
//   khối đáp  : <div id="faq-p1" hidden>
// Năm cặp trigger/panel đã đánh số faq-t1..t5 và faq-p1..p5.

export function initFaq() {
  // Trang chủ: khu vực FAQ là #cau-hoi. Trang bảng giá cũng có bốn cặp
  // trigger/panel (faqp-t1..t4) nhưng section của nó không mang id đó, nên
  // tìm thêm bằng chính nút hỏi rồi leo lên section chứa nó — cùng một đoạn
  // JavaScript chạy được cho cả hai trang, không phải đổi HTML.
  const root =
    document.getElementById("cau-hoi") ||
    document.querySelector("[data-faq-trigger]")?.closest("section");
  if (!root) return;

  const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
  if (triggers.length === 0) return;

  // Đổi trạng thái MỘT mục. Hai việc luôn đi cùng nhau: phần nhìn (panel.hidden)
  // và phần ARIA (aria-expanded). Thiếu một trong hai là trình đọc màn hình
  // hiểu sai trạng thái của mục.
  function setOpen(trigger, open) {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(open));
    if (panel) panel.hidden = !open;
  }

  // MỘT listener cho cả nhóm (event delegation), không phải mỗi nút một listener.
  // closest(): người dùng hay bấm trúng icon <svg> bên trong nút, khi đó
  // e.target là <svg> chứ không phải <button>; closest leo ngược lên tìm đúng nút.
  root.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    // Mở "mỗi lúc chỉ một mục" — ba dòng, không cần biến trạng thái.
    const seMo = trigger.getAttribute("aria-expanded") !== "true";  // 1. đọc trước
    triggers.forEach((t) => setOpen(t, false));                     // 2. đóng hết
    if (seMo) setOpen(trigger, true);                               // 3. mở lại đúng cái vừa bấm
  });

  // Mũi tên Lên/Xuống, phím Home/End chuyển tiêu điểm giữa các câu hỏi.
  // e.preventDefault() để trang không cuộn theo phím.
  root.addEventListener("keydown", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const i = triggers.indexOf(trigger);
    let ke = -1;
    if (e.key === "ArrowDown") ke = (i + 1) % triggers.length;
    else if (e.key === "ArrowUp") ke = (i - 1 + triggers.length) % triggers.length;
    else if (e.key === "Home") ke = 0;
    else if (e.key === "End") ke = triggers.length - 1;
    if (ke === -1) return;

    e.preventDefault();
    triggers[ke].focus();
  });

  // Trạng thái ban đầu: đóng hết. Không dựa vào thuộc tính `hidden` viết sẵn
  // trong HTML — JavaScript phải là nguồn sự thật duy nhất, nếu không hai bên
  // sẽ lệch nhau sau vài lần bấm.
  triggers.forEach((t) => setOpen(t, false));
}
