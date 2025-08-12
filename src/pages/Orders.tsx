import { useEffect, useMemo } from "react";
import { Layout } from "@/components/admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ShoppingBag, Building2 } from "lucide-react";

// Mock orders data grouped by restaurant (hotel)
// Replace with Supabase data later
const mockOrders = [
  { id: "#ORD-101", customer: "John Doe", restaurant: "Pizza Palace", status: "delivered" as const },
  { id: "#ORD-102", customer: "Mary Lee", restaurant: "Pizza Palace", status: "canceled" as const, canceledBy: "Sarah Wilson" },
  { id: "#ORD-103", customer: "Mike Chen", restaurant: "Pizza Palace", status: "delivered" as const },

  { id: "#ORD-201", customer: "Jane Smith", restaurant: "Burger Hub", status: "delivered" as const },
  { id: "#ORD-202", customer: "Alex Carter", restaurant: "Burger Hub", status: "canceled" as const, canceledBy: "Admin Mark" },
  { id: "#ORD-203", customer: "Priya Gupta", restaurant: "Burger Hub", status: "canceled" as const, canceledBy: "Admin Mark" },

  { id: "#ORD-301", customer: "Liam Wong", restaurant: "Sushi Master", status: "delivered" as const },
  { id: "#ORD-302", customer: "Emma Brown", restaurant: "Sushi Master", status: "delivered" as const },

  { id: "#ORD-401", customer: "Carlos Diaz", restaurant: "Taco Fiesta", status: "canceled" as const, canceledBy: "Maria Garcia" },
  { id: "#ORD-402", customer: "Olivia Park", restaurant: "Taco Fiesta", status: "delivered" as const },
];

export default function Orders() {
  // SEO
  useEffect(() => {
    document.title = "Orders Overview | 92 eats Admin";
    const desc = "Orders overview by hotel: totals, successful and canceled orders with canceler names.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const summaries = useMemo(() => {
    const map: Record<string, { restaurant: string; total: number; success: number; canceled: number; canceledBy: string[] }>
      = {};
    for (const order of mockOrders) {
      const key = order.restaurant;
      if (!map[key]) {
        map[key] = { restaurant: key, total: 0, success: 0, canceled: 0, canceledBy: [] };
      }
      map[key].total += 1;
      if (order.status === "delivered") map[key].success += 1;
      if (order.status === "canceled") {
        map[key].canceled += 1;
        if ((order as any).canceledBy) {
          const name = (order as any).canceledBy as string;
          if (!map[key].canceledBy.includes(name)) map[key].canceledBy.push(name);
        }
      }
    }
    return Object.values(map);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders Overview</h1>
            <p className="text-muted-foreground">Per-hotel summary of total, successful, and canceled orders</p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {summaries.map((s) => (
            <Card key={s.restaurant} className="hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
                    <Building2 className="w-4 h-4 text-white" />
                  </span>
                  <span>{s.restaurant}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Total</span>
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">{s.total}</div>
                  </div>

                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Successful</span>
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-success">{s.success}</div>
                  </div>

                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <XCircle className="w-4 h-4 text-destructive" />
                      <span>Canceled</span>
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-destructive">{s.canceled}</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Canceled by</p>
                  {s.canceledBy.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {s.canceledBy.map((name) => (
                        <Badge key={name} variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No cancellations</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </Layout>
  );
}
