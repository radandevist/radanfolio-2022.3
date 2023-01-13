import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";

// import Head from "next/head";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import { ThemeProvider } from "../contexts/theme";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { Layout } from "../components/layout/Layout";
import { NEXT_APP_DOMAIN_URL } from "../constants";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <>
      {/* <Head> */}
      {/* Common openGraph meta tags */}
      {/* The og:url meta tag is important for sharing on linkedin */}
      {/* <meta property="og:url" content={`https://radanfolio.vercel.app${router.asPath}`} /> */}
      {/* <meta property="og:site_name" content="radanfolio" />
      <meta property="og:locale" content={router.locale || router.defaultLocale || "en"} /> */}
      {/* {router.pathname === "/posts" || router.pathname ===  "/projects"
          ? <meta property="og:type" content="blog" />
          : router.pathname.includes("[slug]")
            ? <meta property="og:type" content="article" />
            : <meta property="og:type" content="website" />} */}
      {/* </Head> */}

      <DefaultSeo
        titleTemplate="%s | RadanFolio"
        defaultTitle="RadanFolio"
        openGraph={{
          // The og:url meta tag is important for sharing on linkedin
          url: `https://${NEXT_APP_DOMAIN_URL}${router.asPath}`,
          siteName: "RadanFolio",
          locale: router.locale || router.defaultLocale || "en",
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

      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
