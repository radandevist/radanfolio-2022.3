"use client";

import { useState } from "react";

import { inter } from "../../fonts";
import { Sidebar } from "../../components/admin/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminRootLayout({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);

  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} antialiased bg-slate-100 text-slate-600`}
      >
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
          {children}
        </div>
      </body>
    </html>
  );
}
