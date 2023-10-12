import { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  disabled?: boolean;
};

const Button = ({ disabled = false, onClick, children }: ButtonProps) => {
  return (
    <button
      className='bg-blue-600 hover:bg-blue-800 hover:cursor-pointer transition-all duration-300 ease-in py-2 px-4 rounded-md text-white tracking-wider block mx-auto'
      onClick={onClick}
      disabled={disabled}
      // disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
