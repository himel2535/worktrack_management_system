"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const PUBLIC_AUTH_PATHS = ["/login", "/register"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicAuth = PUBLIC_AUTH_PATHS.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isPublicAuth) {
      router.replace("/login");
    }
    if (!loading && user && isPublicAuth) {
      router.replace("/");
    }
    if (!loading && user) {
      if (pathname.startsWith("/admin") && user.role !== "admin") {
        router.replace("/");
      }
      if (pathname.startsWith("/manager") && user.role === "employee") {
        router.replace("/");
      }
    }
  }, [user, loading, pathname, router, isPublicAuth]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!user && !isPublicAuth) return null;

  return <>{children}</>;
}
