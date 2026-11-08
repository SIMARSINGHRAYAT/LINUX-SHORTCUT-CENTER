import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio?: string | null;
  public_repos?: number;
  followers?: number;
}

interface AuthContextType {
  user: GitHubUser | null;
  token: string | null;
  isLoading: boolean;
  loginWithGitHub: () => void;
  logout: () => void;
  setUserSession: (user: GitHubUser, token: string) => void;
  isConfigured: boolean;
  clientId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_USER_KEY = "lsc_github_user";
const STORAGE_TOKEN_KEY = "lsc_github_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || "";
  const isConfigured = Boolean(clientId);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_USER_KEY);
      const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (e) {
      console.error("Failed to parse stored GitHub user session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUserSession = (newUser: GitHubUser, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_TOKEN_KEY, newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  };

  const loginWithGitHub = () => {
    // Current redirect callback URI
    const redirectUri = `${window.location.origin}/auth/callback`;
    
    // Store current path so callback can return user to where they were
    sessionStorage.setItem("lsc_auth_return_url", window.location.pathname);

    if (clientId) {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
        clientId
      )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,user:email`;
      window.location.href = authUrl;
    } else {
      // If client ID is not set yet in environment variables, redirect to the callback page with instructions
      window.location.href = `/auth/callback?error=unconfigured`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        loginWithGitHub,
        logout,
        setUserSession,
        isConfigured,
        clientId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

