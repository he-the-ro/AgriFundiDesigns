import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, Phone, Lock, LogIn } from "lucide-react";

interface LoginScreenProps {
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
  onLogin: () => void;
}

export function LoginScreen({ onNavigateToRegister, onNavigateToForgotPassword, onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ phoneNumber?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { phoneNumber?: string; password?: string } = {};
    
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would normally call your authentication API
      console.log("Login attempt:", { phoneNumber, password });
      onLogin();
    }
  };

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl translate-y-1/2" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/12 rounded-full blur-2xl" />
        
        {/* Geometric patterns */}
        <div className="absolute top-20 right-8 w-32 h-32 border-2 border-primary/20 rounded-2xl rotate-12" />
        <div className="absolute bottom-32 left-12 w-24 h-24 border-2 border-accent/20 rounded-full" />
        <div className="absolute top-1/2 right-16 w-16 h-16 border-2 border-secondary/15 rotate-45" />
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(243, 177, 78, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col size-full">
        {/* Header */}
        <div className="pt-12 pb-6 px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary shadow-xl border-4 border-primary/20 mb-4">
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

        {/* Content */}
        <div className="flex-1 px-6 py-6 flex flex-col">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="space-y-5 mb-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={errors.phoneNumber ? "border-destructive pl-11" : "pl-11"}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-destructive text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? "border-destructive pl-11 pr-11" : "pl-11 pr-11"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-primary text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <Button type="submit" className="w-full h-12 shadow-lg shadow-primary/20">
                Sign In
              </Button>

              <div className="text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
