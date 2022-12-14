import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const LOCAL_STORAGE_THEME_KEY = "radanfolio-theme";

export type ThemeContextValue = {
  theme: string;
  toggleTheme: () => void;
};

const themeContext = createContext<ThemeContextValue>({
  theme: Theme.LIGHT,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(themeContext);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);

  useEffect(() => {
    if (
      theme === Theme.DARK
      || (!("theme" in localStorage)
      && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <themeContext.Provider value={value}>
      {children}
    </themeContext.Provider>
  );
};
