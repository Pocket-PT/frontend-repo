import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';

const usePan = (onPressFn?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));

  // Set the drag hook and define component movement based on gesture data
  const bindPanDown = useDrag(
    ({ down, movement: [mx, my] }) => {
      console.log('dragging', my - 0);
      if (my - 0 > 6) setIsOpen(false);
      api.start({ x: mx, y: my, immediate: down });
    },
    { axis: 'y' },
  );

  const bindPanRight = useDrag(
    ({ down, movement: [mx, my] }) => {
      console.log('dragging', mx - 0);
      if (mx - 0 > 6) setIsOpen(false);
      api.start({ x: mx, y: my, immediate: down });
    },
    { axis: 'x' },
  );

  const bindPress = useDrag(
    ({ down, movement: [mx, my] }) => {
      api.start({
        x: mx,
        y: my,
        scale: down ? 0.9 : 1,
      });
      // if (mx - 0 > 0.1 || mx - 0 < 0) return;
      // if (my - 0 > 0.1 || my - 0 < 0) return;
      if (down && typeof onPressFn === 'function') {
        console.log('bindPress 실행');
        setIsOpen(true);
        onPressFn();
      }
    },
    { delay: 1000 },
  );

  return { isOpen, setIsOpen, bindPanDown, bindPanRight, bindPress, scale };
};

export type PanReturnType = ReturnType<typeof usePan>;

export default usePan;
