import React, { createContext, useContext, useReducer } from 'react';
import { inventoryData } from '../inventoryData';
import { minStocksRequired } from '../constants';
const InventoryContext = createContext(null);

export const useInventoryContext = () => useContext(InventoryContext);

const initialState = {
  allProducts: JSON.parse(localStorage.getItem('inventory')) ?? inventoryData,
  filteredProducts:
    JSON.parse(localStorage.getItem('inventory')) ?? inventoryData,
  filters: {
    selectDepartment: 'all',
    showStockItems: false,
    selectCategory: 'name',
  },
};

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const updatedProducts = [...state.allProducts, action.payload];
      localStorage.setItem('inventory', JSON.stringify(updatedProducts));

      return {
        ...state,
        allProducts: updatedProducts,
      };

    case 'UPDATE_FILTERS_STATE':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };

    case 'FILTER_PRODUCTS': {
      const { allProducts, filters: filtersState } = state;

      let tempProducts = allProducts;

      if (filtersState.selectDepartment !== 'all') {
        tempProducts = allProducts.filter(
          singleProduct =>
            singleProduct.department === filtersState.selectDepartment
        );
      }

      if (filtersState.showStockItems) {
        tempProducts = tempProducts.filter(
          single => single.stock <= minStocksRequired
        );
      }
      tempProducts = [...tempProducts].sort((a, b) => {
        const property = filtersState.selectCategory;

        if (typeof a[property] === 'number') {
          return a[property] - b[property];
        }

        const propA = a[property].toUpperCase();
        const propB = b[property].toUpperCase();
        if (propA < propB) {
          return -1;
        }
        if (propA > propB) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        filteredProducts: tempProducts,
      };
    }

    default:
      throw new Error(`Error: ${action.type} does not exist`);
  }
};

const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const updateFilter = ({ target }) => {
    const targetName = target.name;
    let value = target.value;

    if (targetName === 'showStockItems') {
      value = target.checked;
    }

    dispatch({
      type: 'UPDATE_FILTERS_STATE',
      payload: {
        name: targetName,
        value,
      },
    });
  };

  const showFilteredProducts = () => {
    dispatch({
      type: 'FILTER_PRODUCTS',
    });
  };

  const addProduct = productToAdd => {
    dispatch({ type: 'ADD_PRODUCT', payload: productToAdd });
  };

  return (
    <InventoryContext.Provider
      value={{ ...state, updateFilter, showFilteredProducts, addProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
