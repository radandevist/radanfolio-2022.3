import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import { useTheme } from "../contexts/theme";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link } from "./Link";
import { ThemeSwitcher } from "./ThemeSwitcher";

type Props = {
  visible: boolean;
  toggle: () => void;
  links: {
    name: string;
    route: string;
  }[];
};

const AUTO = "overflow-auto";
const HIDDEN = "overflow-hidden";

export const MobileNav: FC<Props> = ({ links, toggle, visible }) => {
  const { toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // If we select body, it won't work with Next.js
    const { classList } = document.querySelector("html") as HTMLElement;

    // ? Maybe should i use classList.toggle instead all the below gibberish?
    // classList.toggle("overflow-hidden");
    // * Safer approach: preserves existing css classes
    const oldClass = visible ? AUTO : HIDDEN;
    const newClass = visible ? HIDDEN : AUTO;
    if (!classList.contains(oldClass)) classList.add(oldClass);
    classList.replace(oldClass, newClass);
    // * short way but doesn't preserve classes
    // body.className = visible ? HIDDEN : AUTO;
  }, [visible]);

  return (
    <>
      <div className="absolute top-0 left-0 bottom-0">
        <nav
          className={`fixed w-full h-full z-50
            transition-all duration-300 ${visible ? "visible" : "invisible"}`}
        >
          {/* Overlay */}
          <div
            onClick={toggle}
            className={`fixed bg-black opacity-50 w-full h-full
              ${visible ? "animate-fadeIn" : "animate-fadeOut"}`}
          />

          {/* Menu container */}
          <div
            className={`pt-2 px-4 fixed right-0 w-[90%] max-w-[70%] h-full
            bg-slate-100 dark:bg-brand2 overflow-y-scroll flex flex-col overscroll-y-contain
              ${visible ? "animate-showMenu" : "animate-hideMenu"}`}
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.route}
                className={`text-center py-2
                  ${router.pathname === link.route ? "text-brand1-500" : ""}`}
              >
                {link.name}
              </Link>
            ))}

            <ThemeSwitcher
              onToggle={toggleTheme}
              className="relative py-2 mx-auto lg:top-2"
            />
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
};
