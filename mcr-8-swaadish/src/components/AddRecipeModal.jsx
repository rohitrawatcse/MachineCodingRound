import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecipeContext } from '../RecipeContext';
import { v4 as uuid } from 'uuid';

const AddRecipeModal = ({ isAdding, isOpen, onClose, isEditingAndData }) => {
  const { addRecipeDispatch, editRecipeDispatch } = useRecipeContext();
  const [inputs, setInputs] = useState(
    isEditingAndData
      ? {
          ...isEditingAndData,
          ingredients: isEditingAndData.ingredients.join(', '),
          instructions: isEditingAndData.instructions.join(', '),
        }
      : {
          name: '',
          image: 'https://picsum.photos/200/300',
          ingredients: '',
          instructions: '',
          cuisine: '',
        }
  );

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isAdding && 'add'}
          {isEditingAndData && 'update'} recipe
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name={'name'}
              onChange={handleChange}
              value={inputs.name}
              placeholder='Name'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Image</FormLabel>
            <Input
              name={'image'}
              onChange={handleChange}
              value={inputs.image}
              placeholder='Image'
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>cuisine</FormLabel>
            <Input
              name={'cuisine'}
              onChange={handleChange}
              value={inputs.cuisine}
              placeholder='cuisine'
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>ingredients</FormLabel>
            <Textarea
              name={'ingredients'}
              onChange={handleChange}
              value={inputs.ingredients}
              placeholder='ingredients'
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>instructions</FormLabel>
            <Textarea
              name={'instructions'}
              onChange={handleChange}
              value={inputs.instructions}
              placeholder='instructions'
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              isAdding &&
                addRecipeDispatch({
                  recipe: {
                    id: uuid(),
                    ...inputs,
                    ingredients: inputs.ingredients.split(','),
                    instructions: inputs.ingredients.split(','),
                  },
                });

              isEditingAndData &&
                editRecipeDispatch({
                  recipe: {
                    ...inputs,
                    ingredients: inputs.ingredients.split(','),
                    instructions: inputs.ingredients.split(','),
                  },
                });

              onClose();
            }}
          >
            {isAdding && 'add'}
            {isEditingAndData && 'update'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRecipeModal;
