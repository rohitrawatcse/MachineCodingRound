import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

const RSVPModal = ({ isOpen, onClose, isPaid, changeRSVPstatus }) => {
  const initialRef = useRef(null);

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize={'1.25rem'} mb=".5rem">
            Complete your RSVP
          </Heading>
          <Text fontSize={'1rem'} color="gray.500">
            Fill in your personal information
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input ref={initialRef} placeholder="Name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" />
          </FormControl>
        </ModalBody>

        <ModalFooter display={'flex'} flexDir="column" gap=".5rem">
          {isPaid && (
            <Text color="gray.500">
              * You have to make the payment at the venue
            </Text>
          )}
          <Button
            colorScheme="red"
            w="full"
            onClick={() => {
              changeRSVPstatus();
              onClose();
            }}
          >
            RSVP
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RSVPModal;
