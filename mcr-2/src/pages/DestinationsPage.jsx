import React from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data';
import { sectionCenterStyles } from '../GlobalStyles';
import {
  Box,
  Image,
  Text,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import LocationCard from '../LocationCard';

const DestinationsPage = () => {
  const { continentId, countryId } = useParams();

  const continent = data.continents.find(
    ({ id }) => Number(continentId) === id
  );

  if (!continent) {
    return <Box>No Continent Found</Box>;
  }

  const country = continent.countries.find(
    ({ id }) => Number(countryId) === id
  );

  if (!country) {
    return <Box>No Country Found</Box>;
  }

  return (
    <Box sx={sectionCenterStyles}>
      <Heading mb="2rem">
        Top destinations in {country.name} for your next holiday
      </Heading>

      <Box
        display={'grid'}
        gap="1rem"
        gridTemplateColumns={'repeat(auto-fill, minmax(13rem, 1fr))'}
      >
        {country.destinations.map(({ image, name, id }) => (
          <ChakraLink
            h="10rem"
            w="13rem"
            to={`/destinations/${continentId}/${countryId}/${id}`}
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

export default DestinationsPage;
