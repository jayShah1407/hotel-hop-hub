import { StatsCard } from "@/components/admin/StatsCard";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { RestaurantCard } from "@/components/admin/RestaurantCard";
import { Store, ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Restaurants",
    value: "45",
    change: "+12% from last month",
    changeType: "positive" as const,
    icon: Store,
  },
  {
    title: "Active Orders",
    value: "126",
    change: "+8% from yesterday",
    changeType: "positive" as const,
    icon: ShoppingBag,
  },
  {
    title: "Total Users",
    value: "2,847",
    change: "+23% from last month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Revenue Today",
    value: "$12,450",
    change: "+18% from yesterday",
    changeType: "positive" as const,
    icon: DollarSign,
  },
];

const topRestaurants = [
  {
    id: "1",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.8,
    location: "Downtown",
    status: "active" as const,
    orders: 24,
    revenue: "$1,245",
  },
  {
    id: "2",
    name: "Burger Hub",
    cuisine: "American",
    rating: 4.6,
    location: "Midtown",
    status: "active" as const,
    orders: 18,
    revenue: "$987",
  },
  {
    id: "3",
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.9,
    location: "Uptown",
    status: "pending" as const,
    orders: 12,
    revenue: "$756",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-white/90 text-lg">
              Monitor your delivery network and track performance across all restaurants.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <TrendingUp className="w-12 h-12 text-white/80" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="lg:col-span-2">
          <OrdersTable />
        </div>

        {/* Top Restaurants */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Top Restaurants</h3>
          <div className="space-y-4">
            {topRestaurants.map((restaurant, index) => (
              <div 
                key={restaurant.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <RestaurantCard {...restaurant} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}