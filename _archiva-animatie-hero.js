/*
  Arhivă — animația originală din Hero (mockup de site care se construiește
  singur: wireframe -> culoare -> etichete). Scoasă din index.html pe 9 sept,
  înlocuită cu rotația de capturi reale. Păstrată aici în caz că-i găsești
  un loc mai bun mai târziu (ex. în Servicii, sau ca element separat).

  Constante + funcții folosite de buildMockup():
*/

const MOCK_W = 440;
const qw = v => (v / MOCK_W * 100) + 'cqw';
const mClamp01 = v => Math.max(0, Math.min(1, v));
const mEase = v => 1 - Math.pow(1 - mClamp01(v), 3);
const mSeg = (t, a, b) => mEase((t - a) / (b - a));
const CARD_X = [24, 160, 296];
const MOCK_ITEMS = [
  { key: 'logo', x: 16, y: 32, w: 18, h: 18, r: 5, delay: 0, persistent: true, color: 'oklch(0.55 0.13 38)' },
  { key: 'nav1', x: 170, y: 38, w: 26, h: 4, r: 2, delay: 0.02, persistent: true, color: 'oklch(0.8 0.02 60)' },
  { key: 'nav2', x: 206, y: 38, w: 26, h: 4, r: 2, delay: 0.03, persistent: true, color: 'oklch(0.8 0.02 60)' },
  { key: 'nav3', x: 242, y: 38, w: 26, h: 4, r: 2, delay: 0.04, persistent: true, color: 'oklch(0.8 0.02 60)' },
  { key: 'navcta', x: 372, y: 32, w: 48, h: 16, r: 8, delay: 0.05, persistent: true, color: 'oklch(0.55 0.13 38)' },
  { key: 'head1', x: 24, y: 64, w: 230, h: 14, r: 4, delay: 0, persistent: false, color: 'oklch(0.3 0.03 45)' },
  { key: 'head2', x: 24, y: 84, w: 170, h: 14, r: 4, delay: 0.02, persistent: false, color: 'oklch(0.3 0.03 45)' },
  { key: 'sub1', x: 24, y: 106, w: 190, h: 8, r: 3, delay: 0.03, persistent: false, color: 'oklch(0.5 0.02 50)' },
  { key: 'herobtn', x: 24, y: 124, w: 110, h: 26, r: 13, delay: 0.06, persistent: true, color: 'oklch(0.55 0.13 38)' },
  { key: 'panel0', x: CARD_X[0], y: 158, w: 124, h: 134, r: 12, delay: 0.04, persistent: true, color: 'oklch(0.98 0.006 75)', border: true },
  { key: 'panel1', x: CARD_X[1], y: 158, w: 124, h: 134, r: 12, delay: 0.06, persistent: true, color: 'oklch(0.98 0.006 75)', border: true },
  { key: 'panel2', x: CARD_X[2], y: 158, w: 124, h: 134, r: 12, delay: 0.08, persistent: true, color: 'oklch(0.98 0.006 75)', border: true },
  { key: 'icon0', x: CARD_X[0] + 14, y: 170, w: 96, h: 40, r: 8, delay: 0.06, persistent: true, color: 'oklch(0.55 0.13 38)' },
  { key: 'icon1', x: CARD_X[1] + 14, y: 170, w: 96, h: 40, r: 8, delay: 0.08, persistent: true, color: 'oklch(0.55 0.13 38)' },
  { key: 'icon2', x: CARD_X[2] + 14, y: 170, w: 96, h: 40, r: 8, delay: 0.10, persistent: true, color: 'oklch(0.55 0.13 38)' },
  { key: 'title0', x: CARD_X[0] + 10, y: 224, w: 104, h: 12, r: 3, delay: 0.08, persistent: false, color: 'oklch(0.3 0.03 45)' },
  { key: 'title1', x: CARD_X[1] + 10, y: 224, w: 104, h: 12, r: 3, delay: 0.10, persistent: false, color: 'oklch(0.3 0.03 45)' },
  { key: 'title2', x: CARD_X[2] + 10, y: 224, w: 104, h: 12, r: 3, delay: 0.12, persistent: false, color: 'oklch(0.3 0.03 45)' },
  { key: 'text0', x: CARD_X[0] + 10, y: 242, w: 94, h: 8, r: 3, delay: 0.10, persistent: false, color: 'oklch(0.5 0.02 50)' },
  { key: 'text1', x: CARD_X[1] + 10, y: 242, w: 94, h: 8, r: 3, delay: 0.12, persistent: false, color: 'oklch(0.5 0.02 50)' },
  { key: 'text2', x: CARD_X[2] + 10, y: 242, w: 94, h: 8, r: 3, delay: 0.14, persistent: false, color: 'oklch(0.5 0.02 50)' }
];
function mockWireOpacity(t, delay) {
  return mSeg(t, delay, delay + 0.10) * (1 - mSeg(t, 0.30, 0.42));
}
function mockColorOpacity(t, delay, persistent) {
  const inV = mSeg(t, 0.26 + delay * 0.4, 0.42 + delay * 0.4);
  if (persistent) return inV;
  return inV * (1 - mSeg(t, 0.62, 0.78));
}
function mockFinalOpacity(t, delay) {
  return mSeg(t, 0.64 + delay, 0.80 + delay);
}

/* Metode care erau în class Component (in-line, folosind this.state.t): */

// startAnimation() {
//   const DURATION = 1800;
//   const loop = this.props.loopAnimation ?? false;
//   const startTime = performance.now();
//   const step = (now) => {
//     const t = Math.max(0, Math.min(1, (now - startTime) / DURATION));
//     this.setState({ t });
//     if (t < 1) {
//       this.raf = requestAnimationFrame(step);
//     } else if (loop) {
//       this.loopTimer = setTimeout(() => this.startAnimation(), 1100);
//     }
//   };
//   this.raf = requestAnimationFrame(step);
// }
// replay = () => {
//   if (this.raf) cancelAnimationFrame(this.raf);
//   if (this.loopTimer) clearTimeout(this.loopTimer);
//   this.setState({ t: 0 });
//   requestAnimationFrame(() => this.startAnimation());
// };
//
// buildMockup(t) {
//   const h = React.createElement;
//   const chromeOpacity = mSeg(t, 0, 0.08);
//   const wire = (it) => h('div', { key: it.key + '-w', style: {
//     position: 'absolute', left: qw(it.x), top: qw(it.y), width: qw(it.w), height: qw(it.h),
//     border: `${qw(1.5)} solid oklch(0.8 0.02 60)`, borderRadius: qw(it.r), background: 'transparent',
//     opacity: mockWireOpacity(t, it.delay), boxSizing: 'border-box'
//   }});
//   const color = (it) => h('div', { key: it.key + '-c', style: {
//     position: 'absolute', left: qw(it.x), top: qw(it.y), width: qw(it.w), height: qw(it.h),
//     borderRadius: qw(it.r), background: it.color,
//     border: it.border ? `${qw(1)} solid oklch(0.9 0.02 60)` : 'none',
//     opacity: mockColorOpacity(t, it.delay, it.persistent), boxSizing: 'border-box'
//   }});
//   const byKey = k => MOCK_ITEMS.find(i => i.key === k);
//   const label = (key, x, y, w, delay, style, text) => {
//     const op = mockFinalOpacity(t, delay), yOff = (1 - op) * -6;
//     return h('div', { key, style: Object.assign({
//       position: 'absolute', left: qw(x), top: qw(y), width: qw(w),
//       opacity: op, transform: `translateY(${yOff}px)`
//     }, style) }, text);
//   };
//   const logo = byKey('logo'), heroBtn = byKey('herobtn');
//
//   return h('div', { style: {
//     position: 'absolute', inset: 0, borderRadius: '16px', overflow: 'hidden',
//     background: 'oklch(0.975 0.008 75)', border: '1px solid oklch(0.9 0.02 60)',
//     boxShadow: '0 20px 46px rgba(60,45,25,0.12)', opacity: chromeOpacity
//   }},
//     h('div', { key: 'header', style: {
//       position: 'absolute', left: 0, top: 0, width: '100%', height: qw(26),
//       background: 'oklch(0.98 0.006 75)', borderBottom: '1px solid oklch(0.9 0.02 60)',
//       display: 'flex', alignItems: 'center', gap: qw(6), padding: `0 ${qw(16)}`, boxSizing: 'border-box'
//     }},
//       h('div', { key: 'd1', style: { width: qw(7), height: qw(7), borderRadius: '50%', background: 'oklch(0.82 0.02 60)' } }),
//       h('div', { key: 'd2', style: { width: qw(7), height: qw(7), borderRadius: '50%', background: 'oklch(0.82 0.02 60)' } }),
//       h('div', { key: 'd3', style: { width: qw(7), height: qw(7), borderRadius: '50%', background: 'oklch(0.82 0.02 60)' } }),
//       h('div', { key: 'addr', style: { marginLeft: qw(14), flex: 1, height: qw(13), borderRadius: qw(7), background: 'oklch(0.92 0.02 60)' } })
//     ),
//     ...MOCK_ITEMS.map(wire),
//     ...MOCK_ITEMS.map(color),
//     label('logo-label', logo.x, logo.y + logo.h / 2 - 6, logo.w, 0,
//       { height: qw(logo.h), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Spectral, serif', fontWeight: 600, fontSize: qw(13), color: '#fff', transform: 'none' }, 'S'),
//     label('heading-final', 24, 60, 260, 0.03,
//       { fontFamily: 'Spectral, serif', fontWeight: 500, fontSize: qw(15), lineHeight: 1.28, color: 'oklch(0.22 0.02 50)' },
//       [h('div', { key: 'h1' }, 'Titlu principal'), h('div', { key: 'h2' }, 'al site-ului tău')]),
//     label('sub-final', 24, 106, 220, 0.05,
//       { fontFamily: 'Work Sans, sans-serif', fontSize: qw(9.5), lineHeight: 1.4, color: 'oklch(0.5 0.02 50)' },
//       'Descriere scurtă a serviciului oferit.'),
//     label('btn-label', heroBtn.x, heroBtn.y, heroBtn.w, 0.08,
//       { height: qw(heroBtn.h), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Work Sans, sans-serif', fontWeight: 600, fontSize: qw(9.5), color: '#fff', transform: 'none' }, 'Vezi mai mult'),
//     label('title0', CARD_X[0] + 10, 224, 104, 0.10, { fontFamily: 'Spectral, serif', fontWeight: 600, fontSize: qw(11), color: 'oklch(0.22 0.02 50)' }, 'Serviciu 1'),
//     label('title1', CARD_X[1] + 10, 224, 104, 0.12, { fontFamily: 'Spectral, serif', fontWeight: 600, fontSize: qw(11), color: 'oklch(0.22 0.02 50)' }, 'Serviciu 2'),
//     label('title2', CARD_X[2] + 10, 224, 104, 0.14, { fontFamily: 'Spectral, serif', fontWeight: 600, fontSize: qw(11), color: 'oklch(0.22 0.02 50)' }, 'Serviciu 3'),
//     label('text0', CARD_X[0] + 10, 242, 94, 0.12, { fontFamily: 'Work Sans, sans-serif', fontSize: qw(8), color: 'oklch(0.48 0.02 50)' }, 'Descriere scurtă'),
//     label('text1', CARD_X[1] + 10, 242, 94, 0.14, { fontFamily: 'Work Sans, sans-serif', fontSize: qw(8), color: 'oklch(0.48 0.02 50)' }, 'Descriere scurtă'),
//     label('text2', CARD_X[2] + 10, 242, 94, 0.16, { fontFamily: 'Work Sans, sans-serif', fontSize: qw(8), color: 'oklch(0.48 0.02 50)' }, 'Descriere scurtă')
//   );
// }
//
// Template original (în Hero):
// <div style="width:100%;position:relative;aspect-ratio:440/300;container-type:inline-size;">
//   {{ heroMockup }}
// </div>
// <button type="button" onClick="{{ replayAnimation }}" style="...">
//   <span style="font-size:14px;line-height:1;">↺</span> Revezi animația
// </button>
