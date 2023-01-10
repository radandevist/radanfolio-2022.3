import { motion } from "framer-motion";
import React, { PropsWithChildren } from "react";


import { ScrollRestore } from "../ScrollRestore";
import { ScrollTopWidget } from "../ScrollTopWidget";
import { albertSans, merriweather, rubikGlitch } from "../../fonts";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Props = PropsWithChildren<{}>;

export const Layout = ({ children }: Props) => (
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
        {children}
      </main>
    </motion.div>
    <Footer />
  </div>
);
