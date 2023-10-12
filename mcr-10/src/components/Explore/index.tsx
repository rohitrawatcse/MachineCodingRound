import { useGetAllPostsQuery } from '@/queries/postQueries';
import Post from '../Post/index.';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import usePaginate from '../hooks/usePaginate';
import { isLengthEqualToLimit } from '@/utils/utils';
import useIsEditingPost from '../hooks/useIsEditingPost';
import PostForm from '../Post/PostForm';
import { PostType } from '@/types';
import { Fragment, useEffect } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const ExplorePosts = () => {
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetAllPostsQuery();
  const { isEdittingId, updateEditingId, clearEditingId } = useIsEditingPost();

  useInfiniteScroll(fetchNextPage);

  if (isError) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <h2 className='text-2xl text-center font-bold mb-4'>Explore</h2>

      <section>
        {posts.pages.map((singleGroup: PostType[]) => {
          return singleGroup.map((singlePost: PostType) => (
            <Fragment key={singlePost.id}>
              {singlePost.id === isEdittingId ? (
                <PostForm
                  key={singlePost.id}
                  editingData={{ ...singlePost, clearEditingId }}
                />
              ) : (
                <Post
                  key={singlePost.id}
                  postData={singlePost}
                  updateEditingId={updateEditingId}
                />
              )}
            </Fragment>
          ));
        })}
      </section>

      {hasNextPage && <Loader />}
    </main>
  );
};

export default ExplorePosts;
