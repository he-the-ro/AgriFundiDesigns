import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import {
  ArrowLeft,
  Calendar,
  AlertCircle,
  Truck,
  User,
  Clock,
  Wrench,
  Package,
  Camera,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface WorkOrder {
  id: string;
  title: string;
  status: "in-progress" | "pending" | "completed" | "submitted-for-inspection";
  priority: "high" | "medium" | "low";
  dueDate: string;
  tractor: string;
  customer: string;
  description: string;
  tractorModel: string;
  tractorSerialNumber: string;
  customerPhone: string;
  customerEmail: string;
  location: string;
  assignedDate: string;
  estimatedHours: number;
  actualHours?: number;
  parts: Array<{ name: string; quantity: number; status: string }>;
  checklist: Array<{ task: string; completed: boolean }>;
  notes: string;
}

interface WorkOrderDetailsScreenProps {
  workOrderId: string;
  onBack: () => void;
  onStatusUpdate: (id: string, newStatus: WorkOrder["status"]) => void;
}

// Mock data - in a real app, this would come from props or API
const getWorkOrderDetails = (id: string): WorkOrder => {
  const baseOrders: Record<string, WorkOrder> = {
    "WO-001": {
      id: "WO-001",
      title: "Engine Oil Change & Filter Replacement",
      status: "in-progress",
      priority: "medium",
      dueDate: "2025-10-18",
      tractor: "John Deere 5075E",
      customer: "Green Valley Farm",
      description: "Perform routine engine oil change and replace oil filter. Inspect air filter and check all fluid levels. Customer reported slight engine noise at startup.",
      tractorModel: "John Deere 5075E",
      tractorSerialNumber: "1LV5075EXFH123456",
      customerPhone: "+254 712 345 678",
      customerEmail: "contact@greenvalleyfarm.co.ke",
      location: "Green Valley Farm, Nakuru",
      assignedDate: "2025-10-16",
      estimatedHours: 3,
      actualHours: 2.5,
      parts: [
        { name: "Engine Oil (15W-40)", quantity: 12, status: "Available" },
        { name: "Oil Filter", quantity: 1, status: "Available" },
        { name: "Air Filter", quantity: 1, status: "Ordered" },
      ],
      checklist: [
        { task: "Drain old engine oil", completed: true },
        { task: "Replace oil filter", completed: true },
        { task: "Add new engine oil", completed: true },
        { task: "Check air filter condition", completed: true },
        { task: "Inspect all fluid levels", completed: false },
        { task: "Test run engine", completed: false },
      ],
      notes: "Customer mentioned tractor has been used heavily in the past month. Check for any unusual wear patterns.",
    },
    "WO-002": {
      id: "WO-002",
      title: "Hydraulic System Repair",
      status: "pending",
      priority: "high",
      dueDate: "2025-10-19",
      tractor: "Massey Ferguson 4708",
      customer: "Sunrise Agriculture",
      description: "Hydraulic system showing signs of pressure loss. Customer reports slow loader response and occasional jerky movements. Need to inspect hydraulic pump, hoses, and seals.",
      tractorModel: "Massey Ferguson 4708",
      tractorSerialNumber: "MF4708-2024-789012",
      customerPhone: "+254 723 456 789",
      customerEmail: "maintenance@sunriseag.co.ke",
      location: "Sunrise Agriculture, Eldoret",
      assignedDate: "2025-10-17",
      estimatedHours: 6,
      parts: [
        { name: "Hydraulic Oil (ISO 46)", quantity: 20, status: "Available" },
        { name: "Hydraulic Hose Kit", quantity: 1, status: "Ordered" },
        { name: "Seal Kit", quantity: 1, status: "Available" },
        { name: "Hydraulic Filter", quantity: 2, status: "Available" },
      ],
      checklist: [
        { task: "Pressure test hydraulic system", completed: false },
        { task: "Inspect hydraulic pump", completed: false },
        { task: "Check all hoses for leaks", completed: false },
        { task: "Replace damaged seals", completed: false },
        { task: "Flush hydraulic system", completed: false },
        { task: "Refill hydraulic fluid", completed: false },
        { task: "Test loader operations", completed: false },
      ],
      notes: "High priority - customer needs tractor operational by tomorrow afternoon for scheduled plowing.",
    },
    "WO-003": {
      id: "WO-003",
      title: "Annual Maintenance Inspection",
      status: "in-progress",
      priority: "low",
      dueDate: "2025-10-20",
      tractor: "New Holland T4.75",
      customer: "Riverside Ranch",
      description: "Comprehensive annual maintenance inspection as per manufacturer's service schedule. Includes all major systems check, lubrication, and preventive maintenance.",
      tractorModel: "New Holland T4.75",
      tractorSerialNumber: "NH-T475-2023-456789",
      customerPhone: "+254 734 567 890",
      customerEmail: "operations@riversideranch.co.ke",
      location: "Riverside Ranch, Naivasha",
      assignedDate: "2025-10-17",
      estimatedHours: 8,
      actualHours: 5,
      parts: [
        { name: "Engine Oil", quantity: 10, status: "Available" },
        { name: "Oil Filter", quantity: 1, status: "Available" },
        { name: "Air Filter", quantity: 1, status: "Available" },
        { name: "Fuel Filter", quantity: 1, status: "Available" },
        { name: "Grease", quantity: 2, status: "Available" },
      ],
      checklist: [
        { task: "Engine oil and filter change", completed: true },
        { task: "Air filter replacement", completed: true },
        { task: "Fuel filter replacement", completed: true },
        { task: "Grease all fittings", completed: true },
        { task: "Check brake system", completed: true },
        { task: "Inspect tire condition and pressure", completed: false },
        { task: "Test electrical systems", completed: false },
        { task: "Check coolant system", completed: false },
        { task: "Inspect PTO operation", completed: false },
      ],
      notes: "Customer maintains excellent service records. Tractor is in very good condition overall.",
    },
  };

  return baseOrders[id] || baseOrders["WO-001"];
};

export function WorkOrderDetailsScreen({
  workOrderId,
  onBack,
  onStatusUpdate,
}: WorkOrderDetailsScreenProps) {
  const [workOrder, setWorkOrder] = useState<WorkOrder>(getWorkOrderDetails(workOrderId));
  const [completionNotes, setCompletionNotes] = useState("");
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const handleCompleteTask = () => {
    setShowCompletionDialog(true);
  };

  const handleSubmitCompletion = () => {
    const updatedStatus: WorkOrder["status"] = "submitted-for-inspection";
    setWorkOrder({ ...workOrder, status: updatedStatus });
    onStatusUpdate(workOrder.id, updatedStatus);
    setShowCompletionDialog(false);
  };

  const getStatusColor = (status: WorkOrder["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
      case "completed":
        return "bg-accent/10 text-accent border-accent/20";
      case "submitted-for-inspection":
        return "bg-secondary/10 text-secondary border-secondary/20";
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
      case "submitted-for-inspection":
        return "Submitted for Inspection";
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
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
    }
  };

  const completedTasks = workOrder.checklist.filter((item) => item.completed).length;
  const totalTasks = workOrder.checklist.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="pt-6 pb-4 px-6 bg-background border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">{workOrder.id}</span>
              <Badge variant="outline" className={`${getPriorityColor(workOrder.priority)} text-xs`}>
                <AlertCircle className="w-3 h-3 mr-1" />
                {getPriorityLabel(workOrder.priority)}
              </Badge>
            </div>
            <h2 className="text-foreground">{workOrder.title}</h2>
          </div>
        </div>

        <Badge variant="outline" className={`${getStatusColor(workOrder.status)}`}>
          {getStatusLabel(workOrder.status)}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="space-y-6">
          {/* Description */}
          <Card className="p-4">
            <h3 className="text-foreground mb-2">Work Description</h3>
            <p className="text-muted-foreground text-sm">{workOrder.description}</p>
          </Card>

          {/* Tractor Information */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Tractor Information</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Model:</span>
                <span className="text-sm text-foreground">{workOrder.tractorModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Serial Number:</span>
                <span className="text-sm text-foreground">{workOrder.tractorSerialNumber}</span>
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Customer Information</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="text-sm text-foreground">{workOrder.customer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phone:</span>
                <a href={`tel:${workOrder.customerPhone}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {workOrder.customerPhone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email:</span>
                <a href={`mailto:${workOrder.customerEmail}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {workOrder.customerEmail.split('@')[0]}@...
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="text-sm text-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {workOrder.location}
                </span>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Timeline</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Assigned Date:</span>
                <span className="text-sm text-foreground">
                  {new Date(workOrder.assignedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Due Date:</span>
                <span className="text-sm text-foreground">
                  {new Date(workOrder.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estimated Hours:</span>
                <span className="text-sm text-foreground">{workOrder.estimatedHours}h</span>
              </div>
              {workOrder.actualHours && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Actual Hours:</span>
                  <span className="text-sm text-foreground">{workOrder.actualHours}h</span>
                </div>
              )}
            </div>
          </Card>

          {/* Parts Required */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Parts & Materials</h3>
            </div>
            <div className="space-y-3">
              {workOrder.parts.map((part, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{part.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {part.quantity}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      part.status === "Available"
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {part.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Checklist Progress */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                <h3 className="text-foreground">Task Checklist</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {completedTasks}/{totalTasks}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {workOrder.checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.completed
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted border-2 border-border"
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span
                    className={`text-sm ${
                      item.completed ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <h3 className="text-foreground mb-2">Technician Notes</h3>
            <p className="text-sm text-muted-foreground">{workOrder.notes}</p>
          </Card>

          {/* Completion Dialog */}
          {showCompletionDialog && (
            <Card className="p-4 border-2 border-primary/50 bg-primary/5">
              <h3 className="text-foreground mb-3">Complete Work Order</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add any final notes before submitting this work order for inspection.
              </p>
              <Textarea
                placeholder="Add completion notes, observations, or recommendations..."
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                className="mb-4 min-h-24"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCompletionDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitCompletion} className="flex-1 gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Submit for Inspection
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Action Button */}
      {workOrder.status === "in-progress" && !showCompletionDialog && (
        <div className="p-6 pt-4 border-t border-border bg-background sticky bottom-0">
          <Button onClick={handleCompleteTask} className="w-full gap-2 h-12 shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
            Complete Task
          </Button>
        </div>
      )}

      {workOrder.status === "submitted-for-inspection" && (
        <div className="p-6 pt-4 border-t border-border bg-background sticky bottom-0">
          <div className="flex items-center justify-center gap-2 text-secondary">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Awaiting inspection approval</span>
          </div>
        </div>
      )}
    </div>
  );
}
