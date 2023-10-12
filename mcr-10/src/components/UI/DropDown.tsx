import React, { ForwardedRef, forwardRef } from 'react';

const DropDown = forwardRef(function DropDownComponent(
  _,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className='absolute top-12 left-[-0.75rem] bg-white border-2 shadow-lg py-1'
    >
      <p
        className='px-2 py-1 transition-all duration-300 ease-in-out hover:bg-gray-300 hover:cursor-pointer'
        onClick={() => console.log('logout')}
      >
        Logout
      </p>
    </div>
  );
});

export default DropDown;
