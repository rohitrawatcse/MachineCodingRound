import { CurrentlyReading, Navbar, Read, WantToRead } from '../components';

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <div className='section-center'>
        <h2 className='title'>Shelves</h2>

        <CurrentlyReading />
        <Read />
        <WantToRead />
      </div>
    </main>
  );
};

export default HomePage;
