import { useEffect, useState } from "react";
import { Layout } from "@/components/admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, PoundSterling, ShoppingBag, CheckCircle, XCircle } from "lucide-react";
import { OrderInvoicesModal, OrderInvoice } from "@/components/admin/OrderInvoicesModal";
import { InvoiceDetailModal } from "@/components/admin/InvoiceDetailModal";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  successfulOrders: number;
  canceledOrders: number;
  totalSpent: number;
  joinDate: string;
}

// Mock users data with enhanced details
const mockUsers: UserData[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+44 7700 900123",
    totalOrders: 42,
    successfulOrders: 40,
    canceledOrders: 2,
    totalSpent: 1245.80,
    joinDate: "Jan 2024"
  },
  {
    id: "u2",
    name: "Mary Lee",
    email: "mary.lee@email.com",
    phone: "+44 7700 900124",
    totalOrders: 28,
    successfulOrders: 24,
    canceledOrders: 4,
    totalSpent: 890.50,
    joinDate: "Feb 2024"
  },
  {
    id: "u3",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+44 7700 900125",
    totalOrders: 35,
    successfulOrders: 35,
    canceledOrders: 0,
    totalSpent: 1567.25,
    joinDate: "Jan 2024"
  },
  {
    id: "u4",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+44 7700 900126",
    totalOrders: 19,
    successfulOrders: 17,
    canceledOrders: 2,
    totalSpent: 678.90,
    joinDate: "Mar 2024"
  },
  {
    id: "u5",
    name: "Alex Carter",
    email: "alex.carter@email.com",
    phone: "+44 7700 900127",
    totalOrders: 51,
    successfulOrders: 48,
    canceledOrders: 3,
    totalSpent: 2103.45,
    joinDate: "Dec 2023"
  },
  {
    id: "u6",
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+44 7700 900128",
    totalOrders: 33,
    successfulOrders: 31,
    canceledOrders: 2,
    totalSpent: 1234.75,
    joinDate: "Feb 2024"
  }
];

// Mock order invoices data
const mockOrderInvoices: Record<string, OrderInvoice[]> = {
  "u1": [
    {
      id: "ORD-001",
      restaurant: "Pizza Palace",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 12.99 },
        { name: "Garlic Bread", quantity: 2, price: 4.50 }
      ],
      totalAmount: 21.99,
      orderDate: "2024-03-15",
      deliveryTime: "2024-03-15 19:30",
      status: "delivered",
      paymentMethod: "Online",
      orderType: "Delivery",
      deliveryAddress: "123 Main Street, London, SW1A 1AA"
    },
    {
      id: "ORD-002",
      restaurant: "Burger Hub",
      items: [
        { name: "Classic Burger", quantity: 2, price: 8.99 },
        { name: "French Fries", quantity: 1, price: 3.50 }
      ],
      totalAmount: 21.48,
      orderDate: "2024-03-10",
      deliveryTime: "2024-03-10 20:15",
      status: "delivered",
      paymentMethod: "COD",
      orderType: "Delivery",
      deliveryAddress: "123 Main Street, London, SW1A 1AA"
    }
  ],
  "u2": [
    {
      id: "ORD-003",
      restaurant: "Sushi Master",
      items: [
        { name: "California Roll", quantity: 2, price: 9.99 },
        { name: "Miso Soup", quantity: 1, price: 3.50 }
      ],
      totalAmount: 23.48,
      orderDate: "2024-03-14",
      deliveryTime: "2024-03-14 18:45",
      status: "delivered",
      paymentMethod: "Online",
      orderType: "Takeaway"
    }
  ]
};

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderInvoice | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // SEO
  useEffect(() => {
    document.title = "Users Management | 92 eats Admin";
    const desc = "Manage users, view order statistics, and track customer spending on the 92 eats platform.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const handleUserClick = (user: UserData) => {
    setSelectedUser(user);
    setIsOrdersModalOpen(true);
  };

  const handleViewInvoice = (order: OrderInvoice) => {
    setSelectedOrder(order);
    setIsInvoiceModalOpen(true);
  };

  const closeOrdersModal = () => {
    setIsOrdersModalOpen(false);
    setSelectedUser(null);
  };

  const closeInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground">View user profiles, order statistics, and spending analytics</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <Card 
              key={user.id} 
              className="cursor-pointer card-hover border-border/50"
              onClick={() => handleUserClick(user)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground font-normal">Member since {user.joinDate}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3 bg-muted/20">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <ShoppingBag className="w-3 h-3" />
                      <span>Total Orders</span>
                    </div>
                    <div className="text-xl font-semibold text-foreground">{user.totalOrders}</div>
                  </div>

                  <div className="rounded-lg border border-border p-3 bg-muted/20">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <PoundSterling className="w-3 h-3" />
                      <span>Total Spent</span>
                    </div>
                    <div className="text-xl font-semibold text-foreground">£{user.totalSpent.toFixed(0)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-success/20 p-3 bg-success/5">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <CheckCircle className="w-3 h-3 text-success" />
                      <span>Successful</span>
                    </div>
                    <div className="text-lg font-semibold text-success">{user.successfulOrders}</div>
                  </div>

                  <div className="rounded-lg border border-destructive/20 p-3 bg-destructive/5">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <XCircle className="w-3 h-3 text-destructive" />
                      <span>Canceled</span>
                    </div>
                    <div className="text-lg font-semibold text-destructive">{user.canceledOrders}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Click to view order history
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <OrderInvoicesModal
          isOpen={isOrdersModalOpen}
          onClose={closeOrdersModal}
          userName={selectedUser?.name || ""}
          orders={selectedUser ? mockOrderInvoices[selectedUser.id] || [] : []}
          onViewInvoice={handleViewInvoice}
        />

        <InvoiceDetailModal
          isOpen={isInvoiceModalOpen}
          onClose={closeInvoiceModal}
          order={selectedOrder}
          userName={selectedUser?.name || ""}
        />
      </div>
    </Layout>
  );
}