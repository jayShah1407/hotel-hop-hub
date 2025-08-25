import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PoundSterling, MapPin, Clock, CreditCard, Truck } from "lucide-react";
import { OrderInvoice } from "./OrderInvoicesModal";

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderInvoice | null;
  userName: string;
}

export function InvoiceDetailModal({ isOpen, onClose, order, userName }: InvoiceDetailModalProps) {
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = order.orderType === "Delivery" ? 2.99 : 0;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">Order Invoice</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-primary">92 eats</h3>
            <p className="text-sm text-muted-foreground">Food Delivery Service</p>
            <Badge 
              variant="outline" 
              className={order.status === "delivered" ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}
            >
              {order.status === "delivered" ? "Delivered" : "Canceled"}
            </Badge>
          </div>

          <Separator />

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Order Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Order ID:</span> {order.id}</p>
                <p><span className="text-muted-foreground">Customer:</span> {userName}</p>
                <p><span className="text-muted-foreground">Restaurant:</span> {order.restaurant}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Delivery Info</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{order.orderDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span>{order.orderType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {order.deliveryAddress && (
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Delivery Address</h4>
              <div className="flex items-start gap-2 text-sm bg-muted/30 p-3 rounded-lg">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span>{order.deliveryAddress}</span>
              </div>
            </div>
          )}

          <Separator />

          {/* Items */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border/30 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium flex items-center gap-1">
                      <PoundSterling className="w-4 h-4" />
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      £{item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Bill Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Bill Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="flex items-center gap-1">
                  <PoundSterling className="w-4 h-4" />
                  {subtotal.toFixed(2)}
                </span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="flex items-center gap-1">
                    <PoundSterling className="w-4 h-4" />
                    {deliveryFee.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee (5%)</span>
                <span className="flex items-center gap-1">
                  <PoundSterling className="w-4 h-4" />
                  {serviceFee.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span className="flex items-center gap-1 text-primary">
                  <PoundSterling className="w-5 h-5" />
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {order.status === "delivered" && (
            <div className="text-center py-4 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm text-success font-medium">
                Thank you for your order! Delivered on {order.deliveryTime}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}