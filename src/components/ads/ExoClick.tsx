import { FC, useEffect } from "react";

type BannerAdProps = {
  dataZoneId: number;
  dataSub?: number;
  dataKeywords?: any; // TODO: change type
};

export const BannerAd: FC<BannerAdProps> = ({ dataZoneId, dataSub, dataKeywords }) => {
  useEffect(() => {
    if (!globalThis.AdProvider) {
      globalThis.AdProvider = [];
    }

    (AdProvider = window.AdProvider || []).push({ serve: {} });
  }, []);

  return (
    <>
      <ins
        className="adsbyexoclick" data-zoneid={`${dataZoneId}`}
        data-keywords={dataKeywords}
        data-sub={dataSub}
      />
    </>
  );
};

// eslint-disable-next-line arrow-body-style
export const StickyBanner = () => {
  return(
    <>
      <script
        dangerouslySetInnerHTML={{ // TODO: Dynamise the properties
          __html: `var ad_idzone = "4865018",
          ad_width = "300",
          ad_height = "250",
          v_pos = "bottom",
          h_pos = "center";
          var customTargeting = {};`, 
        }}
      />
      <script
        async
        type="application/javascript"
        src="https://a.exdynsrv.com/js.php?t=17&idzone=4865018"
      />
    </>
  );
};
