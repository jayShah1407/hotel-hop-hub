import { useState } from "react";
import { Layout } from "@/components/admin/Layout";
import { RestaurantCard } from "@/components/admin/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data for new restaurant
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    fssaiNumber: "",
    gstNumber: "",
    description: ""
  });

  const handleStatusChange = (id: string, newStatus: "active" | "inactive" | "pending") => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === id 
          ? { ...restaurant, status: newStatus }
          : restaurant
      )
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.cuisine || !formData.phone || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRestaurant = {
        id: Date.now().toString(),
        name: formData.name,
        cuisine: formData.cuisine,
        rating: 0,
        location: formData.city,
        status: "pending" as const,
        orders: 0,
        revenue: "£0",
        image: "/placeholder.svg"
      };
      
      setRestaurants(prev => [newRestaurant, ...prev]);
      
      toast({
        title: "Restaurant Added Successfully!",
        description: `${formData.name} has been registered and is pending approval.`,
      });
      
      // Reset form and close dialog
      setFormData({
        name: "",
        cuisine: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        fssaiNumber: "",
        gstNumber: "",
        description: ""
      });
      setIsDialogOpen(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add restaurant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || restaurant.status === selectedStatus;
    const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine;
    const matchesRating = restaurant.rating >= minRating;
    return matchesSearch && matchesStatus && matchesCuisine && matchesRating;
  });

  const cuisineTypes = [...new Set(restaurants.map(r => r.cuisine))];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Restaurants</h1>
            <p className="text-muted-foreground">Manage restaurant partners and their menus</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90 btn-interactive">
                <Plus className="w-4 h-4 mr-2" />
                Add Restaurant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Register New Restaurant</DialogTitle>
                <DialogDescription>
                  Add a new restaurant to the platform. Fill in the required information below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Restaurant Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter restaurant name"
                      className="hover-border-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Type *</Label>
                    <Select value={formData.cuisine} onValueChange={(value) => handleInputChange("cuisine", value)}>
                      <SelectTrigger className="hover-border-smooth">
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Thai">Thai</SelectItem>
                        <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="Continental">Continental</SelectItem>
                        <SelectItem value="Fast Food">Fast Food</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 9876543210"
                      className="hover-border-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="restaurant@example.com"
                      className="hover-border-smooth"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter restaurant address"
                    className="hover-border-smooth"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter city"
                      className="hover-border-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fssaiNumber">FSSAI Number</Label>
                    <Input
                      id="fssaiNumber"
                      value={formData.fssaiNumber}
                      onChange={(e) => handleInputChange("fssaiNumber", e.target.value)}
                      placeholder="12345678901234"
                      className="hover-border-smooth"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                    placeholder="22AAAAA0000A1Z5"
                    className="hover-border-smooth"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the restaurant"
                    rows={3}
                    className="hover-border-smooth"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {isSubmitting ? "Adding..." : "Add Restaurant"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 hover-border-smooth"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground hover-border-smooth"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="hover-border-smooth btn-interactive">
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
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground hover-border-smooth"
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
                    className="flex-1 btn-interactive"
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
          <div className="bg-card border border-border rounded-lg p-4 card-hover">
            <p className="text-sm text-muted-foreground">Total Restaurants</p>
            <p className="text-2xl font-bold text-foreground">{restaurants.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 card-hover">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">{restaurants.filter(r => r.status === 'active').length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 card-hover">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">{restaurants.filter(r => r.status === 'pending').length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 card-hover">
            <p className="text-sm text-muted-foreground">Inactive</p>
            <p className="text-2xl font-bold text-destructive">{restaurants.filter(r => r.status === 'inactive').length}</p>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} onStatusChange={handleStatusChange} />
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