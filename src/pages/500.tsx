// import Link from "next/link";
// import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { Trans, useTranslation } from "next-i18next";
// import { NextSeo } from "next-seo";

import { AnimatedPage } from "../components/AnimatedPage";
// import { NEXT_APP_DOMAIN_URL } from "../constants";

const Page404 = () => {
  // const router = useRouter();
  // const { t } = useTranslation();

  return (
    <AnimatedPage>
      {/* <NextSeo
        title={`${t("common:pageNotFound")}`}
        description={`${t("common:sorryPageNotFound").replace("<1/>", " ")}`}
        openGraph={{
          title: `${t("common:pageNotFound")}`,
          description: `${t("common:sorryPageNotFound").replace("<1/>", " ")}`,
          images: [
            {
              url: `${NEXT_APP_DOMAIN_URL}/images/meta/not_found_og_image.jpg`,
            },
          ]
        }}
      /> */}
      
      <div className="relative h-[26rem]">
        <div
          className="notfound absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            container text-center leading-[1.4]"
        >

          <div className="h-[7.2rem] md:h-[11.9rem] mb-4">
            <h1 className="text-[5.375rem] md:text-[9.125rem] font-extrabold m-0">
              5
              <span
                className="inline-block w-[5.375rem] h-[5.375rem] md:w-[7.5rem] md:h-[7.5rem]
                  bg-[url('/emoji-404.png')] bg-cover scale-[1.4]"
              />
              0
            </h1>
          </div>
          <h2 className="text-2xl font-bold m-0 uppercase">
            Internal Server Error
          </h2>

          {/* <p className="font-light mb-3">
            <Trans
              i18nKey="common:sorryPageNotFound"
              components={{ 1: <br/> }}
            />
          </p> */}

          {/* <div className="flex flex-wrap justify-center items-center">
            <Link href="/" className="">
              <span
                className="inline-block bg-brand1-500 text-white font-semibold
                  py-2 px-3 hover:bg-brand1-600"
              >
                {t("common:goToHomePage")}
              </span>
            </Link>
            <div className="py-4 px-3">
              <a
                className="cursor-pointer hover:text-brand1-600 hover:underline"
                onClick={() => router.back()}
              >
                {t("common:orGoToPreviousPage")}
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Page404;

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"], null, locales)),
  },
});
