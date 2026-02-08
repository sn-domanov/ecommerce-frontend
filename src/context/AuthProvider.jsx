import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as authApi from "../api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await authApi.getCurrentUser();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function login(email, password) {
    await authApi.login(email, password);
    const res = await authApi.getCurrentUser();
    setUser(res.data);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
