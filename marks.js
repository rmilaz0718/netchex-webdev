/* =========================================================================
   Mesh AI — Living mark system  (Round 2)
   Three constructions, one logic: lines woven into living form.
   Vanilla JS generators + a single rAF animator. No deps.
   ========================================================================= */

/* The six specialists — each gets a hue. Woven together = "one mesh". */
const PERSONAS = [
  { key: 'sage',     name: 'Sage',     role: 'HR Knowledge',     c: '#F2A900' },
  { key: 'sentinel', name: 'Sentinel', role: 'Anomaly Watch',    c: '#F2644C' },
  { key: 'atlas',    name: 'Atlas',    role: 'People Ops',       c: '#6A5BF0' },
  { key: 'penny',    name: 'Penny',    role: 'Payroll & Time',   c: '#2B5BE2' },
  { key: 'nova',     name: 'Nova',     role: 'Insights',         c: '#16AEE0' },
  { key: 'milo',     name: 'Milo',     role: 'Employee Concierge', c: '#5FBE43' },
];

const INK = '#0E1430';

/* ---- color helpers ---- */
function hx(n) { return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0'); }
function parse(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
function mix(a, b, t) { const A = parse(a), B = parse(b); return '#' + A.map((v, i) => hx(v + (B[i] - v) * t)).join(''); }
const lighten = (c, t) => mix(c, '#ffffff', t);

let _uid = 0;
const uid = (p) => `${p}${(++_uid).toString(36)}`;

/* =========================================================================
   1 · WOVEN ORB — great circles rotated about the vertical axis, projected.
   rx = R·cos θ ; ry = R.  Animating θ spins the woven sphere.
   ========================================================================= */
const _orbs = [];

function mountOrb(el, opts = {}) {
  const { size = 200, strands = 18, R = 80, sw = 1.8, stops, mono, speed = 0.0028, phase = 0, core = null } = opts;
  const c = size / 2;
  const gid = uid('orb');

  // gradient stops: either a custom iridescent list or a mono persona ramp
  let gstops;
  if (mono) gstops = [[0, lighten(mono, 0.45)], [0.5, mono], [1, mix(mono, INK, 0.25)]];
  else gstops = stops;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.innerHTML = `
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0.1" x2="1" y2="0.9">
        ${gstops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('')}
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#${gid})" stroke-width="${sw}" stroke-linecap="round"></g>`;
  const g = svg.querySelector('g');

  const els = [];
  const bases = [];
  for (let i = 0; i < strands; i++) {
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    e.setAttribute('cx', c); e.setAttribute('cy', c); e.setAttribute('ry', R);
    g.appendChild(e);
    els.push(e);
    bases.push(Math.PI * (i + 0.5) / strands);
  }
  el.innerHTML = '';
  el.appendChild(svg);

  // optional human "core" — drawn in the SAME line language as the weave,
  // never a solid object dropped on top. Styles: 'glow' | 'void' | 'nucleus' | 'pulse'.
  if (core) {
    const cs = typeof core === 'string' ? { style: core } : (core || {});
    const style = cs.style || 'glow';
    const cr = (cs.r || 0.3) * R;
    const warm = cs.warm || '#FFCF9A';
    const warmHi = cs.warmHi || '#FFF1DD';
    const defs = svg.querySelector('defs');
    const mk = (tag, attrs, behind) => {
      const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      if (behind) svg.insertBefore(n, g); else svg.appendChild(n);
      return n;
    };

    if (style === 'void' || style === 'pulse') {
      // the weave parts around a clean centre — the human's space — marked by
      // a single fine warm ring in the same stroke language.
      const mid = gid + 'm';
      defs.innerHTML += `<mask id="${mid}"><rect x="0" y="0" width="${size}" height="${size}" fill="#fff"/><circle cx="${c}" cy="${c}" r="${cr.toFixed(1)}" fill="#000"/></mask>`;
      g.setAttribute('mask', `url(#${mid})`);
      defs.innerHTML += `<radialGradient id="${gid}w"><stop offset="0" stop-color="${warmHi}" stop-opacity="0.6"/><stop offset="1" stop-color="${warm}" stop-opacity="0"/></radialGradient>`;
      mk('circle', { cx: c, cy: c, r: (cr * 0.96).toFixed(1), fill: `url(#${gid}w)` });
      mk('circle', { cx: c, cy: c, r: cr.toFixed(1), fill: 'none', stroke: warm, 'stroke-width': (sw * 0.95).toFixed(2), 'stroke-opacity': 0.92 });
      if (style === 'pulse') mk('circle', { cx: c, cy: c, r: (cr * 0.6).toFixed(1), fill: 'none', stroke: warm, 'stroke-width': (sw * 0.7).toFixed(2), 'stroke-opacity': 0.42 });
    } else if (style === 'nucleus') {
      // a tiny woven heart of the same lines, warm
      defs.innerHTML += `<linearGradient id="${gid}n" x1="0" y1="0.1" x2="1" y2="0.9"><stop offset="0" stop-color="${warmHi}"/><stop offset="1" stop-color="${warm}"/></linearGradient>`;
      const ng = mk('g', { fill: 'none', stroke: `url(#${gid}n)`, 'stroke-width': (sw * 0.8).toFixed(2), 'stroke-linecap': 'round' });
      const m = 7;
      for (let k = 0; k < m; k++) {
        const th = Math.PI * (k + 0.5) / m;
        const e = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        e.setAttribute('cx', c); e.setAttribute('cy', c); e.setAttribute('ry', cr.toFixed(1));
        e.setAttribute('rx', Math.max(0.6, Math.abs(cr * Math.cos(th))).toFixed(2));
        ng.appendChild(e);
      }
    } else { // 'glow' — warm backlight behind the weave; the lines pass over it
      defs.innerHTML += `<radialGradient id="${gid}w"><stop offset="0" stop-color="${warmHi}" stop-opacity="0.95"/><stop offset="0.45" stop-color="${warm}" stop-opacity="0.5"/><stop offset="1" stop-color="${warm}" stop-opacity="0"/></radialGradient>`;
      mk('circle', { cx: c, cy: c, r: (cr * 1.7).toFixed(1), fill: `url(#${gid}w)` }, true);
    }
  }

  const orb = { els, bases, R, speed, phase, c };
  function frame(t) {
    for (let i = 0; i < els.length; i++) {
      const rx = Math.abs(orb.R * Math.cos(bases[i] + t));
      els[i].setAttribute('rx', Math.max(0.8, rx).toFixed(2));
      // depth shimmer: strands sweeping the front read brighter
      const d = Math.cos(bases[i] + t);
      els[i].setAttribute('opacity', (0.55 + 0.45 * Math.abs(d)).toFixed(2));
    }
  }
  orb.frame = frame;
  frame(phase);
  _orbs.push(orb);
  return orb;
}

/* =========================================================================
   2 · MESH BLOOM — six woven blades pinwheeling from a core.
   One blade per persona → the whole bloom IS the mesh of six.
   ========================================================================= */
function bloomMarkup(opts = {}) {
  const { size = 200, mono, twist = 0, core = true } = opts;
  const c = size / 2;
  // asymmetric blade (a comma/leaf) so the bloom reads as spinning
  const blade = 'M0,-18 C 24,-46 20,-92 3,-104 C -12,-90 -16,-46 0,-18 Z';
  let defs = '';
  let body = '';
  PERSONAS.forEach((p, i) => {
    const col = mono || p.c;
    const gid = uid('bl');
    defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${lighten(col, 0.42)}"/>
        <stop offset="1" stop-color="${mix(col, INK, 0.18)}"/>
      </linearGradient>`;
    const rot = i * 60 + twist;
    body += `<g transform="translate(${c},${c}) rotate(${rot})"><path d="${blade}" fill="url(#${gid})"/></g>`;
  });
  const hub = core
    ? `<circle cx="${c}" cy="${c}" r="13" fill="#fff"/><circle cx="${c}" cy="${c}" r="6.5" fill="${mono || INK}"/>`
    : '';
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%"><defs>${defs}</defs>${body}${hub}</svg>`;
}

/* =========================================================================
   3 · STRIPE SPHERE — a sphere drawn purely as woven bands.
   Six treatments = a texture-based variation axis (works in pure mono).
   ========================================================================= */
function stripeMarkup(opts = {}) {
  const { size = 200, R = 84, rows = 13, mode = 'h-even', color = INK } = opts;
  const c = size / 2;
  const cid = uid('clip');
  const rot = mode.startsWith('diag') ? 45 : 0;
  const fine = mode.endsWith('fine');
  const graded = mode.endsWith('graded');
  const N = fine ? Math.round(rows * 1.7) : rows;
  const step = (2 * R) / N;

  let bars = '';
  for (let k = 0; k < N; k++) {
    const y = c - R + step * (k + 0.5);
    const dy = y - c;
    if (Math.abs(dy) >= R) continue;
    const half = Math.sqrt(R * R - dy * dy);
    let th = fine ? step * 0.42 : step * 0.56;
    if (graded) th *= 0.45 + 0.85 * Math.cos((dy / R) * 1.35); // fat at the equator
    th = Math.max(1.4, th);
    bars += `<rect x="${(c - half).toFixed(1)}" y="${(y - th / 2).toFixed(1)}" width="${(2 * half).toFixed(1)}" height="${th.toFixed(1)}" rx="${(th / 2).toFixed(1)}" fill="${color}"/>`;
  }
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%">
      <clipPath id="${cid}"><circle cx="${c}" cy="${c}" r="${R}"/></clipPath>
      <g clip-path="url(#${cid})" transform="rotate(${rot} ${c} ${c})">${bars}</g>
    </svg>`;
}

/* ---- orbs render static (no motion). The initial frame draws a fully
   woven sphere; we simply don't start an animation loop. ---- */

/* iridescent master = the six personas swept into one ribbon of light */
const MASTER_STOPS = [
  [0, '#F2A900'], [0.2, '#F2644C'], [0.42, '#6A5BF0'],
  [0.62, '#2B5BE2'], [0.82, '#16AEE0'], [1, '#5FBE43'],
];

Object.assign(window, {
  PERSONAS, INK, MASTER_STOPS, mountOrb, bloomMarkup, stripeMarkup, mixColor: mix, lightenColor: lighten,
});
