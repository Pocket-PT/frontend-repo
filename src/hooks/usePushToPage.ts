import { useFlow } from 'libs/useFlow';
import { TypeActivityKeys } from '../libs/stackflow';

const usePushToPage = () => {
  const { push, replace } = useFlow();
  const move = (page: TypeActivityKeys, animate = true) => {
    push(page, {}, { animate });
  };
  const _replace = (page: TypeActivityKeys, animate = true) => {
    replace(page, {}, { animate });
  };

  return { moveTo: move, replaceTo: _replace };
};

export default usePushToPage;
