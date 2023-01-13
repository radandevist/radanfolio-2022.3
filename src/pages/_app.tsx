import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";

// import Head from "next/head";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeProvider } from "../contexts/theme";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { Layout } from "../components/layout/Layout";
import { NEXT_APP_DOMAIN_URL } from "../constants";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | RadanFolio"
        defaultTitle="RadanFolio"
        openGraph={{
          // The og:url meta tag is important for sharing on linkedin
          url: `https://${NEXT_APP_DOMAIN_URL}${router.asPath}`,
          siteName: "RadanFolio",
          locale: router.locale || router.defaultLocale || "en",
          type: "website",
        }}
      />

      {/* Vercel Analytics */}
      <Analytics />

      {/* Google Analytics */}
      <GoogleAnalytics />

      {/* Enable ExoClick Banner Ads */}
      <script defer type="application/javascript" src="https://a.exdynsrv.com/ad-provider.js" />
      
      {/* Sticky Banner from ExoClick */}
      {/* <StickyBanner /> */}

      <ReduxProvider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
