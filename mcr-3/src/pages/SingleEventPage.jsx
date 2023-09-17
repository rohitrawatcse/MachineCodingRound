import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { sectionCenterStyles } from '../GlobalStyles';
import { useParams } from 'react-router-dom';
import { meetupsData } from '../events-data';
import { findById, getDateAndTime } from '../utils';
import RSVPModal from '../components/RESVPModal';

const SingleEventPage = () => {
  const { eventId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isRSVPed, setIsRSVPed] = useState(false);

  const eventToDisplay = meetupsData.meetups.find(findById(eventId));

  if (!eventToDisplay) {
    <Box as="main" p="2rem" sx={sectionCenterStyles}>
      <Text color="red.500" fontSize="1.1rem">
        Event Not found
      </Text>
    </Box>;
  }

  const {
    title,
    eventStartTime,
    eventEndTime,
    location,
    address,
    eventThumbnail,
    eventDescription,
    isPaid,
    speakers,
    eventTags,
    eventType,
    hostedBy,
    additionalInformation,
    price,
  } = eventToDisplay;

  return (
    <Box
      as="main"
      p="2rem"
      sx={sectionCenterStyles}
      display={'grid'}
      gridTemplateColumns={{ md: '1fr 1fr' }}
      gap="2rem"
    >
      <Box>
        <Heading as="h2">{title}</Heading>

        <Box my="1rem">
          <Text>Hosted By: </Text>
          <Text>{hostedBy}</Text>
        </Box>

        <Image my="1rem" h="15rem" src={eventThumbnail} alt={title} />

        <Box my="1rem">
          <Heading my="1rem" as="h3" fontSize="1.1rem">
            Details:
          </Heading>

          <Text mt="1rem">{eventDescription}</Text>
        </Box>

        <Box my="1rem">
          <Box my="1rem">
            <Heading my="1rem" as="h3" fontSize="1.1rem">
              Additional Information:
            </Heading>

            <Text mt="1rem">
              {Object.keys(additionalInformation).map((key, index) => (
                <Text key={index} display={'flex'} gap=".25rem">
                  {' '}
                  <Text textTransform={'capitalize'} fontWeight="semibold">
                    {key}:{' '}
                  </Text>
                  {additionalInformation[key]}
                </Text>
              ))}
            </Text>
          </Box>
        </Box>

        <Box>
          <Heading my="1rem" as="h3" fontSize="1.1rem">
            Event Tags:
          </Heading>

          <Box as="div" display={'flex'} gap="1rem">
            {eventTags.map((singleTag, index) => (
              <Badge
                p="1rem"
                borderRadius={'md'}
                key={index}
                variant="solid"
                colorScheme="red"
                textTransform={'lowercase'}
                letterSpacing={'wider'}
              >
                {singleTag}
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>

      <Box as="section">
        <Box borderRadius={'md'} background={'gray.200'} p="2rem" pb="0">
          <Text mb="2rem">
            {getDateAndTime(eventStartTime)} to {getDateAndTime(eventEndTime)}
          </Text>

          <Text mb="2rem">{address}</Text>

          {isPaid && <Text mb="2rem">${price}</Text>}
        </Box>

        <Box>
          <Heading my="1rem" as="h3" fontSize="1.1rem">
            Speakers:
          </Heading>

          <Box as="div" display={'flex'} gap="1rem">
            {speakers.map(({ image, name, designation }, index) => (
              <Card
                p="1rem"
                borderRadius={'md'}
                key={index}
                letterSpacing={'wider'}
              >
                <CardBody
                  display="flex"
                  flexDir="column"
                  alignContent={'center'}
                  textAlign={'center'}
                  gap=".5rem"
                >
                  <Avatar src={image} name={name} m="auto" />

                  <Text fontWeight={'bold'}>{name}</Text>
                  <Text>{designation}</Text>
                </CardBody>
              </Card>
            ))}
          </Box>

          {isOpen && !isRSVPed && (
            <RSVPModal
              isOpen={isOpen}
              onClose={onClose}
              isPaid={isPaid}
              changeRSVPstatus={() => setIsRSVPed(true)}
            />
          )}

          {new Date(eventStartTime).getTime() >= new Date().getTime() && (
            <Center>
              <Button display mt="2rem" onClick={onOpen} colorScheme="red">
                {isRSVPed ? 'Already' : ''} RSVP
              </Button>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleEventPage;
