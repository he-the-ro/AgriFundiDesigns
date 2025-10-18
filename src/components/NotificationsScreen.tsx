import { ArrowLeft, Bell, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col size-full">
        {/* Header */}
        <div className="pt-6 pb-4 px-6 bg-background border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h2 className="text-foreground">Notifications</h2>
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
            <Bell className="w-16 h-16 text-primary relative z-10" />
            <Sparkles className="w-6 h-6 text-accent absolute top-4 right-4 animate-pulse" />
          </div>

          <h2 className="text-foreground mb-3 text-center">Coming Soon!</h2>
          
          <p className="text-muted-foreground text-center mb-6 max-w-sm">
            We're working hard to bring you real-time notifications for:
          </p>

          <div className="w-full max-w-sm space-y-3 mb-8">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <h4 className="text-foreground text-sm mb-1">Work Order Updates</h4>
                <p className="text-xs text-muted-foreground">Get notified when work orders are assigned or updated</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-accent mt-2" />
              <div className="flex-1">
                <h4 className="text-foreground text-sm mb-1">Maintenance Reminders</h4>
                <p className="text-xs text-muted-foreground">Never miss a scheduled maintenance task</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
              <div className="flex-1">
                <h4 className="text-foreground text-sm mb-1">Customer Messages</h4>
                <p className="text-xs text-muted-foreground">Stay connected with your customers</p>
              </div>
            </div>
          </div>

          <Button onClick={onBack} className="gap-2 shadow-lg">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
