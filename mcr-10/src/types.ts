export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  image: string;
};

export type PostType = {
  id: number;
  userId: number;
  content: string;
  likes: {
    likeCount: number;
    likedBy: number[];
  };
  user: UserType;
};
