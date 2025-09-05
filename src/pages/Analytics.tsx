import { useEffect, useState } from "react";
import { Layout } from "@/components/admin/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

// Mock data for yearly revenue by restaurant
const restaurantRevenueData = {
  "Pizza Palace": {
    2024: [
      { month: "Jan", revenue: 45000 },
      { month: "Feb", revenue: 52000 },
      { month: "Mar", revenue: 48000 },
      { month: "Apr", revenue: 61000 },
      { month: "May", revenue: 73000 },
      { month: "Jun", revenue: 89000 },
      { month: "Jul", revenue: 94000 },
      { month: "Aug", revenue: 87000 },
      { month: "Sep", revenue: 79000 },
      { month: "Oct", revenue: 68000 },
      { month: "Nov", revenue: 72000 },
      { month: "Dec", revenue: 95000 }
    ],
    2025: [
      { month: "Jan", revenue: 67000 },
      { month: "Feb", revenue: 72000 },
      { month: "Mar", revenue: 65000 },
      { month: "Apr", revenue: 78000 },
      { month: "May", revenue: 85000 },
      { month: "Jun", revenue: 92000 },
      { month: "Jul", revenue: 98000 },
      { month: "Aug", revenue: 89000 },
      { month: "Sep", revenue: 82000 },
      { month: "Oct", revenue: 76000 },
      { month: "Nov", revenue: 81000 },
      { month: "Dec", revenue: 105000 }
    ]
  },
  "Burger Barn": {
    2024: [
      { month: "Jan", revenue: 32000 },
      { month: "Feb", revenue: 41000 },
      { month: "Mar", revenue: 39000 },
      { month: "Apr", revenue: 48000 },
      { month: "May", revenue: 65000 },
      { month: "Jun", revenue: 78000 },
      { month: "Jul", revenue: 82000 },
      { month: "Aug", revenue: 74000 },
      { month: "Sep", revenue: 69000 },
      { month: "Oct", revenue: 58000 },
      { month: "Nov", revenue: 62000 },
      { month: "Dec", revenue: 84000 }
    ],
    2025: [
      { month: "Jan", revenue: 54000 },
      { month: "Feb", revenue: 59000 },
      { month: "Mar", revenue: 52000 },
      { month: "Apr", revenue: 67000 },
      { month: "May", revenue: 74000 },
      { month: "Jun", revenue: 81000 },
      { month: "Jul", revenue: 87000 },
      { month: "Aug", revenue: 79000 },
      { month: "Sep", revenue: 73000 },
      { month: "Oct", revenue: 68000 },
      { month: "Nov", revenue: 72000 },
      { month: "Dec", revenue: 89000 }
    ]
  },
  "Sushi Zen": {
    2024: [
      { month: "Jan", revenue: 28000 },
      { month: "Feb", revenue: 34000 },
      { month: "Mar", revenue: 31000 },
      { month: "Apr", revenue: 42000 },
      { month: "May", revenue: 58000 },
      { month: "Jun", revenue: 71000 },
      { month: "Jul", revenue: 76000 },
      { month: "Aug", revenue: 68000 },
      { month: "Sep", revenue: 62000 },
      { month: "Oct", revenue: 54000 },
      { month: "Nov", revenue: 59000 },
      { month: "Dec", revenue: 78000 }
    ],
    2025: [
      { month: "Jan", revenue: 49000 },
      { month: "Feb", revenue: 54000 },
      { month: "Mar", revenue: 48000 },
      { month: "Apr", revenue: 61000 },
      { month: "May", revenue: 69000 },
      { month: "Jun", revenue: 76000 },
      { month: "Jul", revenue: 82000 },
      { month: "Aug", revenue: 74000 },
      { month: "Sep", revenue: 68000 },
      { month: "Oct", revenue: 63000 },
      { month: "Nov", revenue: 67000 },
      { month: "Dec", revenue: 84000 }
    ]
  },
  "Taco Fiesta": {
    2024: [
      { month: "Jan", revenue: 38000 },
      { month: "Feb", revenue: 44000 },
      { month: "Mar", revenue: 41000 },
      { month: "Apr", revenue: 51000 },
      { month: "May", revenue: 69000 },
      { month: "Jun", revenue: 82000 },
      { month: "Jul", revenue: 87000 },
      { month: "Aug", revenue: 79000 },
      { month: "Sep", revenue: 74000 },
      { month: "Oct", revenue: 65000 },
      { month: "Nov", revenue: 70000 },
      { month: "Dec", revenue: 91000 }
    ],
    2025: [
      { month: "Jan", revenue: 61000 },
      { month: "Feb", revenue: 67000 },
      { month: "Mar", revenue: 59000 },
      { month: "Apr", revenue: 74000 },
      { month: "May", revenue: 82000 },
      { month: "Jun", revenue: 89000 },
      { month: "Jul", revenue: 95000 },
      { month: "Aug", revenue: 87000 },
      { month: "Sep", revenue: 81000 },
      { month: "Oct", revenue: 76000 },
      { month: "Nov", revenue: 80000 },
      { month: "Dec", revenue: 98000 }
    ]
  }
};

// Mock data for menu item sales by restaurant
const menuItemSalesData = {
  "Pizza Palace": {
    2024: [
      { month: "Jan", "Margherita Pizza": 120, "Pepperoni Pizza": 145, "Caesar Salad": 89, "Garlic Bread": 67 },
      { month: "Feb", "Margherita Pizza": 135, "Pepperoni Pizza": 162, "Caesar Salad": 94, "Garlic Bread": 78 },
      { month: "Mar", "Margherita Pizza": 128, "Pepperoni Pizza": 151, "Caesar Salad": 87, "Garlic Bread": 71 },
      { month: "Apr", "Margherita Pizza": 156, "Pepperoni Pizza": 189, "Caesar Salad": 112, "Garlic Bread": 89 },
      { month: "May", "Margherita Pizza": 178, "Pepperoni Pizza": 214, "Caesar Salad": 134, "Garlic Bread": 102 },
      { month: "Jun", "Margherita Pizza": 201, "Pepperoni Pizza": 241, "Caesar Salad": 156, "Garlic Bread": 118 },
      { month: "Jul", "Margherita Pizza": 215, "Pepperoni Pizza": 258, "Caesar Salad": 167, "Garlic Bread": 127 },
      { month: "Aug", "Margherita Pizza": 194, "Pepperoni Pizza": 233, "Caesar Salad": 149, "Garlic Bread": 114 },
      { month: "Sep", "Margherita Pizza": 182, "Pepperoni Pizza": 219, "Caesar Salad": 141, "Garlic Bread": 107 },
      { month: "Oct", "Margherita Pizza": 165, "Pepperoni Pizza": 198, "Caesar Salad": 127, "Garlic Bread": 96 },
      { month: "Nov", "Margherita Pizza": 173, "Pepperoni Pizza": 208, "Caesar Salad": 133, "Garlic Bread": 101 },
      { month: "Dec", "Margherita Pizza": 232, "Pepperoni Pizza": 279, "Caesar Salad": 178, "Garlic Bread": 135 }
    ],
    2025: [
      { month: "Jan", "Margherita Pizza": 145, "Pepperoni Pizza": 174, "Caesar Salad": 112, "Garlic Bread": 85 },
      { month: "Feb", "Margherita Pizza": 158, "Pepperoni Pizza": 190, "Caesar Salad": 122, "Garlic Bread": 93 },
      { month: "Mar", "Margherita Pizza": 149, "Pepperoni Pizza": 179, "Caesar Salad": 115, "Garlic Bread": 87 },
      { month: "Apr", "Margherita Pizza": 167, "Pepperoni Pizza": 201, "Caesar Salad": 129, "Garlic Bread": 98 },
      { month: "May", "Margherita Pizza": 189, "Pepperoni Pizza": 227, "Caesar Salad": 146, "Garlic Bread": 111 },
      { month: "Jun", "Margherita Pizza": 212, "Pepperoni Pizza": 255, "Caesar Salad": 164, "Garlic Bread": 124 },
      { month: "Jul", "Margherita Pizza": 227, "Pepperoni Pizza": 273, "Caesar Salad": 175, "Garlic Bread": 133 },
      { month: "Aug", "Margherita Pizza": 205, "Pepperoni Pizza": 246, "Caesar Salad": 158, "Garlic Bread": 120 },
      { month: "Sep", "Margherita Pizza": 193, "Pepperoni Pizza": 232, "Caesar Salad": 149, "Garlic Bread": 113 },
      { month: "Oct", "Margherita Pizza": 176, "Pepperoni Pizza": 211, "Caesar Salad": 136, "Garlic Bread": 103 },
      { month: "Nov", "Margherita Pizza": 184, "Pepperoni Pizza": 221, "Caesar Salad": 142, "Garlic Bread": 108 },
      { month: "Dec", "Margherita Pizza": 245, "Pepperoni Pizza": 294, "Caesar Salad": 189, "Garlic Bread": 143 }
    ]
  },
  "Burger Barn": {
    2024: [
      { month: "Jan", "Classic Burger": 89, "Cheese Burger": 112, "Chicken Burger": 78, "Fries": 156 },
      { month: "Feb", "Classic Burger": 98, "Cheese Burger": 123, "Chicken Burger": 87, "Fries": 172 },
      { month: "Mar", "Classic Burger": 94, "Cheese Burger": 118, "Chicken Burger": 83, "Fries": 165 },
      { month: "Apr", "Classic Burger": 114, "Cheese Burger": 143, "Chicken Burger": 101, "Fries": 198 },
      { month: "May", "Classic Burger": 145, "Cheese Burger": 182, "Chicken Burger": 128, "Fries": 251 },
      { month: "Jun", "Classic Burger": 167, "Cheese Burger": 209, "Chicken Burger": 147, "Fries": 289 },
      { month: "Jul", "Classic Burger": 178, "Cheese Burger": 223, "Chicken Burger": 157, "Fries": 308 },
      { month: "Aug", "Classic Burger": 156, "Cheese Burger": 195, "Chicken Burger": 137, "Fries": 269 },
      { month: "Sep", "Classic Burger": 143, "Cheese Burger": 179, "Chicken Burger": 126, "Fries": 247 },
      { month: "Oct", "Classic Burger": 127, "Cheese Burger": 159, "Chicken Burger": 112, "Fries": 220 },
      { month: "Nov", "Classic Burger": 134, "Cheese Burger": 168, "Chicken Burger": 118, "Fries": 232 },
      { month: "Dec", "Classic Burger": 189, "Cheese Burger": 237, "Chicken Burger": 166, "Fries": 326 }
    ],
    2025: [
      { month: "Jan", "Classic Burger": 112, "Cheese Burger": 140, "Chicken Burger": 98, "Fries": 193 },
      { month: "Feb", "Classic Burger": 123, "Cheese Burger": 154, "Chicken Burger": 108, "Fries": 212 },
      { month: "Mar", "Classic Burger": 117, "Cheese Burger": 146, "Chicken Burger": 103, "Fries": 202 },
      { month: "Apr", "Classic Burger": 134, "Cheese Burger": 168, "Chicken Burger": 118, "Fries": 231 },
      { month: "May", "Classic Burger": 156, "Cheese Burger": 195, "Chicken Burger": 137, "Fries": 269 },
      { month: "Jun", "Classic Burger": 178, "Cheese Burger": 223, "Chicken Burger": 156, "Fries": 307 },
      { month: "Jul", "Classic Burger": 189, "Cheese Burger": 236, "Chicken Burger": 166, "Fries": 325 },
      { month: "Aug", "Classic Burger": 167, "Cheese Burger": 209, "Chicken Burger": 147, "Fries": 288 },
      { month: "Sep", "Classic Burger": 154, "Cheese Burger": 193, "Chicken Burger": 135, "Fries": 266 },
      { month: "Oct", "Classic Burger": 138, "Cheese Burger": 173, "Chicken Burger": 121, "Fries": 238 },
      { month: "Nov", "Classic Burger": 145, "Cheese Burger": 181, "Chicken Burger": 127, "Fries": 250 },
      { month: "Dec", "Classic Burger": 201, "Cheese Burger": 251, "Chicken Burger": 176, "Fries": 345 }
    ]
  },
  "Sushi Zen": {
    2024: [
      { month: "Jan", "California Roll": 67, "Salmon Sashimi": 89, "Miso Soup": 123, "Tempura": 45 },
      { month: "Feb", "California Roll": 73, "Salmon Sashimi": 97, "Miso Soup": 134, "Tempura": 51 },
      { month: "Mar", "California Roll": 69, "Salmon Sashimi": 92, "Miso Soup": 127, "Tempura": 48 },
      { month: "Apr", "California Roll": 81, "Salmon Sashimi": 108, "Miso Soup": 149, "Tempura": 56 },
      { month: "May", "California Roll": 98, "Salmon Sashimi": 131, "Miso Soup": 181, "Tempura": 68 },
      { month: "Jun", "California Roll": 112, "Salmon Sashimi": 149, "Miso Soup": 206, "Tempura": 77 },
      { month: "Jul", "California Roll": 119, "Salmon Sashimi": 159, "Miso Soup": 219, "Tempura": 82 },
      { month: "Aug", "California Roll": 105, "Salmon Sashimi": 140, "Miso Soup": 193, "Tempura": 72 },
      { month: "Sep", "California Roll": 96, "Salmon Sashimi": 128, "Miso Soup": 176, "Tempura": 66 },
      { month: "Oct", "California Roll": 84, "Salmon Sashimi": 112, "Miso Soup": 154, "Tempura": 58 },
      { month: "Nov", "California Roll": 89, "Salmon Sashimi": 119, "Miso Soup": 164, "Tempura": 61 },
      { month: "Dec", "California Roll": 123, "Salmon Sashimi": 164, "Miso Soup": 226, "Tempura": 85 }
    ],
    2025: [
      { month: "Jan", "California Roll": 87, "Salmon Sashimi": 116, "Miso Soup": 160, "Tempura": 60 },
      { month: "Feb", "California Roll": 94, "Salmon Sashimi": 125, "Miso Soup": 173, "Tempura": 65 },
      { month: "Mar", "California Roll": 89, "Salmon Sashimi": 119, "Miso Soup": 164, "Tempura": 61 },
      { month: "Apr", "California Roll": 103, "Salmon Sashimi": 137, "Miso Soup": 189, "Tempura": 71 },
      { month: "May", "California Roll": 118, "Salmon Sashimi": 157, "Miso Soup": 217, "Tempura": 81 },
      { month: "Jun", "California Roll": 131, "Salmon Sashimi": 175, "Miso Soup": 241, "Tempura": 90 },
      { month: "Jul", "California Roll": 139, "Salmon Sashimi": 185, "Miso Soup": 256, "Tempura": 96 },
      { month: "Aug", "California Roll": 124, "Salmon Sashimi": 165, "Miso Soup": 228, "Tempura": 85 },
      { month: "Sep", "California Roll": 115, "Salmon Sashimi": 153, "Miso Soup": 211, "Tempura": 79 },
      { month: "Oct", "California Roll": 102, "Salmon Sashimi": 136, "Miso Soup": 187, "Tempura": 70 },
      { month: "Nov", "California Roll": 108, "Salmon Sashimi": 144, "Miso Soup": 199, "Tempura": 74 },
      { month: "Dec", "California Roll": 146, "Salmon Sashimi": 195, "Miso Soup": 269, "Tempura": 101 }
    ]
  },
  "Taco Fiesta": {
    2024: [
      { month: "Jan", "Beef Tacos": 89, "Chicken Quesadilla": 67, "Guacamole": 112, "Nachos": 78 },
      { month: "Feb", "Beef Tacos": 97, "Chicken Quesadilla": 74, "Guacamole": 123, "Nachos": 86 },
      { month: "Mar", "Beef Tacos": 92, "Chicken Quesadilla": 70, "Guacamole": 117, "Nachos": 82 },
      { month: "Apr", "Beef Tacos": 108, "Chicken Quesadilla": 82, "Guacamole": 137, "Nachos": 96 },
      { month: "May", "Beef Tacos": 131, "Chicken Quesadilla": 99, "Guacamole": 166, "Nachos": 116 },
      { month: "Jun", "Beef Tacos": 149, "Chicken Quesadilla": 113, "Guacamole": 189, "Nachos": 132 },
      { month: "Jul", "Beef Tacos": 158, "Chicken Quesadilla": 120, "Guacamole": 201, "Nachos": 140 },
      { month: "Aug", "Beef Tacos": 141, "Chicken Quesadilla": 107, "Guacamole": 179, "Nachos": 125 },
      { month: "Sep", "Beef Tacos": 132, "Chicken Quesadilla": 100, "Guacamole": 168, "Nachos": 117 },
      { month: "Oct", "Beef Tacos": 117, "Chicken Quesadilla": 89, "Guacamole": 149, "Nachos": 104 },
      { month: "Nov", "Beef Tacos": 123, "Chicken Quesadilla": 93, "Guacamole": 157, "Nachos": 109 },
      { month: "Dec", "Beef Tacos": 167, "Chicken Quesadilla": 127, "Guacamole": 212, "Nachos": 148 }
    ],
    2025: [
      { month: "Jan", "Beef Tacos": 114, "Chicken Quesadilla": 86, "Guacamole": 145, "Nachos": 101 },
      { month: "Feb", "Beef Tacos": 123, "Chicken Quesadilla": 93, "Guacamole": 156, "Nachos": 109 },
      { month: "Mar", "Beef Tacos": 117, "Chicken Quesadilla": 89, "Guacamole": 149, "Nachos": 104 },
      { month: "Apr", "Beef Tacos": 132, "Chicken Quesadilla": 100, "Guacamole": 168, "Nachos": 117 },
      { month: "May", "Beef Tacos": 149, "Chicken Quesadilla": 113, "Guacamole": 189, "Nachos": 132 },
      { month: "Jun", "Beef Tacos": 164, "Chicken Quesadilla": 124, "Guacamole": 208, "Nachos": 145 },
      { month: "Jul", "Beef Tacos": 173, "Chicken Quesadilla": 131, "Guacamole": 220, "Nachos": 154 },
      { month: "Aug", "Beef Tacos": 156, "Chicken Quesadilla": 118, "Guacamole": 198, "Nachos": 138 },
      { month: "Sep", "Beef Tacos": 147, "Chicken Quesadilla": 111, "Guacamole": 187, "Nachos": 130 },
      { month: "Oct", "Beef Tacos": 132, "Chicken Quesadilla": 100, "Guacamole": 168, "Nachos": 117 },
      { month: "Nov", "Beef Tacos": 138, "Chicken Quesadilla": 105, "Guacamole": 176, "Nachos": 123 },
      { month: "Dec", "Beef Tacos": 186, "Chicken Quesadilla": 141, "Guacamole": 236, "Nachos": 165 }
    ]
  }
};

const restaurants = Object.keys(restaurantRevenueData);
const availableYears = [2024, 2025];

const chartConfig = {
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(var(--primary))",
  },
};

export default function Analytics() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>(restaurants[0]);
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[1]);

  useEffect(() => {
    document.title = "Analytics - 92 eats Admin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View yearly revenue analytics and menu item sales for restaurants in the 92 eats network.');
    }
  }, []);

  const revenueData = restaurantRevenueData[selectedRestaurant as keyof typeof restaurantRevenueData]?.[selectedYear] || [];
  const menuSalesData = menuItemSalesData[selectedRestaurant as keyof typeof menuItemSalesData]?.[selectedYear] || [];

  // Get menu items for the selected restaurant
  const menuItems = menuSalesData.length > 0 ? Object.keys(menuSalesData[0]).filter(key => key !== 'month') : [];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Yearly revenue and menu item sales analytics for each restaurant
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="restaurant-select" className="text-sm font-medium">
              Select Restaurant:
            </label>
            <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Choose a restaurant" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                {restaurants.map((restaurant) => (
                  <SelectItem key={restaurant} value={restaurant}>
                    {restaurant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="year-select" className="text-sm font-medium">
              Select Year:
            </label>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedRestaurant} - Revenue Analytics</CardTitle>
            <CardDescription className="text-base">
              Monthly revenue for {selectedYear}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                    />} 
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsl(var(--primary))" 
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Menu Item Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Menu Item Sales</CardTitle>
            <CardDescription className="text-base">
              Monthly sales by menu item for {selectedYear}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={menuSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                    label={{ value: 'Units Sold', angle: -90, position: 'insideLeft' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {menuItems.map((item, index) => (
                    <Line
                      key={item}
                      type="monotone"
                      dataKey={item}
                      stroke={`hsl(${(index * 360) / menuItems.length}, 70%, 50%)`}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}