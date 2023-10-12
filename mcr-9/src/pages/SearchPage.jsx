import { useState } from 'react';
import { BookCard, Navbar } from '../components';
import { useAppContext } from '../AppContext/AppContext';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const { books } = useAppContext();
  const trimmedSearch = searchText.trim();
  const filteredList = books.filter(({ title }) =>
    title.toLowerCase().startsWith(trimmedSearch.toLowerCase())
  );

  return (
    <main>
      <Navbar />

      <h2 className='title'>
        <label htmlFor='search'>Search</label>
      </h2>
      <input
        type='search'
        placeholder='search books'
        value={searchText}
        id='search'
        onChange={(e) => setSearchText(e.target.value)}
        autoComplete='off'
        className='search-input'
      />

      <div className='section-center card-center'>
        {filteredList.length > 0 &&
          trimmedSearch &&
          filteredList.map((book) => (
            <BookCard key={book.id} bookData={book} />
          ))}
        {filteredList.length > 0 && !trimmedSearch && (
          <p className='text-center'>Type to search</p>
        )}
        {filteredList.length < 1 && (
          <p className='text-center'>
            No book title matched your search '{searchText}'
          </p>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
