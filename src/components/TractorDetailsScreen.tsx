import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  ArrowLeft,
  Truck,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Wrench,
  Star,
  MessageSquare,
  User,
  Clock,
  FileText,
} from "lucide-react";

interface ServiceRecord {
  id: string;
  date: string;
  serviceType: string;
  description: string;
  technicianName: string;
  ownerAtTime: string;
  status: "completed" | "re-inspected";
  rating: number;
  customerComment?: string;
  reInspectionComment?: string;
  partsReplaced: string[];
  hoursAtService: number;
  cost: string;
}

interface TractorDetails {
  id: string;
  model: string;
  make: string;
  serialNumber: string;
  year: number;
  currentCustomer: string;
  status: "operational" | "in-service" | "needs-attention";
  lastService: string;
  nextService: string;
  hoursUsed: number;
  location: string;
  specifications: {
    engineType: string;
    horsePower: string;
    transmission: string;
    fuelCapacity: string;
  };
  serviceHistory: ServiceRecord[];
}

// Mock data for demonstration
const tractorData: Record<string, TractorDetails> = {
  "TR-001": {
    id: "TR-001",
    model: "5075E",
    make: "John Deere",
    serialNumber: "1LV5075EXFH123456",
    year: 2022,
    currentCustomer: "Green Valley Farm",
    status: "in-service",
    lastService: "2025-10-16",
    nextService: "2025-11-16",
    hoursUsed: 1245,
    location: "Nakuru",
    specifications: {
      engineType: "4-Cylinder Diesel",
      horsePower: "75 HP",
      transmission: "12F/12R PowrReverser",
      fuelCapacity: "76 L",
    },
    serviceHistory: [
      {
        id: "SRV-001",
        date: "2025-10-16",
        serviceType: "Scheduled Maintenance",
        description: "Oil change, filter replacement, general inspection",
        technicianName: "John Mwangi",
        ownerAtTime: "Green Valley Farm",
        status: "re-inspected",
        rating: 5,
        customerComment: "Excellent service! Tractor is running much smoother now. John was very professional and thorough.",
        reInspectionComment: "Re-inspection completed. All systems functioning perfectly. Customer very satisfied with the service quality.",
        partsReplaced: ["Engine Oil Filter", "Air Filter", "Fuel Filter"],
        hoursAtService: 1200,
        cost: "KES 12,500",
      },
      {
        id: "SRV-002",
        date: "2025-08-10",
        serviceType: "Hydraulic System Repair",
        description: "Fixed hydraulic leak, replaced seals",
        technicianName: "Peter Kariuki",
        ownerAtTime: "Green Valley Farm",
        status: "completed",
        rating: 4,
        customerComment: "Good work on the hydraulic system. Minor delay in getting parts but overall satisfied.",
        partsReplaced: ["Hydraulic Seals Kit", "Hydraulic Fluid"],
        hoursAtService: 980,
        cost: "KES 18,750",
      },
      {
        id: "SRV-003",
        date: "2025-05-22",
        serviceType: "Scheduled Maintenance",
        description: "200-hour service interval maintenance",
        technicianName: "John Mwangi",
        ownerAtTime: "Green Valley Farm",
        status: "completed",
        rating: 5,
        customerComment: "Always reliable service. Tractor performs excellently after each maintenance.",
        partsReplaced: ["Engine Oil Filter", "Air Filter"],
        hoursAtService: 800,
        cost: "KES 9,800",
      },
      {
        id: "SRV-004",
        date: "2024-12-15",
        serviceType: "Transmission Service",
        description: "Transmission oil change and inspection",
        technicianName: "James Omondi",
        ownerAtTime: "Riverside Ranch",
        status: "re-inspected",
        rating: 5,
        customerComment: "Transmission shifts much better now. Very professional team.",
        reInspectionComment: "Follow-up inspection confirmed smooth transmission operation. No issues detected.",
        partsReplaced: ["Transmission Oil", "Transmission Filter"],
        hoursAtService: 520,
        cost: "KES 15,200",
      },
      {
        id: "SRV-005",
        date: "2024-09-08",
        serviceType: "Electrical System Repair",
        description: "Battery replacement, alternator check",
        technicianName: "Peter Kariuki",
        ownerAtTime: "Riverside Ranch",
        status: "completed",
        rating: 4,
        customerComment: "Fixed the starting issue. Good diagnostic skills.",
        partsReplaced: ["12V Battery", "Battery Cables"],
        hoursAtService: 310,
        cost: "KES 8,500",
      },
    ],
  },
  "TR-002": {
    id: "TR-002",
    model: "4708",
    make: "Massey Ferguson",
    serialNumber: "MF4708-2024-789012",
    year: 2023,
    currentCustomer: "Sunrise Agriculture",
    status: "needs-attention",
    lastService: "2025-09-20",
    nextService: "2025-10-20",
    hoursUsed: 890,
    location: "Eldoret",
    specifications: {
      engineType: "3-Cylinder Diesel",
      horsePower: "80 HP",
      transmission: "8F/8R Synchromesh",
      fuelCapacity: "68 L",
    },
    serviceHistory: [
      {
        id: "SRV-006",
        date: "2025-09-20",
        serviceType: "Engine Diagnostics",
        description: "Engine overheating diagnosis and cooling system check",
        technicianName: "John Mwangi",
        ownerAtTime: "Sunrise Agriculture",
        status: "completed",
        rating: 3,
        customerComment: "Issue partially resolved. Still monitoring the temperature gauge.",
        partsReplaced: ["Coolant", "Radiator Cap"],
        hoursAtService: 870,
        cost: "KES 6,500",
      },
      {
        id: "SRV-007",
        date: "2025-06-12",
        serviceType: "Scheduled Maintenance",
        description: "Regular service and inspection",
        technicianName: "Peter Kariuki",
        ownerAtTime: "Sunrise Agriculture",
        status: "re-inspected",
        rating: 5,
        customerComment: "Perfect service as always. Tractor running great!",
        reInspectionComment: "All systems checked and confirmed operational. Excellent maintenance results.",
        partsReplaced: ["Engine Oil Filter", "Air Filter", "Fuel Filter"],
        hoursAtService: 650,
        cost: "KES 11,200",
      },
    ],
  },
  "TR-003": {
    id: "TR-003",
    model: "T4.75",
    make: "New Holland",
    serialNumber: "NH-T475-2023-456789",
    year: 2023,
    currentCustomer: "Riverside Ranch",
    status: "in-service",
    lastService: "2025-10-17",
    nextService: "2025-11-17",
    hoursUsed: 567,
    location: "Naivasha",
    specifications: {
      engineType: "4-Cylinder Diesel",
      horsePower: "75 HP",
      transmission: "16F/16R PowerShuttle",
      fuelCapacity: "82 L",
    },
    serviceHistory: [
      {
        id: "SRV-008",
        date: "2025-10-17",
        serviceType: "Scheduled Maintenance",
        description: "Regular maintenance and lubrication",
        technicianName: "James Omondi",
        ownerAtTime: "Riverside Ranch",
        status: "completed",
        rating: 5,
        customerComment: "Quick and efficient service. No complaints.",
        partsReplaced: ["Engine Oil Filter", "Air Filter"],
        hoursAtService: 550,
        cost: "KES 10,200",
      },
      {
        id: "SRV-009",
        date: "2025-07-25",
        serviceType: "Brake System Service",
        description: "Brake inspection and adjustment",
        technicianName: "Peter Kariuki",
        ownerAtTime: "Riverside Ranch",
        status: "re-inspected",
        rating: 4,
        customerComment: "Brakes working better now. Good service.",
        reInspectionComment: "Brake system tested and confirmed safe for operation.",
        partsReplaced: ["Brake Pads", "Brake Fluid"],
        hoursAtService: 380,
        cost: "KES 13,500",
      },
    ],
  },
  "TR-004": {
    id: "TR-004",
    model: "6130M",
    make: "John Deere",
    serialNumber: "1LV6130MXGH234567",
    year: 2021,
    currentCustomer: "Highland Estates",
    status: "operational",
    lastService: "2025-09-28",
    nextService: "2025-11-28",
    hoursUsed: 2134,
    location: "Nanyuki",
    specifications: {
      engineType: "6-Cylinder Diesel",
      horsePower: "130 HP",
      transmission: "AutoPowr CVT",
      fuelCapacity: "227 L",
    },
    serviceHistory: [
      {
        id: "SRV-010",
        date: "2025-09-28",
        serviceType: "500-Hour Service",
        description: "Major service interval maintenance",
        technicianName: "John Mwangi",
        ownerAtTime: "Highland Estates",
        status: "re-inspected",
        rating: 5,
        customerComment: "Thorough inspection and service. Very satisfied with the work done.",
        reInspectionComment: "All major components inspected and certified. Excellent condition.",
        partsReplaced: ["Engine Oil Filter", "Air Filter", "Fuel Filter", "Hydraulic Filter"],
        hoursAtService: 2100,
        cost: "KES 22,800",
      },
      {
        id: "SRV-011",
        date: "2025-04-15",
        serviceType: "Scheduled Maintenance",
        description: "Regular service and inspection",
        technicianName: "James Omondi",
        ownerAtTime: "Highland Estates",
        status: "completed",
        rating: 5,
        customerComment: "Professional service as always.",
        partsReplaced: ["Engine Oil Filter", "Air Filter"],
        hoursAtService: 1850,
        cost: "KES 14,500",
      },
    ],
  },
  "TR-005": {
    id: "TR-005",
    model: "5710",
    make: "Massey Ferguson",
    serialNumber: "MF5710-2022-345678",
    year: 2022,
    currentCustomer: "Golden Harvest Co.",
    status: "operational",
    lastService: "2025-10-05",
    nextService: "2025-12-05",
    hoursUsed: 1678,
    location: "Kitale",
    specifications: {
      engineType: "4-Cylinder Diesel",
      horsePower: "110 HP",
      transmission: "12F/12R Dyna-4",
      fuelCapacity: "155 L",
    },
    serviceHistory: [
      {
        id: "SRV-012",
        date: "2025-10-05",
        serviceType: "Scheduled Maintenance",
        description: "Oil change and general inspection",
        technicianName: "Peter Kariuki",
        ownerAtTime: "Golden Harvest Co.",
        status: "completed",
        rating: 4,
        customerComment: "Good service. Tractor running smoothly.",
        partsReplaced: ["Engine Oil Filter", "Air Filter", "Fuel Filter"],
        hoursAtService: 1650,
        cost: "KES 11,900",
      },
    ],
  },
  "TR-006": {
    id: "TR-006",
    model: "T6.180",
    make: "New Holland",
    serialNumber: "NH-T6180-2024-567890",
    year: 2024,
    currentCustomer: "Valley View Farms",
    status: "operational",
    lastService: "2025-10-10",
    nextService: "2025-12-10",
    hoursUsed: 345,
    location: "Meru",
    specifications: {
      engineType: "6-Cylinder Diesel",
      horsePower: "180 HP",
      transmission: "19F/6R AutoCommand CVT",
      fuelCapacity: "300 L",
    },
    serviceHistory: [
      {
        id: "SRV-013",
        date: "2025-10-10",
        serviceType: "First Service",
        description: "Initial break-in service for new tractor",
        technicianName: "John Mwangi",
        ownerAtTime: "Valley View Farms",
        status: "re-inspected",
        rating: 5,
        customerComment: "Excellent first service. Very happy with the new tractor!",
        reInspectionComment: "New tractor performing excellently. All systems optimal.",
        partsReplaced: ["Engine Oil Filter"],
        hoursAtService: 300,
        cost: "KES 8,000",
      },
    ],
  },
  "TR-007": {
    id: "TR-007",
    model: "7230R",
    make: "John Deere",
    serialNumber: "1LV7230RXJH345678",
    year: 2020,
    currentCustomer: "Savanna Agriculture",
    status: "needs-attention",
    lastService: "2025-09-15",
    nextService: "2025-10-15",
    hoursUsed: 3456,
    location: "Nakuru",
    specifications: {
      engineType: "6-Cylinder Diesel Turbo",
      horsePower: "230 HP",
      transmission: "e23 PowerShift",
      fuelCapacity: "476 L",
    },
    serviceHistory: [
      {
        id: "SRV-014",
        date: "2025-09-15",
        serviceType: "Major Repair",
        description: "Turbocharger replacement and engine diagnostics",
        technicianName: "James Omondi",
        ownerAtTime: "Savanna Agriculture",
        status: "completed",
        rating: 3,
        customerComment: "Repair took longer than expected but issue seems resolved. Will monitor performance.",
        partsReplaced: ["Turbocharger", "Oil Seals", "Air Filter"],
        hoursAtService: 3420,
        cost: "KES 45,600",
      },
      {
        id: "SRV-015",
        date: "2025-06-20",
        serviceType: "Scheduled Maintenance",
        description: "Regular high-hour maintenance",
        technicianName: "John Mwangi",
        ownerAtTime: "Savanna Agriculture",
        status: "re-inspected",
        rating: 4,
        customerComment: "Good service on this high-hour machine.",
        reInspectionComment: "Given the age and hours, tractor in acceptable condition. Recommended monitoring.",
        partsReplaced: ["Engine Oil Filter", "Air Filter", "Fuel Filter", "Hydraulic Filter"],
        hoursAtService: 3200,
        cost: "KES 18,900",
      },
    ],
  },
  "TR-008": {
    id: "TR-008",
    model: "6713",
    make: "Massey Ferguson",
    serialNumber: "MF6713-2023-678901",
    year: 2023,
    currentCustomer: "Green Valley Farm",
    status: "operational",
    lastService: "2025-10-12",
    nextService: "2025-12-12",
    hoursUsed: 789,
    location: "Nakuru",
    specifications: {
      engineType: "4-Cylinder Diesel",
      horsePower: "130 HP",
      transmission: "32F/32R Dyna-6",
      fuelCapacity: "200 L",
    },
    serviceHistory: [
      {
        id: "SRV-016",
        date: "2025-10-12",
        serviceType: "Scheduled Maintenance",
        description: "Oil change, filter replacement, general inspection",
        technicianName: "Peter Kariuki",
        ownerAtTime: "Green Valley Farm",
        status: "re-inspected",
        rating: 5,
        customerComment: "Great service! Tractor performs perfectly after maintenance.",
        reInspectionComment: "All systems functioning optimally. No issues detected.",
        partsReplaced: ["Engine Oil Filter", "Air Filter", "Fuel Filter"],
        hoursAtService: 750,
        cost: "KES 12,300",
      },
      {
        id: "SRV-017",
        date: "2025-07-08",
        serviceType: "Scheduled Maintenance",
        description: "Regular service",
        technicianName: "James Omondi",
        ownerAtTime: "Green Valley Farm",
        status: "completed",
        rating: 5,
        customerComment: "Excellent work. Very reliable technician.",
        partsReplaced: ["Engine Oil Filter", "Air Filter"],
        hoursAtService: 520,
        cost: "KES 9,500",
      },
    ],
  },
};

interface TractorDetailsScreenProps {
  tractorId: string | null;
  onBack: () => void;
}

export function TractorDetailsScreen({ tractorId, onBack }: TractorDetailsScreenProps) {
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);

  if (!tractorId || !tractorData[tractorId]) {
    return (
      <div className="size-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Tractor not found</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const tractor = tractorData[tractorId];

  const getStatusColor = (status: typeof tractor.status) => {
    switch (status) {
      case "operational":
        return "bg-accent/10 text-accent border-accent/20";
      case "in-service":
        return "bg-primary/10 text-primary border-primary/20";
      case "needs-attention":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getStatusLabel = (status: typeof tractor.status) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "in-service":
        return "In Service";
      case "needs-attention":
        return "Needs Attention";
    }
  };

  const getStatusIcon = (status: typeof tractor.status) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "in-service":
        return <Wrench className="w-3 h-3 mr-1" />;
      case "needs-attention":
        return <AlertCircle className="w-3 h-3 mr-1" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
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
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h2 className="text-foreground">Tractor Details</h2>
              <p className="text-muted-foreground text-sm">{tractor.id}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-6 py-6 space-y-6 pb-8">
            {/* Main Info Card */}
            <Card className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">
                    {tractor.make} {tractor.model}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Serial: {tractor.serialNumber}
                  </p>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(tractor.status)} text-xs`}
                  >
                    {getStatusIcon(tractor.status)}
                    {getStatusLabel(tractor.status)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Owner:</span>
                  <span className="text-foreground">{tractor.currentCustomer}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{tractor.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Mfg. Year:</span>
                  <span className="text-foreground">{tractor.year}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Engine Hours:</span>
                  <span className="text-foreground">
                    {tractor.hoursUsed.toLocaleString()}h
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last Service:
                  </span>
                  <span className="text-foreground">{formatDate(tractor.lastService)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Next Service:
                  </span>
                  <span className="text-foreground">{formatDate(tractor.nextService)}</span>
                </div>
              </div>
            </Card>

            {/* Specifications Card */}
            <Card className="p-4">
              <h4 className="text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Specifications
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Engine Type:</span>
                  <span className="text-foreground">{tractor.specifications.engineType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Horse Power:</span>
                  <span className="text-foreground">{tractor.specifications.horsePower}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Transmission:</span>
                  <span className="text-foreground">{tractor.specifications.transmission}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fuel Capacity:</span>
                  <span className="text-foreground">{tractor.specifications.fuelCapacity}</span>
                </div>
              </div>
            </Card>

            {/* Service History */}
            <div>
              <h4 className="text-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" />
                Service History ({tractor.serviceHistory.length})
              </h4>

              <div className="space-y-3">
                {tractor.serviceHistory.map((service) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="text-foreground mb-1">{service.serviceType}</h5>
                        <p className="text-xs text-muted-foreground mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(service.date)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {service.hoursAtService.toLocaleString()}h
                          </div>
                        </div>
                      </div>
                      {service.status === "re-inspected" && (
                        <Badge
                          variant="outline"
                          className="bg-accent/10 text-accent border-accent/20 text-xs"
                        >
                          Re-inspected
                        </Badge>
                      )}
                    </div>

                    <Separator className="my-3" />

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Technician:</span>
                        <span className="text-foreground">{service.technicianName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Owner at Service:</span>
                        <span className="text-foreground">{service.ownerAtTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cost:</span>
                        <span className="text-foreground">{service.cost}</span>
                      </div>
                    </div>

                    {service.partsReplaced.length > 0 && (
                      <>
                        <Separator className="my-3" />
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-2">Parts Replaced:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.partsReplaced.map((part, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-muted/50 text-xs"
                              >
                                {part}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Customer Rating:</p>
                        {renderStars(service.rating)}
                      </div>
                      {(service.customerComment || service.reInspectionComment) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedService(service)}
                          className="text-primary hover:text-primary/80 text-xs gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          View Comments
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Dialog */}
      <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Service Comments</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Customer Feedback</p>
                    <div className="flex items-center gap-2">
                      {renderStars(selectedService.rating)}
                      <span className="text-xs text-muted-foreground">
                        {formatDate(selectedService.date)}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedService.customerComment && (
                  <Card className="p-3 bg-muted/30">
                    <p className="text-sm text-foreground">{selectedService.customerComment}</p>
                  </Card>
                )}
              </div>

              {selectedService.reInspectionComment && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Re-Inspection Notes</p>
                        <p className="text-xs text-muted-foreground">Quality Assurance</p>
                      </div>
                    </div>
                    <Card className="p-3 bg-accent/5">
                      <p className="text-sm text-foreground">
                        {selectedService.reInspectionComment}
                      </p>
                    </Card>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
