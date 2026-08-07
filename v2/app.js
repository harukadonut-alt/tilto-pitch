/* Tilto site — 挙動をReactからバニラJSに移植したもの。
   元実装: assets/ScrollMotion / InkCursor / FaqOrbit / Showroom の4チャンク。
   マークアップはSSR済みのHTMLをそのまま使い、ここでは状態と変数の更新だけを行う。 */
(() => {
  const clamp = (v) => Math.min(1, Math.max(0, v));

  /* ---------- ScrollMotion: [data-motion] にビュー進行度を配る ---------- */
  function scrollMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll('[data-motion]'));
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
          el.style.setProperty('--hero-progress', clamp(-rect.top / Math.max(1, rect.height)).toFixed(4));
        }
        if (kind === 'tilted-paper-align') {
          el.style.setProperty('--paper-progress', p.toFixed(4));
        }
        if (kind === 'fusion-story') {
          const fp = clamp(-rect.top / Math.max(1, rect.height - vh));
          const step = [0.08, 0.22, 0.37, 0.51, 0.64, 0.77, 0.89].filter((t) => fp >= t).length;
          el.style.setProperty('--fusion-progress', fp.toFixed(4));
          el.dataset.fusionStep = String(step);
        }
        if (kind === 'decompose') {
          const dp = clamp(-rect.top / Math.max(1, rect.height - vh));
          el.style.setProperty('--decompose-progress', dp.toFixed(4));
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
  }

  /* ---------- InkCursor: 墨だまりのカスタムカーソル ---------- */
  function inkCursor() {
    const hoverable = ['a', 'button', 'summary', 'input', 'textarea', 'select', "[role='button']", '[data-cursor-label]'].join(',');
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const big = document.querySelector('.ink-cursor__ball--big');
    const small = document.querySelector('.ink-cursor__ball--small');
    if (!big || !small) return;

    let tx = 0, ty = 0, x = 0, y = 0, frame = 0, started = false;

    const follow = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      big.style.transform = `translate3d(${x - 15}px, ${y - 15}px, 0)`;
      frame = Math.abs(tx - x) > 0.08 || Math.abs(ty - y) > 0.08 ? window.requestAnimationFrame(follow) : 0;
    };

    const syncLabel = (target) => {
      const hit = target instanceof Element ? target.closest(hoverable) : null;
      big.dataset.label = (hit && hit.dataset.cursorLabel) || '';
      big.classList.toggle('is-hovering', !!hit);
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!started) { x = tx; y = ty; started = true; }
      big.classList.add('is-visible');
      small.classList.add('is-visible');
      small.style.transform = `translate3d(${tx - 5}px, ${ty - 5}px, 0)`;
      syncLabel(e.target);
      if (!frame) frame = window.requestAnimationFrame(follow);
    };
    const leave = () => {
      big.classList.remove('is-visible', 'is-hovering', 'is-pressed');
      small.classList.remove('is-visible');
    };

    document.documentElement.classList.add('has-ink-cursor');
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', () => big.classList.add('is-pressed'), { passive: true });
    window.addEventListener('pointerup', () => big.classList.remove('is-pressed'), { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('blur', leave);
  }

  /* ---------- FaqOrbit: 紙が散らばったFAQ ---------- */
  const FAQ = [
    { q: '写真がなくても大丈夫？', a: '大丈夫です。既存素材、イラスト、言葉など、会社に合う表現から考えます。' },
    { q: 'まだ採用方針が決まっていない', a: '決まっていない状態から、一緒に整理します。誰に何を届けるかを対話から見つけます。' },
    { q: 'AIはどこで使う？', a: '表現の選択肢を広げるために使います。戦略と最終判断は、プロが担います。' },
    { q: '原稿もお願いできる？', a: 'はい。ヒアリングから、採用コンセプト、見出し、本文まで制作します。' },
    { q: '制作期間は？', a: '目安は、ヒアリング開始から公開まで約2〜4か月です。' },
    { q: '公開後も相談できる？', a: 'はい。運用サポートや、採用活動に合わせた改善もご相談いただけます。' },
  ];

  function faqOrbit() {
    const orbit = document.querySelector('.faq-scatter');
    if (!orbit) return;
    const buttons = Array.from(orbit.querySelectorAll('.faq-strip'));
    const answer = orbit.querySelector('.faq-note');
    if (!buttons.length || !answer) return;

    const counter = answer.querySelector('b');
    const title = answer.querySelector('h3');
    const body = answer.querySelector('p');

    /* 紙片はホバー / クリックだけで切り替える。
       散らばりが1画面に収まる構図なので、スクロール送りはやめた */
    let focusIndex = null, clickIndex = null, previous = 0;
    const answered = new Set();
    const active = () => (clickIndex !== null ? clickIndex : focusIndex !== null ? focusIndex : 0);

    const render = () => {
      const m = active();
      if (previous !== m) { answered.add(previous); previous = m; }
      orbit.dataset.active = String(m);
      buttons.forEach((btn, i) => {
        btn.classList.toggle('is-active', i === m);
        btn.classList.toggle('is-answered', answered.has(i) && i !== m);
        btn.setAttribute('aria-expanded', String(i === m));
      });
      if (counter) counter.textContent = `${String(m + 1).padStart(2, '0')} / 06`;
      if (title) title.textContent = FAQ[m].q;
      if (body) body.textContent = FAQ[m].a;
    };

    buttons.forEach((btn, i) => {
      btn.addEventListener('focus', () => { focusIndex = i; render(); });
      btn.addEventListener('blur', () => { focusIndex = null; render(); });
      btn.addEventListener('mouseenter', () => { focusIndex = i; render(); });
      btn.addEventListener('mouseleave', () => { focusIndex = null; render(); });
      btn.addEventListener('click', () => { focusIndex = null; clickIndex = i; render(); });
    });
    render();
  }

  /* ---------- Showroom: カテゴリー絞り込み ---------- */
  function showroom() {
    const list = document.querySelector('.showroom-list');
    const filters = document.querySelector('.showroom-filters');
    if (!list || !filters) return;
    const buttons = Array.from(filters.querySelectorAll('button'));
    const items = Array.from(list.querySelectorAll('.showroom-item'));

    const apply = (category) => {
      buttons.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.textContent.trim() === category)));
      list.dataset.filtered = String(category !== 'すべて');
      items.forEach((item) => {
        const own = item.querySelector('.showroom-meta b');
        const hidden = category !== 'すべて' && (!own || own.textContent.trim() !== category);
        item.dataset.hidden = String(hidden);
        item.setAttribute('aria-hidden', String(hidden));
        item.tabIndex = hidden ? -1 : 0;
      });
    };

    buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.textContent.trim())));
  }

  /* ---------- SiteViewer: ショールームのカードから実物のサイトを開く ----------
     iframeは開いたときだけ差し込み、閉じたら破棄する（常時埋め込みはしない）。
     JSが無い/失敗したときは、カードのhrefがそのまま別タブで開く。 */
  function siteViewer() {
    const viewer = document.querySelector('#siteViewer');
    const cards = Array.from(document.querySelectorAll('.showroom-item[data-demo]'));
    if (!viewer || !cards.length) return;

    const win = viewer.querySelector('.site-viewer__win');
    const body = viewer.querySelector('#siteViewerBody');
    const loading = viewer.querySelector('#siteViewerLoading');
    const nameEl = viewer.querySelector('#siteViewerName');
    const bizEl = viewer.querySelector('#siteViewerBiz');
    const extEl = viewer.querySelector('#siteViewerExt');
    const closeBtn = viewer.querySelector('#siteViewerClose');
    let lastFocus = null;

    const open = (card) => {
      const { demo, demoName, demoBiz } = card.dataset;
      lastFocus = document.activeElement;
      nameEl.textContent = demoName || '';
      bizEl.textContent = demoBiz || '';
      extEl.href = demo;
      loading.hidden = false;

      body.querySelector('iframe')?.remove();
      const frame = document.createElement('iframe');
      frame.src = demo;
      frame.title = `${demoName}の採用サイト`;
      frame.addEventListener('load', () => { loading.hidden = true; }, { once: true });
      body.appendChild(frame);

      viewer.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const close = () => {
      if (viewer.hidden) return;
      viewer.hidden = true;
      body.querySelector('iframe')?.remove();   // 破棄してメモリを戻す
      document.body.style.overflow = '';
      lastFocus?.focus();
    };

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;  // 別タブで開きたい人はそのまま
        e.preventDefault();
        open(card);
      });
    });

    viewer.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', (e) => {
      if (viewer.hidden) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      // フォーカスをビューアの中に閉じ込める
      const focusable = win.querySelectorAll('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- 文字ごとの出現（セリフのように1文字ずつ置かれる） ----------
     読み上げには元の文をそのまま渡し、分割した文字は読ませない */
  function splitChars(root) {
    if (!root || root.classList.contains('is-split')) return;
    const label = root.textContent.replace(/\s+/g, '');
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          Array.from(n.textContent).forEach((ch) => {
            if (ch.trim() === '') { frag.appendChild(document.createTextNode(ch)); return; }
            const span = document.createElement('span');
            span.className = 'char-reveal';
            span.setAttribute('aria-hidden', 'true');
            span.textContent = ch;
            frag.appendChild(span);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === Node.ELEMENT_NODE && n.tagName !== 'BR') {
          walk(n);
        }
      });
    };
    walk(root);
    root.querySelectorAll('.char-reveal').forEach((el, i) => el.style.setProperty('--i', i));
    root.setAttribute('aria-label', label);
    root.classList.add('is-split');
  }

  function speechReveal() {
    splitChars(document.querySelector('#showroom .section-intro h2'));
    splitChars(document.querySelector('.closing-body h2'));
  }

  /* ---------- ショールーム: 右から左へ流れ続ける2行の帯 ----------
     参考: TERASU の DEMO セクション。
     1行あたり6枚を並べ、同じ並びをもう1組つないで -50% までずらす
     （半分が画面幅より広くないと、折り返しで隙間が見えるため6枚必要）。
     2行目は並び順を3枚ずらし、速度も変えて、同じ絵が縦に揃わないようにする。
     複製は読み上げ・タブ移動から外す */
  function showroomMarquee() {
    const list = document.querySelector('.showroom-list');
    if (!list || list.dataset.marquee === 'ready') return;
    const originals = Array.from(list.children);
    if (originals.length < 2) return;

    const half = Math.ceil(originals.length / 2);
    const rows = [originals, originals.slice(half).concat(originals.slice(0, half))];

    list.textContent = '';
    rows.forEach((items, rowIndex) => {
      const row = document.createElement('div');
      row.className = 'showroom-row';
      row.dataset.row = String(rowIndex + 1);
      items.forEach((item) => {
        // 1行目は元の要素、2行目は複製（元は1つしか置けないため）
        const node = rowIndex === 0 ? item : item.cloneNode(true);
        if (rowIndex !== 0) node.dataset.rowClone = 'true';
        row.appendChild(node);
      });
      Array.from(row.children).forEach((node) => {
        const clone = node.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.dataset.clone = 'true';
        clone.tabIndex = -1;
        row.appendChild(clone);
      });
      list.appendChild(row);
    });
    list.dataset.marquee = 'ready';
  }

  const boot = () => {
    scrollMotion(); inkCursor(); faqOrbit();
    speechReveal(); showroomMarquee(); showroom(); siteViewer();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
