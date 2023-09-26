import { animated } from '@react-spring/web';
import { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { cls } from 'utils/cls';
import { PanReturnType } from 'hooks/usePan';

interface RightSideBarProps extends PropsWithChildren {
  isRightSideBarOpen: boolean;
  handleRightSideBarClose: () => void;
  bindPanRight: PanReturnType['bindPanRight'];
}

const RightSideBar = forwardRef(
  (
    {
      isRightSideBarOpen,
      handleRightSideBarClose,
      bindPanRight,
      children,
    }: RightSideBarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    console.log('isRightSideBarOpen: ', isRightSideBarOpen);

    return (
      <div className="relative">
        <div
          className={cls(
            'top-0 z-10 w-full h-[100vh] absolute overflow-hidden bg-dark transform duration-300 ease-in-out',
            isRightSideBarOpen ? 'opacity-40' : 'hidden',
          )}
          onClick={() => handleRightSideBarClose()}
          onKeyDown={() => handleRightSideBarClose()}
          role="presentation"
        />
        <animated.div
          {...bindPanRight()}
          className={cls(
            'w-[77vw] h-[100vh] absolute z-50 top-0 right-0 bg-white shadow-md transform duration-300 ease-in-out',
            isRightSideBarOpen ? '' : ' translate-x-full',
          )}
          id="modal"
          ref={ref}
        >
          {children}
        </animated.div>
      </div>
    );
  },
);

export default RightSideBar;

RightSideBar.displayName = 'RightSideBar';
