import React from 'react';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SingleRestaurantPage from './pages/SingleRestaurantPage';
import Navbar from './components/Navbar';

// <ColorModeSwitcher justifySelf="flex-end" />
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/restaurant/:restaurantId"
          element={<SingleRestaurantPage />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
