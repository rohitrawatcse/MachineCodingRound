import { createContext, useContext, useReducer, useState } from 'react';
import { forumData } from './postsdata';

const PostsContext = createContext(null);

export const usePostContext = () => useContext(PostsContext);

const initialState = {
  mainUser: {
    accountId: forumData.accountId,
    username: forumData.username,
    name: forumData.name,
    picUrl: forumData.picUrl,
  },
  posts: forumData.posts,
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'UPVOTE': {
      return {
        ...state,
        posts: state.posts.map(singlePost => {
          if (singlePost.postId === action.payload) {
            return { ...singlePost, upvotes: singlePost.upvotes + 1 };
          } else {
            return singlePost;
          }
        }),
      };
    }
    case 'DOWNVOTE': {
      return {
        ...state,
        posts: state.posts.map(singlePost => {
          if (singlePost.postId === action.payload) {
            return { ...singlePost, downvotes: singlePost.downvotes + 1 };
          } else {
            return singlePost;
          }
        }),
      };
    }
    case 'TOGGLE_BOOKMARK': {
      return {
        ...state,
        posts: state.posts.map(singlePost => {
          if (singlePost.postId === action.payload) {
            return {
              ...singlePost,
              isBookmarked: !singlePost.isBookmarked,
            };
          } else {
            return singlePost;
          }
        }),
      };
    }

    default:
      throw new Error(`Error: ${action.type} does not exist.`);
  }
};
const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const upvoteDispatch = postId => {
    dispatch({ type: 'UPVOTE', payload: postId });
  };
  const downvoteDispatch = postId => {
    dispatch({ type: 'DOWNVOTE', payload: postId });
  };
  const toggleBookmarkDispatch = postId => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: postId });
  };

  return (
    <PostsContext.Provider
      value={{
        ...state,
        upvoteDispatch,
        downvoteDispatch,
        toggleBookmarkDispatch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
