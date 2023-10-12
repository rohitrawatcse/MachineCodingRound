const Square = ({
  isSquareBlack,
  column,
  row,
  activeSquare,
  isKnightSquare,
}) => {
  const showGreen =
    activeSquare?.activeColumn === column && activeSquare?.activeRow === row;
  return (
    <div
      className={isSquareBlack ? 'square square-dark' : 'square square-light'}
      data-column={column}
      data-row={row}
    >
      {showGreen && <span className='green-span'>🐴</span>}
      {isKnightSquare && <span className='grey-span'></span>}
    </div>
  );
};

export default Square;
