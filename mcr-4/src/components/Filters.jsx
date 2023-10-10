import React from 'react';
import { getUniqueDepartments } from '../utils';
import { useInventoryContext } from '../contexts/InventoryProvider';
import { Box, Checkbox, Heading, Select } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Filters = () => {
  const {
    allProducts,
    filters: {
      selectDepartment: selectedDepartment,
      showStockItems,
      selectedCategory,
    },
    updateFilter,
  } = useInventoryContext();

  const departmentsList = getUniqueDepartments(allProducts);
  const sortCategories = ['name', 'price', 'stock'];
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      gap="1rem"
      w="calc(100vw - 28rem)"
    >
      <Heading as="h2" fontSize={'1.5rem'}>
        Products
      </Heading>

      <Select
        name="selectDepartment"
        value={selectedDepartment}
        onChange={updateFilter}
      >
        <option value="all">All Departments</option>
        {departmentsList.map((singleDepartment, index) => (
          <option key={index} value={singleDepartment}>
            {singleDepartment}
          </option>
        ))}
      </Select>

      <Box w="fit-content">
        <Checkbox
          name="showStockItems"
          isChecked={showStockItems}
          size="md"
          colorScheme="blue"
          onChange={updateFilter}
        >
          Low Stock Items
        </Checkbox>
      </Box>

      <Select
        name="selectCategory"
        value={selectedCategory}
        onChange={updateFilter}
        textTransform="capitalize"
      >
        {sortCategories.map((sortCategory, index) => (
          <option key={index} value={sortCategory}>
            {sortCategory}
          </option>
        ))}
      </Select>

      <Link to="/add-product">New</Link>
    </Box>
  );
};

export default Filters;
