import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  restaurant: string;
  status: "delivered" | "canceled";
  canceledBy?: string;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  title: string;
  restaurant: string;
}

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    label: "Delivered"
  },
  canceled: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    label: "Canceled"
  }
};

export function OrdersModal({ isOpen, onClose, orders, title, restaurant }: OrdersModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{title} - {restaurant}</span>
            <Badge variant="outline" className="ml-2">
              {orders.length} orders
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-auto">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const config = statusConfig[order.status];
                  const StatusIcon = config.icon;
                  
                  return (
                    <TableRow key={order.id} className="border-border/50 hover-bg-smooth">
                      <TableCell className="font-medium text-primary">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{order.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${config.bgColor} ${config.color} ${config.borderColor}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.status === "canceled" && order.canceledBy ? (
                          <div className="text-sm text-muted-foreground">
                            Canceled by: <span className="font-medium">{order.canceledBy}</span>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Order completed
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No orders found for this category</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}