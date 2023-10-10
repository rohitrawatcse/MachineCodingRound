import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import ProductsListing from './pages/ProductsListing';
import AddProductForm from './pages/AddProductForm';
import SingleProductPage from './pages/SingleProductPage';
import Sidebar from './components/Sidebar';
import InventoryProvider from './contexts/InventoryProvider';

function App() {
  return (
    <InventoryProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Box as="main" display={'flex'} gap="1rem">
            <Sidebar />
            <Box ml="12rem"></Box>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/add-product" element={<AddProductForm />} />
              <Route path="/products" element={<ProductsListing />} />
              <Route
                path="/products/:productId"
                element={<SingleProductPage />}
              />
            </Routes>
          </Box>
        </BrowserRouter>
      </ChakraProvider>
    </InventoryProvider>
  );
}

export default App;
