"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { WorkTrackProvider } from "@/context/WorkTrackContext";
import { GlobalModals } from "@/components/modals/GlobalModals";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <AuthGuard>
      {isAuthPage ? (
        children
      ) : (
        <WorkTrackProvider>
          <Sidebar />
          <main className="min-h-screen lg:ml-[260px]">
            <div className="px-4 pt-16 pb-4 lg:px-6 lg:pt-4 lg:pb-6">{children}</div>
          </main>
          <GlobalModals />
        </WorkTrackProvider>
      )}
    </AuthGuard>
  );
}
