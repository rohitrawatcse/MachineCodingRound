import { useAppContext } from '../AppContext/AppContext';
import { filterByCategory } from '../utils';
import BookCard from './BookCard';

const CurrentlyReading = () => {
  const { books } = useAppContext();

  const currentReadingBooks = filterByCategory(books, 'currently reading');
  return (
    <section>
      <h3>Currently Reading</h3>

      <div className='card-center'>
        {currentReadingBooks.length > 0 ? (
          currentReadingBooks.map((book) => (
            <BookCard key={book.id} bookData={book} />
          ))
        ) : (
          <p>No books under this section</p>
        )}
      </div>
    </section>
  );
};

export default CurrentlyReading;
