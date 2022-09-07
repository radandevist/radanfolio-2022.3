/* eslint-disable max-len */
import type { NextPage } from "next";
import { AnimatedPage } from "../components/AnimatedPage";
import { about } from "../data/about";
import Image from "next/image";
import { getCloudinaryOpenGraphImage, getCloudinaryThumbnail } from "../helpers/cloudinary";
import Head from "next/head";

const Home: NextPage = () => {
  const info = about;

  return (
    <AnimatedPage>
      <Head>
        <title>Radanfolio | Home &mdash; ANDRIANARISOA Daniel aka Radan Devist</title>
        {/* opengraph */}
        <meta property="og:title" content="Radanfolio Home" />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:description" content="Full-stack react and Node developer, building large scale apps." />
        <meta property="og:type" content="" />
        {/* <meta property="og:image" content="https://res.cloudinary.com/dhwkzyl32/image/upload/c_limit,h_630,w_1200/v1660292817/radanfolio/home_opengraph_xhclzs.jpg" /> */}
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage("https://res.cloudinary.com/dhwkzyl32/image/upload/v1660292817/radanfolio/home_opengraph_xhclzs.jpg")}
        />
      </Head>
      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">The Bio.</h2>
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
              <a rel="noreferrer" href={info.resumeUrl} className="block border border-brand1-500 bo text-brand1-500 font-semibold py-2 px-3">Download ny resume</a>
            </div>
          </div>
        </section>  
        <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200 dark:bg-brand2-400" />
        <section className="mxw-sm my-12">
          <p className="text-2xl md:text-3xl py-6">{info.bioSub}</p>
          {/* <p className="text-2xl md:text-3xl font-light">{info.bioSub}</p> */}
          {/* skills  */}
          <p className="text-2xl md:text-3xl my-12">Skills include:</p>
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
