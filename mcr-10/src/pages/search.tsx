import Post from '@/components/Post/index.';
import Button from '@/components/UI/Button';
import Loader from '@/components/UI/Loader';
import usePaginate from '@/components/hooks/usePaginate';
import { useGetPostsSearchQuery } from '@/queries/postQueries';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import useIsEditingPost from '@/components/hooks/useIsEditingPost';
import PostForm from '@/components/Post/PostForm';
import { PostType } from '@/types';
import useInfiniteScroll from '@/components/hooks/useInfiniteScroll';

const Search = () => {
  const {
    query: { q },
  } = useRouter();

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetPostsSearchQuery(q);
  const { isEdittingId, updateEditingId, clearEditingId } = useIsEditingPost();

  useInfiniteScroll(fetchNextPage);

  if (!q) {
    return <p className='mt-2 text-center'>Please Enter some search text</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!posts.pages.flat().length) {
    return (
      <main>
        <section>
          <p className='text-center my-4'>No Post Found for your query "{q}"</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <h3 className='text-center my-4'>Search Results for '{q}'</h3>
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

export default Search;
