/* 設計図オービット — BEHIND THE EXPRESSION
   Canvas 2Dの自前平行投影。three.js等は使わない（前例: tensen-field.js）。

   分解される対象は「商品そのもの」＝採用サイトのページ（基準13(a)・2026-08-14の差し戻しの学び）。
   正面（立面図＝ワイヤーフレームのモック）で完成サイトが1枚に描かれたあと、
   カメラが回り込みながらページが4枚の設計シートに分解される:
     S1 戦略（12カラムグリッド・ベースライン） S2 言葉（コピー） S3 表現（写真・色） S4 体験（ボタン・応募導線）
   建築図面の作法（通り芯記号・寸法連続・年表ティック・隅トンボ・見当マーク・図面枠）で緻密に描く。
   キャンバスは sticky 全面。図はヘッダーの裏まで届く（枠より大きい図面）。 */
(() => {
  const section = document.querySelector('.bim-transition');
  if (!section) return;
  const holder = section.querySelector('.bim-sticky');
  const head = section.querySelector('.bim-head');
  const tblock = section.querySelector('.bim-titleblock');
  const canvas = section.querySelector('.bim-canvas');
  const readout = section.querySelector('[data-bim-readout]');
  const legend = Array.from(section.querySelectorAll('.bim-legend li'));
  const ctx = canvas.getContext('2d');

  const INK = '#1d1b18', SOFT = '#7c7468', FAINT = '#c6bfb2', CORAL = '#b4654e', PAPER = '#fdfcf9';
  const DEG = Math.PI / 180;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ramp = (p, a, b) => clamp((p - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* ---------- ページのモデル ----------
     x: -6..6（ページ幅1440相当） y: 上が+（ページ上端 7.6 / 下端 -7.6） z: シートの奥行き。
     要素は z=0（組み上がった1枚）から、自分のシートの z へ分解されていく。 */
  const SHEET_Z = [-7.2, -2.4, 2.4, 7.2];        // S1 戦略(奥) / S2 言葉 / S3 表現 / S4 体験(手前)
  const MARG = 5.6, TOP = 7.6, BOT = -7.6, GUT = 0.22;
  const COLS = 12, COLX = (i) => -MARG + (i * (MARG * 2)) / COLS;
  const SECY = [6.6, 0.6, -3.6, -5.4];           // セクション境界: nav / FV / cards / band→entry
  const SECNAME = ['NAV', 'FV', 'WORKS', 'ENTRY'];
  const SECPX = ['±0', '+420', '+2,950', '+4,720', '+5,470', '+6,400'];  // 境界のスクロール量（右端の目盛）

  const seg = (x1, y1, x2, y2) => [[x1, y1], [x2, y2]];
  const rect = (x0, y0, x1, y1) => [seg(x0, y0, x1, y0), seg(x1, y0, x1, y1), seg(x1, y1, x0, y1), seg(x0, y1, x0, y0)];

  /* S1 戦略: グリッドは「見えない構造」なので、分解が始まってから現れる */
  const gridSegs = [];
  for (let i = 1; i < COLS; i++) {               // 12カラムをガーター付きの帯で（22本）
    gridSegs.push(seg(COLX(i) - GUT, TOP - 0.25, COLX(i) - GUT, BOT + 0.25));
    gridSegs.push(seg(COLX(i) + GUT, TOP - 0.25, COLX(i) + GUT, BOT + 0.25));
  }
  for (let y = TOP - 0.55; y > BOT + 0.25; y -= 0.46) gridSegs.push(seg(-MARG, y, MARG, y));
  const gridStrong = [
    seg(-MARG, TOP, -MARG, BOT), seg(MARG, TOP, MARG, BOT),
    ...SECY.map((y) => seg(-6.7, y, 6, y)),
  ];
  const gridChain = [seg(-MARG, TOP + 0.55, MARG, TOP + 0.55)];   // カラムの寸法連続
  gridChain.push(seg(-MARG, TOP + 0.42, -MARG, TOP + 0.68), seg(MARG, TOP + 0.42, MARG, TOP + 0.68));
  for (let i = 1; i < COLS; i++) {
    gridChain.push(seg(COLX(i) - GUT, TOP + 0.42, COLX(i) - GUT, TOP + 0.68));
    gridChain.push(seg(COLX(i) + GUT, TOP + 0.42, COLX(i) + GUT, TOP + 0.68));
  }
  const gridTicksR = [];                          // 右端: スクロール量の目盛
  [TOP, ...SECY, BOT].forEach((y) => gridTicksR.push(seg(MARG + 0.15, y, MARG + 0.55, y)));

  /* S2〜S4 と器（ブラウザ枠）。描く順＝正面で線が引かれていく順に並べる */
  const CH = 4;                                   // chrome は器。z=0 に残る
  const groups = [];                              // {L, segs, w, c}
  const G = (L, segs, w, c) => groups.push({ L, segs, w: w || 0.9, c: c || INK });
  const circlesO = [];                            // 輪郭の丸 {L,x,y,r}
  const circlesF = [];                            // 塗りの丸 {L,x,y,r,c}

  /* 器: ブラウザの窓・タブ・スクロールバーまで */
  G(CH, [...rect(-6.35, 8.75, 6.35, -7.9), seg(-6.35, 7.95, 6.35, 7.95),
         ...rect(-3.4, 8.14, 2.4, 8.58),
         seg(-6.0, 8.75, -5.82, 9.14), seg(-5.82, 9.14, -3.95, 9.14), seg(-3.95, 9.14, -3.77, 8.75),
         seg(6.14, 7.6, 6.14, -7.75)], 1.1);
  G(CH, rect(6.05, 6.3, 6.23, 4.4), 0.8, SOFT);  // スクロールバーのつまみ
  circlesF.push({ L: CH, x: -5.9, y: 8.34, r: 0.085, c: INK }, { L: CH, x: -5.55, y: 8.34, r: 0.085, c: INK },
                { L: CH, x: -5.2, y: 8.34, r: 0.085, c: INK }, { L: CH, x: -5.35, y: 8.95, r: 0.07, c: SOFT },
                { L: CH, x: -3.13, y: 8.36, r: 0.06, c: SOFT });
  /* ナビ: ロゴ(表現) / リンク(言葉) / CTA(体験) */
  G(2, [...rect(-MARG, 6.85, -4.5, 7.35), seg(-MARG, 6.85, -4.5, 7.35)]);
  G(1, [seg(0.9, 7.1, 1.7, 7.1), seg(2.1, 7.1, 2.9, 7.1), seg(3.3, 7.1, 3.9, 7.1)], 1.3, SOFT);
  G(3, rect(4.3, 6.8, MARG, 7.42), 1.2);
  /* FV: 見出し・サブ(言葉) / 写真(表現) / CTA(体験) */
  G(1, [...rect(-MARG, 4.8, 0.4, 5.6), ...rect(-MARG, 3.7, -0.9, 4.5)], 1.2);
  G(1, [seg(-MARG, 3.0, -0.4, 3.0), seg(-MARG, 2.62, -1.6, 2.62)], 1, SOFT);
  G(2, [...rect(0.95, 0.85, MARG, 5.6), seg(0.95, 0.85, MARG, 5.6), seg(0.95, 5.6, MARG, 0.85)]);
  G(3, [...rect(-MARG, 1.65, -3.25, 2.42), seg(-3.85, 2.03, -3.5, 2.03)], 1.2);
  /* セクション2: 見出し(言葉) / カード3枚（写真=表現、名前・本文・タグ=言葉、顔=表現の丸） */
  G(1, [...rect(-0.8, 0.02, 0.8, 0.3), ...rect(-2.6, -0.85, 2.6, -0.2)]);
  const cardX = [[-MARG, -2.15], [-1.72, 1.72], [2.15, MARG]];
  cardX.forEach(([x0, x1]) => {
    G(2, [...rect(x0, -3.45, x1, -1.1), ...rect(x0, -2.2, x1, -1.1),
          seg(x0, -2.2, x1, -1.1), seg(x0, -1.1, x1, -2.2)], 0.8);
    circlesO.push({ L: 2, x: x0 + 0.44, y: -2.52, r: 0.17 });
    G(1, [seg(x0 + 0.75, -2.46, x1 - 0.65, -2.46), seg(x0 + 0.75, -2.62, x1 - 1.1, -2.62),
          seg(x0 + 0.25, -2.95, x1 - 0.5, -2.95)], 0.9, SOFT);
    G(1, [...rect(x0 + 0.25, -3.32, x0 + 1.1, -3.1), ...rect(x0 + 1.25, -3.32, x0 + 1.95, -3.1)], 0.7, SOFT);
  });
  circlesF.push({ L: 3, x: -0.35, y: -3.72, r: 0.07, c: CORAL },   // ページャ
                { L: 3, x: 0, y: -3.72, r: 0.07, c: FAINT }, { L: 3, x: 0.35, y: -3.72, r: 0.07, c: FAINT });
  /* 帯(表現): 塗りではなくハッチング（図面の塗りつぶし表現） */
  G(2, rect(-MARG, -5.1, MARG, -3.85), 0.9);
  const hatch = [];
  for (let x = -MARG; x < MARG - 1.2; x += 0.34) hatch.push(seg(x, -5.1, x + 1.25, -3.85));
  G(2, hatch, 0.55, CORAL);
  G(1, [seg(-2.2, -4.32, 2.2, -4.32), seg(-1.5, -4.68, 1.5, -4.68)], 1, SOFT);
  /* ENTRY(体験) と ラベル(言葉) / フッター(言葉) */
  G(3, rect(-1.9, -6.75, 1.9, -5.95), 1.3);
  G(1, [seg(-0.85, -6.35, 0.85, -6.35)], 1.2, PAPER);
  G(1, [seg(-MARG, -7.3, -3.9, -7.3), seg(-3.4, -7.3, -2.3, -7.3), seg(2.3, -7.3, MARG, -7.3)], 0.8, SOFT);

  /* 面で見せるもの（写真・ボタン）。layer と一緒に動く */
  const panels = [
    { L: 2, pts: [[0.95, 0.85], [MARG, 0.85], [MARG, 5.6], [0.95, 5.6]], c: INK, a: 0.82 },
    { L: 2, pts: [[0.95, 5.0], [1.75, 5.0], [1.75, 5.6], [0.95, 5.6]], c: CORAL, a: 0.85 },
    { L: 3, pts: [[-1.9, -6.75], [1.9, -6.75], [1.9, -5.95], [-1.9, -5.95]], c: CORAL, a: 0.9 },
  ];

  /* 体験: 視線と応募の導線。FV→カード→帯→ENTRY のF字 */
  const route = [
    [0, 9.9], [0, 8.36], [-2.6, 5.15], [-4.45, 2.05], [-3.8, -1.7],
    [0, -2.28], [3.8, -1.7], [0, -4.45], [0, -6.35],
  ];

  /* 引き出し線つきの注記 */
  const labels = [
    { a: [-6.9, -5.9], L: 0, dx: -0.055, dy: 0.055, en: '01 / GRID SYSTEM', jp: '戦略の設計' },
    { a: [-MARG, 5.2], L: 1, dx: -0.09, dy: 0.05, en: '02 / COPY', jp: '言葉の設計' },
    { a: [MARG, 3.2], L: 2, dx: 0.085, dy: -0.03, en: '03 / VISUAL', jp: '表現の設計' },
    { a: [1.9, -6.35], L: 3, dx: 0.09, dy: -0.05, en: '04 / FLOW', jp: '体験の設計' },
  ];

  /* ---------- 投影 ---------- */
  const M = { x: 0, y: 0.35 };
  let W = 0, Hh = 0, az = 0, el = 0, sc = 1, cy = 0, fw = 0, fh = 0, labelTop = 26;
  const P = (x, y, z) => {
    const X = x - M.x, Y = y - M.y, Z = z || 0;
    const ca = Math.cos(az), sa = Math.sin(az);
    const x1 = X * ca + Z * sa, z1 = -X * sa + Z * ca;
    const y2 = Y * Math.cos(el) - z1 * Math.sin(el);
    return [W / 2 + x1 * sc, cy - y2 * sc];
  };

  const strokeSegs = (segs, z, color, width, t) => {
    if (t !== undefined && t <= 0) return;
    const n = t === undefined ? segs.length : segs.length * t;
    ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath();
    for (let i = 0; i < Math.floor(n); i++) {
      const [a, b] = segs[i], A = P(a[0], a[1], z), B = P(b[0], b[1], z);
      ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]);
    }
    const f = n - Math.floor(n);                   // 端の1本は途中まで（線を引いている感）
    if (f > 0 && Math.floor(n) < segs.length) {
      const [a, b] = segs[Math.floor(n)], A = P(a[0], a[1], z), B = P(b[0], b[1], z);
      ctx.moveTo(A[0], A[1]);
      ctx.lineTo(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f);
    }
    ctx.stroke();
  };

  const drawCircles = (list, zOf, alpha) => {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha;
    list.forEach((c) => {
      const s2 = P(c.x, c.y, zOf(c.L));
      ctx.beginPath(); ctx.arc(s2[0], s2[1], c.r * sc, 0, 7);
      if (c.c) { ctx.fillStyle = c.c; ctx.fill(); }
      else { ctx.strokeStyle = SOFT; ctx.lineWidth = 0.8; ctx.stroke(); }
    });
    ctx.globalAlpha = 1;
  };

  const fillQuad = (pts, z, color, alpha) => {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha; ctx.fillStyle = color;
    ctx.beginPath();
    pts.forEach((pt, i) => { const s2 = P(pt[0], pt[1], z); i ? ctx.lineTo(s2[0], s2[1]) : ctx.moveTo(s2[0], s2[1]); });
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
  };

  /* 図面の注記は、下の線を紙色で消してから書く */
  const plate = (x, y, text, font, align) => {
    ctx.font = font;
    const w = ctx.measureText(text).width, h = parseInt(font.match(/(\d+)px/)[1], 10);
    const x0 = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
    ctx.fillStyle = PAPER;
    ctx.fillRect(x0 - 3, y - h + 1, w + 6, h + 4);
  };
  const note = (x, y, text, font, align, color) => {
    plate(x, y, text, font, align);
    ctx.fillStyle = color; ctx.font = font; ctx.textAlign = align;
    ctx.fillText(text, x, y);
  };

  const dim = (ax, ay, bx, by, z, text, off) => {   // 寸法線: 両端の出・点・数字
    const A = P(ax, ay, z), B = P(bx, by, z);
    const nx = -(B[1] - A[1]), ny = B[0] - A[0], L = Math.hypot(nx, ny) || 1;
    const ox = (nx / L) * off, oy = (ny / L) * off;
    ctx.strokeStyle = SOFT; ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(A[0], A[1]); ctx.lineTo(A[0] + ox, A[1] + oy);
    ctx.moveTo(B[0], B[1]); ctx.lineTo(B[0] + ox, B[1] + oy);
    ctx.moveTo(A[0] + ox, A[1] + oy); ctx.lineTo(B[0] + ox, B[1] + oy);
    ctx.stroke();
    ctx.fillStyle = SOFT;
    [[A[0] + ox, A[1] + oy], [B[0] + ox, B[1] + oy]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill();
    });
    const tX = Math.max(40, Math.min(W - 40, (A[0] + B[0]) / 2 + ox * 1.9));
    const tY = (A[1] + B[1]) / 2 + oy * 1.9 + 3;
    note(tX, tY, text, '700 9px Arial', 'center', SOFT);
  };

  const bubble = (x, y, z, text) => {               // 通り芯の記号（丸に文字）
    const [sx, sy] = P(x, y, z);
    ctx.strokeStyle = SOFT; ctx.lineWidth = 0.8; ctx.fillStyle = PAPER;
    ctx.beginPath(); ctx.arc(sx, sy, 8.5, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = SOFT; ctx.font = '700 8px Arial'; ctx.textAlign = 'center';
    ctx.fillText(text, sx, sy + 3);
  };

  /* ---------- シート（枠・隅トンボ・見当マーク・図番タグ） ---------- */
  const SHEET = { x0: -6.9, y0: 8.5, x1: 6.9, y1: -8.5 };
  const sheetSegs = rect(SHEET.x0, SHEET.y0, SHEET.x1, SHEET.y1);
  const corner = (x, y, dx, dy) => [seg(x, y, x + dx, y), seg(x, y, x, y + dy)];
  const cross = (x, y) => [seg(x - 0.18, y, x + 0.18, y), seg(x, y - 0.18, x, y + 0.18)];
  const trims = [
    ...corner(SHEET.x0 - 0.25, SHEET.y0 + 0.25, 0.55, -0.55),
    ...corner(SHEET.x1 + 0.25, SHEET.y0 + 0.25, -0.55, -0.55),
    ...corner(SHEET.x0 - 0.25, SHEET.y1 - 0.25, 0.55, 0.55),
    ...corner(SHEET.x1 + 0.25, SHEET.y1 - 0.25, -0.55, 0.55),
    ...cross(0, SHEET.y0 + 0.25), ...cross(0, SHEET.y1 - 0.25),      // 見当マーク
    ...cross(SHEET.x0 - 0.25, 0), ...cross(SHEET.x1 + 0.25, 0),
  ];

  /* ---------- 1フレーム描く ---------- */
  const render = (p) => {
    const cam = ease(ramp(p, 0.2, 0.62));
    az = 40 * cam * DEG;
    el = 20 * cam * DEG;
    /* 正面は目一杯大きく、開いたら全体が収まる大きさへ */
    sc = Math.min(fw / lerp(13.8, 23.8, cam), fh / lerp(18.2, 22.8, cam));

    /* 分解はシートごとに少しずつ遅らせる（順に剥がれていく） */
    const expl = SHEET_Z.map((_, i) => ease(ramp(p, 0.24 + i * 0.055, 0.56 + i * 0.055)));
    const zOf = (L) => (L === CH ? 0 : SHEET_Z[L] * expl[L]);
    const explAvg = expl.reduce((a, b) => a + b, 0) / 4;
    const tSite = ramp(p, 0.02, 0.17);
    const tGrid = ramp(p, 0.26, 0.46);
    const tRoute = ramp(p, 0.74, 0.94);

    ctx.clearRect(0, 0, W, Hh);
    ctx.lineCap = 'round';

    /* シート（奥から）: 枠・隅トンボ・見当マーク・図番タグ */
    if (explAvg > 0.02) {
      SHEET_Z.forEach((zBase, i) => {
        const a = 0.8 * ramp(expl[i], 0.15, 0.9);
        if (a <= 0.01) return;
        const z = zBase * expl[i];
        ctx.globalAlpha = a;
        strokeSegs(sheetSegs, z, FAINT, 0.8);
        strokeSegs(trims, z, SOFT, 0.7);
        const tag = P(SHEET.x1, SHEET.y0, z);
        note(tag[0] - 2, tag[1] - 6, `TLT-A-06 / S${i + 1}`, '700 7px Arial', 'right', SOFT);
        ctx.globalAlpha = 1;
      });
      /* シートの対応点を結ぶ投影線（分解図の作法） */
      ctx.globalAlpha = 0.4 * explAvg;
      ctx.setLineDash([3, 4]);
      [[-6, TOP], [6, TOP], [-6, BOT], [6, BOT]].forEach(([x, y]) => {
        ctx.strokeStyle = FAINT; ctx.lineWidth = 0.7;
        ctx.beginPath();
        const A = P(x, y, SHEET_Z[0] * expl[0]), B = P(x, y, SHEET_Z[3] * expl[3]);
        ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    /* S1 戦略: グリッド（分解が始まってから現れる「見えない構造」） */
    if (tGrid > 0) {
      const z = zOf(0);
      ctx.globalAlpha = 0.5 * tGrid;
      strokeSegs(gridSegs, z, FAINT, 0.55, tGrid);
      ctx.globalAlpha = tGrid;
      strokeSegs(gridStrong, z, SOFT, 0.9, tGrid);
      strokeSegs(gridChain, z, SOFT, 0.6, tGrid);
      strokeSegs(gridTicksR, z, SOFT, 0.7, tGrid);
      if (tGrid > 0.75) {
        const a = ramp(tGrid, 0.75, 1);
        ctx.globalAlpha = a;
        [0, 4, 8, 12].forEach((i) => bubble(COLX(i), TOP + 1.25, z, String(i + 1).padStart(2, '0')));
        SECY.forEach((y, i) => {
          bubble(-7.5, y, z, 'ABCD'[i]);
          const s2 = P(-7.5, y, z);
          note(s2[0], s2[1] + 16, SECNAME[i], '700 6px Arial', 'center', FAINT);
        });
        [TOP, ...SECY, BOT].forEach((y, i) => {   // 右端: スクロール量の目盛
          const s2 = P(MARG + 0.62, y, z);
          note(s2[0] + 4, s2[1] + 3, SECPX[i], '700 7px Arial', 'left', SOFT);
        });
        const chainC = P(0, TOP + 0.55, z);
        note(chainC[0], chainC[1] - 8, '12 × 96 — GAP 24', '700 8px Arial', 'center', SOFT);
        dim(-MARG, BOT - 0.5, MARG, BOT - 0.5, z, '1440 / 12 COL', 26);
        dim(0.4, 3.2, 0.95, 3.2, z, '24', 13);    // 見出しと写真のあき
        dim(-6, -7.0, -MARG, -7.0, z, '96', -13); // 左マージン
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = 1;
    }

    /* ページの要素。
       正面（p<0.24）: 語り順（器→ナビ→FV→カード→帯→ENTRY）に1本のタイムラインで線を引く。
       分解後: シートごとの z で、奥のシートから全量を描く。
       p=0.24 の瞬間はどちらも「z=0・全量」なので、切り替えは見えない */
    if (p < 0.24) {
      let budget = tSite * groups.reduce((a, g) => a + g.segs.length, 0);
      groups.forEach((g) => {
        if (budget <= 0) return;
        strokeSegs(g.segs, 0, g.c, g.w, Math.min(1, budget / g.segs.length));
        budget -= g.segs.length;
      });
    } else {
      [0, 1, CH, 2, 3].forEach((L) => {            // 奥のシートから
        groups.forEach((g) => {
          if (g.L !== L) return;
          ctx.globalAlpha = g.L === CH ? 1 - 0.62 * explAvg : 1;   // 器は薄くなって残る
          strokeSegs(g.segs, zOf(g.L), g.c, g.w);
          ctx.globalAlpha = 1;
        });
      });
    }

    /* 面（写真・色・ボタン）と丸（顔・ページャ・ブラウザの点） */
    const zOfDraw = (L) => (p < 0.24 ? 0 : zOf(L));
    const tPanel = p < 0.24 ? ramp(p, 0.12, 0.2) : 1;
    panels.forEach((q) => fillQuad(q.pts, zOfDraw(q.L), q.c, q.a * tPanel));
    const gEntryLabel = groups.find((g) => g.c === PAPER);
    if (tPanel > 0.5 && gEntryLabel) strokeSegs(gEntryLabel.segs, zOfDraw(1), PAPER, 1.2);
    drawCircles(circlesO, zOfDraw, tPanel);
    const chAlpha = p < 0.24 ? ramp(p, 0.04, 0.1) : 1 - 0.62 * explAvg;
    drawCircles(circlesF.filter((c) => c.L === CH), zOfDraw, chAlpha);
    drawCircles(circlesF.filter((c) => c.L !== CH), zOfDraw, tPanel);

    /* S4 体験: 導線。1本の線として先端から引く */
    if (tRoute > 0) {
      const z = zOf(3);
      const pts = route.map(([x, y]) => P(x, y, z));
      let L = 0;
      for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      ctx.strokeStyle = CORAL; ctx.lineWidth = 1.7;
      ctx.setLineDash(tRoute >= 1 ? [7, 6] : [L, L]);
      ctx.lineDashOffset = tRoute >= 1 ? 0 : L * (1 - tRoute);
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
      ctx.setLineDash([]);
      if (tRoute >= 1) {                           // 経由点と、到達点 = 応募ボタン
        ctx.fillStyle = CORAL;
        pts.slice(1, -1).forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 2.1, 0, 7); ctx.fill(); });
        const tip = P(0, -6.05, z), from = P(0, -5.5, z);
        const ang = Math.atan2(tip[1] - from[1], tip[0] - from[0]);
        ctx.beginPath();
        ctx.moveTo(tip[0], tip[1]);
        ctx.lineTo(tip[0] - 8 * Math.cos(ang - 0.42), tip[1] - 8 * Math.sin(ang - 0.42));
        ctx.lineTo(tip[0] - 8 * Math.cos(ang + 0.42), tip[1] - 8 * Math.sin(ang + 0.42));
        ctx.closePath(); ctx.fill();
        const e2 = P(1.9, -5.95, z);
        note(e2[0] + 10, e2[1] - 4, 'ENTRY', '700 9px Arial', 'left', CORAL);
        const r8 = P(1.9, -6.75, z);
        note(r8[0] + 8, r8[1] + 10, 'R8', '700 7px Arial', 'left', SOFT);
      }
    }

    /* 注記（引き出し線） */
    const labelRamps = [ramp(tGrid, 0.8, 1), ramp(expl[1], 0.8, 1), ramp(expl[2], 0.8, 1), ramp(tRoute, 0.55, 0.9)];
    labels.forEach((lb, i) => {
      const a = labelRamps[i];
      if (a <= 0) return;
      const A = P(lb.a[0], lb.a[1], zOf(lb.L));
      const tx = Math.max(112, Math.min(W - 112, A[0] + lb.dx * W));
      const ty = Math.max(labelTop, Math.min(Hh - 16, A[1] + lb.dy * Hh));
      ctx.globalAlpha = a;
      ctx.strokeStyle = INK; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.fillStyle = INK;
      ctx.beginPath(); ctx.arc(A[0], A[1], 2, 0, 7); ctx.fill();
      const al = lb.dx > 0 ? 'left' : 'right';
      note(tx, ty - 7, lb.en, '700 8px Arial', al, SOFT);
      note(tx, ty + 9, lb.jp, '500 14px "Yu Mincho", "Hiragino Mincho ProN", serif', al, INK);
      ctx.globalAlpha = 1;
    });

    { /* 座標軸の記号（CADのギズモ）: カメラの向きが伝わる */
      const c = [W - 40, cy + fh / 2 - 22], axes = [[1.1, 0, 0, 'X'], [0, 1.1, 0, 'Y'], [0, 0, 1.1, 'Z']];
      const o = P(0, 0, 0);
      ctx.lineWidth = 0.9; ctx.font = '700 7px Arial'; ctx.textAlign = 'center';
      axes.forEach(([x, y, z, name]) => {
        const q = P(x, y, z);
        const dx2 = (q[0] - o[0]) / sc * 16, dy2 = (q[1] - o[1]) / sc * 16;
        ctx.strokeStyle = name === 'Z' ? CORAL : SOFT;
        ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(c[0] + dx2, c[1] + dy2); ctx.stroke();
        ctx.fillStyle = name === 'Z' ? CORAL : SOFT;
        ctx.fillText(name, c[0] + dx2 * 1.32, c[1] + dy2 * 1.32 + 2.5);
      });
    }

    if (readout) {
      const azd = Math.round(az / DEG), eld = Math.round(el / DEG);
      readout.textContent = `${cam < 0.03 ? 'ELEVATION' : 'AXONOMETRIC'} / AZ ${azd}° / EL ${eld}° / EXP ${Math.round(explAvg * 100)}%`;
    }
    const steps = [tGrid, expl[1], expl[2], tRoute];
    legend.forEach((li, i) => li.classList.toggle('is-on', steps[i] > 0.3));
  };

  /* ---------- サイズと駆動 ---------- */
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = holder.clientWidth; Hh = holder.clientHeight;
    canvas.width = W * dpr; canvas.height = Hh * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    /* 広い画面では図がヘッダーの裏（下半分）まで届く。
       狭い画面はヘッダーが縦積みで背が高く、リード文と図が混ざるので重ねない */
    const top = W < 760
      ? head.offsetTop + head.offsetHeight + 6
      : head.offsetTop + head.offsetHeight * 0.55;
    const bot = tblock.offsetTop - 6;
    cy = (top + bot) / 2;
    fw = W * 0.95;
    fh = Math.max(220, bot - top);
    labelTop = head.offsetTop + head.offsetHeight + 12;   // 見出しの裏に注記を入れない
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let prog = 0;                 // いま描いている進行度。リサイズはこれを描き直すだけ
  let frame = 0, played = false;

  const draw = (p) => { prog = p; render(p); };

  /* 確認用: URLに #bim=0.45 を付けると、その進行度で固定描画する
     （ヘッドレスのスクリーンショットがスクロール位置を無視するため） */
  const dbg = /[#&]bim=([\d.]+)/.exec(location.hash);

  /* スクロール送りが成立するのは「セクションが画面より十分高い」ときだけ。
     スマホCSS（height:auto）では成立しないので、matchMedia ではなく実寸で判定する。
     ここを固定値で分岐すると、CSSとJSがずれたときに進行度が0に落ちる */
  const scrollDriven = () => section.offsetHeight > window.innerHeight * 1.25;

  const playOnce = () => {
    if (played) return;
    played = true;
    /* すでに描けているところから続ける。0 から始め直すと、
       リサイズで組み上がった図がいったん消える */
    const t0 = performance.now() - prog * 2600;
    const tick = (now) => {
      draw(clamp((now - t0) / 2600));
      if (prog < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const update = () => {
    frame = 0;
    const r = section.getBoundingClientRect();
    if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
    if (!scrollDriven()) { playOnce(); return; }   // 短いときは一度だけ組み上げる
    const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    if (Math.abs(p - prog) < 0.0005) return;
    draw(p);
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(update); };

  resize();
  if (reduced || dbg) {
    draw(dbg ? clamp(parseFloat(dbg[1])) : 1);      // 動きを減らす設定は完成形を1枚
  } else {
    draw(0);
    update();
    window.addEventListener('scroll', request, { passive: true });
  }

  /* リサイズは「描き直す」だけ。ここで 0 に戻すと、
     スマホのURLバー開閉やタブ復帰のたびに図が消える */
  window.addEventListener('resize', () => {
    resize();
    render(prog);
    if (!reduced && !dbg) request();
  });
})();
