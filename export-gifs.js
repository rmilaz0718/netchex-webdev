const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Animation configs
const animations = [
  { file: '01-hero-light.html', name: 'mesh-ai-hero-light', width: 600, height: 600, fps: 24 },
  { file: '02-hero-dark.html', name: 'mesh-ai-hero-dark', width: 600, height: 600, fps: 24 },
  { file: '03-agents-all.html', name: 'mesh-ai-agents-all', width: 800, height: 500, fps: 24 },
  { file: '04-agent-penny.html', name: 'mesh-ai-agent-penny', width: 600, height: 600, fps: 24 },
  { file: '05-agent-riley.html', name: 'mesh-ai-agent-riley', width: 600, height: 600, fps: 24 },
  { file: '06-agent-milo.html', name: 'mesh-ai-agent-milo', width: 600, height: 600, fps: 24 },
  { file: '07-agent-sierra.html', name: 'mesh-ai-agent-sierra', width: 600, height: 600, fps: 24 },
  { file: '08-agent-dakota.html', name: 'mesh-ai-agent-dakota', width: 600, height: 600, fps: 24 },
  { file: '09-agent-alex.html', name: 'mesh-ai-agent-alex', width: 600, height: 600, fps: 24 },
];

async function captureAnimation(browser, htmlFile, config) {
  console.log(`📹 Capturing ${config.name}...`);
  
  const page = await browser.newPage();
  await page.setViewport({ width: config.width, height: config.height });
  
  const filePath = path.join(__dirname, htmlFile);
  const fileUrl = `file://${filePath}`;
  
  await page.goto(fileUrl, { waitUntil: 'networkidle2' });
  
  // Wait for animation to initialize
  await page.waitForFunction(() => window.MeshGIF !== undefined, { timeout: 5000 });
  
  // Get animation duration from the page
  const duration = await page.evaluate(() => {
    // Try to extract duration from animation config
    return window.animationDuration || 2600; // default 2.6s
  });
  
  const frameCount = Math.ceil((duration / 1000) * config.fps);
  const frames = [];
  
  // Capture frames
  for (let i = 0; i < frameCount; i++) {
    const progress = i / frameCount;
    const currentTime = progress * duration;
    
    // Set animation time
    await page.evaluate((time) => {
      if (window.setAnimationTime) {
        window.setAnimationTime(time);
      }
    }, currentTime);
    
    // Capture screenshot
    const screenshot = await page.screenshot({ encoding: 'binary' });
    frames.push(screenshot);
    
    process.stdout.write(`\r  Frame ${i + 1}/${frameCount}`);
  }
  
  console.log(`\n✓ Captured ${frameCount} frames`);
  
  await page.close();
  return frames;
}

async function encodeGif(frames, config) {
  console.log(`🎬 Encoding GIF: ${config.name}.gif`);
  
  // Use ffmpeg to create GIF
  const tmpDir = path.join(__dirname, '.tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  
  // Write frames to temp directory
  for (let i = 0; i < frames.length; i++) {
    fs.writeFileSync(path.join(tmpDir, `frame${String(i).padStart(4, '0')}.png`), frames[i]);
  }
  
  const outputDir = path.join(__dirname, 'gifs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  
  const outputPath = path.join(outputDir, `${config.name}.gif`);
  const framerate = config.fps;
  
  // Create GIF with ffmpeg
  const cmd = `ffmpeg -y -framerate ${framerate} -pattern_type glob -i '${tmpDir}/frame*.png' -c:v gif -vf "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${outputPath}`;
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`✓ Saved: ${outputPath}`);
  } catch (e) {
    console.error(`✗ ffmpeg failed. Install with: brew install ffmpeg`);
    throw e;
  }
  
  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });
}

async function main() {
  console.log('🚀 Mesh AI GIF Batch Exporter\n');
  
  const browser = await puppeteer.launch();
  
  for (const config of animations) {
    try {
      const frames = await captureAnimation(browser, config.file, config);
      await encodeGif(frames, config);
      console.log('');
    } catch (e) {
      console.error(`✗ Failed to export ${config.name}:`, e.message);
    }
  }
  
  await browser.close();
  console.log('✅ All GIFs exported to ./gifs/');
}

main().catch(console.error);
