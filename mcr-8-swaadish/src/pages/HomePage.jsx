import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRecipeContext } from '../RecipeContext';
import { RecipeCard } from '../components';
import { useState } from 'react';
import { sectionCenterStyles } from '../GlobalStyles';
import AddRecipeModal from '../components/AddRecipeModal';

const lowerizedAndIncludes = (text, textSearch) => {
  return text.toLowerCase().includes(textSearch.toLowerCase());
};

const HomePage = () => {
  const { recipeList } = useRecipeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchText, setSearchText] = useState('');
  const [activeRadio, setActiveRadio] = useState('');
  const trimmedSearch = searchText.trim();

  const addRecipeBtnJSX = (
    <>
      <Button onClick={onOpen}>Add Recipe</Button>
      {isOpen && <AddRecipeModal isAdding onClose={onClose} isOpen={isOpen} />}
    </>
  );

  if (recipeList.length < 1) {
    return (
      <Box as={'main'} sx={sectionCenterStyles} py='2rem'>
        <Text>No recipe found</Text>
        {addRecipeBtnJSX}
      </Box>
    );
  }

  let displayableRecipes = recipeList;

  if (activeRadio) {
    displayableRecipes = recipeList.filter((singleRecipe) => {
      if (typeof singleRecipe[activeRadio] === 'string') {
        return lowerizedAndIncludes(singleRecipe[activeRadio], trimmedSearch);
      }

      if (Array.isArray(singleRecipe[activeRadio])) {
        return lowerizedAndIncludes(
          singleRecipe[activeRadio].join(' '),
          trimmedSearch
        );
      }
    });
  }

  return (
    <Box as={'main'} sx={sectionCenterStyles} py='2rem'>
      <Box as='div' mt='2rem'>
        <Input
          type='search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          isDisabled={!activeRadio}
          mb='1rem'
        />
        <RadioGroup
          onChange={(value) => setActiveRadio(value)}
          value={activeRadio}
        >
          <HStack spacing='24px' textTransform={'capitalize'}>
            <Box fontWeight={'bold'}>Filters:</Box>

            <Radio value='name'>name</Radio>
            <Radio value='ingredients'>ingredients</Radio>
            <Radio value='cuisine'>cuisine</Radio>
          </HStack>
        </RadioGroup>
      </Box>

      <Box
        my='2rem'
        as='section'
        display={'grid'}
        gridTemplateColumns={'repeat(auto-fill, minmax(20rem, 1fr))'}
        justifyItems={'center'}
      >
        {displayableRecipes.length > 0 ? (
          displayableRecipes.map((singleRecipe) => (
            <RecipeCard key={singleRecipe.id} recipeData={singleRecipe} />
          ))
        ) : (
          <Text>No recipe found</Text>
        )}
      </Box>

      {addRecipeBtnJSX}
    </Box>
  );
};

export default HomePage;
