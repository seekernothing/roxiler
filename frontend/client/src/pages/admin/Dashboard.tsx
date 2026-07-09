import { useState, useEffect } from "react";
import { getStats } from "../../api/adminApi";
import type { AdminStats } from "../../types";
import Navbar from "../../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    getStats().then((res) => setStats(res.data));
  }, []);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers, icon: "👥" },
    { label: "Total Stores", value: stats?.totalStores, icon: "🏪" },
    { label: "Total Ratings", value: stats?.totalRatings, icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardContent className="p-6">
                <p className="text-3xl">{c.icon}</p>
                <p className="text-3xl font-bold mt-2">{c.value ?? "—"}</p>
                <p className="text-sm text-gray-500">{c.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}