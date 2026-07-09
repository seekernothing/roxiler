import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createStore, getUsers } from "../../api/adminApi";
import type { User } from "../../types";
import Navbar from "../../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateStore() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [ownerId, setOwnerId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers({}).then((res) => setUsers(res.data.users));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    if (!form.name || !form.email || !form.address || !ownerId) {
      setError("All fields are required");
      return;
    }
    try {
      await createStore({ ...form, ownerId: Number(ownerId) });
      navigate("/admin/stores");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Store</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <p className="bg-red-100 text-red-700 p-2 rounded-md text-sm">{error}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Store Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={form.address} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Owner</Label>
              <Select value={ownerId} onValueChange={setOwnerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner..." />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.name} ({u.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Create Store
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}