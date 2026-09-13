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

    /* ── ビューアの「読み込み中」の覆いを、iframeが読み終わったら外す係 ──────────
       🔴 これは演出ではなく**壊れて見えないための表示**。
          iframe は中身が来る前から自分の白い地を塗るので、覆いを裏に置くと隠れてしまう。
          覆いはCSSで前面に出してあり、ここは「読み終わった合図」を付けるだけ。
       ⚠️ reduced-motion でも外さないと覆いが残りっぱなしになるので、
          **下の早期returnより前**に置いている。ヘッダーの板と同じ理由。
       ⚠️ DOMは足さない。属性を1つ付けるだけ（v4のReactに巻き込まれないため）。 */
    (function () {
        var FRAME = '.works-site-frame[data-live="true"] iframe';
        function done(fr) {
            var box = fr.parentElement;
            if (box) box.setAttribute('data-loaded', 'true');
        }
        function watch(fr) {
            /* 同じサイトを見ている間は何もしない。別のサイトに載せ替わったら覆いを戻す */
            if (fr.dataset.loadSrc === fr.src) return;
            fr.dataset.loadSrc = fr.src;
            var box = fr.parentElement;
            if (box) box.removeAttribute('data-loaded');

            if (!fr.dataset.loadBound) {
                fr.dataset.loadBound = '1';
                fr.addEventListener('load', function () { done(fr) });
                fr.addEventListener('error', function () { done(fr) });
            }
            /* 保険。load が来ない環境でも、いつまでも覆いを出したままにしない */
            clearTimeout(+fr.dataset.loadTimer || 0);
            fr.dataset.loadTimer = setTimeout(function () { done(fr) }, 25000);

            /* 既に読み終わっていることもある（戻ってきたときなど）。
               🔴 `readyState === 'complete'` だけで判断してはいけない。**差し込んだ直後の
                  iframe は about:blank を持っていて、それが最初から complete** なので、
                  読み込みが始まる前に覆いを外してしまう（2026-09-09 実測で30msで外れた）。
                  行き先のURLが入っているときだけ「読み終わった」とみなす。
               ⚠️ 別ドメインの contentDocument は触ると例外になるので必ず包む */
            try {
                var doc = fr.contentDocument;
                if (doc && doc.readyState === 'complete' && doc.URL && doc.URL !== 'about:blank') done(fr);
            } catch (e) { /* 別ドメイン。load イベントを待てばよい */ }
        }
        function scan() {
            Array.prototype.forEach.call(document.querySelectorAll(FRAME), watch);
        }
        scan();
        if (!('MutationObserver' in window)) return;
        var queued = 0;
        new MutationObserver(function () {
            /* 引き出しの開け閉めでDOMがよく動くので、1フレームに1回に束ねる */
            if (queued) return;
            queued = requestAnimationFrame(function () { queued = 0; scan() });
        }).observe(document.body, { childList: true, subtree: true });
    })();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var clamp = function (v) { return Math.min(1, Math.max(0, v)) };
    // なめらかに0→1へ（smoothstep）。区間の外は0か1で止まる
    var ramp = function (from, to, v) {
        var t = clamp((v - from) / Math.max(1e-4, to - from));
        return t * t * (3 - 2 * t);
    };

    /* 出す・沈めるを「静かに」効かせる版。
       cubic-bezier(0.22, 1, 0.36, 1) の当たりを easeOutCubic で近似している
       （t=.5 で 0.875 対 0.87 / t=.75 で 0.984 対 0.96）。
       ⚠️ easeOutQuint まで強めるとスクラブが「跳ねた」ように見える。ここで止める */
    var ease = function (from, to, v) {
        var t = clamp((v - from) / Math.max(1e-4, to - from));
        return 1 - Math.pow(1 - t, 3);
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
        var vw = window.innerWidth;
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

            /* 02 ハードル: 課題が主役 → 背景へ沈む → Tilto°の合図 → 解決策が手前に立つ
               ⚠️ 使うのは `seen`（節が画面を通り過ぎた割合）ではなく**ピン留めの進み具合**。
                  節は200vhで中の舞台が100svhの sticky なので、`-box.top / (height - vh)` の
                  0→1 が、貼り付いている間とちょうど一致する。
                  スクロールを止めた位置と見え方が1対1になる（scrub）。
               ⚠️ 区間は重ねてある。そろえると「一斉フェードイン」になって安っぽい。 */
            if (kind === 'hurdles-story') {
                var ph = clamp(-box.top / Math.max(1, box.height - vh));

                /* 🔴 課題の3つは「ピン留めが始まる前」＝節が下から上がってくる間に、
                   ひとつずつ出す（2026-09-09 社長「一つずつ表示されるように戻して」）。
                   ⚠️ ここで ph を使ってはいけない。ph は貼り付いてから 0→1 なので、
                      節が上がってくる間はずっと 0 のまま＝**真っ黒な板が滑り込んでくる**。
                   pre は「節の上端が画面の下から上端まで来る間」の 0→1。
                   pre が 1 になる瞬間＝ピンが始まる瞬間で、3つとも出そろっている。 */
                var pre = clamp((vh - box.top) / Math.max(1, vh));
                st.setProperty('--hu-e1', ease(.16, .46, pre).toFixed(4));   // 高い。
                st.setProperty('--hu-e2', ease(.40, .70, pre).toFixed(4));   // 遅い。
                st.setProperty('--hu-e3', ease(.64, .94, pre).toFixed(4));   // つくって終わり。

                /* 0.00〜0.18 は3つを読ませる時間。ここでは何も動かさない */
                /* 🔴 沈む進み具合だけは、PCとSPで測り方を変える。
                   PCはピン留め中の ph でよいが、SPは**ピン留めしない**（節がふつうに流れる）ので、
                   ph は節の高さと画面の高さの差で決まってしまい、体感と合わない。
                   SPでは「最後の課題（つくって終わり。）が画面の上へ抜けるあいだ」を進み具合にする。
                   ⚠️ 課題を読ませてから沈める順番はPCと同じ。合図（線とTilto°）より先に沈み切る */
                var sink = ease(.18, .40, ph);
                if (vw <= 900) {
                    var lastIssue = el.querySelector('.hu-issue-end');
                    if (lastIssue) {
                        var lb = lastIssue.getBoundingClientRect().bottom;
                        /* 78%から始めると、まだ読める位置なのに色が抜けはじめていた（実測）。
                           62%＝ちょうど読み終わるあたりから沈め、20%で沈み切る */
                        sink = ease(0, 1, clamp((vh * .62 - lb) / Math.max(1, vh * .42)));
                    }
                }
                st.setProperty('--hu-sink',    sink.toFixed(4));                // 課題が背景へ沈む
                st.setProperty('--hu-line',    ease(.30, .48, ph).toFixed(4));  // コーラルの線が上から伸びる
                st.setProperty('--hu-brand',   ease(.34, .48, ph).toFixed(4));  // Tilto°（切り替えの合図）
                st.setProperty('--hu-1',       ease(.42, .64, ph).toFixed(4));  // 月額 27,000円〜
                st.setProperty('--hu-2',       ease(.52, .74, ph).toFixed(4));  // 最短 1週間
                st.setProperty('--hu-3',       ease(.62, .84, ph).toFixed(4));  // 公開後も、改善しつづける。
                st.setProperty('--hu-note-1',  ease(.50, .70, ph).toFixed(4));
                st.setProperty('--hu-note-2',  ease(.60, .80, ph).toFixed(4));
                st.setProperty('--hu-note-3',  ease(.70, .90, ph).toFixed(4));
                var huClosing = ease(.78, .92, ph);
                st.setProperty('--hu-closing', huClosing.toFixed(4));
                /* 締めのコピーだけ、01・03・05と同じ「幕を剥がす」演出をかける。
                   ⚠️ wipe は Set で1回だけ。戻ってまた下りるたびに引き直すとうるさい */
                if (huClosing > .06) wipe(el.querySelector('.hu-closing'), 'hu');
                /* 0.92〜1.00 は全部1のまま。完成形を保ったままピンが外れる。
                   🔴 外れる直前に消さない。見せてから隠すのは不親切 */
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

/* ビューアの実サイト枠: iframe を 1440px 幅で描いて、枠の幅に合わせて縮める。
   CSS は「枠の幅 ÷ 1440」を計算できないので、ここで --sf を入れる。
   枠はドロワーを開いたときだけ DOM に現れるので、現れたら ResizeObserver を付ける。
   （2026-09-08。経緯は coral-sections.f4e9ca45.css の「ビューアの枠を『ノートパソコンの画面』にする」） */
(function () {
    var VW = 1440;
    if (!('ResizeObserver' in window) || !('MutationObserver' in window)) return;
    var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (en) {
            var w = en.contentRect.width;
            if (w > 0) en.target.style.setProperty('--sf', (w / VW).toFixed(4));
        });
    });
    var seen = new WeakSet();
    function attach(root) {
        (root.querySelectorAll ? root.querySelectorAll('.works-site-frame[data-live="true"]') : []).forEach(function (f) {
            if (seen.has(f)) return; seen.add(f); ro.observe(f);
            f.style.setProperty('--sf', (f.clientWidth / VW).toFixed(4));
        });
    }
    new MutationObserver(function (muts) {
        muts.forEach(function (mu) { mu.addedNodes.forEach(function (n) { if (n.nodeType === 1) attach(n); }); });
    }).observe(document.body, { childList: true, subtree: true });
    attach(document);
})();
