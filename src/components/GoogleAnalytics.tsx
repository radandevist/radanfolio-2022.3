import Script from "next/script";

// eslint-disable-next-line arrow-body-style
export const GoogleAnalytics = () => {
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
