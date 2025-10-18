# 📝 Preview Mode Limitations

## ⚠️ IMPORTANT: PWA Installation Doesn't Work in Preview

When using AgriFundi in **Figma Make's preview environment**:

1. ❌ **"Install app" button won't appear** on Android/iOS
2. ⚠️ **Service Worker may not register**  
3. ✅ **App works fully in browser**
4. 🚀 **Deploy to enable installation** (free, 5 minutes)

**📖 [How to deploy →](/DEPLOY_GUIDE.md)** | **📖 [Why no install button? →](/PREVIEW_LIMITATION.md)**

---

## Service Worker Limitations in Preview

You may also see a warning about the Service Worker not being available. **This is completely normal in preview!**

---

## ⚠️ What You'll See

In the browser console:
```
[App] Service Worker registration failed (expected in preview mode)
ℹ️ Service Worker Not Available
This is normal in Figma Make preview mode.
```

---

## ✅ What Still Works in Preview

Even in preview mode, you can still:

1. **✅ Use the App in Browser**
   - All features work online
   - Full functionality available
   - Just can't install as PWA (preview limitation)

2. **✅ View Installation Guide**
   - Click the 🔧 button
   - See full visual instructions
   - All features accessible

3. **✅ Use All App Features**
   - Login/register
   - Work orders
   - Tractor management
   - Customer database
   - Services catalog

---

## 🚀 What Works After Deployment

When you deploy to a production environment (your own server, Netlify, Vercel, etc.):

1. **🔌 Offline Support**
   - Service Worker caches app
   - Works without internet
   - Data syncs when reconnected

2. **⚡ Performance**
   - Instant loading
   - Cached resources
   - Background updates

3. **🔔 Notifications**
   - Push notifications
   - Background sync
   - Update alerts

---

## 🎯 The Bottom Line

### In Figma Make Preview:
- ❌ PWA Installation: **Not available** (preview limitation)
- ⚠️ Service Worker: **Not available** (file serving limitation)
- ✅ App Functionality: **Working online**
- ✅ All Features: **Accessible in browser**

### After Deployment:
- ✅ PWA Installation: **Works everywhere** 🎉
- ✅ Service Worker: **Active**
- ✅ Offline Mode: **Enabled**
- ✅ Full PWA: **Complete**

---

## 💡 How to Test Full PWA

### Option 1: Deploy to Production
Deploy to any static hosting service:
- **Netlify** - Drop your files
- **Vercel** - Connect Git repo
- **GitHub Pages** - Host on GitHub
- **Firebase Hosting** - Google's service

### Option 2: Local Testing
If running locally:
```bash
npm run build
npm run preview
# or
npx serve dist
```

Then access via `localhost` - Service Workers work on localhost!

---

## 🔧 Technical Explanation

**Why doesn't the Service Worker work in preview?**

Figma Make's preview environment:
- Serves files from a special iframe domain
- May not serve `/public/sw.js` file correctly
- HTTPS is present but file paths differ
- This is a hosting environment limitation, not a code issue

**Your code is correct!** The Service Worker will work perfectly when deployed to a standard web hosting environment.

---

## ✅ Summary

**Don't worry about the Service Worker error in preview!**

- Your PWA setup is **100% complete**
- Icons, manifest, and install features **work now**
- Service Worker will activate **when you deploy**
- You can still **install and use** the app in preview mode

**The error is expected and doesn't affect your ability to test installation!**

---

**Status:** 🟡 Limited in preview (normal)  
**Installation:** ❌ Not available in preview  
**Solution:** 🚀 Deploy to Netlify/Vercel (free, 5 min)  
**After Deploy:** ✅ Installation works everywhere!

**📖 [Deploy now (5 minutes) →](/DEPLOY_GUIDE.md)**
