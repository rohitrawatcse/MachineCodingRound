import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useRecipeContext } from '../RecipeContext';
import { sectionCenterStyles } from '../GlobalStyles';

const SingleRecipePage = () => {
  const { recipeId } = useParams();
  const { recipeList } = useRecipeContext();

  const recipe = recipeList.find(({ id }) => id === recipeId);
  if (!recipe) {
    return (
      <Box as='main'>
        <Text>No Recipe found</Text>
      </Box>
    );
  }
  const { image, name, cuisine, ingredients, instructions } = recipe;
  return (
    <Box as='main' sx={sectionCenterStyles} py='2rem'>
      <Card
        display={'grid'}
        gridTemplateColumns={{ base: '1fr', lg: '400px 1fr' }}
        alignItems={{ lg: 'center' }}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%' }}
          src={image}
          alt={name}
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{name}</Heading>
            <Text mt='1rem' fontWeight={'semibold'}>
              Cuisine Type: {cuisine}
            </Text>
            <UnorderedList my='1rem'>
              <Text fontWeight={'semibold'}>Ingredients</Text>
              {ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              <Text fontWeight={'semibold'}>Instructions</Text>
              {instructions.map((instruction, index) => (
                <ListItem key={index}>{instruction}</ListItem>
              ))}
            </UnorderedList>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default SingleRecipePage;
