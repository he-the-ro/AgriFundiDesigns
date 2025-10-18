# ⚡ Quick Reference Card

**AgriFundi PWA - Deployment & Usage Quick Reference**

---

## 🎯 I Want To...

### Deploy the App

| Goal | Guide | Time |
|------|-------|------|
| Deploy with GitHub (auto-update) | [GITHUB_DEPLOY.md](/GITHUB_DEPLOY.md) | 10 min |
| Deploy with Netlify (drag & drop) | [DEPLOY_GUIDE.md](/DEPLOY_GUIDE.md) | 5 min |
| Compare all options | [DEPLOYMENT_OPTIONS.md](/DEPLOYMENT_OPTIONS.md) | 2 min |
| Quick setup | [QUICK_SETUP.md](/QUICK_SETUP.md) | 5-10 min |

### Understand the App

| Question | Answer |
|----------|--------|
| First time here? | [FIRST_TIME.md](/FIRST_TIME.md) |
| What do I have? | [SETUP_SUMMARY.md](/SETUP_SUMMARY.md) |
| Why can't I install from preview? | [PREVIEW_LIMITATION.md](/PREVIEW_LIMITATION.md) |
| Is everything ready? | [DEPLOYMENT_COMPLETE.md](/DEPLOYMENT_COMPLETE.md) |

### Access & Install

| Task | Guide |
|------|-------|
| Access on mobile phone | [ACCESS_ON_MOBILE.md](/ACCESS_ON_MOBILE.md) |
| Install as app (after deploy) | [HOW_TO_INSTALL.md](/HOW_TO_INSTALL.md) |
| Quick install steps | [INSTALL_QUICK_GUIDE.md](/INSTALL_QUICK_GUIDE.md) |

### Fix Issues

| Problem | Solution |
|---------|----------|
| Something's not working | [TROUBLESHOOTING.md](/TROUBLESHOOTING.md) |
| Deployment failed | [GITHUB_DEPLOY.md#troubleshooting](/GITHUB_DEPLOY.md) |
| Can't install app | [PREVIEW_LIMITATION.md](/PREVIEW_LIMITATION.md) |

---

## 📋 Common Commands

### GitHub Deployment
```bash
# First deploy
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/agrifundi.git
git push -u origin main

# Updates
git add .
git commit -m "Update"
git push
```

### Local Testing
```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
```

---

## 🌐 URLs After Deployment

### GitHub Pages
```
https://USERNAME.github.io/agrifundi/
```

### Netlify
```
https://SITENAME.netlify.app/
```

### Vercel
```
https://agrifundi.vercel.app/
```

---

## ✅ Pre-Deployment Checklist

Quick check before deploying:

- [ ] All files present
- [ ] `/public/icons/` has 8 SVG files
- [ ] `manifest.json` exists
- [ ] `sw.js` exists
- [ ] `package.json` exists
- [ ] `vite.config.ts` exists

**📖 [Full checklist →](/DEPLOYMENT_CHECKLIST.md)**

---

## 📱 Installation Quick Steps

### After Deploying:

**Android:**
1. Open URL in Chrome
2. Menu (⋮) → "Install app"
3. Done! ✅

**iOS:**
1. Open URL in Safari
2. Share (□↑) → "Add to Home Screen"
3. Done! ✅

**Desktop:**
1. Open URL in Chrome/Edge
2. Click install icon (➕)
3. Done! ✅

---

## 🎯 File Locations

**Important Files:**
- App code: `/App.tsx`
- Components: `/components/`
- Styles: `/styles/globals.css`
- PWA manifest: `/public/manifest.json`
- Service worker: `/public/sw.js`
- Icons: `/public/icons/`
- GitHub Actions: `/.github/workflows/deploy.yml`
- Build config: `/vite.config.ts`

---

## 🚀 Deployment Time Estimates

| Method | Setup | Updates |
|--------|-------|---------|
| GitHub Pages | 10 min | 30 sec |
| Netlify Drop | 5 min | 2 min |
| Netlify Git | 10 min | 30 sec |
| Vercel | 10 min | 30 sec |

---

## 💡 Best Practices

### For Testing:
- Use Netlify Drop (fastest)
- Test on real devices
- Check all screens work

### For Production:
- Use GitHub Pages or Vercel
- Enable auto-deployment
- Add custom domain (optional)
- Monitor deployments

---

## 🆘 Quick Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Can't see "Install app" | Deploy first (not in preview) |
| Build fails | Check `package.json` exists |
| 404 error | Check base path in `vite.config.ts` |
| Icons missing | Check `/public/icons/` uploaded |
| Offline not working | Service worker needs time to cache |

**📖 [Full troubleshooting →](/TROUBLESHOOTING.md)**

---

## 📊 Status Indicators

| Symbol | Meaning |
|--------|---------|
| ✅ | Complete/Working |
| ⏳ | Pending/In Progress |
| ❌ | Not Available/Failed |
| ⚠️ | Warning/Limited |
| 🟢 | Ready/Good |
| 🟡 | Partial/Warning |
| 🔴 | Error/Failed |

---

## 🎊 Success Criteria

Your deployment is successful when:

✅ Live URL accessible  
✅ HTTPS enabled  
✅ "Install app" appears on Android  
✅ "Add to Home Screen" works on iOS  
✅ Offline mode functions  
✅ Service worker active  

---

## 📞 Quick Help

**Confused?** → [START_HERE.md](/START_HERE.md)  
**First time?** → [FIRST_TIME.md](/FIRST_TIME.md)  
**Ready to deploy?** → [DEPLOYMENT_COMPLETE.md](/DEPLOYMENT_COMPLETE.md)  
**Need details?** → [README.md](/README.md)  

---

## 🎯 Most Common Path

**For 90% of users:**

1. Read [DEPLOYMENT_COMPLETE.md](/DEPLOYMENT_COMPLETE.md) (2 min)
2. Choose deployment method (30 sec)
3. Follow [GITHUB_DEPLOY.md](/GITHUB_DEPLOY.md) OR [DEPLOY_GUIDE.md](/DEPLOY_GUIDE.md) (10 min)
4. Test with [DEPLOYMENT_CHECKLIST.md](/DEPLOYMENT_CHECKLIST.md) (5 min)
5. Share URL with team! 🎉

**Total time:** ~15-20 minutes  
**Result:** Live, installable PWA!

---

## 💾 Save This Page

Bookmark this quick reference for fast access to all guides!

**Keyboard shortcut:** Ctrl+D (Windows) or Cmd+D (Mac)

---

**Everything at your fingertips! 🚀**
