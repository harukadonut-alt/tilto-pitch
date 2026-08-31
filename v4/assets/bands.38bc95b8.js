/* ============================================================
   見出しの幕を「見えたとき1回だけ」走らせる係（2026-08-31）

   FVの見出しは画面の一番上なので固定の animation-delay で流している。
   下の5本はスクロールして初めて見えるので、そこで初めて剥がす。

   ⚠️ DOMは一切足さない。既にある `.hl-line` にクラスを1つ付けるだけ。
      v4のReactはbody直下を作り直すことがあるので、足す係にすると巻き込まれる。
   ⚠️ 幕の既定は scaleX(0)＝見えない。この係が動かなくても
      （JS無効・prefers-reduced-motion）文字はそのまま読める。
   ============================================================ */
(function () {
    'use strict';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var lines = document.querySelectorAll('.hl-line');
    if (!lines.length) return;

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            e.target.classList.add('hl-in');
            io.unobserve(e.target);   // 一度剥がしたら戻さない
        });
    }, { threshold: .35, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(lines, function (el) { io.observe(el) });
})();
