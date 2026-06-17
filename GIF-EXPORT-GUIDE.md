# Mesh AI Animations → GIF Export

High-quality batch GIF exporter for all 9 animations.

## Setup

### 1. Install Dependencies

```bash
# Node.js (if not already installed)
# Download from: https://nodejs.org

# ffmpeg
brew install ffmpeg

# Puppeteer (for this project)
npm install puppeteer
```

### 2. Run the Exporter

```bash
cd ~/Documents/Claude\ Workspace/mesh-ai-animations
node batch-gif-exporter.js
```

This will:
- Pull all 9 animations from GitHub Pages (live URLs)
- Capture frames at 24fps
- Encode as optimized GIFs with transparent backgrounds
- Save to `./gifs/` folder

### 3. Output

All GIFs will be in `gifs/`:

```
gifs/
├── mesh-ai-hero-light.gif (3s, 600×600px)
├── mesh-ai-hero-dark.gif (3s, 600×600px)
├── mesh-ai-agents-all.gif (3s, 800×500px)
├── mesh-ai-agent-penny.gif (2.6s, 600×600px)
├── mesh-ai-agent-riley.gif (2.6s, 600×600px)
├── mesh-ai-agent-milo.gif (2.6s, 600×600px)
├── mesh-ai-agent-sierra.gif (2.6s, 600×600px)
├── mesh-ai-agent-dakota.gif (2.6s, 600×600px)
└── mesh-ai-agent-alex.gif (2.6s, 600×600px)
```

## Quality Settings

Current settings (in `batch-gif-exporter.js`):

- **Frame rate:** 24 fps (smooth, reasonable file size)
- **Resolution:** 600×600px (agents), 800×500px (grid)
- **Colors:** 256-color palette with Sierra2-4a dithering
- **Background:** Transparent (omitBackground: true)
- **Encoding:** FFmpeg palette-based (high quality, smaller files)

To adjust:
- Change `fps` in the ANIMATIONS array (higher = smoother, larger files)
- Change `width`/`height` for different dimensions
- Modify the FFmpeg `-vf` (filter) options for different dithering or palette sizes

## Troubleshooting

**"ffmpeg not found"**
```bash
brew install ffmpeg
```

**"Cannot find module 'puppeteer'"**
```bash
npm install puppeteer
```

**GIFs look grainy**
- Increase `max_colors` in FFmpeg filter (max 256)
- Change dithering method (sierra2_4a, floyd_steinberg, etc.)
- Reduce `fps` if file size is the issue

**Animation doesn't play in GIF**
- Check the `duration` value matches the actual animation length
- Verify the live GitHub Pages URL loads correctly in a browser first

## Manual FFmpeg (if Puppeteer fails)

If the exporter has issues, you can manually capture and encode:

```bash
# 1. Open animation in browser at full size
# 2. Record video with screen capture (QuickTime, etc.)
# 3. Convert to GIF:
ffmpeg -i animation.mov -vf "fps=24,scale=600:600:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=sierra2_4a" output.gif
```

---

Once exported, GIFs are ready to use in presentations, marketing, product pages, etc.
