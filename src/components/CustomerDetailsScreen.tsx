import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Truck,
  FileText,
  Star,
  Building2,
  UserCircle,
  Clock,
  AlertCircle,
  CheckCircle2,
  Wrench,
} from "lucide-react";

interface WorkOrderRecord {
  id: string;
  date: string;
  tractorId: string;
  tractorModel: string;
  serviceType: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  priority: "low" | "medium" | "high" | "urgent";
  technicianName: string;
  cost: string;
  rating?: number;
  completedDate?: string;
}

interface TractorOwned {
  id: string;
  model: string;
  make: string;
  status: "operational" | "in-service" | "needs-attention";
  lastService: string;
}

interface CustomerDetails {
  id: string;
  name: string;
  type: "individual" | "company";
  phone: string;
  email: string;
  location: string;
  region: string;
  joinDate: string;
  status: "active" | "inactive";
  contactPerson?: string;
  secondaryPhone?: string;
  address: string;
  tractorsOwned: TractorOwned[];
  workOrderHistory: WorkOrderRecord[];
  totalSpent: string;
  averageRating: number;
  totalRatings: number;
}

// Mock data for demonstration
const customerData: Record<string, CustomerDetails> = {
  "CU-001": {
    id: "CU-001",
    name: "Green Valley Farm",
    type: "company",
    phone: "+254 712 345 678",
    email: "contact@greenvalleyfarm.co.ke",
    location: "Nakuru",
    region: "Rift Valley",
    joinDate: "2023-01-15",
    status: "active",
    contactPerson: "Peter Mwangi",
    secondaryPhone: "+254 712 345 679",
    address: "Plot 45, Nakuru-Nairobi Highway, Nakuru",
    totalSpent: "KES 145,800",
    averageRating: 4.8,
    totalRatings: 10,
    tractorsOwned: [
      {
        id: "TR-001",
        model: "5075E",
        make: "John Deere",
        status: "in-service",
        lastService: "2025-10-16",
      },
      {
        id: "TR-008",
        model: "6713",
        make: "Massey Ferguson",
        status: "operational",
        lastService: "2025-10-12",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-001",
        date: "2025-10-16",
        tractorId: "TR-001",
        tractorModel: "John Deere 5075E",
        serviceType: "Scheduled Maintenance",
        description: "Oil change, filter replacement, general inspection",
        status: "in-progress",
        priority: "medium",
        technicianName: "John Mwangi",
        cost: "KES 12,500",
      },
      {
        id: "WO-008",
        date: "2025-10-12",
        tractorId: "TR-008",
        tractorModel: "Massey Ferguson 6713",
        serviceType: "Scheduled Maintenance",
        description: "Oil change, filter replacement, general inspection",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 12,300",
        rating: 5,
        completedDate: "2025-10-12",
      },
      {
        id: "WO-007",
        date: "2025-08-10",
        tractorId: "TR-001",
        tractorModel: "John Deere 5075E",
        serviceType: "Hydraulic System Repair",
        description: "Fixed hydraulic leak, replaced seals",
        status: "completed",
        priority: "high",
        technicianName: "Peter Kariuki",
        cost: "KES 18,750",
        rating: 4,
        completedDate: "2025-08-11",
      },
      {
        id: "WO-006",
        date: "2025-07-08",
        tractorId: "TR-008",
        tractorModel: "Massey Ferguson 6713",
        serviceType: "Scheduled Maintenance",
        description: "Regular service",
        status: "completed",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 9,500",
        rating: 5,
        completedDate: "2025-07-08",
      },
      {
        id: "WO-005",
        date: "2025-05-22",
        tractorId: "TR-001",
        tractorModel: "John Deere 5075E",
        serviceType: "Scheduled Maintenance",
        description: "200-hour service interval maintenance",
        status: "completed",
        priority: "medium",
        technicianName: "John Mwangi",
        cost: "KES 9,800",
        rating: 5,
        completedDate: "2025-05-22",
      },
    ],
  },
  "CU-002": {
    id: "CU-002",
    name: "Sunrise Agriculture",
    type: "company",
    phone: "+254 723 456 789",
    email: "maintenance@sunriseag.co.ke",
    location: "Eldoret",
    region: "Rift Valley",
    joinDate: "2023-04-20",
    status: "active",
    contactPerson: "Sarah Chepkemoi",
    secondaryPhone: "+254 723 456 790",
    address: "KM 12, Eldoret-Kitale Road, Eldoret",
    totalSpent: "KES 89,200",
    averageRating: 4.0,
    totalRatings: 5,
    tractorsOwned: [
      {
        id: "TR-002",
        model: "4708",
        make: "Massey Ferguson",
        status: "needs-attention",
        lastService: "2025-09-20",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-002",
        date: "2025-10-15",
        tractorId: "TR-002",
        tractorModel: "Massey Ferguson 4708",
        serviceType: "Engine Repair",
        description: "Follow-up on overheating issue",
        status: "pending",
        priority: "urgent",
        technicianName: "John Mwangi",
        cost: "KES 15,000",
      },
      {
        id: "WO-009",
        date: "2025-09-20",
        tractorId: "TR-002",
        tractorModel: "Massey Ferguson 4708",
        serviceType: "Engine Diagnostics",
        description: "Engine overheating diagnosis and cooling system check",
        status: "completed",
        priority: "high",
        technicianName: "John Mwangi",
        cost: "KES 6,500",
        rating: 3,
        completedDate: "2025-09-20",
      },
      {
        id: "WO-010",
        date: "2025-06-12",
        tractorId: "TR-002",
        tractorModel: "Massey Ferguson 4708",
        serviceType: "Scheduled Maintenance",
        description: "Regular service and inspection",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 11,200",
        rating: 5,
        completedDate: "2025-06-12",
      },
    ],
  },
  "CU-003": {
    id: "CU-003",
    name: "Riverside Ranch",
    type: "company",
    phone: "+254 734 567 890",
    email: "operations@riversideranch.co.ke",
    location: "Naivasha",
    region: "Rift Valley",
    joinDate: "2022-08-10",
    status: "active",
    contactPerson: "Michael Odhiambo",
    address: "South Lake Road, Naivasha",
    totalSpent: "KES 234,500",
    averageRating: 4.7,
    totalRatings: 12,
    tractorsOwned: [
      {
        id: "TR-003",
        model: "T4.75",
        make: "New Holland",
        status: "in-service",
        lastService: "2025-10-17",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-003",
        date: "2025-10-17",
        tractorId: "TR-003",
        tractorModel: "New Holland T4.75",
        serviceType: "Scheduled Maintenance",
        description: "Regular maintenance and lubrication",
        status: "in-progress",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 10,200",
      },
      {
        id: "WO-011",
        date: "2025-07-25",
        tractorId: "TR-003",
        tractorModel: "New Holland T4.75",
        serviceType: "Brake System Service",
        description: "Brake inspection and adjustment",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 13,500",
        rating: 4,
        completedDate: "2025-07-26",
      },
    ],
  },
  "CU-004": {
    id: "CU-004",
    name: "Highland Estates",
    type: "company",
    phone: "+254 745 678 901",
    email: "info@highlandestates.co.ke",
    location: "Nanyuki",
    region: "Central",
    joinDate: "2022-11-05",
    status: "active",
    contactPerson: "David Njoroge",
    secondaryPhone: "+254 745 678 902",
    address: "Nanyuki-Naro Moru Road, Nanyuki",
    totalSpent: "KES 312,400",
    averageRating: 4.9,
    totalRatings: 8,
    tractorsOwned: [
      {
        id: "TR-004",
        model: "6130M",
        make: "John Deere",
        status: "operational",
        lastService: "2025-09-28",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-012",
        date: "2025-09-28",
        tractorId: "TR-004",
        tractorModel: "John Deere 6130M",
        serviceType: "500-Hour Service",
        description: "Major service interval maintenance",
        status: "completed",
        priority: "medium",
        technicianName: "John Mwangi",
        cost: "KES 22,800",
        rating: 5,
        completedDate: "2025-09-28",
      },
      {
        id: "WO-013",
        date: "2025-04-15",
        tractorId: "TR-004",
        tractorModel: "John Deere 6130M",
        serviceType: "Scheduled Maintenance",
        description: "Regular service and inspection",
        status: "completed",
        priority: "medium",
        technicianName: "James Omondi",
        cost: "KES 14,500",
        rating: 5,
        completedDate: "2025-04-15",
      },
      {
        id: "WO-014",
        date: "2024-11-20",
        tractorId: "TR-004",
        tractorModel: "John Deere 6130M",
        serviceType: "Scheduled Maintenance",
        description: "Oil change and filter replacement",
        status: "completed",
        priority: "low",
        technicianName: "Peter Kariuki",
        cost: "KES 13,800",
        rating: 5,
        completedDate: "2024-11-20",
      },
    ],
  },
  "CU-005": {
    id: "CU-005",
    name: "Golden Harvest Co.",
    type: "company",
    phone: "+254 756 789 012",
    email: "contact@goldenharvest.co.ke",
    location: "Kitale",
    region: "Rift Valley",
    joinDate: "2021-03-12",
    status: "active",
    contactPerson: "Grace Wambui",
    address: "Kitale-Endebess Road, Kitale",
    totalSpent: "KES 428,900",
    averageRating: 4.6,
    totalRatings: 15,
    tractorsOwned: [
      {
        id: "TR-005",
        model: "5710",
        make: "Massey Ferguson",
        status: "operational",
        lastService: "2025-10-05",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-015",
        date: "2025-10-05",
        tractorId: "TR-005",
        tractorModel: "Massey Ferguson 5710",
        serviceType: "Scheduled Maintenance",
        description: "Oil change and general inspection",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 11,900",
        rating: 4,
        completedDate: "2025-10-05",
      },
      {
        id: "WO-016",
        date: "2025-07-18",
        tractorId: "TR-005",
        tractorModel: "Massey Ferguson 5710",
        serviceType: "Hydraulic Repair",
        description: "Hydraulic pump replacement",
        status: "completed",
        priority: "high",
        technicianName: "John Mwangi",
        cost: "KES 32,500",
        rating: 5,
        completedDate: "2025-07-19",
      },
      {
        id: "WO-017",
        date: "2025-04-22",
        tractorId: "TR-005",
        tractorModel: "Massey Ferguson 5710",
        serviceType: "Scheduled Maintenance",
        description: "Regular service",
        status: "completed",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 10,800",
        rating: 4,
        completedDate: "2025-04-22",
      },
      {
        id: "WO-018",
        date: "2025-01-15",
        tractorId: "TR-005",
        tractorModel: "Massey Ferguson 5710",
        serviceType: "Electrical Repair",
        description: "Alternator replacement",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 18,600",
        rating: 5,
        completedDate: "2025-01-16",
      },
    ],
  },
  "CU-006": {
    id: "CU-006",
    name: "Valley View Farms",
    type: "company",
    phone: "+254 767 890 123",
    email: "admin@valleyviewfarms.co.ke",
    location: "Meru",
    region: "Eastern",
    joinDate: "2024-01-18",
    status: "active",
    contactPerson: "James Kimathi",
    address: "Meru-Embu Highway, Meru",
    totalSpent: "KES 68,200",
    averageRating: 5.0,
    totalRatings: 4,
    tractorsOwned: [
      {
        id: "TR-006",
        model: "T6.180",
        make: "New Holland",
        status: "operational",
        lastService: "2025-10-10",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-019",
        date: "2025-10-10",
        tractorId: "TR-006",
        tractorModel: "New Holland T6.180",
        serviceType: "First Service",
        description: "Initial break-in service for new tractor",
        status: "completed",
        priority: "medium",
        technicianName: "John Mwangi",
        cost: "KES 8,000",
        rating: 5,
        completedDate: "2025-10-10",
      },
      {
        id: "WO-020",
        date: "2025-08-05",
        tractorId: "TR-006",
        tractorModel: "New Holland T6.180",
        serviceType: "Pre-delivery Inspection",
        description: "Complete inspection before delivery",
        status: "completed",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 5,500",
        rating: 5,
        completedDate: "2025-08-05",
      },
    ],
  },
  "CU-007": {
    id: "CU-007",
    name: "Savanna Agriculture",
    type: "company",
    phone: "+254 778 901 234",
    email: "service@savannaagriculture.co.ke",
    location: "Nakuru",
    region: "Rift Valley",
    joinDate: "2020-06-25",
    status: "active",
    contactPerson: "Samuel Kipchoge",
    secondaryPhone: "+254 778 901 235",
    address: "Nakuru Industrial Area, Nakuru",
    totalSpent: "KES 567,800",
    averageRating: 4.3,
    totalRatings: 18,
    tractorsOwned: [
      {
        id: "TR-007",
        model: "7230R",
        make: "John Deere",
        status: "needs-attention",
        lastService: "2025-09-15",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-004",
        date: "2025-10-12",
        tractorId: "TR-007",
        tractorModel: "John Deere 7230R",
        serviceType: "Performance Check",
        description: "Follow-up inspection after turbocharger replacement",
        status: "in-progress",
        priority: "high",
        technicianName: "James Omondi",
        cost: "KES 8,500",
      },
      {
        id: "WO-021",
        date: "2025-09-15",
        tractorId: "TR-007",
        tractorModel: "John Deere 7230R",
        serviceType: "Major Repair",
        description: "Turbocharger replacement and engine diagnostics",
        status: "completed",
        priority: "urgent",
        technicianName: "James Omondi",
        cost: "KES 45,600",
        rating: 3,
        completedDate: "2025-09-18",
      },
      {
        id: "WO-022",
        date: "2025-06-20",
        tractorId: "TR-007",
        tractorModel: "John Deere 7230R",
        serviceType: "Scheduled Maintenance",
        description: "Regular high-hour maintenance",
        status: "completed",
        priority: "medium",
        technicianName: "John Mwangi",
        cost: "KES 18,900",
        rating: 4,
        completedDate: "2025-06-21",
      },
      {
        id: "WO-023",
        date: "2025-03-14",
        tractorId: "TR-007",
        tractorModel: "John Deere 7230R",
        serviceType: "Transmission Service",
        description: "Transmission fluid change",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 24,300",
        rating: 5,
        completedDate: "2025-03-15",
      },
    ],
  },
  "CU-008": {
    id: "CU-008",
    name: "John Kamau",
    type: "individual",
    phone: "+254 789 012 345",
    email: "j.kamau@example.com",
    location: "Kiambu",
    region: "Central",
    joinDate: "2024-05-08",
    status: "active",
    address: "Coffee Estate Road, Kiambu",
    totalSpent: "KES 42,800",
    averageRating: 4.5,
    totalRatings: 4,
    tractorsOwned: [
      {
        id: "TR-009",
        model: "4000 Series",
        make: "Kubota",
        status: "operational",
        lastService: "2025-09-18",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-024",
        date: "2025-09-18",
        tractorId: "TR-009",
        tractorModel: "Kubota 4000 Series",
        serviceType: "Scheduled Maintenance",
        description: "Oil change and filter replacement",
        status: "completed",
        priority: "low",
        technicianName: "Peter Kariuki",
        cost: "KES 8,500",
        rating: 4,
        completedDate: "2025-09-18",
      },
      {
        id: "WO-025",
        date: "2025-06-05",
        tractorId: "TR-009",
        tractorModel: "Kubota 4000 Series",
        serviceType: "Scheduled Maintenance",
        description: "Regular service",
        status: "completed",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 7,900",
        rating: 5,
        completedDate: "2025-06-05",
      },
      {
        id: "WO-026",
        date: "2024-12-20",
        tractorId: "TR-009",
        tractorModel: "Kubota 4000 Series",
        serviceType: "First Service",
        description: "Initial service for new owner",
        status: "completed",
        priority: "medium",
        technicianName: "John Mwangi",
        cost: "KES 9,200",
        rating: 5,
        completedDate: "2024-12-20",
      },
    ],
  },
  "CU-009": {
    id: "CU-009",
    name: "Mary Wanjiku",
    type: "individual",
    phone: "+254 790 123 456",
    email: "m.wanjiku@example.com",
    location: "Embu",
    region: "Eastern",
    joinDate: "2023-09-14",
    status: "active",
    address: "Embu-Meru Road, Embu",
    totalSpent: "KES 78,600",
    averageRating: 4.7,
    totalRatings: 6,
    tractorsOwned: [
      {
        id: "TR-010",
        model: "3720",
        make: "Mahindra",
        status: "operational",
        lastService: "2025-09-22",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-027",
        date: "2025-09-22",
        tractorId: "TR-010",
        tractorModel: "Mahindra 3720",
        serviceType: "Scheduled Maintenance",
        description: "Oil change and inspection",
        status: "completed",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 7,800",
        rating: 5,
        completedDate: "2025-09-22",
      },
      {
        id: "WO-028",
        date: "2025-06-18",
        tractorId: "TR-010",
        tractorModel: "Mahindra 3720",
        serviceType: "Tire Replacement",
        description: "Front tire replacement",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 18,500",
        rating: 4,
        completedDate: "2025-06-19",
      },
      {
        id: "WO-029",
        date: "2025-03-10",
        tractorId: "TR-010",
        tractorModel: "Mahindra 3720",
        serviceType: "Scheduled Maintenance",
        description: "Regular service",
        status: "completed",
        priority: "low",
        technicianName: "John Mwangi",
        cost: "KES 8,200",
        rating: 5,
        completedDate: "2025-03-10",
      },
      {
        id: "WO-030",
        date: "2024-11-28",
        tractorId: "TR-010",
        tractorModel: "Mahindra 3720",
        serviceType: "Brake Service",
        description: "Brake pad replacement and adjustment",
        status: "completed",
        priority: "medium",
        technicianName: "Peter Kariuki",
        cost: "KES 12,400",
        rating: 5,
        completedDate: "2024-11-29",
      },
    ],
  },
  "CU-010": {
    id: "CU-010",
    name: "Coastal Farms Ltd",
    type: "company",
    phone: "+254 701 234 567",
    email: "contact@coastalfarms.co.ke",
    location: "Kilifi",
    region: "Coast",
    joinDate: "2024-08-22",
    status: "inactive",
    contactPerson: "Ahmed Hassan",
    address: "Mombasa-Malindi Highway, Kilifi",
    totalSpent: "KES 28,500",
    averageRating: 4.0,
    totalRatings: 2,
    tractorsOwned: [
      {
        id: "TR-011",
        model: "TE-A 60",
        make: "Landini",
        status: "operational",
        lastService: "2024-12-10",
      },
      {
        id: "TR-012",
        model: "TE-F 90",
        make: "Landini",
        status: "operational",
        lastService: "2024-12-12",
      },
    ],
    workOrderHistory: [
      {
        id: "WO-031",
        date: "2024-12-12",
        tractorId: "TR-012",
        tractorModel: "Landini TE-F 90",
        serviceType: "Pre-delivery Inspection",
        description: "Complete inspection before delivery",
        status: "completed",
        priority: "low",
        technicianName: "James Omondi",
        cost: "KES 6,500",
        rating: 4,
        completedDate: "2024-12-12",
      },
      {
        id: "WO-032",
        date: "2024-12-10",
        tractorId: "TR-011",
        tractorModel: "Landini TE-A 60",
        serviceType: "Pre-delivery Inspection",
        description: "Complete inspection before delivery",
        status: "completed",
        priority: "low",
        technicianName: "John Mwangi",
        cost: "KES 6,000",
        rating: 4,
        completedDate: "2024-12-10",
      },
    ],
  },
};

interface CustomerDetailsScreenProps {
  customerId: string | null;
  onBack: () => void;
}

export function CustomerDetailsScreen({ customerId, onBack }: CustomerDetailsScreenProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "orders">("overview");

  if (!customerId || !customerData[customerId]) {
    return (
      <div className="size-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Customer not found</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const customer = customerData[customerId];

  const getTypeColor = (type: typeof customer.type) => {
    return type === "company"
      ? "bg-secondary/10 text-secondary border-secondary/20"
      : "bg-primary/10 text-primary border-primary/20";
  };

  const getTypeLabel = (type: typeof customer.type) => {
    return type === "company" ? "Company" : "Individual";
  };

  const getStatusColor = (status: "operational" | "in-service" | "needs-attention") => {
    switch (status) {
      case "operational":
        return "bg-accent/10 text-accent border-accent/20";
      case "in-service":
        return "bg-primary/10 text-primary border-primary/20";
      case "needs-attention":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getStatusLabel = (status: "operational" | "in-service" | "needs-attention") => {
    switch (status) {
      case "operational":
        return "Operational";
      case "in-service":
        return "In Service";
      case "needs-attention":
        return "Needs Attention";
    }
  };

  const getStatusIcon = (status: "operational" | "in-service" | "needs-attention") => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "in-service":
        return <Wrench className="w-3 h-3 mr-1" />;
      case "needs-attention":
        return <AlertCircle className="w-3 h-3 mr-1" />;
    }
  };

  const getWorkOrderStatusColor = (status: WorkOrderRecord["status"]) => {
    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent border-accent/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getWorkOrderStatusLabel = (status: WorkOrderRecord["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
    }
  };

  const getPriorityColor = (priority: WorkOrderRecord["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-muted text-muted-foreground border-border";
      case "medium":
        return "bg-primary/10 text-primary border-primary/20";
      case "high":
        return "bg-accent/10 text-accent border-accent/20";
      case "urgent":
        return "bg-destructive/10 text-destructive border-destructive/20";
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
            className={`w-3 h-3 ${
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const activeOrders = customer.workOrderHistory.filter(
    (wo) => wo.status === "in-progress" || wo.status === "pending"
  ).length;

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
              <h2 className="text-foreground">Customer Details</h2>
              <p className="text-muted-foreground text-sm">{customer.id}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-6 py-6 space-y-6 pb-8">
            {/* Main Info Card */}
            <Card className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {customer.type === "company" ? (
                    <Building2 className="w-8 h-8 text-primary" />
                  ) : (
                    <UserCircle className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">{customer.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`${getTypeColor(customer.type)} text-xs`}
                    >
                      {getTypeLabel(customer.type)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        customer.status === "active"
                          ? "bg-accent/10 text-accent border-accent/20 text-xs"
                          : "bg-muted text-muted-foreground border-border text-xs"
                      }
                    >
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${customer.phone}`} className="text-primary hover:underline">
                    {customer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${customer.email}`} className="text-primary hover:underline truncate">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-foreground">
                    {customer.address}
                  </span>
                </div>
                {customer.contactPerson && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">
                      Contact: {customer.contactPerson}
                    </span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-foreground">{formatDate(customer.joinDate)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm text-foreground">
                    {customer.location}, {customer.region}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </div>
                <p className="text-foreground">{customer.workOrderHistory.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeOrders} active
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Tractors</p>
                </div>
                <p className="text-foreground">{customer.tractorsOwned.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {customer.tractorsOwned.filter(t => t.status === "operational").length} operational
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Avg. Rating</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-foreground">{customer.averageRating.toFixed(1)}</p>
                  {renderStars(Math.round(customer.averageRating))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {customer.totalRatings} ratings
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <p className="text-foreground">{customer.totalSpent}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All services
                </p>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-3 text-sm transition-colors ${
                  activeTab === "overview"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                Tractors ({customer.tractorsOwned.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex-1 py-3 text-sm transition-colors ${
                  activeTab === "orders"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                Work Orders ({customer.workOrderHistory.length})
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-3">
                <h4 className="text-foreground flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  Tractors Owned
                </h4>
                {customer.tractorsOwned.map((tractor) => (
                  <Card key={tractor.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{tractor.id}</span>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(tractor.status)} text-xs`}
                          >
                            {getStatusIcon(tractor.status)}
                            {getStatusLabel(tractor.status)}
                          </Badge>
                        </div>
                        <h5 className="text-foreground">
                          {tractor.make} {tractor.model}
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last Service:
                      </span>
                      <span className="text-foreground">{formatDate(tractor.lastService)}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-3">
                <h4 className="text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Work Order History
                </h4>
                {customer.workOrderHistory.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs text-muted-foreground">{order.id}</span>
                          <Badge
                            variant="outline"
                            className={`${getWorkOrderStatusColor(order.status)} text-xs`}
                          >
                            {getWorkOrderStatusLabel(order.status)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${getPriorityColor(order.priority)} text-xs`}
                          >
                            {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                          </Badge>
                        </div>
                        <h5 className="text-foreground mb-1">{order.serviceType}</h5>
                        <p className="text-xs text-muted-foreground mb-2">
                          {order.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tractor: {order.tractorModel}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Technician:</span>
                        <span className="text-foreground">{order.technicianName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cost:</span>
                        <span className="text-foreground">{order.cost}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {order.status === "completed" ? "Completed:" : "Created:"}
                        </span>
                        <span className="text-foreground">
                          {formatDate(order.completedDate || order.date)}
                        </span>
                      </div>
                      {order.rating && (
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-xs text-muted-foreground">Rating:</span>
                          {renderStars(order.rating)}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
