import axios from "axios";

// Automatically use local backend if available, fallback to render backend or mock
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to requests if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("taskmanager_token") || sessionStorage.getItem("taskmanager_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    // If backend endpoint is unavailable or returned error, throw meaningful message
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    // Network error / server not running locally
    if (error.code === "ERR_NETWORK" || !error.response) {
      throw new Error("SERVER_OFFLINE");
    }
    throw new Error(error.message || "Failed to log in");
  }
};

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    if (error.code === "ERR_NETWORK" || !error.response) {
      throw new Error("SERVER_OFFLINE");
    }
    throw new Error(error.message || "Failed to register");
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
