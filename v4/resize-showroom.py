#!/usr/bin/env python3
"""ショールームの絵を、実際に表示される大きさに合わせて作り直す。

🔴 なぜ要るか（2026-09-10 実測）
   47枚すべてが横1536px前後だったが、帯のタイルは 112〜660px、右の一覧は最大296px。
   いちばん小さいタイルには**14倍の絵**を配っていた。1枚あたり105KB、
   ショールームまで降りるだけで2.4MB、引き出しを開くとさらに0.8MB流れていた。

🔴 どう決めているか
   ・タイルの幅は**レーンで決まる**。`SR_LANES` は k % 4 で配り、レーン内の並び順で
     `SR_LANE_TILES` → `SR_TILES` の幅が決まる。つまり**作品ごとに必要な幅が一意に決まる**。
     その幅 × 2（高精細画面）× 1.05（ホバーの拡大）で書き出す。
   ・右の一覧は最大296px表示なので、別に `-sm`（横640px）を作る。
     一覧は**その業種の全点を一度に読む**ので、ここがいちばん効く。

⚠️ **作品を足す・並べ替える・レーンの配り方を変えたら、必ずこれを流し直す。**
   k % 4 が変わると必要な幅が変わり、小さすぎる絵がぼやける。
   `--check` で足りているかだけ確かめられる。

⚠️ 元の絵より大きくはしない（引き伸ばしても情報は増えない）。
   足りない絵は「足りない」と出るだけで、そのままの大きさで書き出す。

使い方:
  python3 resize-showroom.py          … 書き出す（元ファイルを上書き。戻すときは git）
  python3 resize-showroom.py --check  … いまのファイルが足りているかだけ見る
"""
import os, re, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
JS   = os.path.join(HERE, 'assets', 'page-D-QS2BLR.js')
IMG  = os.path.join(HERE, 'images', 'works')

HOVER   = 1.05   # .works-tile:hover の拡大ぶん
DPR     = 2      # 高精細画面のぶん
RAIL_W  = 320    # 右の一覧の最大表示幅（--sr-rail の上限）
QUALITY = 80

def read_js():
    s = open(JS, encoding='utf-8').read()
    tiles = [int(m.group(1)) for m in
             re.finditer(r'\{\s*width:\s*(\d+),\s*height:\s*\d+,\s*gap', s)]
    body = re.search(r'SR_LANE_TILES = \[(.*?)\];', s, re.S).group(1)
    lanes = [[int(x) for x in re.findall(r'\d+', row.split('//')[0])]
             for row in body.strip().splitlines() if '[' in row]
    imgs = re.findall(r'image:\s*`\./images/works/(showroom-[^`]+)`', s)
    return tiles, lanes, imgs

def needed():
    tiles, lanes, imgs = read_js()
    out = {}
    for k, name in enumerate(imgs):
        lane  = k % 4
        style = lanes[lane][(k // 4) % len(lanes[lane])]
        out[name] = int(round(tiles[style] * DPR * HOVER))
    return out

def main():
    want  = needed()
    check = '--check' in sys.argv
    before = after = small = 0
    short  = []
    for name, w in sorted(want.items()):
        p = os.path.join(IMG, name)
        if not os.path.exists(p):
            print('  ⚠️ 見つからない:', name); continue
        im = Image.open(p).convert('RGB')
        before += os.path.getsize(p)
        if im.size[0] < w: short.append((name, im.size[0], w))
        if check: continue
        tgt = min(w, im.size[0])
        h = round(im.size[1] * tgt / im.size[0])
        im.resize((tgt, h), Image.LANCZOS).save(p, 'WEBP', quality=QUALITY, method=6)
        after += os.path.getsize(p)
        # 右の一覧ぶん（-sm）。元の絵から作る
        sw = min(RAIL_W * DPR, im.size[0])
        sh = round(im.size[1] * sw / im.size[0])
        sp = p.replace('.webp', '-sm.webp')
        im.resize((sw, sh), Image.LANCZOS).save(sp, 'WEBP', quality=QUALITY, method=6)
        small += os.path.getsize(sp)

    if short:
        print('⚠️ 元の絵が足りないもの（そのままの大きさで書き出す。撮り直すと少しくっきりする）:')
        for n, have, need in short: print('   %-32s いま%5d / 要る%5d' % (n, have, need))
    if check:
        print('確認だけ。書き出していない'); return
    print('タイル用 %.0f KB → %.0f KB（%.0f%% 減）' % (before/1024, after/1024, (1-after/before)*100))
    print('一覧用 -sm を %d枚 作った … %.0f KB（1枚 %.0f KB）' % (len(want), small/1024, small/len(want)/1024))

if __name__ == '__main__':
    main()
