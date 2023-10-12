interface rowProps {
  currentGuess: string | null;
  formattedGuess: { key: string; color: string }[] | null;
}

const Row = ({ currentGuess, formattedGuess }: rowProps) => {
  if (currentGuess) {
    const currentGuessLettersArr = [...currentGuess];
    return (
      <div className='row'>
        {currentGuessLettersArr.map((singleLetter, index) => {
          return (
            <div
              className={index === currentGuess.length - 1 ? 'bounce-box' : ''}
              key={index}
            >
              {singleLetter}
            </div>
          );
        })}
        {[...new Array(5 - currentGuessLettersArr.length)].map(
          (single, index) => {
            return <div key={index}></div>;
          }
        )}
      </div>
    );
  }

  if (formattedGuess) {
    return (
      <div className='row'>
        {formattedGuess.map((singleLetter, index: number) => {
          return (
            <div className={singleLetter.color} key={index}>
              {singleLetter.key}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
