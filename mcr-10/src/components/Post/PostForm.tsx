import { PostType } from '@/types';
import React, { FormEvent, useState } from 'react';
import Avatar from '../UI/Avatar';
import { useAuthStore } from '@/store/auth';
import Loader from '../UI/Loader';
import { useAddPostMutation, useEditPostMutation } from '@/queries/postQueries';

type PostFormProps = {
  editingData?: PostType & { clearEditingId: () => void };
  isAddingAndId?: number | null;
};

const PostForm = ({ editingData }: PostFormProps) => {
  const mainUserId = useAuthStore((store) => store.mainUserId);
  const [postText, setPostText] = useState(editingData?.content ?? '');
  const { isLoading: isEditingPost, mutate: editPost } = useEditPostMutation(
    editingData?.id
  );

  const { isLoading: isAddingPost, mutate: addPost } = useAddPostMutation();

  const fullNameOfAuthor = `${editingData?.user?.firstName} ${editingData?.user?.lastName}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = postText.trim();

    if (editingData) {
      editPost({
        content,
      });

      editingData.clearEditingId();
    } else {
      addPost({
        id: self.crypto.randomUUID(),
        userId: mainUserId,
        content,
        likes: {
          likeCount: 0,
          likedBy: [],
        },
      });
    }

    setPostText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='shadow-md p-4 pb-2 rounded-md mb-3 w-72 md:w-96'
    >
      {editingData ? (
        <header className='flex gap-2'>
          <Avatar
            fullName={fullNameOfAuthor}
            profileImg={editingData?.user?.image}
          />

          <div className='flex-col gap-1'>
            <h3 className='text-md'>{fullNameOfAuthor}</h3>
            <p className='text-sm'>@{editingData?.user?.username}</p>
          </div>
        </header>
      ) : (
        <header>
          <h3 className='mb-2'>Add Post</h3>
        </header>
      )}

      <textarea
        name='content'
        className='outline-blue-600 border-2 border-current p-2'
        cols={30}
        rows={4}
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />

      <footer className='flex justify-between'>
        <button
          disabled={isAddingPost || isEditingPost}
          type='submit'
          className='block mt-2 px-5 py-1 bg-blue-500 text-white rounded-md'
        >
          {isAddingPost || isEditingPost ? (
            <Loader />
          ) : (
            `${editingData ? 'Edit' : 'Add'} Post`
          )}
        </button>

        {editingData && (
          <button
            className='block mt-2 px-5 py-1 bg-blue-500 text-white rounded-md'
            onClick={editingData.clearEditingId}
          >
            Cancel
          </button>
        )}
      </footer>
    </form>
  );
};

export default PostForm;
