import { useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Search, ArrowLeft, User, Phone, Mail, MapPin, Truck, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Customer {
  id: string;
  name: string;
  type: "individual" | "company";
  phone: string;
  email: string;
  location: string;
  region: string;
  tractorsOwned: number;
  activeOrders: number;
  totalOrders: number;
  joinDate: string;
  status: "active" | "inactive";
}

const allCustomers: Customer[] = [
  {
    id: "CU-001",
    name: "Green Valley Farm",
    type: "company",
    phone: "+254 712 345 678",
    email: "contact@greenvalleyfarm.co.ke",
    location: "Nakuru",
    region: "Rift Valley",
    tractorsOwned: 2,
    activeOrders: 1,
    totalOrders: 12,
    joinDate: "2023-01-15",
    status: "active",
  },
  {
    id: "CU-002",
    name: "Sunrise Agriculture",
    type: "company",
    phone: "+254 723 456 789",
    email: "maintenance@sunriseag.co.ke",
    location: "Eldoret",
    region: "Rift Valley",
    tractorsOwned: 1,
    activeOrders: 1,
    totalOrders: 8,
    joinDate: "2023-04-20",
    status: "active",
  },
  {
    id: "CU-003",
    name: "Riverside Ranch",
    type: "company",
    phone: "+254 734 567 890",
    email: "operations@riversideranch.co.ke",
    location: "Naivasha",
    region: "Rift Valley",
    tractorsOwned: 1,
    activeOrders: 1,
    totalOrders: 15,
    joinDate: "2022-08-10",
    status: "active",
  },
  {
    id: "CU-004",
    name: "Highland Estates",
    type: "company",
    phone: "+254 745 678 901",
    email: "info@highlandestates.co.ke",
    location: "Nanyuki",
    region: "Central",
    tractorsOwned: 1,
    activeOrders: 0,
    totalOrders: 10,
    joinDate: "2022-11-05",
    status: "active",
  },
  {
    id: "CU-005",
    name: "Golden Harvest Co.",
    type: "company",
    phone: "+254 756 789 012",
    email: "contact@goldenharvest.co.ke",
    location: "Kitale",
    region: "Rift Valley",
    tractorsOwned: 1,
    activeOrders: 0,
    totalOrders: 18,
    joinDate: "2021-03-12",
    status: "active",
  },
  {
    id: "CU-006",
    name: "Valley View Farms",
    type: "company",
    phone: "+254 767 890 123",
    email: "admin@valleyviewfarms.co.ke",
    location: "Meru",
    region: "Eastern",
    tractorsOwned: 1,
    activeOrders: 0,
    totalOrders: 6,
    joinDate: "2024-01-18",
    status: "active",
  },
  {
    id: "CU-007",
    name: "Savanna Agriculture",
    type: "company",
    phone: "+254 778 901 234",
    email: "service@savannaagriculture.co.ke",
    location: "Nakuru",
    region: "Rift Valley",
    tractorsOwned: 1,
    activeOrders: 1,
    totalOrders: 22,
    joinDate: "2020-06-25",
    status: "active",
  },
  {
    id: "CU-008",
    name: "John Kamau",
    type: "individual",
    phone: "+254 789 012 345",
    email: "j.kamau@example.com",
    location: "Kiambu",
    region: "Central",
    tractorsOwned: 1,
    activeOrders: 0,
    totalOrders: 4,
    joinDate: "2024-05-08",
    status: "active",
  },
  {
    id: "CU-009",
    name: "Mary Wanjiku",
    type: "individual",
    phone: "+254 790 123 456",
    email: "m.wanjiku@example.com",
    location: "Embu",
    region: "Eastern",
    tractorsOwned: 1,
    activeOrders: 0,
    totalOrders: 7,
    joinDate: "2023-09-14",
    status: "active",
  },
  {
    id: "CU-010",
    name: "Coastal Farms Ltd",
    type: "company",
    phone: "+254 701 234 567",
    email: "contact@coastalfarms.co.ke",
    location: "Kilifi",
    region: "Coast",
    tractorsOwned: 2,
    activeOrders: 0,
    totalOrders: 3,
    joinDate: "2024-08-22",
    status: "inactive",
  },
];

interface CustomersScreenProps {
  onBack: () => void;
  onViewDetails: (customerId: string) => void;
}

export function CustomersScreen({ onBack, onViewDetails }: CustomersScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  const filteredCustomers = allCustomers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "all" || customer.type === typeFilter;

    const matchesRegion =
      regionFilter === "all" || customer.region === regionFilter;

    return matchesSearch && matchesType && matchesRegion;
  });

  const uniqueRegions = Array.from(new Set(allCustomers.map((c) => c.region)));

  const getTypeColor = (type: Customer["type"]) => {
    return type === "company"
      ? "bg-secondary/10 text-secondary border-secondary/20"
      : "bg-primary/10 text-primary border-primary/20";
  };

  const getTypeLabel = (type: Customer["type"]) => {
    return type === "company" ? "Company" : "Individual";
  };

  const getStatusColor = (status: Customer["status"]) => {
    return status === "active"
      ? "bg-accent/10 text-accent border-accent/20"
      : "bg-muted text-muted-foreground border-border";
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
              <h2 className="text-foreground">Customers</h2>
              <p className="text-muted-foreground text-sm">
                {filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'} found
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {uniqueRegions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Customers List */}
        <div className="flex-1 overflow-auto px-6 py-6">
          {filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-foreground mb-2">No customers found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{customer.id}</span>
                        <Badge
                          variant="outline"
                          className={`${getTypeColor(customer.type)} text-xs`}
                        >
                          {getTypeLabel(customer.type)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(customer.status)} text-xs`}
                        >
                          {customer.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <h4 className="text-foreground mb-1">{customer.name}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${customer.phone}`} className="text-primary hover:underline">
                        {customer.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${customer.email}`} className="text-primary hover:underline truncate">
                        {customer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-foreground">
                        {customer.location}, {customer.region}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Truck className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{customer.tractorsOwned}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Tractors</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{customer.activeOrders}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Active Orders</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{customer.totalOrders}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">All Orders</p>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3 text-primary hover:text-primary/80"
                    onClick={() => onViewDetails(customer.id)}
                  >
                    View Details
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
