import data from './data/data';

// @ts-ignore
const Keypad = ({ handleInput }) => {
  const { letters } = data;

  return (
    <div className='keypad' onClick={handleInput}>
      {letters.map((singleLetter) => {
        return (
          <div data-btn-key={singleLetter.key} key={singleLetter.id}>
            {singleLetter.key}
          </div>
        );
      })}
    </div>
  );
};

export default Keypad;
