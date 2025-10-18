# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## 🚫 Installation Issues

### ❌ "Install app" button doesn't appear on Android

**Symptoms:**
- Opened app on Android Chrome
- No "Install app" in menu (⋮)
- Expected PWA installation

**Causes & Solutions:**

#### 1. You're in Figma Make preview
**Cause:** Preview environments don't support PWA installation  
**Solution:** Deploy to GitHub Pages, Netlify, or Vercel first  
**📖 [Why? →](/PREVIEW_LIMITATION.md)** | **📖 [How to deploy →](/QUICK_SETUP.md)**

#### 2. Not using HTTPS
**Cause:** PWAs require HTTPS  
**Solution:** All deployment options (GitHub Pages, Netlify, Vercel) include free HTTPS ✅

#### 3. Service worker not registered
**Cause:** Service worker failed to load  
**Solution:**
```
1. Open DevTools (F12)
2. Check Console for errors
3. Check Application → Service Workers
4. Verify sw.js is loading
```

#### 4. Already installed
**Cause:** You already installed the app  
**Solution:**
```
1. Uninstall existing app
2. Refresh browser
3. Try again
```

#### 5. Manifest issues
**Cause:** manifest.json not loading or invalid  
**Solution:**
```
1. Check /public/manifest.json exists
2. Open DevTools → Application → Manifest
3. Verify no errors
4. Check start_url and scope paths
```

---

## 🏗️ Build/Deployment Issues

### ❌ GitHub Actions workflow fails

**Symptoms:**
- Red X on Actions tab
- Build fails
- Deployment doesn't complete

**Solutions:**

#### 1. Missing package.json
```
Error: Cannot find package.json
Solution: Make sure package.json is in project root
```

#### 2. Missing dependencies
```
Error: Module not found
Solution: Check package.json includes all dependencies
Run: npm install
```

#### 3. Build errors
```
Error: Build failed
Solution: 
1. Check Actions logs for specific error
2. Verify vite.config.ts exists
3. Ensure all files are committed
```

#### 4. GitHub Pages not enabled
```
Error: No Pages deployment
Solution:
1. Settings → Pages
2. Source: GitHub Actions
3. Save
```

---

### ❌ Site shows 404 after deployment

**Symptoms:**
- Deployment succeeded
- Opening URL shows 404 error
- Site not found

**Solutions:**

#### 1. Wrong base path
**Cause:** vite.config.ts base doesn't match repo name  
**Solution:**
```typescript
// In vite.config.ts
// If repo is: https://github.com/user/agrifundi
// And URL is: https://user.github.io/agrifundi/
const base = '/agrifundi/'; // Must match repo name!
```

#### 2. Wait for DNS propagation
**Cause:** Just deployed, DNS not updated  
**Solution:** Wait 5-10 minutes, try again

#### 3. index.html missing
**Cause:** index.html not in correct location  
**Solution:** Ensure index.html is in project root

---

### ❌ CSS/JavaScript not loading

**Symptoms:**
- Page loads but no styling
- Blank screen
- Console errors about missing files

**Solutions:**

#### 1. Incorrect base path
**Cause:** Assets trying to load from wrong path  
**Solution:**
```typescript
// In vite.config.ts
// Make sure base matches your deployment
const base = '/repo-name/'; // For GitHub Pages
// or
const base = '/'; // For custom domains
```

#### 2. Build output incorrect
**Cause:** Files built to wrong directory  
**Solution:**
```typescript
// In vite.config.ts
build: {
  outDir: 'dist', // Must be 'dist' for GitHub Actions
}
```

---

## 📱 PWA Feature Issues

### ❌ Offline mode doesn't work

**Symptoms:**
- Installed app
- No internet → app doesn't load
- Expected offline support

**Solutions:**

#### 1. Service worker not active
```
Check:
1. DevTools → Application → Service Workers
2. Should show "activated and running"
3. If not, check sw.js loaded correctly
```

#### 2. Cache not populated
```
Cause: First visit, nothing cached yet
Solution: 
1. Open app with internet
2. Navigate around (loads pages)
3. Now works offline ✅
```

#### 3. sw.js not found
```
Cause: Service worker file missing
Solution: Ensure /public/sw.js exists and is deployed
```

---

### ❌ Icons not showing

**Symptoms:**
- App installs
- Default browser icon instead of AgriFundi icon
- Generic PWA icon

**Solutions:**

#### 1. Icons folder missing
```
Cause: /public/icons/ not deployed
Solution: 
1. Verify /public/icons/ exists locally
2. Contains all 8 SVG files (72px to 512px)
3. Commit and redeploy
```

#### 2. Manifest icon paths wrong
```
Cause: manifest.json pointing to wrong paths
Solution: Check manifest.json:
{
  "icons": [
    {
      "src": "/icons/icon-192x192.svg", // Correct path
      ...
    }
  ]
}
```

#### 3. Icons not generated
```
Cause: SVG icons don't exist
Solution: 
1. Check /public/icons/ folder
2. Should have 8 files: icon-72x72.svg through icon-512x512.svg
3. If missing, re-export from Figma Make
```

---

## 🌐 Access Issues

### ❌ Can't access from mobile device

**Symptoms:**
- Deployed successfully
- Can't open on phone
- URL doesn't work

**Solutions:**

#### 1. Using localhost URL
```
Cause: localhost only works on same device
Solution: Use deployed URL instead
- GitHub Pages: https://user.github.io/repo/
- Netlify: https://name.netlify.app/
```

#### 2. Wrong URL
```
Cause: Using preview URL instead of deployed
Solution: Get correct URL:
- GitHub: Check Actions → deployment step
- Netlify: Dashboard shows URL
```

#### 3. Network restrictions
```
Cause: Firewall/network blocking
Solution: Try different network or VPN
```

---

## 💻 Local Development Issues

### ❌ npm install fails

**Solutions:**

#### 1. Node version too old
```
Error: Requires Node 18+
Solution: Update Node.js
Check: node --version
```

#### 2. Package conflicts
```
Error: Conflicting dependencies
Solution:
rm -rf node_modules
rm package-lock.json
npm install
```

---

### ❌ npm run dev fails

**Solutions:**

#### 1. Port already in use
```
Error: Port 3000 in use
Solution: 
1. Kill process on port 3000
2. Or use different port:
   vite --port 3001
```

#### 2. Missing dependencies
```
Error: Cannot find module
Solution: npm install
```

---

## 🔍 Debugging Tips

### Check Build Locally

Before deploying:
```bash
npm install
npm run build
npm run preview
```

If this works locally, deployment should work too!

### Check DevTools

**Console Tab:**
- Service worker registration messages
- Any JavaScript errors
- Network errors

**Application Tab:**
- Manifest loads correctly
- Service worker is activated
- Cache storage populated

**Network Tab:**
- All assets loading (200 status)
- No 404 errors
- Service worker intercepting requests

### Check GitHub Actions Logs

1. Go to Actions tab
2. Click failed workflow
3. Click failed job
4. Read error messages
5. Common issues:
   - Missing files
   - Build errors
   - Wrong paths

---

## 🆘 Still Stuck?

### Gather Information

Before asking for help:

1. **What deployment method?**
   - GitHub Pages
   - Netlify
   - Vercel
   - Other

2. **What's the error?**
   - Copy exact error message
   - Screenshot if visual

3. **Where does it fail?**
   - Build step
   - Deployment step
   - After deployment
   - On specific device

4. **What have you tried?**
   - List troubleshooting steps attempted

### Check Documentation

- **[START_HERE.md](/START_HERE.md)** - Getting started
- **[GITHUB_DEPLOY.md](/GITHUB_DEPLOY.md)** - GitHub deployment
- **[DEPLOY_GUIDE.md](/DEPLOY_GUIDE.md)** - Netlify/Vercel
- **[PREVIEW_LIMITATION.md](/PREVIEW_LIMITATION.md)** - Preview issues
- **[PWA_SETUP.md](/PWA_SETUP.md)** - PWA technical details

---

## ✅ Prevention Checklist

Before deploying:

- [ ] All files present (check [FIRST_TIME.md](/FIRST_TIME.md))
- [ ] `/public/` folder included
- [ ] Icons folder has 8 SVG files
- [ ] `package.json` exists
- [ ] `vite.config.ts` exists
- [ ] `.github/workflows/deploy.yml` exists (for GitHub)
- [ ] Tested locally (`npm run build && npm run preview`)

After deploying:

- [ ] Deployment succeeded (green checkmark)
- [ ] URL accessible
- [ ] Site loads correctly
- [ ] Images display
- [ ] Navigation works
- [ ] Service worker registers
- [ ] Manifest loads
- [ ] Install prompt appears (on deployed URL only!)

---

**Most issues are solved by:**
1. ✅ Deploying instead of using preview
2. ✅ Ensuring all files are uploaded
3. ✅ Checking base path in vite.config.ts
4. ✅ Waiting a few minutes after deployment

**Good luck! 🍀**
