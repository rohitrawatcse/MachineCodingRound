import { useAppContext } from '../AppContext/AppContext';
import { filterByCategory } from '../utils';
import BookCard from './BookCard';

const WantToRead = () => {
  const { books } = useAppContext();

  const wantToReadBooks = filterByCategory(books, 'want to read');
  return (
    <section>
      <h3>Want To Read</h3>

      <div className='card-center'>
        {wantToReadBooks.length > 0 ? (
          wantToReadBooks.map((book) => (
            <BookCard key={book.id} bookData={book} />
          ))
        ) : (
          <p>No books under this section</p>
        )}
      </div>
    </section>
  );
};

export default WantToRead;
