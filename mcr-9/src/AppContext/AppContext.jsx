/* eslint-disable react/prop-types */
import { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { books } from '../constants';

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

const initialState = {
  books: books,
};

const shelfReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_CATEGORY': {
      const { bookId, selectedCategory } = action.payload;
      const { books } = state;

      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, category: selectedCategory };
        } else {
          return book;
        }
      });

      return {
        ...state,
        books: updatedBooks,
      };
    }

    default:
      throw new Error(`Error: ${action.type} does not exist`);
  }
};

const AppContextProvider = ({ children }) => {
  const [{ books }, dispatch] = useReducer(shelfReducer, initialState);

  const changeCategory = ({ bookId, selectedCategory }) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: {
        bookId,
        selectedCategory,
      },
    });
  };
  return (
    <AppContext.Provider value={{ books, changeCategory }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
