import apiClient from "./client";

// Auth-related API calls

export function getCurrentUser() {
  return apiClient.get("/auth/users/me/");
}

export function signup(email, password) {
  return apiClient.post("/auth/users/", {
    email,
    password,
    re_password: password,
  });
}

export function login(email, password) {
  return apiClient.post("/auth/jwt/create/", { email, password });
}

export function logout() {
  return apiClient.post("/auth/jwt/logout/");
}

export function resetPassword(email) {
  return apiClient.post("/auth/users/reset_password/", { email });
}

export function resetPasswordConfirm({ uid, token, newPassword }) {
  return apiClient.post("/auth/users/reset_password_confirm/", {
    uid,
    token,
    new_password: newPassword,
    re_new_password: newPassword,
  });
}
