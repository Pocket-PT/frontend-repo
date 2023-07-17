import { TypeActivityKeys } from '../utils/stackflow';
import { useFlow } from '../utils/useFlow';

const usePushToPage = () => {
  const { push } = useFlow();
  const move = (page: TypeActivityKeys, animate = true) => {
    push(page, {}, { animate });
    console.log('moveTo실행');
  };

  return { moveTo: move };
};

export default usePushToPage;
