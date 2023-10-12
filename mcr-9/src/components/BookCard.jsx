/* eslint-disable react/prop-types */
import { useAppContext } from '../AppContext/AppContext';

const BookCard = ({ bookData }) => {
  const { id, img, title, author, category } = bookData;
  const { changeCategory } = useAppContext();

  // console.log({ title, category });
  return (
    <article className='book-article'>
      <div className='img-container'>
        <img src={img} alt={title} />
      </div>

      <div className='book-content'>
        <p>{title}</p>
        <small>{author}</small>

        <div>
          <label htmlFor='category'>
            Status:
            <select
              name='category'
              id='category'
              value={category}
              onChange={(e) =>
                changeCategory({ bookId: id, selectedCategory: e.target.value })
              }
            >
              <option value='' disabled>
                Move to
              </option>
              <option value='currently reading'>Currently Reading</option>
              <option value='read'>Read</option>
              <option value='want to read'>Want To Read</option>
              <option value='none'>None</option>
            </select>
          </label>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
