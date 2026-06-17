/* ===================================================================
   mesh-gif.js — frame-accurate GIF export for mesh animations.

   Unlike canvas.captureStream() + MediaRecorder (.webm), this renders
   every frame synchronously from the deterministic MeshCanvas scene,
   so it works regardless of tab focus / background throttling.

   Depends on: window.gifenc (gifenc UMD), mesh-mark.js, mesh-canvas.js
   Exposes: window.MeshGIF = { recordGIF(cfg, onProgress) }

   cfg mirrors mesh-export.js recordAnim cfg:
     layout   'wide' or 'mark' (default 'mark')
     w / h    output pixel dimensions
     fps      default 15
     bg       background hex
     ink      mark line colour
     hub      hub fill colour
     mono     single-colour override (agent marks)
     wordmark { mesh, ai } colours for wide lockup text
     comm     communication phase duration ms (default 3000)
     seed     deterministic RNG seed
     filename download filename (no extension)
   =================================================================== */
(function () {
  function drawFrame(ctx, w, h, fr, cfg) {
    const MC = window.MeshCanvas;
    ctx.clearRect(0, 0, w, h); // transparent — no background fill

    if (cfg.layout === 'wide') {
      const S     = cfg.markSize || Math.round(h * 0.48);
      const fontPx = Math.round(S * 0.60);
      const gap    = Math.round(S * 0.14);
      ctx.letterSpacing = '-0.04em';
      ctx.font = '800 ' + fontPx + 'px Inter, sans-serif';
      const meshW = ctx.measureText('mesh').width;
      ctx.font = '700 ' + fontPx + 'px Inter, sans-serif';
      const aiW = ctx.measureText('.ai').width;
      const tw = meshW + aiW;
      const unitW  = S + gap + tw;
      const unitLeft = (w - unitW) / 2;
      const cxShift  = unitLeft + S / 2;
      const cxCenter = w / 2;
      const cxp = cxCenter + (cxShift - cxCenter) * fr.shiftP;

      MC.drawMark(ctx, cxp, h / 2, S, fr);

      if (fr.wmP > 0 && cfg.wordmark) {
        const wmLeft = unitLeft + S + gap;
        const rev    = tw * MC.ease(fr.wmP);
        ctx.save();
        ctx.beginPath();
        ctx.rect(wmLeft - fontPx * 0.14, h / 2 - fontPx, rev + fontPx * 0.28, fontPx * 2);
        ctx.clip();
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '-0.04em';
        ctx.font = '800 ' + fontPx + 'px Inter, sans-serif';
        ctx.fillStyle = cfg.wordmark.mesh;
        ctx.fillText('mesh', wmLeft, h / 2);
        ctx.font = '700 ' + fontPx + 'px Inter, sans-serif';
        ctx.fillStyle = cfg.wordmark.ai;
        ctx.fillText('.ai', wmLeft + meshW, h / 2);
        ctx.restore();
      }
    } else {
      const S = cfg.markSize || Math.round(Math.min(w, h) * 0.68);
      MC.drawMark(ctx, w / 2, h / 2, S, fr);
    }
  }

  async function recordGIF(cfg, onProgress) {
    const GE = window.gifenc;
    if (!GE || !GE.GIFEncoder) {
      alert('GIF encoder not loaded — please reload the page and try again.');
      return;
    }
    if (document.fonts) { try { await document.fonts.ready; } catch (e) {} }

    const w   = cfg.w || (cfg.layout === 'wide' ? 800 : 600);
    const h   = cfg.h || (cfg.layout === 'wide' ? 450 : 600);
    const fps = cfg.fps || 24;
    const dt  = 1000 / fps;
    const scene = window.MeshCanvas.makeScene({
      mono: cfg.mono, ink: cfg.ink, hub: cfg.hub,
      comm: cfg.comm || 3000, seed: cfg.seed || 20250611
    });

    // 2× super-sample canvas: render at double resolution then
    // downscale so anti-aliased edges average cleanly before quantising
    const bigCv = document.createElement('canvas');
    bigCv.width = w * 2; bigCv.height = h * 2;
    const bigCtx = bigCv.getContext('2d');

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Pre-render first frame so fonts hit the cache
    bigCtx.setTransform(2, 0, 0, 2, 0, 0);
    drawFrame(bigCtx, w, h, scene.sample(0), cfg);
    bigCtx.setTransform(1, 0, 0, 1, 0, 0);
    await new Promise(r => setTimeout(r, 400)); // allow Inter to fully load

    const holdMs = 1400;
    const totalFrames = Math.ceil((scene.duration + holdMs) / dt);
    const gif = GE.GIFEncoder();

    for (let i = 0; i < totalFrames; i++) {
      const t  = Math.min(i * dt, scene.duration);
      const fr = scene.sample(t);
      // Scale context 2× so drawFrame works in 1× coords but renders at 2× density
      bigCtx.setTransform(2, 0, 0, 2, 0, 0);
      drawFrame(bigCtx, w, h, fr, cfg);
      bigCtx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(bigCv, 0, 0, w, h);

      const imgData  = ctx.getImageData(0, 0, w, h);
      const data     = imgData.data;
      // Threshold: only fully transparent pixels become transparent;
      // keep anti-aliased stroke edges (ring draws at 0.9 alpha, spokes at 1.0)
      for (let j = 3; j < data.length; j += 4) { if (data[j] < 32) data[j] = 0; }

      const base     = GE.quantize(data, 255);          // max 255, reserve 1 for transparent
      const transIdx = base.length / 3;
      const palette  = new Uint8Array(base.length + 3); // append one empty transparent slot
      palette.set(base, 0);
      const index    = GE.applyPaletteAlpha(data, palette, transIdx);
      gif.writeFrame(index, w, h, { palette, delay: Math.round(dt), transparentIndex: transIdx });

      if (onProgress) onProgress((i + 1) / totalFrames);
      if (i % 4 === 0) await new Promise(r => setTimeout(r, 0)); // yield UI
    }

    gif.finish();

    const blob = new Blob([gif.bytes()], { type: 'image/gif' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = (cfg.filename || 'mesh-animation') + '.gif';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  window.MeshGIF = { recordGIF };
})();
