"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiFetch, setToken, clearToken, AuthUser } from "@/lib/api/client";
import { DEMO_PASSWORD, isDemoUserEmail, isDemoModeEnabled } from "@/lib/demoUsers";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, designation?: string, departmentId?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  switchDemoUser: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function applyAuthResponse(data: { accessToken: string; user: AuthUser }) {
  setToken(data.accessToken);
  return data.user;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiFetch<{ user: AuthUser }>("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
      clearToken();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("worktrack_token");
    if (token) {
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ accessToken: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(await applyAuthResponse(data));
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    designation?: string,
    departmentId?: string
  ) => {
    const data = await apiFetch<{ accessToken: string; user: AuthUser }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, designation, departmentId }),
    });
    setUser(await applyAuthResponse(data));
  };

  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    clearToken();
    setUser(null);
  };

  const switchDemoUser = async (email: string) => {
    if (!isDemoModeEnabled()) {
      throw new Error("Demo switching is disabled");
    }
    const normalized = email.toLowerCase();
    if (!isDemoUserEmail(normalized)) {
      throw new Error("Invalid demo user");
    }
    await login(normalized, DEMO_PASSWORD);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser, switchDemoUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
