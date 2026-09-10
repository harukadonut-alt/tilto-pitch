#!/usr/bin/env python3
"""ショールームの帯（works-moving-field）の初期表示を、JSのデータから index.html に書き直す。

🔴 なぜ要るか
   index.html は Showroom コンポーネントの初期描画（絞り込み=ALL・未選択）を**そのまま貼った**もの。
   JSの SR_BASE だけ直すと、貼ってある絵・見出しと食い違って hydration が壊れる。
   手で46枚×2組のボタンを書き直すのは無理なので、JSX と同じ規則で組み立てる。

   ・レーンは k % 4、レーン内の k 番目のタイル寸法は SR_LANE_TILES[レーン][k % 2] → SR_TILES
   ・各レーンは同じ並びを2組（2組目は aria-hidden・tabindex=-1）
   ・「◯の表現サンプルと、◯つの制作実績」「◯の採用サイトが流れ続ける」の数も、JSと両方そろえる

使い方:
  python3 ssr-showroom.py          … index.html と JS の数を書き直す
  python3 ssr-showroom.py --check  … いまの index.html が JS と一致しているかだけ見る
⚠️ 作品を足す・外す・並べ替えたら、resize-showroom.py のあとにこれを流す
"""
import os, re, sys, html
HERE = os.path.dirname(os.path.abspath(__file__))
JS   = os.path.join(HERE, 'assets', 'page-D-QS2BLR.js')
HTML = os.path.join(HERE, 'index.html')

def num(x):  # JS のテンプレート文字列と同じ見た目にする（-.8 → -0.8、6.0 → 6）
    f = float(x); return str(int(f)) if f == int(f) else repr(f)

def esc(t):  return html.escape(t, quote=False)
def attr(t): return html.escape(t, quote=True).replace('&#x27;', "'")

def load():
    s = open(JS, encoding='utf-8').read()
    body = s[s.index('var SR_BASE = ['):s.index('];\n\n/* 中身（FVから下まで）')]
    works = []
    for m in re.finditer(r'\{ id: `(\d+)`, industry: `([^`]+)`, world: `([^`]+)`, tone: `([^`]+)`,\s*'
                         r'title: `([^`]+)`,\s*image: `([^`]+)`,.*?(client: \{|\})', body, re.S):
        works.append(dict(id=m[1], industry=m[2], world=m[3], tone=m[4], title=m[5], image=m[6],
                          client=m[7].startswith('client')))
    inside = set(re.findall(r"'(\d+)': \{ site:", s))
    tiles = [dict(zip(('width','height','gap','y','rotate'), re.findall(r'-?[\d.]+', t)))
             for t in re.findall(r'\{ width: [^}]+\}', s[s.index('var SR_TILES'):])[:8]]
    lt = s[s.index('var SR_LANE_TILES = ['):]
    lt = lt[:lt.index('];')]
    lane_tiles = [[int(x) for x in re.findall(r'\d+', row.split('//')[0])] for row in lt.splitlines()[1:] if '[' in row]
    return s, works, inside, tiles, lane_tiles

def tile(w, t, copy, inside):
    style = (f'--tile-width:{num(t["width"])}px;--tile-height:{num(t["height"])}px;'
             f'--tile-gap:{num(t["gap"])}px;--tile-y:{num(t["y"])}px;--tile-rotate:{num(t["rotate"])}deg')
    badge = '<em class="works-badge">CLIENT WORK</em>' if w['client'] else ''
    return (f'<button class="works-tile" type="button" style="{style}" data-muted="false" data-tone="{w["tone"]}" '
            f'data-selected="false" data-inside="{"true" if w["id"] in inside else "false"}" '
            f'data-client="{"true" if w["client"] else "false"}" tabindex="{"-1" if copy else "0"}" '
            f'aria-label="{attr(w["industry"])}「{attr(w["title"])}」の詳細を見る">'
            f'<img src="{attr(w["image"])}" alt="" loading="lazy"/><span>{badge}'
            f'<small>{esc(w["industry"])}<!-- --> / <!-- -->{esc(w["world"])}</small>'
            f'<b>{esc(w["title"])}</b><i>VIEW →</i></span></button>')

def build(works, inside, tiles, lane_tiles):
    n = len(works)
    out = [f'<div class="works-moving-field" aria-label="{n}の採用サイトが流れ続ける表現ショールーム">']
    for lane in range(4):
        items = [w for k, w in enumerate(works) if k % 4 == lane]
        out.append(f'<div class="works-lane works-lane-{lane+1}"><div class="works-track">')
        for copy in (0, 1):
            out.append('<div class="works-track-group"' + (' aria-hidden="true"' if copy else '') + '>')
            for k, w in enumerate(items):
                t = tiles[lane_tiles[lane][k % len(lane_tiles[lane])]]
                out.append(tile(w, t, copy, inside))
            out.append('</div>')
        out.append('</div></div>')
    out.append('</div>')
    return ''.join(out)

def main():
    s, works, inside, tiles, lane_tiles = load()
    n, nc = len(works), sum(w['client'] for w in works)
    h = open(HTML, encoding='utf-8').read()
    a = h.index('<div class="works-moving-field"')
    b = h.index('<aside class="works-drawer"', a)
    tail = h[a:b]
    # 帯の直後に「準備中」の <p> などは SSR に無い前提（初期は ALL）。帯の閉じタグまでを差し替える
    new = build(works, inside, tiles, lane_tiles)
    fixed_h = h[:a] + new + h[b:]
    fixed_h = re.sub(r'\d+の表現サンプルと、\d+つの制作実績', f'{n-nc}の表現サンプルと、{nc}つの制作実績', fixed_h)
    fixed_s = re.sub(r'\d+の表現サンプルと、\d+つの制作実績', f'{n-nc}の表現サンプルと、{nc}つの制作実績', s)
    fixed_s = re.sub(r'"aria-label": `\d+の採用サイトが流れ続ける', f'"aria-label": `{n}の採用サイトが流れ続ける', fixed_s)
    if '--check' in sys.argv:
        ok = fixed_h == h and fixed_s == s
        print(('一致している' if ok else '⚠️ ずれている（python3 ssr-showroom.py で直る）') + f' … 作品{n}（うち実績{nc}）')
        sys.exit(0 if ok else 1)
    open(HTML, 'w', encoding='utf-8').write(fixed_h)
    open(JS, 'w', encoding='utf-8').write(fixed_s)
    print(f'書き直した … 作品{n}（表現サンプル{n-nc}・実績{nc}）、タイル{n*2}枚（2組）')

if __name__ == '__main__':
    main()
