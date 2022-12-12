import "animate.css";
import "../styles/globals.css";
import "../styles/prism-a11y-dark.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { Albert_Sans, Merriweather, Rubik_Glitch } from "@next/font/google";

import { ScrollTopWidget } from "../components/ScrollTopWidget";
import { ScrollRestore } from "../components/ScrollRestore";
import { Navbar } from "../components/Navbar";
// import { PropellerAdVignetteBanner } from "../components/ads/PropellerAds";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "../contexts/theme";

const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik",
  display: "swap",
  weight: "400"
});

const albertSans = Albert_Sans({
  weight: ["100", "200", "300", "400", "500"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
});

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
