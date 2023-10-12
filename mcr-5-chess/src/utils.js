const isInRange = (num) => {
  return num >= 0 && num < GRID_LENGTH;
};

export const GRID_LENGTH = 8;

export const calculateKnightPositions = (r, c) => {
  const allPossibleKnightPositions = [];
  let jIndex = 2;

  for (let index = 1; index < 3; index++) {
    allPossibleKnightPositions.push(
      {
        knightActiveRow: r + index,
        knightActiveColumn: c - jIndex,
      },
      {
        knightActiveRow: r + index,
        knightActiveColumn: c + jIndex,
      },
      {
        knightActiveRow: r - index,
        knightActiveColumn: c - jIndex,
      },
      {
        knightActiveRow: r - index,
        knightActiveColumn: c + jIndex,
      }
    );
    jIndex--;
  }

  const filteredPositiveCoordinates = allPossibleKnightPositions.filter(
    ({ knightActiveColumn, knightActiveRow }) =>
      isInRange(knightActiveColumn) && isInRange(knightActiveRow)
  );
  return filteredPositiveCoordinates;
};
