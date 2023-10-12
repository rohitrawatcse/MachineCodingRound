import { useEffect, useState } from 'react';

const usePaginate = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const goToNextPage = () => setPageIndex(pageIndex + 1);
  const goToPreviousPage = () => setPageIndex(pageIndex - 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageIndex]);

  return { pageIndex, goToNextPage, goToPreviousPage };
};

export default usePaginate;
