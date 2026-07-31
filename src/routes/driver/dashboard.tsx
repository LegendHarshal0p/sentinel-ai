import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  Package,
  Star,
  TrendingUp,
  Truck,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/driver/dashboard")({
  component: DriverDashboard,
});

const mockDeliveries = [
  { id: "DEL-001", customer: "Alice Johnson", address: "123 Main St, NYC", status: "in_transit", eta: "15 min" },
  { id: "DEL-002", customer: "Bob Smith", address: "456 Oak Ave, NYC", status: "pending", eta: "45 min" },
  { id: "DEL-003", customer: "Carol White", address: "789 Pine Rd, NYC", status: "pending", eta: "1h 20min" },
];

const mockStats = {
  todayDeliveries: 8,
  completed: 5,
  earnings: 142.50,
  rating: 4.8,
  totalDistance: "34.2 km",
};

function DriverDashboard() {
  const { profile } = useAuth();

  return (
    <AppShell
      title={`Welcome back, ${profile?.full_name || "Driver"}`}
      description="Here's your delivery overview for today."
    >
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-surface rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
              <Package className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">{mockStats.todayDeliveries}</p>
              <p className="text-xs text-muted-foreground">Today's Deliveries</p>
            </div>
          </div>
        </div>

        <div className="card-surface rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-healthy/12 text-healthy">
              <CheckCircle2 className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">{mockStats.completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>

        <div className="card-surface rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-ai/12 text-ai">
              <DollarSign className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">${mockStats.earnings}</p>
              <p className="text-xs text-muted-foreground">Today's Earnings</p>
            </div>
          </div>
        </div>

        <div className="card-surface rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-warning/12 text-warning">
              <Star className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">{mockStats.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 card-surface rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Daily Progress</p>
            <p className="text-xs text-muted-foreground">{mockStats.completed} of {mockStats.todayDeliveries} deliveries completed</p>
          </div>
          <span className="text-sm font-bold text-primary">
            {Math.round((mockStats.completed / mockStats.todayDeliveries) * 100)}%
          </span>
        </div>
        <Progress value={(mockStats.completed / mockStats.todayDeliveries) * 100} className="mt-3 h-2" />
      </div>

      {/* Active Deliveries */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold">Active Deliveries</h2>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Navigation className="size-4 mr-1" /> Open Navigation
          </Button>
        </div>

        <div className="space-y-3">
          {mockDeliveries.map((delivery) => (
            <div key={delivery.id} className="card-surface rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-xl ${
                    delivery.status === "in_transit" ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {delivery.status === "in_transit" ? <Truck className="size-5" /> : <Package className="size-5" />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{delivery.customer}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {delivery.address}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    delivery.status === "in_transit"
                      ? "bg-primary/12 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {delivery.status === "in_transit" ? (
                      <><TrendingUp className="size-3" /> In Transit</>
                    ) : (
                      <><Clock className="size-3" /> Pending</>
                    )}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">ETA: {delivery.eta}</p>
                </div>
              </div>
              {delivery.status === "in_transit" && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="flex-1 rounded-xl">
                    Mark Delivered
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Issue
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}