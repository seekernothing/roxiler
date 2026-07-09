import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { setUser, clearUser } from "./store/authSlice";
import { getMe } from "./api/authApi";
import Login from "./pages/Login";

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
      <Route path="/admin" element={<div className="p-8">Admin </div>} />
      <Route path="/owner" element={<div className="p-8">Owner </div>} />
      <Route path="/stores" element={<div className="p-8">Stores </div>} />
    </Routes>
  );
}

export default App;