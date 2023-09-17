import React, { useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/Home';
import SingleEventPage from './pages/SingleEventPage';
import ErrorPage from './pages/ErrorPage';
import { meetupsData } from './events-data';
import { lowerizeAndIncludes } from './utils';
import Navbar from './components/Navbar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const trimmedSearch = searchQuery.trim();
  let events = meetupsData.meetups;

  if (searchQuery) {
    events = meetupsData.meetups.filter(
      ({ title, eventTags }) =>
        lowerizeAndIncludes(title, trimmedSearch) ||
        lowerizeAndIncludes(eventTags.join(' '), trimmedSearch)
    );
  }

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar searchQuery={searchQuery} handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/event/:eventId" element={<SingleEventPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
