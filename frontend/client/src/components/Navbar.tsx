import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../api/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearUser } from "../store/authSlice";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutApi();          
    dispatch(clearUser());     
    navigate("/login");        
  }

  const links =
    user?.role === "ADMIN"
      ? [
          { to: "/admin", label: "Dashboard" },
          { to: "/admin/users", label: "Users" },
          { to: "/admin/stores", label: "Stores" },
        ]
      : user?.role === "OWNER"
        ? [{ to: "/owner", label: "Dashboard" }]
        : [{ to: "/stores", label: "Stores" }];

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">⭐ StoreRate</span>
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="text-sm text-gray-600 hover:text-black">
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{user?.email}</span>
        <Link to="/settings" className="text-sm text-gray-600 hover:text-black">
          Settings
        </Link>
        <Button size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}