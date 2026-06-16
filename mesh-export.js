/* ===================================================================
   mesh-export.js — download helpers for the mesh.ai asset kit.

   window.MeshExport = {
     downloadSVG(name, markOpts),                 // vector mark
     downloadPNG(name, markOpts, px),             // raster mark (transparent)
     downloadLockupSVG(name, L),                  // mark + wordmark, vector
     downloadLockupPNG(name, L, scale),           // mark + wordmark, raster
     recordAnim(cfg)                              // -> downloads a .webm clip
   }
   Depends on window.MeshMark and (for recordAnim) window.MeshCanvas.
   =================================================================== */
window.MeshExport = (function () {
  const MM = () => window.MeshMark;

  function downloadBlob(name, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }

  /* ---- marks ---- */
  function markSVGString(markOpts, px) {
    return MM().staticMark(Object.assign({ stubs: false, px: px || 512 }, markOpts));
  }
  function downloadSVG(name, markOpts) {
    downloadBlob(name + '.svg', new Blob([markSVGString(markOpts, 512)], { type: 'image/svg+xml' }));
  }
  function loadSVGImage(svg) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      const img = new Image();
      img.onload = () => { res(img); setTimeout(() => URL.revokeObjectURL(url), 3000); };
      img.onerror = rej;
      img.src = url;
    });
  }
  async function downloadPNG(name, markOpts, px) {
    px = px || 2048;
    const img = await loadSVGImage(markSVGString(markOpts, px));
    const c = document.createElement('canvas'); c.width = px; c.height = px;
    c.getContext('2d').drawImage(img, 0, 0, px, px);
    await new Promise(r => c.toBlob(b => { downloadBlob(name + '.png', b); r(); }, 'image/png'));
  }

  /* ---- lockups (mark + wordmark) ---- */
  let _mc;
  // measure the wordmark at a given size; returns widths + glyph metrics
  function wmMetrics(fontPx) {
    _mc = _mc || document.createElement('canvas').getContext('2d');
    _mc.letterSpacing = '-0.04em';
    _mc.font = '700 ' + fontPx + 'px Inter, sans-serif';
    const m1 = _mc.measureText('mesh');
    _mc.font = '700 ' + fontPx + 'px Inter, sans-serif';
    const m2 = _mc.measureText('.ai');
    const asc = Math.max(m1.actualBoundingBoxAscent  || fontPx * 0.72,
                         m2.actualBoundingBoxAscent  || fontPx * 0.72);
    const desc = Math.max(m1.actualBoundingBoxDescent || 0,
                          m2.actualBoundingBoxDescent || 0);
    return { meshW: m1.width, aiW: m2.width, tw: m1.width + m2.width, asc, desc };
  }
  // L = { mesh, ai, markOpts, stack }  — exports are transparent (no bg)
  function lockupLayout(L) {
    const markPx = L.stack ? 150 : 132;
    const fontPx = L.stack ? 60 : 64;
    const gap    = L.stack ? 14 : 16;
    const pad    = Math.round(markPx * 0.13);
    const m = wmMetrics(fontPx);
    let W, H, markX, markY, tx, baseline;
    if (L.stack) {
      W = Math.max(markPx, m.tw) + pad * 2;
      H = pad + markPx + gap + (m.asc + m.desc) + pad;
      markX = (W - markPx) / 2; markY = pad;
      tx = (W - m.tw) / 2;
      baseline = pad + markPx + gap + m.asc;          // text sits below the mark
    } else {
      W = pad + markPx + gap + m.tw + pad;
      H = markPx + pad * 2;
      markX = pad; markY = pad;
      const cy = markY + markPx / 2;
      tx = pad + markPx + gap;
      baseline = cy + (m.asc - m.desc) / 2;           // optically centre on the mark
    }
    return { markPx, fontPx, gap, pad, meshW: m.meshW, aiW: m.aiW, tw: m.tw, W, H, markX, markY, tx, baseline };
  }
  function downloadLockupSVG(name, L) {
    const o = lockupLayout(L);
    const inner = MM().inner(Object.assign({ stubs: false }, L.markOpts));
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + o.W + '" height="' + o.H + '" viewBox="0 0 ' + o.W + ' ' + o.H + '">' +
      '<svg x="' + o.markX + '" y="' + o.markY + '" width="' + o.markPx + '" height="' + o.markPx +
        '" viewBox="0 0 100 100" overflow="visible">' + inner + '</svg>' +
      '<text x="' + o.tx + '" y="' + o.baseline + '" font-family="Inter, sans-serif" font-weight="700" font-size="' + o.fontPx +
        '" letter-spacing="-0.04em">' +
        '<tspan fill="' + L.mesh + '">mesh</tspan>' +
        '<tspan fill="' + L.ai + '" font-weight="700">.ai</tspan>' +
      '</text></svg>';
    downloadBlob(name + '.svg', new Blob([svg], { type: 'image/svg+xml' }));
  }
  async function downloadLockupPNG(name, L, scale) {
    scale = scale || 3;
    if (document.fonts) { try { await document.fonts.ready; } catch (e) {} }
    const o = lockupLayout(L);
    const c = document.createElement('canvas'); c.width = o.W * scale; c.height = o.H * scale;
    const ctx = c.getContext('2d'); ctx.scale(scale, scale);   // transparent background
    const markImg = await loadSVGImage(markSVGString(L.markOpts, Math.round(o.markPx * scale)));
    ctx.drawImage(markImg, o.markX, o.markY, o.markPx, o.markPx);
    ctx.textBaseline = 'alphabetic'; ctx.letterSpacing = '-0.04em';
    ctx.font = '700 ' + o.fontPx + 'px Inter, sans-serif'; ctx.fillStyle = L.mesh; ctx.fillText('mesh', o.tx, o.baseline);
    ctx.font = '700 ' + o.fontPx + 'px Inter, sans-serif';
    ctx.fillStyle = L.ai; ctx.fillText('.ai', o.tx + o.meshW, o.baseline);
    await new Promise(r => c.toBlob(b => { downloadBlob(name + '.png', b); r(); }, 'image/png'));
  }

  /* ---- animation -> .webm ---- */
  function drawFrame(ctx, w, h, scene, t, cfg) {
    const fr = scene.sample(t);
    const MC = window.MeshCanvas;
    ctx.clearRect(0, 0, w, h);
    if (cfg.bg) { ctx.fillStyle = cfg.bg; ctx.fillRect(0, 0, w, h); }

    if (cfg.layout === 'wide') {
      const S = cfg.markSize || Math.round(h * 0.34);
      const fontPx = cfg.fontPx || Math.round(S * 0.62);
      const gap = cfg.gap || Math.round(S * 0.14);
      ctx.font = '800 ' + fontPx + 'px Inter, sans-serif'; ctx.letterSpacing = '-0.04em';
      const meshW = ctx.measureText('mesh').width;
      ctx.font = '700 ' + fontPx + 'px Inter, sans-serif';
      const aiW = ctx.measureText('.ai').width;
      const tw = meshW + aiW;
      const unitW = S + gap + tw, unitLeft = (w - unitW) / 2;
      const cxShift = unitLeft + S / 2, cxCenter = w / 2;
      const cxp = cxCenter + (cxShift - cxCenter) * fr.shiftP, cyp = h / 2;
      MC.drawMark(ctx, cxp, cyp, S, fr);
      if (fr.wmP > 0 && cfg.wordmark) {
        const wmLeft = unitLeft + S + gap;
        ctx.save();
        const rev = tw * MC.ease(fr.wmP);              // clip-wipe reveal
        ctx.beginPath(); ctx.rect(wmLeft - fontPx * 0.14, cyp - fontPx, rev + fontPx * 0.28, fontPx * 2); ctx.clip();
        ctx.textBaseline = 'middle';
        ctx.font = '800 ' + fontPx + 'px Inter, sans-serif'; ctx.letterSpacing = '-0.04em';
        ctx.fillStyle = cfg.wordmark.mesh; ctx.fillText('mesh', wmLeft, cyp);
        ctx.font = '700 ' + fontPx + 'px Inter, sans-serif';
        ctx.fillStyle = cfg.wordmark.ai; ctx.fillText('.ai', wmLeft + meshW, cyp);
        ctx.restore();
      }
    } else {
      const S = cfg.markSize || Math.round(Math.min(w, h) * 0.6);
      MC.drawMark(ctx, w / 2, h / 2, S, fr);
    }
  }

  async function recordAnim(cfg) {
    if (!window.MediaRecorder) { alert('Video recording is not supported in this browser.'); return; }
    if (document.fonts) { try { await document.fonts.ready; } catch (e) {} }
    const w = cfg.w || 1920, h = cfg.h || 1080, fps = cfg.fps || 30;
    const scene = window.MeshCanvas.makeScene({ mono: cfg.mono, ink: cfg.ink, hub: cfg.hub, comm: cfg.comm || 3000, seed: cfg.seed });
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    drawFrame(ctx, w, h, scene, 0, cfg);                 // first frame before capture

    const stream = canvas.captureStream(0);
    const track = stream.getVideoTracks()[0];
    const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
    const mime = types.find(t => MediaRecorder.isTypeSupported(t)) || 'video/webm';
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: cfg.bitrate || 12000000 });
    const chunks = [];
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    const stopped = new Promise(r => { rec.onstop = r; });
    rec.start();

    const dur = scene.duration, hold = 1000, dt = 1000 / fps;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    for (let t = 0; t <= dur + hold; t += dt) {
      drawFrame(ctx, w, h, scene, Math.min(t, dur), cfg);
      if (track.requestFrame) track.requestFrame();
      await sleep(dt);
    }
    rec.stop();
    await stopped;
    downloadBlob((cfg.filename || 'mesh-animation') + '.webm', new Blob(chunks, { type: mime }));
  }

  return { downloadSVG, downloadPNG, downloadLockupSVG, downloadLockupPNG, recordAnim };
})();
