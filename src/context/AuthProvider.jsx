import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as authApi from "../api/auth";

function normalizeError(err, fallbackMessage) {
  // Guarantee data object in pages
  const data = err?.response?.data;

  if (data && typeof data === "object") {
    return data;
  }

  return { detail: fallbackMessage };
}

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
      throw normalizeError(err, "Signup failed");
    }
  }

  async function activateAccount(data) {
    try {
      await authApi.activateAccount(data);
    } catch (err) {
      throw normalizeError(err, "Activation failed");
    }
  }

  async function resendActivation(email) {
    try {
      await authApi.resendActivation(email);
    } catch (err) {
      throw normalizeError(err, "Failed to resend email");
    }
  }

  async function login(email, password) {
    try {
      await authApi.login(email, password);
      const res = await authApi.getCurrentUser();
      setUser(res.data);
    } catch {
      throw { detail: "Invalid email or password" };
    }
  }

  async function logout() {
    // Logout should never fail
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }

  async function resetPassword(email) {
    try {
      await authApi.resetPassword(email);
    } catch (err) {
      throw normalizeError(err, "Failed to send reset email");
    }
  }

  async function resetPasswordConfirm(data) {
    try {
      await authApi.resetPasswordConfirm(data);
    } catch (err) {
      throw normalizeError(
        err,
        "Invalid or expired reset link. Please request a new password reset.",
      );
    }
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
