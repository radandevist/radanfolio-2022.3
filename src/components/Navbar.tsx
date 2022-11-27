import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { useTheme } from "../contexts/theme";
import { useMediaQuery } from "../hooks/useMediaQuery";

// import { Link } from "./Link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";



export const Navbar = () => {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMobileNavVisible, setMobileNavVisibility] = useState(false);
  const isMedium = useMediaQuery("(min-width: 768px)");

  const links = [
    {
      name: t("common:home"),
      route: "/",
    },
    {
      name: t("common:projects"),
      route: "/projects",
    },
    {
      name: t("common:posts"),
      route: "/posts",
    },
  ];

  const toggleMobileNav = useCallback(() => {
    setMobileNavVisibility(!isMobileNavVisible);
  }, [isMobileNavVisible]);

  useEffect(() => {
    if (isMedium && isMobileNavVisible) toggleMobileNav();
  }, [isMedium, isMobileNavVisible, toggleMobileNav]);

  return (
    <>
      <div
        className="fixed bg-slate-100/70 dark:bg-brand2/70 top-0 left-0 right-0
          w-full h-10 py-12 flex items-center backdrop-blur-lg z-50"
      >
        <nav className="mxw-lg flex items-center justify-between">
          <div
            className="h-10 w-10 md:h-14 md:w-14 rounded-full shadow-lg
              grid place-items-center text-lg text-white font-bold"
          >
            <div className="block dark:hidden">
              <Image width={1181} height={1181} src="/devist-logo-dark.png" alt="devist logo" />
            </div>
            <div className="hidden dark:block">
              <Image width={1181} height={1181} src="/devist-logo-light.png" alt="devist logo" />
            </div>
          </div>
          <div className="hidden md:block space-x-1 md:space-x-4">   
            {links && links.map((link) => (
              <Link
                key={link.name}
                href={link.route}
                className={`p-1 text-sm md:text-md lg:text-lg ${
                  router.pathname === link.route
                    ? "text-brand1-500 border-2 border-transparent border-b-brand1-500 "
                    : `hover:text-brand1-500 border-2 border-transparent hover:border-b-brand1-500
                        duration-300`
                }`}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
            <ThemeSwitcher
              onToggle={toggleTheme}
              className="relative top-[10px] lg:top-2"
            />
          </div>
          {/* Toggler */}
          <div className="inline-flex md:hidden cursor-pointer" onClick={toggleMobileNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </nav>
      </div>
      <MobileNav links={links} visible={isMobileNavVisible} toggle={toggleMobileNav} />
    </>
  );
};
