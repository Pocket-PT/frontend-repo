import { RefObject, useEffect, useState } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  insideCallback: () => void,
  outSideCallback: () => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleInsideClick = (e: React.MouseEvent<HTMLElement>) => {
    insideCallback();
    e.stopPropagation();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      outSideCallback();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => handleOutsideClick(e));

    return () => {
      document.removeEventListener('click', (e) => handleOutsideClick(e));
    };
  }, []);

  return { isOpen, setIsOpen, handleInsideClick, handleOutsideClick };
};

export default useOutsideClick;
