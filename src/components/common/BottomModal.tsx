import { PropsWithChildren, useEffect, useRef } from 'react';
import { cls } from 'utils/cls';
import React from 'react';
import Hammer from 'hammerjs';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomModal = ({ children, isOpen, setIsOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const myElement = document.getElementById('modal');

    if (myElement) {
      const mc = new Hammer(myElement);
      mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      // listen to events...
      mc.on('panleft panright panup pandown tap press', function (ev) {
        //myElement.textContent = ev.type + ' gesture detected.';
        if (ev.type === 'pandown') setIsOpen(false);
        if (ev.type === 'panup') setIsOpen(true);
      });
    }
  }, []);
  return (
    <>
      <div
        className={cls(
          'absolute top-0 z-10 w-full h-full overflow-hidden bg-dark opacity-40',
          isOpen ? 'absolute' : 'hidden',
        )}
      />

      <div id="modal" className="relative w-full h-full">
        <div
          ref={ref}
          className={cls(
            'w-full bg-white rounded-tl-[32px] rounded-tr-[32px] pt-[30px] absolute bottom-0 z-50 h-fit overflow-hidden delay-100 px-5 box-border transition-all duration-500 ease-in-out',
            isOpen ? 'animate-modal-up' : 'animate-modal-down',
          )}
        >
          <div className="absolute w-20 h-1 -translate-x-1/2 rounded-full left-1/2 top-2 bg-lightGray mb-11" />
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomModal;
