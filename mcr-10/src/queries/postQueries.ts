import axios, { AxiosError } from 'axios';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { hardCodedTotalPages, jsonServer, paginateLimit } from '../../contants';

export const useGetAllPostsQuery = () =>
  useInfiniteQuery({
    queryKey: ['all-posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${jsonServer}posts?_expand=user&_page=${pageParam}&_limit=${paginateLimit}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
    getNextPageParam: (_, pages) =>
      pages.length < hardCodedTotalPages ? pages.length + 1 : undefined,

    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data.message);
    },
  });

export const useGetUsersPostsQuery = (userId: number) =>
  useInfiniteQuery({
    queryKey: ['user-posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${jsonServer}posts?userId=${userId}&_expand=user&_page=${pageParam}&_limit=${paginateLimit}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
    getNextPageParam: (_, pages) =>
      pages.length < hardCodedTotalPages ? pages.length + 1 : undefined,

    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data.message);
    },
  });

export const useGetPostsSearchQuery = (queryText: string) =>
  useInfiniteQuery({
    queryKey: ['full-search', queryText],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${jsonServer}posts?q=${queryText}&_expand=user&_page=${pageParam}&_limit=${paginateLimit}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },

    getNextPageParam: (_, pages) =>
      pages.length < hardCodedTotalPages ? pages.length + 1 : undefined,

    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data.message);
    },
  });

export const useLikePostMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likePost', postId],

    mutationFn: async (updatedData: {
      likeCount: number;
      likedBy: number[];
    }) => {
      const res = await axios.patch(`${jsonServer}posts/${postId}`, {
        likes: updatedData,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};

export const useDislikePostMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['dislikePost', postId],
    mutationFn: async (updatedData: {
      likeCount: number;
      likedBy: number[];
    }) => {
      const res = await axios.patch(`${jsonServer}posts/${postId}`, {
        likes: updatedData,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};

export const useDeletePostMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletePost', postId],
    mutationFn: async () => {
      const res = await axios.delete(`${jsonServer}posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};
export const useEditPostMutation = (postId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editPost', postId],
    mutationFn: async (body) => {
      const res = await axios.patch(`${jsonServer}posts/${postId}`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addPost'],
    mutationFn: async (body) => {
      const res = await axios.post(`${jsonServer}posts/`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};
