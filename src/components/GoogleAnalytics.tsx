import router from "next/router";
import Script from "next/script";
import { useEffect } from "react";

// eslint-disable-next-line arrow-body-style
export const GoogleAnalytics = () => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("set", "page_path", url);
      window.gtag("event", "page_view");
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    // <!-- Global site tag (gtag.js) - Google Analytics -->
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FXEVZSCTXL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-FXEVZSCTXL');
      `}
      </Script>
    </>
  );
};
