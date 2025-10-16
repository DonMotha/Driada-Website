// src/api/client.js
import axios from "axios";

export const API_BASE =
  (typeof window !== "undefined" && window.ENV?.API_URL) ||    // si usas /public/env.js
  import.meta.env?.VITE_API_URL ||                             // si usas Vite
  "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

console.log("[API baseURL]", API_BASE);
