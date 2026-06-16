/* ===================================================================
   mesh-anim.js — "communication" animation for the live mesh mark.

   Outer agent-dots fire lines inward to the central hub — sporadically,
   never more than three at once. A dot lights up in its agent colour
   while its line is live. After the communication phase the three
   resting spokes (0,2,4) stick, everything resolves to the clean mark,
   and the wordmark animates in.

   Options (all optional):
     hub          hub fill colour (default brand blue)
     ink          resting line/dot colour (default '#fff'); dark for light mode
     mono         single-colour mode (agent marks): the whole mark is this
                  colour, activity shown by dot brightness rather than hue
     duration     ms of communication before the finale (default 6200)
     centerShift  NEW option — the mark plays centred, then the whole
                  lockup slides left as the wordmark reveals, so a recorded
                  video never looks like it started off-centre. Requires
                  lockupEl.
     lockupEl     the flex .lockup wrapping mark + wordmark (for centerShift)

   Visibility of spokes is driven by stroke-dashoffset; the wordmark
   reveal uses a CSS class. Both are robust against rAF throttling.

   Depends on window.MeshMark.  Exposes window.MeshComm(markEl, wmEl, opts).
   =================================================================== */
function MeshComm(markEl, wordmarkEl, opts) {
  opts = opts || {};
  const M    = window.MeshMark;
  const ink  = opts.ink || '#fff';
  const mono = opts.mono || null;
  const live = M.buildLive(markEl, { hub: opts.hub || '#3860EE', ink });
  const A    = M.AGENTS;
  const R    = M.R;
  const REST = M.REST_SPOKES;
  const idleDim   = mono ? 0.34 : 1;
  const fireColor = i => (mono ? mono : A[i].color);
  const lockupEl    = opts.lockupEl || null;
  const centerShift = !!opts.centerShift;
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SPOKE_TRANS = 'stroke-dashoffset .46s cubic-bezier(.37,0,.63,1), stroke .34s ease';
  live.spokes.forEach(sp => { sp.style.transition = SPOKE_TRANS; });
  live.dots.forEach(d => { d.style.transition = 'fill .24s ease, fill-opacity .24s ease'; });

  // snap a spoke to the hidden "ready to shoot in from its dot" position,
  // without animating through the visible state
  function setReady(sp) {
    sp.style.transition = 'none';
    sp.style.strokeDashoffset = String(R);
    void sp.getBoundingClientRect();
    sp.style.transition = SPOKE_TRANS;
  }

  // centre the mark by sliding the whole lockup right by half the
  // (hidden) wordmark's footprint; reset() re-measures every play.
  function centreLockup() {
    if (!centerShift || !lockupEl || !wordmarkEl) return;
    lockupEl.style.transition = 'none';
    const w   = wordmarkEl.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(lockupEl).gap) || 0;
    lockupEl.style.transform = 'translateX(' + ((w + gap) / 2).toFixed(1) + 'px)';
    void lockupEl.getBoundingClientRect();
    lockupEl.style.transition = 'transform .82s cubic-bezier(.2,.85,.25,1)';
  }

  const state = live.spokes.map(() => 'idle');   // idle | on | off
  let visible = 0, finished = false;
  let timers = [];
  const after = (ms, fn) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
  const clearAll = () => { timers.forEach(clearTimeout); timers = []; };

  function fire(i, hold) {
    if (finished || state[i] !== 'idle' || visible >= 3) return;
    state[i] = 'on'; visible++;
    const sp = live.spokes[i], dot = live.dots[i], col = fireColor(i);
    sp.setAttribute('stroke', col);
    sp.style.strokeDashoffset = '0';        // glide in
    dot.setAttribute('fill', col);          // agent goes active
    dot.style.fillOpacity = '1';
    after(440, pulseHub);                   // hub reacts as the input lands
    after(hold, () => retract(i));
  }

  function retract(i) {
    if (finished || state[i] !== 'on') return;
    state[i] = 'off';
    live.spokes[i].style.strokeDashoffset = String(-R);  // disappear into the hub
    live.dots[i].setAttribute('fill', ink);
    live.dots[i].style.fillOpacity = String(idleDim);
    after(480, () => {
      if (state[i] !== 'off') return;
      setReady(live.spokes[i]);          // reset for the next shoot-in
      state[i] = 'idle'; visible--;
    });
  }

  let hubBusy = false;
  function pulseHub() {
    if (!live.hub || hubBusy) return;
    hubBusy = true;
    live.hub.style.transition = 'r .18s ease-out';
    live.hub.setAttribute('r', String(M.NR.hub * 1.16));
    setTimeout(() => {
      live.hub.style.transition = 'r .34s ease-in';
      live.hub.setAttribute('r', String(M.NR.hub));
      setTimeout(() => { hubBusy = false; }, 340);
    }, 180);
  }

  function tick() {
    if (finished) return;
    if (visible < 3) {
      const idle = state.map((s, i) => (s === 'idle' ? i : -1)).filter(i => i >= 0);
      if (idle.length) {
        const i = idle[(Math.random() * idle.length) | 0];
        fire(i, 620 + Math.random() * 520);
      }
    }
    after(220 + Math.random() * 260, tick);
  }

  function finale() {
    finished = true; clearAll();
    // 1. anything still live disappears into the hub; all dots settle full
    live.spokes.forEach((sp, i) => {
      if (state[i] === 'on') sp.style.strokeDashoffset = String(-R);
      sp.setAttribute('stroke', REST.includes(i) ? fireColor(i) : ink);
      live.dots[i].setAttribute('fill', ink);
      live.dots[i].style.fillOpacity = '1';
    });
    if (live.hub) live.hub.setAttribute('r', String(M.NR.hub));
    // 2. the resting three shoot in from their dots, in their agent colours
    after(380, () => {
      REST.forEach(i => { setReady(live.spokes[i]); live.dots[i].setAttribute('fill', fireColor(i)); });
      after(40, () => {
        REST.forEach(i => { live.spokes[i].style.strokeDashoffset = '0'; });
        pulseHub();
      });
    });
    // 3. unify — once connected, fade the three lines + dots to the ink colour
    after(920, () => {
      REST.forEach(i => {
        live.spokes[i].setAttribute('stroke', ink);
        live.dots[i].setAttribute('fill', ink);
      });
    });
    // 4. slide the lockup to centre (centerShift), then reveal the wordmark
    after(1280, () => {
      if (centerShift && lockupEl) lockupEl.style.transform = 'translateX(0)';
      const reveal = () => { if (wordmarkEl) wordmarkEl.classList.add('revealed'); };
      if (opts.textDelay) after(opts.textDelay, reveal); else reveal();
    });
  }

  function reset() {
    finished = false; visible = 0; clearAll();
    for (let i = 0; i < state.length; i++) state[i] = 'idle';
    live.spokes.forEach(sp => {
      sp.style.strokeDashoffset = String(R);
      sp.setAttribute('stroke', ink);
    });
    live.dots.forEach(d => { d.setAttribute('fill', ink); d.style.fillOpacity = String(idleDim); });
    if (wordmarkEl) wordmarkEl.classList.remove('revealed');
    centreLockup();
  }

  function play() {
    if (reduce) { reset(); finale(); return; }
    reset();
    after(420, tick);
    after(opts.duration || 6200, finale);
  }

  return { play, finale, reset };
}
window.MeshComm = MeshComm;
