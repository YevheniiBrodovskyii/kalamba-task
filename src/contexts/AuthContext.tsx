import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { Author } from "../types";

interface AuthState {
  user: Author | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; user: Author }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_ERROR"; error: string | null };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.user, loading: false, error: null };
    case "LOGOUT":
      return { ...initialState };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoading = (loading: boolean) => dispatch({ type: "SET_LOADING", loading });
  const setError = (error: string | null) => dispatch({ type: "SET_ERROR", error });

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;
        dispatch({ type: "LOGIN_SUCCESS", user: userData });
        localStorage.setItem("jwtToken", userData.token);
      } else if (response.status === 401) {
        setError("Incorrect email or password");
      } else {
        setError("An unexpected error has occurred");
      }
    } catch {
      setError("A network error has occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "LOGIN_SUCCESS", user: data.user });
        console.log(data.user)
      } else {
        setError("Failed to get user information");
      }
    } catch {
      setError("A network error has occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return <AuthContext.Provider value={{ ...state, login, logout, getCurrentUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
