/* eslint-disable max-len */
import React from "react";
import { useRouter } from "next/router";
import { Link } from "./Link";
import Image from "next/image";import { useTheme } from "../contexts/theme";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";

export const Navbar = () => {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();

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

  return (
    <div className="fixed bg-slate-100/70 dark:bg-brand2/70 top-0 left-0 right-0 w-full h-10 py-12 flex items-center backdrop-blur-lg z-50">
      <nav className="mxw-lg flex items-center justify-between">
        <div className="h-10 w-10 md:h-14 md:w-14 rounded-full shadow-lg grid place-items-center text-lg text-white font-bold">
          <div className="block dark:hidden">
            <Image width={1181} height={1181} src="/devist-logo-dark.png" alt="devist logo" />
          </div>
          <div className="hidden dark:block">
            <Image width={1181} height={1181} src="/devist-logo-light.png" alt="devist logo" />
          </div>
        </div>
        <div className="space-x-1 md:space-x-4">   
          {links && links.map((link) => (
            <Link
              key={link.name}
              href={link.route}
              className={router.pathname === link.route
                ? "p-1 text-brand1-500 border-2 border-transparent border-b-brand1-500 text-sm md:text-md lg:text-lg"
                : "p-1 hover:text-brand1-500 border-2 border-transparent hover:border-b-brand1-500 duration-300 text-sm md:text-md lg:text-lg"}
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
        {/* Hamburger menu icon */}
        {/* <div className="inline-flex md:hidden cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div> */}
      </nav>
    </div>
  );
};
