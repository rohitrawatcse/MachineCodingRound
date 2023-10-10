import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useInventoryContext } from '../contexts/InventoryProvider';

const SingleProductPage = () => {
  const { productId } = useParams();
  const { allProducts } = useInventoryContext();

  const productToDisplay = allProducts.find(
    single => single.id === Number(productId)
  );

  if (!productToDisplay) {
    return <Text color="red.500">No Product Found</Text>;
  }

  const {
    imageUrl,
    name: productName,
    description,
    price,
    stock,
    supplier,
    department,
    sku,
    delivered,
  } = productToDisplay;

  return (
    <Box as="main" p="2rem">
      <Box h={'20rem'} mb="2rem">
        <Image w="full" h="full" src={imageUrl} alt={productName} />
      </Box>

      <Text mb=".75rem">Price: ${price}</Text>
      <Text mb=".75rem">Stock: {stock}</Text>
      <Text mb=".75rem">Supplier: {supplier}</Text>
      <Text mb=".75rem">Department: {department}</Text>
      <Text mb=".75rem">Sku: {sku}</Text>
      <Text mb=".75rem">Delivered: {delivered}</Text>
      <Text mb=".75rem">Description: {description}</Text>
    </Box>
  );
};

export default SingleProductPage;
