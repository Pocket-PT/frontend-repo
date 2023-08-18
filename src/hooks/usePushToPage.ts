import { useFlow } from 'libs/useFlow';
import { TypeActivityKeys } from '../libs/stackflow';

const usePushToPage = () => {
  const { push, replace, pop } = useFlow();
  const move = (page: TypeActivityKeys, animate = true) => {
    push(page, {}, { animate });
  };
  const _replace = (page: TypeActivityKeys, animate = true) => {
    replace(page, {}, { animate });
  };

  const _pop = () => {
    pop();
  };

  return { moveTo: move, replaceTo: _replace, pop: _pop };
};

export default usePushToPage;
