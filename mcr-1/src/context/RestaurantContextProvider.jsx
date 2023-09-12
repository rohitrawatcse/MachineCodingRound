import { createContext, useContext, useReducer } from 'react';
import { restaurantsData } from '../restaurantData';

const RestaurantContext = createContext(null);

export const useRestaurantContext = () => useContext(RestaurantContext);

const initialState = {
  user: {
    pp: 'https://res.cloudinary.com/dtbd1y4en/image/upload/v1688807726/Gutargu-social/jtrne58odyav32oa4txk.png',
    revName: 'Jethalal Patro',
  },
  restaurants: restaurantsData,
};

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW': {
      // console.log(action.payload, action.payloadRestaurantId);
      return {
        ...state,
        restaurants: state.restaurants.map(singleRestaurant => {
          if (singleRestaurant.id === action.payloadRestaurantId) {
            return {
              ...singleRestaurant,
              ratings: [...singleRestaurant.ratings, action.payload],
              averageRating: (
                (singleRestaurant.averageRating + action.payload.rating) /
                (singleRestaurant.ratings.length + 1)
              ).toFixed(2),
            };
          } else {
            return singleRestaurant;
          }
        }),
      };
    }

    default:
      throw new Error(`Error: ${action.type} does not exist`);
  }
};

const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  const addCommentDispatch = (commentData, restaurantId) => {
    dispatch({
      type: 'ADD_REVIEW',
      payloadRestaurantId: restaurantId,
      payload: commentData,
    });
  };

  return (
    <RestaurantContext.Provider value={{ ...state, addCommentDispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
