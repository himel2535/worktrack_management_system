import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#0F172A] font-sans text-white">
        <Sidebar />
        <main className="min-h-screen lg:ml-[260px]">
          <div className="px-4 pt-16 pb-4 lg:px-6 lg:pt-4 lg:pb-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
