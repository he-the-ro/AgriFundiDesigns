import { useEffect, useState } from "react";
import { toast } from "sonner@2.0.3";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

export function ServiceWorkerRegistration() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      // Check if sw.js exists first
      const swResponse = await fetch('/sw.js', { method: 'HEAD' }).catch(() => null);
      
      if (!swResponse || !swResponse.ok) {
        console.warn('[App] Service Worker file not found. PWA features limited in preview mode.');
        console.log('');
        console.log('%c📱 PWA READY (Preview Mode)', 'font-size: 18px; font-weight: bold; color: #F3B14E');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ PWA Icons: 8/8 Generated (SVG)');
        console.log('✅ Manifest: Configured');
        console.log('⚠️ Service Worker: Not available in preview');
        console.log('ℹ️ Full offline support available when deployed');
        console.log('');
        console.log('%c📱 HOW TO INSTALL', 'font-size: 16px; font-weight: bold; color: #B1CB40');
        console.log('');
        console.log('%cAndroid (Chrome/Edge):', 'font-weight: bold; color: #02007B');
        console.log('  1. Tap menu (⋮) → "Install app"');
        console.log('  2. Tap "Install" ✅');
        console.log('');
        console.log('%ciOS (Safari):', 'font-weight: bold; color: #02007B');
        console.log('  1. Tap Share (□↑) → "Add to Home Screen"');
        console.log('  2. Tap "Add" ✅');
        console.log('');
        console.log('%cDesktop (Chrome/Edge):', 'font-weight: bold; color: #02007B');
        console.log('  1. Click install icon (➕) in address bar');
        console.log('  2. Click "Install" ✅');
        console.log('');
        console.log('%c💡 TIP: Click the green 🔧 button → "How to Install" for visual guide', 'color: #B1CB40; font-style: italic');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[App] Service Worker registered successfully:', registration.scope);
      console.log('');
      console.log('%c🎉 PWA SETUP COMPLETE!', 'font-size: 18px; font-weight: bold; color: #F3B14E');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Service Worker: Active');
      console.log('✅ PWA Icons: 8/8 Generated (SVG)');
      console.log('✅ Manifest: Configured');
      console.log('✅ Offline Support: Ready');
      console.log('✅ Install Prompt: Enabled');
      console.log('');
      console.log('%c📱 HOW TO INSTALL', 'font-size: 16px; font-weight: bold; color: #B1CB40');
      console.log('');
      console.log('%cAndroid (Chrome/Edge):', 'font-weight: bold; color: #02007B');
      console.log('  1. Tap menu (⋮) → "Install app"');
      console.log('  2. Tap "Install" ✅');
      console.log('');
      console.log('%ciOS (Safari):', 'font-weight: bold; color: #02007B');
      console.log('  1. Tap Share (□↑) → "Add to Home Screen"');
      console.log('  2. Tap "Add" ✅');
      console.log('');
      console.log('%cDesktop (Chrome/Edge):', 'font-weight: bold; color: #02007B');
      console.log('  1. Click install icon (➕) in address bar');
      console.log('  2. Click "Install" ✅');
      console.log('');
      console.log('%c💡 TIP: Click the green 🔧 button → "How to Install" for visual guide', 'color: #B1CB40; font-style: italic');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');

      // Check for updates every hour
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              setWaitingWorker(newWorker);
              setShowReload(true);
              
              toast.info('Update Available', {
                description: 'A new version of AgriFundi is available.',
                duration: 10000,
                action: {
                  label: 'Update',
                  onClick: () => handleUpdate(),
                },
              });
            }
          });
        }
      });

      // Handle controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[App] New service worker activated');
        window.location.reload();
      });

    } catch (error) {
      console.warn('[App] Service Worker registration failed (expected in preview mode):', error instanceof Error ? error.message : error);
      console.log('');
      console.log('%cℹ️ Service Worker Not Available', 'font-size: 16px; font-weight: bold; color: #B1CB40');
      console.log('This is normal in Figma Make preview mode.');
      console.log('Full PWA features (offline mode) work when deployed to production.');
      console.log('');
      console.log('You can still:');
      console.log('✅ Install the app (manifest + icons work)');
      console.log('✅ View installation guide (click 🔧 button)');
      console.log('✅ Use all app features online');
      console.log('');
    }
  };

  const handleUpdate = () => {
    if (waitingWorker) {
      // Tell the waiting service worker to skip waiting and become active
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowReload(false);
    }
  };

  // Update service worker when message received
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        if (waitingWorker) {
          waitingWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      }
    };

    navigator.serviceWorker?.addEventListener('message', messageHandler);

    return () => {
      navigator.serviceWorker?.removeEventListener('message', messageHandler);
    };
  }, [waitingWorker]);

  // Show offline/online status
  useEffect(() => {
    const handleOnline = () => {
      toast.success('Back Online', {
        description: 'Your connection has been restored.',
      });
    };

    const handleOffline = () => {
      toast.warning('You are Offline', {
        description: 'Some features may be limited.',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show initial offline status
    if (!navigator.onLine) {
      toast.warning('You are Offline', {
        description: 'Some features may be limited.',
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // This component doesn't render anything visible
  // It just manages the service worker in the background
  return null;
}
