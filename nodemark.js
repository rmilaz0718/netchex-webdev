/* =========================================================================
   Mesh AI — Node-graph mark (modern evolution of the original dots+lines).
   Self-contained: own palette + colour helpers + SVG generators.
   - masterNode()  : the full 6-colour connected cluster (the logo)
   - agentNode()   : one specialist's node motif, in their single colour
   ========================================================================= */

/* ---- modern palette · one hue per specialist ---- */
const NODE_PERSONAS = [
  { key: 'penny',    name: 'Penny',    role: 'Payroll & Time',       c: '#4C5FE8' }, // indigo
  { key: 'atlas',    name: 'Atlas',    role: 'People Ops',           c: '#8A5CF6' }, // violet
  { key: 'sentinel', name: 'Sentinel', role: 'Anomaly Watch',        c: '#FB5B79' }, // rose
  { key: 'sage',     name: 'Sage',     role: 'HR Knowledge',         c: '#F7A823' }, // amber
  { key: 'milo',     name: 'Milo',     role: 'Employee Concierge',   c: '#19BE74' }, // emerald
  { key: 'nova',     name: 'Nova',     role: 'Insights',             c: '#15B8C6' }, // cyan
];

/* ---- colour helpers ---- */
function _hx(n){return Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0');}
function _p(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function _mix(a,b,t){const A=_p(a),B=_p(b);return '#'+A.map((v,i)=>_hx(v+(B[i]-v)*t)).join('');}
const nLighten=(c,t)=>_mix(c,'#ffffff',t);
const nDeepen =(c,t)=>_mix(c,'#0B1030',t);

let _nid = 0;
const nid = () => 'n' + (++_nid);

const NSVG = 'http://www.w3.org/2000/svg';
const RAD = (d) => (d - 90) * Math.PI / 180;

/* one "connection unit": a line + a big node + a small node, all one colour.
   cx,cy = unit centre · ua = orientation(°) · L = length · big/small radii   */
function unit(cx, cy, ua, L, color, opts = {}) {
  const { big = 7.2, small = 4.4, sw = 3.6, swap = false, id } = opts;
  const a = RAD(ua + 90);
  const dx = Math.cos(a) * L / 2, dy = Math.sin(a) * L / 2;
  const p1 = [cx - dx, cy - dy], p2 = [cx + dx, cy + dy];
  const [rB, rS] = swap ? [small, big] : [big, small];
  const cap = nDeepen(color, 0.06);
  const hi = nLighten(color, 0.34);
  return `
    <line x1="${p1[0].toFixed(2)}" y1="${p1[1].toFixed(2)}" x2="${p2[0].toFixed(2)}" y2="${p2[1].toFixed(2)}"
      stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>
    <circle cx="${p1[0].toFixed(2)}" cy="${p1[1].toFixed(2)}" r="${rB}" fill="${color}"/>
    <circle cx="${(p1[0]-rB*0.32).toFixed(2)}" cy="${(p1[1]-rB*0.32).toFixed(2)}" r="${(rB*0.34).toFixed(2)}" fill="${hi}" opacity="0.7"/>
    <circle cx="${p2[0].toFixed(2)}" cy="${p2[1].toFixed(2)}" r="${rS}" fill="${color}"/>`;
}

/* ---- the master mark: 6 colour units in a balanced, lively cluster ---- */
function masterNode(opts = {}) {
  const { size = 120, mono = null, scale = 1 } = opts;
  const c = size / 2;
  const Rp = size * 0.19 * scale;      // placement radius of unit centres
  const L  = size * 0.315 * scale;     // unit length
  const big = size * 0.060, small = size * 0.037, sw = size * 0.030;
  // organic jitter so it breathes like the original, not a sterile spinner
  const jPos = [0, -7, 5, 0, 7, -5];
  const jLen = [0, 0.08, -0.05, 0.06, -0.08, 0.04];
  let body = '';
  NODE_PERSONAS.forEach((p, i) => {
    const pa = i * 60 + jPos[i];                 // where the unit sits
    const cx = c + Rp * Math.cos(RAD(pa));
    const cy = c + Rp * Math.sin(RAD(pa));
    const ua = pa + 64;                           // tangential lean → pinwheel energy
    body += unit(cx, cy, ua, L * (1 + jLen[i]), mono || p.c, {
      big, small, sw, swap: i % 2 === 1,
    });
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" xmlns="${NSVG}" style="overflow:visible;">${body}</svg>`;
}

/* ---- a single specialist's mark: a 3-node fragment in their colour ---- */
function agentNode(opts = {}) {
  const { color, size = 120, sw = null } = opts;
  const c = size / 2, s = size / 100;
  const strokeW = sw || size * 0.052;
  const hi = nLighten(color, 0.32);
  const N = (x, y, r, fill) =>
    `<circle cx="${(x*s).toFixed(2)}" cy="${(y*s).toFixed(2)}" r="${(r*s).toFixed(2)}" fill="${fill}"/>`;
  const E = (a, b) =>
    `<line x1="${(a[0]*s).toFixed(2)}" y1="${(a[1]*s).toFixed(2)}" x2="${(b[0]*s).toFixed(2)}" y2="${(b[1]*s).toFixed(2)}" stroke="${color}" stroke-width="${strokeW.toFixed(2)}" stroke-linecap="round"/>`;
  // a flowing diagonal path: big → mid → small  (a node-graph fragment)
  const A = [34, 34], B = [56, 54], C = [76, 72];
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" xmlns="${NSVG}" style="overflow:visible;">
    ${E(A, B)}${E(B, C)}
    ${N(A[0], A[1], 8.0, color)}
    ${N(A[0]-2.6, A[1]-2.6, 2.7, hi)}
    ${N(B[0], B[1], 5.6, color)}
    ${N(C[0], C[1], 4.4, color)}
  </svg>`;
}

Object.assign(window, { NODE_PERSONAS, masterNode, agentNode, nodeLighten: nLighten });
