import Row from './Row';
import { formattedGuessType } from './types';
interface GridProps {
  attempt: number;
  currentGuess: string | null;
  recordOfFormattedGuesses: (formattedGuessType[] | null)[];
}
const Grid = ({
  attempt,
  currentGuess,
  recordOfFormattedGuesses,
}: GridProps) => {
  return (
    <div>
      {recordOfFormattedGuesses.map((singleLetterObj, index) => {
        return (
          <Row
            key={index}
            currentGuess={null}
            formattedGuess={singleLetterObj}
          />
        );
      })}
      {attempt < 6 && (
        <Row key={attempt} currentGuess={currentGuess} formattedGuess={null} />
      )}
      {recordOfFormattedGuesses.length < 5 &&
        [...new Array(5 - recordOfFormattedGuesses.length)].map(
          (single, index) => {
            return (
              <Row
                key={attempt + index + 1}
                currentGuess={null}
                formattedGuess={null}
              />
            );
          }
        )}
    </div>
  );
};

export default Grid;
