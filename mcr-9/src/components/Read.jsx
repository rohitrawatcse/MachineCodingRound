import { useAppContext } from '../AppContext/AppContext';
import { filterByCategory } from '../utils';
import BookCard from './BookCard';

const Read = () => {
  const { books } = useAppContext();

  const readBooks = filterByCategory(books, 'read');
  return (
    <section>
      <h3>Read</h3>

      <div className='card-center'>
        {readBooks.length > 0 ? (
          readBooks.map((book) => <BookCard key={book.id} bookData={book} />)
        ) : (
          <p>No books under this section</p>
        )}
      </div>
    </section>
  );
};

export default Read;
