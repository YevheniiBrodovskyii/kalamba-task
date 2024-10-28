import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { Author } from "../types";
import { showErrorNotification } from "components";

interface AuthState {
  user: Author | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; user: Author }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; loading: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.user, loading: false };
    case "LOGOUT":
      return { ...initialState };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoading = (loading: boolean) => dispatch({ type: "SET_LOADING", loading });

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      showErrorNotification(error.message);
    } else {
      showErrorNotification('An unknown error occurred');
    }
  }, []);

  const handleResponseError = useCallback(async (response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const errorData = await response.json();
      throw new Error(errorData?.message + ": Incorrect email or password");
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      await handleResponseError(response);

      const data = await response.json();
      const userData = data.user;
      dispatch({ type: "LOGIN_SUCCESS", user: userData });
      localStorage.setItem("jwtToken", userData.token);
    } catch (error: unknown) {
      handleError(error);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      await handleResponseError(response);

      const data = await response.json();
      dispatch({ type: "LOGIN_SUCCESS", user: data.user });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError, handleResponseError]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
