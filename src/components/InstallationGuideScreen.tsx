import { ArrowLeft, Smartphone, Monitor, Chrome, Download, Share2, MoreVertical, Home, CheckCircle2, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function InstallationGuideScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary text-secondary-foreground">
      {/* Header */}
      <div className="bg-secondary/80 backdrop-blur-sm border-b border-secondary-foreground/10 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-primary">Installation Guide</h1>
            <p className="text-sm text-secondary-foreground/70">
              Install AgriFundi on your device
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {/* Preview Warning Banner */}
        <div className="bg-destructive/10 border-2 border-destructive/30 rounded-xl p-5 mb-6">
          <div className="flex gap-3">
            <div className="text-3xl flex-shrink-0">⚠️</div>
            <div className="flex-1">
              <h3 className="text-destructive mb-2">Installation Not Available in Preview Mode</h3>
              <p className="text-sm text-foreground/80 mb-3">
                <strong>You won't see "Install app"</strong> when viewing this in Figma Make's preview. 
                This is normal! Preview environments don't support PWA installation.
              </p>
              <div className="bg-card/50 rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong className="text-foreground">To enable installation:</strong>
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>• Deploy to Netlify, Vercel, or GitHub Pages (free)</li>
                  <li>• Takes 5 minutes</li>
                  <li>• Then "Install app" will appear on all devices!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-primary via-primary to-accent rounded-2xl p-6 mb-6 text-center">
          <div className="text-6xl mb-3">📱</div>
          <h2 className="text-primary-foreground text-2xl mb-2">Install as Native App</h2>
          <p className="text-primary-foreground/90 mb-3">
            Get the full app experience with offline access, push notifications, and home screen icon
          </p>
          <p className="text-xs text-primary-foreground/70 italic">
            (Instructions below work on deployed apps)
          </p>
        </div>

        {/* Platform Tabs */}
        <Tabs defaultValue="android" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="android" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Android
            </TabsTrigger>
            <TabsTrigger value="ios" className="gap-2">
              <Smartphone className="w-4 h-4" />
              iOS
            </TabsTrigger>
            <TabsTrigger value="desktop" className="gap-2">
              <Monitor className="w-4 h-4" />
              Desktop
            </TabsTrigger>
          </TabsList>

          {/* Android Instructions */}
          <TabsContent value="android" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Chrome className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground">Chrome / Edge (Android)</h3>
                  <p className="text-sm text-muted-foreground">Recommended</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Open the Menu</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Tap the three dots <MoreVertical className="w-4 h-4 inline" /> in the top-right corner of your browser
                    </p>
                    <div className="bg-muted rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <MoreVertical className="w-5 h-5" />
                        <span>Menu button</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Tap "Install app"</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Look for "Install app" or "Add to Home screen" option
                    </p>
                    <div className="bg-muted rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Download className="w-5 h-5" />
                        <span>Install app</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Confirm Installation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Tap "Install" in the popup dialog
                    </p>
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                          </div>
                          <div>
                            <div className="text-foreground">AgriFundi</div>
                            <div className="text-xs text-muted-foreground">Install app?</div>
                          </div>
                        </div>
                        <Button size="sm" className="h-8">Install</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Done! 🎉</h4>
                    <p className="text-sm text-muted-foreground">
                      AgriFundi is now installed on your home screen. Open it like any other app!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Browser */}
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <h4 className="text-foreground mb-2">Samsung Internet</h4>
              <p className="text-sm text-muted-foreground">
                Tap Menu → Add page to → Home screen
              </p>
            </div>
          </TabsContent>

          {/* iOS Instructions */}
          <TabsContent value="ios" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground">Safari (iPhone/iPad)</h3>
                  <p className="text-sm text-muted-foreground">iOS 16.4 or later</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Tap the Share Button</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Look for the <Share2 className="w-4 h-4 inline" /> share icon at the bottom of Safari
                    </p>
                    <div className="bg-muted rounded-lg p-3 border border-border">
                      <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                        <Share2 className="w-5 h-5" />
                        <span>Share button</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Scroll and Find "Add to Home Screen"</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Scroll down the share menu to find this option
                    </p>
                    <div className="bg-muted rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Home className="w-5 h-5" />
                        <span>Add to Home Screen</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Tap "Add"</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Confirm the name and tap "Add" in the top-right corner
                    </p>
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                          </div>
                          <div className="text-foreground">AgriFundi</div>
                        </div>
                        <Button size="sm" className="h-8">Add</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">All Set! 🎉</h4>
                    <p className="text-sm text-muted-foreground">
                      Look for the AgriFundi icon on your home screen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> Currently, iOS only supports PWA installation through Safari. Chrome and Firefox on iOS do not support PWA installation.
              </p>
            </div>
          </TabsContent>

          {/* Desktop Instructions */}
          <TabsContent value="desktop" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Chrome className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground">Chrome / Edge (Desktop)</h3>
                  <p className="text-sm text-muted-foreground">Windows, Mac, Linux, ChromeOS</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Look for the Install Icon</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Find the install icon (➕ or <Download className="w-4 h-4 inline" />) in the address bar
                    </p>
                    <div className="bg-muted rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex-1 bg-background rounded px-3 py-2 text-muted-foreground">
                          https://agrifundi.app
                        </div>
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                          <Download className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-foreground">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">Click "Install"</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Click the install icon and then click "Install" in the popup
                    </p>
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                          </div>
                          <div>
                            <div className="text-foreground">Install AgriFundi?</div>
                            <div className="text-xs text-muted-foreground">This site can be installed as an app</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Cancel</Button>
                        <Button size="sm">Install</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">App Installed! 🎉</h4>
                    <p className="text-sm text-muted-foreground">
                      AgriFundi opens in its own window. Find it in your Start Menu (Windows), Applications folder (Mac), or app drawer (ChromeOS).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Method */}
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <h4 className="text-foreground mb-2">Alternative: Use Menu</h4>
              <p className="text-sm text-muted-foreground mb-1">
                Chrome: Menu (⋮) → "Install AgriFundi..."
              </p>
              <p className="text-sm text-muted-foreground">
                Edge: Menu (⋯) → "Apps" → "Install this site as an app"
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Benefits Section */}
        <div className="mt-8 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-2xl p-6 border border-accent/20">
          <h3 className="text-foreground mb-4">✨ Why Install?</h3>
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h4 className="text-foreground">Works Offline</h4>
                <p className="text-sm text-muted-foreground">Access your work orders and data even without internet</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h4 className="text-foreground">Faster Performance</h4>
                <p className="text-sm text-muted-foreground">Instant loading from your device storage</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h4 className="text-foreground">Native App Feel</h4>
                <p className="text-sm text-muted-foreground">Full-screen mode, no browser UI distractions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h4 className="text-foreground">Quick Access</h4>
                <p className="text-sm text-muted-foreground">Launch directly from home screen or taskbar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mt-6 bg-muted/30 rounded-xl p-4 border border-border">
          <h4 className="text-foreground mb-2">🔧 Don't see the install option?</h4>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
            <li>Make sure you're using a supported browser (Chrome, Edge, Safari on iOS 16.4+)</li>
            <li>The site must be loaded over HTTPS (or localhost for testing)</li>
            <li>Try refreshing the page or clearing browser cache</li>
            <li>Some browsers hide the install prompt if the app is already installed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
