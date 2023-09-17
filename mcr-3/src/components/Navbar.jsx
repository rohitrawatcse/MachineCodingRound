import React from 'react';
import { sectionCenterStyles } from '../GlobalStyles';
import { Box, Heading, Input } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ searchQuery, handleSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      as="nav"
      h="5rem"
      display={'grid'}
      placeItems={'center'}
      gap={'0 1rem'}
      boxShadow={'lg'}
    >
      <Box
        sx={sectionCenterStyles}
        as="div"
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Heading
          as={Link}
          to="/"
          _hover={{ textDecor: 'none' }}
          color="red.500"
        >
          Meetup
        </Heading>
        <Input
          maxW="20rem"
          value={searchQuery}
          type="search"
          placeholder="search by title or tags"
          onChange={e => {
            handleSearch(e);

            if (location.pathname !== '/') {
              navigate('/');
            }
          }}
        />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Box>
  );
};

export default Navbar;
