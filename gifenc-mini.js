/* ===================================================================
   gifenc-mini.js — self-contained GIF89a encoder + color quantizer.
   Exposes window.gifenc = { GIFEncoder, quantize, applyPalette }
   matching the gifenc npm package API so mesh-gif.js works unchanged.
   =================================================================== */
(function () {

  /* ---- LZW compression ------------------------------------------- */
  function lzwEncode(indices, minCodeSize) {
    const clearCode = 1 << minCodeSize;
    const eoiCode   = clearCode + 1;
    const out = [];
    let bitBuf = 0, bitLen = 0, blk = [];

    function flush255() { if (blk.length === 255) { out.push(255); out.push(...blk); blk = []; } }
    let codeSize = minCodeSize + 1;
    function emitCode(c) {
      bitBuf |= (c << bitLen); bitLen += codeSize;
      while (bitLen >= 8) { blk.push(bitBuf & 0xff); bitBuf >>>= 8; bitLen -= 8; flush255(); }
    }
    function flushBits() {
      if (bitLen > 0) { blk.push(bitBuf & 0xff); }
      if (blk.length) { out.push(blk.length); out.push(...blk); }
      out.push(0); // block terminator
    }

    let table = new Map(), nextCode;
    function reset() { table.clear(); nextCode = eoiCode + 1; codeSize = minCodeSize + 1; }

    out.push(minCodeSize);
    emitCode(clearCode); reset();

    let prefix = indices[0];
    for (let i = 1; i < indices.length; i++) {
      const k = indices[i];
      // key: prefix is max 12-bit (0–4095), k is 8-bit (0–255)
      const key = (prefix << 8) | k;
      if (table.has(key)) {
        prefix = table.get(key);
      } else {
        emitCode(prefix);
        if (nextCode < 4096) {
          table.set(key, nextCode++);
          if (nextCode > (1 << codeSize) && codeSize < 12) codeSize++;
        } else {
          emitCode(clearCode); reset();
        }
        prefix = k;
      }
    }
    emitCode(prefix);
    emitCode(eoiCode);
    flushBits();
    return out;
  }

  /* ---- GIFEncoder ------------------------------------------------- */
  function GIFEncoder() {
    const buf = [];
    let started = false;
    const u16 = n => [n & 0xff, (n >> 8) & 0xff];

    function ensureHeader(w, h) {
      if (started) return; started = true;
      buf.push(0x47,0x49,0x46,0x38,0x39,0x61); // GIF89a
      buf.push(...u16(w), ...u16(h), 0x00, 0x00, 0x00); // LSD, no global CT
      // Netscape loop-forever block
      buf.push(0x21,0xFF,0x0B,
        0x4E,0x45,0x54,0x53,0x43,0x41,0x50,0x45,0x32,0x2E,0x30,
        0x03,0x01,0x00,0x00,0x00);
    }

    function writeFrame(indices, w, h, opts) {
      opts = opts || {};
      ensureHeader(w, h);

      const pal    = opts.palette; // Uint8Array of RGB triples
      const nPal   = pal.length / 3;
      const pow2   = Math.max(2, 1 << Math.ceil(Math.log2(Math.max(nPal, 2))));
      const palBit = Math.log2(pow2) - 1; // stored as (N-1) per spec
      const delay  = Math.max(1, Math.round((opts.delay || 66) / 10)); // centiseconds

      // Graphics Control Extension — support optional transparent index
      const ti = (opts.transparentIndex != null && opts.transparentIndex >= 0) ? (opts.transparentIndex | 0) : -1;
      buf.push(0x21,0xF9,0x04, ti >= 0 ? 0x09 : 0x00, ...u16(delay), ti >= 0 ? ti : 0, 0x00);

      // Image Descriptor + local color table flag
      buf.push(0x2C, ...u16(0), ...u16(0), ...u16(w), ...u16(h), 0x80 | palBit);

      // Local Color Table (padded to pow2 entries)
      for (let i = 0; i < pow2; i++) {
        if (i < nPal) buf.push(pal[i*3], pal[i*3+1], pal[i*3+2]);
        else          buf.push(0, 0, 0);
      }

      // LZW image data
      const minCodeSize = Math.max(2, palBit + 1);
      buf.push(...lzwEncode(indices instanceof Uint8Array ? indices : new Uint8Array(indices), minCodeSize));
    }

    function finish() { buf.push(0x3B); }
    function bytes()  { return new Uint8Array(buf); }

    return { writeFrame, finish, bytes };
  }

  /* ---- Color quantization ----------------------------------------- */
  function quantize(data, maxColors) {
    // Count unique RGB colors (ignore alpha)
    const freq = new Map();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i+3] === 0) continue; // transparent → skip
      const k = (data[i] << 16) | (data[i+1] << 8) | data[i+2];
      freq.set(k, (freq.get(k) || 0) + 1);
    }

    // Sort by frequency, take the most common colors
    const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
    const take   = sorted.slice(0, maxColors);
    const out    = new Uint8Array(take.length * 3);
    take.forEach(([k], i) => {
      out[i*3]   = (k >> 16) & 0xff;
      out[i*3+1] = (k >>  8) & 0xff;
      out[i*3+2] =  k        & 0xff;
    });
    return out;
  }

  function applyPalette(data, palette) {
    const n       = palette.length / 3;
    const indices = new Uint8Array(data.length / 4);
    const cache   = new Map(); // exact-color → palette index

    // Pre-fill cache with exact palette entries
    for (let i = 0; i < n; i++) {
      const k = (palette[i*3] << 16) | (palette[i*3+1] << 8) | palette[i*3+2];
      if (!cache.has(k)) cache.set(k, i);
    }

    for (let i = 0; i < indices.length; i++) {
      const r = data[i*4], g = data[i*4+1], b = data[i*4+2];
      const k = (r << 16) | (g << 8) | b;
      if (cache.has(k)) {
        indices[i] = cache.get(k);
      } else {
        // Nearest-color search with caching
        let best = 0, bestD = Infinity;
        for (let j = 0; j < n; j++) {
          const dr = r - palette[j*3], dg = g - palette[j*3+1], db = b - palette[j*3+2];
          const d  = dr*dr + dg*dg + db*db;
          if (d < bestD) { bestD = d; best = j; }
        }
        cache.set(k, best);
        indices[i] = best;
      }
    }
    return indices;
  }

  // applyPaletteAlpha: like applyPalette but maps alpha=0 pixels to transparentIndex
  function applyPaletteAlpha(data, palette, transparentIndex) {
    const n = palette.length / 3;
    const indices = new Uint8Array(data.length / 4);
    const cache = new Map();
    for (let i = 0; i < n; i++) {
      const k = (palette[i*3] << 16) | (palette[i*3+1] << 8) | palette[i*3+2];
      if (!cache.has(k)) cache.set(k, i);
    }
    for (let i = 0; i < indices.length; i++) {
      if (data[i*4+3] === 0) { indices[i] = transparentIndex; continue; }
      const r = data[i*4], g = data[i*4+1], b = data[i*4+2];
      const k = (r << 16) | (g << 8) | b;
      if (cache.has(k)) { indices[i] = cache.get(k); continue; }
      let best = 0, bestD = Infinity;
      for (let j = 0; j < n; j++) {
        if (j === transparentIndex) continue;
        const dr = r - palette[j*3], dg = g - palette[j*3+1], db = b - palette[j*3+2];
        const d = dr*dr + dg*dg + db*db;
        if (d < bestD) { bestD = d; best = j; }
      }
      cache.set(k, best);
      indices[i] = best;
    }
    return indices;
  }

  window.gifenc = { GIFEncoder, quantize, applyPalette, applyPaletteAlpha };
})();
