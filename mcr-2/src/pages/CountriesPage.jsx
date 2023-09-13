import React from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data';
import {
  Box,
  Image,
  Text,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import LocationCard from '../LocationCard';
import { sectionCenterStyles } from '../GlobalStyles';

const CountriesPage = () => {
  const { continentId } = useParams();

  const continent = data.continents.find(
    ({ id }) => Number(continentId) === id
  );

  if (!continent) {
    return <Box>No Continent Found</Box>;
  }

  return (
    <Box sx={sectionCenterStyles}>
      <Heading mb="2rem">
        Top countries in {continent.name} for your next holiday
      </Heading>

      <Box
        display={'grid'}
        gap="1rem"
        gridTemplateColumns={'repeat(auto-fill, minmax(13rem, 1fr))'}
      >
        {continent.countries.map(({ image, name, id }) => (
          <ChakraLink
            h="10rem"
            w="13rem"
            to={`/countries/${continentId}/${id}`}
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

export default CountriesPage;
