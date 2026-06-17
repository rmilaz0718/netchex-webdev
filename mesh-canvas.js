/* ===================================================================
   mesh-canvas.js — deterministic canvas renderer + scene for the mesh
   communication animation, used by the video (.webm) export so the
   recording is crisp and repeatable (independent of DOM/SVG timing).

   window.MeshCanvas = {
     makeScene(opts) -> { sample(t) -> frame, duration },
     drawMark(ctx, cxp, cyp, sizePx, frame)
   }

   A frame = { spokes:[{a,b,vis,color}], dots:[{color,op}],
               hubR, hub, ink, shiftP, wmP }
   a,b are fractions along dot(0) -> hub(1); the visible sub-segment.
   shiftP/wmP drive the centre->left mark slide + wordmark reveal.
   Depends on window.MeshMark.
   =================================================================== */
window.MeshCanvas = (function () {
  const ease = t => { t = Math.max(0, Math.min(1, t)); return -(Math.cos(Math.PI * t) - 1) / 2; };

  function makeScene(opts) {
    opts = opts || {};
    const M = window.MeshMark, A = M.AGENTS, REST = M.REST_SPOKES;
    const mono = opts.mono || null;
    const ink  = opts.ink || '#fff';
    const hub  = opts.hub || '#3860EE';
    const idleDim   = mono ? 0.34 : 1;
    const fireColor = i => (mono ? mono : A[i].color);
    const comm    = opts.comm || 3000;
    const drawDur = 460;

    // deterministic firing schedule (seeded LCG), max 3 concurrent
    let seed = (opts.seed || 20250611) >>> 0;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const events = []; let active = []; let t = 420;
    while (t < comm) {
      active = active.filter(a => a.tR > t);
      if (active.length < 3) {
        const used = new Set(active.map(a => a.i));
        const idle = [0, 1, 2, 3, 4, 5].filter(i => !used.has(i));
        if (idle.length) {
          const i = idle[(rnd() * idle.length) | 0];
          const hold = 620 + rnd() * 520;
          events.push({ i, t0: t, tR: t + hold });
          active.push({ i, tR: t + hold });
        }
      }
      t += 220 + rnd() * 260;
    }

    const tClear = comm, tShoot = comm + 380, tFade = comm + 920, tReveal = comm + 1280;
    const duration = comm + 1280 + 980;

    function sample(tt) {
      const spokes = [0, 1, 2, 3, 4, 5].map(() => ({ a: 0, b: 0, vis: false, color: ink }));
      const dots   = [0, 1, 2, 3, 4, 5].map(() => ({ color: ink, op: idleDim }));
      let pulse = 0;

      if (tt < tClear) {
        events.forEach(e => {
          if (tt < e.t0) return;
          const sp = spokes[e.i];
          if (tt < e.t0 + drawDur) {                       // shoot in
            sp.a = 0; sp.b = ease((tt - e.t0) / drawDur); sp.vis = true; sp.color = fireColor(e.i);
            dots[e.i] = { color: fireColor(e.i), op: 1 };
          } else if (tt < e.tR) {                          // full
            sp.a = 0; sp.b = 1; sp.vis = true; sp.color = fireColor(e.i);
            dots[e.i] = { color: fireColor(e.i), op: 1 };
          } else if (tt < e.tR + drawDur) {                // disappear into hub
            sp.a = ease((tt - e.tR) / drawDur); sp.b = 1; sp.vis = true; sp.color = fireColor(e.i);
          }
          const land = e.t0 + drawDur;
          if (tt >= land && tt < land + 520) pulse = Math.max(pulse, Math.sin(Math.PI * (tt - land) / 520));
        });
      } else {
        dots.forEach(d => { d.op = 1; d.color = ink; });
        if (tt >= tShoot) {
          REST.forEach(i => {
            const sp = spokes[i];
            sp.a = 0; sp.b = tt < tShoot + drawDur ? ease((tt - tShoot) / drawDur) : 1; sp.vis = true;
            const col = tt < tFade ? fireColor(i) : ink;
            sp.color = col;
            dots[i] = { color: tt < tFade ? fireColor(i) : ink, op: 1 };
          });
          const land = tShoot + drawDur;
          if (tt >= land && tt < land + 520) pulse = Math.sin(Math.PI * (tt - land) / 520);
        }
      }

      const hubR   = M.NR.hub * (1 + 0.16 * pulse);
      const shiftP = tt < tReveal ? 0 : ease((tt - tReveal) / 820);
      const wmP    = tt < tReveal ? 0 : ease((tt - tReveal) / 720);
      return { spokes, dots, hubR, hub, ink, shiftP, wmP };
    }

    return { sample, duration };
  }

  function drawMark(ctx, cxp, cyp, sizePx, fr) {
    const M = window.MeshMark, s = sizePx / 100;
    const X = u => cxp + (u - 50) * s, Y = v => cyp + (v - 50) * s;
    const line = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    const circle = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
    ctx.lineCap = 'round';

    // stubs
    ctx.strokeStyle = fr.ink; ctx.lineWidth = M.SW.stub * s; ctx.globalAlpha = 0.16;
    M.PTS.forEach(([nx, ny]) => {
      const dx = (nx - 50) / M.R, dy = (ny - 50) / M.R;
      line(X(nx), Y(ny), X(nx + dx * M.R * 0.25), Y(ny + dy * M.R * 0.25));
    });
    // ring
    ctx.lineWidth = M.SW.ring * s; ctx.globalAlpha = 0.9;
    M.PTS.forEach(([nx, ny], i) => { const [mx, my] = M.PTS[(i + 1) % 6]; line(X(nx), Y(ny), X(mx), Y(my)); });
    ctx.globalAlpha = 1;
    // spokes
    ctx.lineWidth = M.SW.spoke * s;
    fr.spokes.forEach((sp, i) => {
      if (!sp.vis || sp.b <= sp.a) return;
      const [nx, ny] = M.PTS[i];
      const ax = nx + (50 - nx) * sp.a, ay = ny + (50 - ny) * sp.a;
      const bx = nx + (50 - nx) * sp.b, by = ny + (50 - ny) * sp.b;
      ctx.strokeStyle = sp.color; line(X(ax), Y(ay), X(bx), Y(by));
    });
    // dots
    fr.dots.forEach((d, i) => {
      const [nx, ny] = M.PTS[i];
      ctx.globalAlpha = d.op; ctx.fillStyle = d.color; circle(X(nx), Y(ny), M.NR.outer * s);
    });
    ctx.globalAlpha = 1;
    // hub
    ctx.fillStyle = fr.hub; circle(cxp, cyp, fr.hubR * s);
  }

  return { makeScene, drawMark, ease };
})();
