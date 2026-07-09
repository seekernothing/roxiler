import { useState } from "react";
import axios from "axios";
import { updatePassword } from "../api/authApi";
import { passwordSchema } from "../validations/schemas";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccess("");
    const check = passwordSchema.safeParse(newPassword);
    if (!check.success) {
      setError(check.error.issues[0]?.message ?? "Invalid password");
      return;
    }
    try {
      await updatePassword(oldPassword, newPassword);
      setSuccess("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <p className="bg-red-100 text-red-700 p-2 rounded-md text-sm">{error}</p>}
            {success && <p className="bg-green-100 text-green-700 p-2 rounded-md text-sm">{success}</p>}

            <div className="space-y-2">
              <Label htmlFor="old">Old Password</Label>
              <Input
                id="old"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}