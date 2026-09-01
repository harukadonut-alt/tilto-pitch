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

    /* 🔴 「見えたら剥がす」で良いのは、最初から opacity 1 の塊だけ。
       03 AFTER / 02の着地 / 05の見出しは **初期 opacity 0** で、
       節のスクロール進捗に合わせて後から現れる。IntersectionObserver は
       透明でも「見えている」と判定するので、文字が出る前に幕が剥がれ切ってしまう。
       この3つは motion.67c11262.js が進捗を見て `hl-in` を付ける（HL_BY_SCROLL）。 */
    var BY_SCROLL = '.process-copy-after .hl-line, .reference-problems-statement .hl-line, .bp-copy .hl-line';
    var lines = Array.prototype.filter.call(
        document.querySelectorAll('.hl-line'),
        function (el) { return !el.matches(BY_SCROLL) });
    if (!lines.length) return;

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            e.target.classList.add('hl-in');
            io.unobserve(e.target);   // 一度剥がしたら戻さない
        });
    }, { threshold: .35, rootMargin: '0px 0px -8% 0px' });

    lines.forEach(function (el) { io.observe(el) });
})();
