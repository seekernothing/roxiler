import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { setUser, clearUser } from "./store/authSlice";
import { getMe } from "./api/authApi";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import UserDashboard from "./pages/user/UserDashboard";
import Dashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminStores from "./pages/admin/AdminStores";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    getMe()
      .then((res) => dispatch(setUser(res.data.user)))
      .catch(() => dispatch(clearUser()));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="p-8">Admin (coming soon)</div>
    </ProtectedRoute>
  }
/>
<Route
  path="/owner"
  element={
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <div className="p-8">Owner (coming soon)</div>
    </ProtectedRoute>
  }
/>
<Route
  path="/stores"
  element={
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="p-8">Stores (coming soon)</div>
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

<Route
  path="/stores"
  element={
    <ProtectedRoute allowedRoles={["USER"]}>
      <UserDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminUsers />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminStores />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;