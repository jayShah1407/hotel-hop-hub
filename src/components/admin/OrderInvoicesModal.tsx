import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PoundSterling, Clock, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface OrderInvoice {
  id: string;
  restaurant: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderDate: string;
  deliveryTime: string;
  status: "delivered" | "canceled";
  paymentMethod: "COD" | "Online";
  orderType: "Delivery" | "Takeaway";
  deliveryAddress?: string;
}

interface OrderInvoicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  orders: OrderInvoice[];
  onViewInvoice: (order: OrderInvoice) => void;
}

export function OrderInvoicesModal({ isOpen, onClose, userName, orders, onViewInvoice }: OrderInvoicesModalProps) {
  const statusConfig = {
    delivered: {
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      label: "Delivered"
    },
    canceled: {
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      label: "Canceled"
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Order History - {userName}</span>
            <Badge variant="outline" className="ml-2">
              {orders.length} orders
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] w-full">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Restaurant</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Payment</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const config = statusConfig[order.status];
                  
                  return (
                    <TableRow key={order.id} className="border-border/50 hover-bg-smooth">
                      <TableCell className="font-medium text-primary">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{order.restaurant}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-48">
                          <p className="text-sm font-medium">
                            {order.items.slice(0, 2).map(item => `${item.quantity}x ${item.name}`).join(", ")}
                            {order.items.length > 2 && ` +${order.items.length - 2} more`}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 font-semibold">
                          <PoundSterling className="w-4 h-4" />
                          <span>{order.totalAmount.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{order.orderDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {order.orderType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={order.paymentMethod === "COD" ? "bg-warning/10 text-warning border-warning/20" : "bg-accent/10 text-accent border-accent/20"}
                        >
                          {order.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${config.bgColor} ${config.color} ${config.borderColor}`}
                        >
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="btn-interactive"
                          onClick={() => onViewInvoice(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No orders found for this user</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}