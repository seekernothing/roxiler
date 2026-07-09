import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAdminStores } from "../../api/adminApi";
import type { AdminStore } from "../../types";
import Navbar from "../../components/Navbar";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
] as const;

export default function AdminStores() {
  const [stores, setStores] = useState<AdminStore[]>([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const fetchStores = useCallback(async () => {
    const res = await getAdminStores({
      name: filters.name || undefined,
      email: filters.email || undefined,
      address: filters.address || undefined,
      sortBy,
      order,
    });
    setStores(res.data.stores);
  }, [filters, sortBy, order]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  function handleSort(field: string) {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Stores</h1>
          <Link to="/admin/stores/new" className={buttonVariants({ variant: "default" })}>
            + Add Store
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <Input
            placeholder="Filter name..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <Input
            placeholder="Filter email..."
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
          <Input
            placeholder="Filter address..."
            value={filters.address}
            onChange={(e) => setFilters({ ...filters, address: e.target.value })}
          />
        </div>

        <div className="bg-white rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="cursor-pointer select-none hover:bg-gray-50"
                  >
                    {col.label}{" "}
                    {sortBy === col.key && (order === "asc" ? "▲" : "▼")}
                  </TableHead>
                ))}
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.address}</TableCell>
                  <TableCell>{s.rating !== null ? `${s.rating} ⭐` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {stores.length === 0 && (
            <p className="text-gray-500 text-sm p-4 text-center">No stores found</p>
          )}
        </div>
      </div>
    </div>
  );
}