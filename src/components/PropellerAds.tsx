import Script from "next/script";

export const PropellerAds = () => (
  <>
    {/* MultiTag Golden Tag */}
    <Script
      id="multi-tag-golden-tag"
      async={false}
      src="/proppeller-golden-multitag.js"
      strategy="lazyOnload"
    />
    <Script async={false} src="/sw.js" strategy="lazyOnload"/>
  </>
);
