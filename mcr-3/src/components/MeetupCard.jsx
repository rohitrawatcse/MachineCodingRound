import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { getDateAndTime } from '../utils';
import { Link } from 'react-router-dom';

const MeetupCard = ({ meetupDetail }) => {
  const { id, eventType, eventThumbnail, eventStartTime, title } = meetupDetail;
  return (
    <Card
      as={Link}
      to={`/event/${id}`}
      _hover={{
        textDecoration: 'none',
        boxShadow: 'lg',
        transition: 'all .3s linear',
      }}
    >
      <CardBody p="0" pos="relative">
        <Box overflow={'hidden'} h="10rem" as="div">
          <Image filter={'blur(1px)'} src={eventThumbnail} alt={title} />
          <Badge
            borderRadius={'md'}
            p=".5rem"
            pos="absolute"
            top="1rem"
            left="1rem"
          >
            {eventType}
          </Badge>
        </Box>
      </CardBody>

      <CardFooter p=".5rem" display={'flex'} flexDir={'column'} gap=".5rem">
        <Text>{getDateAndTime(eventStartTime)}</Text>
        <Heading display={'block'} as="h4" fontSize={'1.1rem'}>
          {title}
        </Heading>
      </CardFooter>
    </Card>
  );
};

export default MeetupCard;
