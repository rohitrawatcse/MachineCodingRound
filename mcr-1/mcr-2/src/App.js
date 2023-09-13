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
import { Logo } from './Logo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CountriesPage from './pages/CountriesPage';
import DestinationsPage from './pages/DestinationsPage';
import SingleDestinationPage from './pages/SingleDestinationPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/continents/:continentId" element={<CountriesPage />} />
          <Route
            path="/countries/:continentId/:countryId"
            element={<DestinationsPage />}
          />

          <Route
            path="/destinations/:continentId/:countryId/:destinationId"
            element={<SingleDestinationPage />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
