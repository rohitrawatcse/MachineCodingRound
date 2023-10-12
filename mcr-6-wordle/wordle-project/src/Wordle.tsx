import { useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import { formattedGuessType } from './types';
import Keypad from './Keypad';
import Modal from './Modal';
import data from './data/data';
import toast, { Toaster } from 'react-hot-toast';
import { CiDark } from 'react-icons/ci';
import { BsSun } from 'react-icons/bs';

function getRandomItemFromArr(arr: { id: number; word: string }[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const notify = (msg: string, type: string) => {
  if (type === 'error') {
    toast.error(msg, {
      duration: 1000,
      position: 'top-center',
    });
  }

  if (type === 'success') {
    toast.success(msg, {
      duration: 1000,
      position: 'top-center',
    });
  }
};

const Wordle = () => {
  const { word } = getRandomItemFromArr(data.words);
  const [soln, setSoln] = useState(word.toUpperCase());
  const [attempt, setAttempt] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [recordOfFormattedGuesses, setRecordOfFormattedGuess] = useState<
    (formattedGuessType[] | null)[]
  >([]);
  const [recordOfGuesses, setRecordOfGuess] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const modalTimerRef = useRef<number | null>(null!);

  // const [usedKeys, setUsedKeys] = useState({});
  // format a guess into an array of letter objects
  // e.g. 'GHOST' => [{key: 'G', color: "yellow"}, {key: 'H', color: "green"}, {key: 'O', color: "grey"}, {key: 'S', color: "green"}, {key: 'T', color: "grey"}]

  const formatGuess = () => {
    let solnArr: (string | null)[] = [...soln];
    let formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      color: 'grey',
    }));

    formattedGuess.forEach((letterObj, index) => {
      if (solnArr[index] === letterObj.key) {
        letterObj.color = 'green';
        solnArr[index] = null;
      }
    });

    formattedGuess.forEach((letterObj) => {
      if (solnArr.includes(letterObj.key) && letterObj.color !== 'green') {
        letterObj.color = 'yellow';
        solnArr[solnArr.indexOf(letterObj.key)] = null;
      }
    });

    return formattedGuess;
    // "spoar"

    // [{key: 'S', color: "green"}, {key: 'P', color: "grey"}, {key: 'O', color: "green"}, {key: 'A', color: "grey"}, {key: 'R', color: "yellow"}]
  };

  // add a new guess to the guesses state
  // update the hasWon state if the guess is correct
  // increase turn state by 1
  const addNewGuess = (
    arrWithObjectifiedGuessLetters: formattedGuessType[]
  ) => {
    if (currentGuess === soln) {
      notify('Hurray, you guessed it right!!', 'success');
      setHasWon(true);
      // return;
    }

    // As we will have 6 rows
    if (attempt < 6) {
      setRecordOfFormattedGuess((prevRecord) => {
        if (prevRecord.length > 0) {
          return [...prevRecord, arrWithObjectifiedGuessLetters];
        } else {
          return [arrWithObjectifiedGuessLetters];
        }
      });

      setRecordOfGuess((prevArr) => [...prevArr, currentGuess]);

      setAttempt((prevAttempt) => prevAttempt + 1);

      setCurrentGuess('');
    }
  };

  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = (e) => {
    let key: string = '';
    if (e.type === 'click') {
      const targetEle = e.target as HTMLElement;
      if (!targetEle.dataset.hasOwnProperty('btnKey')) {
        return;
      }
      key = targetEle.dataset.btnKey!;
    } else if (e.type === 'keyup') {
      key = `${e.key}`;
    }

    if (key === 'Enter') {
      if (currentGuess.length !== 5) {
        notify('Word should be 5 letters long.', 'error');
        return;
      }
      if (attempt === 6) {
        // console.log('GAME OVER');
        return;
      }

      if (recordOfGuesses.includes(currentGuess)) {
        const attemptOfGuessInHistory =
          recordOfGuesses.indexOf(currentGuess) + 1;

        notify(
          `You already typed '${currentGuess}' in the ${attemptOfGuessInHistory} attempt.`,
          'error'
        );
        return;
      }

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);

      return;
    }

    // delete letter in currentGuess
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // set guess
    if (
      key.length === 1 &&
      key.toUpperCase().charCodeAt(0) >= 65 &&
      key.toUpperCase().charCodeAt(0) < 91 &&
      attempt < 6 &&
      !hasWon
    )
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
  };

  const handleRetry = () => {
    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }
    setAttempt((prev) => 0);
    setCurrentGuess((prev) => '');
    setRecordOfFormattedGuess((prev) => []);
    setRecordOfGuess((prev) => []);
    setHasWon((prev) => false);
    setShowModal((prev) => false);
    setSoln((prev) => getRandomItemFromArr(data.words).word.toUpperCase());
  };

  useEffect(() => {
    window.addEventListener('keyup', handleInput);

    if (hasWon) {
      modalTimerRef.current = setTimeout(() => setShowModal(true), 1500);
    }

    if (attempt > 5) {
      modalTimerRef.current = setTimeout(() => setShowModal(true), 1500);
    }

    return () => {
      window.removeEventListener('keyup', handleInput);
    };
  }, [handleInput, hasWon, attempt]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  return (
    <div className='App'>
      <nav>
        <h2>Wordle</h2>
        {theme === 'light' ? (
          <button onClick={() => setTheme('dark')}>
            <CiDark />
          </button>
        ) : (
          <button onClick={() => setTheme('light')}>
            <BsSun />
          </button>
        )}
      </nav>

      <Grid
        attempt={attempt}
        currentGuess={currentGuess}
        recordOfFormattedGuesses={recordOfFormattedGuesses}
      />

      <Keypad handleInput={handleInput} />
      {/* <p>Soln - {soln}</p>
      <p>Wordle Clone - {currentGuess}</p> */}
      {showModal && (
        <Modal
          handleRetry={handleRetry}
          attempt={attempt}
          soln={soln}
          hasWon={hasWon}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Wordle;
