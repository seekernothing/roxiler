import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login, getMe } from "../api/authApi";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password); 
      const me = await getMe();                 
      dispatch(setUser(me.data.user));          

      const role = res.data.role;
      if (role === "ADMIN") navigate("/admin");
      else if (role === "OWNER") navigate("/owner");
      else navigate("/stores");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded-md text-sm">{error}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-500">
            New user?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}