import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* eslint-disable @next/next/no-sync-scripts, max-len */}

        {/* Infolinks Ads */}{/* TODO: Got rejected */}
        {/* <script type="text/javascript" src="/infolinks-account-vars.js" /> */}
        {/* <script type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js" /> */}

        {/* AdCash AutoTag Ads */}{/* TODO: Prefer banner ads instead */}
        {/* @ts-ignore */}
        {/* <script data-cfasync="false" type="text/javascript" data-adel="atag" src="//acacdn.com/script/atg.js" czid="envpzwvahu" /> */}

        {/* eslint-enable @next/next/no-sync-scripts, max-len  */}
      </body>
    </Html>
  );
}
