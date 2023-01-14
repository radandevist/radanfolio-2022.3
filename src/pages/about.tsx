import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import { AnimatedPage } from "../components/AnimatedPage";
import { about } from "../data/about";
import { LOCAL_BLUR_PLACEHOLDER_IMAGE, NEXT_APP_DOMAIN_URL } from "../constants";

const AboutPage: NextPage = () => {
  const { t } = useTranslation();

  const info = {
    ...about,
    bioIntro: t("home:about.bioIntro"),
    bioPreface: t("home:about.bioPreface"),
    bioSub: t("home:about.bioSub")
  };

  return (
    <AnimatedPage>
      <NextSeo
        title={`${t("common:about")}`}
        description={`${t("home:openGraph.description")}`}
        openGraph={{
          title: `${t("home:openGraph.title")}`,
          description: `${t("home:openGraph.description")}`,
          type: "profile",
          images: [
            {
              url: `${NEXT_APP_DOMAIN_URL}/images/meta/about_og_image.jpg`,
              alt: `${t("home:openGraph.title")}`,
            }
          ]
        }}
      />

      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">{t("home:theBio")}</h2>
        </div>
        <section className="animate animate__animated animate__fadeIn mxw-sm">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Image
                width={info.avatar.width}
                height={info.avatar.height}
                src={info.avatar.url}
                alt="radan's profile pic"
                className="h-full w-full object-cover rounded-lg shrink-0"
                placeholder="blur"
                blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
                loading="eager"
              />
            </div>
            <div className="sm:col-span-4 flex flex-col items-start justify-center space-y-3">
              <h2 className="text-4xl">{info.bioIntro}</h2>
              <p className="text-2xl font-light">{info.bioPreface}</p>
              <div className="flex items-center flex-wrap justify-start">
                {info.socials && info.socials.map((social) => (
                  <a
                    key={social.name}
                    target="_blank"
                    rel="noreferrer"
                    href={social.url}
                    className="inline-block my-1 bg-brand1-contrasted text-white
                      font-semibold py-2 px-3 mr-4"
                  >
                    {social?.name}
                  </a>
                ))}
              </div>
              <a
                rel="noreferrer"
                href={info.resumeUrl}
                className="block border border-brand1-contrasted dark:border-white
                text-brand1-contrasted dark:text-white font-semibold py-2 px-3"
              >
                {t("home:downloadMyResume")}
              </a>
            </div>
          </div>
        </section>  
        <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200 dark:bg-brand2-400" />
        <section className="mxw-sm my-12">

          <p className="text-2xl md:text-3xl py-6">{info.bioSub}</p>
          {/* <p className="text-2xl md:text-3xl font-light">{info.bioSub}</p> */}

          {/* skills  */}
          <p className="text-2xl md:text-3xl my-12">{t("home:skillsInclude")}:</p>
          <div className="flex items-center flex-wrap">
            {about?.skills?.map((skill, index) => (
              <span
                key={index}
                className="py-2 px-3 my-1 mx-2 shadow-lg shadow-slate-300 dark:shadow-brand2-400
                bg-brand1-contrasted text-white font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* <p className="text-2xl md:text-3xl py-6">{info.bioMain}</p> */}
        </section>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "home"], null, locales)),
  },
});
