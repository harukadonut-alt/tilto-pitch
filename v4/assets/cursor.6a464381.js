/* InkCursor — v3（site-v3/app.js）から移植した「丸が合わさる」カーソル。
   大小2つの白い丸を mix-blend-mode:difference で重ね、大きい方が遅れて追いかける。
   v3との差分は1点だけ: CTA（.header-cta / .pricing-cta）の上では通常のリンクより大きく開く。

   🔴 このページは React が hydrate するので、DOMは load 後に追加する
     （SSRに書き足すと hydration に拾われる恐れがある。後から足せば React の管理外）。

   🔴 重さ対策（2026-08-24）。v3をそのまま移すと、v4では目に見えて重くなる。
      v4のFVは **合計10.7メガピクセルのWebGL canvas**（実体2枚＋影2枚）で、
      difference合成はその背後を毎回読み直させる。v3の背景より桁違いに高い。
      対策は「合成の回数を減らす」こと:
        ① DOMへの書き込みを **1フレームに1回** にまとめる。
           pointermove はマウスによって毎秒120〜1000回来るが、
           画面は60回しか更新されない。素直に書くと合成が最大10倍走る
        ② クラスは **変化したときだけ** 書く。同じ値の書き込みでも
           スタイルの再計算は走ってしまう
        ③ 動きが止まったら rAF を止める（v3と同じ）
   ⚠️ タッチ端末・動きを減らす設定では何もしない（v3と同じ）。SPは対象外。 */
(() => {
  const HOVERABLE = "a, button, summary, input, textarea, select, [role='button']";
  const CTA = '.header-cta, .pricing-cta, .pricing-cta-main, .pricing-cta-sub, .contact-cta';

  /* 丸の中に出す文字（v3と同じ趣向）。
     ⚠️ v3は `data-cursor-label` 属性をHTMLに書いていたが、v4は React が
        hydrate するので**SSRのHTMLとJSXの両方**を直さないと壊れる。
        ここでセレクタから引くことにして、DOMには一切触らない。 */
  const labelFor = (el) => {
    /* 移植したGPT製の節は元のInkCursorに合わせて `data-cursor-label` を持っている。
       そちらが書いてあれば優先する（フッターの相談CTA = TALK） */
    const written = el.closest('[data-cursor-label]');
    if (written) return written.getAttribute('data-cursor-label');
    if (el.closest('.works-tile')) return 'VIEW';        // 表現ショールームのタイル
    if (el.closest('.works-drawer-close')) return 'CLOSE';
    if (el.closest('.reference-about-nav, .reference-contact nav')) return 'VIEW';
    if (el.closest('.pricing-cta-sub')) return 'VIEW';   // 表現事例を見る
    if (el.closest('.header-cta, .pricing-cta')) return 'TALK';  // 無料で相談する
    if (el.matches('.site-nav button'))                  // 帯の停止/再生
      return el.getAttribute('aria-pressed') === 'true' ? 'PLAY' : 'STOP';
    if (el.closest('.brand')) return 'TOP';
    if (el.closest('.site-nav')) return 'VIEW';
    return '';
  };

  function start() {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    const wrap = document.createElement('div');
    wrap.className = 'ink-cursor';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="ink-cursor__ball ink-cursor__ball--big">' +
      '<svg height="30" width="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="12"></circle></svg></div>' +
      '<div class="ink-cursor__ball ink-cursor__ball--small">' +
      '<svg height="10" width="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"></circle></svg></div>';
    document.body.appendChild(wrap);

    const big = wrap.querySelector('.ink-cursor__ball--big');
    const small = wrap.querySelector('.ink-cursor__ball--small');

    /* cx,cy = 実際のカーソル位置（イベントで随時更新。DOMは触らない）
       ux,uy = 大きい丸の位置（毎フレーム 0.2 ずつ寄る。v3と同じ係数） */
    let cx = 0, cy = 0, ux = 0, uy = 0;
    let frame = 0, started = false;
    let visible = false, hovering = false, onCta = false, shownLabel = '';
    let wantHover = false, wantCta = false, wantLabel = '';

    /* ② 同じ値なら書かない。redundantな書き込みでもスタイル再計算は走る */
    const setClass = (el, name, on, cur) => {
      if (on !== cur) el.classList.toggle(name, on);
      return on;
    };

    /* ① DOMへの書き込みはここ（1フレームに1回）だけ */
    const draw = () => {
      ux += (cx - ux) * 0.2;
      uy += (cy - uy) * 0.2;
      big.style.transform = `translate3d(${ux - 15}px, ${uy - 15}px, 0)`;
      small.style.transform = `translate3d(${cx - 5}px, ${cy - 5}px, 0)`;

      if (!visible) {
        big.classList.add('is-visible');
        small.classList.add('is-visible');
        visible = true;
      }
      hovering = setClass(big, 'is-hovering', wantHover, hovering);
      onCta = setClass(big, 'is-cta', wantCta, onCta);
      if (wantLabel !== shownLabel) {
        big.dataset.label = wantLabel;
        shownLabel = wantLabel;
      }

      /* ③ 大きい丸が追いついたら止める。止まっているあいだ合成は走らない */
      frame =
        Math.abs(cx - ux) > 0.08 || Math.abs(cy - uy) > 0.08
          ? window.requestAnimationFrame(draw)
          : 0;
    };

    const move = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!started) {
        ux = cx;
        uy = cy;
        started = true;
      }
      const hit = e.target instanceof Element ? e.target.closest(HOVERABLE) : null;
      wantHover = !!hit;
      wantCta = !!(hit && hit.closest(CTA));
      wantLabel = hit ? labelFor(hit) : '';
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const leave = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      big.classList.remove('is-visible', 'is-hovering', 'is-cta', 'is-pressed');
      small.classList.remove('is-visible');
      big.dataset.label = '';
      visible = hovering = onCta = false;
      shownLabel = '';
    };

    document.documentElement.classList.add('has-ink-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', () => big.classList.add('is-pressed'), { passive: true });
    window.addEventListener('pointerup', () => big.classList.remove('is-pressed'), { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('blur', leave);
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
