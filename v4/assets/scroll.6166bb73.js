/* スクロールの進行を `<html>` のクラスで配る（2026-08-26）。

   🔴 クラスは **`<html>` に付ける。節の要素には付けない。**
      節は React が描いており className を管理しているので、
      FVの「カタログ」ボタンなどで再描画されると付けたクラスが消える。

   ⚠️ IntersectionObserver だけを使う。スクロールのたびに計算しない
      （FVのWebGLと合成が動いているので、余計な処理を足さない）。 */
(() => {
  function start() {
    const root = document.documentElement;
    const exp = document.querySelector('#experience');
    /* 🔴 節が無い・観測が使えない・途中で失敗した——どれでも
       `exp-anim` を外して**素で読める状態**に戻す。
       この演出は「あれば良いもの」で、無いと読めないものにはしない。
       （head 側でも IntersectionObserver の有無を見て付け外ししている） */
    const giveUp = () => root.classList.remove('exp-anim');
    if (!exp || !('IntersectionObserver' in window)) {
      giveUp();
      return;
    }

    /* 2段階にする。
       ① exp-in    … 節が見えはじめた。言葉がばらばらに浮かぶ
       ② exp-gather … 節が画面の中ほどまで来た。言葉が寄り、ことばが像を結ぶ */
    const io1 = new IntersectionObserver(
      (es) => es.forEach((e) => root.classList.toggle('exp-in', e.isIntersecting)),
      { rootMargin: '-8% 0px -8% 0px' }
    );
    io1.observe(exp);

    const io2 = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) root.classList.add('exp-gather');
      }),
      { rootMargin: '-32% 0px -32% 0px' }
    );
    io2.observe(exp);
  }

  function guarded() {
    try {
      start();
    } catch (e) {
      document.documentElement.classList.remove('exp-anim');
    }
  }

  if (document.readyState === 'complete') guarded();
  else window.addEventListener('load', guarded);
})();
