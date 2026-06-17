/* =========================================================================
   Mesh AI — Weave animation engine
   Builds an SVG woven orb whose strands are individually controllable,
   plus a tiny rAF Player and a library of "build" animations.
   Depends on marks.js (PERSONAS, MASTER_STOPS).
   ========================================================================= */

const NS = 'http://www.w3.org/2000/svg';
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut   = (t) => 1 - Math.pow(1 - t, 3);
const clamp01   = (t) => Math.max(0, Math.min(1, t));

/* Build an orb. Strands are interleaved across the six personas so the
   finished sphere is a true rainbow weave (every teammate, all over). */
function buildOrb(el, opts = {}) {
  const { size = 240, strands = 18, R = 96, sw = 2.4, resolve = false } = opts;
  const c = size / 2;
  const gid = 'g' + Math.floor(Math.random() * 1e6);

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.innerHTML = `<defs><linearGradient id="${gid}" x1="0" y1="0.1" x2="1" y2="0.9">
    ${MASTER_STOPS.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('')}
  </linearGradient></defs><g fill="none" stroke-width="${sw}" stroke-linecap="round"></g>`;
  const g = svg.querySelector('g');

  const S = [];
  for (let i = 0; i < strands; i++) {
    const e = document.createElementNS(NS, 'ellipse');
    const base = Math.PI * (i + 0.5) / strands;
    const pi = i % PERSONAS.length;
    e.setAttribute('cx', c); e.setAttribute('cy', c); e.setAttribute('ry', R);
    e.setAttribute('rx', Math.max(0.8, Math.abs(R * Math.cos(base))).toFixed(2));
    e.setAttribute('pathLength', '100');
    e.setAttribute('stroke', PERSONAS[pi].c);
    g.appendChild(e);
    S.push({ e, base, pi, color: PERSONAS[pi].c });
  }

  // optional gradient "resolve" layer (identical geometry, master-gradient
  // stroke) used to crossfade persona hues → final logo without a jerk.
  let SG = null;
  if (resolve) {
    const gg = document.createElementNS(NS, 'g');
    gg.setAttribute('fill', 'none');
    gg.setAttribute('stroke', `url(#${gid})`);
    gg.setAttribute('stroke-width', sw);
    gg.setAttribute('stroke-linecap', 'round');
    SG = S.map(s => {
      const e = document.createElementNS(NS, 'ellipse');
      e.setAttribute('cx', c); e.setAttribute('cy', c); e.setAttribute('ry', R);
      e.setAttribute('rx', s.e.getAttribute('rx'));
      e.setAttribute('pathLength', '100');
      e.setAttribute('opacity', '0');
      gg.appendChild(e);
      return e;
    });
    svg.appendChild(gg);
  }

  el.innerHTML = '';
  el.appendChild(svg);

  return {
    el, svg, g, gid, S, SG, R, c, strands,
    // order in which personas "arrive"
    order: PERSONAS.map((_, i) => i),
    rest() { setRest(this); },
  };
}

function depth(base) { return (0.5 + 0.5 * Math.abs(Math.cos(base))).toFixed(2); }

/* resting (final) state of the logo */
function setRest(o) {
  o.S.forEach(s => {
    s.e.setAttribute('rx', Math.max(0.8, Math.abs(o.R * Math.cos(s.base))).toFixed(2));
    s.e.setAttribute('stroke-dasharray', 'none');
    s.e.setAttribute('opacity', depth(s.base));
    s.e.setAttribute('stroke', s.color);
  });
}

function toGradient(o, on) {
  o.S.forEach(s => s.e.setAttribute('stroke', on ? `url(#${o.gid})` : s.color));
}

/* ---------- animation library ----------
   Each fn(o, p) sets state for global progress p ∈ [0,1]. ---------- */

// 2 · FAN — starts as ONE circle, then opens from the left & right edges
// inward and stops when the strands meet in the middle. Single colour.
function animFan(o, p) {
  const f = easeInOut(clamp01(p));
  const col = o.fanColor || '#2B5BE2';
  o.S.forEach(s => {
    const target = Math.abs(o.R * Math.cos(s.base));   // resting width (toward centre)
    const rx = o.R * (1 - f) + target * f;             // full circle → meet in middle
    s.e.setAttribute('transform', '');
    s.e.setAttribute('rx', Math.max(0.8, rx).toFixed(2));
    s.e.setAttribute('stroke', col);
    s.e.setAttribute('stroke-dasharray', 'none');
    s.e.setAttribute('opacity', (0.92 - 0.4 * f * (1 - Math.abs(Math.cos(s.base)))).toFixed(2));
  });
}

// A · THREADS ARRIVE — each teammate draws their strands on, in turn, then the
// weave gently crossfades from persona hues into the real logo gradient.
function animArrive(o, p) {
  const np = PERSONAS.length;
  const ap = clamp01(p / 0.6);                     // arrival finishes by 60%
  const rp = easeInOut(clamp01((p - 0.6) / 0.4));  // long, smooth crossfade
  o.S.forEach((s, i) => {
    const stage = o.order.indexOf(s.pi);
    const local = easeOut(clamp01((ap * np) - stage));
    const restRx = Math.max(0.8, Math.abs(o.R * Math.cos(s.base)));
    const off = (100 * (1 - local)).toFixed(1);
    const fade = o.SG ? (1 - rp) : 1;
    s.e.setAttribute('transform', '');
    s.e.setAttribute('rx', restRx.toFixed(2));
    s.e.setAttribute('stroke', s.color);
    s.e.setAttribute('stroke-dasharray', '100');
    s.e.setAttribute('stroke-dashoffset', off);
    s.e.setAttribute('opacity', local > 0 ? (depth(s.base) * fade).toFixed(2) : 0);
    if (o.SG) {
      const g = o.SG[i];
      g.setAttribute('rx', restRx.toFixed(2));
      g.setAttribute('stroke-dasharray', '100');
      g.setAttribute('stroke-dashoffset', off);
      g.setAttribute('opacity', local > 0 ? (depth(s.base) * rp).toFixed(2) : 0);
    }
  });
}

// B · FAN + IGNITE — fans open while each teammate's hue lights up in sequence.
function animFanIgnite(o, p) {
  toGradient(o, false);
  const f = easeInOut(clamp01(p));
  const np = PERSONAS.length;
  o.S.forEach(s => {
    const target = o.R * Math.cos(s.base);
    const rx = o.R * (1 - f) + target * f;
    s.e.setAttribute('rx', Math.max(0.8, Math.abs(rx)).toFixed(2));
    const stage = o.order.indexOf(s.pi);
    const local = easeOut(clamp01((p * (np + 1)) - stage));
    s.e.setAttribute('stroke-dasharray', '100');
    s.e.setAttribute('stroke-dashoffset', (100 * (1 - local)).toFixed(1));
    s.e.setAttribute('opacity', local > 0 ? depth(s.base) : 0);
  });
}

// C · SPIN UP — strands sweep in on a spin, draw on, then resolve to the
// master gradient as they settle.
function animSpinUp(o, p) {
  const spin = (1 - easeOut(clamp01(p))) * Math.PI * 2.2;  // extra rotation that decays
  o.S.forEach((s, i) => {
    const ang = s.base + spin;
    s.e.setAttribute('rx', Math.max(0.8, Math.abs(o.R * Math.cos(ang))).toFixed(2));
    const local = easeOut(clamp01(p * 1.6 - i / o.strands * 0.5));
    s.e.setAttribute('stroke-dasharray', '100');
    s.e.setAttribute('stroke-dashoffset', (100 * (1 - local)).toFixed(1));
    s.e.setAttribute('opacity', local > 0 ? depth(ang) : 0);
  });
  toGradient(o, p > 0.9);   // crossfade to the iridescent master at the end
}

// 2b · SIX-COLOUR FAN — same open-from-the-circle motion, every strand in its
// specialist's hue. Opens into the full six-colour weave.
function animFan6(o, p) {
  const f = easeInOut(clamp01(p));
  o.S.forEach(s => {
    const target = Math.abs(o.R * Math.cos(s.base));
    const rx = o.R * (1 - f) + target * f;
    s.e.setAttribute('transform', '');
    s.e.setAttribute('rx', Math.max(0.8, rx).toFixed(2));
    s.e.setAttribute('stroke', s.color);
    s.e.setAttribute('stroke-dasharray', 'none');
    s.e.setAttribute('opacity', (0.92 - 0.4 * f * (1 - Math.abs(Math.cos(s.base)))).toFixed(2));
  });
}

// 2c · BUILD & BLEND — blue fans in first; then each colour fades in one
// after another (smooth, staggered); finally the whole weave blends into the
// iridescent master gradient.
function animFanBuild(o, p) {
  const np = PERSONAS.length;
  const base = o.fanColor || '#2B5BE2';
  const f = easeInOut(clamp01(p / 0.38));            // blue fan opens over first 38%
  const cStart = 0.30, cEnd = 0.84;                  // colours fade in across here
  const w = (cEnd - cStart) / np;                    // one slot per persona
  const rp = easeInOut(clamp01((p - 0.82) / 0.18));  // blend to gradient at the very end
  o.S.forEach((s, i) => {
    const target = Math.abs(o.R * Math.cos(s.base));
    const rx = Math.max(0.8, o.R * (1 - f) + target * f).toFixed(2);
    const stage = o.order.indexOf(s.pi);
    const t = easeInOut(clamp01((p - (cStart + stage * w)) / w)); // this colour's fade
    s.e.setAttribute('transform', '');
    s.e.setAttribute('rx', rx);
    s.e.setAttribute('stroke-dasharray', 'none');
    s.e.setAttribute('stroke', mixColor(base, s.color, t));       // base → persona hue
    s.e.setAttribute('opacity', (depth(s.base) * (o.SG ? (1 - rp) : 1)).toFixed(2));
    if (o.SG) {
      const g = o.SG[i];
      g.setAttribute('rx', rx);
      g.setAttribute('stroke-dasharray', 'none');
      g.setAttribute('opacity', (depth(s.base) * rp).toFixed(2));
    }
  });
}

/* ---------- player ---------- */
function Player(o, fn, opts = {}) {
  const { dur = 2600, hold = 900, loop = true } = opts;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = null, t0 = null;
  function frame(ts) {
    if (t0 === null) t0 = ts;
    const e = ts - t0;
    const p = clamp01(e / dur);
    fn(o, p);
    if (e < dur) { raf = requestAnimationFrame(frame); }
    else if (loop) { setTimeout(() => { t0 = null; raf = requestAnimationFrame(frame); }, hold); }
    else { o.rest(); }
  }
  const api = {
    play() { cancelAnimationFrame(raf); t0 = null; if (reduce) { fn(o, 1); } else raf = requestAnimationFrame(frame); },
    stop() { cancelAnimationFrame(raf); },
  };
  return api;
}

Object.assign(window, {
  buildOrb, Player, setRest,
  animFan, animArrive, animFanIgnite, animSpinUp, animFan6, animFanBuild,
});
