import { Html, Head, Main, NextScript } from "next/document";

import { StickyBanner } from "../components/ads/ExoClick";

export default function Document() {
  return (
    <Html className="w-full overflow-x-hidden">
      <Head />
      <body>
        {/* Enable ExoClick Banner Ads */}
        <script defer type="application/javascript" src="https://a.exdynsrv.com/ad-provider.js" />
        {/* Sticky Banner from ExoClick */}
        <StickyBanner />

        <Main />
        <NextScript />
        {/* eslint-disable @next/next/no-sync-scripts, max-len */}
        {/* eslint-enable @next/next/no-sync-scripts, max-len  */}
      </body>
    </Html>
  );
}
