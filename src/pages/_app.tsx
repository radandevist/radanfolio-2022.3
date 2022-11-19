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
import { PropellerAdVerify, PropellerAdVignetteBanner } from "../components/ads/PropellerAds";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "../contexts/theme";
import { AdSenseVerify } from "../components/ads/AdSense";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <PropellerAdVerify />
        <AdSenseVerify />
        <script
          async
          // eslint-disable-next-line max-len
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3646094358021753"
          crossOrigin="anonymous"
        />
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
