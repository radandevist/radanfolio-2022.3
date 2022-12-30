// import "tailwindcss/tailwind.css";
// import "../styles/admin/style.css";

type Props = {
  children: React.ReactNode;
};

export default function UserRootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
