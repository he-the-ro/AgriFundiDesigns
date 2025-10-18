import { useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Search, ArrowLeft, Truck, Calendar, AlertCircle, Wrench, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Tractor {
  id: string;
  model: string;
  make: string;
  serialNumber: string;
  year: number;
  customer: string;
  status: "operational" | "in-service" | "needs-attention";
  lastService: string;
  nextService: string;
  hoursUsed: number;
  location: string;
}

const allTractors: Tractor[] = [
  {
    id: "TR-001",
    model: "5075E",
    make: "John Deere",
    serialNumber: "1LV5075EXFH123456",
    year: 2022,
    customer: "Green Valley Farm",
    status: "in-service",
    lastService: "2025-10-16",
    nextService: "2025-11-16",
    hoursUsed: 1245,
    location: "Nakuru",
  },
  {
    id: "TR-002",
    model: "4708",
    make: "Massey Ferguson",
    serialNumber: "MF4708-2024-789012",
    year: 2023,
    customer: "Sunrise Agriculture",
    status: "needs-attention",
    lastService: "2025-09-20",
    nextService: "2025-10-20",
    hoursUsed: 890,
    location: "Eldoret",
  },
  {
    id: "TR-003",
    model: "T4.75",
    make: "New Holland",
    serialNumber: "NH-T475-2023-456789",
    year: 2023,
    customer: "Riverside Ranch",
    status: "in-service",
    lastService: "2025-10-17",
    nextService: "2025-11-17",
    hoursUsed: 567,
    location: "Naivasha",
  },
  {
    id: "TR-004",
    model: "6130M",
    make: "John Deere",
    serialNumber: "1LV6130MXGH234567",
    year: 2021,
    customer: "Highland Estates",
    status: "operational",
    lastService: "2025-09-28",
    nextService: "2025-11-28",
    hoursUsed: 2134,
    location: "Nanyuki",
  },
  {
    id: "TR-005",
    model: "5710",
    make: "Massey Ferguson",
    serialNumber: "MF5710-2022-345678",
    year: 2022,
    customer: "Golden Harvest Co.",
    status: "operational",
    lastService: "2025-10-05",
    nextService: "2025-12-05",
    hoursUsed: 1678,
    location: "Kitale",
  },
  {
    id: "TR-006",
    model: "T6.180",
    make: "New Holland",
    serialNumber: "NH-T6180-2024-567890",
    year: 2024,
    customer: "Valley View Farms",
    status: "operational",
    lastService: "2025-10-10",
    nextService: "2025-12-10",
    hoursUsed: 345,
    location: "Meru",
  },
  {
    id: "TR-007",
    model: "7230R",
    make: "John Deere",
    serialNumber: "1LV7230RXJH345678",
    year: 2020,
    customer: "Savanna Agriculture",
    status: "needs-attention",
    lastService: "2025-09-15",
    nextService: "2025-10-15",
    hoursUsed: 3456,
    location: "Nakuru",
  },
  {
    id: "TR-008",
    model: "6713",
    make: "Massey Ferguson",
    serialNumber: "MF6713-2023-678901",
    year: 2023,
    customer: "Green Valley Farm",
    status: "operational",
    lastService: "2025-10-12",
    nextService: "2025-12-12",
    hoursUsed: 789,
    location: "Nakuru",
  },
];

interface TractorsScreenProps {
  onBack: () => void;
  onViewDetails: (tractorId: string) => void;
}

export function TractorsScreen({ onBack, onViewDetails }: TractorsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");

  const filteredTractors = allTractors.filter((tractor) => {
    const matchesSearch =
      searchQuery === "" ||
      tractor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tractor.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tractor.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tractor.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tractor.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || tractor.status === statusFilter;

    const matchesMake =
      makeFilter === "all" || tractor.make === makeFilter;

    return matchesSearch && matchesStatus && matchesMake;
  });

  const getStatusColor = (status: Tractor["status"]) => {
    switch (status) {
      case "operational":
        return "bg-accent/10 text-accent border-accent/20";
      case "in-service":
        return "bg-primary/10 text-primary border-primary/20";
      case "needs-attention":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getStatusLabel = (status: Tractor["status"]) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "in-service":
        return "In Service";
      case "needs-attention":
        return "Needs Attention";
    }
  };

  const getStatusIcon = (status: Tractor["status"]) => {
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

  const uniqueMakes = Array.from(new Set(allTractors.map((t) => t.make)));

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
              <h2 className="text-foreground">Tractors</h2>
              <p className="text-muted-foreground text-sm">
                {filteredTractors.length} {filteredTractors.length === 1 ? 'tractor' : 'tractors'} found
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder="Search by ID, model, make, customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="in-service">In Service</SelectItem>
                  <SelectItem value="needs-attention">Needs Attention</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={makeFilter} onValueChange={setMakeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {uniqueMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tractors List */}
        <div className="flex-1 overflow-auto px-6 py-6">
          {filteredTractors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Truck className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-foreground mb-2">No tractors found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTractors.map((tractor) => (
                <Card key={tractor.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{tractor.id}</span>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(tractor.status)} text-xs`}
                        >
                          {getStatusIcon(tractor.status)}
                          {getStatusLabel(tractor.status)}
                        </Badge>
                      </div>
                      <h4 className="text-foreground mb-1">
                        {tractor.make} {tractor.model}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Serial: {tractor.serialNumber}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="text-foreground">{tractor.customer}</span>
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
                      <span className="text-foreground">{tractor.hoursUsed.toLocaleString()}h</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs mb-2">
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

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3 text-primary hover:text-primary/80"
                    onClick={() => onViewDetails(tractor.id)}
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
