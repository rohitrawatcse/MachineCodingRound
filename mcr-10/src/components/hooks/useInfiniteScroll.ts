import { debounce, wait } from '@/utils/utils';
import { useEffect } from 'react';
import { debounceTime } from '../../../contants';

type loadMorePagesType = () => void;

const useInfiniteScroll = (loadMorePages: loadMorePagesType) => {
  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 10
      ) {
        // as the response was fast, added this just to show the spinner
        await wait(500);
        loadMorePages();
      }
    };

    const debouncedScroll = debounce(handleScroll, debounceTime);

    window.addEventListener('scroll', debouncedScroll);

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, []);
};

export default useInfiniteScroll;
