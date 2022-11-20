import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import { ScrollTopWidget } from "../components/ScrollTopWidget";
import { ScrollRestore } from "../components/ScrollRestore";
import { Navbar } from "../components/Navbar";
import { PropellerAdVignetteBanner } from "../components/ads/PropellerAds";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "../contexts/theme";

function MyApp({ Component, pageProps }: AppProps) {
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
        <meta name="propeller" content="fbe51795147890a81f1ef847d42ac99a" />

        {/* Common opengraphs meta tags */}
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:type" content="" />
      </Head>
      <PropellerAdVignetteBanner />
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
