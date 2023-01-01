// import "tailwindcss/tailwind.css";

import Providers from "./Providers";

type Props = {
  children: React.ReactNode;
};

export default function UserRootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
