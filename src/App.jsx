import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import authService from "./appwrite/auth";

import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  ) : null;
}

export default App;
