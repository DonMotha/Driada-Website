// src/api/client.js
import axios from "axios";

export const API_BASE =
  (typeof window !== "undefined" && window.ENV?.API_URL) ||    // si usas /public/env.js
  import.meta.env?.VITE_API_URL ||                             // si usas Vite
  "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" }
});

console.log("[API baseURL]", API_BASE);
