import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Eye, EyeOff, ArrowLeft, Check, KeyRound, Phone, Lock, ShieldCheck } from "lucide-react";

interface ForgotPasswordScreenProps {
  onNavigateToLogin: () => void;
}

type Step = "validate" | "otp" | "reset" | "success";

export function ForgotPasswordScreen({ onNavigateToLogin }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<Step>("validate");
  const [contactInfo, setContactInfo] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateContact = () => {
    const newErrors: Record<string, string> = {};
    
    if (!contactInfo) {
      newErrors.contactInfo = "Phone number or email is required";
    } else if (
      !/^\+?[\d\s-()]+$/.test(contactInfo) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo)
    ) {
      newErrors.contactInfo = "Please enter a valid phone number or email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors: Record<string, string> = {};
    
    if (otp.length !== 6) {
      newErrors.otp = "Please enter the complete 6-digit code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordReset = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContact()) {
      console.log("Sending OTP to:", contactInfo);
      setStep("otp");
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateOTP()) {
      console.log("Verifying OTP:", otp);
      setStep("reset");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordReset()) {
      console.log("Resetting password");
      setStep("success");
    }
  };

  const handleResendOTP = () => {
    console.log("Resending OTP to:", contactInfo);
    setOtp("");
  };

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blurs */}
        <div className="absolute top-0 left-1/2 w-88 h-88 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-secondary/12 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/12 rounded-full blur-2xl" />
        
        {/* Geometric patterns */}
        <div className="absolute top-28 right-12 w-24 h-24 border-2 border-primary/20 rounded-xl rotate-45" />
        <div className="absolute bottom-36 left-8 w-32 h-32 border-2 border-secondary/15 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-primary/20 -rotate-12" />
        
        {/* Diagonal line pattern overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 18px,
            rgba(243, 177, 78, 0.05) 18px,
            rgba(243, 177, 78, 0.05) 36px
          )`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col size-full">
        {/* Header */}
        <div className="pt-8 pb-4 px-6">
          <button
            onClick={onNavigateToLogin}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
          <div className="text-center">
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
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 flex flex-col">
          {step === "validate" && (
            <>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <KeyRound className="w-8 h-8 text-primary" />
                </div>
                <h1 className="mb-2">Forgot Password?</h1>
                <p className="text-muted-foreground">
                  Enter your phone number or email to receive a verification code
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="flex-1 flex flex-col">
                <div className="space-y-2 mb-6">
                  <Label htmlFor="contact">Phone Number or Email</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="contact"
                      type="text"
                      placeholder="+254 712 345 678"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className={errors.contactInfo ? "border-destructive pl-11" : "pl-11"}
                    />
                  </div>
                  {errors.contactInfo && (
                    <p className="text-destructive text-sm">{errors.contactInfo}</p>
                  )}
                </div>

                <div className="mt-auto">
                  <Button type="submit" className="w-full h-12 shadow-lg shadow-primary/20">
                    Send Verification Code
                  </Button>
                </div>
              </form>
            </>
          )}

        {step === "otp" && (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h1 className="mb-2">Enter Code</h1>
              <p className="text-muted-foreground">
                We've sent a 6-digit code to {contactInfo}
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="flex-1 flex flex-col">
              <div className="space-y-2 mb-6">
                <Label>Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {errors.otp && (
                  <p className="text-destructive text-sm text-center">{errors.otp}</p>
                )}
              </div>

              <div className="text-center mb-6">
                <span className="text-muted-foreground">Didn't receive the code? </span>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-primary hover:underline"
                >
                  Resend
                </button>
              </div>

              <div className="mt-auto">
                <Button type="submit" className="w-full h-12 shadow-lg shadow-primary/20">
                  Verify Code
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="mb-2">Reset Password</h1>
              <p className="text-muted-foreground">Enter your new password</p>
            </div>

            <form onSubmit={handleResetPassword} className="flex-1 flex flex-col">
              <div className="space-y-5 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={errors.newPassword ? "border-destructive pl-11 pr-11" : "pl-11 pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-destructive text-sm">{errors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={errors.confirmPassword ? "border-destructive pl-11 pr-11" : "pl-11 pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                <Button type="submit" className="w-full h-12 shadow-lg shadow-primary/20">
                  Reset Password
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent shadow-xl border-4 border-accent/20 mb-6">
              <Check className="w-12 h-12 text-accent-foreground" />
            </div>
            
            <h1 className="mb-2">Password Reset Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>

            <Button onClick={onNavigateToLogin} className="w-full h-12 shadow-lg shadow-primary/20">
              Back to Login
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
