import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ScrollTopWidget } from "../components/ScrollTopWidget";
import { ScrollRestore } from "../components/ScrollRestore";
import { Navbar } from "../components/Navbar";
import { PropellerAds } from "../components/ads/PropellerAds";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";
import { ThemeProvider } from "../contexts/theme";
import { Analytics } from "@vercel/analytics/react";
import { AdSense } from "../components/ads/AdSense";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PropellerAds />
      <AdSense />
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
