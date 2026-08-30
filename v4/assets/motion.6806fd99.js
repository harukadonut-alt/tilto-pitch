/* ============================================================
   スクロール量をCSS変数に流す係（GPT製サイトの ScrollMotion の移植・2026-08-31）

   出どころ: https://tilto-recruiting.haruka-namasute.chatgpt.site
   03（体験）と05（成果にこだわる）の動きは、全部この変数で駆動している。
   これが動かないと、両セクションは初期値のまま止まって見える。

   ⚠️ Reactコンポーネントではなく素のスクリプトにしてある。
      v4のReactはbody直下を作り直すことがあるので、**DOMを足さない**係にしておくと巻き込まれない。
      （足すもの＝進捗バーは index.html 側に静的に置いてある）
   ⚠️ 書き込みは1フレーム1回に束ねる。FVのWebGLと反転カーソルが同じフレームで走るので、
      ここで毎イベント書くとカクつく（design/knowledge/_自作/反転合成カーソルを重いページで使う.md）
   ============================================================ */
(function () {
    'use strict';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var clamp = function (v) { return Math.min(1, Math.max(0, v)) };
    // なめらかに0→1へ（smoothstep）。区間の外は0か1で止まる
    var ramp = function (from, to, v) {
        var t = clamp((v - from) / Math.max(1e-4, to - from));
        return t * t * (3 - 2 * t);
    };

    var root = document.documentElement;
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-motion]'));
    if (!nodes.length) return;
    var frame = 0;

    function draw() {
        frame = 0;
        var vh = window.innerHeight;
        var scrollable = Math.max(1, document.documentElement.scrollHeight - vh);
        root.style.setProperty('--page-progress', clamp(window.scrollY / scrollable).toFixed(4));

        nodes.forEach(function (el) {
            var box = el.getBoundingClientRect();
            var seen = clamp((vh - box.top) / (vh + box.height));   // 0=これから 1=通り過ぎた
            var mid = seen - .5;
            var st = el.style;
            st.setProperty('--view-progress', seen.toFixed(4));
            st.setProperty('--view-offset', (mid * 150).toFixed(2) + 'px');
            st.setProperty('--view-offset-reverse', (mid * -150).toFixed(2) + 'px');
            st.setProperty('--view-offset-wide', (mid * 320).toFixed(2) + 'px');
            st.setProperty('--view-offset-wide-reverse', (mid * -320).toFixed(2) + 'px');
            st.setProperty('--view-offset-y', (mid * 76).toFixed(2) + 'px');
            st.setProperty('--view-scale', (.955 + seen * .045).toFixed(4));
            st.setProperty('--view-offset-soft', (mid * 64).toFixed(2) + 'px');
            st.setProperty('--view-offset-soft-reverse', (mid * -64).toFixed(2) + 'px');
            st.setProperty('--view-offset-wide-soft', (mid * 140).toFixed(2) + 'px');
            st.setProperty('--view-offset-wide-soft-reverse', (mid * -140).toFixed(2) + 'px');
            st.setProperty('--view-offset-y-soft', (mid * 36).toFixed(2) + 'px');
            st.setProperty('--view-scale-soft', (.985 + seen * .015).toFixed(4));
            el.classList.toggle('is-inview', seen > .06 && seen < .98);

            var kind = el.dataset.motion;

            // FV: 下端まで見送る量。01への橋渡しに使う
            if (kind === 'hero-scroll') {
                var hero = clamp(-box.top / Math.max(1, box.height));
                st.setProperty('--hero-progress', hero.toFixed(4));
                root.style.setProperty('--hero-bridge-progress', hero.toFixed(4));
            }

            // 03 体験: 紙が散らばった状態 → 整理 → サイトの形になる
            if (kind === 'fusion-story') {
                var p = clamp(-box.top / Math.max(1, box.height - vh));
                var organize = ramp(.27, .66, p);
                var reveal = ramp(.61, .84, p);
                var settle = ramp(.85, 1, p);
                st.setProperty('--fusion-progress', p.toFixed(4));
                st.setProperty('--process-before-opacity', (1 - ramp(.3, .59, p)).toFixed(4));
                st.setProperty('--process-organize', organize.toFixed(4));
                st.setProperty('--process-reveal', reveal.toFixed(4));
                st.setProperty('--process-after-opacity', ramp(.7, .87, p).toFixed(4));
                st.setProperty('--process-wire-opacity',
                    Math.min(ramp(.47, .61, p), 1 - ramp(.71, .83, p)).toFixed(4));
                st.setProperty('--process-site-clip', ((1 - reveal) * 100).toFixed(2) + '%');
                st.setProperty('--process-site-y', (-settle * 24).toFixed(2) + '%');
                st.setProperty('--process-guide-offset', (1 - organize).toFixed(4));
                st.setProperty('--process-progress-x', (p * 100).toFixed(2) + '%');

                el.querySelectorAll('.process-paper').forEach(function (paper, k) {
                    var move = ramp(.26 + k * .012, .65 + k * .008, p);
                    var keep = paper.dataset.keep === 'true';   // 最後まで残る紙
                    var fade = ramp(keep ? .7 : .55, keep ? .84 : .73, p);
                    var dx = Number(paper.dataset.dx || 0), dy = Number(paper.dataset.dy || 0);
                    var r0 = Number(paper.dataset.r || 0);
                    var rot = r0 + (Number(paper.dataset.endR || 0) - r0) * move;
                    paper.style.transform = 'translate(' + (dx * move).toFixed(3) + 'vw, '
                        + (dy * move).toFixed(3) + 'vh) rotate(' + rot.toFixed(3) + 'deg) scale('
                        + (1 - move * (keep ? .08 : .16)).toFixed(4) + ')';
                    paper.style.opacity = (1 - fade).toFixed(4);
                });
            }

            // 05 成果にこだわる: 設計図が段ごとに立ち上がる
            if (kind === 'blueprint-story') {
                var b = clamp(-box.top / Math.max(1, box.height - vh));
                var foundation = ramp(.1, .22, b);
                var notes = ramp(.62, .76, b);
                var kpi = ramp(.76, .9, b);
                st.setProperty('--bp-progress', b.toFixed(4));
                st.setProperty('--bp-intro', ramp(0, .1, b).toFixed(4));
                st.setProperty('--bp-foundation', foundation.toFixed(4));
                st.setProperty('--bp-information', ramp(.22, .32, b).toFixed(4));
                st.setProperty('--bp-ui', ramp(.26, .36, b).toFixed(4));
                st.setProperty('--bp-wire', ramp(.36, .47, b).toFixed(4));
                st.setProperty('--bp-content', ramp(.4, .5, b).toFixed(4));
                st.setProperty('--bp-visual', ramp(.5, .62, b).toFixed(4));
                st.setProperty('--bp-notes', notes.toFixed(4));
                st.setProperty('--bp-kpi', kpi.toFixed(4));
                st.setProperty('--bp-settle', ramp(.9, 1, b).toFixed(4));
                st.setProperty('--bp-grid-opacity', (.08 + foundation * .2).toFixed(4));
                st.setProperty('--bp-axis-offset', (1 - foundation).toFixed(4));
                st.setProperty('--bp-leader-offset', (1 - notes).toFixed(4));
                st.setProperty('--bp-chart-offset', (1 - kpi).toFixed(4));
                st.setProperty('--bp-dimension-offset', (1 - ramp(.1, .9, b)).toFixed(4));
                for (var k = 0; k < 8; k++) {
                    st.setProperty('--bp-note-' + (k + 1), ramp(.62 + k * .016, .66 + k * .016, b).toFixed(4));
                }
                st.setProperty('--bp-parallax-back', ((b - .5) * 8).toFixed(2) + 'px');
                st.setProperty('--bp-parallax-front', ((b - .5) * -10).toFixed(2) + 'px');
                el.querySelectorAll('[data-kpi-number]').forEach(function (n) {
                    n.textContent = (72.5 * kpi).toFixed(1) + '%';
                });
            }
        });
    }

    var request = function () { frame || (frame = window.requestAnimationFrame(draw)) };
    root.classList.add('is-scroll-ready');
    draw();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
})();
