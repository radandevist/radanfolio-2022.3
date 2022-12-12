import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="w-full overflow-x-hidden">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* eslint-disable @next/next/no-sync-scripts, max-len */}
        {/* eslint-enable @next/next/no-sync-scripts, max-len  */}
      </body>
    </Html>
  );
}
