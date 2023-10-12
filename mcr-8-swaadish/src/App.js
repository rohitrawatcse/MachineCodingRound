import { Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SingleRecipePage from './pages/SingleRecipePage';
import ErrorPage from './pages/ErrorPage';
import { Navbar } from './components';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipe/:recipeId' element={<SingleRecipePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
