/* eslint-disable max-len */
import Head from "next/head";
import { useRouter } from "next/router";
import { Link } from "../components/Link";

const Page404 = () => {
  const router = useRouter();

  return (
    <div className="relative h-[26rem]">
      <Head>
        <title>Radanfolio | Page not found</title>
      </Head>
      <div className="notfound absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[32.5rem] w-full text-center leading-[1.4]">
        <div className="h-[7.2rem] md:h-[11.9rem] mb-4">
          <h1 className="text-[5.375rem] md:text-[9.125rem] font-extrabold m-0">4<span className="inline-block w-[5.375rem] h-[5.375rem] md:w-[7.5rem] md:h-[7.5rem] bg-[url('/emoji.png')] bg-cover scale-[1.4]"></span>4</h1>
        </div>
        <h2 className="text-2xl font-bold m-0 uppercase">Oops! Page not Found</h2>
        <p className="font-light mb-3">Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
        <Link href="/" ><span className="inline-block bg-brand1-500 text-white font-semibold py-2 px-3 hover:bg-brand1-600">Back to homepage</span></Link>
        <a className="cursor-pointer ml-4 hover:text-brand1-600 hover:underline" onClick={() => router.back()}>Or, Back to previous page</a>
      </div>
    </div>
  );
};

export default Page404;
