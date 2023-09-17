import { Box, Heading, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { sectionCenterStyles } from '../GlobalStyles';
import { meetupsData } from '../events-data';
import MeetupCard from '../components/MeetupCard';
import { filterByType } from '../utils';

const Home = ({ events }) => {
  const eventTypes = [
    ...new Set(meetupsData.meetups.map(({ eventType }) => eventType)),
    'Both',
  ];

  const [activeEventType, setActiveEventType] = useState('Both');

  let selectedEventsOnType = events;
  if (activeEventType !== 'Both') {
    selectedEventsOnType = events.filter(filterByType(activeEventType));
  }

  const handleSelect = e => {
    setActiveEventType(e.target.value);
  };

  return (
    <Box as="main" sx={sectionCenterStyles} py="2rem">
      <Box as="header" display={'flex'} justifyContent={'space-between'}>
        <Heading as="h3">Meetup Events</Heading>
        <Select w="10rem" defaultValue={'Both'} onChange={handleSelect}>
          {eventTypes.map((singleType, index) => (
            <option key={index} value={singleType}>
              {singleType}
            </option>
          ))}
        </Select>
      </Box>

      {/* events container */}
      <Box
        as="div"
        mt="2rem"
        display={'grid'}
        gridTemplateColumns={'repeat(auto-fill, minmax(18rem, 1fr))'}
        gap="1rem 2rem"
      >
        {selectedEventsOnType.length > 1 ? (
          selectedEventsOnType.map(singleEvent => (
            <MeetupCard key={singleEvent.id} meetupDetail={singleEvent} />
          ))
        ) : (
          <Text color="red.500" mt="2rem" letterSpacing={'wider'}>
            No meetup event found
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Home;
