import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* eslint-disable @next/next/no-sync-scripts */}

        {/* Infolinks Ads */}
        <script type="text/javascript" src="/infolinks-account-vars.js" />
        <script type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js" />

        {/* eslint-enable @next/next/no-sync-scripts */}
      </body>
    </Html>
  );
}
