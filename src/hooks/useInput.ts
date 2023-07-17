import { Dispatch, SetStateAction, useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInput = <T = any>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      setValue(e.target.value);
    },
    [value],
  );

  return [value, handler, setValue];
};

export default useInput;
