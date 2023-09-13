import React, { useState } from 'react';
import { useRestaurantContext } from '../context/RestaurantContextProvider';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ratings = Array.from({ length: 5 }, (_, i) => i + 1);
const RatingModal = ({ isOpen, onClose }) => {
  const { restaurantId } = useParams();
  const { user, addCommentDispatch } = useRestaurantContext();
  const [inputs, setInputs] = useState({
    comment: '',
    rating: '',
  });
  const toast = useToast();

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddComment = () => {
    const trimmedComment = inputs.comment.trim();

    if (!trimmedComment || !inputs.rating) {
      toast({
        title: 'Please fill the all inputs',
        position: 'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    addCommentDispatch(
      {
        rating: Number(inputs.rating),
        comment: trimmedComment,
        pp: user.pp,
        revName: user.revName,
      },
      Number(restaurantId)
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="red.500">
        <ModalHeader>Add your Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Select
              name="rating"
              value={inputs.rating}
              placeholder="Select Rating"
              onChange={handleChange}
            >
              {ratings.map(singleRating => (
                <option key={singleRating} value={singleRating}>
                  {singleRating}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Comment</FormLabel>
            <Textarea
              onChange={handleChange}
              name="comment"
              value={inputs.comment}
              placeholder="Comment"
              _placeholder={{ color: 'gray.300' }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleAddComment} mr={3}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RatingModal;
