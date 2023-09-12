import { Box, Heading, Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { sectionCenterStyles } from '../GlobalStyles';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      as="nav"
      h="5rem"
      boxShadow={'lg'}
      display={'grid'}
      placeItems={'center'}
    >
      <Box
        as="div"
        sx={sectionCenterStyles}
        display={'flex'}
        justifyContent={'space-between'}
      >
        {location.pathname !== '/' && (
          <IconButton
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            onClick={() => navigate(-1)}
          >
            <Icon as={FaArrowLeft} />
          </IconButton>
        )}

        <Heading as="h2" m="auto">
          Food Ordering App
        </Heading>

        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Box>
  );
};

export default Navbar;
