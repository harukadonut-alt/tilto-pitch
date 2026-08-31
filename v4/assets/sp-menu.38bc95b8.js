/* SPのメニュー（2026-08-24）。700px以下でだけ動く。

   🔴 DOMは load 後に足す。このページは React が hydrate するので、
      SSRのHTMLに書き足すと消される恐れがある（cursor.38bc95b8.js と同じ方針）。
   🔴 既存の `.site-nav` は触らない。中の「カタログ」ボタンは React が
      onClick を持っている（帯の停止）ので、動かすと機能が壊れる。
      メニューは別物として新しく作り、SPでは元のナビをCSSで隠す。
   ⚠️ 行き先はまだセクションが無いので、**このページに実在する場所**へ送る。
      リンク先の無いメニューにはしない（押して何も起きないのを避ける）。 */
(() => {
  const MQ = '(max-width: 700px)';

  /* [表示名, 送り先のセレクタ] — セクションができたら差し替える */
  const ITEMS = [
    ['サービス概要', '#about'],
    ['カタログ', '#expression'],
    ['成果にこだわる', '#blueprint'],
    ['料金・FAQ', '#price'],
  ];

  function start() {
    const root = document.documentElement;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'sp-menu-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
    toggle.innerHTML = '<i></i><i></i><i></i>';

    const panel = document.createElement('div');
    panel.className = 'sp-menu';
    panel.hidden = true;
    /* ⚠️ ヘッダーのロゴを前面に出すことはできない。ヘッダーは `.hero-canvas` の
       中にあり、そこが container-type で**独自の重なり文脈**を作るので、
       z-index をいくつにしても body 直下のパネルより前には来ない。
       なのでパネル側に自前のロゴを置く（地がコーラルなので白）。 */
    panel.innerHTML =
      '<a class="sp-menu__brand" href="#top" data-to=".site-shell">Tilto<sup>°</sup></a>' +
      '<nav class="sp-menu__nav" aria-label="メニュー">' +
      ITEMS.map(
        ([label, sel], i) =>
          `<a href="#top" data-to="${sel}"><b>0${i + 1}</b>${label}</a>`
      ).join('') +
      '</nav>' +
      '<a class="sp-menu__cta" href="#top" data-to=".pricing-cta-main">無料で相談する<span aria-hidden="true">↗</span></a>';

    /* 🔴 このページの React のルートは **body**（Next.jsが body ごと描く）。
       つまり body の子は React の管理下で、hydration のあとに
       作り直されると足したDOMごと消える。実際 load 直後に足すと消えた。
       対策: 消えていたら貼り直す。ページが落ち着くまでの数秒だけ見張る
       （2026-08-24、社長の「メニューを実装」で踏んだ）。 */
    const ensure = () => {
      if (!toggle.isConnected) document.body.appendChild(toggle);
      if (!panel.isConnected) document.body.appendChild(panel);
    };
    ensure();

    const obs = new MutationObserver(ensure);
    obs.observe(document.body, { childList: true });
    window.setTimeout(() => obs.disconnect(), 4000);

    let open = false;

    const setOpen = (next) => {
      if (next === open) return;
      open = next;
      if (open) {
        panel.hidden = false;
        /* hidden を外した直後にクラスを付けると transition が走らない。
           ⚠️ requestAnimationFrame で待つのはダメ。タブが裏にあると
              rAFが止まり、**開かないまま**になる。
              offsetWidth の読み出しでレイアウトを確定させれば同期で済む */
        void panel.offsetWidth;
      }
      root.classList.toggle('sp-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      if (!open) {
        /* 閉じ切ってから hidden に戻す（途中で消すとアニメが飛ぶ） */
        window.setTimeout(() => {
          if (!open) panel.hidden = true;
        }, 420);
      }
    };

    toggle.addEventListener('click', () => setOpen(!open));

    panel.addEventListener('click', (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[data-to]') : null;
      if (!a) return;
      e.preventDefault();
      const target = document.querySelector(a.dataset.to);
      setOpen(false);
      if (!target) return;
      /* 閉じるアニメと重ならないよう、少し置いてから送る */
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 260);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    });

    /* 画面が広がったら閉じる（PCにメニューが残らないように） */
    const mq = window.matchMedia(MQ);
    const onChange = () => {
      if (!mq.matches) setOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
