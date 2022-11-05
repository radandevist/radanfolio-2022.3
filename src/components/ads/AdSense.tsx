import Script from "next/script";
import React from "react";

export const AdSense = () => (
  <Script
    async
    // eslint-disable-next-line max-len
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3646094358021753"
    crossOrigin="anonymous"
    strategy="lazyOnload"
  />
);
