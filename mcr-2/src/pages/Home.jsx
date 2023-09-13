import React from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { sectionCenterStyles } from '../GlobalStyles';
import { data } from '../data';
import LocationCard from '../LocationCard.jsx';

const Home = () => {
  return (
    <Box sx={sectionCenterStyles}>
      <Heading textAlign="center">Welcome to Trip Advisor</Heading>

      <Heading color="blue.500" textAlign="center">
        Top Continents for your next holiday
      </Heading>

      <Box
        display={'grid'}
        gap="1rem"
        gridTemplateColumns={'repeat(auto-fill, minmax(13rem, 1fr))'}
      >
        {data.continents.map(({ image, name, id }) => (
          <ChakraLink
            h="10rem"
            w="13rem"
            to={`/continents/${id}`}
            as={Link}
            key={id}
          >
            <LocationCard name={name} image={image} />
          </ChakraLink>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
