import {
  Avatar,
  Box,
  List,
  ListItem,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { MdExplore } from 'react-icons/md';
import { RiHome7Fill } from 'react-icons/ri';
import { AiFillHeart } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';
import React from 'react';
import { usePostContext } from '../PostsContextProvider';

const sidebarLinks = [
  {
    id: '1',
    icon: <RiHome7Fill />,
    text: 'Home',
  },
  {
    id: '2',
    icon: <MdExplore />,
    text: 'Explore',
  },
  {
    id: '3',
    icon: <BsBookmarkFill />,
    text: 'Bookmarks',
  },
  {
    id: '4',
    icon: <AiFillHeart />,
    text: 'Liked',
  },
];

const Sidebar = () => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  const {
    mainUser: { picUrl, name, username },
  } = usePostContext();

  return (
    <List
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap=".25rem 0"
      ml="0"
      p="1rem 0"
      pb={{ md: '2rem' }}
      h={{ md: 'full' }}
      h="calc(100vh - 5rem)"
    >
      {sidebarLinks.map(({ id, icon, text }) => (
        <Box
          key={id}
          _hover={{
            bg: { lg: bg },
          }}
          letterSpacing="widest"
          borderRadius="full"
        >
          <ListItem
            display="flex"
            alignItems="center"
            gap=".95rem"
            minW="11rem"
            p=".75rem 1rem"
          >
            <Box fontSize="1.5rem" as="span">
              {icon}
            </Box>

            <Text fontSize="1.25rem">{text}</Text>
          </ListItem>
        </Box>
      ))}

      <Spacer hideBelow="md" />

      <Box as="div" p=".35rem .35rem" bg={bg} borderRadius="2.5rem">
        <Box display="flex" gap="0 .75rem">
          <Avatar size="md" name={name} src={picUrl} color="#fff" />
          <Box h="full" as="div">
            <Text fontWeight="semibold" as="h3">
              {name}
            </Text>

            <Text fontSize="1rem" fontStyle={'italic'} letterSpacing={'normal'}>
              @{username}
            </Text>
          </Box>
        </Box>
      </Box>
    </List>
  );
};

export default Sidebar;
