# Push Mesh AI Animations to GitHub Pages

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Name it: `mesh-ai-animations`
3. Description: "Mesh AI animation library with transparent background exports"
4. Choose **Public** (required for GitHub Pages)
5. Check "Add a README file"
6. Click **Create repository**

## Step 2: Initialize Git & Push

Copy and paste these commands into your terminal (one at a time):

```bash
cd ~/Documents/Claude\ Workspace/mesh-ai-animations

git init
git add .
git commit -m "Initial commit: 9 animations + dependencies"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mesh-ai-animations.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Enable GitHub Pages

1. Go to your repo: `https://github.com/YOUR-USERNAME/mesh-ai-animations`
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**

Wait 1-2 minutes. Your animations will be live at:
```
https://YOUR-USERNAME.github.io/mesh-ai-animations/
```

## Step 4: Test the Animations

Visit:
- https://YOUR-USERNAME.github.io/mesh-ai-animations/ (main index)
- https://YOUR-USERNAME.github.io/mesh-ai-animations/01-hero-light.html
- https://YOUR-USERNAME.github.io/mesh-ai-animations/03-agents-all.html
- etc.

## Troubleshooting

**"fatal: not a git repository"**
- Make sure you `cd` into the `mesh-ai-animations` folder first

**Pages not showing up**
- Wait 2-3 minutes
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check repo Settings > Pages to confirm it's enabled

**Animations load but don't play**
- Check browser console (F12) for errors
- Verify all .js files are in the same folder as the .html files

---

Once live, I'll create a batch GIF generator script to export all 9 as high-quality GIFs with transparent backgrounds.
