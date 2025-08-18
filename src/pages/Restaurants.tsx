import { useState } from "react";
import { Layout } from "@/components/admin/Layout";
import { RestaurantCard } from "@/components/admin/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Plus, Filter, Calendar, Star, MapPin } from "lucide-react";

// Mock data - replace with Supabase data
const mockRestaurants = [
  {
    id: "1",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    location: "Downtown",
    status: "active" as const,
    orders: 45,
    revenue: "£2,340",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Burger Hub",
    cuisine: "American",
    rating: 4.2,
    location: "Mall Area",
    status: "active" as const,
    orders: 32,
    revenue: "£1,890",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Sushi Express",
    cuisine: "Japanese",
    rating: 4.8,
    location: "Business District",
    status: "pending" as const,
    orders: 0,
    revenue: "£0",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.3,
    location: "University Area",
    status: "active" as const,
    orders: 28,
    revenue: "£1,560",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.6,
    location: "Tech Park",
    status: "inactive" as const,
    orders: 0,
    revenue: "£0",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Mediterranean Delight",
    cuisine: "Mediterranean",
    rating: 4.4,
    location: "Old Town",
    status: "active" as const,
    orders: 19,
    revenue: "£1,250",
    image: "/placeholder.svg"
  }
];

export default function Restaurants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || restaurant.status === selectedStatus;
    const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine;
    const matchesRating = restaurant.rating >= minRating;
    return matchesSearch && matchesStatus && matchesCuisine && matchesRating;
  });

  const cuisineTypes = [...new Set(mockRestaurants.map(r => r.cuisine))];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Restaurants</h1>
            <p className="text-muted-foreground">Manage restaurant partners and their menus</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Restaurant
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
                {(selectedCuisine !== "all" || minRating > 0) && (
                  <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                    {[selectedCuisine !== "all" && "Cuisine", minRating > 0 && "Rating"].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cuisine Type</label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">All Cuisines</option>
                    {cuisineTypes.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-warning" />
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{minRating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedCuisine("all");
                      setMinRating(0);
                    }}
                    className="flex-1"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Restaurants</p>
            <p className="text-2xl font-bold text-foreground">{mockRestaurants.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">{mockRestaurants.filter(r => r.status === 'active').length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">{mockRestaurants.filter(r => r.status === 'pending').length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Inactive</p>
            <p className="text-2xl font-bold text-destructive">{mockRestaurants.filter(r => r.status === 'inactive').length}</p>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}