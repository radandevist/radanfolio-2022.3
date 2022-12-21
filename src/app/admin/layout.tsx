import { Inter } from "@next/font/google";

import { Sidebar } from "../../components/admin/Sidebar";

type Props = {
  children: React.ReactNode;
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  display: "fallback",
  variable: "--font-inter"
});

export default function AdminRootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} antialiased bg-bo-gray-100 text-bo-gray-600`}
        // :class="{ 'sidebar-expanded': sidebarExpanded }"
        // eslint-disable-next-line max-len
        // x-data="{ page: 'dashboard', sidebarOpen: false, sidebarExpanded: localStorage.getItem('sidebar-expanded') == 'true' }"
        // eslint-disable-next-line max-len
        // x-init="$watch('sidebarExpanded', value => localStorage.setItem('sidebar-expanded', value))"
      >
        {/* <!-- Page wrapper --> */}
        <div className="flex h-screen overflow-hidden">

          {/* <!-- Sidebar --> */}
          <Sidebar />

          {/* <!-- Content area --> */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
