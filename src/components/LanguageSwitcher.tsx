import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { pathname, query, asPath, locale } = router;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale, i18n.language]);

  return (
    <div>
      <p>Switch to:</p>
      <Link href={{ pathname, query }} as={asPath} locale="en">
        <button>
          <a>English</a>
        </button>
      </Link>
      <Link href={{ pathname, query }} as={asPath} locale="fr">
        <button>
          <a>Français</a>
        </button>
      </Link>
      <Link href={{ pathname, query }} as={asPath} locale="mg">
        <button>
          <a>Malagasy</a>
        </button>
      </Link>
    </div>
  );
};
