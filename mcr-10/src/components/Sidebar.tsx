import { isBothPrimitiveEqual } from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const links = [
  { id: 1, text: 'Home', route: '/' },
  { id: 2, text: 'Explore', route: '/explore' },
];

const Sidebar = () => {
  const { asPath } = useRouter();

  return (
    <aside className='fixed top-16 w-36 border-r-2 border-current h-without-nav'>
      {links.map(({ id, text, route }) => (
        <div
          key={id}
          className={`${
            isBothPrimitiveEqual<typeof route>(asPath, route)
              ? 'text-blue-500'
              : ''
          } mt-4 text-lg tracking-wider`}
        >
          <Link href={route}>{text}</Link>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
