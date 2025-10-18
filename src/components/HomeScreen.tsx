import { useState } from "react";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Search, FileText, Truck, User, Users, Calendar, Bell, AlertCircle, Wrench } from "lucide-react";

interface HomeScreenProps {
  onNavigateToWorkOrders: () => void;
  onNavigateToTractors: () => void;
  onNavigateToCustomers: () => void;
  onNavigateToServices: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
  onViewWorkOrderDetails: (workOrderId: string) => void;
}

interface WorkOrder {
  id: string;
  title: string;
  status: "in-progress" | "pending" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: string;
  tractor: string;
  customer: string;
}

const activeWorkOrders: WorkOrder[] = [
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
    tractor: "Kubota M5-111",
    customer: "Highland Estates",
  },
];

const completedWorkOrders: WorkOrder[] = [
  {
    id: "WO-005",
    title: "Transmission Fluid Service",
    status: "completed",
    priority: "medium",
    dueDate: "2025-10-15",
    tractor: "Case IH Farmall 75C",
    customer: "Meadow Springs Farm",
  },
  {
    id: "WO-006",
    title: "Tire Replacement - Front Axle",
    status: "completed",
    priority: "high",
    dueDate: "2025-10-14",
    tractor: "John Deere 6120M",
    customer: "Valley View Agriculture",
  },
  {
    id: "WO-007",
    title: "Air Filter & Cabin Filter Change",
    status: "completed",
    priority: "low",
    dueDate: "2025-10-12",
    tractor: "Fendt 516 Vario",
    customer: "Green Valley Farm",
  },
];

export function HomeScreen({ 
  onNavigateToWorkOrders, 
  onNavigateToTractors,
  onNavigateToCustomers,
  onNavigateToServices,
  onNavigateToNotifications,
  onNavigateToProfile,
  onViewWorkOrderDetails 
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: WorkOrder["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "pending":
        return "bg-secondary/10 text-secondary border border-secondary/30";
      case "completed":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
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
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: WorkOrder["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border border-destructive/30";
      case "medium":
        return "bg-primary/10 text-primary border border-primary/30";
      case "low":
        return "bg-accent/10 text-accent-foreground border border-accent/30";
      default:
        return "bg-muted text-muted-foreground";
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
      default:
        return priority;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time part for comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return "Today";
    } else if (date.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  };

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Content */}
      <div className="flex flex-col size-full overflow-auto">
        {/* Header */}
        <div className="pt-6 pb-4 px-6 bg-background">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-foreground">Hello, John 👋</h2>
              <p className="text-muted-foreground text-sm">Let's get things done!</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onNavigateToNotifications}
                className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              >
                <Bell className="w-5 h-5 text-primary-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <button 
                onClick={onNavigateToProfile}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              >
                <User className="w-5 h-5 text-secondary-foreground" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder="Search work orders, tractors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="px-6 py-4 bg-background">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div onClick={onNavigateToWorkOrders} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity min-w-fit">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs text-center">Work Orders</span>
            </div>

            <div onClick={onNavigateToTractors} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity min-w-fit">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs text-center">Tractors</span>
            </div>

            <div onClick={onNavigateToServices} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity min-w-fit">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                <Wrench className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs text-center">Services</span>
            </div>

            <div onClick={onNavigateToCustomers} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity min-w-fit">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs text-center">Customers</span>
            </div>
          </div>
        </div>

        {/* Work Orders Tabs */}
        <div className="flex-1 px-6 py-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-foreground">My Work Orders</h3>
              <p className="text-muted-foreground text-sm">Track your active and completed tasks</p>
            </div>
            <button onClick={onNavigateToWorkOrders} className="text-primary text-sm hover:underline mt-1">
              View All
            </button>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeWorkOrders.map((order) => (
                <Card
                  key={order.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onViewWorkOrderDetails(order.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <Badge className={getPriorityColor(order.priority)}>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getPriorityLabel(order.priority)}
                        </Badge>
                      </div>
                      <h3 className="text-sm mb-2">{order.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>{order.tractor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {formatDate(order.dueDate)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedWorkOrders.map((order) => (
                <Card
                  key={order.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onViewWorkOrderDetails(order.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <Badge className={getPriorityColor(order.priority)}>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getPriorityLabel(order.priority)}
                        </Badge>
                      </div>
                      <h3 className="text-sm mb-2">{order.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>{order.tractor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {formatDate(order.dueDate)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
