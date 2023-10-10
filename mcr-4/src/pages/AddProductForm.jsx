import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useInventoryContext } from '../contexts/InventoryProvider';
import { getUniqueDepartments } from '../utils';

const AddProductForm = () => {
  const { allProducts, addProduct } = useInventoryContext();

  const departmentsList = getUniqueDepartments(allProducts);

  const initialState = {
    department: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    sku: '',
    supplier: '',
    delivered: 0,
    imageUrl: 'https://',
  };

  const [inputs, setInputs] = useState(initialState);

  const handleChange = ({ target: { name: targetName, value } }) => {
    if (typeof value === 'number') {
      value = value < 0 ? 0 : value;
    }
    setInputs(prevInputs => ({ ...prevInputs, [targetName]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addProduct({ id: new Date().getTime(), ...inputs });
    setInputs(initialState);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading as="h2" fontSize="1.5rem">
        Add New Product
      </Heading>

      <Select
        name="department"
        value={inputs.department}
        onChange={handleChange}
      >
        {departmentsList.map((singleDepartment, index) => (
          <option key={index} value={singleDepartment}>
            {singleDepartment}
          </option>
        ))}
      </Select>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={inputs.name}
          name="name"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={inputs.description}
          name="description"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          onChange={handleChange}
          value={inputs.price}
          name="price"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Stock</FormLabel>
        <Input
          type="number"
          onChange={handleChange}
          value={inputs.stock}
          name="stock"
        />
      </FormControl>
      <FormControl>
        <FormLabel>SKU</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={inputs.sku}
          name="sku"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Supplier</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={inputs.supplier}
          name="supplier"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          type="url"
          onChange={handleChange}
          value={inputs.imageUrl}
          name="imageUrl"
        />
      </FormControl>

      <Button mt="1rem" type="submit">
        Add
      </Button>
    </Box>
  );
};

export default AddProductForm;
