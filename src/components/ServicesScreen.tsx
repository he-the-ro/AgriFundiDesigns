import { useState } from "react";
import { ArrowLeft, Wrench, Calendar, CheckCircle2, Clock, Banknote, Settings, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Service {
  id: string;
  name: string;
  category: "maintenance" | "repair" | "diagnostic" | "emergency";
  description: string;
  duration: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const services: Service[] = [
  {
    id: "SV-001",
    name: "Standard Oil Change",
    category: "maintenance",
    description: "Complete engine oil and filter replacement with multi-point inspection",
    duration: "1-2 hours",
    price: "KES 8,000 - 12,000",
    features: [
      "Engine oil replacement",
      "Oil filter replacement",
      "Visual inspection of belts & hoses",
      "Fluid level check",
      "Tire pressure check",
    ],
    popular: true,
  },
  {
    id: "SV-002",
    name: "500-Hour Service",
    category: "maintenance",
    description: "Comprehensive maintenance package for 500-hour service interval",
    duration: "3-4 hours",
    price: "KES 18,000 - 25,000",
    features: [
      "All standard oil change items",
      "Air filter replacement",
      "Fuel filter replacement",
      "Hydraulic fluid check",
      "Brake system inspection",
      "Electrical system check",
    ],
    popular: true,
  },
  {
    id: "SV-003",
    name: "Annual Inspection",
    category: "maintenance",
    description: "Complete annual safety and performance inspection",
    duration: "2-3 hours",
    price: "KES 12,000 - 18,000",
    features: [
      "Complete safety inspection",
      "Performance diagnostics",
      "Fluid analysis",
      "Wear assessment",
      "Detailed inspection report",
    ],
  },
  {
    id: "SV-004",
    name: "Hydraulic System Repair",
    category: "repair",
    description: "Diagnosis and repair of hydraulic system issues",
    duration: "4-8 hours",
    price: "KES 20,000 - 50,000",
    features: [
      "Hydraulic system diagnosis",
      "Leak detection & repair",
      "Pump & cylinder service",
      "Seal replacement",
      "System pressure testing",
    ],
  },
  {
    id: "SV-005",
    name: "Engine Diagnostics",
    category: "diagnostic",
    description: "Advanced computer diagnostics and troubleshooting",
    duration: "1-2 hours",
    price: "KES 5,000 - 8,000",
    features: [
      "Computer diagnostics scan",
      "Error code analysis",
      "Performance testing",
      "Detailed diagnostic report",
      "Repair recommendations",
    ],
    popular: true,
  },
  {
    id: "SV-006",
    name: "Transmission Service",
    category: "maintenance",
    description: "Complete transmission fluid and filter service",
    duration: "2-3 hours",
    price: "KES 15,000 - 22,000",
    features: [
      "Transmission fluid replacement",
      "Filter replacement",
      "Pan gasket replacement",
      "Shift quality inspection",
      "Road test",
    ],
  },
  {
    id: "SV-007",
    name: "Brake System Service",
    category: "repair",
    description: "Complete brake inspection, adjustment, and repair",
    duration: "2-4 hours",
    price: "KES 12,000 - 30,000",
    features: [
      "Brake pad inspection",
      "Rotor/drum measurement",
      "Brake fluid check",
      "Adjustment & calibration",
      "Test drive",
    ],
  },
  {
    id: "SV-008",
    name: "Emergency Repair",
    category: "emergency",
    description: "Priority emergency repair service with fast response",
    duration: "Variable",
    price: "KES 10,000+",
    features: [
      "Priority service",
      "Fast response time",
      "On-site diagnosis",
      "Emergency repairs",
      "24/7 availability",
    ],
  },
  {
    id: "SV-009",
    name: "Electrical System Repair",
    category: "repair",
    description: "Diagnosis and repair of electrical system issues",
    duration: "2-6 hours",
    price: "KES 8,000 - 35,000",
    features: [
      "Electrical system diagnosis",
      "Wiring repair",
      "Battery testing",
      "Alternator service",
      "Starter motor service",
    ],
  },
  {
    id: "SV-010",
    name: "Cooling System Service",
    category: "maintenance",
    description: "Complete cooling system flush and service",
    duration: "1-2 hours",
    price: "KES 10,000 - 15,000",
    features: [
      "Coolant flush",
      "Thermostat inspection",
      "Radiator pressure test",
      "Hose inspection",
      "Fan operation check",
    ],
  },
];

interface ServicesScreenProps {
  onBack: () => void;
}

export function ServicesScreen({ onBack }: ServicesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Services", icon: Wrench },
    { value: "maintenance", label: "Maintenance", icon: Settings },
    { value: "repair", label: "Repairs", icon: Wrench },
    { value: "diagnostic", label: "Diagnostics", icon: Zap },
    { value: "emergency", label: "Emergency", icon: Clock },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const getCategoryColor = (category: Service["category"]) => {
    switch (category) {
      case "maintenance":
        return "bg-accent/10 text-accent border-accent/20";
      case "repair":
        return "bg-primary/10 text-primary border-primary/20";
      case "diagnostic":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "emergency":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getCategoryLabel = (category: Service["category"]) => {
    switch (category) {
      case "maintenance":
        return "Maintenance";
      case "repair":
        return "Repair";
      case "diagnostic":
        return "Diagnostic";
      case "emergency":
        return "Emergency";
    }
  };

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col size-full">
        {/* Header */}
        <div className="pt-6 pb-4 px-6 bg-background border-b border-border sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h2 className="text-foreground">Services</h2>
              <p className="text-muted-foreground text-sm">
                {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} available
              </p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services List */}
        <div className="flex-1 overflow-auto px-6 py-6">
          {filteredServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Wrench className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-foreground mb-2">No services found</h3>
              <p className="text-muted-foreground text-sm">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-foreground">{service.name}</h3>
                        {service.popular && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getCategoryColor(service.category)} text-xs mb-3`}
                      >
                        {getCategoryLabel(service.category)}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm text-foreground">{service.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="text-sm text-foreground">{service.price}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-muted-foreground">What's included:</p>
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Service
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
