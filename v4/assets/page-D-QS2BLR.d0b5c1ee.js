import { r as e } from "./rolldown-runtime-S-ySWqyJ.d0b5c1ee.js";
import { i as t, r as n } from "./framework-DjPHiq1u.d0b5c1ee.js";
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
function x() {
    let [e, t] = (0, r.useState)(!0),
        n = (0, r.useRef)(null);
    return (0, i.jsxs)(`main`, {
        className: `site-shell`,
        children: [(0, i.jsxs)(`section`, {
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
                    children: [(0, i.jsx)(`a`, {
                        href: `#about`,
                        children: `サービス概要`
                    }), (0, i.jsx)(`button`, {
                        type: `button`,
                        "aria-pressed": !e,
                        "aria-label": e ? `3Dリボンの動きを停止` : `3Dリボンの動きを再生`,
                        onClick: () => t(e => !e),
                        children: e ? `カタログ` : `再生する`
                    }), (0, i.jsx)(`a`, {
                        href: `#strategy`,
                        children: `成果にこだわる`
                    }), (0, i.jsxs)(`a`, {
                        className: `header-cta`,
                        href: `#contact`,
                        children: [`無料で相談する `, (0, i.jsx)(`span`, {
                            "aria-hidden": `true`,
                            children: `↗`
                        })]
                    })]
                })]
            }), (0, i.jsxs)(`div`, {
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
                    href: `mailto:hello@tilto.jp`,
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
        }), (0, i.jsx)(`section`, {
        id: `about`,
        className: `about`,
        "aria-labelledby": `about-title`,
        children: (0, i.jsxs)(`div`, {
            className: `about-inner`,
            children: [(0, i.jsxs)(`p`, {
                className: `sec-no`,
                children: [(0, i.jsx)(`b`, { children: `01` }),
                    (0, i.jsx)(`span`, { children: `ABOUT TILTO°` })]
            }), (0, i.jsx)(`p`, {
                className: `about-rail`, "aria-hidden": `true`, children: `TILTO°`
            }), (0, i.jsxs)(`div`, {
                className: `about-main`,
                children: [(0, i.jsxs)(`h2`, {
                    id: `about-title`, className: `about-title`,
                    children: [(0, i.jsx)(`span`, { className: `at-1`, children: `つくる。` }),
                        (0, i.jsx)(`span`, { className: `at-2`, children: `だけじゃない。` }),
                        (0, i.jsx)(`br`, {}),
                        (0, i.jsx)(`span`, { className: `at-3`, children: `採用サイトを、持ち、育てる。` })]
                }), (0, i.jsx)(`p`, {
                    className: `about-lead`,
                    children: `公開して終わりにしない。採用の変化とともに、更新し、改善しつづける。`
                })]
            }), (0, i.jsx)(`ul`, {
                className: `about-specs`,
                children: [(0, i.jsxs)(`li`, { children: [(0, i.jsx)(`b`, { children: `MONTHLY` }), (0, i.jsx)(`span`, { children: `¥27,000` })] }, 0), (0, i.jsxs)(`li`, { children: [(0, i.jsx)(`b`, { children: `INITIAL COST` }), (0, i.jsx)(`span`, { children: `¥0` })] }, 1), (0, i.jsxs)(`li`, { children: [(0, i.jsx)(`b`, { children: `CONTINUOUS UPDATE` })] }, 2), (0, i.jsxs)(`li`, { children: [(0, i.jsx)(`b`, { children: `BUILD / UPDATE / IMPROVE` })] }, 3)]
            })]
        })
    }), (0, i.jsx)(`section`, {
        id: `worries`,
        className: `worries`,
        "aria-labelledby": `worries-title`,
        children: (0, i.jsxs)(`div`, {
            className: `worries-inner`,
            children: [(0, i.jsxs)(`p`, {
                className: `sec-no sec-no--light`,
                children: [(0, i.jsx)(`b`, { children: `02` }),
                    (0, i.jsx)(`span`, { children: `PROBLEMS WE SOLVE` })]
            }), (0, i.jsx)(`h2`, {
                id: `worries-title`, className: `sr-only`, children: `私たちが解決するお悩み`
            }), (0, i.jsx)(`ul`, {
                className: `prob-row`,
                children: [(0, i.jsxs)(`li`, { className: `prob prob--1`, children: [(0, i.jsx)(`b`, { className: `prob-word`, children: `高い` }), (0, i.jsx)(`span`, { className: `prob-line`, "aria-hidden": `true` }), (0, i.jsxs)(`span`, { className: `prob-note`, children: [`制作費が大きく、`, (0, i.jsx)(`br`, {}, `b1`), `踏み出せない。`] }), (0, i.jsxs)(`span`, { className: `prob-tag`, children: [`MONTHLY　¥27,000`, (0, i.jsx)(`br`, {}, `b1`), `INITIAL　¥0`] })] }, 0), (0, i.jsxs)(`li`, { className: `prob prob--2`, children: [(0, i.jsx)(`b`, { className: `prob-word`, children: `遅い` }), (0, i.jsx)(`span`, { className: `prob-line`, "aria-hidden": `true` }), (0, i.jsxs)(`span`, { className: `prob-note`, children: [`公開までに`, (0, i.jsx)(`br`, {}, `b1`), `時間がかかりすぎる。`] }), (0, i.jsxs)(`span`, { className: `prob-tag`, children: [`FAST`, (0, i.jsx)(`br`, {}, `b1`), `PRODUCTION`] })] }, 1), (0, i.jsxs)(`li`, { className: `prob prob--3`, children: [(0, i.jsx)(`b`, { className: `prob-word`, children: `成果が見えない` }), (0, i.jsx)(`span`, { className: `prob-line`, "aria-hidden": `true` }), (0, i.jsxs)(`span`, { className: `prob-note`, children: [`つくっても、`, (0, i.jsx)(`br`, {}, `b1`), `その先が見えない。`] }), (0, i.jsxs)(`span`, { className: `prob-tag`, children: [`UPDATE /`, (0, i.jsx)(`br`, {}, `b1`), `IMPROVE`] })] }, 2)]
            }), (0, i.jsx)(`p`, {
                className: `prob-closing`, children: `採用サイトの常識を、更新する。`
            })]
        })
    }), (0, i.jsxs)(`section`, {
        id: `experience`,
        className: `experience`,
        "aria-labelledby": `experience-title`,
        children: [(0, i.jsx)(`div`, {
            className: `exp-cloud`,
            "aria-label": `採用サイトについての、まだ言葉になりきっていない考え`,
            children: [(0, i.jsx)(`span`, { className: `exp-thought exp-thought--2`, style: { left: `6%`, top: `12%`, "--tilt": `-3deg` }, children: `若い人に届いてほしい` }, 0), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--2`, style: { left: `58%`, top: `6%`, "--tilt": `2deg` }, children: `ちゃんとした会社に見せたい` }, 1), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--3`, style: { left: `30%`, top: `24%`, "--tilt": `-1deg` }, children: `でも、堅くしたくない` }, 2), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--3`, style: { left: `84%`, top: `20%`, "--tilt": `3deg` }, children: `信頼感` }, 3), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--3`, style: { left: `14%`, top: `36%`, "--tilt": `-2deg` }, children: `温度` }, 4), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--2`, style: { left: `72%`, top: `38%`, "--tilt": `1deg` }, children: `社員の顔` }, 5), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--3`, style: { left: `3%`, top: `58%`, "--tilt": `2deg` }, children: `うちらしさって？` }, 6), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--2`, style: { left: `80%`, top: `56%`, "--tilt": `-2deg` }, children: `写真がいいかも` }, 7), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--1`, style: { left: `22%`, top: `72%`, "--tilt": `1deg` }, children: `仕事内容を伝えたい` }, 8), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--3`, style: { left: `62%`, top: `74%`, "--tilt": `-3deg` }, children: `少し、かっこよく` }, 9), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--2`, style: { left: `40%`, top: `88%`, "--tilt": `2deg` }, children: `親しみやすさも` }, 10), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--1`, style: { left: `6%`, top: `88%`, "--tilt": `-1deg` }, children: `まだ、ぼんやりしている` }, 11), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--1`, style: { left: `76%`, top: `90%`, "--tilt": `2deg` }, children: `言葉にできない` }, 12), (0, i.jsx)(`span`, { className: `exp-thought exp-thought--1`, style: { left: `46%`, top: `46%`, "--tilt": `-2deg` }, children: `採用を変えたい` }, 13)]
        }), (0, i.jsxs)(`div`, {
            className: `sec-inner exp-center`,
            children: [(0, i.jsxs)(`p`, {
                className: `sec-label`,
                children: [(0, i.jsx)(`i`, {
                    className: `sec-dash`,
                    "aria-hidden": `true`
                }), `04 / EXPERIENCE`]
            }), (0, i.jsx)(`em`, {
                className: `exp-step`,
                children: `STEP 01｜お打ち合わせ`
            }), (0, i.jsx)(`small`, {
                className: `exp-en`,
                children: `IT DOESN'T HAVE TO BE CLEAR YET.`
            }), (0, i.jsxs)(`h2`, {
                id: `experience-title`,
                className: `exp-title`,
                children: [(0, i.jsx)(`span`, {
                    children: `その「なんとなく」から、`
                }), (0, i.jsx)(`br`, {}), (0, i.jsx)(`em`, {
                    children: `つくります。`
                })]
            }), (0, i.jsx)(`p`, {
                className: `exp-body`,
                children: `まだ輪郭がなくても大丈夫。漂う言葉から、その会社だけの表現を見つけます。`
            })]
        })]
    }), (0, i.jsxs)(`section`, {
        id: `expression`,
        className: `showcase`,
        "aria-labelledby": `showcase-title`,
        children: [(0, i.jsxs)(`div`, {
            className: `sec-inner`,
            children: [(0, i.jsxs)(`p`, {
                className: `sec-label`,
                children: [(0, i.jsx)(`i`, { className: `sec-dash`, "aria-hidden": `true` }), `05 / EXPRESSION SHOWROOM`]
            }), (0, i.jsx)(`h2`, {
                id: `showcase-title`, className: `col-title sw-title`, children: `表現ショールーム`
            }), (0, i.jsx)(`p`, {
                className: `col-lead sw-lead`, children: `業種ごとの表現の振り幅を見せる、Tilto°制作の表現サンプルです。実在する企業のサイトではありません。`
            }), (0, i.jsx)(`div`, {
                className: `sw-filters`,
                role: `group`,
                "aria-label": `表現ショールームのカテゴリー`,
                children: [(0, i.jsx)(`button`, { type: `button`, "data-cat": `すべて`, "aria-pressed": `true`, children: `すべて` }, 0), (0, i.jsx)(`button`, { type: `button`, "data-cat": `IT・テック`, "aria-pressed": `false`, children: `IT・テック` }, 1), (0, i.jsx)(`button`, { type: `button`, "data-cat": `建設・製造`, "aria-pressed": `false`, children: `建設・製造` }, 2), (0, i.jsx)(`button`, { type: `button`, "data-cat": `物流・運輸`, "aria-pressed": `false`, children: `物流・運輸` }, 3), (0, i.jsx)(`button`, { type: `button`, "data-cat": `医療・看護`, "aria-pressed": `false`, children: `医療・看護` }, 4), (0, i.jsx)(`button`, { type: `button`, "data-cat": `介護・福祉`, "aria-pressed": `false`, children: `介護・福祉` }, 5), (0, i.jsx)(`button`, { type: `button`, "data-cat": `飲食・サービス`, "aria-pressed": `false`, children: `飲食・サービス` }, 6), (0, i.jsx)(`button`, { type: `button`, "data-cat": `エンタメ`, "aria-pressed": `false`, children: `エンタメ` }, 7)]
            })]
        }), (0, i.jsx)(`div`, {
            className: `sw-marquee`,
            "aria-label": `表現事例が左右に流れるショールーム`,
            children: [(0, i.jsx)(`div`, { className: `sw-lane sw-lane--1`, children: (0, i.jsxs)(`div`, { className: `sw-track`, children: [(0, i.jsx)(`div`, { className: `sw-group`, children: [(0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `IT・テック`, "data-file": `showroom-it-01.webp`, "data-no": `01`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `01` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 0.0000%` }, role: `img`, "aria-label": `透明なクリスタルと流体の3DグラフィックにHELLOの文字を重ねたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 0), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `IT・テック`, "data-file": `showroom-it-02.webp`, "data-no": `02`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `02` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 0.0000%` }, role: `img`, "aria-label": `静かな人が深く変える、というコピーを据えたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 1), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `IT・テック`, "data-file": `showroom-it-03.webp`, "data-no": `03`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `03` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 0.0000%` }, role: `img`, "aria-label": `NOT YETの大きな空白と線画のワイヤーフレームで余白を活かしたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 2), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `IT・テック`, "data-file": `showroom-it-04.webp`, "data-no": `04`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `04` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 0.0000%` }, role: `img`, "aria-label": `コードと手書きメモを机の上に広げたようにコラージュしたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 3), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `IT・テック`, "data-file": `showroom-it-05.webp`, "data-no": `05`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `05` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 0.0000%` }, role: `img`, "aria-label": `バグの世界をネオンカラーの壮大なイラストで描いたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 4), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `IT・テック`, "data-file": `showroom-it-06.webp`, "data-no": `06`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `06` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 0.0000%` }, role: `img`, "aria-label": `エラーや発見を親しみやすい手描きモチーフで構成したIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 5), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `建設・製造`, "data-file": `showroom-construction-01.webp`, "data-no": `07`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `07` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 20.0000%` }, role: `img`, "aria-label": `巨大な高架橋の下に立つ人と、100年後。の文字を重ねた建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 6), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `建設・製造`, "data-file": `showroom-construction-02.webp`, "data-no": `08`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `08` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 20.0000%` }, role: `img`, "aria-label": `白い建築模型と図面を俯瞰し、橋を、つくる。と置いた建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 7), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `建設・製造`, "data-file": `showroom-construction-03.webp`, "data-no": `09`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `09` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 20.0000%` }, role: `img`, "aria-label": `図面から現場、街へつながる仕事をグラフィカルに表現した建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 8), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `建設・製造`, "data-file": `showroom-construction-04.webp`, "data-no": `10`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `10` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 20.0000%` }, role: `img`, "aria-label": `DEKAI.の巨大なオレンジ文字とクレーンの現場写真を重ねた建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 9), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `建設・製造`, "data-file": `showroom-construction-05.webp`, "data-no": `11`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `11` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 20.0000%` }, role: `img`, "aria-label": `図面から街が立ち上がる瞬間を繊細な青いイラストで表現した建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 10), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-01.webp`, "data-no": `12`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `12` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 20.0000%` }, role: `img`, "aria-label": `夜の高速道路を走るトラックと365/24/7の大きな数字を組んだ物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 11), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-02.webp`, "data-no": `13`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `13` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 40.0000%` }, role: `img`, "aria-label": `蛍光グリーンの地に矢印と日本地図の物流網を描いた物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 12), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-03.webp`, "data-no": `14`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `14` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 40.0000%` }, role: `img`, "aria-label": `トラックの運転席から夕暮れの街を望む写真に、「いってきます」から、仕事です。と添えた物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 13), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-04.webp`, "data-no": `15`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `15` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 40.0000%` }, role: `img`, "aria-label": `黄色いシャッターとフォークリフトを背に、運ぶ。以上。と大書した物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 14), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-05.webp`, "data-no": `16`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `16` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 40.0000%` }, role: `img`, "aria-label": `物流拠点と街を線で結び、見えない物流網を緻密に描いた採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 15), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-06.webp`, "data-no": `17`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `17` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 40.0000%` }, role: `img`, "aria-label": `街を運ぶトラックを大胆な青とオレンジのイラストで表現した物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 16), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `医療・看護`, "data-file": `showroom-medical-01.webp`, "data-no": `18`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `18` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 40.0000%` }, role: `img`, "aria-label": `37.0℃という体温の数字を大きく置き、看護師と患者の手を重ねた医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 17)] }), (0, i.jsx)(`div`, { className: `sw-group`, "aria-hidden": `true`, children: [(0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `IT・テック`, "data-file": `showroom-it-01.webp`, "data-no": `01`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `01` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 0.0000%` }, role: `img`, "aria-label": `透明なクリスタルと流体の3DグラフィックにHELLOの文字を重ねたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 0), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `IT・テック`, "data-file": `showroom-it-02.webp`, "data-no": `02`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `02` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 0.0000%` }, role: `img`, "aria-label": `静かな人が深く変える、というコピーを据えたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 1), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `IT・テック`, "data-file": `showroom-it-03.webp`, "data-no": `03`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `03` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 0.0000%` }, role: `img`, "aria-label": `NOT YETの大きな空白と線画のワイヤーフレームで余白を活かしたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 2), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `IT・テック`, "data-file": `showroom-it-04.webp`, "data-no": `04`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `04` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 0.0000%` }, role: `img`, "aria-label": `コードと手書きメモを机の上に広げたようにコラージュしたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 3), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `IT・テック`, "data-file": `showroom-it-05.webp`, "data-no": `05`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `05` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 0.0000%` }, role: `img`, "aria-label": `バグの世界をネオンカラーの壮大なイラストで描いたIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 4), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `IT・テック`, "data-file": `showroom-it-06.webp`, "data-no": `06`, "aria-label": `IT・テックの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `06` }), (0, i.jsx)(`b`, { children: `IT・テック` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 0.0000%` }, role: `img`, "aria-label": `エラーや発見を親しみやすい手描きモチーフで構成したIT企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 5), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `建設・製造`, "data-file": `showroom-construction-01.webp`, "data-no": `07`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `07` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 20.0000%` }, role: `img`, "aria-label": `巨大な高架橋の下に立つ人と、100年後。の文字を重ねた建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 6), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `建設・製造`, "data-file": `showroom-construction-02.webp`, "data-no": `08`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `08` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 20.0000%` }, role: `img`, "aria-label": `白い建築模型と図面を俯瞰し、橋を、つくる。と置いた建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 7), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `建設・製造`, "data-file": `showroom-construction-03.webp`, "data-no": `09`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `09` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 20.0000%` }, role: `img`, "aria-label": `図面から現場、街へつながる仕事をグラフィカルに表現した建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 8), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `建設・製造`, "data-file": `showroom-construction-04.webp`, "data-no": `10`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `10` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 20.0000%` }, role: `img`, "aria-label": `DEKAI.の巨大なオレンジ文字とクレーンの現場写真を重ねた建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 9), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `建設・製造`, "data-file": `showroom-construction-05.webp`, "data-no": `11`, "aria-label": `建設・製造の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `11` }), (0, i.jsx)(`b`, { children: `建設・製造` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 20.0000%` }, role: `img`, "aria-label": `図面から街が立ち上がる瞬間を繊細な青いイラストで表現した建設企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 10), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-01.webp`, "data-no": `12`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `12` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 20.0000%` }, role: `img`, "aria-label": `夜の高速道路を走るトラックと365/24/7の大きな数字を組んだ物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 11), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-02.webp`, "data-no": `13`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `13` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 40.0000%` }, role: `img`, "aria-label": `蛍光グリーンの地に矢印と日本地図の物流網を描いた物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 12), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-03.webp`, "data-no": `14`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `14` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 40.0000%` }, role: `img`, "aria-label": `トラックの運転席から夕暮れの街を望む写真に、「いってきます」から、仕事です。と添えた物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 13), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-04.webp`, "data-no": `15`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `15` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 40.0000%` }, role: `img`, "aria-label": `黄色いシャッターとフォークリフトを背に、運ぶ。以上。と大書した物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 14), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-05.webp`, "data-no": `16`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `16` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 40.0000%` }, role: `img`, "aria-label": `物流拠点と街を線で結び、見えない物流網を緻密に描いた採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 15), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `物流・運輸`, "data-file": `showroom-logistics-06.webp`, "data-no": `17`, "aria-label": `物流・運輸の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `17` }), (0, i.jsx)(`b`, { children: `物流・運輸` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 40.0000%` }, role: `img`, "aria-label": `街を運ぶトラックを大胆な青とオレンジのイラストで表現した物流企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 16), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `医療・看護`, "data-file": `showroom-medical-01.webp`, "data-no": `18`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `18` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 40.0000%` }, role: `img`, "aria-label": `37.0℃という体温の数字を大きく置き、看護師と患者の手を重ねた医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 17)] })] }) }, 1), (0, i.jsx)(`div`, { className: `sw-lane sw-lane--2`, children: (0, i.jsxs)(`div`, { className: `sw-track`, children: [(0, i.jsx)(`div`, { className: `sw-group`, children: [(0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `医療・看護`, "data-file": `showroom-medical-02.webp`, "data-no": `19`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `19` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 60.0000%` }, role: `img`, "aria-label": `医療データとチームの写真を精密に構成した医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 18), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `医療・看護`, "data-file": `showroom-medical-03.webp`, "data-no": `20`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `20` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 60.0000%` }, role: `img`, "aria-label": `病室の窓辺に立つ看護師と患者の写真に、あなたがいて、よかった。と縦書きで添えた医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 19), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `医療・看護`, "data-file": `showroom-medical-04.webp`, "data-no": `21`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `21` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 60.0000%` }, role: `img`, "aria-label": `大きな余白の中に、そばに。の一言と病室の小さな写真だけを置いた医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 20), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `介護・福祉`, "data-file": `showroom-care-01.webp`, "data-no": `22`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `22` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 60.0000%` }, role: `img`, "aria-label": `80歳の女性を主役に人生を前向きに表現した介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 21), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `介護・福祉`, "data-file": `showroom-care-02.webp`, "data-no": `23`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `23` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 60.0000%` }, role: `img`, "aria-label": `きょう、何する？の手書き文字と、利用者と職員が庭で過ごす写真を組んだ介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 22), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `介護・福祉`, "data-file": `showroom-care-03.webp`, "data-no": `24`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `24` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 60.0000%` }, role: `img`, "aria-label": `暮らす・笑う・食べる・生きるの4語を太い文字で積み、日常の写真を挟んだ介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 23), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `介護・福祉`, "data-file": `showroom-care-04.webp`, "data-no": `25`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `25` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 80.0000%` }, role: `img`, "aria-label": `鮮やかな青地に介護職、かっこよくないですか。と問いかけ、職員の横顔を置いた介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 24), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `介護・福祉`, "data-file": `showroom-care-05.webp`, "data-no": `26`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `26` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 80.0000%` }, role: `img`, "aria-label": `人生のカラフルさを手描きイラストでにぎやかに表現した介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 25), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-01.webp`, "data-no": `27`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `27` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 80.0000%` }, role: `img`, "aria-label": `炎と調理風景を大きく見せた飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 26), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-02.webp`, "data-no": `28`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `28` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 80.0000%` }, role: `img`, "aria-label": `開店前の静かな店内と、AM 5:42という時刻を組んだ飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 27), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-03.webp`, "data-no": `29`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `29` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 80.0000%` }, role: `img`, "aria-label": `黒い地に一皿だけを置き、一皿一生。と縦書きで添えた飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 28), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-04.webp`, "data-no": `30`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `30` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 80.0000%` }, role: `img`, "aria-label": `雑誌の見開きのように畑から厨房までの写真を並べ、おいしい、の裏側へ。と置いた飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 29), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-05.webp`, "data-no": `31`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `31` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 100.0000%` }, role: `img`, "aria-label": `食のつながりを大勢の人物と食材の温かなイラストで描いた採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 30), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-01.webp`, "data-no": `32`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `32` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 100.0000%` }, role: `img`, "aria-label": `開演5分前の暗い舞台袖を切り取り、幕と照明だけを見せたエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 31), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-02.webp`, "data-no": `33`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `33` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 100.0000%` }, role: `img`, "aria-label": `鮮やかなピンクとコラージュで熱狂を表現したエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 32), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-03.webp`, "data-no": `34`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `34` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 100.0000%` }, role: `img`, "aria-label": `つまらないなら、つくれば？という問いを漫画のコマのように構成したエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 33), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-04.webp`, "data-no": `35`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `35` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 100.0000%` }, role: `img`, "aria-label": `誰もいない暗いスタジオに、監督椅子と照明だけを置いたエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 34)] }), (0, i.jsx)(`div`, { className: `sw-group`, "aria-hidden": `true`, children: [(0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `医療・看護`, "data-file": `showroom-medical-02.webp`, "data-no": `19`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `19` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 60.0000%` }, role: `img`, "aria-label": `医療データとチームの写真を精密に構成した医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 18), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `医療・看護`, "data-file": `showroom-medical-03.webp`, "data-no": `20`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `20` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 60.0000%` }, role: `img`, "aria-label": `病室の窓辺に立つ看護師と患者の写真に、あなたがいて、よかった。と縦書きで添えた医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 19), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `医療・看護`, "data-file": `showroom-medical-04.webp`, "data-no": `21`, "aria-label": `医療・看護の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `21` }), (0, i.jsx)(`b`, { children: `医療・看護` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 60.0000%` }, role: `img`, "aria-label": `大きな余白の中に、そばに。の一言と病室の小さな写真だけを置いた医療機関の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 20), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `介護・福祉`, "data-file": `showroom-care-01.webp`, "data-no": `22`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `22` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 60.0000%` }, role: `img`, "aria-label": `80歳の女性を主役に人生を前向きに表現した介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 21), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `介護・福祉`, "data-file": `showroom-care-02.webp`, "data-no": `23`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `23` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 60.0000%` }, role: `img`, "aria-label": `きょう、何する？の手書き文字と、利用者と職員が庭で過ごす写真を組んだ介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 22), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `介護・福祉`, "data-file": `showroom-care-03.webp`, "data-no": `24`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `24` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 60.0000%` }, role: `img`, "aria-label": `暮らす・笑う・食べる・生きるの4語を太い文字で積み、日常の写真を挟んだ介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 23), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `介護・福祉`, "data-file": `showroom-care-04.webp`, "data-no": `25`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `25` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 80.0000%` }, role: `img`, "aria-label": `鮮やかな青地に介護職、かっこよくないですか。と問いかけ、職員の横顔を置いた介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 24), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `介護・福祉`, "data-file": `showroom-care-05.webp`, "data-no": `26`, "aria-label": `介護・福祉の表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `26` }), (0, i.jsx)(`b`, { children: `介護・福祉` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 80.0000%` }, role: `img`, "aria-label": `人生のカラフルさを手描きイラストでにぎやかに表現した介護福祉の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 25), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-01.webp`, "data-no": `27`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `27` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 80.0000%` }, role: `img`, "aria-label": `炎と調理風景を大きく見せた飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 26), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-02.webp`, "data-no": `28`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `28` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 80.0000%` }, role: `img`, "aria-label": `開店前の静かな店内と、AM 5:42という時刻を組んだ飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 27), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-03.webp`, "data-no": `29`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `29` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 80.0000%` }, role: `img`, "aria-label": `黒い地に一皿だけを置き、一皿一生。と縦書きで添えた飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 28), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--compact`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-04.webp`, "data-no": `30`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `30` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `100.0000% 80.0000%` }, role: `img`, "aria-label": `雑誌の見開きのように畑から厨房までの写真を並べ、おいしい、の裏側へ。と置いた飲食店の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 29), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `飲食・サービス`, "data-file": `showroom-food-05.webp`, "data-no": `31`, "aria-label": `飲食・サービスの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `31` }), (0, i.jsx)(`b`, { children: `飲食・サービス` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `0.0000% 100.0000%` }, role: `img`, "aria-label": `食のつながりを大勢の人物と食材の温かなイラストで描いた採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 30), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-01.webp`, "data-no": `32`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `32` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `20.0000% 100.0000%` }, role: `img`, "aria-label": `開演5分前の暗い舞台袖を切り取り、幕と照明だけを見せたエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 31), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--tall`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-02.webp`, "data-no": `33`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `33` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `40.0000% 100.0000%` }, role: `img`, "aria-label": `鮮やかなピンクとコラージュで熱狂を表現したエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 32), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--wide`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-03.webp`, "data-no": `34`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `34` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `60.0000% 100.0000%` }, role: `img`, "aria-label": `つまらないなら、つくれば？という問いを漫画のコマのように構成したエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 33), (0, i.jsxs)(`button`, { type: `button`, className: `sw-item sw-item--medium`, "data-cat": `エンタメ`, "data-file": `showroom-entertainment-04.webp`, "data-no": `35`, "aria-label": `エンタメの表現事例を大きく見る`, children: [(0, i.jsxs)(`span`, { className: `sw-meta`, children: [(0, i.jsx)(`i`, { children: `35` }), (0, i.jsx)(`b`, { children: `エンタメ` })] }), (0, i.jsx)(`span`, { className: `sw-visual`, style: { backgroundPosition: `80.0000% 100.0000%` }, role: `img`, "aria-label": `誰もいない暗いスタジオに、監督椅子と照明だけを置いたエンタメ企業の採用サイトFV` }), (0, i.jsxs)(`span`, { className: `sw-view`, children: [`大きく見る`, (0, i.jsx)(`i`, { "aria-hidden": `true`, children: `＋` })] })] }, 34)] })] }) }, 2)]
        })]
    }), (0, i.jsx)(`section`, {
        id: `strategy`,
        className: `bim-transition`,
        "aria-label": `完成した採用サイトが、4枚の設計図に分解されていく演出`,
        children: (0, i.jsxs)(`div`, {
            className: `bim-sticky`,
            children: [(0, i.jsxs)(`header`, {
                className: `bim-head`,
                children: [(0, i.jsxs)(`div`, {
                    children: [(0, i.jsx)(`small`, { children: `06 / BEHIND THE EXPRESSION` }),
                        (0, i.jsxs)(`h2`, { children: [`美しいだけでは、`, (0, i.jsx)(`br`, {}), `採用は動かない。`] })]
                }), (0, i.jsxs)(`p`, {
                    className: `bim-lead`,
                    children: [`誰に、何を、どう届けて応募につなげるか。`, (0, i.jsx)(`br`, {}), `デザインの前に、設計から考えます。`]
                })]
            }), (0, i.jsx)(`div`, {
                className: `bim-stage`,
                children: (0, i.jsx)(`canvas`, { className: `bim-canvas`, "aria-hidden": `true` })
            })]
        })
    }), (0, i.jsx)(`section`, {
        id: `pricing`,
        className: `plan`,
        "aria-labelledby": `plan-title`,
        children: (0, i.jsxs)(`div`, {
            className: `plan-inner`,
            children: [(0, i.jsxs)(`div`, {
                className: `plan-left`,
                children: [(0, i.jsxs)(`p`, {
                    className: `sec-no`,
                    children: [(0, i.jsx)(`b`, { children: `06` }),
                        (0, i.jsx)(`span`, { children: `PRICE / FAQ` })]
                }), (0, i.jsx)(`h2`, {
                    id: `plan-title`, className: `sr-only`, children: `料金とよくある質問`
                }), (0, i.jsxs)(`div`, {
                    className: `plan-figs`,
                    children: [(0, i.jsxs)(`div`, {
                        className: `pfig`,
                        children: [(0, i.jsx)(`span`, { className: `pfig-cap`, children: `月額` }),
                            (0, i.jsx)(`strong`, { className: `pfig-num pfig-num--coral`, children: `27,000` }),
                            (0, i.jsxs)(`span`, { className: `pfig-unit`, children: [`円`,
                                (0, i.jsx)(`em`, { children: `/ MONTH` })] })]
                    }), (0, i.jsxs)(`div`, {
                        className: `pfig pfig--init`,
                        children: [(0, i.jsx)(`span`, { className: `pfig-cap pfig-cap--top`, children: `初期費用` }),
                            (0, i.jsx)(`strong`, { className: `pfig-num`, children: `0` }),
                            (0, i.jsx)(`span`, { className: `pfig-unit`, children: `円` })]
                    })]
                }), (0, i.jsxs)(`p`, {
                    className: `plan-note`,
                    children: [`※表示価格は基本プランの月額料金です。`, (0, i.jsx)(`br`, {}),
                        `※内容や更新範囲に応じてご案内します。`]
                })]
            }), (0, i.jsxs)(`div`, {
                className: `faq-col`,
                id: `faq`,
                "aria-labelledby": `faq-title`,
                children: [(0, i.jsx)(`p`, {
                    className: `faq-head`, id: `faq-title`, children: `FAQ`
                }), (0, i.jsx)(`div`, {
                    className: `faq-list`,
                    children: [(0, i.jsxs)(`details`, { open: true, children: [(0, i.jsxs)(`summary`, { children: [(0, i.jsx)(`b`, { children: `Q.` }), (0, i.jsx)(`strong`, { children: `最低契約期間はありますか？` }), (0, i.jsx)(`i`, { "aria-hidden": `true` })] }), (0, i.jsxs)(`p`, { children: [(0, i.jsx)(`b`, { children: `A.` }), (0, i.jsx)(`span`, { children: `最低契約期間は6ヶ月です。6ヶ月以降は1ヶ月単位で契約更新が可能です。` })] })] }, 0), (0, i.jsxs)(`details`, { children: [(0, i.jsxs)(`summary`, { children: [(0, i.jsx)(`b`, { children: `Q.` }), (0, i.jsx)(`strong`, { children: `契約中の解約はどこまで対応してもらえますか？` }), (0, i.jsx)(`i`, { "aria-hidden": `true` })] }), (0, i.jsxs)(`p`, { children: [(0, i.jsx)(`b`, { children: `A.` }), (0, i.jsx)(`span`, { children: `最低契約期間の6ヶ月を過ぎたあとは、1ヶ月単位で更新・終了をお選びいただけます。` })] })] }, 1), (0, i.jsxs)(`details`, { children: [(0, i.jsxs)(`summary`, { children: [(0, i.jsx)(`b`, { children: `Q.` }), (0, i.jsx)(`strong`, { children: `原稿や写真がなくても大丈夫ですか？` }), (0, i.jsx)(`i`, { "aria-hidden": `true` })] }), (0, i.jsxs)(`p`, { children: [(0, i.jsx)(`b`, { children: `A.` }), (0, i.jsx)(`span`, { children: `はい。原稿制作に加え、必要に応じて撮影・映像・イラストの専門家を編成します。手元に素材が少ない状態からでも始められます。` })] })] }, 2), (0, i.jsxs)(`details`, { children: [(0, i.jsxs)(`summary`, { children: [(0, i.jsx)(`b`, { children: `Q.` }), (0, i.jsx)(`strong`, { children: `公開までどれくらいかかりますか？` }), (0, i.jsx)(`i`, { "aria-hidden": `true` })] }), (0, i.jsxs)(`p`, { children: [(0, i.jsx)(`b`, { children: `A.` }), (0, i.jsx)(`span`, { children: `ご提案は最短1週間です。公開までは内容や規模により2〜4か月が目安で、最初のご相談で進め方をご案内します。` })] })] }, 3), (0, i.jsxs)(`details`, { children: [(0, i.jsxs)(`summary`, { children: [(0, i.jsx)(`b`, { children: `Q.` }), (0, i.jsx)(`strong`, { children: `他の制作会社との違いは何ですか？` }), (0, i.jsx)(`i`, { "aria-hidden": `true` })] }), (0, i.jsxs)(`p`, { children: [(0, i.jsx)(`b`, { children: `A.` }), (0, i.jsx)(`span`, { children: `採用のプロとデザイナーが伴走し、AIを制作の過程に使って、1社ごとに全く違う表現をつくります。つくって終わりではなく、公開後の運用まで続けます。` })] })] }, 4)]
                }), (0, i.jsx)(`p`, {
                    className: `faq-more`, children: `and more…`
                })]
            })]
        })
    }), (0, i.jsx)(`footer`, {
        id: `contact`,
        className: `site-foot`,
        children: (0, i.jsxs)(`div`, {
            className: `foot-inner`,
            children: [(0, i.jsxs)(`p`, {
                className: `sec-no sec-no--light`,
                children: [(0, i.jsx)(`b`, { children: `07` }),
                    (0, i.jsx)(`span`, { children: `LET'S TALK` })]
            }), (0, i.jsxs)(`div`, {
                className: `foot-main`,
                children: [(0, i.jsxs)(`h2`, {
                    className: `foot-title`,
                    children: [`らしさを、`, (0, i.jsx)(`br`, {}), `採用の力に。`]
                }), (0, i.jsxs)(`a`, {
                    className: `foot-cta`, href: `mailto:hello@tilto.jp`,
                    children: [`まずは、話してみる。`,
                        (0, i.jsx)(`span`, { "aria-hidden": `true`, children: `⟶` })]
                })]
            }), (0, i.jsxs)(`div`, {
                className: `foot-bottom`,
                children: [(0, i.jsxs)(`a`, {
                    className: `foot-brand`, href: `#top`,
                    children: [`Tilto`, (0, i.jsx)(`sup`, { children: `°` })]
                }), (0, i.jsx)(`nav`, {
                    className: `foot-nav`,
                    "aria-label": `フッターナビゲーション`,
                    children: [(0, i.jsx)(`a`, { href: `#about`, children: `SERVICE` }, 0), (0, i.jsx)(`a`, { href: `#expression`, children: `WORKS` }, 1), (0, i.jsx)(`a`, { href: `#pricing`, children: `PRICE` }, 2), (0, i.jsx)(`a`, { href: `#strategy`, children: `ABOUT` }, 3), (0, i.jsx)(`a`, { href: `#contact`, children: `CONTACT` }, 4)]
                }), (0, i.jsxs)(`div`, {
                    className: `foot-corp`,
                    children: [(0, i.jsx)(`b`, {
                        children: (0, i.jsx)(`a`, {
                            href: `https://savorflow.co.jp/`, target: `_blank`, rel: `noopener`,
                            children: `株式会社Savor Flow`
                        })
                    }), (0, i.jsx)(`a`, {
                        href: `https://savorflow.co.jp/privacy`, target: `_blank`, rel: `noopener`,
                        children: `プライバシーポリシー`
                    })]
                }), (0, i.jsx)(`small`, {
                    className: `foot-copy`, children: `© 2026 TILTO° All Rights Reserved.`
                })]
            })]
        })
    })]
    })
}
export { x as default };
