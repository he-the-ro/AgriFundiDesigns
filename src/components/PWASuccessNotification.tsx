import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function PWASuccessNotification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show notification once on first load
    const hasSeenNotification = localStorage.getItem("pwa-icons-notification");
    if (!hasSeenNotification) {
      setTimeout(() => setShow(true), 2000);
      localStorage.setItem("pwa-icons-notification", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
      >
        <div className="bg-accent border-2 border-accent rounded-2xl shadow-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-foreground/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-accent-foreground">PWA Icons Ready! 🎉</h3>
              <p className="text-sm text-accent-foreground/80 mt-1">
                All 8 icons generated. Your app is ready to install!
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="w-8 h-8 rounded-full hover:bg-accent-foreground/10 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-accent-foreground" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
