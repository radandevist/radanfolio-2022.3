import Script from "next/script";

export const PropellerAds = () => (
  <>
    {/* MultiTag Golden Tag */}
    {/* <Script
      id="multi-tag-golden-tag"
      async={false}
      src="/proppeller-golden-multitag.js"
      strategy="lazyOnload"
    />
    <Script async={false} src="/sw.js" strategy="lazyOnload"/> */}

    {/* Vignette Banner */}
    <Script
      async={false}
      strategy="lazyOnload"
      data-cfasync="false"
      type="text/javascript"
      src="/public/propeller-vignette-banner-a.js"
    />
    <Script async={false} strategy="lazyOnload" src="/public/propeller-vignette-banner-b.js"/>
  </>
);
