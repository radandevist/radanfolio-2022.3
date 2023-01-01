import { Albert_Sans, Inter, Merriweather, Rubik_Glitch } from "@next/font/google";

export const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik",
  display: "swap",
  weight: "400",
});

export const albertSans = Albert_Sans({
  weight: ["100", "200", "300", "400", "500"],
});

export const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
});

// ADMIN
export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  display: "fallback",
  variable: "--font-inter",
});
