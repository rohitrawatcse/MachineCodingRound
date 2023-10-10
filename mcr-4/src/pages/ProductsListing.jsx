import { Box } from '@chakra-ui/react';
import React from 'react';

import Filters from '../components/Filters';
import ProductsTable from '../components/ProductsTable';

const ProductsListing = () => {
  return (
    <Box as="main" py="1rem">
      <Filters />
      <ProductsTable />
    </Box>
  );
};

export default ProductsListing;
