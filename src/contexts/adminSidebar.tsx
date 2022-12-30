import {
  createContext,
  FC,
  PropsWithChildren,
  // useCallback,
  useContext,
  // useEffect,
  useMemo,
  useState
} from "react";

// import { useLocalStorage } from "../hooks/useLocalStorage";

// enum Theme {
//   DARK = "dark",
//   LIGHT = "light",
// }

// const LOCAL_STORAGE_THEME_KEY = "radanfolio-theme";

export type AdminSidebarContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

const adminSidebarContext = createContext<AdminSidebarContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {}
});

export const useAdminPageHeader = () => useContext(adminSidebarContext);

export const AdminPageHeaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const value = useMemo<AdminSidebarContextValue>(() => ({
    sidebarOpen,
    setSidebarOpen,
  }), [sidebarOpen]);

  return (
    <adminSidebarContext.Provider value={value}>
      {children}
    </adminSidebarContext.Provider>
  );
};


