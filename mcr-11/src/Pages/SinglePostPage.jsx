import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePostContext } from '../PostsContextProvider';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';

const SinglePostPage = () => {
  const { postId: postIdFromParam } = useParams();

  const { posts } = usePostContext();

  const postToDisplay = posts.find(
    singlePost => singlePost.postId === postIdFromParam
  );

  if (!postToDisplay) {
    return (
      <Box display={'grid'} placeItems={'center'}>
        <Center>
          <Text color="red">No post found</Text>
          <Link to="/">Ho to Home</Link>
        </Center>
      </Box>
    );
  }
  return (
    <Box>
      <Center>
        <PostCard post={postToDisplay} />
      </Center>

      <Box>
        {postToDisplay.comments.map(comment => (
          <Card key={comment.commentId}>
            <CardHeader display={'flex'} gap=".5rem">
              <Avatar name={comment.username} src={comment.picUrl} />
            </CardHeader>
            <CardBody>
              <Text>{comment.comment}</Text>
            </CardBody>
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <IconButton flex="1" variant="ghost">
                <Icon as={AiFillHeart} />
              </IconButton>
              <IconButton flex="1" variant="ghost">
                <Icon as={AiOutlineShareAlt} />
              </IconButton>
              <IconButton flex="1" variant="ghost">
                <Icon as={AiOutlineComment} />
              </IconButton>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SinglePostPage;
