import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from './UI/Avatar';
import DropDown from './UI/DropDown';
import useDropDown from './hooks/useDropDown';
import { debounceTime } from '../../contants';

const Navbar = () => {
  const {
    asPath,
    replace: routerReplace,
    query: { q },
  } = useRouter();
  const isInSearchPage = asPath.startsWith('/search');
  const isPostsPresentInPage =
    asPath === '/' || asPath === '/explore' || isInSearchPage;

  const [searchText, setSearchText] = useState('');
  const trimmedText = searchText.trim();

  const dropdownRef = useRef<HTMLDivElement>(null!);
  const avatarRef = useRef<HTMLDivElement>(null!);
  const { toggleDropDown, isDropDownOpen } = useDropDown({
    buttonRef: avatarRef,
    dropdownContainerRef: dropdownRef,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setSearchText(text);
  };

  useEffect(() => {
    if (!isInSearchPage && !trimmedText) {
      return;
    }

    const timer = setTimeout(() => {
      routerReplace(`/search?q=${trimmedText}`);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [trimmedText]);

  useEffect(() => {
    if (!isInSearchPage && !!trimmedText) {
      setSearchText('');
    }
  }, [asPath]);

  return (
    <nav
      className={
        'sticky top-0 left-0 bg-white h-16 shadow-md grid place-items-center'
      }
    >
      <div
        className={`w-[90vw] max-w-[1280px] mx-auto flex gap-2 ${
          !isPostsPresentInPage ? 'justify-center' : 'justify-between'
        }`}
      >
        <Link href={'/'}>
          <h2 className='text-3xl font-semibold tracking-wider text-blue-600'>
            Baatein
          </h2>
        </Link>

        {isPostsPresentInPage && (
          <>
            <input
              type='search'
              className='border-2 w-[50vw] max-w-[25rem] p-2 rounded outline-blue-600'
              placeholder='Search content...'
              onChange={handleSearch}
              value={searchText}
            />

            <div className='w-11 relative'>
              <Avatar
                onClickRef={avatarRef}
                onClick={() => toggleDropDown()}
                fullName={'Swastik Patro'}
                profileImg={
                  'https://res.cloudinary.com/dtbd1y4en/image/upload/v1690706751/Gutargu-social/ce0hmyg4spgkrbpsnxqz.jpg'
                }
              />

              {isDropDownOpen && <DropDown ref={dropdownRef} />}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
