import { useState, useEffect } from "react";
import { getOwnerDashboard } from "../../api/ownerApi";
import type { OwnerDashboardData } from "../../types";
import Navbar from "../../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OwnerDashboard() {
  const [data, setData] = useState<OwnerDashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getOwnerDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError("No store found for your account"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</p>}

        {data && (
          <>
            <h1 className="text-2xl font-bold mb-4">{data.storeName}</h1>

            <Card className="my-6">
              <CardContent className="p-6 text-center">
                <p className="text-5xl font-bold">
                  {data.averageRating !== null ? data.averageRating : "—"}
                </p>
                <p className="text-yellow-400 text-2xl mt-1">★★★★★</p>
                <p className="text-sm text-gray-500 mt-1">Average Rating</p>
              </CardContent>
            </Card>

            <h2 className="font-semibold mb-3">Users who rated your store</h2>
            <div className="bg-white rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.raters.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.userName}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.rating} ⭐</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {data.raters.length === 0 && (
                <p className="text-gray-500 text-sm p-4 text-center">No ratings yet</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}