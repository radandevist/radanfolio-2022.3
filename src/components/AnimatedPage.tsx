import { motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";

const animations = {
  initial: { opacity: 0, x: 100},
  animate: { opacity: 1, x: 0},
  exit: { opacity: 0, x: -100}
};

export const AnimatedPage: FC<PropsWithChildren> = ({ children }) => (
  <motion.div variants={animations} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);