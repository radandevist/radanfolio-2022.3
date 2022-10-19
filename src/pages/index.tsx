/* eslint-disable max-len */
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AnimatedPage } from "../components/AnimatedPage";
import { about } from "../data/about";
import { getCloudinaryOpenGraphImage, getCloudinaryThumbnail } from "../helpers/cloudinary";

const Home: NextPage = () => {
  const { t } = useTranslation();
  
  const info = {
    ...about,
    bioIntro: t("home:about.bioIntro"),
    bioPreface: t("home:about.bioPreface"),
    bioSub: t("home:about.bioSub")
  };

  return (
    <AnimatedPage>
      <Head>
        <title>Radanfolio | Home &mdash; ANDRIANARISOA Daniel aka Radan Devist</title>
        {/* opengraph */}
        <meta property="og:title" content={t("common:openGraph.title")} />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:description" content={t("common:openGraph.description")} />
        <meta property="og:type" content="" />
        {/* <meta property="og:image" content="https://res.cloudinary.com/dhwkzyl32/image/upload/c_limit,h_630,w_1200/v1660292817/radanfolio/home_opengraph_xhclzs.jpg" /> */}
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage("https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660292817/radanfolio/home_opengraph_xhclzs.jpg")}
        />
      </Head>
      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">{t("home:theBio")}</h2>
        </div>
        <section className="animate animate__animated animate__fadeIn mxw-sm">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-5">
            <div className="sm:col-span-1">
              {/* <img alt="profile_pic" className="h-full w-full 4 object-cover rounded-lg shrink-0" src={info.avatar} /> */}
              <Image
                height={1032}
                width={774}
                src={info.avatar}
                alt="radan's profile pic"
                className="h-full w-full object-cover rounded-lg shrink-0"
                placeholder="blur"
                blurDataURL={getCloudinaryThumbnail(info.avatar)}
              />
            </div>
            <div className="sm:col-span-4 flex flex-col items-start justify-center space-y-3">
              <h2 className="text-4xl">{info.bioIntro}</h2>
              <p className="text-2xl font-light">{info.bioPreface}</p>
              <div className="flex items-center flex-wrap justify-start">
                {info.socials && info.socials.map((social) => (
                  <a key={social.name} target="_blank" rel="noreferrer" href={social.url} className="inline-block my-1 bg-brand1-500 text-white font-semibold py-2 px-3 mr-4">{social?.name}</a>
                ))}
              </div>
              <a rel="noreferrer" href={info.resumeUrl} className="block border border-brand1-500 bo text-brand1-500 font-semibold py-2 px-3">{t("home:downloadMyResume")}</a>
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
            {about?.skills?.map((skill) => (
              <span key={skill?.id} className="py-2 px-3 my-1 mx-2 shadow-lg shadow-slate-300 dark:shadow-brand2-400 bg-brand1-500 text-white font-semibold">{skill?.name}</span>
            ))}
          </div>
          {/* <p className="text-2xl md:text-3xl py-6">{info.bioMain}</p> */}
        </section>
      </div>
    </AnimatedPage>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "home"], null, ["fr", "mg", "en"])),
    // Will be passed to the page component as props
  },
});
