import { useStack } from '@stackflow/react';

const useHashLocation = () => {
  const stack = useStack();
  const { activities } = stack;
  const target = activities.findLastIndex(
    (activity) => activity.transitionState === 'enter-done',
  );
  const { name, params } = activities[target];

  return { name, params };
};

export default useHashLocation;
