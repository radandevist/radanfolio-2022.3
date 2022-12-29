"use client";

import { useState } from "react";

import { inter } from "../../fonts";
import { Sidebar } from "../../components/admin/Sidebar";
import { Header } from "../../components/admin/Header";

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

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />

            <main>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Page header */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
            
                  {/* Left: Title */}
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-bo-2xl md:text-bo-3xl text-slate-800 font-bold">
                      Dashboard ✨
                    </h1>
                  </div>          
                </div>

                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
