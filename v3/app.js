/* Tilto site-v3 — 挙動をReactからバニラJSに移植したもの。
   元実装: ../tilto-recruiting-v2/assets/ の ScrollMotion / InkCursor / Showroom の3チャンク。
   （v1にあった FaqOrbit は v2 で消えた。FAQは素の <details> なのでJSは要らない）
   マークアップはSSR済みのHTMLをそのまま使い、ここでは状態と変数の更新だけを行う。 */
(() => {
  const clamp = (v) => Math.min(1, Math.max(0, v));

  /* ---------- ScrollMotion: [data-motion] にビュー進行度を配る ---------- */
  function scrollMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
    const root = document.documentElement;
    let nodes = Array.from(document.querySelectorAll('[data-motion]'));
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const total = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty('--page-progress', clamp(window.scrollY / total).toFixed(4));

      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const p = clamp((vh - rect.top) / (vh + rect.height));
        const d = p - 0.5;
        const set = (name, value) => el.style.setProperty(name, value);
        set('--view-progress', p.toFixed(4));
        set('--view-offset', `${(d * 150).toFixed(2)}px`);
        set('--view-offset-reverse', `${(d * -150).toFixed(2)}px`);
        set('--view-offset-wide', `${(d * 320).toFixed(2)}px`);
        set('--view-offset-wide-reverse', `${(d * -320).toFixed(2)}px`);
        set('--view-offset-y', `${(d * 76).toFixed(2)}px`);
        set('--view-scale', (0.955 + p * 0.045).toFixed(4));
        set('--view-offset-soft', `${(d * 64).toFixed(2)}px`);
        set('--view-offset-soft-reverse', `${(d * -64).toFixed(2)}px`);
        set('--view-offset-wide-soft', `${(d * 140).toFixed(2)}px`);
        set('--view-offset-wide-soft-reverse', `${(d * -140).toFixed(2)}px`);
        set('--view-offset-y-soft', `${(d * 36).toFixed(2)}px`);
        set('--view-scale-soft', (0.985 + p * 0.015).toFixed(4));
        el.classList.toggle('is-inview', p > 0.06 && p < 0.98);

        const kind = el.dataset.motion;

        if (kind === 'hero-scroll') {
          set('--hero-progress', clamp(-rect.top / Math.max(1, rect.height)).toFixed(4));
        }

        if (kind === 'tilted-paper-align') {
          set('--paper-progress', p.toFixed(4));
        }

        if (kind === 'fusion-story') {
          const fp = clamp(-rect.top / Math.max(1, rect.height - vh));
          const step = [0.1, 0.24, 0.37, 0.45, 0.78].filter((t) => fp >= t).length;
          set('--fusion-progress', fp.toFixed(4));
          el.dataset.fusionStep = String(step);
        }

        if (kind === 'method-story') {
          const track = el.querySelector('.method-clear-reveal-track');
          if (track) {
            const tr = track.getBoundingClientRect();
            const mp = clamp(-tr.top / Math.max(1, tr.height - vh));
            const near = clamp((vh * 0.92 - tr.top) / (vh * 0.42));
            const step = near < 0.12 ? -1 : near < 0.26 ? 0 : near < 0.42 ? 1 : near < 0.58 ? 2 : 3;
            set('--method-progress', mp.toFixed(4));
            el.dataset.methodStep = String(step);
          }
        }

        if (kind === 'card-fall') {
          const span = Math.max(vh * 0.18, rect.height - vh * 0.82);
          const cp = clamp((vh * 0.08 - rect.top) / span);
          const a1 = clamp(cp / 0.025);
          const a2 = clamp((cp - 0.025) / 0.025);
          const a3 = clamp((cp - 0.05) / 0.025);
          const f1 = clamp((cp - 0.16) / 0.14);
          const f2 = clamp((cp - 0.31) / 0.14);
          const f3 = clamp((cp - 0.46) / 0.14);
          set('--card-progress', cp.toFixed(4));
          set('--card-appear-1', a1.toFixed(4));
          set('--card-appear-2', a2.toFixed(4));
          set('--card-appear-3', a3.toFixed(4));
          set('--card-fall-1', f1.toFixed(4));
          set('--card-fall-2', f2.toFixed(4));
          set('--card-fall-3', f3.toFixed(4));
          set('--card-opacity-1', (a1 * (1 - f1 * 0.96)).toFixed(4));
          set('--card-opacity-2', (a2 * (1 - f2 * 0.96)).toFixed(4));
          set('--card-opacity-3', (a3 * (1 - f3 * 0.98)).toFixed(4));
          set('--card-entry-y-1', `${((1 - a1) * -34).toFixed(2)}px`);
          set('--card-entry-y-2', `${((1 - a2) * -34).toFixed(2)}px`);
          set('--card-entry-y-3', `${((1 - a3) * -34).toFixed(2)}px`);
          set('--card-x-1', `${(f1 * -4).toFixed(2)}vw`);
          set('--card-x-2', `${(f2 * 4).toFixed(2)}vw`);
          set('--card-x-3', `${(f3 * -3).toFixed(2)}vw`);
          set('--card-y-1', `${(f1 * -8).toFixed(2)}svh`);
          set('--card-y-2', `${(f2 * -8).toFixed(2)}svh`);
          set('--card-y-3', `${(f3 * -8).toFixed(2)}svh`);
          set('--card-rx-1', `${(f1 * 82).toFixed(2)}deg`);
          set('--card-rx-2', `${(f2 * 82).toFixed(2)}deg`);
          set('--card-rx-3', `${(f3 * 82).toFixed(2)}deg`);
          set('--card-rz-1', `${(-0.6 - f1 * 2.5).toFixed(2)}deg`);
          set('--card-rz-2', `${(0.45 + f2 * 2.5).toFixed(2)}deg`);
          set('--card-rz-3', `${(-0.35 - f3 * 2).toFixed(2)}deg`);
          el.dataset.cardStep =
            cp < 0.075 ? 'appearing' : cp < 0.16 ? 'all' : cp < 0.31 ? '2' : cp < 0.46 ? '3' : 'done';
        }

        if (kind === 'decompose') {
          const dp = clamp(-rect.top / Math.max(1, rect.height - vh));
          set('--decompose-progress', dp.toFixed(4));
          el.dataset.decomposeStep = dp < 0.3 ? '0' : dp < 0.68 ? '1' : '2';
        }
      });
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    root.classList.add('is-scroll-ready');
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    // ショールームのフィルタでDOMが入れ替わったら対象を取り直す
    return () => {
      nodes = Array.from(document.querySelectorAll('[data-motion]'));
      request();
    };
  }

  /* ---------- InkCursor: 墨の玉が遅れて追いかけるカーソル ---------- */
  const HOVERABLE = [
    'a',
    'button',
    'summary',
    'input',
    'textarea',
    'select',
    "[role='button']",
    '[data-cursor-label]',
  ].join(',');

  function inkCursor() {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    const big = document.querySelector('.ink-cursor__ball--big');
    const small = document.querySelector('.ink-cursor__ball--small');
    if (!big || !small) return;

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

    const label = (target) => {
      const hit = target instanceof Element ? target.closest(HOVERABLE) : null;
      big.dataset.label = (hit && hit.dataset.cursorLabel) || '';
      big.classList.toggle('is-hovering', !!hit);
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
      label(e.target);
      if (!frame) frame = window.requestAnimationFrame(follow);
    };

    const leave = () => {
      big.classList.remove('is-visible', 'is-hovering', 'is-pressed');
      small.classList.remove('is-visible');
    };

    document.documentElement.classList.add('has-ink-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', () => big.classList.add('is-pressed'), { passive: true });
    window.addEventListener('pointerup', () => big.classList.remove('is-pressed'), { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('blur', leave);
  }

  /* ---------- Showroom: カテゴリー切替とライトボックス ---------- */
  function showroom(onDomChange) {
    const section = document.querySelector('.showroom');
    if (!section) return;
    const filters = section.querySelector('.showroom-filters');
    const marquee = section.querySelector('.showroom-marquee');
    if (!filters || !marquee) return;

    /* 事例データはSSR済みのマーキーから拾う（二重管理にしない）。
       マーキーは2レーン×2グループのクローンなので、番号で重複を落とす */
    const items = [];
    const seen = new Set();
    marquee.querySelectorAll('.showroom-item').forEach((el) => {
      const no = el.querySelector('.showroom-meta span')?.textContent?.trim();
      const img = el.querySelector('img');
      if (!no || !img || seen.has(no)) return;
      seen.add(no);
      items.push({
        no,
        category: el.querySelector('.showroom-meta b')?.textContent?.trim() ?? '',
        image: img.getAttribute('src') ?? '',
        alt: img.getAttribute('alt') ?? '',
      });
    });
    items.sort((a, b) => a.no.localeCompare(b.no));

    let lightbox = null;

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.remove();
      lightbox = null;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };

    function onKey(e) {
      if (e.key === 'Escape') closeLightbox();
    }

    const openLightbox = (item) => {
      closeLightbox();
      lightbox = document.createElement('div');
      lightbox.className = 'showroom-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', `${item.category}の表現事例`);
      lightbox.innerHTML = `<div class="showroom-lightbox-inner">
<div class="showroom-lightbox-meta"><span></span><small>表現サンプル（架空企業）</small><b></b></div>
<img alt=""><button type="button" aria-label="事例を閉じる">CLOSE ×</button></div>`;
      lightbox.querySelector('.showroom-lightbox-meta span').textContent = item.no;
      lightbox.querySelector('.showroom-lightbox-meta b').textContent = item.category;
      const img = lightbox.querySelector('img');
      img.src = item.image;
      img.alt = item.alt;
      lightbox.addEventListener('click', closeLightbox);
      lightbox.querySelector('.showroom-lightbox-inner').addEventListener('click', (e) => {
        // 中身のクリックでは閉じない。閉じるボタンだけ通す
        if (!e.target.closest('button')) e.stopPropagation();
      });
      section.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    };

    /* すべて以外のときに出す一覧。React版は同じDOMを毎回作り直していたので合わせる */
    let list = null;

    const buildList = () => {
      const el = document.createElement('div');
      el.className = 'showroom-list showroom-filtered-list';
      el.dataset.filtered = 'true';
      items.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'showroom-item showroom-size-wide';
        btn.dataset.motion = 'showroom-drift';
        btn.dataset.cursorLabel = 'VIEW';
        btn.setAttribute('aria-label', `${item.category}の表現事例を大きく見る`);
        btn.innerHTML = `<div class="showroom-meta"><span></span><b></b></div>
<div class="showroom-visual"><img loading="lazy" alt=""><span class="showroom-view">この表現を見る <i>↗</i></span></div>`;
        btn.querySelector('.showroom-meta span').textContent = item.no;
        btn.querySelector('.showroom-meta b').textContent = item.category;
        const img = btn.querySelector('img');
        img.src = item.image;
        img.alt = item.alt;
        btn.addEventListener('click', () => openLightbox(item));
        el.appendChild(btn);
      });
      return el;
    };

    const applyFilter = (category) => {
      filters.querySelectorAll('button').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.textContent.trim() === category));
      });

      if (category === 'すべて') {
        marquee.hidden = false;
        if (list) {
          list.remove();
          list = null;
        }
      } else {
        marquee.hidden = true;
        if (!list) {
          list = buildList();
          marquee.after(list);
        }
        list.querySelectorAll('.showroom-item').forEach((btn, i) => {
          const hidden = items[i].category !== category;
          btn.dataset.hidden = String(hidden);
          btn.tabIndex = hidden ? -1 : 0;
          if (hidden) btn.setAttribute('aria-hidden', 'true');
          else btn.removeAttribute('aria-hidden');
        });
      }
      if (onDomChange) onDomChange();
    };

    filters.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => applyFilter(btn.textContent.trim()));
    });

    // SSR済みマーキーの事例にもライトボックスを付ける
    marquee.querySelectorAll('.showroom-item').forEach((el) => {
      const no = el.querySelector('.showroom-meta span')?.textContent?.trim();
      const item = items.find((x) => x.no === no);
      if (item) el.addEventListener('click', () => openLightbox(item));
    });
  }


  /* ---------- 相談ページへの遷移（仮） ----------
     #contact の締めボタン。<a> にするとベンダーの .contact-clear-main>button の
     円形の意匠が全部剥がれるので、仮対応としてボタンのまま遷移させる。
     パスは相対（サブパス配信の /v3/ でも解決させるため）。本実装でリンク化を検討。 */
  document.querySelectorAll('[data-contact-trigger]').forEach((b) => {
    b.addEventListener('click', () => { location.href = 'contact.html'; });
  });

  const refreshMotion = scrollMotion();
  inkCursor();
  showroom(refreshMotion);
})();
