import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ScrollTopWidget } from "../components/ScrollTopWidget";
import { ScrollRestore } from "../components/ScrollRestore";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";
import { ThemeProvider } from "../contexts/theme";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
// import { AdScript001 } from "../components/AdScript001";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script data-cfasync="false" type="text/javascript" src="/propellerad-1.js" />
      <Script src="/propellerad-2.js" />
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
