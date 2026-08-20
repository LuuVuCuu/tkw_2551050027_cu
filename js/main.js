// js/main.js — điểm khởi động DUY NHẤT cho cả ba trang.
//
// File này ĐÃ VIẾT SẴN, bạn không cần sửa. Nó là ví dụ mẫu của tiết 1:
// main.js chỉ GỌI, không xử lý. Đọc 20 dòng này là biết trang có những
// tính năng gì, không phải lần mò trong 300 dòng.
//
// Vì sao một file dùng chung được cho cả index/pricing/contact:
// mỗi hàm init tự kiểm tra phần tử của mình rồi thoát êm nếu không có.
// Xem dòng "if (!... ) return;" ở đầu mỗi hàm trong các file bên cạnh.

import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";
import { initSlider } from "./slider.js";
import { initReveal } from "./reveal.js";

initNav();
initHeaderOnScroll();
initToTop();
initTheme();
initFaq();
initPricing();
initSlider();
initReveal();
