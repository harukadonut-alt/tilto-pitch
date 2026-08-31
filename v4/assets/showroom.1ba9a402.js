/* 表現ショールーム（2026-08-26）。分類の絞り込みと、拡大表示。

   🔴 **一覧はアトラス、拡大は押した1枚だけ個別に取りに行く。**
      一覧の絵は420x280に縮めてあるので、1220px幅まで拡大すると粗い。
      押されたときに初めて `images/works/<file>` を読む。押さない人は読まない。

   🔴 DOMを触るのは「一覧の出し入れ（data-off）」と「拡大の箱」だけ。
      拡大の箱は **body 直下**に作る。節の中に入れると React の再描画で消えるうえ、
      節が `overflow: hidden` なので画面いっぱいに広げられない。 */
(() => {
  function start() {
    const sec = document.querySelector('#expression');
    if (!sec) return;

    const items = [...sec.querySelectorAll('.sw-item')];
    const filters = [...sec.querySelectorAll('.sw-filters button')];

    /* --- 分類で絞る --- */
    const apply = (cat) => {
      items.forEach((el) => {
        const hit = cat === 'すべて' || el.dataset.cat === cat;
        /* ⚠️ クラスではなく data 属性で持つ。className は React の管理下なので、
           再描画で消される。data-* は React が知らないので残る */
        if (hit) el.removeAttribute('data-off');
        else el.setAttribute('data-off', '1');
      });
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
    };

    filters.forEach((b) => b.addEventListener('click', () => apply(b.dataset.cat)));

    /* --- 拡大 --- */
    let box = null;

    const close = () => {
      if (!box) return;
      box.remove();
      box = null;
      document.documentElement.style.removeProperty('overflow');
      document.removeEventListener('keydown', onKey);
    };

    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };

    const open = (el) => {
      close();
      box = document.createElement('div');
      box.className = 'sw-box';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', el.getAttribute('aria-label') || '表現事例');

      const alt = el.querySelector('.sw-visual')?.getAttribute('aria-label') || '';
      const inner = document.createElement('div');
      inner.className = 'sw-box__inner';
      inner.innerHTML =
        '<div class="sw-box__meta"><b>NO.' + el.dataset.no + '</b>' +
        '<em>' + el.dataset.cat + '</em></div>' +
        '<img alt="">' +
        '<button type="button" class="sw-box__close">CLOSE ✕</button>';
      box.appendChild(inner);

      const img = inner.querySelector('img');
      img.alt = alt;
      /* ここで初めて原寸を取りに行く */
      img.src = 'images/works/' + el.dataset.file;

      box.addEventListener('click', (e) => {
        if (e.target === box || e.target.closest('.sw-box__close')) close();
      });

      document.body.appendChild(box);
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
      inner.querySelector('.sw-box__close').focus();
    };

    items.forEach((el) => el.addEventListener('click', () => open(el)));
  }

  function guarded() {
    try {
      start();
    } catch (e) {
      /* 絞り込みも拡大も「あれば良いもの」。失敗しても一覧は流れ続ける */
    }
  }

  if (document.readyState === 'complete') guarded();
  else window.addEventListener('load', guarded);
})();
