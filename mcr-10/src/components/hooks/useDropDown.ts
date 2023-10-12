import { useEffect, useState } from 'react';
import { isClickedOnItemOrChildInItem } from '../../utils/utils';

type HTMLDivOrButtonELement = HTMLDivElement | HTMLButtonElement;

type useDropDownType = {
  buttonRef: { current: HTMLDivOrButtonELement };
  dropdownContainerRef: { current: HTMLDivElement };
};

const useDropDown = ({ buttonRef, dropdownContainerRef }: useDropDownType) => {
  const [isDropDownOpen, setIsOpenDropDownOpen] = useState<boolean>(false);

  const toggleDropDown = () => setIsOpenDropDownOpen(!isDropDownOpen);
  const closeDropDown = () => setIsOpenDropDownOpen(false);

  const handleDropDownClick = (e: Event) => {
    const targetEle = e.target as HTMLElement;
    const isClickedOnBtnOrChildInBtn =
      isClickedOnItemOrChildInItem<HTMLDivOrButtonELement>(
        targetEle,
        buttonRef.current
      );

    if (isClickedOnBtnOrChildInBtn) {
      return;
    }

    if (
      !isClickedOnItemOrChildInItem<HTMLDivOrButtonELement>(
        targetEle,
        dropdownContainerRef.current
      )
    ) {
      closeDropDown();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleDropDownClick);
    return () => {
      window.removeEventListener('click', handleDropDownClick);
    };
  }, []);

  return { isDropDownOpen, toggleDropDown, closeDropDown };
};

export default useDropDown;
