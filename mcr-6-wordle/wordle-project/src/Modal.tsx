interface ModalProps {
  hasWon: boolean;
  soln: string;
  attempt: number;
  handleRetry: () => void;
}

const Modal = ({ hasWon, soln, attempt, handleRetry }: ModalProps) => {
  return (
    <div className='modal'>
      {hasWon ? (
        <div>
          <h1>Great, You Won!</h1>
          <p className='solution'>Solution was: {soln}</p>
          <p>You guessed it right in the {attempt} attempt 👍🏻</p>
          <button onClick={handleRetry} className='retry-btn'>
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <h1>Never Mind!</h1>
          <p className='solution'>Solution was: {soln}</p>
          <p>You exhausted all your {attempt} attempts.</p>
          <button onClick={handleRetry} className='retry-btn'>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
