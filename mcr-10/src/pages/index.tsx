import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import HomePage from '@/components/HomePage';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <>
      <Head>
        <title>Baatein | Home</title>
      </Head>

      <HomePage />
    </>
  );
};

export default Home;
