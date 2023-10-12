import React, { useEffect, useState } from 'react';
import '../styles.css';
import ChessBoard from './components/ChessBoard';
import Navbar from './components/Navbar';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleMode = () => {
    if (theme === 'light') {
      setTheme('dark');
      return;
    }
    setTheme('light');
  };

  return (
    <main>
      <Navbar theme={theme} toggleMode={toggleMode} />
      <ChessBoard />
    </main>
  );
};

export default App;
