import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Link from "next/link";


import { useTheme } from "../contexts/theme";

// import { Link } from "./Link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
          className={`fixed w-full h-full z-50 transition-[visibility] duration-300
            ${visible
              ? "visible" // eslint-disable-line @typescript-eslint/indent
              : "invisible"}`} // eslint-disable-line @typescript-eslint/indent
        >
          {/* Overlay */}
          <div
            onClick={toggle}
            className={`fixed bg-black w-full h-full transition-[opacity] duration-300
              ${visible
                ? "opacity-70" // eslint-disable-line @typescript-eslint/indent
                : "opacity-0"}`} // eslint-disable-line @typescript-eslint/indent
          />

          {/* Menu container */}
          <div
            className={`pt-2 px-4 fixed w-[90%] max-w-[70%] h-full left-full
            bg-slate-100 dark:bg-brand2 overflow-y-scroll flex flex-col overscroll-y-contain
            transition-[transform] duration-300
            ${visible
              ? "-translate-x-full" // eslint-disable-line @typescript-eslint/indent
              : ""}`} // eslint-disable-line @typescript-eslint/indent
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.route}
                className={`text-center py-2
                  ${router.pathname === link.route ? "text-brand1-contrasted" : ""}`}
              >
                {link.name}
              </Link>
            ))}

            <ThemeSwitcher
              onToggle={toggleTheme}
              className="relative py-2 mx-auto md:top-[0.375rem] lg:top-2"
            />
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
};
