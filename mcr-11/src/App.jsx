import React from 'react';
import { Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Route, Routes } from 'react-router-dom';
import { Home, SinglePostPage } from './Pages';
import Nav from './components/Navbar';
import Sidebar from './components/Sidebar';
import { sectionCenterStyle } from './styles';

const App = () => {
  return (
    <Box>
      <Nav />
      <Box as="div" display={'flex'} sx={sectionCenterStyle} gap="4rem">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<SinglePostPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
