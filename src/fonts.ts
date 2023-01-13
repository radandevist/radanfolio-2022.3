import { Balsamiq_Sans, Oxygen } from "@next/font/google";

export const oxygen = Oxygen({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-oxygen",
});

export const balsamiqSans = Balsamiq_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-balsamiq-sans",
});
