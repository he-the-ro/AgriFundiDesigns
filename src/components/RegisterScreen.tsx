import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Eye, EyeOff, ArrowLeft, Phone, User, Lock, UserPlus } from "lucide-react";

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegister: () => void;
}

export function RegisterScreen({ onNavigateToLogin, onRegister }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Register attempt:", formData);
      onRegister();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto overflow-auto relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blurs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/18 rounded-full blur-3xl translate-y-1/2" />
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />
        
        {/* Geometric patterns */}
        <div className="absolute top-24 left-8 w-28 h-28 border-2 border-primary/20 rounded-full" />
        <div className="absolute bottom-40 right-10 w-20 h-20 border-2 border-accent/20 rotate-45" />
        <div className="absolute top-1/2 left-12 w-16 h-16 border-2 border-primary/15 rounded-lg -rotate-12" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            linear-gradient(rgba(243, 177, 78, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(243, 177, 78, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px'
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
            Back
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
        <div className="flex-1 px-6 py-4 pb-8">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h1 className="mb-2">Create Account</h1>
            <p className="text-muted-foreground">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className={errors.phoneNumber ? "border-destructive pl-11" : "pl-11"}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-destructive text-sm">{errors.phoneNumber}</p>
              )}
            </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-destructive pl-11" : "pl-11"}
                />
              </div>
              {errors.firstName && (
                <p className="text-destructive text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-destructive pl-11" : "pl-11"}
                />
              </div>
              {errors.lastName && (
                <p className="text-destructive text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">Other</Label>
              </div>
            </RadioGroup>
            {errors.gender && (
              <p className="text-destructive text-sm">{errors.gender}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
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

          <div className="pt-4 space-y-4">
            <Button type="submit" className="w-full h-12 shadow-lg shadow-primary/20">
              Create Account
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-primary hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
