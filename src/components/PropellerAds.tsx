import Script from "next/script";

export const PropellerAds = () => (
  <>
    {/*  */}
    {/* <Script async={true} data-cfasync="false" src="//arsnivyr.com/1?z=5489682" /> */}

    {/*  */}
    <Script
      async={false}
      data-cfasync="false"
      type="text/javascript"
      src="/propellerad-1.js"
      strategy="lazyOnload"
    />
    <Script async={false} src="/propellerad-2.js" strategy="lazyOnload"/>
  </>
);
