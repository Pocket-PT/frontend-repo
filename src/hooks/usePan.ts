import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';

const usePan = () => {
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
      console.log('pressing');
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        scale: down ? 0.8 : 1,
      });
    },
    { delay: 1000 },
  );

  return { isOpen, setIsOpen, bindPanDown, bindPanRight, bindPress, scale };
};

export type PanReturnType = ReturnType<typeof usePan>;

export default usePan;
