import Button from '../UI/Button';
import Post from '../Post/index.';
import Loader from '../UI/Loader';
import { useAuthStore } from '@/store/auth';
import { useGetUsersPostsQuery } from '@/queries/postQueries';
import { isLengthEqualToLimit } from '@/utils/utils';
import PostForm from '../Post/PostForm';
import useIsEditingPost from '../hooks/useIsEditingPost';
import { PostType } from '@/types';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Fragment } from 'react';

const HomePage = () => {
  const mainUserId = useAuthStore((state) => state.mainUserId);
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetUsersPostsQuery(mainUserId);
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
      <h2 className='text-2xl text-center font-bold mb-4'>Home</h2>

      <PostForm isAddingAndId={mainUserId} />

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

export default HomePage;
