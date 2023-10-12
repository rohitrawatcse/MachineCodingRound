import { Route, Routes } from 'react-router-dom';
import { ErrorPage, HomePage, SearchPage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
