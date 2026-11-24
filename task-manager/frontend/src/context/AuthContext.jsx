import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getMe } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const storedToken =
      localStorage.getItem("taskmanager_token") ||
      sessionStorage.getItem("taskmanager_token");
    const storedUser =
      localStorage.getItem("taskmanager_user") ||
      sessionStorage.getItem("taskmanager_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const saveAuthData = (userData, authToken, rememberMe = true) => {
    setUser(userData);
    setToken(authToken);

    const storage = rememberMe ? localStorage : sessionStorage;
    const altStorage = rememberMe ? sessionStorage : localStorage;

    altStorage.removeItem("taskmanager_token");
    altStorage.removeItem("taskmanager_user");

    storage.setItem("taskmanager_token", authToken);
    storage.setItem("taskmanager_user", JSON.stringify(userData));
  };

  const login = async (email, password, rememberMe = true) => {
    try {
      const data = await loginUser({ email, password });
      saveAuthData(data.user, data.token, rememberMe);
      return { success: true, user: data.user };
    } catch (error) {
      // Offline fallback: if server is not reachable, allow seamless preview login
      if (error.message === "SERVER_OFFLINE") {
        console.warn("Backend offline, utilizing local session for preview");
        const mockUser = {
          _id: "demo-" + Date.now(),
          name: email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          email: email,
          isOfflineMode: true,
        };
        const mockToken = "mock-jwt-token-" + Date.now();
        saveAuthData(mockUser, mockToken, rememberMe);
        return {
          success: true,
          user: mockUser,
          notice: "Logged in (Local Preview Mode - backend offline)",
        };
      }
      throw error;
    }
  };

  const register = async (name, email, password, rememberMe = true) => {
    try {
      const data = await registerUser({ name, email, password });
      saveAuthData(data.user, data.token, rememberMe);
      return { success: true, user: data.user };
    } catch (error) {
      if (error.message === "SERVER_OFFLINE") {
        console.warn("Backend offline, utilizing local session for registration preview");
        const mockUser = {
          _id: "user-" + Date.now(),
          name: name,
          email: email,
          isOfflineMode: true,
        };
        const mockToken = "mock-jwt-token-" + Date.now();
        saveAuthData(mockUser, mockToken, rememberMe);
        return {
          success: true,
          user: mockUser,
          notice: "Account created (Local Preview Mode - backend offline)",
        };
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("taskmanager_token");
    localStorage.removeItem("taskmanager_user");
    sessionStorage.removeItem("taskmanager_token");
    sessionStorage.removeItem("taskmanager_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
