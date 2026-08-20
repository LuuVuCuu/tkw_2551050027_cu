// js/slider.js — Tính năng 6: slider cảm nhận, TỰ VIẾT, không thư viện.  (tiết 5)
//
// Phần tử có sẵn trong HTML:
//   khu vực : #slider-camnhan
//   dải     : [data-slider-track]   ← thứ sẽ bị dịch sang trái
//   slide   : [data-slide]          ← mỗi slide rộng đúng 100% khung nhìn
//   ô chấm  : [data-slider-dots]    ← RỖNG, chấm do JavaScript sinh ra
//   nút     : [data-slider-prev] / [data-slider-next]
//
// Ý tưởng: xếp các slide thành một dải ngang, rồi dịch cả dải bằng
//   track.style.transform = `translateX(-${index * 100}%)`

const TU_CHAY = 6000;   // ms — thời gian giữa hai lần tự chuyển

export function initSlider() {
  const root = document.getElementById("slider-camnhan");
  if (!root) return;

  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dotsBox = root.querySelector("[data-slider-dots]");
  const prev = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  // Chấm chỉ dẫn sinh BẰNG JAVASCRIPT, từ số slide thật. Viết cứng ba cái chấm
  // trong HTML thì thêm một cảm nhận phải sửa hai chỗ, và sớm muộn sẽ lệch.
  const dots = [];
  if (dotsBox) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", `Xem cảm nhận ${i + 1} trên ${slides.length}`);
      dot.addEventListener("click", () => {
        go(i);
        restart();
      });
      dotsBox.append(dot);
      dots.push(dot);
    });
  }

  function go(next_) {
    // Một dòng lo cả hai đầu, KHÔNG cần if: từ slide 0 bấm lùi ra -1,
    // cộng length thành length-1 → về đúng slide cuối.
    index = (next_ + slides.length) % slides.length;

    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((s, i) => {
      const an = i !== index;
      // Thiếu `inert` thì người nhấn Tab rơi vào slide vô hình nằm ngoài màn hình.
      s.toggleAttribute("inert", an);
      s.setAttribute("aria-hidden", String(an));
    });

    dots.forEach((d, i) => {
      if (i === index) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function start() {
    // Người bật "giảm chuyển động" thì KHÔNG tự chạy.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // LUÔN stop() trước khi đặt setInterval mới, nếu không mỗi lần rê chuột
    // vào ra là thêm một bộ đếm, slider chạy nhanh dần rồi giật.
    stop();
    timer = setInterval(() => go(index + 1), TU_CHAY);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  // Nút prev/next. Dùng ?. để trang thiếu nút vẫn không nổ.
  prev?.addEventListener("click", () => { go(index - 1); restart(); });
  next?.addEventListener("click", () => { go(index + 1); restart(); });

  // Bàn phím khi tiêu điểm đang trong slider.
  root.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    go(e.key === "ArrowLeft" ? index - 1 : index + 1);
    restart();
  });

  // Tự chạy nhưng biết dừng khi người dùng đang xem.
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  // focusin/focusout hay bị quên nhất: người dùng bàn phím không rê chuột,
  // chỉ có tiêu điểm, thiếu cặp này thì slider trôi mất lúc họ đang đọc.
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  // Trạng thái đầu.
  go(0);
  start();
}
