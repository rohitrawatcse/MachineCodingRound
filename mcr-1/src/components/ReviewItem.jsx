import { Avatar, Badge, Box, Icon, Spacer, Text } from '@chakra-ui/react';

import { FaRegStar } from 'react-icons/fa';

const ReviewItem = ({ reviewData }) => {
  const { rating, comment, pp, revName } = reviewData;

  return (
    <Box as="article" p="1rem" pl="0">
      <Box as="header" alignItems={'center'} display={'flex'} gap="0 1rem">
        <Avatar src={pp} name={revName} size="md" />

        <Text fontSize="1.15rem" fontWeight="semibold">
          {revName}
        </Text>

        <Spacer />

        <Badge
          borderRadius="md"
          p=".25rem .5rem"
          variant="solid"
          colorScheme="green"
          display={'flex'}
          alignItems={'center'}
          gap=".15rem"
        >
          <Text fontSize={'1.5rem'} color="yellow.300">
            {rating}
          </Text>
          <Icon fontSize={'.95rem'} color="yellow.300" as={FaRegStar} />
        </Badge>
      </Box>

      <Text my="1rem" letterSpacing={'widest'}>
        {comment}
      </Text>

      <hr />
    </Box>
  );
};

export default ReviewItem;
