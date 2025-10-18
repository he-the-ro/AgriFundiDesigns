# 🚀 Deploy AgriFundi to GitHub Pages

## ✨ What You'll Get

After deploying to GitHub Pages:
- ✅ **Free hosting** - No cost, forever
- ✅ **Live URL** - `https://username.github.io/agrifundi/`
- ✅ **PWA installation works!** - "Install app" appears on all devices
- ✅ **Auto-updates** - Push code, it auto-deploys
- ✅ **HTTPS included** - Secure by default

---

## 📋 Prerequisites

- GitHub account (free)
- Git installed on your computer
- Basic command line knowledge

**Don't have these?** No worries! See [Netlify Drop guide](/DEPLOY_GUIDE.md) for no-code deployment.

---

## 🚀 Quick Start (5 Steps)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New"** or **"+"** → **"New repository"**
3. Repository name: `agrifundi` (or your choice)
4. Set to **Public** (required for free GitHub Pages)
5. Click **"Create repository"**

### Step 2: Get Your Code Ready

In Figma Make, export all your files:
- Download as ZIP or copy all files to a folder
- Make sure you have ALL files including:
  - `App.tsx`, `package.json`, `vite.config.ts`
  - `/components/` folder
  - `/public/` folder (with icons and manifest)
  - `/styles/` folder
  - `.github/workflows/` folder (GitHub Actions)

### Step 3: Upload to GitHub

**Option A: Using GitHub Web Interface** (Easiest)

1. In your new repository, click **"uploading an existing file"**
2. Drag all your project files/folders
3. Scroll down, add commit message: "Initial commit"
4. Click **"Commit changes"**

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd /path/to/agrifundi

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Connect to GitHub (replace with your username/repo)
git remote add origin https://github.com/YOUR-USERNAME/agrifundi.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll to **"Pages"** in left sidebar
4. Under **"Build and deployment"**:
   - Source: **GitHub Actions** (not "Deploy from branch")
5. Save (if prompted)

### Step 5: Deploy!

The GitHub Action will automatically run:

1. Go to **"Actions"** tab in your repo
2. You'll see the workflow running
3. Wait 2-3 minutes
4. ✅ **Done!** Click the deployment URL

Your app is now live at:
```
https://YOUR-USERNAME.github.io/agrifundi/
```

---

## 🎯 Testing PWA Installation

### On Your Phone:

1. Open `https://YOUR-USERNAME.github.io/agrifundi/` in Chrome/Safari
2. **Android Chrome:**
   - Menu (⋮) → **"Install app"** ✅ **IT APPEARS!**
   - Install and enjoy
3. **iOS Safari:**
   - Share (□↑) → **"Add to Home Screen"** ✅ **WORKS!**
   - Enjoy offline support

### On Desktop:

1. Open the URL in Chrome/Edge
2. Install icon (➕) in address bar ✅ **VISIBLE!**
3. Click to install

---

## ⚙️ Configuration Details

### Files You Need (Already Created):

- **`.github/workflows/deploy.yml`** - Auto-deployment script
- **`vite.config.ts`** - Build configuration
- **`package.json`** - Dependencies
- **`index.html`** - Entry HTML
- **`src/main.tsx`** - React entry point

### Base Path Configuration

The `vite.config.ts` automatically sets the correct base path for GitHub Pages:

```typescript
// For https://username.github.io/repo-name/
const base = `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`;
```

**Using a custom domain?** Change `vite.config.ts`:
```typescript
const base = '/'; // For custom domains
```

---

## 🔧 Customization

### Use a Custom Domain

1. **Buy a domain** (optional, ~$12/year)
2. In repository **Settings** → **Pages**:
   - Add your custom domain
   - Follow DNS setup instructions
3. Update `vite.config.ts`:
   ```typescript
   const base = '/';
   ```
4. Push changes, redeploy
5. Your app is now at `https://yourdomain.com` ✅

### Change Repository Name

If you rename your repo:

1. **Settings** → Change repository name
2. Update `manifest.json` start_url and scope
3. Push changes
4. New URL: `https://username.github.io/NEW-NAME/`

---

## 🐛 Troubleshooting

### Workflow Failed

**Check:**
1. Go to **Actions** tab
2. Click failed workflow
3. Read error messages

**Common fixes:**
- Make sure all files are committed
- Check `package.json` exists
- Verify `vite.config.ts` exists
- Ensure GitHub Pages is enabled

### Site Deploys But Shows 404

**Fix:**
1. Check `vite.config.ts` base path matches repo name
2. Verify files are in `/dist` folder after build
3. Make sure `index.html` is in project root

### CSS/JS Not Loading

**Issue:** Wrong base path

**Fix:**
```typescript
// In vite.config.ts
const base = '/your-repo-name/'; // Must match repo name!
```

### PWA Features Not Working

**Check:**
1. Is it HTTPS? (GitHub Pages = auto HTTPS ✅)
2. Service worker loading? (Open DevTools → Application)
3. manifest.json accessible? (Check Network tab)

**Fix:** Make sure `/public/manifest.json` and `/public/sw.js` are committed.

### Icons Not Showing

**Check:** `/public/icons/` folder has all 8 SVG files:
```
/public/icons/
├── icon-72x72.svg
├── icon-96x96.svg
├── icon-128x128.svg
├── icon-144x144.svg
├── icon-152x152.svg
├── icon-192x192.svg
├── icon-384x384.svg
└── icon-512x512.svg
```

---

## 🔄 Making Updates

### After Initial Deploy:

**Option A: GitHub Web Interface**

1. Go to your repository
2. Navigate to file you want to edit
3. Click ✏️ (Edit) icon
4. Make changes
5. Commit changes
6. **Auto-deploys in 2 minutes!** ✅

**Option B: Git Command Line**

```bash
# Make your changes to files

# Add changes
git add .

# Commit
git commit -m "Update: description of changes"

# Push
git push

# Auto-deploys! ✅
```

Your changes will be live in ~2-3 minutes automatically.

---

## 📊 Monitoring Deployments

### View Deployment Status:

1. **Actions** tab → See all workflows
2. **Environments** → See deployment history
3. **Commits** → Click ✅ or ❌ to see details

### Deployment Logs:

1. **Actions** tab
2. Click on workflow run
3. Click **"build"** or **"deploy"** job
4. See detailed logs

---

## 💡 Pro Tips

### Auto-Deploy on Every Push

Already configured! ✅

Every time you push to `main` branch:
1. GitHub Actions runs
2. Builds your app
3. Deploys to GitHub Pages
4. Updates live site

### Manual Trigger

You can also manually trigger deployment:

1. **Actions** tab
2. Click **"Deploy to GitHub Pages"** workflow
3. **"Run workflow"** → **"Run workflow"**
4. Deploys immediately

### Branch Protection

Protect your main branch:

1. **Settings** → **Branches**
2. Add branch protection rule for `main`
3. Require pull requests before merging
4. Prevent force pushes

### Environment Secrets

Need API keys?

1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
3. Add secret name and value
4. Use in workflow:
   ```yaml
   env:
     API_KEY: ${{ secrets.API_KEY }}
   ```

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Repository created on GitHub
- [ ] All files uploaded (especially `/public/` and `.github/workflows/`)
- [ ] GitHub Pages enabled (Settings → Pages → GitHub Actions)
- [ ] Workflow ran successfully (Actions tab shows ✅)
- [ ] Site accessible at `https://username.github.io/repo-name/`
- [ ] App loads correctly
- [ ] Images display
- [ ] Navigation works
- [ ] **"Install app" appears on Android Chrome** ✅
- [ ] **"Add to Home Screen" works on iOS** ✅
- [ ] Desktop install works ✅
- [ ] Service worker registers (check DevTools console)
- [ ] Offline mode functions

---

## 📈 Comparison: GitHub Pages vs Other Options

| Feature | GitHub Pages | Netlify | Vercel |
|---------|--------------|---------|--------|
| **Cost** | Free | Free | Free |
| **Setup** | Medium | Easy | Medium |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Build Minutes** | 2000/month | 300/month | Unlimited |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Best For** | Open source | Quick tests | Production |

**Recommendation:**
- **Just testing?** → Netlify Drop (easiest)
- **Using Git?** → GitHub Pages (this guide)
- **Production app?** → Vercel or Netlify

---

## 🎊 You're Live!

**Congratulations!** Your AgriFundi PWA is now deployed and installable!

### Share with your team:

```
🎉 AgriFundi is now live!

🌐 URL: https://YOUR-USERNAME.github.io/agrifundi/

📱 Install on Android:
1. Open URL in Chrome
2. Menu (⋮) → "Install app"
3. Enjoy offline access!

📱 Install on iOS:
1. Open URL in Safari
2. Share (□↑) → "Add to Home Screen"
3. Enjoy!

💻 Install on Desktop:
1. Open URL in Chrome/Edge
2. Click install icon (➕) in address bar
3. Launch like a native app!
```

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 🆘 Still Need Help?

### Can't push to GitHub?
- Install [GitHub Desktop](https://desktop.github.com/) (visual Git client)
- Or use Netlify Drop instead (no Git needed)

### Workflow not running?
- Check **Settings** → **Actions** → **General**
- Enable "Allow all actions and reusable workflows"

### Want simpler deployment?
- See [DEPLOY_GUIDE.md](/DEPLOY_GUIDE.md) for Netlify Drop (drag & drop, no Git)

---

**Time Required:** 10-15 minutes first time, 30 seconds for updates  
**Cost:** $0  
**Result:** Live PWA with installation working everywhere! 🎉

---

## 🎯 Next Steps After Deployment

1. ✅ **Test installation** on multiple devices
2. ✅ **Share URL** with team
3. ✅ **Set up custom domain** (optional)
4. ✅ **Monitor** deployment status
5. ✅ **Make updates** and watch auto-deploy

**Your PWA is production-ready! 🚀**
