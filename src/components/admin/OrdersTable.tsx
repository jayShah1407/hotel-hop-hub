import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MapPin } from "lucide-react";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    restaurant: "Pizza Palace",
    amount: "£24.99",
    status: "delivered",
    time: "2 hours ago",
    location: "Downtown"
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    restaurant: "Burger Hub",
    amount: "£18.50",
    status: "preparing",
    time: "15 minutes ago",
    location: "Midtown"
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    restaurant: "Sushi Master",
    amount: "£45.00",
    status: "in_transit",
    time: "30 minutes ago",
    location: "Uptown"
  },
  {
    id: "#ORD-004",
    customer: "Sarah Wilson",
    restaurant: "Taco Fiesta",
    amount: "£12.75",
    status: "pending",
    time: "5 minutes ago",
    location: "Westside"
  },
  {
    id: "#ORD-005",
    customer: "David Brown",
    restaurant: "Mediterranean Delight",
    amount: "£32.40",
    status: "delivered",
    time: "1 hour ago",
    location: "Old Town"
  },
  {
    id: "#ORD-006",
    customer: "Emma Davis",
    restaurant: "Curry House",
    amount: "£28.90",
    status: "preparing",
    time: "45 minutes ago",
    location: "Tech Park"
  },
  {
    id: "#ORD-007",
    customer: "Robert Miller",
    restaurant: "Pizza Palace",
    amount: "£19.99",
    status: "in_transit",
    time: "20 minutes ago",
    location: "Downtown"
  },
  {
    id: "#ORD-008",
    customer: "Lisa Anderson",
    restaurant: "Sushi Master",
    amount: "£67.50",
    status: "delivered",
    time: "3 hours ago",
    location: "Uptown"
  },
  {
    id: "#ORD-009",
    customer: "Mark Taylor",
    restaurant: "Burger Hub",
    amount: "£22.30",
    status: "pending",
    time: "10 minutes ago",
    location: "Midtown"
  },
  {
    id: "#ORD-010",
    customer: "Jessica White",
    restaurant: "Taco Fiesta",
    amount: "£15.80",
    status: "preparing",
    time: "25 minutes ago",
    location: "Westside"
  },
];

const statusColors = {
  pending: "bg-warning/10 text-warning border-warning/20",
  preparing: "bg-primary/10 text-primary border-primary/20",
  in_transit: "bg-accent/10 text-accent border-accent/20",
  delivered: "bg-success/10 text-success border-success/20",
};

export function OrdersTable() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="font-semibold">Order ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Restaurant</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Time</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-border/50 hover:bg-muted/30">
                <TableCell className="font-medium text-primary">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.restaurant}</TableCell>
                <TableCell className="font-semibold">{order.amount}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={statusColors[order.status as keyof typeof statusColors]}
                  >
                    {order.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{order.location}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.time}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}