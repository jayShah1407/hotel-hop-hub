import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, MoreVertical } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  status: "active" | "inactive" | "pending";
  orders: number;
  revenue: string;
  image?: string;
}

export function RestaurantCard({
  name,
  cuisine,
  rating,
  location,
  status,
  orders,
  revenue,
}: RestaurantCardProps) {
  const statusColors = {
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-destructive/10 text-destructive border-destructive/20",
    pending: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{cuisine}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
            <Badge variant="outline" className={statusColors[status]}>
              {status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Orders Today</p>
            <p className="text-xl font-semibold text-foreground">{orders}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-xl font-semibold text-primary">{revenue}</p>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}