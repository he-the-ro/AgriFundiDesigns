import { useState } from "react";
import { Settings, X, Wrench, Image, BarChart3, FileText, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

interface DevMenuProps {
  onNavigateToIconGenerator?: () => void;
  onNavigateToInstallGuide?: () => void;
}

export function DevMenu({ onNavigateToIconGenerator, onNavigateToInstallGuide }: DevMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconGenerator = () => {
    setIsOpen(false);
    if (onNavigateToIconGenerator) {
      onNavigateToIconGenerator();
    }
  };

  const handleInstallGuide = () => {
    setIsOpen(false);
    if (onNavigateToInstallGuide) {
      onNavigateToInstallGuide();
    }
  };

  return (
    <>
      {/* Floating Dev Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Developer Tools"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-accent-foreground" />
        ) : (
          <Wrench className="w-6 h-6 text-accent-foreground" />
        )}
      </button>

      {/* Dev Menu Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="bg-secondary p-4">
            <h3 className="text-secondary-foreground">🛠️ Developer Tools</h3>
            <p className="text-secondary-foreground/70 text-sm mt-1">
              PWA Setup & Icons
            </p>
          </div>

          <div className="p-2 max-h-96 overflow-y-auto">
            {/* Installation Guide - Featured */}
            <button
              onClick={handleInstallGuide}
              className="w-full flex items-start gap-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors text-left mb-2 border-2 border-accent/30"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground">📱 How to Install</div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  Step-by-step guide for all devices
                </div>
              </div>
            </button>

            {/* Icon Generator - Internal Navigation */}
            <button
              onClick={handleIconGenerator}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground">Icon Generator</div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  View generated PWA icons
                </div>
              </div>
            </button>

            {/* Documentation Links */}
            <a
              href="https://github.com/yourusername/agrifundi/blob/main/PWA_SETUP.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground">PWA Setup Guide</div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  Complete documentation
                </div>
              </div>
            </a>

            <a
              href="https://github.com/yourusername/agrifundi/blob/main/ICON_GENERATION_GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground">Icon Guide</div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  Icon generation help
                </div>
              </div>
            </a>
          </div>

          <div className="p-4 bg-accent/10 border-t border-accent/20">
            <div className="text-center">
              <p className="text-sm mb-1">
                <span className="text-accent">✅</span> <strong className="text-foreground">PWA Complete!</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                All 8 icons generated • Ready to install
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
