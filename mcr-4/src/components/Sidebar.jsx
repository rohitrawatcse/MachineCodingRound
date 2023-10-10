import {
  Box,
  Spacer,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React from 'react';
import { links } from '../constants';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Sidebar = () => {
  return (
    <Box
      position={'fixed'}
      as="aside"
      p="2rem"
      top="0"
      left="0"
      bottom="0"
      w="12rem"
      bg={useColorModeValue('black', 'white')}
      color={useColorModeValue('white', 'black')}
    >
      <Box>
        {links.map(({ id, linkName, url }) => (
          <Box key={id} as="div" py="5" textTransform="capitalize">
            <ChakraLink
              _activeLink={{ color: 'red.300' }}
              as={NavLink}
              mb={'auto'}
              to={url}
              _hover={{ textDecor: 'none' }}
            >
              {linkName}
            </ChakraLink>
          </Box>
        ))}
      </Box>
      <Spacer />

      <ColorModeSwitcher mt="26rem" />
    </Box>
  );
};

export default Sidebar;
