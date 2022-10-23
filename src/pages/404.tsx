/* eslint-disable max-len */
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Link } from "../components/Link";
import { AnimatedPage } from "../components/AnimatedPage";
import { Trans, useTranslation } from "next-i18next";

const Page404 = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <Head>
        <title>{`Radanfolio | ${t("common:pageNotFound")}`}</title>
      </Head>
      <div className="relative h-[26rem]">
        <div className="notfound absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 container text-center leading-[1.4]">
          <div className="h-[7.2rem] md:h-[11.9rem] mb-4">
            <h1 className="text-[5.375rem] md:text-[9.125rem] font-extrabold m-0">4<span className="inline-block w-[5.375rem] h-[5.375rem] md:w-[7.5rem] md:h-[7.5rem] bg-[url('/emoji-404.png')] bg-cover scale-[1.4]"></span>4</h1>
          </div>
          <h2 className="text-2xl font-bold m-0 uppercase">{t("common:pageNotFound")}</h2>
          <p className="font-light mb-3">
            <Trans
              i18nKey="common:sorryPageNotFound"
              components={{ 1: <br/> }}
            />
            {/* {t("common:sorryPageNotFound")} */}
          </p>
          <div className="flex flex-wrap justify-center items-center">
            <Link href="/" className="">
              <span className="inline-block bg-brand1-500 text-white font-semibold py-2 px-3 hover:bg-brand1-600">{t("common:goToHomePage")}</span>
            </Link>
            <div className="py-4 px-3">
              <a className="cursor-pointer hover:text-brand1-600 hover:underline" onClick={() => router.back()}>{t("common:orGoToPreviousPage")}</a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Page404;

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"], null, locales)),
    // Will be passed to the page component as props
  },
});
