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

  async function signup({ email, password }) {
    try {
      await authApi.signup(email, password);
    } catch (err) {
      throw err.response?.data || { detail: "Signup failed" };
    }
  }

  async function activateAccount(data) {
    try {
      await authApi.activateAccount(data);
    } catch (err) {
      // Normalize errors. Guarantee err.detail in the page.
      const detail = err?.response?.data?.detail || "Activation failed";
      throw { detail };
    }
  }

  async function resendActivation(email) {
    try {
      await authApi.resendActivation(email);
    } catch (err) {
      const detail = err?.response?.data?.detail || "Failed to resend email";
      throw { detail };
    }
  }

  async function login(email, password) {
    await authApi.login(email, password);
    const res = await authApi.getCurrentUser();
    setUser(res.data);
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }

  async function resetPassword(email) {
    await authApi.resetPassword(email);
  }

  async function resetPasswordConfirm(data) {
    await authApi.resetPasswordConfirm(data);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        activateAccount,
        resendActivation,
        login,
        logout,
        resetPassword,
        resetPasswordConfirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
