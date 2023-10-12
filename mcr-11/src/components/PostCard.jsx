import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import { AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { usePostContext } from '../PostsContextProvider';
import { FaBookmark } from 'react-icons/fa';

const getCreatedDate = timestampStr => {
  const timestamp = new Date(timestampStr);

  const currentTime = new Date().getTime();

  const timeDifference = (currentTime - timestamp.getTime()) / 60000;

  return Math.round(timeDifference);
};

const PostCard = ({ post }) => {
  const { upvoteDispatch, downvoteDispatch, toggleBookmarkDispatch } =
    usePostContext();
  const toast = useToast();
  return (
    <Card maxW="md">
      <Box display={'flex'}>
        <Box as="div" mt="2rem">
          <IconButton onClick={() => upvoteDispatch(post.postId)}>
            <Icon as={TiArrowUpThick}></Icon>
          </IconButton>
          <Text textAlign={'center'}>{post.upvotes - post.downvotes}</Text>
          <IconButton onClick={() => downvoteDispatch(post.postId)}>
            <Icon as={TiArrowDownThick}></Icon>
          </IconButton>
        </Box>
        <Box>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={post.name} src={post.picUrl} />

                <Box>
                  <Heading size="sm">{post.name}</Heading>
                  <Text>@{post.username}</Text>
                  <Text>{getCreatedDate(post.createdAt)}m ago</Text>
                  <Box display={'flex'} gap="0 .25rem">
                    {post.tags.map((tag, i) => (
                      <Text key={i} p=".25rem" bg="gray.200">
                        {tag}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Heading as="h1" fontSize="1.25rem">
              {post.post}
            </Heading>
            <Text>{post.postDescription}</Text>
          </CardBody>
        </Box>
      </Box>

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
          <Icon as={AiOutlineShareAlt} />
        </IconButton>
        <IconButton flex="1" variant="ghost">
          <Link to={`/post/${post.postId}`}>
            <Icon as={AiOutlineComment} />
          </Link>
        </IconButton>
        <IconButton
          onClick={() => {
            toggleBookmarkDispatch(post.postId);
            toast({
              title: `Post ${
                post.isBookmarked ? 'Unb' : 'B'
              }ookmarked Successfully`,
              status: 'success',
              position: 'top-right',
              duration: 1000,
              isClosable: true,
            });
          }}
          flex="1"
          variant="ghost"
          color={post.isBookmarked ? 'green' : 'inherit'}
        >
          <Icon as={FaBookmark} />
        </IconButton>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
