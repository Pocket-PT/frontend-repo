import loadable from '@loadable/component';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoadableBottomModal({
  children,
  isOpen,
  setIsOpen,
}: Props) {
  const BottomModal = loadable(() => import('./BottomModal'));
  return (
    <BottomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </BottomModal>
  );
}
