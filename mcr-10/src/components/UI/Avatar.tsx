import Image from 'next/image';
import { MouseEvent } from 'react';

type AvatarProps = {
  fullName: string;
  profileImg: string;
  onClickRef?: { current: HTMLDivElement };
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

const Avatar = ({ onClickRef, onClick, fullName, profileImg }: AvatarProps) => {
  const nameInitials = fullName
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      ref={onClickRef}
      {...(onClick && { onClick })}
      className={`${
        !profileImg ? 'grid place-items-center h-full w-full text-white' : ''
      }  rounded-full overflow-hidden hover:cursor-pointer bg-blue-600 border-2`}
    >
      {!profileImg ? (
        nameInitials
      ) : (
        <Image
          className='h-full w-full object-cover'
          src={profileImg}
          alt={fullName}
          width={25}
          height={20}
        />
      )}
    </div>
  );
};

export default Avatar;
