import shortid from 'shortid';
import useChessBoard from '../Hooks/useChessBoard';
import { GRID_LENGTH } from '../utils';
import Row from './Row';

const ChessBoard = () => {
  const { handleClick, activeSquare } = useChessBoard();
  return (
    <section className='chess-board-container'>
      <div className='section-center chess-board' onClick={handleClick}>
        {Array.from({ length: GRID_LENGTH }, (_, rowIndex) => (
          <Row
            activeSquare={activeSquare}
            key={shortid.generate()}
            rowIndex={rowIndex}
            isFirstSquareBlack={!!(rowIndex % 2)}
          />
        ))}
      </div>
    </section>
  );
};

export default ChessBoard;
