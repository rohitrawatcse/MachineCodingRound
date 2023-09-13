import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

const LocationCard = ({ image, name }) => {
  return (
    <Box h="10rem" w="13rem" mb="2rem" pos="relative">
      <Box h="100%">
        <Image h="100%" src={image} alt={name} />
      </Box>

      <Text
        fontWeight="bold"
        color="#fff"
        pos="absolute"
        bottom={'1.5rem'}
        left={'1rem'}
      >
        {name}
      </Text>
    </Box>
  );
};

export default LocationCard;
