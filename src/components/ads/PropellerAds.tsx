import Script from "next/script";

export const PropellerAds = () => {
  if (process && process.env.NODE_ENV === "development") return null;

  return (
    <>
      {/* Vignette Banner */}
      <Script
        async={false}
        strategy="lazyOnload"
        data-cfasync="false"
        type="text/javascript"
        src="/propeller-vignette-banner-a.js"
      />
      <Script async={false} strategy="lazyOnload" src="/propeller-vignette-banner-b.js"/>
    </>
  );
};
