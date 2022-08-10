import { useEffect } from "react";
import { useRouter } from "next/router";

export const ScrollRestore = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
};
