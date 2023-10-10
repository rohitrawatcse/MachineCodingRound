import { Box } from '@chakra-ui/react';
import React from 'react';
import { useInventoryContext } from '../contexts/InventoryProvider';
import { getTotalStockInfo } from '../utils';
import { cardStyle } from '../constants';

const Dashboard = () => {
  const { allProducts } = useInventoryContext();
  const { totalStocks, deliveredStocks, lowStockItems } =
    getTotalStockInfo(allProducts);

  const cardsList = [
    { id: 1, color: 'green.500', data: totalStocks, text: 'Total Stock' },
    {
      id: 2,
      color: 'orange.500',
      data: deliveredStocks,
      text: 'Total Delivered',
    },
    { id: 3, color: 'red.500', data: lowStockItems, text: ' Low Stock Items' },
  ];
  return (
    <Box
      mt="2rem"
      display={'flex'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={'2rem'}
      px="2rem"
    >
      {cardsList.map(singleCard => (
        <Box {...cardStyle}>
          <Box as="div" color={singleCard.color}>
            {singleCard.data}
          </Box>
          {singleCard.text}{' '}
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;
