import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProviderWrapper } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WorkTrack - Work Smart, Every Hour",
  description: "Employee attendance and productivity tracking ERP",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "WorkTrack" },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased dark`}>
      <body suppressHydrationWarning className="min-h-full bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#0F172A] font-sans text-[#E2E8F0]">
        <ThemeProviderWrapper>
          <QueryProvider>
            <AuthProvider>
              <AppShell>{children}</AppShell>
            </AuthProvider>
          </QueryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
