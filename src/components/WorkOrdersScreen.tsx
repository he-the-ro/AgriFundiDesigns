import { useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Search, ArrowLeft, Filter, Calendar, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface WorkOrder {
  id: string;
  title: string;
  status: "in-progress" | "pending" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: string;
  tractor: string;
  customer: string;
}

const allWorkOrders: WorkOrder[] = [
  {
    id: "WO-001",
    title: "Engine Oil Change & Filter Replacement",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-10-18",
    tractor: "John Deere 5075E",
    customer: "Green Valley Farm",
  },
  {
    id: "WO-002",
    title: "Hydraulic System Repair",
    status: "pending",
    priority: "high",
    dueDate: "2025-10-19",
    tractor: "Massey Ferguson 4708",
    customer: "Sunrise Agriculture",
  },
  {
    id: "WO-003",
    title: "Annual Maintenance Inspection",
    status: "in-progress",
    priority: "low",
    dueDate: "2025-10-20",
    tractor: "New Holland T4.75",
    customer: "Riverside Ranch",
  },
  {
    id: "WO-004",
    title: "Brake System Overhaul",
    status: "pending",
    priority: "high",
    dueDate: "2025-10-21",
    tractor: "Case IH Farmall 110A",
    customer: "Meadow Creek Farms",
  },
  {
    id: "WO-005",
    title: "Tire Replacement - Front Axle",
    status: "completed",
    priority: "medium",
    dueDate: "2025-10-15",
    tractor: "Kubota M7060",
    customer: "Highland Dairy",
  },
  {
    id: "WO-006",
    title: "Transmission Fluid Service",
    status: "completed",
    priority: "low",
    dueDate: "2025-10-14",
    tractor: "Fendt 516 Vario",
    customer: "Oakwood Estates",
  },
  {
    id: "WO-007",
    title: "Air Filter & Cabin Filter Replacement",
    status: "in-progress",
    priority: "low",
    dueDate: "2025-10-22",
    tractor: "Deutz-Fahr 5110",
    customer: "Green Valley Farm",
  },
  {
    id: "WO-008",
    title: "Electrical System Diagnostics",
    status: "pending",
    priority: "high",
    dueDate: "2025-10-20",
    tractor: "John Deere 6145R",
    customer: "Valley View Orchards",
  },
  {
    id: "WO-009",
    title: "Coolant System Flush",
    status: "completed",
    priority: "medium",
    dueDate: "2025-10-12",
    tractor: "Massey Ferguson 5713",
    customer: "Sunrise Agriculture",
  },
  {
    id: "WO-010",
    title: "PTO Clutch Adjustment",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-10-19",
    tractor: "New Holland T6.180",
    customer: "Riverside Ranch",
  },
];

interface WorkOrdersScreenProps {
  onBack: () => void;
  onViewDetails: (workOrderId: string) => void;
}

export function WorkOrdersScreen({ onBack, onViewDetails }: WorkOrdersScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Filter work orders based on search and filters
  const filteredWorkOrders = allWorkOrders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || order.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: WorkOrder["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
      case "completed":
        return "bg-accent/10 text-accent border-accent/20";
    }
  };

  const getStatusLabel = (status: WorkOrder["status"]) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
    }
  };

  const getPriorityColor = (priority: WorkOrder["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-primary/10 text-primary border-primary/20";
      case "low":
        return "bg-accent/10 text-accent border-accent/20";
    }
  };

  const getPriorityLabel = (priority: WorkOrder["priority"]) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
    }
  };

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Content */}
      <div className="flex flex-col size-full overflow-auto">
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
              <h2 className="text-foreground">Work Orders</h2>
              <p className="text-muted-foreground text-sm">
                {filteredWorkOrders.length} {filteredWorkOrders.length === 1 ? 'order' : 'orders'} found
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder="Search by ID, title, tractor..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Work Orders List */}
        <div className="flex-1 px-6 py-6">
          {filteredWorkOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-foreground mb-2">No work orders found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWorkOrders.map((order) => (
                <Card key={order.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground">
                          {order.id}
                        </span>
                        <Badge
                          variant="outline"
                          className={`${getPriorityColor(order.priority)} text-xs`}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getPriorityLabel(order.priority)}
                        </Badge>
                      </div>
                      <h4 className="text-foreground mb-2">{order.title}</h4>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="w-20">Tractor:</span>
                      <span className="text-foreground">{order.tractor}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="w-20">Customer:</span>
                      <span className="text-foreground">{order.customer}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="w-16">Due:</span>
                      <span className="text-foreground">
                        {new Date(order.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      onClick={() => onViewDetails(order.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
