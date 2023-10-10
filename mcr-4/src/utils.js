import { minStocksRequired } from './constants';

export const getTotalStockInfo = data => {
  return data.reduce(
    (acc, { stock, delivered }) => {
      acc.totalStocks += stock;
      acc.deliveredStocks += delivered;
      if (stock <= minStocksRequired) {
        acc.lowStockItems += 1;
      }
      return acc;
    },
    { totalStocks: 0, deliveredStocks: 0, lowStockItems: 0 }
  );
};

export const getUniqueDepartments = data => [
  ...new Set(data.map(({ department }) => department)),
];
