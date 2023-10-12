import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { FaRegSun, FaSun, FaMoon } from 'react-icons/fa';
import { sectionCenterStyle } from '../styles';
import { Link } from 'react-router-dom';
// import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={sectionCenterStyle}
        >
          <Box as="h2" fontSize="1.25rem">
            <Link to="/">Social Waale</Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <IconButton onClick={toggleColorMode}>
                {colorMode === 'light' ? (
                  <Icon as={FaMoon} />
                ) : (
                  <Icon as={FaSun} />
                )}
              </IconButton>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
