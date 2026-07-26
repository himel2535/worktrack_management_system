import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { WorkTrackProvider } from "@/context/WorkTrackContext";
import { GlobalModals } from "@/components/modals/GlobalModals";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WorkTrack - Work Smart, Every Hour",
  description: "Employee attendance and productivity tracking ERP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#0F172A] font-sans text-[#E2E8F0]">
        <WorkTrackProvider>
          <Sidebar />
          <main className="min-h-screen lg:ml-[260px]">
            <div className="px-4 pt-16 pb-4 lg:px-6 lg:pt-4 lg:pb-6">{children}</div>
          </main>
          <GlobalModals />
        </WorkTrackProvider>
      </body>
    </html>
  );
}
