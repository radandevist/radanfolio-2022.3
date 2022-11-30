import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";

import { ScrollTopWidget } from "../components/ScrollTopWidget";
import { ScrollRestore } from "../components/ScrollRestore";
import { Navbar } from "../components/Navbar";
// import { PropellerAdVignetteBanner } from "../components/ads/PropellerAds";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "../contexts/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        {/* Ads Verification */}
        <script
          async
          // eslint-disable-next-line max-len
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3646094358021753"
          crossOrigin="anonymous"
        />
        {/* Exoclick ad network */}
        <meta name="exoclick-site-verification" content="c5d186782940e084db1b21835224993e" />
        {/* Adcash ad network */}
        <meta name="a.validate.02" content="dwxL4bYESZT7g-RAW2TiC-nd98zsq8BzkYqb" />
        {/* ? Disabling propeller ads due to fb community standards */}
        {/* <meta name="propeller" content="fbe51795147890a81f1ef847d42ac99a" /> */}

        {/* Common opengraphs meta tags */}
        <meta property="og:url" content={`https://radanfolio.vercel.app${router.asPath}`} />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:locale" content={router.locale || router.defaultLocale || "en"} />
        {router.pathname === "/posts" || router.pathname ===  "/projects"
          ? <meta property="og:type" content="blog" />
          : router.pathname.includes("[slug]")
            ? <meta property="og:type" content="article" />
            : <meta property="og:type" content="website" />}
        {/* <meta property="og:type" content="website" /> */}
      </Head>
      {/* ? Disabling propeller ads due to fb community standards */}
      {/* <PropellerAdVignetteBanner /> */}
      <Analytics />
      <ThemeProvider>
        <div
          className="min-h-screen w-full pt-36"
          // className="min-h-screen w-full"
        >
          <ScrollTopWidget />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScrollRestore />
            <Navbar />
            <main>
              <Component {...pageProps} />
            </main>
          </motion.div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
