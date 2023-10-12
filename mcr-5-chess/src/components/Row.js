import { GRID_LENGTH, calculateKnightPositions } from '../utils';
import Square from './Square';
import shortid from 'shortid';

const Row = ({ isFirstSquareBlack, rowIndex, activeSquare }) => {
  return (
    <div className='row'>
      {Array.from({ length: GRID_LENGTH }, (_, columnIndex) => {
        let isSquareBlack;
        if (isFirstSquareBlack) {
          isSquareBlack = columnIndex % 2 === 0;
        } else {
          isSquareBlack = columnIndex % 2 !== 0;
        }

        const knightPositions = calculateKnightPositions(
          activeSquare?.activeRow,
          activeSquare?.activeColumn
        );

        const isKnightSquare = knightPositions.some((singlePosition) => {
          return (
            singlePosition?.knightActiveColumn === columnIndex &&
            singlePosition?.knightActiveRow === rowIndex
          );
        });
        // console.log(isKnightSquare);
        return (
          <Square
            activeSquare={activeSquare}
            key={shortid.generate()}
            isSquareBlack={isSquareBlack}
            column={columnIndex}
            row={rowIndex}
            isKnightSquare={isKnightSquare}
          />
        );
      })}
    </div>
  );
};

export default Row;
