import { useRef, useState } from 'react';

const useChessBoard = () => {
  const [activeSquare, setActiveSquare] = useState(null);

  const prevActiveSquare = useRef(null);

  const handleClick = (e) => {
    const nearestSquare = e.target.closest('.square');
    if (!nearestSquare) {
      return;
    }

    const { column, row } = nearestSquare.dataset;

    const clickedAgainOnSameSquare =
      prevActiveSquare.current?.activeColumn === Number(column) &&
      prevActiveSquare.current?.activeRow === Number(row);

    if (clickedAgainOnSameSquare) {
      setActiveSquare(null);
      prevActiveSquare.current = null;
      return;
    }

    const newActiveSquare = {
      activeColumn: Number(column),
      activeRow: Number(row),
    };

    setActiveSquare(newActiveSquare);
    prevActiveSquare.current = newActiveSquare;
  };

  return { handleClick, activeSquare };
};

export default useChessBoard;
