import { useActivity, useStack } from '@stackflow/react';

const useMyActivity = () => {
  const stack = useStack();
  const activity = useActivity();

  return { stack, activity };
};

export default useMyActivity;
