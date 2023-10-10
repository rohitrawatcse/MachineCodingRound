import {
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useInventoryContext } from '../contexts/InventoryProvider';
import { Link } from 'react-router-dom';

const ProductsTable = () => {
  const { filteredProducts, filters, showFilteredProducts } =
    useInventoryContext();

  useEffect(() => {
    showFilteredProducts();
  }, [filters]);

  if (filteredProducts.length < 1) {
    return (
      <Text color="red">No products matched the combination of filters</Text>
    );
  }
  return (
    <TableContainer mt="2rem">
      <Table variant="simple">
        <Thead bg="#e7e7e7">
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Stock</Th>
            <Th>Supplier</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredProducts.map(
            ({
              id,
              imageUrl,
              name: productName,
              description,
              price,
              stock,
              supplier,
            }) => (
              <Tr key={id}>
                <Td>
                  <Image src={imageUrl} alt={productName} />
                </Td>
                <Td>
                  <ChakraLink as={Link} to={`/products/${id}`}>
                    {productName}
                  </ChakraLink>
                </Td>
                <Td>{description}</Td>
                <Td isNumeric>${price}</Td>
                <Td isNumeric>{stock}</Td>
                <Td>{supplier}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
