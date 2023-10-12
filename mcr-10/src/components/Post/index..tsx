import React from 'react';
import Avatar from '../UI/Avatar';
import { useAuthStore } from '@/store/auth';
import {
  useDeletePostMutation,
  useDislikePostMutation,
  useLikePostMutation,
} from '@/queries/postQueries';
import Loader from '../UI/Loader';
import { PostType } from '@/types';

type PostProps = {
  postData: PostType;
  updateEditingId: (postId: number) => void;
};

const Post = ({ postData, updateEditingId }: PostProps) => {
  const mainUserId = useAuthStore((state) => state.mainUserId);

  const {
    userId,
    content,
    likes: { likeCount, likedBy },
    user: { firstName, lastName, username, image },
  } = postData;

  const { isLoading: isLikeLoading, mutate: likePost } = useLikePostMutation(
    postData.id
  );
  const { isLoading: isDislikeLoading, mutate: dislikePost } =
    useDislikePostMutation(postData.id);

  const { isLoading: isDeleting, mutate: deletePost } = useDeletePostMutation(
    postData.id
  );

  const isLikedByMainUser = likedBy.includes(mainUserId);

  const isPostByMainUser = userId === mainUserId;
  const fullNameOfAuthor = `${firstName} ${lastName}`;

  const toggleLike = () => {
    isLikedByMainUser
      ? dislikePost({
          likeCount: likeCount - 1,
          likedBy: likedBy.filter(
            (idOfUser: number) => idOfUser !== mainUserId
          ),
        })
      : likePost({
          likeCount: likeCount + 1,
          likedBy: [...likedBy, mainUserId],
        });
  };

  const handleDeletePost = () => deletePost();
  return (
    <article className='shadow-md p-4 pb-2 rounded-md mb-3 w-72 md:w-96'>
      <header className='flex gap-2'>
        <Avatar fullName={fullNameOfAuthor} profileImg={image} />

        <div className='flex-col gap-1'>
          <h3 className='text-md'>{fullNameOfAuthor}</h3>
          <p className='text-sm'>@{username}</p>
        </div>
      </header>

      <main>
        <p className='my-2'>{content}</p>
      </main>

      <footer className='flex justify-between'>
        {isLikeLoading || isDislikeLoading ? (
          <Loader />
        ) : (
          <svg
            onClick={toggleLike}
            xmlns='http://www.w3.org/2000/svg'
            className='cursor-pointer icon icon-tabler icon-tabler-heart'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#000000'
            fill={isLikedByMainUser ? 'red' : 'none'}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
          </svg>
        )}

        {isPostByMainUser && (
          <>
            <svg
              onClick={() => updateEditingId(postData.id)}
              xmlns='http://www.w3.org/2000/svg'
              className='cursor-pointer icon icon-tabler icon-tabler-pencil'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#000000'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4' />
              <path d='M13.5 6.5l4 4' />
            </svg>

            {isDeleting ? (
              <Loader />
            ) : (
              <svg
                onClick={handleDeletePost}
                xmlns='http://www.w3.org/2000/svg'
                className='cursor-pointer icon icon-tabler icon-tabler-trash'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#ff2825'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M4 7l16 0' />
                <path d='M10 11l0 6' />
                <path d='M14 11l0 6' />
                <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
              </svg>
            )}
          </>
        )}
      </footer>
    </article>
  );
};

export default Post;
