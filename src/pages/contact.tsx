import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AnimatedPage } from "../components/AnimatedPage";
import { MaterialInput } from "../components/form/MaterialInput";
import { MaterialTextArea } from "../components/form/MaterialTextArea";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <Head>
        {/* <title>Radanfolio | ANDRIANARISOA Daniel</title>
        <meta name="description" content={t("home:openGraph.description")} /> */}

        {/* opengraph */}
        {/* <meta property="og:description" content={t("home:openGraph.description")} />
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage(
            // eslint-disable-next-line max-len
            "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660292817/
              radanfolio/home_opengraph_xhclzs.jpg"
          )}
        /> */}
        {/* <meta property="og:title" content={t("home:openGraph.title")} /> */}
        {/* <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:type" content="" /> */}
      </Head>
      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">{t("common:contact")}</h2>
          </div>
        </div>
        <section className="animate animate__animated animate__fadeIn mxw-sm">
          <form className="space-y-10 max-w-xl mx-auto">
            <MaterialInput
              id="devist_contact_name"
              label="Full Name"
              required
              type="text"
            />

            <MaterialInput
              id="devist_contact_email"
              label="Email Address"
              required
              type="text"
            />

            <MaterialTextArea
              id="devist_contact_message"
              label="Your Message"
              required
              rows={2}
            />

            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
              }}
              className="bg-brand1-contrasted w-full pb-4 pt-5 text-slate-50 text-2xl"
            >
              Submit
            </button>
          </form>
        </section>  
      </div>
    </AnimatedPage>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"], null, locales)),
  },
});
