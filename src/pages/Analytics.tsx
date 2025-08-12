import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// Mock data for daily orders by restaurant
const restaurantAnalytics = [
  {
    name: "Pizza Palace",
    cuisine: "Italian",
    data: [
      { day: "Mon", orders: 45 },
      { day: "Tue", orders: 52 },
      { day: "Wed", orders: 38 },
      { day: "Thu", orders: 61 },
      { day: "Fri", orders: 73 },
      { day: "Sat", orders: 89 },
      { day: "Sun", orders: 67 }
    ]
  },
  {
    name: "Burger Barn",
    cuisine: "American",
    data: [
      { day: "Mon", orders: 32 },
      { day: "Tue", orders: 41 },
      { day: "Wed", orders: 29 },
      { day: "Thu", orders: 48 },
      { day: "Fri", orders: 65 },
      { day: "Sat", orders: 78 },
      { day: "Sun", orders: 54 }
    ]
  },
  {
    name: "Sushi Zen",
    cuisine: "Japanese",
    data: [
      { day: "Mon", orders: 28 },
      { day: "Tue", orders: 34 },
      { day: "Wed", orders: 31 },
      { day: "Thu", orders: 42 },
      { day: "Fri", orders: 58 },
      { day: "Sat", orders: 71 },
      { day: "Sun", orders: 49 }
    ]
  },
  {
    name: "Taco Fiesta",
    cuisine: "Mexican",
    data: [
      { day: "Mon", orders: 38 },
      { day: "Tue", orders: 44 },
      { day: "Wed", orders: 35 },
      { day: "Thu", orders: 51 },
      { day: "Fri", orders: 69 },
      { day: "Sat", orders: 82 },
      { day: "Sun", orders: 61 }
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
  const [selectedHotel, setSelectedHotel] = useState<string>(restaurantAnalytics[0].name);

  useEffect(() => {
    document.title = "Analytics - 92 eats Admin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View daily order analytics and performance metrics for hotels in the 92 eats network.');
    }
  }, []);

  const selectedHotelData = restaurantAnalytics.find(hotel => hotel.name === selectedHotel);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Daily order analytics for each hotel
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="hotel-select" className="text-sm font-medium">
          Select Hotel:
        </label>
        <Select value={selectedHotel} onValueChange={setSelectedHotel}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Choose a hotel" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border shadow-lg z-50">
            {restaurantAnalytics.map((hotel) => (
              <SelectItem key={hotel.name} value={hotel.name}>
                {hotel.name} - {hotel.cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedHotelData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedHotelData.name}</CardTitle>
            <CardDescription className="text-base">
              {selectedHotelData.cuisine} cuisine - Daily order trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedHotelData.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="orders" 
                    fill="hsl(var(--primary))" 
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}