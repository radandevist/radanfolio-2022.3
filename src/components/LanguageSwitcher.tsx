import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useClickOutside } from "../hooks/useClickOutside";

const languagesProperties: Record<string, any> = {
  en: {
    label: <>{"🇬🇧 English"}&nbsp;&nbsp;&nbsp;</>,
  },
  fr: {
    label: <>{"🇫🇷 Français"}&nbsp;</>,
  },
  mg: {
    label: "🇲🇬 Malagasy",
  }
};

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, query, asPath, locale } = router;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { node } = useClickOutside<HTMLDivElement>({
    onClickOutside: () => { setIsOpen(false); }
  });

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    // eslint-disable-next-line max-len
    <div ref={node} className="relative inline-block text-left text-sm md:text-md lg:text-lg">
      <button
        type="button"
        onClick={toggleDropdown}
        // eslint-disable-next-line max-len
        className="inline-flex w-full justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand1"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {languagesProperties[locale!].label}
        {/* Heroicon name: mini/chevron-down */}
        <svg
          className="-mr-1 ml-2 h-5 w-5 mt-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20" fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            // eslint-disable-next-line max-len
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* <!--
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      --> */}
      <div
        // eslint-disable-next-line max-len
        className={`${isOpen ? "" : "hidden"} absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
          {Object.entries(languagesProperties).map(([language, properties]) => (
            <Link
              key={language}
              href={{ pathname, query }}
              as={asPath}
              locale={language}
              role="menuitem"
            >
              <a
                className="text-gray-700 block px-4 py-2"
                onClick={toggleDropdown}
              >
                {properties.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
