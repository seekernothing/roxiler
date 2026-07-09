import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { setUser, clearUser } from "./store/authSlice";
import { getMe } from "./api/authApi";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Settings from "./pages/Settings";


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
    </Routes>
  );
}

export default App;