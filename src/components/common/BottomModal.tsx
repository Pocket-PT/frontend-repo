import { PropsWithChildren } from 'react';
import React from 'react';
import { cls } from 'utils/cls';
import { animated } from '@react-spring/web';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  bindPanDown: (...args: unknown[]) => ReactDOMAttributes;
}

const BottomModal = ({ children, isOpen, bindPanDown }: Props) => {
  return (
    <>
      <div
        className={cls(
          'absolute top-0 z-10 w-full h-full overflow-hidden bg-dark opacity-40',
          isOpen ? 'absolute' : 'hidden',
        )}
      />
      <div id="modal" className="relative w-full h-full">
        <animated.div
          {...bindPanDown()}
          className={cls(
            'w-full bg-white rounded-tl-[32px] rounded-tr-[32px] absolute bottom-0 pt-8 z-50 h-fit px-5 pb-8 transform duration-300 ease-in-out box-border',
            isOpen ? `` : `translate-y-full`,
          )}
        >
          <div className="absolute w-20 h-1 -translate-x-1/2 rounded-full left-1/2 top-2 bg-lightGray mb-11" />
          {children}
        </animated.div>
      </div>
    </>
  );
};

export default BottomModal;
