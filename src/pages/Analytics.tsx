import { useEffect } from "react";
import { Layout } from "@/components/admin/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// Mock data for daily orders by restaurant
const restaurantAnalytics = [
  {
    name: "Pizza Palace",
    cuisine: "Italian",
    data: [
      { day: "Monday", orders: 45 },
      { day: "Tuesday", orders: 52 },
      { day: "Wednesday", orders: 38 },
      { day: "Thursday", orders: 61 },
      { day: "Friday", orders: 73 },
      { day: "Saturday", orders: 89 },
      { day: "Sunday", orders: 67 }
    ]
  },
  {
    name: "Burger Barn",
    cuisine: "American",
    data: [
      { day: "Monday", orders: 32 },
      { day: "Tuesday", orders: 41 },
      { day: "Wednesday", orders: 29 },
      { day: "Thursday", orders: 48 },
      { day: "Friday", orders: 65 },
      { day: "Saturday", orders: 78 },
      { day: "Sunday", orders: 54 }
    ]
  },
  {
    name: "Sushi Zen",
    cuisine: "Japanese",
    data: [
      { day: "Monday", orders: 28 },
      { day: "Tuesday", orders: 34 },
      { day: "Wednesday", orders: 31 },
      { day: "Thursday", orders: 42 },
      { day: "Friday", orders: 58 },
      { day: "Saturday", orders: 71 },
      { day: "Sunday", orders: 49 }
    ]
  },
  {
    name: "Taco Fiesta",
    cuisine: "Mexican",
    data: [
      { day: "Monday", orders: 38 },
      { day: "Tuesday", orders: 44 },
      { day: "Wednesday", orders: 35 },
      { day: "Thursday", orders: 51 },
      { day: "Friday", orders: 69 },
      { day: "Saturday", orders: 82 },
      { day: "Sunday", orders: 61 }
    ]
  }
];

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
};

export default function Analytics() {
  useEffect(() => {
    document.title = "Analytics - Restaurant Dashboard";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View daily order analytics and performance metrics for all restaurants in the delivery network.');
    }
  }, []);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Daily order analytics for each restaurant
          </p>
        </div>

        <div className="grid gap-6">
          {restaurantAnalytics.map((restaurant) => (
            <Card key={restaurant.name}>
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>
                  {restaurant.cuisine} cuisine - Daily order trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={restaurant.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="day" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="orders" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}