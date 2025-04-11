/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../../axiosConfig";

export const AuthContext = createContext({});

function AdminAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkAuthentication() {
    try {
      setLoading(true);
      await instance.get("/auth/check", { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function AdminLogoutHandle() {
    try {
      await instance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      checkAuthentication(); 
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, setIsAuthenticated, AdminLogoutHandle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AuthContext);
}

export default AdminAuth;