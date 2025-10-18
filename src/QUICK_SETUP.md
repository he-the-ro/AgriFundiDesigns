# ⚡ Quick Setup & Deploy

## 🚀 Deploy to GitHub Pages (10 Minutes)

### Step 1: Create GitHub Repo
```bash
# Create new repo on GitHub: https://github.com/new
# Name it: agrifundi
# Make it Public
```

### Step 2: Upload Your Code

**Option A: GitHub Web (No Git Required)**
1. Drag all files to GitHub repo
2. Commit
3. Done!

**Option B: Command Line**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/agrifundi.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Settings → Pages
2. Source: **GitHub Actions**
3. Save

### Step 4: Wait 2 Minutes
- Actions tab → See deployment
- Get URL: `https://YOUR-USERNAME.github.io/agrifundi/`

### Step 5: Test Installation
- Open URL on phone
- "Install app" appears! ✅

**📖 [Full guide](/GITHUB_DEPLOY.md)**

---

## 🎯 Alternative: Netlify Drop (5 Minutes)

**Even easier - no Git needed:**

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag your project folder
3. Get instant URL
4. "Install app" works! ✅

**📖 [Full guide](/DEPLOY_GUIDE.md)**

---

## 📋 Files You Need

Make sure you have:
- ✅ `.github/workflows/deploy.yml` (GitHub Actions)
- ✅ `vite.config.ts` (Build config)
- ✅ `package.json` (Dependencies)
- ✅ `index.html` (Entry point)
- ✅ `src/main.tsx` (React entry)
- ✅ `/public/manifest.json` (PWA manifest)
- ✅ `/public/sw.js` (Service worker)
- ✅ `/public/icons/` (8 SVG icons)
- ✅ All components and styles

**All files are already created for you! Just upload them.**

---

## 🐛 Troubleshooting

### Build Fails?
- Check `package.json` exists
- Verify `vite.config.ts` exists
- Make sure `src/main.tsx` exists

### 404 Error After Deploy?
- Check base path in `vite.config.ts` matches repo name
- Wait 5 minutes for DNS propagation

### Install Button Doesn't Appear?
- **In preview:** Expected (see [PREVIEW_LIMITATION.md](/PREVIEW_LIMITATION.md))
- **After deploy:** Should work! Check HTTPS is enabled

---

## ✅ Success Checklist

- [ ] Code uploaded to GitHub
- [ ] GitHub Actions workflow ran (Actions tab)
- [ ] Site loads at `https://username.github.io/repo-name/`
- [ ] "Install app" appears on Android ✅
- [ ] "Add to Home Screen" works on iOS ✅
- [ ] Service worker registers (DevTools console)

---

## 🎊 Done!

Your AgriFundi PWA is now:
- ✅ Live on the internet
- ✅ Installable on all devices
- ✅ Auto-deploying on every push
- ✅ Free forever

**Share your live URL with your team! 🚀**

---

## 📚 More Help

- **[GITHUB_DEPLOY.md](/GITHUB_DEPLOY.md)** - Detailed GitHub deployment
- **[DEPLOYMENT_OPTIONS.md](/DEPLOYMENT_OPTIONS.md)** - Compare all options
- **[DEPLOY_GUIDE.md](/DEPLOY_GUIDE.md)** - Netlify & Vercel guides
- **[START_HERE.md](/START_HERE.md)** - Complete getting started
