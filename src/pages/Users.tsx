import { useEffect, useMemo } from "react";
import { Layout } from "@/components/admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, ThumbsDown } from "lucide-react";

interface User {
  id: string;
  name: string;
  restaurant: string;
  totalOrders: number;
  canceledOrders: number;
}

// Mock users data - replace with Supabase later
const users: User[] = [
  { id: "u1", name: "John Doe", restaurant: "Pizza Palace", totalOrders: 42, canceledOrders: 1 },
  { id: "u2", name: "Mary Lee", restaurant: "Pizza Palace", totalOrders: 18, canceledOrders: 4 },
  { id: "u3", name: "Mike Chen", restaurant: "Pizza Palace", totalOrders: 27, canceledOrders: 0 },

  { id: "u4", name: "Jane Smith", restaurant: "Burger Hub", totalOrders: 36, canceledOrders: 2 },
  { id: "u5", name: "Alex Carter", restaurant: "Burger Hub", totalOrders: 21, canceledOrders: 3 },
  { id: "u6", name: "Priya Gupta", restaurant: "Burger Hub", totalOrders: 12, canceledOrders: 5 },

  { id: "u7", name: "Liam Wong", restaurant: "Sushi Master", totalOrders: 29, canceledOrders: 1 },
  { id: "u8", name: "Emma Brown", restaurant: "Sushi Master", totalOrders: 31, canceledOrders: 0 },

  { id: "u9", name: "Carlos Diaz", restaurant: "Taco Fiesta", totalOrders: 16, canceledOrders: 3 },
  { id: "u10", name: "Olivia Park", restaurant: "Taco Fiesta", totalOrders: 22, canceledOrders: 2 },
];

const CANCEL_THRESHOLD = 3;

export default function Users() {
  // SEO
  useEffect(() => {
    document.title = "Users Leaderboard | 92 eats Admin";
    const desc = "Top users by restaurant, high cancellation users, and global gold/silver/bronze leaderboard.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const leaderboard = useMemo(() => {
    const sorted = [...users].sort((a, b) => b.totalOrders - a.totalOrders);
    return {
      gold: sorted[0],
      silver: sorted[1],
      bronze: sorted[2],
    };
  }, []);

  const perRestaurant = useMemo(() => {
    const map: Record<string, { topUser: User | null; highCancelers: User[] }> = {};
    for (const u of users) {
      if (!map[u.restaurant]) map[u.restaurant] = { topUser: null, highCancelers: [] };
      const r = map[u.restaurant];
      // top user by total orders
      if (!r.topUser || u.totalOrders > r.topUser.totalOrders) r.topUser = u;
      // high cancelers list
      if (u.canceledOrders >= CANCEL_THRESHOLD) r.highCancelers.push(u);
    }
    return Object.entries(map).map(([restaurant, data]) => ({ restaurant, ...data }));
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Top users from each restaurant and overall leaderboard</p>
        </header>

        {/* Global Leaderboard */}
        <section>
          <h2 className="sr-only">Leaderboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gold */}
            <Card className="hover:shadow-elegant transition-all duration-300 border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50/50 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-yellow-500/10">
                    <Crown className="w-4 h-4 text-yellow-600" />
                  </span>
                  <span className="sr-only">Gold Tier</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.gold ? (
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">{leaderboard.gold.name}</p>
                    <p className="text-sm text-muted-foreground">Total Orders: {leaderboard.gold.totalOrders}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No data</p>
                )}
              </CardContent>
            </Card>

            {/* Silver */}
            <Card className="hover:shadow-elegant transition-all duration-300 border-l-4 border-l-gray-400 bg-gradient-to-r from-gray-50/50 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-gray-400/10">
                    <Medal className="w-4 h-4 text-gray-500" />
                  </span>
                  <span className="sr-only">Silver Tier</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.silver ? (
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">{leaderboard.silver.name}</p>
                    <p className="text-sm text-muted-foreground">Total Orders: {leaderboard.silver.totalOrders}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No data</p>
                )}
              </CardContent>
            </Card>

            {/* Bronze */}
            <Card className="hover:shadow-elegant transition-all duration-300 border-l-4 border-l-amber-600 bg-gradient-to-r from-amber-50/50 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-amber-600/10">
                    <Medal className="w-4 h-4 text-amber-700" />
                  </span>
                  <span className="sr-only">Bronze Tier</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.bronze ? (
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">{leaderboard.bronze.name}</p>
                    <p className="text-sm text-muted-foreground">Total Orders: {leaderboard.bronze.totalOrders}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No data</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Top users per restaurant */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Top users from each restaurant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {perRestaurant.map(({ restaurant, topUser, highCancelers }) => (
              <Card key={restaurant} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle>{restaurant}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm text-muted-foreground">Top User</p>
                    {topUser ? (
                      <div className="mt-1">
                        <p className="font-semibold text-foreground">{topUser.name}</p>
                        <p className="text-sm text-muted-foreground">Total Orders: {topUser.totalOrders}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No data</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <ThumbsDown className="w-4 h-4" /> High cancellations (≥ {CANCEL_THRESHOLD})
                    </p>
                    {highCancelers.length ? (
                      <div className="flex flex-wrap gap-2">
                        {highCancelers.map((u) => (
                          <Badge key={u.id} variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                            {u.name} • {u.canceledOrders}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">None</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
