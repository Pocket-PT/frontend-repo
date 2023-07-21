import { useFlow } from 'libs/useFlow';
import { TypeActivityKeys } from '../libs/stackflow';

const usePushToPage = () => {
  const { push } = useFlow();
  const move = (page: TypeActivityKeys, animate = true) => {
    push(page, {}, { animate });
  };

  return { moveTo: move };
};

export default usePushToPage;
