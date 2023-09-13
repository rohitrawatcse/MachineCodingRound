import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { sectionCenterStyles } from '../GlobalStyles';
import { data } from '../data';

const SingleDestinationPage = () => {
  const { continentId, countryId, destinationId } = useParams();

  const continent = data.continents.find(
    ({ id }) => Number(continentId) === id
  );

  const country = continent?.countries?.find(
    ({ id }) => Number(countryId) === id
  );

  const destination = country?.destinations?.find(
    ({ id }) => Number(destinationId) === id
  );

  if (!continent || !country || !destination) {
    return <Box>Location not Found</Box>;
  }

  const {
    id,
    name,
    description,
    image,
    ratings,
    reviews,
    ticketPrice,
    location,
    openingHours,
  } = destination;

  return (
    <Box sx={sectionCenterStyles}>
      <Heading textAlign={'center'} mb="2rem">
        {name}
      </Heading>
      <Box
        display={'grid'}
        gridTemplateColumns={'300px 1fr'}
        h="100dvh"
        gap="2rem"
      >
        <Box>
          <Image src={image} alt={name} />
        </Box>

        <Box display={'flex'} flexDir={'column'} gap={'1rem'}>
          <Text>
            <Text color="blue.500" as="span">
              Description:
            </Text>{' '}
            {description}
          </Text>
          <Text>
            <Text color="blue.500" as="span">
              Reviews:
            </Text>{' '}
            {reviews}
          </Text>
          <Text>
            <Text color="blue.500" as="span">
              Rating:
            </Text>{' '}
            {ratings}
          </Text>
          <Text>
            <Text color="blue.500" as="span">
              Ticket Price:
            </Text>{' '}
            {ticketPrice}
          </Text>
          <Text>
            <Text color="blue.500" as="span">
              Location:
            </Text>{' '}
            {location}
          </Text>
          <Text>
            <Text color="blue.500" as="span">
              Opening Hours:
            </Text>{' '}
            {openingHours}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleDestinationPage;
