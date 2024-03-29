import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import { useLongPress } from 'use-long-press';

const usePan = (onPressFn?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));

  // Set the drag hook and define component movement based on gesture data
  const bindPanDown = useDrag(
    ({ down, movement: [mx, my] }) => {
      console.log('dragging down', my - 0);
      if (my - 0 > 6) setIsOpen(false);
      api.start({ x: mx, y: my, immediate: down });
    },
    { axis: 'y' },
  );

  const bindUpAndDown = useDrag(
    ({ down, movement: [mx, my] }) => {
      console.log('dragging down', my - 0);
      if (my - 0 > 6) setIsOpen(false);
      if (my - 0 < -6) setIsOpen(true);
      api.start({ x: mx, y: my, immediate: down });
    },
    { axis: 'y' },
  );

  const bindPanUp = useDrag(
    ({ down, movement: [mx, my] }) => {
      console.log('dragging up', my - 0);
      if (my - 0 < -6) setIsOpen(true);
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

  const bindLongPress = useLongPress(
    () => {
      console.log('longPress');
      setIsOpen(true);
      if (typeof onPressFn === 'function') {
        onPressFn();
      }
    },
    { threshold: 500 },
  );

  const bindPress = useDrag(
    ({ down, movement: [mx, my] }) => {
      api.start({
        x: mx,
        y: my,
        scale: down ? 0.9 : 1,
      });
      console.log('bindPress 실행', mx - 0, my - 0);
      if (mx - 0 > 4 || mx - 0 < -4) return;
      if (my - 0 > 10 || my - 0 < -10) return;
      if (down && typeof onPressFn === 'function') {
        console.log('bindPress 예외처리 실패');
        setIsOpen(true);
        onPressFn();
      }
    },
    { delay: 1000 },
  );

  return {
    isOpen,
    setIsOpen,
    bindPanUp,
    bindPanDown,
    bindUpAndDown,
    bindPanRight,
    bindPress,
    bindLongPress,
    scale,
  };
};

export type PanReturnType = ReturnType<typeof usePan>;

export default usePan;
