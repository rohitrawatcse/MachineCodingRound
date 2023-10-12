import { BsSun } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';

const Navbar = ({ theme, toggleMode }) => {
  return (
    <nav>
      <div className='nav-center section-center'>
        <h2>CHESS</h2>
        <button className='toggle-btn' onClick={toggleMode}>
          {theme === 'light' ? <CiDark /> : <BsSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
