import { AppScreen } from '@stackflow/plugin-basic-ui';
import Footer from './Footer';
import useUser from 'hooks/useUser';
import React, { PropsWithChildren, useEffect } from 'react';

type Props = {
  children: React.ReactElement;
  hasFooter?: boolean;
  backgroundWhite?: boolean;
  preventSwipeBack?: boolean;
};

const MyLayout = ({
  children,
  hasFooter = true,
  backgroundWhite = false,
  preventSwipeBack = false,
}: PropsWithChildren<Props>) => {
  const result = useUser();

  useEffect(() => {
    //touchmove event listener preventDefault
    document.addEventListener('touchmove', function (event) {
      if (typeof window === 'undefined') {
        return;
      }
      if (window.scrollY <= 0) {
        event.preventDefault();
      }
    });
    return () => {
      document.removeEventListener('touchmove', function (event) {
        if (typeof window === 'undefined') {
          return;
        }
        if (window.scrollY <= 0) {
          event.preventDefault();
        }
      });
    };
  }, []);

  return (
    <AppScreen
      backgroundColor={backgroundWhite ? '#FFFFFF' : '#FAFAFA'}
      preventSwipeBack={preventSwipeBack}
    >
      <main className="overflow-hidden h-[100vh]">
        {React.cloneElement(children, { result })}
      </main>
      {hasFooter && <Footer />}
    </AppScreen>
  );
};

export default MyLayout;
