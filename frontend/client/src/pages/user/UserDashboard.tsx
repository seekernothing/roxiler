import { useState, useEffect, useCallback } from "react";
import { getStores } from "../../api/userApi";
import type { StoreForUser } from "../../types";
import Navbar from "../../components/Navbar";
import RatingStars from "../../components/RatingStars";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function UserDashboard() {
  const [stores, setStores] = useState<StoreForUser[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStores = useCallback(async () => {
    const res = await getStores({
      name: searchName || undefined,
      address: searchAddress || undefined,
    });
    setStores(res.data.stores);
    setLoading(false);
  }, [searchName, searchAddress]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Stores</h1>

        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Input
            placeholder="Search by address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading stores...</p>
        ) : stores.length === 0 ? (
          <p className="text-gray-500">No stores found</p>
        ) : (
          <div className="grid gap-4">
            {stores.map((store) => (
              <Card key={store.id}>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <h2 className="font-semibold text-lg">{store.name}</h2>
                    <p className="text-sm text-gray-500">{store.address}</p>
                    <p className="text-sm mt-1">
                      Overall:{" "}
                      <span className="font-medium">
                        {store.overallRating !== null
                          ? `${store.overallRating} ⭐`
                          : "No ratings yet"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">
                      {store.myRating ? "Your rating (click to change)" : "Rate this store"}
                    </p>
                    <RatingStars
                      storeId={store.id}
                      myRating={store.myRating}
                      onRated={fetchStores}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}