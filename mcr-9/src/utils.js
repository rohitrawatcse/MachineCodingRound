export const filterByCategory = (list = [], categoryStatus) => {
  return list.filter(({ category }) => category === categoryStatus);
};
