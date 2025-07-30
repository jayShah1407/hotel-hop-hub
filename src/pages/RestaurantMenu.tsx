import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/admin/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Star,
  Clock,
  DollarSign
} from "lucide-react";

// Mock menu data - replace with Supabase data
const mockMenuItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, olive oil",
    price: 18.99,
    category: "Pizza",
    available: true,
    prepTime: "15-20 min",
    rating: 4.5,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Pepperoni, mozzarella, tomato sauce",
    price: 21.99,
    category: "Pizza",
    available: true,
    prepTime: "15-20 min",
    rating: 4.3,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Romaine lettuce, parmesan, croutons, caesar dressing",
    price: 12.99,
    category: "Salads",
    available: true,
    prepTime: "5-10 min",
    rating: 4.2,
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 8.99,
    category: "Desserts",
    available: false,
    prepTime: "2-5 min",
    rating: 4.8,
    image: "/placeholder.svg"
  }
];

const mockRestaurant = {
  id: "1",
  name: "Pizza Palace",
  cuisine: "Italian",
  rating: 4.5,
  location: "Downtown"
};

export default function RestaurantMenu() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(mockMenuItems.map(item => item.category)))];
  
  const filteredMenuItems = mockMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/restaurants">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{mockRestaurant.name}</h1>
              <p className="text-muted-foreground">{mockRestaurant.cuisine} • {mockRestaurant.location}</p>
            </div>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Menu Item
          </Button>
        </div>

        {/* Restaurant Info */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-warning text-warning" />
                <span className="font-semibold">{mockRestaurant.rating}</span>
                <span className="text-muted-foreground">Rating</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-xl font-semibold text-foreground">{mockMenuItems.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-semibold text-success">
                  {mockMenuItems.filter(item => item.available).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-xl font-semibold text-destructive">
                  {mockMenuItems.filter(item => !item.available).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMenuItems.map((item) => (
            <Card key={item.id} className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold text-primary">${item.price}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.prepTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={item.available 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {item.available ? "Available" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No menu items found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}