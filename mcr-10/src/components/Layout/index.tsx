import React, { ReactNode } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { sectionCenter } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';

type LayoutProp = { children: ReactNode };

const Layout = ({ children }: LayoutProp) => {
  const mainUserId = useAuthStore((store) => store.mainUserId);
  console.log({ mainUserId });

  const router = useRouter();

  return (
    <main>
      <Navbar />

      {/* {!mainUserId ? (
        <Authenticate pathToReturnBack={router.asPath} />
      ) : ( */}
      <main className={`${sectionCenter} grid`}>
        <Sidebar />
        <div className='ml-40 md:mx-auto pt-2 pb-4'>{children}</div>
      </main>
      {/* )} */}
    </main>
  );
};

export default Layout;
