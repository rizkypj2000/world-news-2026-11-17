// Original SVG drawings for the front page. ART.hero.* are 320x118 scenes,
// ART.icon.* are 64x64 pictograms. Plain shapes only, no copied artwork.

const SEA = '#5b8fb4', SKY = '#dfe9f0', SMOKE = '#7d7f86', FIRE = '#f08a24', FLAME = '#ffd23f';

const drone = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#1d1f24"><path d="M0 0 L14 4 L0 8 L4 4 Z"/><rect x="-5" y="3" width="8" height="2"/></g>`;
const boom = (x, y, r = 12) => {
  let pts = '';
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI * 2 * i) / 16, rr = i % 2 ? r * 0.45 : r;
    pts += `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)} `;
  }
  return `<polygon points="${pts}" fill="${FIRE}"/><circle cx="${x}" cy="${y}" r="${r * 0.32}" fill="${FLAME}"/>`;
};
const smoke = (x, y, k = 1) =>
  `<g fill="${SMOKE}" opacity=".85"><circle cx="${x}" cy="${y}" r="${9 * k}"/><circle cx="${x + 10 * k}" cy="${y - 9 * k}" r="${11 * k}"/><circle cx="${x + 24 * k}" cy="${y - 14 * k}" r="${9 * k}"/><circle cx="${x + 4 * k}" cy="${y - 20 * k}" r="${8 * k}"/></g>`;
const waves = (y0, w = 320) => {
  let d = '';
  for (let y = y0; y < 118; y += 9) for (let x = 6 + ((y / 9) % 2) * 14; x < w; x += 30) d += `M${x} ${y} q5 -4 10 0 `;
  return `<path d="${d}" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.6" fill="none"/>`;
};
const label = (x, y, t, anchor = 'start', fill = '#1d1f24') =>
  `<text x="${x}" y="${y}" font-family="Segoe UI, Arial" font-size="10" font-weight="800" letter-spacing="1.2" fill="${fill}" text-anchor="${anchor}">${t}</text>`;

const usFlag = (x, y, w = 44) => {
  const h = w * 0.6, sh = h / 7;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#999" stroke-width=".6"/>`;
  for (let i = 0; i < 7; i += 2) s += `<rect x="${x}" y="${y + i * sh}" width="${w}" height="${sh}" fill="#b22234"/>`;
  return s + `<rect x="${x}" y="${y}" width="${w * 0.42}" height="${sh * 4}" fill="#3c3b6e"/>`;
};
const cnFlag = (x, y, w = 44) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${w * 0.6}" fill="#de2910"/><polygon fill="#ffde00" points="${star(x + w * 0.17, y + w * 0.15, w * 0.1)}"/>`;
const ruFlag = (x, y, w = 44) => {
  const h = w * 0.6;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="#fff" stroke="#999" stroke-width=".6"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#0039a6"/><rect x="${x}" y="${y + (2 * h) / 3}" width="${w}" height="${h / 3}" fill="#d52b1e"/>`;
};
const phFlag = (x, y, w = 44) => {
  const h = w * 0.6;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#0038a8"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="#ce1126"/><polygon points="${x},${y} ${x + w * 0.45},${y + h / 2} ${x},${y + h}" fill="#fff"/><circle cx="${x + w * 0.15}" cy="${y + h / 2}" r="${w * 0.06}" fill="#fcd116"/>`;
};
function star(cx, cy, r) {
  let p = '';
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / 5, rr = i % 2 ? r * 0.42 : r;
    p += `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)} `;
  }
  return p;
}

const ART = {
  hero: {
    // 1. Kerch bridge: a road span drops into the strait
    kerch: `<svg viewBox="0 0 320 118"><rect width="320" height="118" fill="${SKY}"/>
      <rect y="78" width="320" height="40" fill="${SEA}"/>${waves(88)}
      ${smoke(170, 38, 1.2)}
      <g fill="#2b2e36">
        <rect x="0" y="54" width="128" height="7"/><rect x="200" y="54" width="120" height="7"/>
        ${[14, 50, 86, 122, 206, 242, 278, 314].map(x => `<rect x="${x - 3}" y="61" width="6" height="22"/>`).join('')}
        <path d="M0 54 Q32 30 64 54 Q96 30 128 54" fill="none" stroke="#2b2e36" stroke-width="3"/>
        <path d="M200 54 Q232 30 264 54 Q296 30 328 54" fill="none" stroke="#2b2e36" stroke-width="3"/>
        <polygon points="130,57 196,57 190,90 136,72" fill="#3b3f4a"/>
      </g>
      <path d="M134 74 l-6 10 M150 80 l-3 9 M176 86 l2 9" stroke="#fff" stroke-width="2"/>
      ${boom(160, 52, 15)}
      ${drone(40, 18, 1.1)}${drone(72, 28, 0.9)}${drone(246, 16, 1)}
      ${label(8, 110, 'CRIMEA', 'start', '#fff')}${label(312, 110, 'RUSSIA', 'end', '#fff')}
    </svg>`,

    // 2. Gulf: burning tanker, drone over Bahrain radar, US carrier
    gulf: `<svg viewBox="0 0 320 118"><rect width="320" height="118" fill="#f1e6d2"/>
      <rect y="70" width="320" height="48" fill="${SEA}"/>${waves(80)}
      <g transform="translate(18 60)">
        <path d="M0 10 L120 10 L110 28 L8 28 Z" fill="#7a1f1b"/><rect x="88" y="-4" width="18" height="14" fill="#e9e3d8"/><rect x="96" y="-12" width="4" height="9" fill="#2b2e36"/>
        <path d="M24 10 q6 -22 12 -6 q4 -16 10 0 q6 -18 12 4 Z" fill="${FIRE}"/><path d="M30 10 q4 -12 8 -2 q4 -8 7 2 Z" fill="${FLAME}"/>
      </g>
      ${smoke(40, 40, 1.15)}
      <g transform="translate(196 62)" fill="#5d6470">
        <path d="M0 8 L112 8 L104 20 L10 20 Z"/><rect x="72" y="-6" width="12" height="14"/><rect x="0" y="5" width="112" height="3" fill="#7a818c"/>
      </g>
      <g transform="translate(250 22)"><path d="M0 18 a14 14 0 0 1 28 0 Z" fill="#e9e3d8" stroke="#2b2e36" stroke-width="2"/><rect x="12" y="18" width="4" height="12" fill="#2b2e36"/></g>
      ${drone(170, 18, 1.1)}${drone(205, 30, 0.9)}
      <path d="M150 22 q40 -10 92 8" stroke="#b3261e" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>
      ${label(8, 112, 'STRAIT OF HORMUZ', 'start', '#fff')}${label(312, 112, '3RD US CARRIER', 'end', '#fff')}
      ${label(266, 14, 'BAHRAIN', 'middle')}
    </svg>`,

    // 3. Diplomacy: Manila talks, then Trump–Xi–Putin in Shenzhen
    summit: `<svg viewBox="0 0 320 118"><rect width="320" height="118" fill="#e8e4f2"/>
      <rect x="0" y="0" width="320" height="22" fill="#2a2d5c"/>
      <g transform="translate(8 4)">${phFlag(0, 0, 24)}</g>
      ${label(38, 15, 'TODAY MANILA  →  THU 19 NOV SHENZHEN', 'start', '#fff')}
      ${[[40, usFlag], [138, cnFlag], [236, ruFlag]].map(([x, f]) => `<rect x="${x - 2}" y="34" width="2.5" height="54" fill="#555"/>${f(x, 34, 46)}`).join('')}
      <rect x="20" y="86" width="280" height="10" rx="2" fill="#6b4a2b"/><rect x="30" y="96" width="260" height="22" fill="#8a6440"/>
      ${label(63, 112, 'TRUMP', 'middle', '#fff')}${label(161, 112, 'XI', 'middle', '#fff')}${label(259, 112, 'PUTIN', 'middle', '#fff')}
    </svg>`,
  },

  icon: {
    chip: `<svg viewBox="0 0 64 64"><rect x="6" y="14" width="30" height="30" rx="3" fill="#1d1f24"/><rect x="13" y="21" width="16" height="16" fill="#76b900"/>${[18, 24, 30, 36].map(y => `<rect x="2" y="${y}" width="4" height="2" fill="#1d1f24"/><rect x="36" y="${y}" width="4" height="2" fill="#1d1f24"/>`).join('')}<path d="M40 50 L48 40 L54 44 L62 30" stroke="#0b7a55" stroke-width="3.5" fill="none"/><path d="M56 30 h6 v6" stroke="#0b7a55" stroke-width="3.5" fill="none"/></svg>`,
    dow: `<svg viewBox="0 0 64 64"><path d="M4 56 H62 M4 56 V6" stroke="#555" stroke-width="2"/><path d="M8 14 L22 22 L30 18 L42 34 L52 32 L60 50" stroke="#b3261e" stroke-width="4" fill="none"/><path d="M52 50 h8 v-8" stroke="#b3261e" stroke-width="4" fill="none"/></svg>`,
    virus: `<svg viewBox="0 0 64 64">${[...Array(8)].map((_, i) => { const a = (i * Math.PI) / 4; return `<line x1="32" y1="32" x2="${32 + Math.cos(a) * 27}" y2="${32 + Math.sin(a) * 27}" stroke="#0b7a55" stroke-width="3"/><circle cx="${32 + Math.cos(a) * 27}" cy="${32 + Math.sin(a) * 27}" r="4" fill="#0b7a55"/>`; }).join('')}<circle cx="32" cy="32" r="17" fill="#13a073"/><circle cx="27" cy="28" r="3.5" fill="#0b7a55"/><circle cx="37" cy="37" r="3" fill="#0b7a55"/></svg>`,
    measles: `<svg viewBox="0 0 64 64"><circle cx="30" cy="32" r="22" fill="#f3c9a5"/><circle cx="23" cy="28" r="2.4" fill="#1d1f24"/><circle cx="37" cy="28" r="2.4" fill="#1d1f24"/><path d="M23 41 q7 -5 14 0" stroke="#1d1f24" stroke-width="2.4" fill="none"/>${[[16, 20], [44, 21], [18, 38], [42, 40], [30, 18], [33, 47], [12, 30], [48, 31]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.3" fill="#d9363e"/>`).join('')}<path d="M50 10 l10 -6" stroke="#555" stroke-width="3"/></svg>`,
    resign: `<svg viewBox="0 0 64 64"><rect x="6" y="6" width="28" height="52" fill="#c48a4a" stroke="#6b4a2b" stroke-width="2"/><circle cx="28" cy="34" r="2.2" fill="#6b4a2b"/><path d="M38 32 H60 M52 24 L60 32 L52 40" stroke="#6a3d9a" stroke-width="4" fill="none"/></svg>`,
    rwanda: `<svg viewBox="0 0 64 64"><path d="M6 46 H30 V30 L18 20 L6 30 Z" fill="#8a5a2b"/><rect x="14" y="36" width="8" height="10" fill="#f4efe4"/><path d="M34 22 L60 16 L56 20 L62 24 L54 24 L44 32 L42 30 L48 24 L38 26 Z" fill="#1d5fa8"/><path d="M30 40 q12 -2 22 -14" stroke="#1d5fa8" stroke-width="2" stroke-dasharray="3 3" fill="none"/></svg>`,
    climate: `<svg viewBox="0 0 64 64"><circle cx="40" cy="36" r="20" fill="#5b8fb4"/><path d="M28 26 q8 -6 14 2 q-2 8 6 10 q-4 10 -14 6 q-8 -6 -6 -18 Z" fill="#2e7d32"/><rect x="8" y="6" width="10" height="40" rx="5" fill="#fff" stroke="#555" stroke-width="2"/><rect x="11" y="16" width="4" height="30" fill="#d9363e"/><circle cx="13" cy="50" r="8" fill="#d9363e" stroke="#555" stroke-width="2"/></svg>`,
    jets: `<svg viewBox="0 0 64 64"><rect x="2" y="4" width="26" height="18" fill="#fff" stroke="#bbb"/><circle cx="15" cy="13" r="5.5" fill="#bc002d"/>${[[34, 30], [14, 46]].map(([x, y]) => `<path transform="translate(${x} ${y})" d="M0 0 L28 0 L22 -3 L14 -3 L10 -12 L6 -12 L8 -3 L2 -3 L0 -7 L-3 -7 L-2 0 Z M10 0 L6 9 L10 9 L16 0 Z" fill="#4a505c"/>`).join('')}</svg>`,
    parliament: `<svg viewBox="0 0 64 64">${[...Array(4)].map((_, row) => [...Array(7 + row * 2)].map((__, i, arr) => { const a = Math.PI - (Math.PI * (i + 0.5)) / arr.length, r = 12 + row * 7; return `<circle cx="${32 + Math.cos(a) * r}" cy="${50 - Math.sin(a) * r}" r="2.6" fill="${i < arr.length * 0.56 ? '#c8102e' : '#0c4076'}"/>`; }).join('')).join('')}<rect x="10" y="52" width="44" height="3" fill="#555"/></svg>`,
    probe: `<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="#0e1430"/>${[[8, 10], [52, 14], [44, 50], [12, 52], [30, 6], [58, 36]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#fff"/>`).join('')}<path d="M18 40 a14 14 0 0 1 22 -18 Z" fill="#e9e3d8"/><rect x="34" y="30" width="10" height="8" fill="#c9a227"/><line x1="44" y1="34" x2="58" y2="34" stroke="#e9e3d8" stroke-width="2"/></svg>`,
    offair: `<svg viewBox="0 0 64 64"><rect x="4" y="14" width="56" height="38" rx="4" fill="#2b2e36"/><rect x="9" y="19" width="46" height="28" fill="#c9ccd3"/><text x="32" y="38" text-anchor="middle" font-family="Segoe UI, Arial" font-size="11" font-weight="900" fill="#b3261e">OFF AIR</text><path d="M24 4 L32 14 L40 4" stroke="#2b2e36" stroke-width="2.5" fill="none"/></svg>`,
    rocket: `<svg viewBox="0 0 64 64"><path d="M22 48 L22 20 Q28 6 34 20 L34 48 Z" fill="#e9e3d8" stroke="#555" stroke-width="2"/><path d="M22 40 l-8 10 h8 Z M34 40 l8 10 h-8 Z" fill="#555"/>${boom(44, 22, 13)}<path d="M50 40 l6 8 M44 44 l2 10" stroke="#555" stroke-width="2.5"/></svg>`,
    bank: `<svg viewBox="0 0 64 64"><path d="M6 22 L32 8 L58 22 Z" fill="#555"/>${[12, 24, 36, 48].map(x => `<rect x="${x}" y="25" width="5" height="22" fill="#555"/>`).join('')}<rect x="6" y="48" width="52" height="6" fill="#555"/><circle cx="50" cy="48" r="10" fill="#b3261e"/><path d="M45 48 h10" stroke="#fff" stroke-width="3"/></svg>`,
    strike: `<svg viewBox="0 0 64 64"><rect x="6" y="8" width="34" height="20" fill="#fff" stroke="#1d5fa8" stroke-width="2.5"/><text x="23" y="22" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9" font-weight="900" fill="#1d5fa8">GRÈVE</text><rect x="21" y="28" width="3" height="14" fill="#555"/>${[[14, 44], [30, 46], [46, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#2b2e36"/><path d="M${x - 7} ${y + 16} q7 -14 14 0 Z" fill="#2b2e36"/>`).join('')}</svg>`,
    factory: `<svg viewBox="0 0 64 64"><path d="M4 56 V30 L18 22 V30 L32 22 V30 L46 22 V56 Z" fill="#555"/><rect x="48" y="12" width="8" height="44" fill="#555"/>${smoke(48, 12, 0.5)}<rect x="10" y="40" width="6" height="6" fill="#f4efe4"/><rect x="24" y="40" width="6" height="6" fill="#f4efe4"/><rect x="38" y="40" width="6" height="6" fill="#f4efe4"/></svg>`,
    cyclone: `<svg viewBox="0 0 64 64"><path d="M32 32 m-2 0 a2 2 0 1 1 4 0 a6 6 0 1 1 -12 0 a10 10 0 1 1 20 0 a14 14 0 1 1 -28 0 a18 18 0 1 1 36 0" stroke="#1d5fa8" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    gavel: `<svg viewBox="0 0 64 64"><rect x="18" y="10" width="26" height="12" rx="3" transform="rotate(-35 31 16)" fill="#8a5a2b"/><rect x="28" y="20" width="6" height="30" transform="rotate(-35 31 35)" fill="#6b4a2b"/><rect x="6" y="50" width="34" height="7" rx="2" fill="#6b4a2b"/></svg>`,
    crash: `<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="#e6ecf2"/><path d="M0 52 L20 36 L30 44 L44 28 L64 46 V64 H0 Z" fill="#fff" stroke="#bcc6d0"/><path transform="translate(12 18) rotate(28)" d="M0 6 L34 4 L40 6 L34 8 L0 8 Z M14 6 L22 -6 L26 -6 L22 6 Z" fill="#4a505c"/>${smoke(36, 34, 0.5)}</svg>`,
  },
};
