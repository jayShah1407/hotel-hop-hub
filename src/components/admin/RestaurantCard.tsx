import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Star, MapPin, Clock, MoreVertical, Phone, Ban, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

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
  id,
  name,
  cuisine,
  rating,
  location,
  status,
  orders,
  revenue,
  onStatusChange,
}: RestaurantCardProps & { onStatusChange?: (id: string, newStatus: "active" | "inactive" | "pending") => void }) {
  const { toast } = useToast();

  const handleContact = () => {
    toast({
      title: "Contacting Restaurant",
      description: `Initiating contact with ${name}...`,
    });
  };

  const handleStatusChange = (newStatus: "active" | "inactive" | "pending") => {
    onStatusChange?.(id, newStatus);
    toast({
      title: "Status Updated",
      description: `${name} status changed to ${newStatus}`,
    });
  };

  const handleBlacklist = () => {
    onStatusChange?.(id, "inactive");
    toast({
      title: "Restaurant Blacklisted",
      description: `${name} has been blacklisted and deactivated`,
      variant: "destructive",
    });
  };
  const statusColors = {
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-destructive/10 text-destructive border-destructive/20",
    pending: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <Card className="card-hover border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground hover-text-smooth">{name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover-bg-smooth">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg">
                  <DropdownMenuItem 
                    onClick={() => handleStatusChange("active")}
                    className="hover-bg-smooth cursor-pointer"
                    disabled={status === "active"}
                  >
                    <CheckCircle className="w-4 h-4 mr-2 text-success" />
                    Activate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleStatusChange("pending")}
                    className="hover-bg-smooth cursor-pointer"
                    disabled={status === "pending"}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                    Set Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleStatusChange("inactive")}
                    className="hover-bg-smooth cursor-pointer"
                    disabled={status === "inactive"}
                  >
                    <XCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                    Deactivate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleBlacklist}
                    className="hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  >
                    <Ban className="w-4 h-4 mr-2 text-destructive" />
                    Blacklist
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          <Link to={`/restaurants/${id}/menu`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full btn-interactive hover-border-smooth">
              View Menu
            </Button>
          </Link>
          <Button variant="default" size="sm" className="flex-1 btn-interactive" onClick={handleContact}>
            <Phone className="w-4 h-4 mr-1" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}