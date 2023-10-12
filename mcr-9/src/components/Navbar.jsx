import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='nav'>
      <h2>BooksWala</h2>

      {location.pathname !== '/search' && (
        <NavLink to='/search'>Go to search page</NavLink>
      )}

      {location.pathname === '/search' && (
        <button onClick={() => navigate(-1)}>Go back</button>
      )}
    </nav>
  );
};

export default Navbar;
