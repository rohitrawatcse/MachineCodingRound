import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { cuisineData } from '../restaurantData';
import { sectionCenterStyles } from '../GlobalStyles';
import MenuCard from '../components/MenuCard';
import { useRestaurantContext } from '../context/RestaurantContextProvider';

const HomePage = () => {
  const [activeCuisineId, setActiveCuisineId] = useState(0);
  const { restaurants } = useRestaurantContext();

  const selectedRestaurants = restaurants.filter(
    ({ cuisine_id }) => cuisine_id === activeCuisineId
  );

  const selectCuisineJSX = (
    <Box
      as="div"
      sx={sectionCenterStyles}
      display={'grid'}
      placeItems={'center'}
    >
      <Text
        fontSize={'1.25rem'}
        mb=".5rem"
        fontWeight={'bold'}
        letterSpacing={'wide'}
      >
        Select your cuisine:
      </Text>

      <Box mb="2rem" as="div" display={'flex'} gap="0 1rem">
        {cuisineData.map(({ id: cuisineId, name }) => (
          <Button
            colorScheme="red"
            key={cuisineId}
            color="#fff"
            bg={activeCuisineId === cuisineId ? 'red.800' : 'red.500'}
            onClick={() => setActiveCuisineId(cuisineId)}
          >
            {name}
          </Button>
        ))}
      </Box>
    </Box>
  );

  if (activeCuisineId === 0) {
    return (
      <Box as="main" py="2rem">
        {selectCuisineJSX}
      </Box>
    );
  }

  return (
    <Box as="main" py="2rem">
      {selectCuisineJSX}

      <Container sx={sectionCenterStyles}>
        {/* array mapping */}
        {selectedRestaurants.map(singleRestaurant => (
          <Box as="section" id={singleRestaurant.id} mb="4rem">
            <Heading as="h3" fontSize={'1.5rem'} mb="2rem">
              Dishes by{' '}
              <ChakraLink as={Link} to={`/restaurant/${singleRestaurant.id}`}>
                {singleRestaurant.name}
              </ChakraLink>
            </Heading>

            {/* array mapping */}
            <Box
              as="div"
              display={'grid'}
              gridTemplateColumns={'repeat(auto-fill, minmax(17rem, 1fr))'}
              gap={'1.5rem'}
            >
              {singleRestaurant.menu.map(singleMenu => (
                <MenuCard
                  key={singleMenu.id}
                  menuData={singleMenu}
                  restaurantInfo={{
                    id: singleRestaurant.id,
                    name: singleRestaurant.name,
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default HomePage;
