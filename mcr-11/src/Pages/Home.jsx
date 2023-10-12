import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { usePostContext } from '../PostsContextProvider';
import { useState } from 'react';
import PostCard from '../components/PostCard';

const Home = () => {
  const { posts } = usePostContext();

  const [sortType, setSortType] = useState('latest posts');

  let displayableList;

  if (sortType === 'latest posts') {
    displayableList = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sortType === 'most voted posts') {
    displayableList = [...posts].sort((a, b) => {
      const countA = a.upvotes - a.downvotes;
      const countB = b.upvotes - b.downvotes;
      return countB - countA;
    });
  }

  return (
    <Box as="section" display={'flex'} w="full">
      <Box
        w="full"
        p="2rem 0"
        as="div"
        display={'grid'}
        justifyContent={'center'}
        gap={'1rem 0'}
      >
        <Heading as="h2" textTransform={'capitalize'} mb="2rem">
          {sortType}
        </Heading>
        {displayableList.map(singlePost => (
          <PostCard post={singlePost} key={singlePost.postId} />
        ))}
      </Box>

      <Box display={'flex'} flexDirection={'column'} mt="4rem" gap={'2rem 0'}>
        <Button
          color={sortType === 'latest posts' ? 'red' : 'inherit'}
          onClick={() => setSortType('latest posts')}
        >
          latest losts
        </Button>
        <Button
          color={sortType === 'most voted posts' ? 'red' : 'inherit'}
          onClick={() => setSortType('most voted posts')}
        >
          Most Upvoted Posts
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
