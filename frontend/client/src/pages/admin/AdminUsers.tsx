import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/adminApi";
import type { User } from "../../types";
import Navbar from "../../components/Navbar";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "role", label: "Role" },
] as const;

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const fetchUsers = useCallback(async () => {
    const res = await getUsers({
      name: filters.name || undefined,
      email: filters.email || undefined,
      address: filters.address || undefined,
      role: roleFilter === "ALL" ? undefined : roleFilter,
      sortBy,
      order,
    });
    setUsers(res.data.users);
  }, [filters, roleFilter, sortBy, order]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
          <h1 className="text-2xl font-bold">Users</h1>
          <Link to="/admin/users/new" className={buttonVariants({ variant: "default" })}>
            + Add User
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="OWNER">Owner</SelectItem>
            </SelectContent>
          </Select>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.address}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.role === "ADMIN"
                          ? "default"
                          : u.role === "OWNER"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.length === 0 && (
            <p className="text-gray-500 text-sm p-4 text-center">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}