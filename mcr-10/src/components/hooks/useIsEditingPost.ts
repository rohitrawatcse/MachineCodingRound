import { useState } from 'react';

const useIsEditingPost = () => {
  const [isEdittingId, setIsEditingId] = useState<number>(0);

  const updateEditingId = (postId: number) => setIsEditingId(postId);
  const clearEditingId = () => setIsEditingId(0);
  return {
    isEdittingId,
    updateEditingId,
    clearEditingId,
  };
};

export default useIsEditingPost;
