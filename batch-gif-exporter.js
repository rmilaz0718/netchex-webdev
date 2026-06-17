#!/usr/bin/env node

/**
 * Batch GIF Exporter for Mesh AI Animations
 * 
 * Pulls live animations from GitHub Pages, captures frames, and exports as high-quality GIFs.
 * 
 * Requirements:
 *   - Node.js 14+
 *   - Puppeteer (npm install puppeteer)
 *   - FFmpeg (brew install ffmpeg)
 * 
 * Usage:
 *   node batch-gif-exporter.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = 'https://rmilaz0718.github.io/netchex-webdev';

const ANIMATIONS = [
  {
    file: '01-hero-light.html',
    name: 'mesh-ai-hero-light',
    width: 600,
    height: 600,
    fps: 24,
    duration: 3000,
  },
  {
    file: '02-hero-dark.html',
    name: 'mesh-ai-hero-dark',
    width: 600,
    height: 600,
    fps: 24,
    duration: 3000,
  },
  {
    file: '03-agents-all.html',
    name: 'mesh-ai-agents-all',
    width: 800,
    height: 500,
    fps: 24,
    duration: 3000,
  },
  {
    file: '04-agent-penny.html',
    name: 'mesh-ai-agent-penny',
    width: 600,
    height: 600,
    fps: 24,
    duration: 2600,
  },
  {
    file: '05-agent-riley.html',
    name: 'mesh-ai-agent-riley',
    width: 600,
    height: 600,
    fps: 24,
    duration: 2600,
  },
  {
    file: '06-agent-milo.html',
    name: 'mesh-ai-agent-milo',
    width: 600,
    height: 600,
    fps: 24,
    duration: 2600,
  },
  {
    file: '07-agent-sierra.html',
    name: 'mesh-ai-agent-sierra',
    width: 600,
    height: 600,
    fps: 24,
    duration: 2600,
  },
  {
    file: '08-agent-dakota.html',
    name: 'mesh-ai-agent-dakota',
    width: 600,
    height: 600,
    fps: 24,
    duration: 2600,
  },
  {
    file: '09-agent-alex.html',
    name: 'mesh-ai-agent-alex',
    width: 600,
    height: 600,
    fps: 24,
    duration: 2600,
  },
];

async function captureFrames(browser, config) {
  console.log(`\n📹 Capturing ${config.name}...`);
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: config.width, height: config.height });
    const url = `${BASE_URL}/${config.file}`;
    console.log(`   URL: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for animation to be ready
    await page.waitForFunction(() => {
      return typeof window.MeshComm !== 'undefined' || document.querySelector('#liveMark svg');
    }, { timeout: 10000 });
    
    const frameCount = Math.ceil((config.duration / 1000) * config.fps);
    const frames = [];
    
    console.log(`   Frames: ${frameCount} @ ${config.fps}fps (${config.duration}ms)`);
    
    // Capture frames
    for (let i = 0; i < frameCount; i++) {
      const screenshot = await page.screenshot({
        encoding: 'binary',
        omitBackground: true,
      });
      frames.push(screenshot);
      
      const pct = Math.round((i / frameCount) * 100);
      process.stdout.write(`\r   Progress: ${pct}%`);
      
      // Small delay to let animation progress
      await new Promise(r => setTimeout(r, config.duration / frameCount));
    }
    
    console.log('\r   Progress: 100%');
    return frames;
  } finally {
    await page.close();
  }
}

async function encodeGif(frames, config) {
  const tmpDir = path.join(__dirname, '.tmp-frames');
  const outputDir = path.join(__dirname, 'gifs');
  
  // Create directories
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  console.log(`🎬 Encoding GIF...`);
  
  // Write frames as PNG files
  for (let i = 0; i < frames.length; i++) {
    const framePath = path.join(tmpDir, `frame-${String(i).padStart(4, '0')}.png`);
    fs.writeFileSync(framePath, frames[i]);
  }
  
  const outputPath = path.join(outputDir, `${config.name}.gif`);
  const framerate = config.fps;
  
  // Use ffmpeg to create optimized GIF
  const ffmpegCmd = `ffmpeg -y -framerate ${framerate} -i "${tmpDir}/frame-%04d.png" -vf "fps=${framerate},scale=${config.width}:${config.height}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=sierra2_4a" "${outputPath}"`;
  
  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    const size = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    console.log(`   ✓ Saved: ${outputPath} (${size}MB)`);
  } catch (e) {
    console.error(`   ✗ ffmpeg error: ${e.message}`);
    throw e;
  }
  
  // Cleanup temp frames
  fs.readdirSync(tmpDir).forEach(f => {
    fs.unlinkSync(path.join(tmpDir, f));
  });
  fs.rmdirSync(tmpDir);
}

async function main() {
  console.log('\n🚀 Mesh AI Batch GIF Exporter');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Check dependencies
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch (e) {
    console.error('\n❌ ffmpeg not found. Install with:\n   brew install ffmpeg\n');
    process.exit(1);
  }
  
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    
    for (const config of ANIMATIONS) {
      try {
        const frames = await captureFrames(browser, config);
        await encodeGif(frames, config);
      } catch (e) {
        console.error(`\n✗ Failed: ${config.name}`);
        console.error(`  ${e.message}`);
      }
    }
    
    console.log('\n✅ All GIFs exported to ./gifs/');
    console.log('\nGenerated files:');
    const gifDir = path.join(__dirname, 'gifs');
    if (fs.existsSync(gifDir)) {
      fs.readdirSync(gifDir).forEach(f => {
        const size = (fs.statSync(path.join(gifDir, f)).size / 1024).toFixed(1);
        console.log(`   • ${f} (${size}KB)`);
      });
    }
  } finally {
    if (browser) await browser.close();
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
