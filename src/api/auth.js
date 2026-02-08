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
