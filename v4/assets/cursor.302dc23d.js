/* InkCursor — v3（site-v3/app.js）から移植した「丸が合わさる」カーソル。
   大小2つの白い丸を mix-blend-mode:difference で重ね、大きい方が遅れて追いかける。
   v3との差分は1点だけ: CTA（.header-cta / .pricing-cta）の上では通常のリンクより大きく開く。

   🔴 このページは React が hydrate するので、DOMは load 後に追加する
     （SSRに書き足すと hydration に拾われる恐れがある。後から足せば React の管理外）。
   ⚠️ タッチ端末・動きを減らす設定では何もしない（v3と同じ）。 */
(() => {
  const HOVERABLE = "a, button, summary, input, textarea, select, [role='button']";
  const CTA = '.header-cta, .pricing-cta, .pricing-cta-main, .pricing-cta-sub';

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

    let cx = 0, cy = 0, ux = 0, uy = 0, frame = 0, started = false;

    const follow = () => {
      ux += (cx - ux) * 0.2;
      uy += (cy - uy) * 0.2;
      big.style.transform = `translate3d(${ux - 15}px, ${uy - 15}px, 0)`;
      frame =
        Math.abs(cx - ux) > 0.08 || Math.abs(cy - uy) > 0.08
          ? window.requestAnimationFrame(follow)
          : 0;
    };

    const hover = (target) => {
      const hit = target instanceof Element ? target.closest(HOVERABLE) : null;
      big.classList.toggle('is-hovering', !!hit);
      big.classList.toggle('is-cta', !!(hit && hit.closest(CTA)));
    };

    const move = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!started) {
        ux = cx;
        uy = cy;
        started = true;
      }
      big.classList.add('is-visible');
      small.classList.add('is-visible');
      small.style.transform = `translate3d(${cx - 5}px, ${cy - 5}px, 0)`;
      hover(e.target);
      if (!frame) frame = window.requestAnimationFrame(follow);
    };

    const leave = () => {
      big.classList.remove('is-visible', 'is-hovering', 'is-cta', 'is-pressed');
      small.classList.remove('is-visible');
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
