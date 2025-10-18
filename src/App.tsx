import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WelcomeSlide } from "./components/WelcomeSlide";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { HomeScreen } from "./components/HomeScreen";
import { WorkOrdersScreen } from "./components/WorkOrdersScreen";
import { WorkOrderDetailsScreen } from "./components/WorkOrderDetailsScreen";
import { TractorsScreen } from "./components/TractorsScreen";
import { TractorDetailsScreen } from "./components/TractorDetailsScreen";
import { CustomersScreen } from "./components/CustomersScreen";
import { CustomerDetailsScreen } from "./components/CustomerDetailsScreen";
import { ServicesScreen } from "./components/ServicesScreen";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { IconGeneratorScreen } from "./components/IconGeneratorScreen";
import { InstallationGuideScreen } from "./components/InstallationGuideScreen";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { ServiceWorkerRegistration } from "./components/ServiceWorkerRegistration";
import { PWASuccessNotification } from "./components/PWASuccessNotification";
import { DevMenu } from "./components/DevMenu";
import { Button } from "./components/ui/button";
import { ChevronRight } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1665152998573-9ddafb89278f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlcXVpcG1lbnQlMjBleGNhdmF0b3J8ZW58MXx8fHwxNzYwNjc2MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Manage Your Equipment",
    description: "Track service schedules, maintenance history, and equipment status all in one place.",
  },
  {
    image: "https://images.unsplash.com/photo-1740240993282-6f3b51bd8314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMG1hY2hpbmVyeSUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc2MDY3NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Quick Diagnostics",
    description: "Access technical manuals, wiring diagrams, and troubleshooting guides on the go.",
  },
  {
    image: "https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWludGVuYW5jZSUyMGNoZWNrbGlzdCUyMGNsaXBib2FyZHxlbnwxfHx8fDE3NjA2Nzc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Smart Work Orders",
    description: "Create, update, and complete service tickets with photos, parts used, and time tracking.",
  },
];

type Screen = "welcome" | "login" | "register" | "forgot-password" | "home" | "work-orders" | "work-order-details" | "tractors" | "tractor-details" | "customers" | "customer-details" | "services" | "notifications" | "profile" | "icon-generator" | "install-guide";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string>("");
  const [selectedTractorId, setSelectedTractorId] = useState<string>("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const handleLogin = () => {
    setCurrentScreen("home");
  };

  const handleRegister = () => {
    setCurrentScreen("home");
  };

  const handleViewWorkOrderDetails = (workOrderId: string) => {
    setSelectedWorkOrderId(workOrderId);
    setCurrentScreen("work-order-details");
  };

  const handleWorkOrderStatusUpdate = (id: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Work Order ${id} status updated to: ${newStatus}`);
  };

  const handleViewTractorDetails = (tractorId: string) => {
    setSelectedTractorId(tractorId);
    setCurrentScreen("tractor-details");
  };

  const handleViewCustomerDetails = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentScreen("customer-details");
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isLastSlide = currentSlide === slides.length - 1;

  // Add manifest link to document head
  useEffect(() => {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add theme color meta tags
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = '#F3B14E';
    document.head.appendChild(themeColorMeta);

    const appleMobileWebAppCapable = document.createElement('meta');
    appleMobileWebAppCapable.name = 'apple-mobile-web-app-capable';
    appleMobileWebAppCapable.content = 'yes';
    document.head.appendChild(appleMobileWebAppCapable);

    const appleMobileWebAppStatusBar = document.createElement('meta');
    appleMobileWebAppStatusBar.name = 'apple-mobile-web-app-status-bar-style';
    appleMobileWebAppStatusBar.content = 'black-translucent';
    document.head.appendChild(appleMobileWebAppStatusBar);

    const appleMobileWebAppTitle = document.createElement('meta');
    appleMobileWebAppTitle.name = 'apple-mobile-web-app-title';
    appleMobileWebAppTitle.content = 'AgriFundi';
    document.head.appendChild(appleMobileWebAppTitle);

    // Add apple touch icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = '/icons/icon-192x192.svg';
    document.head.appendChild(appleTouchIcon);

    return () => {
      document.head.removeChild(manifestLink);
      document.head.removeChild(themeColorMeta);
      document.head.removeChild(appleMobileWebAppCapable);
      document.head.removeChild(appleMobileWebAppStatusBar);
      document.head.removeChild(appleMobileWebAppTitle);
      document.head.removeChild(appleTouchIcon);
    };
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Render different screens based on current state
  if (currentScreen === "home") {
    return (
      <>
        <ServiceWorkerRegistration />
        <PWAInstallPrompt />
        <PWASuccessNotification />
        <DevMenu 
          onNavigateToIconGenerator={() => setCurrentScreen("icon-generator")}
          onNavigateToInstallGuide={() => setCurrentScreen("install-guide")}
        />
        <Toaster />
        <HomeScreen
          onNavigateToWorkOrders={() => setCurrentScreen("work-orders")}
          onNavigateToTractors={() => setCurrentScreen("tractors")}
          onNavigateToCustomers={() => setCurrentScreen("customers")}
          onNavigateToServices={() => setCurrentScreen("services")}
          onNavigateToNotifications={() => setCurrentScreen("notifications")}
          onNavigateToProfile={() => setCurrentScreen("profile")}
          onViewWorkOrderDetails={handleViewWorkOrderDetails}
        />
      </>
    );
  }

  if (currentScreen === "work-orders") {
    return (
      <WorkOrdersScreen
        onBack={() => setCurrentScreen("home")}
        onViewDetails={handleViewWorkOrderDetails}
      />
    );
  }

  if (currentScreen === "work-order-details") {
    return (
      <WorkOrderDetailsScreen
        workOrderId={selectedWorkOrderId}
        onBack={() => setCurrentScreen("work-orders")}
        onStatusUpdate={handleWorkOrderStatusUpdate}
      />
    );
  }

  if (currentScreen === "tractors") {
    return (
      <TractorsScreen
        onBack={() => setCurrentScreen("home")}
        onViewDetails={handleViewTractorDetails}
      />
    );
  }

  if (currentScreen === "tractor-details") {
    return (
      <TractorDetailsScreen
        tractorId={selectedTractorId}
        onBack={() => setCurrentScreen("tractors")}
      />
    );
  }

  if (currentScreen === "customers") {
    return (
      <CustomersScreen
        onBack={() => setCurrentScreen("home")}
        onViewDetails={handleViewCustomerDetails}
      />
    );
  }

  if (currentScreen === "customer-details") {
    return (
      <CustomerDetailsScreen
        customerId={selectedCustomerId}
        onBack={() => setCurrentScreen("customers")}
      />
    );
  }

  if (currentScreen === "services") {
    return <ServicesScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "notifications") {
    return <NotificationsScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "profile") {
    return <ProfileScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "icon-generator") {
    return <IconGeneratorScreen onBack={() => setCurrentScreen("welcome")} />;
  }

  if (currentScreen === "install-guide") {
    return <InstallationGuideScreen onBack={() => setCurrentScreen("welcome")} />;
  }

  if (currentScreen === "login") {
    return (
      <LoginScreen
        onNavigateToRegister={() => setCurrentScreen("register")}
        onNavigateToForgotPassword={() => setCurrentScreen("forgot-password")}
        onLogin={handleLogin}
      />
    );
  }

  if (currentScreen === "register") {
    return (
      <RegisterScreen
        onNavigateToLogin={() => setCurrentScreen("login")}
        onRegister={handleRegister}
      />
    );
  }

  if (currentScreen === "forgot-password") {
    return (
      <ForgotPasswordScreen
        onNavigateToLogin={() => setCurrentScreen("login")}
      />
    );
  }

  // Welcome carousel screen
  return (
    <>
      <DevMenu 
        onNavigateToIconGenerator={() => setCurrentScreen("icon-generator")}
        onNavigateToInstallGuide={() => setCurrentScreen("install-guide")}
      />
      <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col size-full">
        {/* Logo/Brand area */}
        <div className="pt-10 pb-4 px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary shadow-xl border-4 border-primary/20 mb-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-11 h-11 text-primary-foreground"
            >
              <path d="M14 7h6m0 0v6m0-6L10 17M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="brand-name text-secondary">AgriFundi</div>
        </div>

        <div className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              
              if (swipe < -10000 && currentSlide < slides.length - 1) {
                handleNext();
              } else if (swipe > 10000 && currentSlide > 0) {
                handlePrevious();
              }
            }}
          >
            <WelcomeSlide
              image={slides[currentSlide].image}
              title={slides[currentSlide].title}
              description={slides[currentSlide].description}
            />
          </motion.div>
        </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-6 pb-8">
          {/* Install Guide Link */}
          {isLastSlide && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setCurrentScreen("install-guide")}
              className="w-full bg-accent/10 border-2 border-accent/30 rounded-xl p-3 flex items-center gap-3 hover:bg-accent/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📱</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-foreground">Install as App</div>
                <div className="text-xs text-muted-foreground">Get the full native experience</div>
              </div>
              <ChevronRight className="w-5 h-5 text-accent" />
            </motion.button>
          )}

          {/* Dots indicator */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full ${
                  index === currentSlide
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                animate={{
                  width: index === currentSlide ? 32 : 8,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="w-full flex gap-3">
            {!isLastSlide ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentScreen("login")}
                  className="flex-1"
                >
                  Skip
                </Button>
                <Button onClick={handleNext} className="flex-1 gap-2 shadow-lg shadow-primary/20">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button onClick={() => setCurrentScreen("login")} className="w-full h-12 shadow-lg shadow-primary/20">
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
