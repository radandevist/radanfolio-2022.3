import { inter } from "../../fonts";
import Providers from "../Providers";

import { AdminLayout } from "./AdminLayout";

import "../../styles/admin/style.css";

type Props = {
  children: React.ReactNode;
};

export default function AdminRootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} antialiased bg-slate-100 text-slate-600`}
      >
        <Providers>
          <AdminLayout>
            {children}
          </AdminLayout>
        </Providers>
      </body>
    </html>
  );
}
