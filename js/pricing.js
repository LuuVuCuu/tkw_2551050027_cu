// js/pricing.js — Tính năng 5: công tắc giá Tháng / Năm.   (tiết 4)
//
// Phần tử có sẵn trong HTML:
//   công tắc   : #cong-tac-gia  — <button role="switch" aria-checked="false">
//   số tiền    : <span data-price data-monthly="390000" data-yearly="3744000">
//   nhãn kỳ hạn: <span data-price-unit>/tháng</span>
//
// Số tiền nằm trong HTML, KHÔNG nằm trong JavaScript. Người sửa giá là người
// làm nội dung, không phải lập trình viên: sửa giá không được đụng tới file này.

// Cho sẵn — đây là cú pháp tra tài liệu chứ không phải bài học của buổi.
// Đừng tự viết hàm chèn dấu chấm: hàm tự viết luôn sai ở số âm và số lẻ.
const dong = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function initPricing() {
  const sw = document.getElementById("cong-tac-gia");
  if (!sw) return;

  const prices = [...document.querySelectorAll("[data-price]")];
  const units = [...document.querySelectorAll("[data-price-unit]")];
  if (prices.length === 0) return;

  // Vẽ lần đầu theo trạng thái đang có trong HTML.
  render(sw.getAttribute("aria-checked") === "true");

  // Bấm công tắc thì đảo trạng thái rồi vẽ lại.
  sw.addEventListener("click", () => {
    render(sw.getAttribute("aria-checked") !== "true");
  });

  // Bàn phím: Space và Enter đều phải bật/tắt được. <button> đã tự lo Enter,
  // nhưng viết rõ ra cho người đọc thấy đã cân nhắc. Space phải
  // preventDefault(), nếu không trang cuộn xuống một màn hình.
  sw.addEventListener("keydown", (e) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    render(sw.getAttribute("aria-checked") !== "true");
  });

  function render(yearly) {
    // a. Trạng thái nằm ở ARIA — CSS tự đọc qua .cong-tac[aria-checked="true"],
    //    nên KHÔNG cần thêm class riêng nào cả.
    sw.setAttribute("aria-checked", String(yearly));

    // b. Số tiền: đọc từ data-* của chính phần tử đó.
    //    Dùng textContent chứ không innerHTML.
    prices.forEach((el) => {
      const so = Number(yearly ? el.dataset.yearly : el.dataset.monthly);
      if (Number.isNaN(so)) return;
      el.textContent = dong.format(so);
    });

    // c. Nhãn kỳ hạn đi kèm.
    units.forEach((el) => {
      el.textContent = yearly ? "/năm" : "/tháng";
    });
  }
}
