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
  demoLogin: () => void;
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

  const demoLogin = () => {
    const sampleUser: GitHubUser = {
      id: 10000001,
      login: "simarsinghrayat",
      name: "Simar Singh Rayat",
      avatar_url: "https://avatars.githubusercontent.com/u/10000000?v=4",
      html_url: "https://github.com/SIMARSINGHRAYAT",
      bio: "Creator of Linux Shortcut Center & KilzSnippet",
      public_repos: 14,
      followers: 85,
    };
    setUserSession(sampleUser, "demo_authenticated_token");
  };

  const loginWithGitHub = () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    sessionStorage.setItem("lsc_auth_return_url", "/support");

    if (clientId) {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
        clientId
      )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,user:email`;
      window.location.href = authUrl;
    } else {
      // Use Vercel Serverless Function which securely accesses GITHUB_CLIENT_ID
      window.location.href = `/api/auth/login`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        loginWithGitHub,
        demoLogin,
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
