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

    /* ── 追従ヘッダーの紙の板 ──────────────────────────────────
       🔴 これは「演出」ではなく**読めるかどうか**の問題。ヘッダーの文字は墨色で、
          黒い節（02・05）の上では板が無いと文字が消える。
          だから prefers-reduced-motion の早期returnより**前**に置く。 */
    (function () {
        var root = document.documentElement;
        var hero = document.querySelector('.hero-canvas');
        if (!hero) return;
        var frame = 0, lastY = window.scrollY;
        function update() {
            frame = 0;
            var box = hero.getBoundingClientRect();
            var p = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height)));
            var stuck = root.classList.contains('hd-stuck');
            /* 付ける/外すで閾値をずらす。同じ値だと境目で震える */
            if (!stuck && p > .78) root.classList.add('hd-stuck');
            else if (stuck && p < .70) root.classList.remove('hd-stuck');

            /* 下へ読み進めている間は引っ込め、上へ戻ると出す。
               ⚠️ 4pxの遊びを入れる。1pxでも動いたら反応させると、
                  慣性スクロールの揺り返しでちらつく */
            var y = window.scrollY;
            if (root.classList.contains('hd-stuck')) {
                if (y > lastY + 4) root.classList.add('hd-away');
                else if (y < lastY - 4) root.classList.remove('hd-away');
            } else {
                root.classList.remove('hd-away');
            }
            lastY = y;
        }
        var req = function () { frame || (frame = window.requestAnimationFrame(update)) };
        update();
        window.addEventListener('scroll', req, { passive: true });
        window.addEventListener('resize', req);
    })();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var clamp = function (v) { return Math.min(1, Math.max(0, v)) };
    // なめらかに0→1へ（smoothstep）。区間の外は0か1で止まる
    var ramp = function (from, to, v) {
        var t = clamp((v - from) / Math.max(1e-4, to - from));
        return t * t * (3 - 2 * t);
    };

    /* 幕を「文字が現れるのに合わせて」剥がす係。
       ⚠️ 一度付けたら外さない。戻ってまた下りたときに毎回引き直すとうるさい */
    var wiped = new Set();
    function wipe(scope, key) {
        if (!scope || wiped.has(key)) return;
        wiped.add(key);
        scope.querySelectorAll('.hl-line').forEach(function (n) { n.classList.add('hl-in') });
    }

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

            // 02 お悩み: 黒がせり上がる → 高い（左）→ 遅い（中央）→ 成果が見えない（右）
            //   ⚠️ 視線が左→中央→右に流れるよう、区間をずらして重ねてある。
            //      同時に動かすと「一斉フェードイン」になって安っぽくなる
            if (kind === 'problems-story') {
                /* ⚠️ `seen` をそのまま使うと、着地コピーが出そろうのが seen=0.92 になり、
                   そのとき節はもう画面の上へ抜けている（下の計算で確認済み）。
                   節が画面にちゃんと乗っている seen 0.10〜0.65 に物語を畳み込む。
                   0.65 の時点で節の上端が画面上端の少し上、着地コピーが画面中ほどに来る。 */
                var pb = clamp((seen - .1) / .55);
                st.setProperty('--pb-black', ramp(0, .15, pb).toFixed(4));
                st.setProperty('--pb-high', ramp(.15, .35, pb).toFixed(4));
                st.setProperty('--pb-slow', ramp(.25, .50, pb).toFixed(4));
                st.setProperty('--pb-result', ramp(.40, .65, pb).toFixed(4));
                st.setProperty('--pb-note-1', ramp(.55, .68, pb).toFixed(4));
                st.setProperty('--pb-note-2', ramp(.60, .73, pb).toFixed(4));
                st.setProperty('--pb-note-3', ramp(.65, .78, pb).toFixed(4));
                // 赤入れは左から引かれる（transform-origin: 0）
                st.setProperty('--pb-line-1', ramp(.58, .72, pb).toFixed(4));
                st.setProperty('--pb-line-2', ramp(.66, .80, pb).toFixed(4));
                st.setProperty('--pb-line-mid', ramp(.62, .76, pb).toFixed(4));
                var closing = ramp(.75, .92, pb);
                st.setProperty('--pb-closing', closing.toFixed(4));
                if (closing > .06) wipe(el.querySelector('.reference-problems-statement'), 'pb');
            }

            // 03 体験: 紙が散らばった状態 → 整理 → サイトの形になる
            if (kind === 'fusion-story') {
                var p = clamp(-box.top / Math.max(1, box.height - vh));
                /* 🔴 開始値は「ピン留めが始まってから何px動かないか」に直結する。
                   .27 だと節240vhでは **328px スクロールしても画面が変わらない**＝
                   固まったように見える（2026-09-01の社長報告）。ピン開始直後から動かす。
                   ⚠️ 節の高さを変えたら、ここの開始値も見直すこと（px換算が変わる） */
                var organize = ramp(.06, .66, p);
                /* 枠の開き。⚠️ 中身のスクロール（settle）より**先に開き切る**こと。
                   重なっていると、上が切れたまま中身が動き出す（社長の指摘） */
                var reveal = ramp(.58, .74, p);
                /* 完成サイトの中身を、枠の中で少しだけ下へ送る量。
                   ⚠️ 全部は見せない。WHY WE WORK が出きって、次の節の頭がのぞく
                      ところで止める（見本画像の下 約200px は最後まで見えない）。
                      「この先も見たい」を残すのがこの節の役目
                   ⚠️ 枠が開き切る .74 より後から始める。サイトの一番上を見せる間を作る */
                var settle = ramp(.80, 1, p);
                st.setProperty('--fusion-progress', p.toFixed(4));
                st.setProperty('--process-before-opacity', (1 - ramp(.10, .59, p)).toFixed(4));
                st.setProperty('--process-organize', organize.toFixed(4));
                st.setProperty('--process-reveal', reveal.toFixed(4));
                var after = ramp(.7, .87, p);
                st.setProperty('--process-after-opacity', after.toFixed(4));
                if (after > .06) wipe(el.querySelector('.process-copy-after'), 'after');
                st.setProperty('--process-wire-opacity',
                    Math.min(ramp(.47, .61, p), 1 - ramp(.71, .83, p)).toFixed(4));
                st.setProperty('--process-site-clip', ((1 - reveal) * 100).toFixed(2) + '%');
                st.setProperty('--process-site-y', (-settle * 19).toFixed(2) + '%');
                st.setProperty('--process-guide-offset', (1 - organize).toFixed(4));
                st.setProperty('--process-progress-x', (p * 100).toFixed(2) + '%');

                el.querySelectorAll('.process-paper').forEach(function (paper, k) {
                    var move = ramp(.05 + k * .012, .65 + k * .008, p);
                    var keep = paper.dataset.keep === 'true';   // 最後まで残る紙
                    var fade = ramp(keep ? .62 : .45, keep ? .84 : .73, p);
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

                /* 🔴 節が画面に**入ってくる間**の進捗。b は「節の上端が画面上端に着いてから」
                   しか動かないので、それまで図面が rest のまま薄く見えてしまっていた。
                   arrive で図面全体をゲートし、出現も前倒しする。
                   0 = 節の上端が画面下端 / 1 = 上端が画面の38%まで上がった */
                var arrive = clamp((vh - box.top) / Math.max(1, vh * .62));
                st.setProperty('--bp-arrive', arrive.toFixed(4));
                var foundation = ramp(0, .10, b);
                var notes = ramp(.50, .63, b);
                var kpi = ramp(.63, .77, b);
                st.setProperty('--bp-progress', b.toFixed(4));
                /* 見出しは節が入ってくる間に出す（b を待たない） */
                var intro = ramp(.3, .85, arrive);
                st.setProperty('--bp-intro', intro.toFixed(4));
                if (intro > .06) wipe(el.querySelector('.bp-copy'), 'bp');
                st.setProperty('--bp-foundation', foundation.toFixed(4));
                st.setProperty('--bp-information', ramp(.10, .20, b).toFixed(4));
                st.setProperty('--bp-ui', ramp(.14, .24, b).toFixed(4));
                st.setProperty('--bp-wire', ramp(.24, .34, b).toFixed(4));
                st.setProperty('--bp-content', ramp(.28, .38, b).toFixed(4));
                st.setProperty('--bp-visual', ramp(.38, .50, b).toFixed(4));
                st.setProperty('--bp-notes', notes.toFixed(4));
                st.setProperty('--bp-kpi', kpi.toFixed(4));
                /* ⚠️ .88 で終わると、残り12%＝173px はピン留めのまま何も動かない。最後まで使う */
                st.setProperty('--bp-settle', ramp(.77, .98, b).toFixed(4));
                st.setProperty('--bp-grid-opacity', (.19 + foundation * .11).toFixed(4));
                st.setProperty('--bp-axis-offset', (1 - foundation).toFixed(4));
                st.setProperty('--bp-leader-offset', (1 - notes).toFixed(4));
                st.setProperty('--bp-chart-offset', (1 - kpi).toFixed(4));
                st.setProperty('--bp-dimension-offset', (1 - ramp(0, .78, b)).toFixed(4));
                for (var k = 0; k < 8; k++) {
                    st.setProperty('--bp-note-' + (k + 1), ramp(.50 + k * .014, .54 + k * .014, b).toFixed(4));
                }
                st.setProperty('--bp-parallax-back', ((b - .5) * 8).toFixed(2) + 'px');
                st.setProperty('--bp-parallax-front', ((b - .5) * -10).toFixed(2) + 'px');
                /* 環の数字は「このページの進み＝05 / 07」（2026-09-05）。
                   前は架空の 72.5% だったが、図面を「このページ自身」に揃えたので、
                   **実在する数字**だけを出す。環の割合は 5/7＝71.4%（CSS側と一致させる） */
                el.querySelectorAll('[data-kpi-number]').forEach(function (n) {
                    n.textContent = ('0' + Math.round(5 * kpi)).slice(-2) + ' / 07';
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
