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
      <body className="min-h-full bg-[#F8FAFC] font-sans">
        <Sidebar />
        <main className="lg:ml-[260px] min-h-screen">
          <div className="p-4 pt-16 lg:p-6 lg:pt-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
