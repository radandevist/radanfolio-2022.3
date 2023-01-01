import "animate.css";
import "../styles/my-globals.css";
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
// import { StickyBanner } from "../components/ads/ExoClick";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { albertSans, merriweather, rubikGlitch } from "../fonts";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        {/* Common opengraphs meta tags */}
        {/* The og:url meta tag is important for sharing on linkedin */}
        <meta property="og:url" content={`https://radanfolio.vercel.app${router.asPath}`} />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:locale" content={router.locale || router.defaultLocale || "en"} />
        {router.pathname === "/posts" || router.pathname ===  "/projects"
          ? <meta property="og:type" content="blog" />
          : router.pathname.includes("[slug]")
            ? <meta property="og:type" content="article" />
            : <meta property="og:type" content="website" />}
      </Head>
      <Analytics />

      {/* Google Analytics */}
      <GoogleAnalytics />

      {/* Enable ExoClick Banner Ads */}
      <script defer type="application/javascript" src="https://a.exdynsrv.com/ad-provider.js" />
      {/* Sticky Banner from ExoClick */}
      {/* <StickyBanner /> */}

      <ThemeProvider>
        <div
          className={`min-h-screen w-full pt-36
          ${rubikGlitch.variable} ${albertSans.className} ${merriweather.className}`}
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
