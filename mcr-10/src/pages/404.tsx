import Button from '@/components/UI/Button';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Baatein | Not Found</title>
      </Head>

      <main className='h-without-nav flex justify-center items-center'>
        <div>
          <p className='text-6xl text-gray-400 mb-2 text-center'>404</p>
          <p className='text-5xl text-gray-400 mb-8 text-center'>
            {' '}
            Page Not Found
          </p>
          <p className='tracking-wide mb-8'>
            Sorry, the page you are looking for could not be found.
          </p>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </main>
    </>
  );
};

export default NotFound;
