import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Radan&apos;s Website</title>
    </Head>
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-4xl">Hello <span className="text-cyan-500">Radan</span></h1>
    </div>
  </>
);

export default Home;
