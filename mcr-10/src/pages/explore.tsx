import ExplorePosts from '@/components/Explore';
import Head from 'next/head';
import React from 'react';

const Explore = () => {
  return (
    <>
      <Head>
        <title>Baatein | Explore</title>
      </Head>

      <ExplorePosts />
    </>
  );
};

export default Explore;
