import { Box } from '@chakra-ui/react';
import React from 'react';
import { useInventoryContext } from '../contexts/InventoryProvider';
import { getUniqueDepartments } from '../utils';
import { cardStyle } from '../constants';
import { Link } from 'react-router-dom';

const Departments = () => {
  const { allProducts, updateFilter } = useInventoryContext();

  const departmentsList = getUniqueDepartments(allProducts);

  // update category filter
  const handleCardClick = departmentClicked => {
    updateFilter({
      target: { name: 'selectDepartment', value: departmentClicked },
    });
  };

  return (
    <Box
      as="main"
      mt="2rem"
      display={'flex'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={'2rem'}
      px="2rem"
    >
      {departmentsList.map((singleDepartment, index) => (
        <Link to="/products" key={index}>
          <Box
            fontWeight={'bold'}
            {...cardStyle}
            onClick={() => handleCardClick(singleDepartment)}
          >
            {singleDepartment}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Departments;
