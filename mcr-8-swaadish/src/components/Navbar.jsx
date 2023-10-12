import {
  Box,
  Heading,
  Icon,
  IconButton,
  useColorMode,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React from 'react';
import { sectionCenterStyles } from '../GlobalStyles';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as='nav'
      h='5rem'
      boxShadow={'md'}
      display={'flex'}
      alignItems={'center'}
    >
      <Box
        as='div'
        sx={sectionCenterStyles}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <ChakraLink as={NavLink} to='/'>
          <Heading as='h2'>Swaadish</Heading>
        </ChakraLink>
        <IconButton onClick={toggleColorMode}>
          <Icon as={colorMode === 'light' ? FaMoon : FaSun} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
