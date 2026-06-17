/* =========================================================================
   Mesh AI — Persona marks: human photos brought into the weave world.
   Portrait = a circular CSS-background div; weave = an SVG overlay in the
   persona's hue. Layering differs per mode. Modes: 'core' | 'veil' | 'ring'.
   Depends on marks.js (PERSONAS, lightenColor, mixColor).
   ========================================================================= */

const PMNS = 'http://www.w3.org/2000/svg';
let _pmid = 0;
const pmid = () => 'pm' + (++_pmid);

const PHOTO = {
  penny: 'assets/personas/Penny.png',
  atlas: 'assets/personas/Atlas.png',
  nova: 'assets/personas/Nova.png',
  sentinel: 'assets/personas/Sentinel.png',
  milo: 'assets/personas/Milo.png',
  sage: 'assets/personas/Sage.png',
};

function personaMark(opts = {}) {
  const { photo, color, mode = 'core', size = 240, strands = 18, sw = 2.6, faceY = '30%' } = opts;
  const c = size / 2;
  const R = size * 0.46;
  const id = pmid();
  const light = lightenColor(color, 0.42);
  const deep = mixColor(color, '#0E1430', 0.22);
  const grad = `<linearGradient id="${id}g" x1="0" y1="0.08" x2="1" y2="0.92">
      <stop offset="0" stop-color="${light}"/><stop offset="0.5" stop-color="${color}"/><stop offset="1" stop-color="${deep}"/></linearGradient>`;

  // great-circle weave strands
  const strandG = (stroke, op, maskAttr, swv) => {
    let s = '';
    for (let i = 0; i < strands; i++) {
      const th = Math.PI * (i + 0.5) / strands;
      const rx = Math.max(0.8, Math.abs(R * Math.cos(th)));
      const d = 0.55 + 0.45 * Math.abs(Math.cos(th));
      s += `<ellipse cx="${c}" cy="${c}" rx="${rx.toFixed(2)}" ry="${R.toFixed(1)}" opacity="${(op * d).toFixed(2)}"/>`;
    }
    return `<g fill="none" stroke="${stroke}" stroke-width="${swv || sw}" stroke-linecap="round" ${maskAttr || ''}>${s}</g>`;
  };

  const svg = (z, inner) => `<svg viewBox="0 0 ${size} ${size}" xmlns="${PMNS}" style="position:absolute;inset:0;width:100%;height:100%;z-index:${z};overflow:visible;">${inner}</svg>`;
  const portrait = (pct, z, extra) =>
    `<div style="position:absolute;left:50%;top:50%;width:${pct.toFixed(1)}%;height:${pct.toFixed(1)}%;transform:translate(-50%,-50%);border-radius:50%;background-image:url('${photo}');background-size:cover;background-position:center ${faceY};background-repeat:no-repeat;z-index:${z};${extra || ''}"></div>`;
  const ringPct = (rp) => 2 * rp / size * 100;

  let layers = [];

  if (mode === 'core') {
    const rp = R * 0.52;
    layers = [
      svg(1, `<defs>${grad}</defs>${strandG(`url(#${id}g)`, 1)}`),
      portrait(ringPct(rp), 2, 'border:2px solid rgba(255,255,255,0.55);box-sizing:border-box;box-shadow:0 6px 18px rgba(0,0,0,0.35);'),
    ];
  } else if (mode === 'veil') {
    const rp = R;
    const vg = `<radialGradient id="${id}v"><stop offset="0.35" stop-color="#0A1030" stop-opacity="0"/><stop offset="1" stop-color="#0A1030" stop-opacity="0.62"/></radialGradient>`;
    layers = [
      portrait(ringPct(rp), 1, ''),
      svg(2, `<defs>${grad}${vg}</defs>
        <circle cx="${c}" cy="${c}" r="${rp.toFixed(1)}" fill="url(#${id}v)"/>
        ${strandG(light, 0.92, '', sw * 1.05)}
        <circle cx="${c}" cy="${c}" r="${rp.toFixed(1)}" fill="none" stroke="${light}" stroke-opacity="0.5" stroke-width="1.6"/>`),
    ];
  } else if (mode === 'front') {
    // person in the FOREGROUND, the woven orb behind them as a backdrop halo
    const rp = R * 0.70;
    layers = [
      svg(1, `<defs>${grad}</defs>${strandG(`url(#${id}g)`, 0.92)}`),
      portrait(ringPct(rp), 2, 'border:2.5px solid rgba(255,255,255,0.65);box-sizing:border-box;box-shadow:0 12px 34px rgba(0,0,0,0.5);'),
    ];
  } else { // ring
    const rp = R * 0.66;
    const inner = rp + sw * 1.9;
    const mask = `<mask id="${id}m"><rect x="0" y="0" width="${size}" height="${size}" fill="#fff"/><circle cx="${c}" cy="${c}" r="${inner.toFixed(1)}" fill="#000"/></mask>`;
    layers = [
      portrait(ringPct(rp), 1, 'border:2px solid rgba(255,255,255,0.6);box-sizing:border-box;box-shadow:0 6px 18px rgba(0,0,0,0.35);'),
      svg(2, `<defs>${grad}${mask}</defs>${strandG(`url(#${id}g)`, 1, `mask="url(#${id}m)"`)}`),
    ];
  }

  return `<div style="position:relative;width:100%;height:100%;">${layers.join('')}</div>`;
}

window.personaMark = personaMark;
window.PHOTO = PHOTO;
