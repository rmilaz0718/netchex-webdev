/* ===================================================================
   mesh-mark.js — mesh.ai mark system + agent roster.  No dependencies.

   Geometry: hexagonal ring (6 outer nodes) + alternating spokes to a
   central hub. The 6 outer nodes are the six specialist agents; the
   3 spokes that "stick" in the resting mark are nodes 0, 2, 4.

   Exposes window.MeshMark = {
     staticMark(opts), buildLive(container, opts),
     AGENTS, PTS, REST_SPOKES, R, NR, SW, cx, cy
   }
   =================================================================== */
(function () {
  const cx = 50, cy = 50, R = 34;
  const PTS = [0, 60, 120, 180, 240, 300].map(d => {
    const r = d * Math.PI / 180;
    return [+(cx + R * Math.cos(r)).toFixed(3), +(cy + R * Math.sin(r)).toFixed(3)];
  });
  const REST_SPOKES = [0, 2, 4];                 // spokes shown in the resting mark
  const SW = { spoke: 5.2, ring: 4.8, stub: 2.0 };
  const NR = { hub: 9.0, outer: 7.0 };
  const sL = R * 0.25;                            // extension-stub length
  const f  = n => (+n).toFixed(2);

  /* Six agents, ordered to map onto outer nodes 0..5 (around the ring).
     Colours alternate cool / warm so neighbours always contrast. */
  const AGENTS = [
    { key: 'penny',    name: 'Penny',    role: 'Payroll & Time',       color: '#5468EE' }, // indigo  · node 0
    { key: 'riley',    name: 'Riley',    role: 'Recruit & Hire',        color: '#E8973A' }, // amber   · node 1
    { key: 'milo',     name: 'Milo',     role: 'Employee Concierge',   color: '#20A877' }, // emerald · node 2
    { key: 'sentinel', name: 'Sentinel', role: 'Anomaly Watch',        color: '#E85370' }, // rose    · node 3
    { key: 'nova',     name: 'Nova',     role: 'Insights',             color: '#22A8C4' }, // cyan    · node 4
    { key: 'atlas',    name: 'Atlas',    role: 'People Ops',           color: '#8E5BF0' }, // violet  · node 5
  ];

  /* ---- Static mark (string) ----------------------------------------
     opts:
       hub    : hub colour (default brand blue)
       mono   : string colour => entire mark drawn in that one colour
       stubs  : show extension stubs (default true)
       spokes : array of spoke indices to draw (default REST_SPOKES)
     Sized by its container; uses currentColor when not mono. */
  function markShapes(o) {
    o = o || {};
    const stubs    = o.stubs !== false;
    const spokeSet = o.spokes || REST_SPOKES;
    const ink      = o.mono || o.ink || 'currentColor';
    const hc       = o.mono ? o.mono : (o.hub || '#3860EE');
    let s = '';

    if (stubs) PTS.forEach(([nx, ny]) => {
      const dx = (nx - cx) / R, dy = (ny - cy) / R;
      s += `<line x1="${nx}" y1="${ny}" x2="${f(nx + dx * sL)}" y2="${f(ny + dy * sL)}"
        stroke="${ink}" stroke-width="${SW.stub}" stroke-opacity="0.16" stroke-linecap="round"/>`;
    });
    PTS.forEach(([nx, ny], i) => {
      const [mx, my] = PTS[(i + 1) % 6];
      s += `<line x1="${nx}" y1="${ny}" x2="${mx}" y2="${my}"
        stroke="${ink}" stroke-width="${SW.ring}" stroke-opacity="0.9" stroke-linecap="round"/>` ;
    });
    spokeSet.forEach(i => {
      const [nx, ny] = PTS[i];
      s += `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}"
        stroke="${ink}" stroke-width="${SW.spoke}" stroke-linecap="round"/>`;
    });
    PTS.forEach(([nx, ny]) => {
      s += `<circle cx="${nx}" cy="${ny}" r="${NR.outer}" fill="${ink}"/>`;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="${NR.hub}" fill="${hc}"/>`;
    return s;
  }

  function staticMark(o) {
    o = o || {};
    const dim = String(o.px || '100%');
    return `<svg viewBox="0 0 100 100" width="${dim}" height="${dim}"
      xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible;">${markShapes(o)}</svg>`;
  }

  /* ---- Live mark (animatable DOM) ----------------------------------
     Builds the SVG into `container` and returns handles for the
     communication animation. All six spokes exist but start hidden
     (dash-offset = full length, opacity 0). Ring + stubs are static. */
  function buildLive(container, o) {
    o = o || {};
    const hub = o.hub || '#3860EE';
    const ink = o.ink || '#fff';
    let s = '';

    PTS.forEach(([nx, ny]) => {
      const dx = (nx - cx) / R, dy = (ny - cy) / R;
      s += `<line x1="${nx}" y1="${ny}" x2="${f(nx + dx * sL)}" y2="${f(ny + dy * sL)}"
        stroke="${ink}" stroke-width="${SW.stub}" stroke-opacity="0.16" stroke-linecap="round"/>`;
    });
    PTS.forEach(([nx, ny], i) => {
      const [mx, my] = PTS[(i + 1) % 6];
      s += `<line x1="${nx}" y1="${ny}" x2="${mx}" y2="${my}"
        stroke="${ink}" stroke-opacity="0.90" stroke-width="${SW.ring}" stroke-linecap="round"/>`;
    });
    // spokes — drawn from the OUTER node toward the centre
    PTS.forEach(([nx, ny], i) => {
      s += `<line class="mk-spoke" data-i="${i}" x1="${nx}" y1="${ny}" x2="${cx}" y2="${cy}"
        stroke="${ink}" stroke-width="${SW.spoke}" stroke-linecap="round"
        stroke-dasharray="${R}" stroke-dashoffset="${R}"/>`;
    });
    PTS.forEach(([nx, ny], i) => {
      s += `<circle class="mk-dot" data-i="${i}" cx="${nx}" cy="${ny}" r="${NR.outer}" fill="${ink}"/>`;
    });
    s += `<circle class="mk-hub" cx="${cx}" cy="${cy}" r="${NR.hub}" fill="${hub}"/>`;

    container.innerHTML = `<svg viewBox="0 0 100 100" width="100%" height="100%"
      xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible;">${s}</svg>`;

    const svg = container.querySelector('svg');
    return {
      svg,
      spokes: [...svg.querySelectorAll('.mk-spoke')],
      dots:   [...svg.querySelectorAll('.mk-dot')],
      hub:    svg.querySelector('.mk-hub'),
    };
  }

  window.MeshMark = { staticMark, markShapes, inner: markShapes, buildLive, AGENTS, PTS, REST_SPOKES, R, NR, SW, cx, cy };
})();
