import { useParams } from 'react-router-dom';
import { useRestaurantContext } from '../context/RestaurantContextProvider';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { sectionCenterStyles } from '../GlobalStyles';
import ReviewItem from '../components/ReviewItem';
import RatingModal from '../components/RatingModal';

const SingleRestaurantPage = () => {
  const { restaurantId } = useParams();
  const { restaurants } = useRestaurantContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const mainRestaurant = restaurants.find(
    ({ id }) => id === Number(restaurantId)
  );

  if (!mainRestaurant) {
    return (
      <Box as="main" p="2rem" sx={sectionCenterStyles}>
        <Text
          color="red.400"
          textAlign={'center'}
          letterSpacing={'wider'}
          fontWeight={'bold'}
          fontSize={'1.5rem'}
        >
          No restaurant found
        </Text>
      </Box>
    );
  }

  const {
    name,
    cuisine_id,
    menu,
    address,
    phone,
    ratings,
    averageRating,
    description,
  } = mainRestaurant;

  const menuNameStr = menu.map(({ name }) => name).join(', ');

  const pageHeaderJSX = (
    <>
      {isOpen && <RatingModal isOpen={isOpen} onClose={onClose} />}

      <Box display={'flex'} justifyContent={'space-between'} mb="1rem">
        <Heading text as="h2" fontSize="1.5rem">
          {name}
        </Heading>

        <Button colorScheme="red" onClick={onOpen}>
          Add Review
        </Button>
      </Box>

      <Text color="gray.500" letterSpacing={'wider'} mb=".5rem">
        {menuNameStr}
      </Text>

      <Text color="gray.500" letterSpacing={'wider'} mb=".5rem">
        {address}
      </Text>

      <Text color="gray.500" letterSpacing={'wider'} mb=".75rem">
        Average Rating: {averageRating}
      </Text>
    </>
  );

  return (
    <Box as="main" sx={sectionCenterStyles} p="2rem">
      {pageHeaderJSX}

      <hr />

      <Heading
        pt="2rem"
        pb=".5rem"
        as="h3"
        fontSize={'1.25rem'}
        letterSpacing={'wider'}
      >
        Reviews
      </Heading>

      <Box p="0" m="0" display={'flex'} flexDir="column" gap=".25rem 0">
        {ratings.map((singleReview, index) => (
          <ReviewItem key={index} reviewData={singleReview} />
        ))}
      </Box>
    </Box>
  );
};

export default SingleRestaurantPage;
