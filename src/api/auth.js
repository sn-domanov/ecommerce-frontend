import apiClient from "./client";

// Auth-related API calls

export function getCurrentUser() {
  return apiClient.get("/auth/users/me/");
}

export function login(email, password) {
  return apiClient.post("/auth/jwt/create/", { email, password });
}
