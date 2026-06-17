# Mesh AI Animations

High-quality, transparent-background animation library for Mesh AI personas and hero sections. All animations are rendered with consistent frame timing and crisp anti-aliased edges.

## Animations (9 total)

### Hero Animations
- **01-hero-light.html** — Light background hero (3s loop)
- **02-hero-dark.html** — Dark background hero (3s loop)

### Agent Personas
- **03-agents-all.html** — All 6 agents in grid view
- **04-agent-penny.html** — Penny (2.6s loop)
- **05-agent-riley.html** — Riley (2.6s loop)
- **06-agent-milo.html** — Milo (2.6s loop)
- **07-agent-sierra.html** — Sierra (2.6s loop)
- **08-agent-dakota.html** — Dakota (2.6s loop)
- **09-agent-alex.html** — Alex (2.6s loop)

## Quick Start

Open any HTML file in a browser to see the animation. All dependencies are local.

```
https://YOUR-USERNAME.github.io/mesh-ai-animations/01-hero-light.html
```

## GIF Export

Each animation can be exported as a high-quality GIF with transparent background using the built-in `MeshGIF.recordGIF()` API.

### CLI Export (Node.js)

```bash
npm install puppeteer ffmpeg-static
node export-gifs.js
```

This generates all 9 GIFs at:
- 600×600px
- 24 fps
- Transparent background
- Output: `gifs/` folder

## Technical Details

- **Canvas Library:** mesh-canvas.js
- **Animation Engine:** mesh-anim.js
- **Marks:** mesh-mark.js
- **GIF Export:** mesh-gif.js (uses gifenc-mini.js)
- **Frame Timing:** Deterministic (no jitter)
- **Background:** Configurable per animation

## File Structure

```
mesh-ai-animations/
├── 01-hero-light.html
├── 02-hero-dark.html
├── 03-agents-all.html
├── 04-09-agent-*.html
├── *.js (dependencies)
├── README.md (this file)
└── GITHUB-SETUP.md (deployment guide)
```

---

Generated for Mesh AI branding. For updates or issues, refer to the main project.
