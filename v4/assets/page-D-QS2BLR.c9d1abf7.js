import { r as e } from "./rolldown-runtime-S-ySWqyJ.c9d1abf7.js";
import { i as t, r as n } from "./framework-DjPHiq1u.c9d1abf7.js";
var r = e(t(), 1),
    i = n(),
    a = {
        upper: {
            foldX: .365,
            foldFrontX: .365,
            frontTopStart: .05,
            frontTopEnd: .18,
            frontTopArc: .055,
            frontBottomStart: .45,
            frontBottomEnd: .35,
            frontBottomArc: .07,
            backCenterYFar: .405,
            backHalfHeightFar: .075,
            topWaveY: .008,
            topWaveDepth: .05,
            textureScale: .5
        },
        lower: {
            depthWave: .32,
            perspectiveAtLeft: .48,
            foregroundBoost: .4,
            foregroundReach: .14,
            foregroundDepth: .18,
            foregroundDrop: .15,
            halfWidthBase: .145,
            halfWidthDepthGain: .05,
            surfaceScale: .93,
            tiltDegrees: 18,
            farEdgeProjection: 1.28,
            nearEdgeProjection: 1,
            textureScale: .44
        }
    },
    o = [{
        x: .35,
        y: .24
    }, {
        x: .362,
        y: .155
    }, {
        x: .385,
        y: .088
    }, {
        x: .43,
        y: .038
    }, {
        x: .52,
        y: .011
    }, {
        x: .62,
        y: .034
    }, {
        x: .71,
        y: .078
    }, {
        x: .81,
        y: .142
    }, {
        x: .9,
        y: .171
    }, {
        x: .955,
        y: .154
    }, {
        x: 1.025,
        y: .112
    }, {
        x: 1.19,
        y: .09
    }],
    s = [{
        x: .575,
        y: .35
    }, {
        x: .625,
        y: .35
    }, {
        x: .675,
        y: .352
    }, {
        x: .72,
        y: .36
    }, {
        x: .765,
        y: .375
    }, {
        x: .82,
        y: .392
    }, {
        x: .91,
        y: .35
    }, {
        x: 1.01,
        y: .315
    }, {
        x: 1.19,
        y: .292
    }],
    c = [{
        x: .35,
        y: .476
    }, {
        x: .4,
        y: .445
    }, {
        x: .45,
        y: .433
    }, {
        x: .5,
        y: .43
    }, {
        x: .575,
        y: .42
    }, {
        x: .65,
        y: .409
    }, {
        x: .72,
        y: .397
    }, {
        x: .78,
        y: .388
    }, {
        x: .86,
        y: .366
    }, {
        x: .95,
        y: .339
    }, {
        x: 1.05,
        y: .321
    }, {
        x: 1.19,
        y: .3
    }],
    l = [{
        x: .35,
        y: .535
    }, {
        x: .4,
        y: .515
    }, {
        x: .45,
        y: .485
    }, {
        x: .5,
        y: .46
    }, {
        x: .575,
        y: .438
    }, {
        x: .65,
        y: .419
    }, {
        x: .72,
        y: .407
    }, {
        x: .78,
        y: .398
    }, {
        x: .86,
        y: .376
    }, {
        x: .95,
        y: .349
    }, {
        x: 1.05,
        y: .331
    }, {
        x: 1.19,
        y: .31
    }],
    u = [{
        x: -.15,
        y: .69
    }, {
        x: 0,
        y: .676
    }, {
        x: .12,
        y: .65
    }, {
        x: .22,
        y: .62
    }, {
        x: .33,
        y: .536
    }, {
        x: .44,
        y: .457
    }, {
        x: .54,
        y: .411
    }, {
        x: .65,
        y: .392
    }, {
        x: .76,
        y: .378
    }, {
        x: .85,
        y: .354
    }, {
        x: .94,
        y: .318
    }, {
        x: 1.05,
        y: .304
    }, {
        x: 1.18,
        y: .3
    }],
    d = [{
        x: -.15,
        y: .82
    }, {
        x: 0,
        y: .798
    }, {
        x: .18,
        y: .798
    }, {
        x: .335,
        y: .786
    }, {
        x: .475,
        y: .761
    }, {
        x: .57,
        y: .727
    }, {
        x: .62,
        y: .708
    }, {
        x: .665,
        y: .7
    }, {
        x: .715,
        y: .703
    }, {
        x: .76,
        y: .714
    }, {
        x: .81,
        y: .741
    }, {
        x: .905,
        y: .741
    }, {
        x: .95,
        y: .751
    }, {
        x: 1,
        y: .761
    }, {
        x: 1.08,
        y: .78
    }, {
        x: 1.18,
        y: .8
    }],
    f = new WeakMap;
function p(e) {
    let t = f.get(e);
    if (t)
        return t;
    let n = e.length,
        r = Array(n).fill(0),
        i = Array(n).fill(0);
    for (let t = 1; t < n - 1; t += 1) {
        let n = e[t].x - e[t - 1].x,
            a = e[t + 1].x - e[t].x,
            o = n + a,
            s = n / o,
            c = s * r[t - 1] + 2,
            l = (e[t].y - e[t - 1].y) / n,
            u = (e[t + 1].y - e[t].y) / a;
        r[t] = (s - 1) / c,
        i[t] = (6 * (u - l) / o - s * i[t - 1]) / c
    }
    for (let e = n - 2; e >= 0; --e)
        r[e] = r[e] * r[e + 1] + i[e];
    return f.set(e, r), r
}
function m(e, t) {
    if (t <= e[0].x)
        return e[0].y;
    let n = e.length - 1;
    if (t >= e[n].x)
        return e[n].y;
    let r = 0,
        i = n;
    for (; i - r > 1;) {
        let n = r + i >> 1;
        e[n].x > t ? i = n : r = n
    }
    let a = p(e),
        o = e[i].x - e[r].x,
        s = (e[i].x - t) / o,
        c = (t - e[r].x) / o;
    return s * e[r].y + c * e[i].y + ((s ** 3 - s) * a[r] + (c ** 3 - c) * a[i]) * o ** 2 / 6
}
function h(e) {
    let t = a.upper.foldFrontX,
        n = .5091,
        r = .575,
        i = .35;
    if (e <= t)
        return n;
    if (e < r) {
        let a = 1 - (e - t) / (r - t);
        return i + (n - i) * a * a
    }
    return m(s, e)
}
var g = [{
        x: 1.18,
        y: .595,
        z: 1
    }, {
        x: .96,
        y: .602,
        z: .78
    }, {
        x: .75,
        y: .625,
        z: .57
    }, {
        x: .54,
        y: .66,
        z: .34
    }, {
        x: .33,
        y: .695,
        z: .09
    }, {
        x: .13,
        y: .715,
        z: -.19
    }, {
        x: -.15,
        y: .69,
        z: -.52
    }],
    _ = [{
        x: 1.12,
        y: .48,
        z: -.94
    }, {
        x: .88,
        y: .47,
        z: -.92
    }, {
        x: .68,
        y: .49,
        z: -.9
    }, {
        x: .52,
        y: .48,
        z: -.86
    }, {
        x: .42,
        y: .51,
        z: -.76
    }, {
        x: .405,
        y: .43,
        z: -.56
    }, {
        x: .4,
        y: .32,
        z: -.34
    }, {
        x: .405,
        y: .2,
        z: -.1
    }, {
        x: .54,
        y: .08,
        z: .02
    }, {
        x: .78,
        y: .09,
        z: .09
    }, {
        x: 1.18,
        y: .18,
        z: .14
    }];
function v(e, t) {
    let n = e.length - 1,
        r = Math.min(t, .999999) * n,
        i = Math.floor(r),
        a = r - i,
        o = e[Math.max(0, i - 1)],
        s = e[i],
        c = e[Math.min(n, i + 1)],
        l = e[Math.min(n, i + 2)],
        u = a * a,
        d = u * a,
        f = e => .5 * (2 * s[e] + (-o[e] + c[e]) * a + (2 * o[e] - 5 * s[e] + 4 * c[e] - l[e]) * u + (-o[e] + 3 * s[e] - 3 * c[e] + l[e]) * d);
    return {
        x: f(`x`),
        y: f(`y`),
        z: f(`z`)
    }
}
function y(e, t, n) {
    let r = e.createShader(t);
    return r ? (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (e.deleteShader(r), null)) : null
}
function b({active: e, kind: t, shadowOnly: n=!1}) {
    let s = (0, r.useRef)(null),
        f = (0, r.useRef)(e);
    return (0, r.useEffect)(() => {
        f.current = e
    }, [e]), (0, r.useEffect)(() => {
        let e = s.current,
            r = t === `upper` ? _ : g,
            i = e?.getContext(`webgl2`, {
                alpha: !0,
                antialias: !0,
                depth: !0,
                premultipliedAlpha: !0
            });
        if (!e || !i)
            return;
        // ループ1周の長さ。上段はゆっくり、下段はそれより約7%速い。
        // 下段の方が手前に見えるので、少し速い方が奥行きが自然になる。
        // ⚠️ 差をつけすぎると「2本の別のもの」に見えて1本のフィルム感が壊れる（5〜10%まで）。
        // ⚠️ 影用のcanvasも同じ kind で作られるので、ここを直せば影も一緒に揃う。
        let tiltoLoopMs = t === `upper` ? 34e3 : 31.5e3;
        // hover中は減速する（速くしない）。読みたいときに読みやすく、
        // 「鑑賞させる」方向に振るため。通常の50%。
        // 🔴 最初 80% にしたが、社長は「遅くなった感じがしない」。
        //    元の速度が約10px/秒しかないので、20%減＝2px/秒の差は知覚できない。
        //    速度そのものより「減速していく動き」が見える必要があるので、
        //    落差を大きく（0.65）し、なじませる時間はむしろ短く（0.34秒）した。
        // ⚠️ 即座に切り替えると段がつくので、0にはしない。
        // ⚠️ 帯は pointer-events:none なので、hoverはFVの枠（.hero-canvas）で見る。
        //    4つのcanvasが同じ枠を見るので、実体と影が揃って減速する。
        // 🔴 .hero-canvas は画面いっぱいなので、これだけで判定すると
        //    料金帯やコピーの上でも「hover中」になり、**実質ずっと減速したまま**になる。
        //    帯の上に居るときだけ減速し、そこから外れたら戻す。
        // 🔴 resize関数（$）の中では `let n = getBoundingClientRect()` が
        //    影フラグの n（shadowOnly）を隠す。ここで別名に捕まえておく
        let tiltoShadow = n,
            tiltoHero = e.closest(`.hero-canvas`),
            tiltoSkip = tiltoHero ? [...tiltoHero.querySelectorAll(`.pricing-strip, .hero-copy, .site-header`)] : [],
            tiltoOver = () => !!tiltoHero && tiltoHero.matches(`:hover`) && !tiltoSkip.some(x => x.matches(`:hover`)),
            tiltoSpeed = 1;
        let p = y(i, i.VERTEX_SHADER, `#version 300 es
                  in vec3 a_position;
                  in vec2 a_uv;
                  in float a_shade;
                  in float a_opacity;
                  in float a_back;
                  in vec3 a_normal;
                  uniform float u_time;
                  uniform float u_upper;
                  out vec2 v_uv;
                  out float v_shade;
                  out float v_opacity;
                  out float v_back;
                  out vec3 v_normal;
                  void main() {
                    vec3 position = a_position;
                    float softWave = sin(a_uv.x * 9.0 + u_time * 0.16) * sin(a_uv.y * 3.14159) * 0.00045;
                    position.z -= softWave;
                    gl_Position = vec4(position, 1.0);
                    v_uv = a_uv;
                    v_shade = a_shade;
                    v_opacity = a_opacity;
                    v_back = a_back;
                    v_normal = a_normal;
                  }`),
            b = y(i, i.FRAGMENT_SHADER, `#version 300 es
                  precision highp float;
                  uniform sampler2D u_texture;
                  uniform float u_offset;
                  uniform float u_light;
                  uniform float u_upper;
                  uniform float u_textureScale;
                  uniform float u_shadowOnly;
                  in vec2 v_uv;
                  in float v_shade;
                  in float v_opacity;
                  in float v_back;
                  in vec3 v_normal;
                  out vec4 outColor;
                  void main() {
                    // Keep the artwork substantially more rectified than the cloth. The
                    // silhouette still carries all of the depth, but the FV panels no
                    // longer inherit an exaggerated diagonal shear from that depth.
                    float panelLean = u_upper > 0.5 ? 0.0035 : 0.010;
                    float ribbonU = v_uv.x - v_uv.y * panelLean;
                    // The lower ribbon recedes sharply at the far-left end. Increase only
                    // that area's horizontal texture density so the FV artwork keeps its
                    // original aspect ratio instead of being pulled wide by perspective.
                    // The geometry and silhouette remain completely unchanged.
                    // 実測: 補正前の横伸びは ribbonU=0.76 あたりから跳ね上がり、
                    // 0.90 で約3.2倍になる（画面左端）。元の線形の傾き0.28では
                    // 1.28倍にしかならず、まったく足りていなかった。
                    // 伸び率の実測カーブに合わせ、傾きが 3乗で立ち上がる形に作り直した。
                    // これで画面 x=0.01〜0.28 の伸びは 2.49→1.02〜1.22 に収まる。
                    // ⚠️ 数値は実測で合わせたもの。計算では出ない（READMEに測り方）。
                    float lowerFar = 1.0 - u_upper;
                    float farW = clamp((ribbonU - 0.69) / 0.24, 0.0, 1.0);
                    float correctedRibbonU = ribbonU
                      + lowerFar * 0.299 * pow(farW, 3.0);
                    float textureX = correctedRibbonU * u_textureScale;
                    // The upper face is parameterized from left to right, while the lower
                    // ribbon is built from the near right edge toward the far left edge.
                    // Reverse both lower texture axes so every FV stays upright and its
                    // Japanese type remains readable instead of appearing 180° rotated.
                    // 🔴 上段と下段で、アトラスの別の区画を使う。
                    //    同じアトラスを両方が読んでいたので、上下に同じ絵が並ぶことがあった。
                    //    上段は15枚のうち1〜7、下段は8〜15。区画をまたがないので絶対に重ならない。
                    //    向きが逆（下段は 1.0 - textureX）なうえ周期も違うので、
                    //    ずらすだけでは必ずどこかで一致する。区画を分けるのが唯一確実。
                    // ⚠️ 区画内のループは bandSpan * fract(x / bandSpan + offset)。
                    //    1周期でちょうど区画1つ分進むので継ぎ目が出ない。
                    //    単純な mod だと u_offset の巻き戻りで絵が飛ぶ。
                    // 🔴 境目は「枚数の比」ではなく「実寸の比」。
                    //    16:9の素材は幅を広く取っているので、アトラスの1枚ずつ幅が違う。
                    //    この値は docs/build-film-atlas.py が出力する（枚数や素材を変えたら差し替え）。
                    float bandLo   = u_upper > 0.5 ? 0.0 : 0.45552;
                    float bandSpan = u_upper > 0.5 ? 0.45552 : 0.54448;
                    float frontX = u_upper > 0.5
                      ? bandLo + bandSpan * fract(textureX / bandSpan + u_offset)
                      : bandLo + bandSpan * fract((1.0 - textureX) / bandSpan - u_offset);
                    // v=0 is the visible top edge for both meshes. Keeping the same Y axis
                    // prevents the lower FV artwork from being vertically reflected.
                    float imageY = v_uv.y;
                    vec2 frontUv = vec2(frontX, imageY);
                    vec2 backUv = vec2(bandLo + bandSpan * fract((1.0 - textureX) / bandSpan - u_offset), imageY);
                    vec4 sharpFront = texture(u_texture, frontUv);
                    // A restrained four-neighbour unsharp mask restores the original FV
                    // artwork after WebGL interpolation, without changing its UV layout.
                    vec3 nearby =
                      texture(u_texture, vec2(fract(frontUv.x - 0.00015), frontUv.y)).rgb +
                      texture(u_texture, vec2(fract(frontUv.x + 0.00015), frontUv.y)).rgb +
                      texture(u_texture, vec2(frontUv.x, clamp(frontUv.y - 0.0029, 0.0, 1.0))).rgb +
                      texture(u_texture, vec2(frontUv.x, clamp(frontUv.y + 0.0029, 0.0, 1.0))).rgb;
                    vec3 crispRgb = clamp(sharpFront.rgb * 1.20 - nearby * 0.05, 0.0, 1.0);
                    sharpFront = vec4(crispRgb, sharpFront.a);
                    vec4 softFront = sharpFront * 0.40;
                    softFront += texture(u_texture, vec2(fract(frontUv.x - 0.0028), clamp(frontUv.y - 0.0035, 0.0, 1.0))) * 0.18;
                    softFront += texture(u_texture, vec2(fract(frontUv.x + 0.0028), clamp(frontUv.y + 0.0035, 0.0, 1.0))) * 0.18;
                    softFront += texture(u_texture, vec2(fract(frontUv.x - 0.0055), clamp(frontUv.y + 0.0060, 0.0, 1.0))) * 0.12;
                    softFront += texture(u_texture, vec2(fract(frontUv.x + 0.0055), clamp(frontUv.y - 0.0060, 0.0, 1.0))) * 0.12;
                    // 下段の左奥をピンボケさせる（奥行きの表現）。
                    // 🔴 上の softFront は「テクセル単位」のにじみなので、左奥のように
                    //    画像が強く縮んでいる場所では**画面上ほとんど効かない**
                    //    （テクスチャは LINEAR_MIPMAP_LINEAR で、縮小はきれいに縮むだけ）。
                    //    本当にピントを外すには、ミップの粗い段を明示的に引く（第3引数のバイアス）。
                    // 範囲は実測。社長の指定（画面x 0〜0.32）は v_uv.x の 0.68〜0.90 にあたる。
                    float lowerLeftBlur = (1.0 - u_upper) * smoothstep(0.66, 0.88, v_uv.x);
                    vec4 defocused = texture(u_texture, frontUv, 2.5 * lowerLeftBlur);
                    vec4 frontTexel = mix(sharpFront,
                      mix(softFront, defocused, 0.70), lowerLeftBlur * 0.95);
                    vec4 backTexel = texture(u_texture, backUv);
                    float backBlend = smoothstep(0.24, 0.76, v_back);
                    vec4 texel = mix(frontTexel, backTexel, backBlend);
                    if (u_shadowOnly > 0.5) {
                      // A dedicated silhouette pass is rendered behind the hero content.
                      // CSS offsets and blurs this exact mesh so the shadow follows every
                      // ribbon curve without altering the artwork or ribbon geometry.
                      outColor = vec4(vec3(0.105, 0.082, 0.066), texel.a * v_opacity * 0.50);
                      return;
                    }
                    vec3 normal = normalize(v_normal);
                    // Key light: high, in front of the ribbon and slightly to the left.
                    // This matches the directional CSS shadows and gives the paper a
                    // restrained, gallery-lit finish without washing out the FV artwork.
                    vec3 lightDirection = normalize(vec3(-0.48, 0.54, 0.70));
                    float diffuse = 0.72 + max(dot(normal, lightDirection), 0.0) * 0.32;
                    vec3 viewDirection = vec3(0.0, 0.0, 1.0);
                    vec3 halfVector = normalize(lightDirection + viewDirection);
                    float satinHighlight = pow(max(dot(normal, halfVector), 0.0), 30.0) * 0.045;
                    float edgeLight = smoothstep(0.085, 0.0, v_uv.y) * 0.12;
                    edgeLight += smoothstep(0.085, 0.0, 1.0 - v_uv.y) * 0.045;
                    float broadSheen = pow(max(0.0, 1.0 - abs(v_uv.y - 0.42) * 2.55), 10.0) * u_light * 0.38;
                    float weave = sin(v_uv.x * 5100.0) * sin(v_uv.y * 760.0) * 0.0018;
                    float edgeShade = 1.0 - smoothstep(0.34, 0.5, abs(v_uv.y - 0.5)) * 0.032;
                    // Preserve the source FV's contrast across the face. Normal lighting
                    // is intentionally subtle here; the edge, fold and silhouette retain
                    // the ribbon's three-dimensional form.
                    float presentationShade = mix(1.0, v_shade, 0.30);
                    float presentationLight = mix(1.0, diffuse, 0.28);
                    vec3 color = texel.rgb * (presentationShade * presentationLight * edgeShade + weave)
                      + vec3(edgeLight * 0.42 + broadSheen + satinHighlight);
                    vec3 underside = texel.rgb * 0.18 + vec3(0.73, 0.71, 0.68);
                    color = mix(color, underside * (0.82 + diffuse * 0.18) + vec3(edgeLight * 0.35), v_back * 0.94);
                    // A broad, feathered lustre over the upper-front panel highlighted in
                    // the reference. It follows the cloth surface, but remains gentle
                    // enough that the FV artwork and black type retain their contrast.
                    // 🔴 UVの半径を揃えても丸くならない。帯は「長くて細い」ので、
                    //   v_uv.x の1目盛と v_uv.y の1目盛では画面上の長さがまるで違う。
                    //   前は 0.105 / 0.27 で、画面では 323×145px＝横に2.2倍のびた帯になり、
                    //   さらに中心が上端(v=0)に近くて切られるので「長方形」に見えていた。
                    //   実測で釣り合わせた値が下の 0.0250 / 0.22（縦横比1.05＝ほぼ真円）。
                    //   ⚠️ 計算では出ない。マスクだけ描いて外接矩形を測ること（README参照）。
                    float glossX = (v_uv.x - 0.627) / 0.02239;
                    float glossY = (v_uv.y - 0.265) / 0.1970;
                    float glossFace = u_upper * (1.0 - backBlend);
                    float glossFall = exp(-(glossX * glossX + glossY * glossY));
                    float upperSoftGloss = glossFall * glossFace * 0.26;
                    color = mix(color, vec3(1.0, 0.988, 0.970), upperSoftGloss);
                    // mix は白より明るくできないので、明るいFV画像の上では芯だけでは読めない。
                    // 芯のすぐ外側をわずかに沈めて局所コントラストを作り、
                    // 下の絵が明るくても暗くても「光の帯」として見えるようにする。
                    float glossShoulder = max(0.0, exp(-(glossX * glossX + glossY * glossY) * 0.30) - glossFall);
                    color *= 1.0 - glossShoulder * glossFace * 0.08;
                    // 折り返しの陰。実測で、表面の折り目は v_uv.x ≒ 0.541
                    //（screen x=0.36 で u=0.541、そこから左は帯が無い＝裏へ回る位置）。
                    // 光は左上手前から来るので、折り目に近づくほど面が光から背き、暗くなる。
                    // 裏へ回った側（backBlend）はさらに沈めて、折り返しの厚みを出す。
                    float foldShade = exp(-pow((v_uv.x - 0.541) / 0.030, 2.0)) * u_upper;
                    color *= 1.0 - foldShade * (0.26 + backBlend * 0.20);
                    // 上段が下段に落とす影。
                    // 🔴 CSSの .ribbon-cast-shadow-scene は「背景に落ちる影」で、
                    //    下段canvas(z-index:2)の下に敷かれているため下段の上には出ない。
                    //    帯の上に落ちる影は、下段のシェーダで直接描くしかない。
                    // 範囲は実測。下段の上辺は v_uv.y=0。
                    // 🔴 右側（画面x 0.79〜）は下段が手前に出るので、そこに影は落ちない。
                    //    下段の v_uv.x は右へ行くほど小さくなるので、u=0.295 で切っている
                    //    （画面x≈0.795）。切り替えは 0.325→0.295 の短い区間で済ませる。
                    float castOnLower = (1.0 - u_upper)
                      * smoothstep(0.25, 0.0, v_uv.y)
                      * smoothstep(0.295, 0.325, v_uv.x)
                      * smoothstep(0.66, 0.57, v_uv.x);
                    color *= 1.0 - castOnLower * 0.50;
                    // 左奥はピントが外れるだけでなく、少し沈める。
                    // 明るいままだと「ボケた」ではなく「かすんだ」に見えて、奥行きが出ない。
                    color *= 1.0 - lowerLeftBlur * 0.20;
                    float crease = exp(-pow((v_uv.x - 0.50) / 0.018, 2.0)) * u_upper;
                    color *= 1.0 - crease * 0.085;
                    color += vec3(crease * 0.018);
                    outColor = vec4(color, texel.a * v_opacity);
                  }`);
        if (!p || !b)
            return;
        let x = i.createProgram();
        if (!x || (i.attachShader(x, p), i.attachShader(x, b), i.linkProgram(x), !i.getProgramParameter(x, i.LINK_STATUS)))
            return;
        let S = i.getAttribLocation(x, `a_position`),
            C = i.getAttribLocation(x, `a_uv`),
            w = i.getAttribLocation(x, `a_shade`),
            T = i.getAttribLocation(x, `a_opacity`),
            E = i.getAttribLocation(x, `a_back`),
            D = i.getAttribLocation(x, `a_normal`),
            O = i.getUniformLocation(x, `u_offset`),
            k = i.getUniformLocation(x, `u_light`),
            A = i.getUniformLocation(x, `u_time`),
            j = i.getUniformLocation(x, `u_upper`),
            M = i.getUniformLocation(x, `u_textureScale`),
            ee = i.getUniformLocation(x, `u_shadowOnly`),
            te = i.getUniformLocation(x, `u_texture`),
            N = i.createBuffer(),
            P = i.createBuffer(),
            F = i.createBuffer(),
            I = i.createBuffer(),
            L = i.createBuffer(),
            R = i.createBuffer(),
            z = i.createBuffer(),
            B = i.createTexture();
        if (!N || !P || !F || !I || !L || !R || !z || !B)
            return;
        let V = [],
            H = [],
            U = [],
            W = [],
            G = [];
        for (let e = 0; e <= 900; e += 1) {
            let n = e / 900,
                i = v(r, n),
                a = n;
            if (t === `upper`) {
                if (n < .46) {
                    let e = n / .46;
                    a = .46 * (e * e * (3 - 2 * e))
                } else if (n >= .54) {
                    let e = (n - .54) / .46;
                    a = .54 + .46 * (e * e * (3 - 2 * e))
                }
            }
            let o = t === `upper` ? n < .46 ? .72 : n < .54 ? .72 + (n - .46) / .08 * .28 : 1 : .57 + (i.z + .7) / 1.55 * .47,
                s = t === `upper` ? n <= .46 ? 1 : n < .54 ? 1 - (n - .46) / .08 : 0 : 0;
            for (let e = 0; e <= 36; e += 1) {
                let t = e / 36;
                V.push(a, t),
                H.push(o),
                U.push(1),
                W.push(s)
            }
            if (e < 900)
                for (let t = 0; t < 36; t += 1) {
                    let n = e * 37 + t;
                    G.push(n, n + 1, n + 37, n + 1, n + 37 + 1, n + 37)
                }
        }
        i.bindBuffer(i.ARRAY_BUFFER, P),
        i.bufferData(i.ARRAY_BUFFER, new Float32Array(V), i.STATIC_DRAW),
        i.bindBuffer(i.ARRAY_BUFFER, F),
        i.bufferData(i.ARRAY_BUFFER, new Float32Array(H), i.STATIC_DRAW),
        i.bindBuffer(i.ARRAY_BUFFER, I),
        i.bufferData(i.ARRAY_BUFFER, new Float32Array(U), i.STATIC_DRAW),
        i.bindBuffer(i.ARRAY_BUFFER, L),
        i.bufferData(i.ARRAY_BUFFER, new Float32Array(W), i.STATIC_DRAW),
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, z),
        i.bufferData(i.ELEMENT_ARRAY_BUFFER, new Uint16Array(G), i.STATIC_DRAW),
        i.bindTexture(i.TEXTURE_2D, B),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.REPEAT),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR_MIPMAP_LINEAR),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR);
        let K = !1,
            q = new Image;
        q.decoding = `async`,
        q.onload = () => {
            i.bindTexture(i.TEXTURE_2D, B),
            i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 0),
            i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, q),
            i.generateMipmap(i.TEXTURE_2D),
            K = !0
        },
        q.src = `images/film-atlas.6a4bbbaa.webp`;
        let J = 0,
            Y = 0,
            X = 0,
            Z = .025,
            Q = performance.now(),
            ne = window.matchMedia(`(prefers-reduced-motion: reduce)`),
            $ = () => {
                let n = e.getBoundingClientRect(),
                    s = Math.min(window.devicePixelRatio || 1, 2.5);
                Y = n.width,
                X = n.height;
                // 影用のcanvas（shadowOnly=n）は低解像度でよい。
                // 描いた絵はCSSで blur(1.35cqw)≈20px ぼかされるので、
                // 本体と同じ解像度（〜3000px幅）で描くのは丸ごと無駄。
                // 実測でGPUの描画ピクセル数が約1/7になり、見た目は変わらない。
                let f = (tiltoShadow ? Math.min(1280, Math.max(768, Y * .75)) : Math.min(4096, Math.max(2048, Y * s))) / Math.max(1, Y);
                e.width = Math.max(1, Math.round(Y * f)),
                e.height = Math.max(1, Math.round(X * f)),
                i.viewport(0, 0, e.width, e.height);
                let p = (e, n) => {
                        if (t === `upper`) {
                            let t = (n - .5) * 2,
                                r = .46,
                                i = .54,
                                s = a.upper.foldX,
                                u = m(o, a.upper.foldFrontX),
                                d = h(a.upper.foldFrontX),
                                f = (u + d) * .5,
                                p = (d - u) * .5,
                                g,
                                _,
                                v,
                                y,
                                b = -1;
                            if (e < r) {
                                let t = e / r,
                                    n = t * t * (3 - 2 * t),
                                    i = n ** 8;
                                g = 1.18 + (a.upper.foldFrontX - 1.18) * n;
                                let o = m(c, g),
                                    s = m(l, g),
                                    u = (o + s) * .5,
                                    d = (s - o) * .5;
                                _ = u * (1 - i) + f * i,
                                v = d * (1 - i) + p * i,
                                y = .34 + -.15000000000000002 * n
                            } else if (e < i) {
                                let t = (e - r) / (i - r) * Math.PI;
                                g = a.upper.foldFrontX - Math.sin(t) ** 2 * (a.upper.foldFrontX - s);
                                let n = m(o, g),
                                    c = h(g);
                                _ = (n + c) * .5,
                                v = (c - n) * .5,
                                y = Math.cos(t) * .19
                            } else {
                                let t = (e - i) / (1 - i),
                                    n = t * t * (3 - 2 * t);
                                b = t,
                                g = a.upper.foldFrontX + (1.19 - a.upper.foldFrontX) * n;
                                let r = m(o, g),
                                    s = h(g);
                                _ = (r + s) * .5,
                                v = (s - r) * .5,
                                y = -.19 + t * .055
                            }
                            let x = Math.sin(e * Math.PI * 2.5 + t * .55) * 35e-5,
                                S = Math.abs(t) ** 2.2 * .018,
                                C = Math.max(0, (1 - t) * .5) ** 1.35,
                                w = b >= 0 ? Math.sin(b * Math.PI * 2) : 0,
                                T = b >= 0 ? (-w * .0025 - b * .0015) * C : 0,
                                E = b >= 0 ? w * a.upper.topWaveDepth * C : 0,
                                D = Math.max(0, Math.min(1, (.6 - g) / .235)),
                                O = t * .018 * D,
                                k = g + O + Math.sin(t * Math.PI) * .0012,
                                A = _ + t * v + T + x * (1 - Math.abs(t) * .32);
                            // 右への平行移動はここ（クリップ座標。0.030 = 画面幅の1.5%）。
                            // 🔴 CSSのtranslateXでcanvasごと動かすと、canvasの左端で
                            //    絵が切れて画面の左に隙間が出る（2026-08-24に発覚）。
                            //    中身をずらせばcanvasは動かないので切れない。
                            return [k * 2 - 1 + .030, 1 - A * 2, y - S + E]
                        }
                        let i = v(r, e);
                        Math.max(0, Math.min(1, (i.z + .68) / 1.52));
                        let s = Math.sin(e * Math.PI * 6 + .28) * a.lower.depthWave * (1 - e * .18),
                            f = (n - .5) * 2,
                            p = m(u, i.x),
                            g = m(d, i.x),
                            _ = n ** .84,
                            y = p + (g - p) * _,
                            b = Math.max(0, Math.min(1, (i.x - .76) / .42)),
                            x = b * b * (3 - 2 * b),
                            S = (p + g) * .5,
                            C = 1 + x * a.lower.foregroundBoost,
                            w = i.x + x * a.lower.foregroundReach,
                            T = Math.max(0, Math.min(1, (i.x - .46) / .42)),
                            E = T ** 3 * (T * (T * 6 - 15) + 10),
                            D = _ ** 2.4,
                            O = S + (y - S) * C + E * a.lower.foregroundDrop * D,
                            k = Math.abs(f) ** 2.05 * .026,
                            A = Math.sin(e * Math.PI * 2.7 + f * .72) * .004,
                            j = f * Math.tan(a.lower.tiltDegrees * Math.PI / 180) * .45,
                            M = -i.z * .42 - x * a.lower.foregroundDepth - k + A + s + j;
                        // 下段の右ずらし（0.018 = 画面幅の0.9%）。理由は上段と同じ
                        return [w * 2 - 1 + .018, 1 - O * 2, M]
                    },
                    g = [],
                    _ = [];
                for (let e = 0; e <= 900; e += 1) {
                    let t = e / 900;
                    for (let e = 0; e <= 36; e += 1) {
                        let n = e / 36,
                            r = p(t, n),
                            i = p(Math.max(0, t - .0015), n),
                            a = p(Math.min(.999999, t + .0015), n),
                            o = p(t, Math.max(0, n - .012)),
                            s = p(t, Math.min(1, n + .012)),
                            c = [a[0] - i[0], a[1] - i[1], a[2] - i[2]],
                            l = [s[0] - o[0], s[1] - o[1], s[2] - o[2]],
                            u = c[1] * l[2] - c[2] * l[1],
                            d = c[2] * l[0] - c[0] * l[2],
                            f = c[0] * l[1] - c[1] * l[0],
                            m = Math.max(1e-6, Math.hypot(u, d, f));
                        u /= m,
                        d /= m,
                        f /= m,
                        f < 0 && (u *= -1, d *= -1, f *= -1),
                        g.push(...r),
                        _.push(u, d, f)
                    }
                }
                i.bindBuffer(i.ARRAY_BUFFER, N),
                i.bufferData(i.ARRAY_BUFFER, new Float32Array(g), i.DYNAMIC_DRAW),
                i.bindBuffer(i.ARRAY_BUFFER, R),
                i.bufferData(i.ARRAY_BUFFER, new Float32Array(_), i.DYNAMIC_DRAW)
            },
            re = e => {
                let r = Math.min(e - Q, 40);
                Q = e,
                tiltoSpeed += ((tiltoOver() ? .5 : 1) - tiltoSpeed) * Math.min(1, r / 340),
                f.current && !ne.matches && (Z = (Z - r * tiltoSpeed / tiltoLoopMs + 1) % 1),
                i.clearColor(0, 0, 0, 0),
                i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT),
                K && (i.enable(i.DEPTH_TEST), i.depthFunc(i.LEQUAL), i.enable(i.BLEND), i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA), i.useProgram(x), i.bindBuffer(i.ARRAY_BUFFER, N), i.enableVertexAttribArray(S), i.vertexAttribPointer(S, 3, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, P), i.enableVertexAttribArray(C), i.vertexAttribPointer(C, 2, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, F), i.enableVertexAttribArray(w), i.vertexAttribPointer(w, 1, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, I), i.enableVertexAttribArray(T), i.vertexAttribPointer(T, 1, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, L), i.enableVertexAttribArray(E), i.vertexAttribPointer(E, 1, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, R), i.enableVertexAttribArray(D), i.vertexAttribPointer(D, 3, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, z), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, B), i.uniform1i(te, 0), i.uniform1f(O, Z), i.uniform1f(k, .035 + Math.sin(e / 2700) * .014), i.uniform1f(A, e / 1e3), i.uniform1f(j, +(t === `upper`)), i.uniform1f(ee, +!!n), i.uniform1f(M, t === `upper` ? a.upper.textureScale : a.lower.textureScale), i.drawElements(i.TRIANGLES, G.length, i.UNSIGNED_SHORT, 0)),
                J = requestAnimationFrame(re)
            };
        return $(), window.addEventListener(`resize`, $), J = requestAnimationFrame(re), () => {
            cancelAnimationFrame(J),
            window.removeEventListener(`resize`, $),
            i.deleteTexture(B),
            i.deleteBuffer(N),
            i.deleteBuffer(P),
            i.deleteBuffer(F),
            i.deleteBuffer(I),
            i.deleteBuffer(L),
            i.deleteBuffer(R),
            i.deleteBuffer(z),
            i.deleteProgram(x),
            i.deleteShader(p),
            i.deleteShader(b)
        }
    }, [t, n]), (0, i.jsx)(`canvas`, {
        ref: s,
        className: `webgl-film webgl-film--${t}`,
        "aria-hidden": `true`
    })
}
/* ============================================================
   04 表現ショールーム（GPT製サイトからの移植・2026-08-31）

   出どころ: https://tilto-recruiting.haruka-namasute.chatgpt.site
   フレームワークのバンドル（framework-DjPHiq1u.c9d1abf7.js / rolldown-runtime-S-ySWqyJ.c9d1abf7.js）が
   うちのv4と**バイト単位で同一**だったので、Reactコンポーネントのまま持ってこられた。
   絞り込みと詳細ドロワーが動くのは、これが本物のコンポーネントだから。

   ⚠️ index.html 側のSSRは、このコンポーネントの初期描画（絞り込み=ALL・未選択）を
      そのまま貼っている。**片方だけ直すとhydrationが壊れる**ので必ず両方直すこと。
   ============================================================ */
/* 絞り込みの業種。⚠️ **まだ表現サンプルが1点も無い業種**（製造・小売／士業・コンサル／教育）も
   ここに入れている。押しても何も残らないので、その場合は「準備中」を出す（下の hasMatch）。 */
var SR_FILTERS = [`ALL`, `IT・テック`, `建設・不動産`, `製造・小売`, `物流・運輸`, `医療・看護`, `介護・福祉`, `飲食・サービス`, `エンタメ`, `士業・コンサル`, `教育`];

/* うちが実際に作った35枚（images/works/）。業種・見出し・絵は1対1で対応している。
   🔴 これは**表現サンプル**であって、実在企業の採用サイトではない。
      「実例」「実績」と書かないこと（旧ショールームからの約束）。
   ⚠️ 並び順を変えるとレーンへの配り方（k % 3）が変わり、業種の散り方が崩れる。
      いまは7業種を順ぐりに並べて、3レーンに業種がばらけるようにしてある。 */
var SR_BASE = [
    { id: `01`, industry: `IT・テック`, world: `DARK TECH`, tone: `sumi`,
      title: `超える。`,
      image: `./images/works/showroom-it-01.webp`,
      alt: `透明なクリスタルと流体の3DグラフィックにHELLOの文字を重ねたIT企業の採用サイトFV` },
    { id: `02`, industry: `建設・不動産`, world: `ENGINEERING`, tone: `paper`,
      title: `まだ、ここにない景色を。`,
      image: `./images/works/showroom-construction-01.webp`,
      alt: `巨大な高架橋の下に立つ人と、100年後。の文字を重ねた建設企業の採用サイトFV` },
    { id: `03`, industry: `物流・運輸`, world: `INFRASTRUCTURE`, tone: `paper`,
      title: `未来のインフラを、支えるんだ。`,
      image: `./images/works/showroom-logistics-01.webp`,
      alt: `夜の高速道路を走るトラックと365/24/7の大きな数字を組んだ物流企業の採用サイトFV` },
    { id: `04`, industry: `医療・看護`, world: `CLINICAL`, tone: `coral`,
      title: `本質を見抜き、価値をつくる。`,
      image: `./images/works/showroom-medical-01.webp`,
      alt: `37.0℃という体温の数字を大きく置き、看護師と患者の手を重ねた医療機関の採用サイトFV` },
    { id: `05`, industry: `介護・福祉`, world: `WELLBEING`, tone: `sumi`,
      title: `個性が、つながる力に。`,
      image: `./images/works/showroom-care-01.webp`,
      alt: `80歳の女性を主役に人生を前向きに表現した介護福祉の採用サイトFV` },
    { id: `06`, industry: `飲食・サービス`, world: `FOOD / CRAFT`, tone: `paper`,
      title: `Design Your Career.`,
      image: `./images/works/showroom-food-01.webp`,
      alt: `炎と調理風景を大きく見せた飲食店の採用サイトFV` },
    { id: `07`, industry: `エンタメ`, world: `STAGE / CULTURE`, tone: `coral`,
      title: `挑むほど、面白くなる。`,
      image: `./images/works/showroom-entertainment-01.webp`,
      alt: `開演5分前の暗い舞台袖を切り取り、幕と照明だけを見せたエンタメ企業の採用サイトFV` },
    { id: `08`, industry: `IT・テック`, world: `PRODUCT DESIGN`, tone: `paper`,
      title: `静かな革命。`,
      image: `./images/works/showroom-it-02.webp`,
      alt: `静かな人が深く変える、というコピーを据えたIT企業の採用サイトFV` },
    { id: `09`, industry: `建設・不動産`, world: `FIELD / CRAFT`, tone: `paper`,
      title: `街を、未来を、つくっている。`,
      image: `./images/works/showroom-construction-02.webp`,
      alt: `白い建築模型と図面を俯瞰し、橋を、つくる。と置いた建設企業の採用サイトFV` },
    { id: `10`, industry: `物流・運輸`, world: `REGIONAL / CITY`, tone: `sumi`,
      title: `働くを、もっと自由に。`,
      image: `./images/works/showroom-logistics-02.webp`,
      alt: `蛍光グリーンの地に矢印と日本地図の物流網を描いた物流企業の採用サイトFV` },
    { id: `11`, industry: `医療・看護`, world: `EDITORIAL`, tone: `coral`,
      title: `誰かの明日を、近くする。`,
      image: `./images/works/showroom-medical-02.webp`,
      alt: `医療データとチームの写真を精密に構成した医療機関の採用サイトFV` },
    { id: `12`, industry: `介護・福祉`, world: `CARE / DAILY LIFE`, tone: `sumi`,
      title: `人の可能性を、ひらく。`,
      image: `./images/works/showroom-care-02.webp`,
      alt: `きょう、何する？の手書き文字と、利用者と職員が庭で過ごす写真を組んだ介護福祉の採用サイトFV` },
    { id: `13`, industry: `飲食・サービス`, world: `HOSPITALITY`, tone: `coral`,
      title: `ワクワクする方へ、進め。`,
      image: `./images/works/showroom-food-02.webp`,
      alt: `開店前の静かな店内と、AM 5:42という時刻を組んだ飲食店の採用サイトFV` },
    { id: `14`, industry: `エンタメ`, world: `POP / CULTURE`, tone: `paper`,
      title: `旅を仕事にするという生き方。`,
      image: `./images/works/showroom-entertainment-02.webp`,
      alt: `鮮やかなピンクとコラージュで熱狂を表現したエンタメ企業の採用サイトFV` },
    { id: `15`, industry: `IT・テック`, world: `DIGITAL CULTURE`, tone: `sumi`,
      title: `つくるのは、仕組みか、ミライか。`,
      image: `./images/works/showroom-it-03.webp`,
      alt: `NOT YETの大きな空白と線画のワイヤーフレームで余白を活かしたIT企業の採用サイトFV` },
    { id: `16`, industry: `建設・不動産`, world: `URBAN DESIGN`, tone: `paper`,
      title: `現場から、未来を変える。`,
      image: `./images/works/showroom-construction-03.webp`,
      alt: `図面から現場、街へつながる仕事をグラフィカルに表現した建設企業の採用サイトFV` },
    { id: `17`, industry: `物流・運輸`, world: `LOGISTICS`, tone: `coral`,
      title: `変化の真ん中へ。`,
      image: `./images/works/showroom-logistics-03.webp`,
      alt: `トラックの運転席から夕暮れの街を望む写真に、「いってきます」から、仕事です。と添えた物流企業の採用サイトFV` },
    { id: `18`, industry: `医療・看護`, world: `CLINICAL`, tone: `sumi`,
      title: `地域医療の、新しい輪郭。`,
      image: `./images/works/showroom-medical-03.webp`,
      alt: `病室の窓辺に立つ看護師と患者の写真に、あなたがいて、よかった。と縦書きで添えた医療機関の採用サイトFV` },
    { id: `19`, industry: `介護・福祉`, world: `WELLBEING`, tone: `paper`,
      title: `仕事の意味を、見つけよう。`,
      image: `./images/works/showroom-care-03.webp`,
      alt: `暮らす・笑う・食べる・生きるの4語を太い文字で積み、日常の写真を挟んだ介護福祉の採用サイトFV` },
    { id: `20`, industry: `飲食・サービス`, world: `ILLUSTRATION`, tone: `sumi`,
      title: `選ばれる理由を、つくる。`,
      image: `./images/works/showroom-food-03.webp`,
      alt: `黒い地に一皿だけを置き、一皿一生。と縦書きで添えた飲食店の採用サイトFV` },
    { id: `21`, industry: `エンタメ`, world: `STAGE / CULTURE`, tone: `coral`,
      title: `想像を、創造に変える。`,
      image: `./images/works/showroom-entertainment-03.webp`,
      alt: `つまらないなら、つくれば？という問いを漫画のコマのように構成したエンタメ企業の採用サイトFV` },
    { id: `22`, industry: `IT・テック`, world: `DARK TECH`, tone: `sumi`,
      title: `テクノロジーに、温度を。`,
      image: `./images/works/showroom-it-04.webp`,
      alt: `コードと手書きメモを机の上に広げたようにコラージュしたIT企業の採用サイトFV` },
    { id: `23`, industry: `建設・不動産`, world: `INFRASTRUCTURE`, tone: `paper`,
      title: `この街は、誰かの仕事でできている。`,
      image: `./images/works/showroom-shindo-fv.webp`,
      alt: `高架下の柱に立つ作業員を見上げ、「この街は、誰かの仕事でできている。」を重ねたインフラ企業の採用サイトFV` },
    { id: `24`, industry: `物流・運輸`, world: `INFRASTRUCTURE`, tone: `paper`,
      title: `くらしを支える、その先へ。`,
      image: `./images/works/showroom-logistics-04.webp`,
      alt: `黄色いシャッターとフォークリフトを背に、運ぶ。以上。と大書した物流企業の採用サイトFV` },
    { id: `25`, industry: `医療・看護`, world: `EDITORIAL`, tone: `coral`,
      title: `誠実さを、強さに。`,
      image: `./images/works/showroom-medical-04.webp`,
      alt: `大きな余白の中に、そばに。の一言と病室の小さな写真だけを置いた医療機関の採用サイトFV` },
    { id: `26`, industry: `介護・福祉`, world: `CARE / DAILY LIFE`, tone: `sumi`,
      title: `ケアの景色を、更新する。`,
      image: `./images/works/showroom-care-04.webp`,
      alt: `鮮やかな青地に介護職、かっこよくないですか。と問いかけ、職員の横顔を置いた介護福祉の採用サイトFV` },
    { id: `27`, industry: `飲食・サービス`, world: `FOOD / CRAFT`, tone: `paper`,
      title: `余白から、発想する。`,
      image: `./images/works/showroom-food-04.webp`,
      alt: `雑誌の見開きのように畑から厨房までの写真を並べ、おいしい、の裏側へ。と置いた飲食店の採用サイトFV` },
    { id: `28`, industry: `エンタメ`, world: `POP / CULTURE`, tone: `coral`,
      title: `学ぶ人から、つくる人へ。`,
      image: `./images/works/showroom-entertainment-04.webp`,
      alt: `誰もいない暗いスタジオに、監督椅子と照明だけを置いたエンタメ企業の採用サイトFV` },
    { id: `29`, industry: `IT・テック`, world: `PRODUCT DESIGN`, tone: `paper`,
      title: `好奇心を、仕事に。`,
      image: `./images/works/showroom-it-05.webp`,
      alt: `バグの世界をネオンカラーの壮大なイラストで描いたIT企業の採用サイトFV` },
    { id: `30`, industry: `建設・不動産`, world: `FIELD / CRAFT`, tone: `paper`,
      title: `技術で、まだ見ぬ当たり前を。`,
      image: `./images/works/showroom-construction-05.webp`,
      alt: `図面から街が立ち上がる瞬間を繊細な青いイラストで表現した建設企業の採用サイトFV` },
    { id: `31`, industry: `物流・運輸`, world: `REGIONAL / CITY`, tone: `sumi`,
      title: `まちの記憶を、次へ。`,
      image: `./images/works/showroom-logistics-05.webp`,
      alt: `物流拠点と街を線で結び、見えない物流網を緻密に描いた採用サイトFV` },
    { id: `32`, industry: `介護・福祉`, world: `WELLBEING`, tone: `coral`,
      title: `らしさが、採用を動かす。`,
      image: `./images/works/showroom-care-05.webp`,
      alt: `人生のカラフルさを手描きイラストでにぎやかに表現した介護福祉の採用サイトFV` },
    { id: `33`, industry: `飲食・サービス`, world: `HOSPITALITY`, tone: `sumi`,
      title: `売るより、出会いをつくる。`,
      image: `./images/works/showroom-food-05.webp`,
      alt: `食のつながりを大勢の人物と食材の温かなイラストで描いた採用サイトFV` },
    { id: `34`, industry: `IT・テック`, world: `DIGITAL CULTURE`, tone: `coral`,
      title: `小さな違和感から、世界を変える。`,
      image: `./images/works/showroom-it-06.webp`,
      alt: `エラーや発見を親しみやすい手描きモチーフで構成したIT企業の採用サイトFV` },
    { id: `35`, industry: `物流・運輸`, world: `LOGISTICS`, tone: `paper`,
      title: `つながりが、未来を運ぶ。`,
      image: `./images/works/showroom-logistics-06.webp`,
      alt: `街を運ぶトラックを大胆な青とオレンジのイラストで表現した物流企業の採用サイトFV` }
];

/* 中身（FVから下まで）を見せられる作品。**縦長のサイト全体画像がある作品だけ**書く。
   増やし方: images/works-full/ に縦長の画像を1枚置いて、ここに1行足すだけ。
   ⚠️ 無い作品にうっかり書かない。押しても中身が出ない扱いになる。 */
var SR_INSIDE = {
    // 建設・不動産「この街は、誰かの仕事でできている。」← 03で使っている縦長のサイト。
    //   ⚠️ タイルの絵は、この縦長画像のFV部分を切り出したもの。
    //      タイルと中身が別のサイトにならないよう、必ず同じ素材から作る
    '23': { site: `./images/section03-site.webp`, ratio: 1280 / 1229 }
};

var SR_WORKS = SR_BASE.map((w, k) => ({
    ...w,
    description: k % 3 === 0
        ? `現場にある熱と意志を拾い上げ、挑戦する姿勢とスケール感が伝わる採用体験へ。`
        : k % 3 === 1
            ? `まだ言葉になっていなかった会社の魅力を、写真・コピー・余白の設計でひとつの世界観に。`
            : `仕事の意味と働く人の温度を整理し、候補者が自分の未来を重ねられる採用サイトへ。`,
    inside: SR_INSIDE[w.id] || null
}));

// 3レーンに1枚ずつ配る。レーンごとに流れる向きが変わる
var SR_LANES = [SR_WORKS.filter((e, k) => k % 3 === 0),
                SR_WORKS.filter((e, k) => k % 3 === 1),
                SR_WORKS.filter((e, k) => k % 3 === 2)];

/* タイルの寸法と傾き。
   🔴 **全部 16:9。縦長を混ぜない**（2026-09-01）。素材35点はすべて横長で、
      採用サイトのFV自体が横長。縦枠に入れると横幅の57〜69%が切り落とされていた。

   🔴 奥行き3回目（2026-09-01）。強弱をさらに広げた。
      1回目 205〜420px（2.0倍）→ 見分けがつかず「わかりにくい」
      2回目 130〜580px（4.5倍）
      3回目 **108〜700px（6.5倍）** … 奥をさらに小さく、手前を最大に。
      1456px幅では手前1枚が画面の48%を占める。
      ⚠️ 戻すときは `git checkout before-depth-04c -- site-v4` */
var SR_LANE_TILES = [
    [0, 1, 2],   // 奥   … 108 / 124 / 142px
    [3, 4],      // 中   … 250 / 290px
    [5, 6, 7]    // 手前 … 540 / 620 / 700px
];

var SR_TILES = [
    { width: 108, height: 61, gap: 14, y: 7, rotate: -1.1 },
    { width: 124, height: 70, gap: 11, y: -6, rotate: 1.4 },
    { width: 142, height: 80, gap: 17, y: 4, rotate: -.6 },
    { width: 250, height: 141, gap: 28, y: -10, rotate: 1.1 },
    { width: 290, height: 163, gap: 24, y: 9, rotate: -1.5 },
    { width: 540, height: 304, gap: 52, y: 13, rotate: -1.1 },
    { width: 620, height: 349, gap: 66, y: -15, rotate: .8 },
    { width: 700, height: 394, gap: 58, y: 11, rotate: 1.5 }
];

function Showroom() {
    let [filter, setFilter] = (0, r.useState)(`ALL`);
    let [picked, setPicked] = (0, r.useState)(null);
    let closeRef = (0, r.useRef)(null);
    /* 🔴 サンプルが1点も無い業種で絞ると、タイルが全部薄くなるだけで壊れて見える。
       そのときは壁の上に一言出す。⚠️ 初期は ALL なので SSR には出ない＝hydrationはズレない */
    let hasMatch = (0, r.useMemo)(() => filter === `ALL` || SR_WORKS.some(w => w.industry === filter), [filter]);
    let work = (0, r.useMemo)(() => SR_WORKS.find(e => e.id === picked) ?? null, [picked]);
    /* 🔴 左に大きく出すのは**上から下まで見られる作品**だけ（社長指示）。
       押した作品にサイトが無いときは、いま見せられるサイトを出し、
       押した作品そのものは右の一覧の先頭に置く。
       ⚠️ どのタイルも押したら開く。「押しても何も起きない」は壊れて見える */
    let shown = (0, r.useMemo)(() => work
        ? (work.inside ? work : (SR_WORKS.find(x => x.inside) || work))
        : null, [work]);
    /* 右の列は「選んだタイルと同じ業種のFVを**全部**」（2026-09-01・社長指示）。
       前は業種に関係なく、ずらし幅 1,2,4,5 で4点だけ拾っていた。
       ⚠️ 数を決め打ちしない。業種ごとの点数が増えたらそのぶん増える（列はスクロールする） */
    let related = (0, r.useMemo)(() => !work ? []
        : SR_WORKS.filter(w => w.industry === work.industry), [work]);

    (0, r.useEffect)(() => {
        if (!work) return;
        closeRef.current?.focus();
        let onKey = e => { e.key === `Escape` && setPicked(null) };
        document.addEventListener(`keydown`, onKey);
        return () => document.removeEventListener(`keydown`, onKey)
    }, [work]);

    return (0, i.jsxs)(`section`, {
        className: `works-showroom`,
        id: `expression`,
        "aria-labelledby": `showroom-title`,
        "data-drawer-open": work ? `true` : `false`,
        children: [(0, i.jsxs)(`div`, {
            className: `works-intro`,
            children: [                (0, i.jsx)(`h2`, {
                    id: `showroom-title`, className: `sr-only`, children: `表現ショールーム`
                }),
                (0, i.jsx)(`div`, {
                    className: `works-filters`, role: `group`, "aria-label": `業界で絞り込む`,
                    children: SR_FILTERS.map(name => (0, i.jsx)(`button`, {
                        type: `button`,
                        "aria-pressed": filter === name,
                        onClick: () => setFilter(name),
                        children: name
                    }, name))
                }),
                (0, i.jsxs)(`h3`, { children: [`振れ幅そのものが、`, (0, i.jsx)(`br`, {}), `商品です。`] }),
                (0, i.jsxs)(`p`, {
                    children: [`業界も、職種も、伝え方も、設計も。`, (0, i.jsx)(`br`, {}),
                        `採用サイトは、もっと自由でいい。`, (0, i.jsx)(`br`, {}),
                        `その可能性を、35の表現サンプルで。`]
                })]
        }), (0, i.jsx)(`div`, {
            className: `works-moving-field`,
            "aria-label": `35の採用サイトが流れ続ける表現ショールーム`,
            children: SR_LANES.map((lane, laneNo) => (0, i.jsx)(`div`, {
                className: `works-lane works-lane-${laneNo + 1}`,
                children: (0, i.jsx)(`div`, {
                    className: `works-track`,
                    // 2組ぶら下げて、片方が流れ切る前にもう片方が続く（途切れない帯）
                    children: [0, 1].map(copy => (0, i.jsx)(`div`, {
                        className: `works-track-group`,
                        "aria-hidden": copy === 1 || void 0,
                        children: lane.map((w, k) => {
                            let t = SR_TILES[SR_LANE_TILES[laneNo][k % SR_LANE_TILES[laneNo].length]];
                            let muted = filter !== `ALL` && filter !== w.industry;
                            return (0, i.jsxs)(`button`, {
                                className: `works-tile`,
                                type: `button`,
                                style: {
                                    "--tile-width": `${t.width}px`,
                                    "--tile-height": `${t.height}px`,
                                    "--tile-gap": `${t.gap}px`,
                                    "--tile-y": `${t.y}px`,
                                    "--tile-rotate": `${t.rotate}deg`
                                },
                                "data-muted": muted ? `true` : `false`,
                                "data-tone": w.tone,
                                "data-selected": picked === w.id ? `true` : `false`,
                                "data-inside": w.inside ? `true` : `false`,
                                tabIndex: copy === 1 ? -1 : 0,
                                onClick: () => setPicked(w.id),
                                "aria-label": `${w.industry}「${w.title}」の詳細を見る`,
                                children: [(0, i.jsx)(`img`, { src: w.image, alt: ``, loading: `lazy` }),
                                    (0, i.jsxs)(`span`, {
                                        children: [(0, i.jsxs)(`small`, { children: [w.industry, ` / `, w.world] }),
                                            (0, i.jsx)(`b`, { children: w.title }),
                                            (0, i.jsx)(`i`, { children: `VIEW →` })]
                                    })]
                            }, `${copy}-${w.id}`)
                        })
                    }, `group-${copy}`))
                })
            }, `lane-${laneNo + 1}`))
        }), hasMatch ? null : (0, i.jsx)(`p`, {
            className: `works-empty`,
            children: `この業種の表現サンプルは準備中です。`
        }), (0, i.jsxs)(`aside`, {
            className: `works-drawer`,
            role: `dialog`,
            "aria-modal": work ? `true` : void 0,
            "aria-label": shown ? `${shown.title}の詳細` : `選択した作品の詳細`,
            "aria-hidden": !work,
            children: [(0, i.jsx)(`button`, {
                ref: closeRef, type: `button`, className: `works-drawer-close`,
                onClick: () => setPicked(null), "aria-label": `詳細を閉じる`, children: `×`
            }), work ? (0, i.jsxs)(`div`, {
                className: `works-viewer`,
                children: [(0, i.jsxs)(`div`, {
                className: `works-drawer-content`,
                children: [/* 見出しは1本のバーに畳む。主役は下の作品なので、文字に高さを使わない */
                    (0, i.jsxs)(`div`, {
                        className: `works-drawer-head`,
                        children: [(0, i.jsx)(`small`, { className: `works-drawer-kicker`, children: `EXPRESSION SAMPLE` }),
                            (0, i.jsx)(`h3`, { children: shown.title }),
                            (0, i.jsxs)(`p`, { className: `works-drawer-industry`, children: [shown.industry, `　/　`, shown.world] })]
                    }),
                    /* 中身まで見られる作品は、スクロールできる枠でサイト全体を見せる。
                       それ以外はFV1枚。⚠️ 縦長画像が無い作品にこの枠を出さない（空になる） */
                    shown.inside ? (0, i.jsxs)(`div`, {
                        className: `works-site`,
                        children: [(0, i.jsx)(`div`, {
                                className: `works-site-frame`,
                                children: (0, i.jsx)(`img`, { src: shown.inside.site, alt: shown.alt })
                            }),
                            (0, i.jsx)(`small`, { children: `SCROLL — 下まで見られます` })]
                    }) : (0, i.jsxs)(`div`, {
                        className: `works-selected-preview`,
                        children: [(0, i.jsx)(`small`, { children: `ORIGINAL ART DIRECTION` }),
                            (0, i.jsx)(`img`, { src: shown.image, alt: shown.alt })]
                    }),
]
            }), (0, i.jsxs)(`div`, {
                /* 右は「関連する表現」4点。**参照するだけ**で、押しても左は変わらない。
                   ⚠️ ここは work があるときだけ描く＝クライアント側だけの要素。
                      SSRには出ないので、index.html を触らなくてもhydrationはズレない */
                className: `works-rail`,
                children: [(0, i.jsxs)(`small`, { className: `works-rail-head`, children: [`RELATED — `, work.industry] }),
                    ...related.map(other => (0, i.jsxs)(`figure`, {
                        className: `works-rail-item`,
                        "data-current": other.id === work.id ? `true` : `false`,
                        children: [(0, i.jsx)(`img`, { src: other.image, alt: other.alt, loading: `lazy` }),
                            /* 業種は上の見出しに出したので、ここは作品名（全部違う） */
                            (0, i.jsx)(`figcaption`, { children: other.title })]
                    }, other.id))]
            })]
            }) : null]
        })]
    })
}

function x() {
    let [e, t] = (0, r.useState)(!0),
        n = (0, r.useRef)(null);
    return (0, i.jsxs)(`main`, {
        className: `site-shell`,
        children: [(0, i.jsxs)(`header`, {
        className: `site-header`,
        children: [(0, i.jsxs)(`a`, {
            className: `brand`,
            href: `#top`,
            "aria-label": `Tilto ホーム`,
            children: [`Tilto`, (0, i.jsx)(`sup`, {
                children: `°`
            })]
        }), (0, i.jsxs)(`nav`, {
            className: `site-nav`,
            "aria-label": `メインナビゲーション`,
            /* 🔴 買い手の3つの問い「何か・見せて・いくら」に対応させた（2026-09-01）。
               前は「カタログ」が3Dリボンの停止トグルで、押しても移動せず
               ラベルが「再生する」に変わっていた。停止はFVの隅の専用ボタンへ移した */
            children: [(0, i.jsx)(`a`, {
                href: `#about`,
                children: `サービス概要`
            }), (0, i.jsx)(`a`, {
                href: `#expression`,
                children: `カタログ`
            }), (0, i.jsx)(`a`, {
                href: `#price`,
                children: `料金`
            }), (0, i.jsxs)(`a`, {
                className: `header-cta`,
                href: `./contact.html`,
                children: [`無料で相談する `, (0, i.jsx)(`span`, {
                    "aria-hidden": `true`,
                    children: `↗`
                })]
            })]
        })]
    }), (0, i.jsxs)(`section`, {
            className: `hero-canvas${e ? ` is-moving` : ` is-paused`}`,
            "aria-label": `Tilto 採用サイト制作サービス`,
            onPointerMove: e => {
                let t = n.current;
                if (!t)
                    return;
                let r = e.currentTarget.getBoundingClientRect(),
                    i = (e.clientX - r.left) / r.width - .5,
                    a = (e.clientY - r.top) / r.height - .5;
                t.style.setProperty(`--scene-ry`, `${i * 1.2}deg`),
                t.style.setProperty(`--scene-rx`, `${a * -.8}deg`)
            },
            onPointerLeave: () => {
                n.current?.style.setProperty(`--scene-ry`, `0deg`),
                n.current?.style.setProperty(`--scene-rx`, `0deg`)
            },
            children: [(0, i.jsxs)(`div`, {
                id: `top`,
                className: `hero-copy`,
                children: [(0, i.jsxs)(`p`, {
                    className: `eyebrow`,
                    children: [(0, i.jsx)(`span`, {
                        className: `eyebrow-line`,
                        "aria-hidden": `true`
                    }), (0, i.jsx)(`strong`, {
                        children: `RECRUITING SITE STUDIO`
                    }), (0, i.jsx)(`span`, {
                        className: `eyebrow-dash`,
                        "aria-hidden": `true`
                    }), `TILTO°`]
                }), (0, i.jsxs)(`h1`, {
                    id: `headline`,
                    /* 🔴 見出しの帯めくり用の <i>。SSRのHTMLとここの両方に無いと
                       hydrationが食い違い、Reactがページ全体を作り直す。
                       作り直されると帯が消えてモーションが死に、
                       load後に足したDOM（メニュー等）も巻き添えで消える
                       （2026-08-24に発覚） */
                    children: [(0, i.jsxs)(`span`, {
                        children: [`採用サイトの、`, (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        }), (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        }), (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        }), (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        })]
                    }), (0, i.jsxs)(`span`, {
                        className: `accent`,
                        children: [`新しい持ち方。`, (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        }), (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        }), (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        }), (0, i.jsx)(`i`, {
                            className: `hl-band`,
                            "aria-hidden": `true`
                        })]
                    })]
                }), (0, i.jsxs)(`p`, {
                    className: `lead`,
                    children: [`つくって終わりにしない。`, (0, i.jsx)(`br`, {
                        className: `lead-br`
                    }), `月額で持ち、育てつづける採用サイト。`]
                }), (0, i.jsxs)(`p`, {
                    className: `service-chip`,
                    children: [`採用コンサルタント `, (0, i.jsx)(`b`, {
                        children: `×`
                    }), ` AI `, (0, i.jsx)(`b`, {
                        children: `×`
                    }), ` Web制作`]
                })]
            }), (0, i.jsxs)(`div`, {
                className: `ribbon-cast-shadow-scene`,
                "aria-hidden": `true`,
                children: [(0, i.jsx)(b, {
                    active: e,
                    kind: `upper`,
                    shadowOnly: !0
                }), (0, i.jsx)(b, {
                    active: e,
                    kind: `lower`,
                    shadowOnly: !0
                })]
            }), (0, i.jsxs)(`div`, {
                ref: n,
                className: `ribbon-scene`,
                children: [(0, i.jsxs)(`svg`, {
                    className: `upper-red-ribbon`,
                    viewBox: `0 0 1674 943`,
                    preserveAspectRatio: `none`,
                    "aria-hidden": `true`,
                    children: [(0, i.jsx)(`defs`, {
                        children: (0, i.jsxs)(`linearGradient`, {
                            id: `upperRibbonRed`,
                            x1: `0`,
                            y1: `0`,
                            x2: `1`,
                            y2: `0`,
                            children: [(0, i.jsx)(`stop`, {
                                offset: `0`,
                                stopColor: `#8d2c20`
                            }), (0, i.jsx)(`stop`, {
                                offset: `0.55`,
                                stopColor: `#a83b29`
                            }), (0, i.jsx)(`stop`, {
                                offset: `1`,
                                stopColor: `#bd5238`
                            })]
                        })
                    }), (0, i.jsx)(`path`, {
                        d: `M 1470 160 C 1550 158 1622 100 1690 46 C 1745 2 1790 -14 1845 -24 L 1845 250 C 1765 235 1702 216 1645 198 C 1572 177 1518 164 1470 160 Z`,
                        fill: `url(#upperRibbonRed)`
                    })]
                }), (0, i.jsx)(b, {
                    active: e,
                    kind: `upper`
                }), (0, i.jsx)(b, {
                    active: e,
                    kind: `lower`
                }), (0, i.jsx)(`span`, {
                    className: `ribbon-glow`,
                    "aria-hidden": `true`
                })]
            }), /* リボンの停止/再生。ナビから移した。見えている文字と読み上げ名を一致させる */
            (0, i.jsx)(`button`, {
                type: `button`,
                className: `ribbon-toggle`,
                "aria-pressed": !e,
                onClick: () => t(e => !e),
                children: e ? `動きを止める` : `動きを再生する`
            }), (0, i.jsxs)(`section`, {
                className: `pricing-strip`,
                "aria-label": `料金と制作スタイル`,
                children: [(0, i.jsxs)(`article`, {
                    className: `price-card price-card--monthly`,
                    children: [(0, i.jsxs)(`p`, {
                        className: `price-label`,
                        children: [(0, i.jsx)(`span`, {
                            children: `01`
                        }), ` 月額`]
                    }), (0, i.jsxs)(`p`, {
                        className: `price-value`,
                        children: [(0, i.jsx)(`strong`, {
                            children: `27,000`
                        }), (0, i.jsx)(`span`, {
                            children: `円〜`
                        }), (0, i.jsx)(`small`, {
                            children: `（税別）`
                        })]
                    }), (0, i.jsx)(`p`, {
                        className: `price-note`,
                        children: `月額2.7万円から。必要な表現を足しながら、採用サイトを育てていけます。`
                    })]
                }), (0, i.jsxs)(`article`, {
                    className: `price-card`,
                    children: [(0, i.jsxs)(`p`, {
                        className: `price-label`,
                        children: [(0, i.jsx)(`span`, {
                            children: `02`
                        }), ` 初期費用`]
                    }), (0, i.jsxs)(`p`, {
                        className: `price-value price-value--ink`,
                        children: [(0, i.jsx)(`strong`, {
                            children: `0`
                        }), (0, i.jsx)(`span`, {
                            children: `円`
                        })]
                    }), (0, i.jsx)(`p`, {
                        className: `price-note`,
                        children: `制作開始時のまとまった費用は不要。はじめやすい料金設計です。`
                    })]
                }), (0, i.jsxs)(`article`, {
                    id: `style`,
                    className: `price-card`,
                    children: [(0, i.jsxs)(`p`, {
                        className: `price-label`,
                        children: [(0, i.jsx)(`span`, {
                            children: `03`
                        }), ` 制作スタイル`]
                    }), (0, i.jsxs)(`p`, {
                        className: `price-value price-value--ink`,
                        children: [(0, i.jsx)(`strong`, {
                            children: `1`
                        }), (0, i.jsx)(`span`, {
                            children: `社1設計`
                        })]
                    }), (0, i.jsx)(`p`, {
                        className: `price-note`,
                        children: `テンプレートに当てはめない、その会社だけのオリジナル設計。`
                    })]
                }), (0, i.jsxs)(`a`, {
                    id: `fv-cta`,
                    className: `pricing-cta`,
                    href: `./contact.html`,
                    children: [(0, i.jsxs)(`span`, {
                        className: `pricing-cta-main`,
                        children: [`無料で相談する `, (0, i.jsx)(`b`, {
                            "aria-hidden": `true`,
                            children: `↗`
                        })]
                    }), (0, i.jsxs)(`span`, {
                        className: `pricing-cta-sub`,
                        children: [`表現事例を見る `, (0, i.jsx)(`b`, {
                            "aria-hidden": `true`,
                            children: `↘`
                        })]
                    })]
                })]
            })]
        }), (0, i.jsxs)(`section`, {
            className: `reference-about`,
            id: `about`,
            "aria-labelledby": `reference-about-title`,
            children: [(0, i.jsx)(`span`, {
                    className: `reference-about-vertical`,
                    "aria-hidden": `true`,
                    children: `ABOUT TILTO°`
                }),
                (0, i.jsxs)(`div`, {
                    className: `reference-about-copy`,
                    children: [(0, i.jsxs)(`h2`, {
                            id: `reference-about-title`,
                            children: [(0, i.jsxs)(`span`, {
                                className: `hl-line`,
                                children: [`つくる。`,
                                    (0, i.jsx)(`br`, { className: `sp-only` }), `だけじゃない。`,
                                    (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                            }),
                                (0, i.jsx)(`br`, {}),
                                (0, i.jsxs)(`span`, {
                                className: `hl-line`,
                                children: [`採用サイトを、`,
                                    (0, i.jsx)(`br`, { className: `sp-only` }), `持ち、育てる。`,
                                    (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                            })]
                        }),
                        (0, i.jsx)(`p`, {
                            children: `公開して終わりにしない。採用の変化とともに、更新し、改善しつづける。`
                        })]
                }),
                (0, i.jsxs)(`dl`, {
                    className: `reference-about-facts`,
                    children: [(0, i.jsxs)(`div`, {
                            children: [(0, i.jsx)(`dt`, {
                                    children: `OWN`
                                }),
                                (0, i.jsx)(`dd`, {
                                    children: `YOUR RECRUIT SITE`
                                })]
                        }),
                        (0, i.jsxs)(`div`, {
                            children: [(0, i.jsx)(`dt`, {
                                    children: `GROW`
                                }),
                                (0, i.jsx)(`dd`, {
                                    children: `WITH YOUR TEAM`
                                })]
                        }),
                        (0, i.jsxs)(`div`, {
                            children: [(0, i.jsx)(`dt`, {
                                    children: `CONTINUOUS UPDATE`
                                }),
                                (0, i.jsx)(`dd`, {
                                    children: `ALWAYS`
                                })]
                        }),
                        (0, i.jsxs)(`div`, {
                            children: [(0, i.jsx)(`dt`, {
                                    children: `BUILD / MEASURE / IMPROVE`
                                }),
                                (0, i.jsx)(`dd`, {})]
                        })]
                })]
        }),
        (0, i.jsxs)(`section`, {
            className: `reference-problems`,
            "data-motion": `problems-story`,
            "aria-labelledby": `reference-problems-title`,
            children: [                (0, i.jsx)(`h2`, {
                    id: `reference-problems-title`,
                    className: `sr-only`,
                    children: `採用サイトで解決する3つの問題`
                }),
                (0, i.jsxs)(`article`, {
                    className: `reference-problem reference-problem-high`,
                    children: [(0, i.jsx)(`strong`, {
                            children: `高い`
                        }),
                        (0, i.jsxs)(`p`, {
                            children: [`制作費が大きく、`,
                                (0, i.jsx)(`br`, {}),
                                `踏み出せない。`]
                        }),
                        (0, i.jsx)(`i`, {
                            "aria-hidden": `true`
                        })]
                }),
                (0, i.jsxs)(`article`, {
                    className: `reference-problem reference-problem-late`,
                    children: [(0, i.jsx)(`strong`, {
                            children: `遅い`
                        }),
                        (0, i.jsxs)(`p`, {
                            children: [`公開までに`,
                                (0, i.jsx)(`br`, {}),
                                `時間がかかりすぎる。`]
                        })]
                }),
                (0, i.jsxs)(`article`, {
                    className: `reference-problem reference-problem-result`,
                    children: [(0, i.jsxs)(`strong`, {
                            children: [`成果が`,
                                (0, i.jsx)(`br`, {}),
                                `見えない`]
                        }),
                        (0, i.jsxs)(`p`, {
                            children: [`つくっても、`,
                                (0, i.jsx)(`br`, {}),
                                `その先が見えない。`]
                        }),
                        (0, i.jsx)(`i`, {
                            "aria-hidden": `true`
                        })]
                }),
                (0, i.jsxs)(`p`, {
                    className: `reference-problems-statement`,
                    children: [(0, i.jsx)(`b`, {
                            children: `RETHINK THE RECRUITMENT SITE.`
                        }),
                        (0, i.jsxs)(`span`, {
                            children: (0, i.jsxs)(`span`, {
                                className: `hl-line`,
                                children: [`採用サイトの常識を、`,
                                    (0, i.jsx)(`br`, { className: `sp-only` }), `更新する`,
                                    (0, i.jsx)(`i`, { children: `。` }),
                                    (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                            })
                        })]
                }),
                (0, i.jsxs)(`span`, {
                    className: `reference-problems-scroll`,
                    "aria-hidden": `true`,
                    children: [`SCROLL`,
                        (0, i.jsx)(`i`, {})]
                })]
        }),
        (0, i.jsx)(`section`, {
            className: `process-section`,
            id: `fusion`,
            "data-motion": `fusion-story`,
            children: (0, i.jsxs)(`div`, {
                    className: `process-stage`,
                    children: [                        (0, i.jsxs)(`div`, {
                            className: `process-copy process-copy-before`,
                            children: [(0, i.jsxs)(`h2`, {
                                    children: [(0, i.jsxs)(`span`, {
                                        className: `hl-line`,
                                        children: [`まだ、うまく`,
                                            (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                                    }),
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsxs)(`span`, {
                                        className: `hl-line`,
                                        children: [`言えなくていい。`,
                                            (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                                    })]
                                }),
                                (0, i.jsxs)(`p`, {
                                    children: [`その「なんとなく」を、ちゃんと形にする。`,
                                        (0, i.jsx)(`br`, {}),
                                        `言葉になる前の想いから、`,
                                        (0, i.jsx)(`br`, {}),
                                        `いっしょに、かたちの糸口を見つけていきます。`]
                                })]
                        }),
(0, i.jsxs)(`div`, {
                            className: `process-copy process-copy-after`,
                            children: [(0, i.jsxs)(`h2`, {
                                    children: [(0, i.jsxs)(`span`, {
                                        className: `hl-line`,
                                        children: [`曖昧な相談が、`,
                                            (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                                    }),
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsxs)(`span`, {
                                        className: `hl-line`,
                                        children: [`採用サイトになる。`,
                                            (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                                    })]
                                }),
                                (0, i.jsxs)(`p`, {
                                    children: [`言葉にならなかった想いを整理し、`,
                                        (0, i.jsx)(`br`, {}),
                                        `採用サイトという形で、未来へつなげます。`]
                                })]
                        }),
                        (0, i.jsxs)(`div`, {
                            className: `process-canvas`,
                            "aria-label": `散らばった相談資料が整理され、完成した採用サイトへ変わる様子`,
                            children: [(0, i.jsx)(`img`, {
                                    className: `process-before-reference`,
                                    src: `./images/section03-before.webp`,
                                    alt: `付箋、手書きメモ、写真、ワイヤーフレームが散らばった制作途中の状態`
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `process-paper-field`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`article`, {
                                            className: `process-paper process-paper-photo`,
                                            "data-paper": `0`,
                                            "data-dx": `26`,
                                            "data-dy": `18`,
                                            "data-r": `-2.6`,
                                            "data-end-r": `0`,
                                            "data-keep": `true`,
                                            style: { left: `39%`, top: `14%` },
                                            children: [(0, i.jsx)(`img`, {
                                                    src: `./images/section03-before.webp`,
                                                    alt: ``
                                                }),
                                                (0, i.jsx)(`b`, {
                                                    children: (0, i.jsx)(`span`, {
                                                            children: `INTERVIEW / 01`
                                                        })
                                                })]
                                        }),
                                        (0, i.jsx)(`article`, {
                                            className: `process-paper process-paper-note`,
                                            "data-paper": `1`,
                                            "data-dx": `16`,
                                            "data-dy": `6`,
                                            "data-r": `1.8`,
                                            "data-end-r": `0`,
                                            "data-keep": `true`,
                                            style: { left: `50%`, top: `29%` },
                                            children: (0, i.jsxs)(`b`, {
                                                    children: [(0, i.jsx)(`span`, {
                                                            children: `若い人に`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `届いてほしい`
                                                        })]
                                                })
                                        }),
                                        (0, i.jsx)(`article`, {
                                            className: `process-paper process-paper-note`,
                                            "data-paper": `2`,
                                            "data-dx": `-5`,
                                            "data-dy": `17`,
                                            "data-r": `2.7`,
                                            "data-end-r": `0`,
                                            "data-keep": `true`,
                                            style: { left: `78%`, top: `29%` },
                                            children: (0, i.jsxs)(`b`, {
                                                    children: [(0, i.jsx)(`span`, {
                                                            children: `仕事の意味を`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `伝えたい`
                                                        })]
                                                })
                                        }),
                                        (0, i.jsx)(`article`, {
                                            className: `process-paper process-paper-question`,
                                            "data-paper": `3`,
                                            "data-dx": `5`,
                                            "data-dy": `2`,
                                            "data-r": `-1.2`,
                                            "data-end-r": `0`,
                                            "data-keep": `true`,
                                            style: { left: `63%`, top: `48%` },
                                            children: (0, i.jsxs)(`b`, {
                                                    children: [(0, i.jsx)(`span`, {
                                                            children: `うちの魅力って`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `なんだろう？`
                                                        })]
                                                })
                                        }),
                                        (0, i.jsxs)(`article`, {
                                            className: `process-paper process-paper-wire`,
                                            "data-paper": `4`,
                                            "data-dx": `20`,
                                            "data-dy": `-8`,
                                            "data-r": `3.8`,
                                            "data-end-r": `0`,
                                            "data-keep": `false`,
                                            style: { left: `46%`, top: `59%` },
                                            children: [(0, i.jsxs)(`span`, {
                                                    className: `process-wire-mini`,
                                                    children: [(0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {})]
                                                }),
                                                (0, i.jsx)(`b`, {
                                                    children: (0, i.jsx)(`span`, {
                                                            children: `WIREFRAME / 03`
                                                        })
                                                })]
                                        }),
                                        (0, i.jsx)(`article`, {
                                            className: `process-paper process-paper-list`,
                                            "data-paper": `5`,
                                            "data-dx": `-13`,
                                            "data-dy": `-3`,
                                            "data-r": `-1.5`,
                                            "data-end-r": `0`,
                                            "data-keep": `false`,
                                            style: { left: `82%`, top: `51%` },
                                            children: (0, i.jsxs)(`b`, {
                                                    children: [(0, i.jsx)(`span`, {
                                                            children: `採用サイト？`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `パンフレット？`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `動画？ SNS？`
                                                        })]
                                                })
                                        }),
                                        (0, i.jsx)(`article`, {
                                            className: `process-paper process-paper-note`,
                                            "data-paper": `6`,
                                            "data-dx": `7`,
                                            "data-dy": `-15`,
                                            "data-r": `1.1`,
                                            "data-end-r": `0`,
                                            "data-keep": `false`,
                                            style: { left: `62%`, top: `71%` },
                                            children: (0, i.jsxs)(`b`, {
                                                    children: [(0, i.jsx)(`span`, {
                                                            children: `かっこよくしたい。`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `でも、軽くしたくない。`
                                                        })]
                                                })
                                        }),
                                        (0, i.jsxs)(`article`, {
                                            className: `process-paper process-paper-photo`,
                                            "data-paper": `7`,
                                            "data-dx": `-11`,
                                            "data-dy": `-19`,
                                            "data-r": `2.5`,
                                            "data-end-r": `0`,
                                            "data-keep": `false`,
                                            style: { left: `81%`, top: `78%` },
                                            children: [(0, i.jsx)(`img`, {
                                                    src: `./images/section03-before.webp`,
                                                    alt: ``
                                                }),
                                                (0, i.jsx)(`b`, {
                                                    children: (0, i.jsx)(`span`, {
                                                            children: `INTERVIEW / 02`
                                                        })
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`svg`, {
                                    className: `process-guide`,
                                    viewbox: `0 0 1000 640`,
                                    preserveaspectratio: `none`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsx)(`path`, {
                                            d: `M280 215 C420 180 455 300 555 292 S720 205 825 250`,
                                            pathlength: `1`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            d: `M365 430 C470 410 465 350 578 338 S750 390 840 330`,
                                            pathlength: `1`
                                        }),
                                        (0, i.jsx)(`circle`, {
                                            cx: `572`,
                                            cy: `318`,
                                            r: `52`,
                                            pathlength: `1`
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `process-edit-words`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsx)(`span`, {
                                            children: `対話する`
                                        }),
                                        (0, i.jsx)(`i`, {
                                            children: `→`
                                        }),
                                        (0, i.jsx)(`span`, {
                                            children: `選び取る`
                                        }),
                                        (0, i.jsx)(`i`, {
                                            children: `→`
                                        }),
                                        (0, i.jsx)(`span`, {
                                            children: `構造にする`
                                        })]
                                }),
(0, i.jsxs)(`figure`, {
                                    className: `process-site-assembly`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `process-site-frame`,
                                            children: [(0, i.jsxs)(`div`, {
                                                    className: `process-site-chrome`,
                                                    children: [(0, i.jsx)(`i`, {
                                                            "aria-hidden": `true`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `RECRUIT SITE / EXPRESSION SAMPLE`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `process-wireframe`,
                                                    "aria-hidden": `true`,
                                                    children: [(0, i.jsx)(`span`, {
                                                            className: `wf-nav`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            className: `wf-copy`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            className: `wf-copy wf-copy-short`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            className: `wf-visual`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            className: `wf-section`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            className: `wf-section wf-section-2`
                                                        })]
                                                }),
                                                (0, i.jsx)(`div`, {
                                                    className: `process-site-scroll`,
                                                    children: (0, i.jsx)(`img`, {
                                                            className: `process-final-image`,
                                                            src: `./images/section03-site.webp`,
                                                            alt: `高架下に立つ作業員の写真に「この街は、誰かの仕事でできている。」を重ねたインフラ企業の採用サイト。その下に「仕事は、誰かの日常につながっている。」の節が続く`
                                                        })
                                                })]
                                        }),
                                        (0, i.jsx)(`figcaption`, {
                                            children: `FORMED FROM CONVERSATION / DESIGNED THROUGH TO THE NEXT SECTION`
                                        })]
                                })
                            ]
                        }),
                        (0, i.jsxs)(`div`, {
                            className: `process-progress`,
                            "aria-hidden": `true`,
                            children: [(0, i.jsx)(`span`, {
                                    children: `01 / LISTEN`
                                }),
                                (0, i.jsx)(`span`, {
                                    children: `02 / SELECT`
                                }),
                                (0, i.jsx)(`span`, {
                                    children: `03 / STRUCTURE`
                                }),
                                (0, i.jsx)(`span`, {
                                    children: `04 / FORM`
                                }),
                                (0, i.jsx)(`i`, {})]
                        })]
                })
        }), (0, i.jsx)(Showroom, {}), (0, i.jsx)(`section`, {
            className: `blueprint-trust`,
            id: `blueprint`,
            "data-motion": `blueprint-story`,
            "aria-labelledby": `blueprint-title`,
            children: (0, i.jsxs)(`div`, {
                    className: `blueprint-stage`,
                    children: [                        (0, i.jsxs)(`div`, {
                                className: `bp-lead`,
                                children: [(0, i.jsxs)(`div`, {
                            className: `bp-copy`,
                            children: [(0, i.jsx)(`p`, {
                                    className: `bp-phase`,
                                    children: `05　成果にこだわる`
                                }),
                                (0, i.jsxs)(`h2`, {
                                    id: `blueprint-title`,
                                    children: [(0, i.jsxs)(`span`, {
                                        className: `hl-line`,
                                        children: [`美しいだけでは、`,
                                            (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                                    }),
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsxs)(`span`, {
                                        className: `hl-line`,
                                        children: [`採用は動かない。`,
                                            (0, i.jsx)(`i`, { className: `hl-band hl-b1`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b2`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b3`, "aria-hidden": `true` }), (0, i.jsx)(`i`, { className: `hl-band hl-b4`, "aria-hidden": `true` })]
                                    })]
                                }),
                                (0, i.jsx)(`h3`, {
                                    children: `デザインの前に、設計がある。`
                                })]
                        }),
                                    (0, i.jsxs)(`div`, {
                            className: `bp-principle`,
                            children: [(0, i.jsx)(`small`, {
                                    children: `DESIGN PRINCIPLE / 01`
                                }),
                                (0, i.jsxs)(`p`, {
                                    children: [`採用は、感覚じゃない。`,
                                        (0, i.jsx)(`br`, {}),
                                        `構造でつくり、言葉で届け、`,
                                        (0, i.jsx)(`br`, {}),
                                        `体験で動かし、改善していく。`]
                                })]
                        })]
                            }), ,
                        (0, i.jsxs)(`div`, {
                            className: `bp-board`,
                            children: [(0, i.jsxs)(`svg`, {
                                    className: `bp-grid`,
                                    viewbox: `0 0 1000 720`,
                                    "aria-hidden": `true`,
                                    preserveaspectratio: `none`,
                                    children: [(0, i.jsxs)(`defs`, {
                                            children: [(0, i.jsx)(`pattern`, {
                                                    id: `bp-small-grid`,
                                                    width: `20`,
                                                    height: `20`,
                                                    patternunits: `userSpaceOnUse`,
                                                    children: (0, i.jsx)(`path`, {
                                                            d: `M20 0H0V20`,
                                                            fill: `none`,
                                                            stroke: `currentColor`,
                                                            strokeWidth: `.45`
                                                        })
                                                }),
                                                (0, i.jsxs)(`pattern`, {
                                                    id: `bp-large-grid`,
                                                    width: `100`,
                                                    height: `100`,
                                                    patternunits: `userSpaceOnUse`,
                                                    children: [(0, i.jsx)(`rect`, {
                                                            width: `100`,
                                                            height: `100`,
                                                            fill: `url(#bp-small-grid)`
                                                        }),
                                                        (0, i.jsx)(`path`, {
                                                            d: `M100 0H0V100`,
                                                            fill: `none`,
                                                            stroke: `currentColor`,
                                                            strokeWidth: `1`
                                                        })]
                                                })]
                                        }),
                                        (0, i.jsx)(`rect`, {
                                            width: `1000`,
                                            height: `720`,
                                            fill: `url(#bp-large-grid)`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            className: `bp-axis`,
                                            pathlength: `1`,
                                            d: `M70 650H930M115 690V58`
                                        }),
                                        (0, i.jsxs)(`g`, {
                                            className: `bp-grid-numbers`,
                                            children: [(0, i.jsx)(`text`, {
                                                    x: `72`,
                                                    y: `674`,
                                                    children: `000`
                                                }),
                                                (0, i.jsx)(`text`, {
                                                    x: `263`,
                                                    y: `674`,
                                                    children: `320`
                                                }),
                                                (0, i.jsx)(`text`, {
                                                    x: `550`,
                                                    y: `674`,
                                                    children: `900`
                                                }),
                                                (0, i.jsx)(`text`, {
                                                    x: `842`,
                                                    y: `674`,
                                                    children: `1280`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-plane bp-base`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-plane-head`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `BASE GRID / 12 COLUMN`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `GRID / 01`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-base-columns`,
                                            children: [(0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {}),
                                                (0, i.jsx)(`i`, {})]
                                        }),
                                        (0, i.jsx)(`span`, {
                                            className: `bp-dim bp-dim-x`,
                                            children: `1280`
                                        }),
                                        (0, i.jsx)(`span`, {
                                            className: `bp-dim bp-dim-y`,
                                            children: `720`
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-plane bp-information`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-plane-head`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `INFORMATION ARCHITECTURE`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `IA / 02`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-sitemap`,
                                            children: [(0, i.jsx)(`span`, {
                                                    className: `is-root`,
                                                    children: `HOME`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `MESSAGE`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `ABOUT`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `PEOPLE`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `WORK`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `ENVIRONMENT`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `STORY`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `RECRUIT`
                                                })]
                                        }),
                                        (0, i.jsx)(`svg`, {
                                            viewbox: `0 0 660 230`,
                                            preserveaspectratio: `none`,
                                            children: (0, i.jsx)(`path`, {
                                                    d: `M330 12V43M78 43H582M78 43V69M246 43V69M414 43V69M582 43V69M78 102V132M246 102V132M414 102V132M582 102V132M78 132H414M246 132V158M414 132V158`
                                                })
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-plane bp-ui`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-plane-head`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `UI COMPONENT SYSTEM`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `UI / 03`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-ui-grid`,
                                            children: [(0, i.jsxs)(`div`, {
                                                    className: `bp-ui-type`,
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `TYPE SCALE`
                                                        }),
                                                        (0, i.jsx)(`strong`, {
                                                            children: `Aa`
                                                        }),
                                                        (0, i.jsx)(`i`, {
                                                            children: `明朝 / 56 / 1.18`
                                                        }),
                                                        (0, i.jsx)(`b`, {
                                                            children: `Arial / 12 / 1.0`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-ui-buttons`,
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `ACTION`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `ENTRY　→`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            children: `VIEW MORE　＋`
                                                        }),
                                                        (0, i.jsx)(`span`, {
                                                            className: `is-coral`,
                                                            children: `CONTACT　→`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-ui-color`,
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `COLOR`
                                                        }),
                                                        (0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {})]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-ui-menu`,
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `NAVIGATION`
                                                        }),
                                                        (0, i.jsx)(`b`, {
                                                            children: `ABOUT`
                                                        }),
                                                        (0, i.jsx)(`b`, {
                                                            children: `WORKS`
                                                        }),
                                                        (0, i.jsx)(`b`, {
                                                            children: `PEOPLE`
                                                        }),
                                                        (0, i.jsx)(`b`, {
                                                            children: `RECRUIT`
                                                        })]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-plane bp-wireframe`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-plane-head`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `WIREFRAME / KEY PAGE`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `WF / 04`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-wire-layout`,
                                            children: [(0, i.jsxs)(`div`, {
                                                    className: `bp-wire-nav`,
                                                    children: [`TILTO° `,
                                                        (0, i.jsx)(`i`, {}),
                                                        ` `,
                                                        (0, i.jsx)(`i`, {}),
                                                        ` `,
                                                        (0, i.jsx)(`i`, {}),
                                                        ` `,
                                                        (0, i.jsx)(`b`, {
                                                            children: `ENTRY`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-wire-hero`,
                                                    children: [(0, i.jsxs)(`strong`, {
                                                            children: [`採用サイトの`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `「考え方」を変える。`]
                                                        }),
                                                        (0, i.jsx)(`span`, {}),
                                                        (0, i.jsx)(`em`, {
                                                            children: `SCROLL`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-wire-copy`,
                                                    children: [(0, i.jsx)(`b`, {
                                                            children: `OUR MISSION`
                                                        }),
                                                        (0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {}),
                                                        (0, i.jsx)(`i`, {})]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-wire-cards`,
                                                    children: [(0, i.jsx)(`span`, {}),
                                                        (0, i.jsx)(`span`, {}),
                                                        (0, i.jsx)(`span`, {})]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-plane bp-content`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-plane-head`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `CONTENT / MESSAGE MAP`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `CT / 05`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-content-map`,
                                            children: [(0, i.jsxs)(`div`, {
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `CORE MESSAGE`
                                                        }),
                                                        (0, i.jsxs)(`strong`, {
                                                            children: [`採用サイトの`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `「考え方」を変える。`]
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `PROOF`
                                                        }),
                                                        (0, i.jsxs)(`p`, {
                                                            children: [`理解をつくる。`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `共感をつくる。`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `行動をつくる。`]
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `ACTION`
                                                        }),
                                                        (0, i.jsxs)(`p`, {
                                                            children: [`知る → 共感する`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `働く姿を想像する`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `応募する`]
                                                        })]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-plane bp-visual`,
                                    "aria-hidden": `true`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-site-nav`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `TILTO°`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `ABOUT　 SERVICE　 WORKS　 PEOPLE　 RECRUIT`
                                                }),
                                                (0, i.jsx)(`i`, {
                                                    children: `ENTRY`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-site-hero`,
                                            children: [(0, i.jsxs)(`div`, {
                                                    children: [(0, i.jsx)(`small`, {
                                                            children: `RECRUITMENT SITE / 2026`
                                                        }),
                                                        (0, i.jsxs)(`strong`, {
                                                            children: [`採用サイトの`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `「持ち方」を変える。`]
                                                        }),
                                                        (0, i.jsxs)(`p`, {
                                                            children: [`つくって終わらない。`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `成果まで、設計する。`]
                                                        })]
                                                }),
                                                (0, i.jsxs)(`svg`, {
                                                    viewbox: `0 0 300 240`,
                                                    "aria-hidden": `true`,
                                                    children: [(0, i.jsxs)(`g`, {
                                                            className: `bp-cube`,
                                                            children: [(0, i.jsx)(`path`, {
                                                                    d: `M212 142L250 123L278 139L240 160Z`
                                                                }),
                                                                (0, i.jsx)(`path`, {
                                                                    d: `M212 142V182L240 200V160Z`
                                                                }),
                                                                (0, i.jsx)(`path`, {
                                                                    d: `M240 160L278 139V178L240 200Z`
                                                                })]
                                                        }),
                                                        (0, i.jsx)(`path`, {
                                                            className: `bp-branch`,
                                                            d: `M20 205C75 175 86 104 148 30M73 168L37 128M100 130L166 98M129 76L91 41M149 54L211 32`
                                                        }),
                                                        (0, i.jsx)(`circle`, {
                                                            cx: `37`,
                                                            cy: `128`,
                                                            r: `5`
                                                        }),
                                                        (0, i.jsx)(`circle`, {
                                                            cx: `166`,
                                                            cy: `98`,
                                                            r: `5`
                                                        }),
                                                        (0, i.jsx)(`circle`, {
                                                            cx: `91`,
                                                            cy: `41`,
                                                            r: `5`
                                                        }),
                                                        (0, i.jsx)(`circle`, {
                                                            cx: `211`,
                                                            cy: `32`,
                                                            r: `5`
                                                        })]
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-site-foot`,
                                            children: [(0, i.jsx)(`span`, {
                                                    children: `SCROLL TO EXPLORE`
                                                }),
                                                (0, i.jsx)(`b`, {
                                                    children: `01 / 07`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`svg`, {
                                    className: `bp-leaders`,
                                    viewbox: `0 0 1000 720`,
                                    "aria-hidden": `true`,
                                    preserveaspectratio: `none`,
                                    children: [(0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M196 113H234L280 134`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M196 185H237L286 236`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M196 320H238L333 366`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M196 413H238L356 492`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M841 249H802L754 304`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M831 393H792L744 278`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M818 521H796L768 564`
                                        }),
                                        (0, i.jsx)(`path`, {
                                            pathlength: `1`,
                                            d: `M777 598H757L732 623`
                                        }),
                                        (0, i.jsxs)(`g`, {
                                            children: [(0, i.jsx)(`circle`, {
                                                    cx: `280`,
                                                    cy: `134`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `286`,
                                                    cy: `236`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `333`,
                                                    cy: `366`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `356`,
                                                    cy: `492`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `754`,
                                                    cy: `304`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `744`,
                                                    cy: `278`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `768`,
                                                    cy: `564`,
                                                    r: `4`
                                                }),
                                                (0, i.jsx)(`circle`, {
                                                    cx: `732`,
                                                    cy: `623`,
                                                    r: `4`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-annotations`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-research`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `RESEARCH`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `市場・競合・ユーザーを読み解き、課題の本質を定義する。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-language`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `LANGUAGE`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `独自の言葉を設計し、メッセージの芯をつくる。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-structure`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `STRUCTURE`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `情報を整理し、伝わる順番と優先順位を設計する。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-architecture`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `INFORMATION ARCHITECTURE`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `情報の地図を描き、迷わずたどれる構造をつくる。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-flow`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `USER FLOW`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `行動の流れを設計し、次のアクションへ自然に導く。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-visual`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `VISUAL`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `世界観を視覚化し、信頼と共感を生むデザインに。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-measure`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `MEASURE`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `指標を設計し、成果を正しく計測する。`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-note bp-note-improve`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `IMPROVE`
                                                }),
                                                (0, i.jsx)(`p`, {
                                                    children: `データから学び、仮説を立て、改善を積み重ねる。`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-kpi`,
                                    "aria-label": `応募から入社までの成果計測設計`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-kpi-head`,
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `MEASURE / KPI FLOW`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `DATA / 08`
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-kpi-body`,
                                            children: [(0, i.jsxs)(`div`, {
                                                    className: `bp-kpi-funnel`,
                                                    children: [(0, i.jsxs)(`div`, {
                                                            children: [(0, i.jsx)(`span`, {
                                                                    children: `ENTRY`
                                                                }),
                                                                (0, i.jsx)(`i`, {
                                                                    style: { "--value": `100%` }
                                                                }),
                                                                (0, i.jsx)(`b`, {
                                                                    children: `100`
                                                                })]
                                                        }),
                                                        (0, i.jsxs)(`div`, {
                                                            children: [(0, i.jsx)(`span`, {
                                                                    children: `RECRUIT`
                                                                }),
                                                                (0, i.jsx)(`i`, {
                                                                    style: { "--value": `82%` }
                                                                }),
                                                                (0, i.jsx)(`b`, {
                                                                    children: `82`
                                                                })]
                                                        }),
                                                        (0, i.jsxs)(`div`, {
                                                            children: [(0, i.jsx)(`span`, {
                                                                    children: `INTERVIEW`
                                                                }),
                                                                (0, i.jsx)(`i`, {
                                                                    style: { "--value": `58%` }
                                                                }),
                                                                (0, i.jsx)(`b`, {
                                                                    children: `58`
                                                                })]
                                                        }),
                                                        (0, i.jsxs)(`div`, {
                                                            children: [(0, i.jsx)(`span`, {
                                                                    children: `OFFER`
                                                                }),
                                                                (0, i.jsx)(`i`, {
                                                                    style: { "--value": `23%` }
                                                                }),
                                                                (0, i.jsx)(`b`, {
                                                                    children: `23`
                                                                })]
                                                        }),
                                                        (0, i.jsxs)(`div`, {
                                                            children: [(0, i.jsx)(`span`, {
                                                                    children: `JOIN`
                                                                }),
                                                                (0, i.jsx)(`i`, {
                                                                    style: { "--value": `18%` }
                                                                }),
                                                                (0, i.jsx)(`b`, {
                                                                    children: `18`
                                                                })]
                                                        })]
                                                }),
                                                (0, i.jsxs)(`svg`, {
                                                    className: `bp-chart`,
                                                    viewbox: `0 0 220 102`,
                                                    "aria-hidden": `true`,
                                                    children: [(0, i.jsx)(`path`, {
                                                            className: `bp-chart-grid`,
                                                            d: `M0 18H220M0 50H220M0 82H220M22 0V102M82 0V102M142 0V102M202 0V102`
                                                        }),
                                                        (0, i.jsx)(`path`, {
                                                            className: `bp-chart-line`,
                                                            pathlength: `1`,
                                                            d: `M6 87L45 73L82 77L118 47L157 54L194 17L216 25`
                                                        }),
                                                        (0, i.jsx)(`circle`, {
                                                            cx: `194`,
                                                            cy: `17`,
                                                            r: `3.5`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`div`, {
                                                    className: `bp-score`,
                                                    children: [(0, i.jsxs)(`svg`, {
                                                            viewbox: `0 0 96 96`,
                                                            "aria-hidden": `true`,
                                                            children: [(0, i.jsx)(`circle`, {
                                                                    className: `bp-score-base`,
                                                                    cx: `48`,
                                                                    cy: `48`,
                                                                    r: `36`
                                                                }),
                                                                (0, i.jsx)(`circle`, {
                                                                    className: `bp-score-value`,
                                                                    pathlength: `100`,
                                                                    cx: `48`,
                                                                    cy: `48`,
                                                                    r: `36`
                                                                })]
                                                        }),
                                                        (0, i.jsx)(`strong`, {
                                                            "data-kpi-number": `true`,
                                                            children: `0.0%`
                                                        }),
                                                        (0, i.jsxs)(`small`, {
                                                            children: [`QUALIFIED`,
                                                                (0, i.jsx)(`br`, {}),
                                                                `ACTION`]
                                                        })]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-design-system`,
                                    "aria-label": `Color and typography system`,
                                    children: [(0, i.jsxs)(`div`, {
                                            className: `bp-type-spec`,
                                            children: [(0, i.jsxs)(`span`, {
                                                    children: [(0, i.jsx)(`b`, {
                                                            children: `Aa`
                                                        }),
                                                        `Noto Serif JP`,
                                                        (0, i.jsx)(`br`, {}),
                                                        (0, i.jsx)(`small`, {
                                                            children: `Bold / Regular`
                                                        })]
                                                }),
                                                (0, i.jsxs)(`span`, {
                                                    children: [(0, i.jsx)(`b`, {
                                                            children: `Aa`
                                                        }),
                                                        `Arial`,
                                                        (0, i.jsx)(`br`, {}),
                                                        (0, i.jsx)(`small`, {
                                                            children: `Regular`
                                                        })]
                                                })]
                                        }),
                                        (0, i.jsxs)(`div`, {
                                            className: `bp-color-spec`,
                                            children: [(0, i.jsx)(`strong`, {
                                                    children: `COLOR`
                                                }),
                                                (0, i.jsxs)(`span`, {
                                                    children: [(0, i.jsx)(`i`, {
                                                            className: `is-coral`
                                                        }),
                                                        `#FF4D4F`]
                                                }),
                                                (0, i.jsxs)(`span`, {
                                                    children: [(0, i.jsx)(`i`, {
                                                            className: `is-paper`
                                                        }),
                                                        `#FFFFFF`]
                                                }),
                                                (0, i.jsxs)(`span`, {
                                                    children: [(0, i.jsx)(`i`, {
                                                            className: `is-sumi`
                                                        }),
                                                        `#111111`]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`div`, {
                                    className: `bp-title-block`,
                                    children: [(0, i.jsxs)(`div`, {
                                            children: [(0, i.jsx)(`small`, {
                                                    children: `SCALE`
                                                }),
                                                (0, i.jsx)(`b`, {
                                                    children: `1 : 1`
                                                }),
                                                (0, i.jsx)(`small`, {
                                                    children: `DATE`
                                                }),
                                                (0, i.jsx)(`b`, {
                                                    children: `2024.05`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`span`, {
                                    className: `bp-ref bp-ref-a`,
                                    children: [`A`,
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsx)(`small`, {
                                            children: `REF.01`
                                        })]
                                }),
                                (0, i.jsxs)(`span`, {
                                    className: `bp-ref bp-ref-b`,
                                    children: [`B`,
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsx)(`small`, {
                                            children: `REF.02`
                                        })]
                                }),
                                (0, i.jsxs)(`span`, {
                                    className: `bp-ref bp-ref-c`,
                                    children: [`C`,
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsx)(`small`, {
                                            children: `REF.03`
                                        })]
                                })]
                        }),
                        (0, i.jsxs)(`div`, {
                            className: `bp-progress`,
                            "aria-hidden": `true`,
                            children: [(0, i.jsx)(`span`, {
                                    children: `BLUEPRINT PROGRESS`
                                }),
                                (0, i.jsx)(`i`, {
                                    children: (0, i.jsx)(`b`, {})
                                }),
                                (0, i.jsx)(`em`, {
                                    children: `05 / 07`
                                })]
                        })]
                })
        }),
        (0, i.jsxs)(`section`, {
            className: `reference-price-faq`,
            id: `price`,
            "aria-labelledby": `pricing-title`,
            children: [(0, i.jsxs)(`div`, {
                    className: `pf-col pf-col--price`,
                    children: [(0, i.jsx)(`p`, {
                            className: `pf-label`,
                            children: `PRICE`
                        }),
                        (0, i.jsxs)(`h2`, {
                            id: `pricing-title`,
                            className: `pf-fig`,
                            children: [(0, i.jsx)(`span`, {
                                    className: `pf-cap`,
                                    children: `月額`
                                }),
                                (0, i.jsx)(`strong`, {
                                    children: `27,000`
                                }),
                                (0, i.jsx)(`b`, {
                                    children: `円`
                                }),
                                (0, i.jsx)(`small`, {
                                    children: `/ MONTH`
                                })]
                        }),
                        (0, i.jsxs)(`div`, {
                            className: `pf-foot`,
                            children: [(0, i.jsxs)(`p`, {
                                    className: `pf-note`,
                                    children: [(0, i.jsx)(`span`, {
                                            children: `※`
                                        }),
                                        `表示価格は基本プランの月額料金です。`,
                                        (0, i.jsx)(`br`, {}),
                                        (0, i.jsx)(`span`, {
                                            children: `※`
                                        }),
                                        `内容や更新範囲に応じてご案内します。`]
                                }),
                                (0, i.jsxs)(`p`, {
                                    className: `pf-init`,
                                    children: [(0, i.jsx)(`span`, {
                                            children: `初期費用`
                                        }),
                                        (0, i.jsx)(`strong`, {
                                            children: `0`
                                        }),
                                        (0, i.jsx)(`b`, {
                                            children: `円`
                                        })]
                                })]
                        })]
                }),
                (0, i.jsxs)(`div`, {
                    className: `pf-col pf-col--faq`,
                    children: [(0, i.jsx)(`h2`, {
                            className: `pf-label`,
                            id: `faq-title`,
                            children: `FAQ`
                        }),
                        (0, i.jsxs)(`div`, {
                            className: `pf-list`,
                            "aria-labelledby": `faq-title`,
                            children: [(0, i.jsxs)(`details`, {
                                    open: true,
                                    children: [(0, i.jsxs)(`summary`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `Q.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `最低契約期間はありますか？`
                                                }),
                                                (0, i.jsx)(`i`, { "aria-hidden": `true` })]
                                        }),
                                        (0, i.jsxs)(`p`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `A.`
                                                }),
                                                (0, i.jsxs)(`span`, {
                                                    children: [`最低契約期間は6ヶ月です。`,
                                                        (0, i.jsx)(`br`, {}),
                                                        `6ヶ月以降は1ヶ月単位で契約更新が可能です。`]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`details`, {
                                    children: [(0, i.jsxs)(`summary`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `Q.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `契約中の解約はどこまで対応してもらえますか？`
                                                }),
                                                (0, i.jsx)(`i`, { "aria-hidden": `true` })]
                                        }),
                                        (0, i.jsxs)(`p`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `A.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `契約内容と制作状況を確認し、個別にご案内します。`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`details`, {
                                    children: [(0, i.jsxs)(`summary`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `Q.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `原稿や写真がなくても大丈夫ですか？`
                                                }),
                                                (0, i.jsx)(`i`, { "aria-hidden": `true` })]
                                        }),
                                        (0, i.jsxs)(`p`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `A.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `大丈夫です。企画・原稿整理から一緒に進められます。`
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`details`, {
                                    children: [(0, i.jsxs)(`summary`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `Q.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `公開までどれくらいかかりますか？`
                                                }),
                                                (0, i.jsx)(`i`, { "aria-hidden": `true` })]
                                        }),
                                        (0, i.jsxs)(`p`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `A.`
                                                }),
                                                (0, i.jsxs)(`span`, {
                                                    children: [`ご提案は最短1週間です。`,
                                                        (0, i.jsx)(`br`, {}),
                                                        `公開までは内容や規模に応じてご案内します。`]
                                                })]
                                        })]
                                }),
                                (0, i.jsxs)(`details`, {
                                    children: [(0, i.jsxs)(`summary`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `Q.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `他の制作会社との違いは何ですか？`
                                                }),
                                                (0, i.jsx)(`i`, { "aria-hidden": `true` })]
                                        }),
                                        (0, i.jsxs)(`p`, {
                                            children: [(0, i.jsx)(`b`, {
                                                    children: `A.`
                                                }),
                                                (0, i.jsx)(`span`, {
                                                    children: `公開後も継続して更新・改善することを前提に設計します。`
                                                })]
                                        })]
                                })]
                        }),
                        (0, i.jsx)(`p`, {
                            className: `pf-more`,
                            children: `and more…`
                        })]
                })]
        }), (0, i.jsxs)(`footer`, {
            className: `reference-contact`,
            id: `contact`,
            children: [                (0, i.jsxs)(`h2`, {
                    children: [`らしさを、`,
                        (0, i.jsx)(`br`, {}),
                        `採用の力に。`]
                }),
                (0, i.jsxs)(`a`, {
                    className: `contact-cta`,
                    href: `./contact.html`,
                    "data-cursor-label": `TALK`,
                    children: [(0, i.jsx)(`span`, {
                            children: `まずは、話してみる。`
                        }),
                        (0, i.jsx)(`b`, {
                            "aria-hidden": `true`,
                            children: `→`
                        })]
                }),
                (0, i.jsxs)(`div`, {
                    className: `reference-contact-bottom`,
                    children: [(0, i.jsxs)(`a`, {
                            className: `reference-contact-brand`,
                            href: `#top`,
                            children: [`Tilto`,
                                (0, i.jsx)(`span`, {
                                    children: `°`
                                })]
                        }),
                        (0, i.jsxs)(`nav`, {
                            "aria-label": `フッターナビゲーション`,
                            children: [(0, i.jsx)(`a`, {
                                    href: `#fusion`,
                                    children: `SERVICE`
                                }),
                                (0, i.jsx)(`a`, {
                                    href: `#expression`,
                                    children: `WORKS`
                                }),
                                (0, i.jsx)(`a`, {
                                    href: `#price`,
                                    children: `PRICE`
                                }),
                                (0, i.jsx)(`a`, {
                                    href: `#about`,
                                    children: `ABOUT`
                                }),
                                (0, i.jsx)(`a`, {
                                    href: `#contact`,
                                    children: `CONTACT`
                                })]
                        }),
                        (0, i.jsxs)(`address`, {
                            children: [`株式会社Savor Flow`,
                                (0, i.jsx)(`br`, {}),
                                `hello@tilto.jp`]
                        }),
                        (0, i.jsx)(`small`, {
                            children: `© 2026 TILTO° All Rights Reserved.`
                        })]
                })]
        })]
    })
}
export { x as default };
