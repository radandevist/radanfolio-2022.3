import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";

import { AnimatedPage } from "../components/AnimatedPage";
import { PATH_NAMES } from "../constants";

const Error500Page: NextPage = () => {
  const router = useRouter();

  return (
    <AnimatedPage>
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
  
          <p className="font-light mb-3">
            An error 500 occurred on the server.
          </p>
  
          <div className="flex flex-wrap justify-center items-center">
            <Link href={PATH_NAMES.home} className="">
              <span
                className="inline-block bg-brand1-500 text-white font-semibold
                py-2 px-3 hover:bg-brand1-600"
              >
              Go to home page
              </span>
            </Link>
            <div className="py-4 px-3">
              <a
                className="cursor-pointer hover:text-brand1-600 hover:underline"
                onClick={() => router.back()}
              >
              Go to previous page
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"], null, locales)),
  },
});

export default Error500Page;
